import { themeReducer } from './themeChanger/reducer';
import { web3Reducer } from './web3Connect/reducer';
import { combineReducers } from 'redux';
import { accountBalance } from './accountBalance/reducer';
import { twitterPosts } from './twitterPosts/reducer';
import { headerTitlesReducer } from './headerTitlesReducer/reducer';
import { eth2Stake } from './eth2Stake/reducer';
import { sushiStaking } from './sushiStaking/reducer';
import { nftData } from './nftData/reducer';
import { chosenTokensList, tokensList } from './searchedTokens/reducer';
import { yearnFinance } from './yearnFinance/reducer';

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
});
