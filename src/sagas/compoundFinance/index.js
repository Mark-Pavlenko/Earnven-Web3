import { put, call, select, takeEvery, putResolve } from 'redux-saga/effects';
import * as API from '../../components/LoansAndSavings/api/Compound/compoundAPI';
import * as actions from './actions';
import actionTypes from '../../constants/actionTypes';
import addresses from '../../contractAddresses';

export function* getcompoundTokenSagaWatcher() {
  yield takeEvery(actionTypes.SET_COMP_TOKEN_DATA, compoundTokenSagaWorker);
}

function* compoundTokenSagaWorker(compTokenAttributes) {
  let compTokenParams = compTokenAttributes.payload;

  let compSavingTokenData = [];
  let compArrayOfData = [];
  let totalValue = 0;
  let underlyingTokenData;
  let compCoinData;
  let decimals = 17;

  //get Comp token price by sending the COMP token address
  let compTokenData = yield call(API.getCompCoinData, addresses.compTokenAddress);
  //get the comp claimable value by calling the compTroller contract

  let claimableAmt = yield call(
    API.getCompClaim,
    compTokenParams.accountAddress,
    compTokenParams.web3
  );
  if (claimableAmt) {
    let countNumbers = ('' + claimableAmt.claimComp).length;

    if (countNumbers >= 18) {
      decimals = 18;
    }
    let compClaim = parseFloat(
      (claimableAmt.claimComp / 10 ** decimals) * compTokenData.cTokenPrice
    ).toFixed(4);
    yield put(actions.getCompClaimValue(compClaim));
  }

  //setcompTokenImageUrl(compTokenData.cTokenImageUrl);
  //call the below function to get the SNX collateral value
  compSavingTokenData = yield call(API.getCompTokenSavingsData, compTokenParams.accountAddress);
  if (compSavingTokenData.data.accounts.length > 0) {
    if (compSavingTokenData.data.accounts[0].tokens.length > 0) {
      for (let i = 0; i < compSavingTokenData.data.accounts[0].tokens.length; i++) {
        let object = {};
        let cTokenData = compSavingTokenData.data.accounts[0].tokens[i];
        if (parseFloat(cTokenData.supply_balance_underlying.value) > 0.0001) {
          //get underlying data for the given cToken by calling the compound API
          let underlyingTokenDataAPI = yield call(API.getCompUnderlyingAPIData, cTokenData.address);
          if (underlyingTokenDataAPI) {
            underlyingTokenData = underlyingTokenDataAPI.data.cToken[0];
          }
          //set the Comp address if not provided by the API
          if (underlyingTokenData.underlying_address == null) {
            if (underlyingTokenData.symbol === 'cETH') {
              underlyingTokenData.underlying_address = '0xc00e94cb662c3520282e6f5717214004a7f26888';
            }
          }
          if (underlyingTokenData) {
            compCoinData = yield call(API.getCompCoinData, underlyingTokenData.underlying_address);
          }
          if (compCoinData) {
            object.symbol = underlyingTokenData.underlying_symbol;
            object.balance = parseFloat(cTokenData.supply_balance_underlying.value).toFixed(2);
            object.price = compCoinData.cTokenPrice;
            object.tokenImage = compCoinData.cTokenImageUrl;
            object.value = parseFloat(object.balance * object.price).toFixed(2);
            object.apy = parseFloat(underlyingTokenData.supply_rate.value * 100).toFixed(4);
            totalValue += parseFloat(object.value);
            compArrayOfData.push(object);
          }
        }
      } //end of for loop
      if (totalValue > 0) {
        yield put(actions.getCompTokenData(compArrayOfData));
        yield put(actions.getCompTokenTotal(totalValue));
      }
    } //end of if condition
  }
}
