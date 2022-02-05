import { put, call, select, takeEvery, putResolve } from 'redux-saga/effects';
import * as API from '../../api/api';
import * as actions from './actions';
import actionTypes from '../../constants/actionTypes';
import Web3 from 'web3';
import { CommaFormatted } from '../../modules/common/commaFormatter';

export function* getAccountBalanceSagaWatcher() {
  yield takeEvery(actionTypes.SET_ACCOUNT_ADDRESS, getAccountBalanceSagaWorker);
}

// eslint-disable-next-line require-yield
function* getAccountBalanceSagaWorker(accountAddress) {
  // console.log('saga accountAddress', accountAddress);

  const web3 = new Web3();
  console.log('web3', web3);

  yield put({ type: actionTypes.SET_ACCOUNT_LOADER, payload: true });
  const { data } = yield call(API.getAccountBalance, accountAddress.payload);

  yield put({ type: actionTypes.SET_ACCOUNT_LOADER, payload: false });

  // console.log('account balance saga', data);

  let total = 0;

  total = data.ETH.price.rate * web3.utils.fromWei(data.ETH.rawBalance, 'ether');
  if (data.tokens !== undefined) {
    for (let i = 0; i < data.tokens.length; i++) {
      if (data.tokens[i].tokenInfo.price !== false) {
        total +=
          data.tokens[i].tokenInfo.price.rate *
          web3.utils.fromWei(data.tokens[i].rawBalance, 'ether');
      }
    }
  }

  const finalTotal = CommaFormatted(total.toFixed(2));
  console.log('finalTotal ', finalTotal);

  data && (yield putResolve(actions.getAccountBalance({ ...data, finalTotal })));
}
