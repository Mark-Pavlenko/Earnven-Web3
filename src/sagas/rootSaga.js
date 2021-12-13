import { all, call } from 'redux-saga/effects';
import { getAccountBalanceSagaWatcher } from './accountBalance';

export default function* watchRootSaga() {
  yield all([call(getAccountBalanceSagaWatcher)]);
}
