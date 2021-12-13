import { put, call, select, takeEvery, putResolve } from 'redux-saga/effects';
import * as API from '../../api/api';
import * as actions from './actions';
import actionTypes from '../../constants/actionTypes';
// import { getAccountBalance } from "../../api/api";

export function* getAccountBalanceSagaWatcher() {
  yield takeEvery(actionTypes.SET_ACCOUNT_ADDRESS, getAccountBalanceSagaWorker);
}

// eslint-disable-next-line require-yield
function* getAccountBalanceSagaWorker(accountAddress) {
  // console.log('saga accountAddress', accountAddress);
  const tokensArr = yield call(API.getAccountBalance, accountAddress.payload);
  const { data } = tokensArr;
  // console.log('account balance saga', data);
  data && (yield putResolve(actions.getAccountBalance(data.tokens)));
  //yield putResolve(actions.getAccountBalance(data));
}
