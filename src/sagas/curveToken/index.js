import { put, call, select, takeEvery, putResolve } from 'redux-saga/effects';
import * as API from '../../components/LoansAndSavings/api/curve/curveApi';
import * as actions from './actions';
import actionTypes from '../../constants/actionTypes';

export function* getCurveTokenSagaWatcher() {
  try {
    yield takeEvery(actionTypes.SET_CRV_TOKEN_DATA, curveTokenSagaWorker);
  } catch (err) {
    console.log('Error log - In Curve Token action in Saga', err.message);
  }
}

function* curveTokenSagaWorker(curveTokenAttributes) {
  const curveTokenParams = curveTokenAttributes.payload;

  let cvxArrayOfData = [];
  let cvxTokenTotal = 0;
  //call the curve (veCRV) contract to get the data
  const curveTokenData = yield call(
    API.getCurveContractData,
    curveTokenParams.accountAddress,
    curveTokenParams.web3
  );

  //call the below function to get price of the Curve token
  const cvxTokenApiData = yield call(API.getCurveTokenPriceData);
  if (cvxTokenApiData) {
    const crvTokenBalanceAmount = curveTokenData.crvTokenBalanceValue;
    if (crvTokenBalanceAmount > 0) {
      let object = {};
      //object.cvxBalanceAmt = crvTokenBalanceAmount;
      object.balance = crvTokenBalanceAmount / 10 ** curveTokenData.crvTokenDecimals;
      object.price = cvxTokenApiData.cvxTokenPrice; //for timing hard coded;
      object.value = object.balance * object.price;
      object.imageData = [cvxTokenApiData.cvxImageUrl];
      //object.tokens = [{ symbol: 'CRV', balance: object.balance }];
      object.protocol = 'Curve';
      object.chain = 'Ethereum';
      object.symbol = 'CRV';
      cvxTokenTotal = object.value;
      cvxArrayOfData.push(object);
    }
  }
  yield put(actions.getCurveTokenData(cvxArrayOfData));
  yield put(actions.getCurveTokenTotal(cvxTokenTotal));
  yield put(actions.setCurveTokenIsLoading(false));
}
