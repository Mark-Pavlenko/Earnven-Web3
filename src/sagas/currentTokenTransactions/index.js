import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_TOKEN_TRANSACTIONS_SAGA } from '../../constants/actionTypes';
import { fetchTokenTransactions } from '../../screens/TokenPage/assets/api';
import {
  getTokenTransactions,
  getTokenTransactionsFail,
  getTokenTransactionsSuccess,
} from '../../store/currentTokenTransactions/actions';

export function* getCurrentTokenTransactionsSagaWatcher() {
  yield takeEvery(GET_TOKEN_TRANSACTIONS_SAGA, getCurrentTokenTransactionsSagaWorker);
}

function* getCurrentTokenTransactionsSagaWorker({ payload }) {
  try {
    yield put(getTokenTransactions(payload.isLoading));
    console.log('saga', payload.tokenContractAddress, payload.walletAddress);
    const response = yield call(
      fetchTokenTransactions,
      payload.tokenContractAddress,
      payload.walletAddress
    );
    yield put(getTokenTransactionsSuccess(response, payload.isLoading));
  } catch (error) {
    yield put(getTokenTransactionsFail(payload.error, payload.isLoading));
  }
}
