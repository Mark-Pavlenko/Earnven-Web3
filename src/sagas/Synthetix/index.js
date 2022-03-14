import { put, call, select, takeEvery, putResolve, takeLatest } from 'redux-saga/effects';
import * as API from '../../components/LoansAndSavings/api/Synthetix/SynthetixAPI';
import * as actions from './actions';
import actionTypes from '../../constants/actionTypes';
import SnxTokenAddressList from '../../contractAddress/SnxTokenAddress';

export function* getSynthetixSagaWatcher() {
  yield takeLatest(actionTypes.SET_SNX_TOKENS_DATA, synthetixSagaWorker);
  //yield takeLatest(actionTypes.SET_SNX_COLL_DATA, synthetixCollaterlSagaWorker);
}

//below generator function is used to get SNX token data
function* synthetixSagaWorker(synthetixAttributes) {
  const synthetixParams = synthetixAttributes.payload;
  //snxToken datapoints for list of tokens (sUSD, sEUR etc..)
  //call below function to get the snxToken Data repective with list of snxTokens for the given user
  //---------------------SNX tokens---------------------------//
  let snxTokenDataPoint = [];
  let snxTokenPriceData = [];
  let snxDataSet = [];
  let svxTokenTotalValue = 0;

  try {
    const data = yield call(API.getUserAddressInfo, synthetixParams.accountAddress);
    if (data.tokens != undefined) {
      for (let i = 0; i < data.tokens.length; i++) {
        const synthetixData = data.tokens[i];
        const tokenAddress = synthetixData.tokenInfo.address.toLowerCase();

        if (SnxTokenAddressList.indexOf(tokenAddress) != -1) {
          let object = {};

          //use the below function to get the snxToken data points
          snxTokenDataPoint = yield call(
            API.getSnxTokenData,
            synthetixParams.accountAddress,
            tokenAddress,
            synthetixParams.web3
          );
          //send the Collateral contract address to get collateral balance value for the usr
          snxTokenPriceData = yield call(API.getSnxPrice, tokenAddress);

          let valueCheck = [];
          valueCheck = parseFloat(snxTokenDataPoint.snxTokenBalanceAmt) / 10 ** 18;
          //check balanace value is returning exponentiation since some of the account is not
          //having valid data example the balance is returning value as '195' or '165'
          var e = parseInt(valueCheck.toString().split('e-')[1]);
          if (e > 0) {
            snxTokenDataPoint.snxTokenBalanceAmt = 0;
          }

          //get the token market usd price from coingecko API
          if (snxTokenDataPoint.snxTokenBalanceAmt > 0) {
            try {
              object.balance = parseFloat(snxTokenDataPoint.snxTokenBalanceAmt) / 10 ** 18;

              object.price = snxTokenPriceData.snxPrice;
              object.value = object.balance * object.price;
              object.symbol = snxTokenDataPoint.snxTokenSymbol;
              object.imageData = [snxTokenPriceData.snxImageUrl];
              object.protocol = 'Synthetix';
              object.chain = 'Ethereum';
              svxTokenTotalValue += object.value;
              snxDataSet.push(object);
            } catch (err) {
              console.log('SNX Token', err.message);
            }
          }
        }
      } //end of for loop
    }

    if (svxTokenTotalValue > 0) {
      yield put(actions.getSythetixTokenData(snxDataSet));
      yield put(actions.getSythetixTokenTotal(parseFloat(svxTokenTotalValue).toFixed(2)));
    }
    yield put(actions.setSynthetixIsLoading(false));
    //need this log to varify the data output for now
  } catch (err) {
    console.log('SNX Token - No token holding for this user', synthetixParams.accountAddress);
  }

  //-----------------------SNX Collateral----------------------------//
  //below generator function is used to get the yearn Finance yToken data  points
  //call all the list of api calls from the api.js file

  //let totalCurveLpTokenValue = 0;
  let snxCollateralData = [];
  let snxCollateralPriceData = [];
  let collateralData = [];
  let snxCollateralTotal = 0;

  let object = {};
  try {
    //call the below function to get the SNX collateral value
    snxCollateralData = yield call(
      API.getSynthetixCollateralData,
      synthetixParams.accountAddress,
      synthetixParams.web3
    );
    //send the Collateral contract address to get collateral balance value for the usr
    snxCollateralPriceData = yield call(
      API.getSnxPrice,
      '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F'
    );

    //get the token market usd price from coingecko API
    if (parseFloat(snxCollateralData.snxCollateralBalanceAmt) > 0) {
      object.balance = snxCollateralData.snxCollateralBalanceAmt / 10 ** 18;
      object.price = snxCollateralPriceData.snxPrice;
      object.value = object.balance * object.price;
      object.symbol = snxCollateralData.snxCollateralSymbolName;
      object.imageData = [snxCollateralPriceData.snxImageUrl];
      object.protocol = 'Sythentix';
      object.chain = 'Ethereum';
      snxCollateralTotal += object.value;
      collateralData.push(object);
    }

    if (snxCollateralTotal > 0) {
      yield put(actions.getSythetixCollateralData(collateralData));
      yield put(actions.getSythetixCollateralTotal(parseFloat(snxCollateralTotal).toFixed(2)));
    }
    yield put(actions.setSynthetixIsLoading(false));
  } catch (err) {
    console.log('SNX collateral - No holding for this account', err.message);
  }
  //need this log to varify the data ouput for now
}
