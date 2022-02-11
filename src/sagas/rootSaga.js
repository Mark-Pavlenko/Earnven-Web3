import { all, call } from 'redux-saga/effects';
import { getAccountBalanceSagaWatcher } from './accountBalance';
import { getTwitterPostsSagaWatcher } from './twitterPosts';
import { getETH2StakeSagaWatcher } from './eth2Stake';
import { getSushiStakeSagaWatcher } from './sushiStaking';
import { getNftDataSagaWatcher } from './nftData';
import { getbalancerV2SagaWatcher } from './balancerV2';
import { getuniswapV2StakeSagaWatcher } from './uniswapV2';
import { getuniswapV2SagaWatcher } from './uniswapV2';
import {
  getALlTokensSagaWatcher,
  getSearchedTokensSagaWatcher,
} from '../store/searchedTokens/sagas';
import { getYearnFinanceSagaWatcher } from './yearnFinance';
import { getCurveTokenSagaWatcher } from './curveToken';
import { getpickleStakeSagaWatcher } from './pickle';
import { getpickleDillSagaWatcher } from './pickle';
import { getCurveStakingSagaWatcher } from './curveStaking';
import { getLiquityTokenSagaWatcher } from './liquityToken';
import { getOlympusTokenSagaWatcher } from './olympusStaking';
import { getethApiSagaWatcher } from './ethExplorerApi';
import { getmStableSagaWatcher } from './mStable';
import { getmStableFarmSagaWatcher, getmStablePoolsSagaWatcher } from './mStable';
import { getSushiSwapLPSagaWatcher } from './sushiSwap';
import { getalchemixVaultsSagaWatcher } from './alchemix';
import { getcompoundTokenSagaWatcher } from './compoundFinance';
import { getCurrentTokenDataSagaWatcher } from './currentTokenData';
import { getCurrentTokenTransactionsSagaWatcher } from './currentTokenTransactions';
import { getWalletDataSagaWatcher } from './currentWalletData';
import { getTokenPriceHistorySagaWatcher } from './currentTokenPriceHistory';
import { getCurveLPTokenSagaWatcher } from './curveLpToken';
import { getAaveStakeSagaWatcher } from './Aave';
import { getSynthetixSagaWatcher } from './Synthetix';
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
    call(getuniswapV2SagaWatcher),
    call(getuniswapV2StakeSagaWatcher),
    call(getCurveTokenSagaWatcher),
    call(getpickleStakeSagaWatcher),
    call(getpickleDillSagaWatcher),
    call(getCurveStakingSagaWatcher),
    call(getLiquityTokenSagaWatcher),
    call(getOlympusTokenSagaWatcher),
    call(getethApiSagaWatcher),
    call(getmStableSagaWatcher),
    call(getmStableFarmSagaWatcher),
    call(getmStablePoolsSagaWatcher),
    call(getSushiSwapLPSagaWatcher),
    call(getalchemixVaultsSagaWatcher),
    call(getcompoundTokenSagaWatcher),
    call(getCurrentTokenDataSagaWatcher),
    call(getCurrentTokenTransactionsSagaWatcher),
    call(getWalletDataSagaWatcher),
    call(getTokenPriceHistorySagaWatcher),
    call(getCurveLPTokenSagaWatcher),
    call(getAaveStakeSagaWatcher),
    call(getSynthetixSagaWatcher),
  ]);
}
