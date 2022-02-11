import { themeReducer } from './themeChanger/reducer';
import { web3Reducer } from './web3Connect/reducer';
import { combineReducers } from 'redux';
import { accountBalance } from './accountBalance/reducer';
import { twitterPosts } from './twitterPosts/reducer';
import { headerTitlesReducer } from './headerTitles/reducer';
import { eth2Stake } from './eth2Stake/reducer';
import { sushiStaking } from './sushiStaking/reducer';
import { nftData } from './nftData/reducer';
import { chosenTokensList, tokensList } from './searchedTokens/reducer';
import { yearnFinance } from './yearnFinance/reducer';
import { balancerV2lp } from './BalancerV2/reducer';
import { uniswapV2lp } from './UniswapV2/reducer';
import { uniswapV2stake } from './UniswapV2/reducerStake';
import { curveToken } from './curveToken/reducer';
import { LiquityStakeReducer } from './LiquityStakeReducer/LiquityStakeReducer';
//import { SynthetixProtocol } from './synthetixProtocol/synthetixProtocol';
import { pickeStake } from './pickle/reducer';
import { pickeDill } from './pickle/reducer';
import { curveStaking } from './curveStaking/reducer';
import { convexStake } from './convexStake/reducer';
import { curveLpToken } from './curveLpToken/reducer';
import { AaveStaking } from './Aave/reducer';
import { liquityToken } from './liquityToken/reducer';
import { creamIronBank } from './creamIronBank/reducer';
import { snowSwan } from './snowSwan/reducer';
import { cream } from './cream/reducer';
import { olympusStaking } from './olympusStaking/reducer';
import { ethExplorerApi } from './ethExplorerApi/reducer';
import { mStableSavings } from './mStable/reducer';
import { mStableSavingsFarm, mStableSavingsPool } from './mStable/reducer';
import { sushiSwap } from './sushiSwap/reducer';
import { initSidebarValuesReducer } from './initSidebarValues/reducer';
import { alchemixVaults } from './alchemix/reducer';
import { compoundFinance } from './compoundFinance/reducer';
import { currentTokenDataReducer } from './currentTokenData/reducer';
import { currentTokenTransactionsReducer } from './currentTokenTransactions/reducer';
import { gesData } from './gesData/reducer';
import { walletDataReducer } from './currentWalletData/reducer';
import { tokenPriceHistoryReducer } from './currentTokenPriceHistory/reducer';
import { Synthetix } from './Synthetix/reducer';

export const rootReducer = combineReducers({
  web3Reducer,
  themeReducer,
  accountBalance,
  twitterPosts,
  headerTitlesReducer,
  tokensList,
  chosenTokensList,
  eth2Stake,
  sushiStaking,
  nftData,
  yearnFinance,
  balancerV2lp,
  uniswapV2lp,
  uniswapV2stake,
  curveToken,
  LiquityStakeReducer,
  //SynthetixProtocol,
  pickeStake,
  pickeDill,
  curveStaking,
  convexStake,
  curveLpToken,
  AaveStaking,
  liquityToken,
  creamIronBank,
  snowSwan,
  cream,
  olympusStaking,
  ethExplorerApi,
  mStableSavings,
  mStableSavingsFarm,
  mStableSavingsPool,
  sushiSwap,
  initSidebarValuesReducer,
  alchemixVaults,
  compoundFinance,
  currentTokenDataReducer,
  currentTokenTransactionsReducer,
  gesData,
  walletDataReducer,
  tokenPriceHistoryReducer,
  Synthetix,
});
