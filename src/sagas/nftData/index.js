import { put, call, select, takeEvery, putResolve, take } from 'redux-saga/effects';
import * as API from '../../api/api';
import * as actions from './actions';
import actionTypes from '../../constants/actionTypes';

export function* getNftDataSagaWatcher() {
  console.log('take every');
  yield takeEvery(actionTypes.SET_NFT_DATA, NFTworker);
}

function* NFTworker(data) {
  const attributes = data.payload;
  const nft = yield call(API.getNFTdata, attributes);
  yield put(actions.getNftData(nft));
}
