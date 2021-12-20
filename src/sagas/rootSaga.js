import { all, call } from 'redux-saga/effects';
import { getAccountBalanceSagaWatcher } from './accountBalance';
import { getTwitterPostsSagaWatcher } from './twitterPosts';

export default function* watchRootSaga() {
  yield all([call(getAccountBalanceSagaWatcher), call(getTwitterPostsSagaWatcher)]);
}
