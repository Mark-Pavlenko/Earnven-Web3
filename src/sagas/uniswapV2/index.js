import { put, call, select, takeEvery, putResolve, take } from 'redux-saga/effects';
import * as actions from './actions';
import actionTypes from '../../constants/actionTypes';
import * as API_LP from '../../../src/components/LoansAndSavings/api/uniswapv2Api';

export function* getuniswapV2SagaWatcher() {
  yield takeEvery(actionTypes.SET_UNISWAPV2_LP, Uniswapv2worker);
}

function* Uniswapv2worker(data) {
  const attributes = data.payload;
  const lp = yield call(API_LP.getuniswapV2data, attributes);
  yield put(actions.getuniswapV2(lp));
  yield put(actions.setUniswapV2isLoading(false));
}

export function* getuniswapV2StakeSagaWatcher() {
  yield takeEvery(actionTypes.SET_UNISWAPV2_STAKE, Uniswapv2Stakeworker);
}

function* Uniswapv2Stakeworker(data) {
  const attributes = data.payload;
  const lp = yield call(API_LP.getuniswapV2stakedata, attributes);

  //get the value and total value of the uniuswap staking tokens
  if (lp.length > 0) {
    let uniSwapv2StakingTotal = 0;
    lp.map((object) => {
      uniSwapv2StakingTotal += parseFloat(object.value);
    });
    yield put(actions.getuniswapV2stake(lp));
    yield put(actions.getuniswapV2stakeTotal(uniSwapv2StakingTotal));
  }
}
