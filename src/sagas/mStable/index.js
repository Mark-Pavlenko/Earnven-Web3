import { put, call, select, takeEvery, putResolve, take } from 'redux-saga/effects';
// import * as API from '../../api/api';
import * as actions from './actions';
import actionTypes from '../../constants/actionTypes';
import * as API_LP from '../../../src/components/LoansAndSavings/api/mStableApi';

export function* getmStableSagaWatcher() {
  yield takeEvery(actionTypes.SET_MSTABLE_SAVINGS, mStableworker);
}

function* mStableworker(data) {
  const attributes = data.payload;
  const lp = yield call(API_LP.getmStabledata, attributes);
  yield put(actions.getmStable(lp));
}

export function* getmStableFarmSagaWatcher() {
  yield takeEvery(actionTypes.SET_MSTABLE_FARM, mStableFarmworker);
}

function* mStableFarmworker(data) {
  const attributes = data.payload;
  const lp = yield call(API_LP.getmStableFarmdata, attributes);
  yield put(actions.getmStableFarm(lp));
}

export function* getmStablePoolsSagaWatcher() {
  yield takeEvery(actionTypes.SET_MSTABLE_POOL, mStablePoolsworker);
}

function* mStablePoolsworker(data) {
  const attributes = data.payload;
  const lp = yield call(API_LP.getmStablePoolsdata, attributes);
  yield put(actions.getmStablePools(lp));
}
