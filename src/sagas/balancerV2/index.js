import { put, call, select, takeEvery, putResolve, take } from 'redux-saga/effects';
import * as API from '../../api/api';
import * as actions from './actions';
import actionTypes from '../../constants/actionTypes';
import * as API_LP from '../../../src/components/LoansAndSavings/api/balancerApi';

export function* getbalancerV2SagaWatcher() {
  try {
    yield takeEvery(actionTypes.SET_BALANCER_LP, Balancerv2worker);
  } catch (err) {
    console.log('Error log - In balanceV2 action at saga');
  }
}

function* Balancerv2worker(data) {
  const attributes = data.payload;
  let total = 0;
  const lp = yield call(API_LP.getbalancerV2data, attributes);
  if (lp.length > 0) {
    lp.map((object) => {
      total += parseFloat(object.totalValue);
    });
    yield put(actions.getbalancerV2(lp));
    yield put(actions.getBalancerV2Total(total));
  }

  yield put(actions.setBalancerProtocolisLoading(false));
}
