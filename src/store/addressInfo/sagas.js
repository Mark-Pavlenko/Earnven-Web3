import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import * as API from '../../api/api';
import actionTypes from '../../constants/actionTypes';
import * as actions from './actions';

// SET_ADDRESS_INFO_DATA: 'SET_ADDRESS_INFO_DATA',
//   GET_ADDRESS_INFO_DATA: 'GET_ADDRESS_INFO_DATA',

export function* getAddressInfoDataSagaWatcher() {
  yield takeEvery(actionTypes.SET_ADDRESS_INFO_DATA, getAddressInfoDataSagaWorker);
  // SET_ADDRESS_INFO_DATA
}

function* getAddressInfoDataSagaWorker(accountAddress) {
  console.log('accountAddress', accountAddress);
  const addressInfoData = yield call(API.getAddressInfo, accountAddress.payload);
  console.log('only addressInfoData', addressInfoData.data);

  yield put(actions.getAddressInfoData(addressInfoData.data));
}
