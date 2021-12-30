import { put, call, select, takeEvery, putResolve, take } from 'redux-saga/effects';
import * as API from '../../api/api';
import * as actions from './actions';
import actionTypes from '../../constants/actionTypes';
import * as API_LP from '../../../src/components/LoansAndSavings/api/balancerApi';

export function* getbalancerV2SagaWatcher() {
  yield takeEvery(actionTypes.SET_BALANCER_LP, Balancerv2worker);
}

function* Balancerv2worker(data) {
  const attributes = data.payload;
  const lp = yield call(API_LP.getbalancerV2data, attributes);
  yield put(actions.getbalancerV2(lp));
}
