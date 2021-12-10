import { put, call, select, takeEvery } from 'redux-saga/effects';
import actionTypes from '../../constants/actionTypes';

export function* getThemeTypeSagaWatcher() {
  yield takeEvery(actionTypes.GET_THEME, getThemeTypeSagaWorker);
}

//test worker
// eslint-disable-next-line require-yield
function* getThemeTypeSagaWorker(action) {
  const themeType = 'light';
  console.log('saga test type', themeType);
}
