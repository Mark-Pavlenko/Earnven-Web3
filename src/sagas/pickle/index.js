import { put, call, select, takeEvery, putResolve, take } from 'redux-saga/effects';
import * as API from '../../api/api';
import * as actions from './actions';
import actionTypes from '../../constants/actionTypes';
import * as API_LP from '../../../src/components/LoansAndSavings/api/pickleApi';

export function* getpickleStakeSagaWatcher() {
  yield takeEvery(actionTypes.GET_PICKLE_STAKE, pickleStakeworker);
}

function* pickleStakeworker(data) {
  const attributes = data.payload;
  const lp = yield call(API_LP.fetchBalance, attributes);
  yield put(actions.setpickleStake(lp[0]));
  yield put(actions.setpickleStakeTotal(lp[1]));
}

export function* getpickleDillSagaWatcher() {
  yield takeEvery(actionTypes.SET_PICKLE_DILL, pickleDillworker);
}

function* pickleDillworker(data) {
  const attributes = data.payload;
  const lp = yield call(API_LP.fetchBalanceDill, attributes);
  if (lp[0]) {
    if (parseFloat(lp[0].balance) != 0) {
      yield put(actions.setpickleDill(lp));
    }
  }
  yield put(actions.setPickleDillIsLoading(false));
}
