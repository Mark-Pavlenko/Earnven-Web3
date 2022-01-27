import { put, call, select, takeEvery, putResolve } from 'redux-saga/effects';
import * as API from '../../components/LoansAndSavings/api/Olympus/olympusAPI';
import * as actions from './actions';
import actionTypes from '../../constants/actionTypes';
import Addresses from '../../contractAddresses';

export function* getOlympusTokenSagaWatcher() {
  yield takeEvery(actionTypes.SET_OHM_TOKEN_DATA, olympusTokenSagaWorker);
}

function* olympusTokenSagaWorker(olympusTokenAttributes) {
  const olympusTokenParams = olympusTokenAttributes.payload;

  let ArrayOfData = [];
  let tokenLiquidity = 0;
  let tokenValue = 0;
  let tokenPrice = 0;
  let totalValue = 0;
  let object = {};
  //call the below function to get the OHM staking data from the contract
  const tokenData = yield call(
    API.getOHMTokenData,
    olympusTokenParams.accountAddress,
    olympusTokenParams.web3
  );
  //call the below function to get the price and image url for the OHM token
  const OHMtokenInfo = yield call(API.getOHMTokenInfo, Addresses.OHMV2TokenAddress);
  //call the function to get price of the gOHM token to calculate the Liquidity
  const gOHMTokenInfo = yield call(API.getOHMTokenInfo, Addresses.gOHMTokenAddress);
  //calculate the tokenValue and liquidity based on the price of the corresponding symbol sOHM or gOHM
  //get staked OHM (sOHM) releated data if it is sOHM symbol
  if (tokenData.tokenSymbol === 'sOHM') {
    tokenLiquidity = tokenData.tokenLiquidity * OHMtokenInfo.price;
    tokenValue = tokenData.tokenBalance * OHMtokenInfo.price;
    tokenPrice = OHMtokenInfo.price;
  }
  //get governance OHM(gOHM) releated data if it is sOHM symbol
  if (tokenData.tokenSymbol === 'gOHM') {
    tokenLiquidity = tokenData.tokenLiquidity * gOHMTokenInfo.price;
    tokenValue = tokenData.tokenBalance * gOHMTokenInfo.price;
    tokenPrice = gOHMTokenInfo.price;
  }

  //get the token market usd price from coingecko API
  if (tokenData.tokenBalance) {
    console.log('tokenData.tokenBalance', tokenData.tokenBalance);
    object.balance = parseFloat(tokenData.tokenBalance).toFixed(4);
    object.totalValue = parseFloat(tokenValue).toFixed(2);
    object.tokenName = tokenData.tokenSymbol;
    object.price = tokenPrice;
    object.tokenImage = OHMtokenInfo.tokenImage;
    object.liquidity = parseFloat(tokenLiquidity).toFixed(2);
    object.chain = 'Ethereum';
    object.protocol = 'Olympus';
    totalValue = object.totalValue;
  }
  if (Object.keys(object).length) {
    ArrayOfData.push(object);
  }
  yield put(actions.getOHMTokenData(ArrayOfData));
  yield put(actions.getOHMTokenTotal(totalValue));
}
