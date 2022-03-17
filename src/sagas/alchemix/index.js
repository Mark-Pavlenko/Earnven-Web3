import { put, call, select, takeEvery, putResolve, take } from 'redux-saga/effects';
//import * as API from '../../api/api';
import * as actions from './actions';
import actionTypes from '../../constants/actionTypes';
import * as API from '../../../src/components/LoansAndSavings/api/Alchemix/AlchemixAPI';

export function* getalchemixVaultsSagaWatcher() {
  yield takeEvery(actionTypes.SET_ALX_DATA, AlchemixVaultsworker);
}

function* AlchemixVaultsworker(alxAttributes) {
  const attributes = alxAttributes.payload;
  const dataResult = yield call(API.getAlxData, attributes);

  yield put(actions.getalchemixVaults(dataResult));
  yield put(actions.getalchemixTotal(dataResult[0].value));
}
