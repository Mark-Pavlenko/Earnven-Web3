import { all, call } from 'redux-saga/effects';
import { getThemeTypeSagaWatcher } from './homeSaga';

export default function* watchRootSaga() {
  yield all([call(getThemeTypeSagaWatcher)]);
}
