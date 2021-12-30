import { all, call } from 'redux-saga/effects';
import { getAccountBalanceSagaWatcher } from './accountBalance';
import { getTwitterPostsSagaWatcher } from './twitterPosts';
import { getETH2StakeSagaWatcher } from './eth2Stake';
import { getSushiStakeSagaWatcher } from './sushiStaking';
import { getNftDataSagaWatcher } from './nftData';
import { getbalancerV2SagaWatcher } from './balancerV2';
import {
  getALlTokensSagaWatcher,
  getSearchedTokensSagaWatcher,
} from '../store/searchedTokens/sagas';
import { getYearnFinanceSagaWatcher } from './yearnFinance';

export default function* watchRootSaga() {
  yield all([
    call(getAccountBalanceSagaWatcher),
    call(getTwitterPostsSagaWatcher),
    call(getALlTokensSagaWatcher),
    call(getSearchedTokensSagaWatcher),
    call(getETH2StakeSagaWatcher),
    call(getSushiStakeSagaWatcher),
    call(getNftDataSagaWatcher),
    call(getYearnFinanceSagaWatcher),
    call(getbalancerV2SagaWatcher),
  ]);
}
