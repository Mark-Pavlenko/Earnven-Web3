import { themeReducer } from './themeChanger/reducer';
import { web3Reducer } from './web3Connect/reducer';
import { combineReducers } from 'redux';
import { accountBalance } from './accountBalance/reducer';
import { twitterPosts } from './twitterPosts/reducer';

export const rootReducer = combineReducers({
  web3Reducer,
  themeReducer,
  accountBalance,
  twitterPosts,
});
