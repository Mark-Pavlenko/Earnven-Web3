import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_TOKEN_DATA_SAGA } from '../../constants/actionTypes';
import {
  getTokenData,
  getTokenDataFail,
  getTokenDataSuccess,
} from '../../store/currentTokenData/actions';
import { fetchTokenData } from '../../screens/TokenPage/assets/api';

export function* getCurrentTokenDataSagaWatcher() {
  yield takeEvery(GET_TOKEN_DATA_SAGA, getCurrentTokenDataSagaWorker);
}

function* getCurrentTokenDataSagaWorker({ payload }) {
  try {
    yield put(getTokenData(payload.isLoading));
    const response = yield call(fetchTokenData, payload.tokenId);
    yield put(getTokenDataSuccess(response, payload.isLoading));
  } catch (error) {
    yield put(getTokenDataFail(payload.error, payload.isLoading));
  }
}
