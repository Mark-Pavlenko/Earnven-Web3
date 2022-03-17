import { put, call, select, takeEvery, putResolve, take } from 'redux-saga/effects';
// import * as API from '../../api/api';
import * as actions from './actions';
import actionTypes from '../../constants/actionTypes';
//import * as API_LP from '../../../src/components/LoansAndSavings/api/mStableApi';
import * as API from '../../../src/components/LoansAndSavings/api/mStable/mStableAPI';

export function* getmStableSagaWatcher() {
  yield takeEvery(actionTypes.SET_MSTABLE_STAKE_DATA, mStableworker);
}

function* mStableworker(mStableAttributes) {
  const attributes = mStableAttributes.payload;
  let total = 0;
  const resultData = yield call(API.getMStableStakedata, attributes);
  console.log('TestmStable from saga for mStable', resultData);
  //get the total value of the mStable staking token
  if (resultData.length > 0) {
    resultData.map((object) => {
      total += parseFloat(object.value) + parseFloat(object.claimable);
    });
    yield put(actions.getmStableStaking(resultData));
    yield put(actions.getmStableStakingTotal(total));
  }
  yield put(actions.setmStableStakingIsLoading(false));
}

// export function* getmStableFarmSagaWatcher() {
//   yield takeEvery(actionTypes.SET_MSTABLE_FARM, mStableFarmworker);
// }

// function* mStableFarmworker(data) {
//   const attributes = data.payload;
//   const lp = yield call(API_LP.getmStableFarmdata, attributes);
//   console.log('TestmStable from saga for mStableForm data', lp);
//   yield put(actions.getmStableFarm(lp));
// }

// export function* getmStablePoolsSagaWatcher() {
//   yield takeEvery(actionTypes.SET_MSTABLE_POOL, mStablePoolsworker);
// }

// function* mStablePoolsworker(data) {
//   const attributes = data.payload;
//   const lp = yield call(API_LP.getmStablePoolsdata, attributes);
//   console.log('TestmStable from saga for mStablePool data', lp);
//   yield put(actions.getmStablePools(lp));
// }
