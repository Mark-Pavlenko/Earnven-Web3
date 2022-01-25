import { put, call, select, takeEvery, putResolve, take } from 'redux-saga/effects';
import * as API from '../../api/api';
import * as actions from './actions';
import actionTypes from '../../constants/actionTypes';
// import * as API_LP from '../../../src/components/LoansAndSavings/api/balancerApi';

export function* getethApiSagaWatcher() {
  yield takeEvery(actionTypes.SET_ETH_API, ethApiworker);
}

function* ethApiworker(data) {
  const attributes = data.payload;
  const lp = yield call(API.getethApidata, attributes);
  yield put(actions.getethApi(lp));
}
