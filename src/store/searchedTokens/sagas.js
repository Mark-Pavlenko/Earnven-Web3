import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import * as API from '../../api/api';
import {
  getSearchedTokens,
  GET_ALL_TOKENS,
  GET_SEARCHED_TOKENS_LOADING,
  GET_SEARCHED_TOKENS_SUCCESS,
  GET_SEARCHED_TOKENS_ERROR,
} from './actions';

const getTokensList = (state) => state.tokensList.tokensList;

import * as actions from './actions';

export function* getALlTokensSagaWatcher() {
  yield takeEvery(GET_ALL_TOKENS, getAllTokensWorker);
}

export function* getSearchedTokensSagaWatcher() {
  yield takeEvery(GET_SEARCHED_TOKENS_LOADING, searchedTokensWorker);
}

export function* getAllTokensWorker() {
  const tokensList = yield call(API.getTokens);
  yield put(actions.setAllTokens(tokensList));
}

function* searchedTokensWorker(data) {
  const inputSearchValue = data.payload;
  // console.log('inputSearchValue', inputSearchValue);

  const tokensList = yield select(getTokensList);

  // console.log('tokensList', tokensList);

  const selectedTokensList = [];
  for (let i = 0; i < tokensList.length; i++) {
    const searchPattern = new RegExp(`^${inputSearchValue}`, 'i');
    if (searchPattern.test(tokensList[i].id)) {
      selectedTokensList.push(tokensList[i]);
    }
  }

  // if (selectedTokensList.length < 1000) {
  // console.log('selectedTokensList', selectedTokensList);
  // }

  yield put(actions.setChosenTokensList(selectedTokensList));
}
