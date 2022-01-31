import { put, call, select, takeEvery, putResolve, take } from 'redux-saga/effects';
import * as API from '../../api/api';
import * as actions from './actions';
import actionTypes from '../../constants/actionTypes';
import * as API_LP from '../../../src/components/LoansAndSavings/api/alchemixApi';

export function* getalchemixVaultsSagaWatcher() {
  yield takeEvery(actionTypes.SET_ALCHEMIX_VAULT, AlchemixVaultsworker);
}

function* AlchemixVaultsworker(data) {
  const attributes = data.payload;
  const lp = yield call(API_LP.getalchemixVaultsfunction, attributes);
  yield put(actions.getalchemixVaults(lp));
}
