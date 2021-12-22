import { all, call } from 'redux-saga/effects';
import { getAccountBalanceSagaWatcher } from './accountBalance';
import { getTwitterPostsSagaWatcher } from './twitterPosts';
import {
  getALlTokensSagaWatcher,
  getSearchedTokensSagaWatcher,
} from '../store/searchedTokens/sagas';

export default function* watchRootSaga() {
  yield all([
    call(getAccountBalanceSagaWatcher),
    call(getTwitterPostsSagaWatcher),
    call(getSearchedTokensSagaWatcher),
    call(getALlTokensSagaWatcher),
  ]);
}
