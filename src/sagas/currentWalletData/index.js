import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_WALLET_DATA_SAGA } from '../../constants/actionTypes';
import { fetchWalletData } from '../../screens/TokenPage/assets/api';
import {
  getWalletData,
  getWalletDataFail,
  getWalletDataSuccess,
} from '../../store/currentWalletData/actions';

export function* getWalletDataSagaWatcher() {
  yield takeEvery(GET_WALLET_DATA_SAGA, getWalletDataSagaWorker);
}

function* getWalletDataSagaWorker({ payload }) {
  try {
    yield put(getWalletData(payload.isLoading));
    const response = yield call(fetchWalletData, payload.walletAddress);
    yield put(getWalletDataSuccess(response, payload.isLoading));
  } catch (error) {
    yield put(getWalletDataFail(payload.error, payload.isLoading));
  }
}
