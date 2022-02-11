import { put, call, select, takeEvery, putResolve } from 'redux-saga/effects';
import * as API from '../../components/LoansAndSavings/api/api';
import * as actions from './actions';
import actionTypes from '../../constants/actionTypes';

export function* getETH2StakeSagaWatcher() {
  yield takeEvery(actionTypes.GET_ETH2_STAKE_DATA, eth2StakeSagaWorker);
}

function* eth2StakeSagaWorker(userAccountAddress) {
  const stakeUserAccount = userAccountAddress.payload;
  const response = yield call(API.getEth2StakeData, stakeUserAccount);

  if (response) {
    if (response.data.data.depositors) {
      try {
        const res = response.data.data.depositors[0];
        let tot = 0;
        const object = {};
        let ethStaking = [];
        object.totalDeposit = res.totalAmountDeposited / 10 ** 9;

        const response2 = yield call(API.getEthPriceData);

        if (response2.data) {
          object.price = response2.data.ethereum.usd;
        }

        object.totalInvestment = parseFloat(object.price * object.totalDeposit).toFixed(2);
        object.value = object.totalInvestment;
        object.symbol = 'ETH';
        object.chain = 'Ethereum';
        object.protocol = 'Ethereum';
        tot += parseFloat(object.totalInvestment);
        ethStaking.push(object);
        //setBeaconTotal(tot);

        yield put(actions.getEth2StakeData(ethStaking));
        //setBeaconData(ethStaking);
        yield put(actions.getEth2StakeTotalValue(tot));
      } catch (err) {
        console.log(err.message);
      }
    }
  }
}
