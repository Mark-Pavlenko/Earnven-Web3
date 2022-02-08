import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_TOKEN_PRICE_HISTORY_SAGA } from '../../constants/actionTypes';
import { fetchTokenPriceHistory } from '../../screens/TokenPage/assets/api';
import {
  getTokenPriceHistory,
  getTokenPriceHistoryFail,
  getTokenPriceHistorySuccess,
} from '../../store/currentTokenPriceHistory/actions';

export function* getTokenPriceHistorySagaWatcher() {
  yield takeEvery(GET_TOKEN_PRICE_HISTORY_SAGA, getTokenPriceHistorySagaWorker);
}

function* getTokenPriceHistorySagaWorker({ payload }) {
  try {
    yield put(getTokenPriceHistory(payload.isLoading));
    const response = yield call(fetchTokenPriceHistory, payload.tokenId);
    yield put(getTokenPriceHistorySuccess(response, payload.isLoading));
  } catch (error) {
    yield put(getTokenPriceHistoryFail(payload.error, payload.isLoading));
  }
}
