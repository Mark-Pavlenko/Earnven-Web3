import { themeReducer } from './themeChanger/reducer';
import { web3Reducer } from './web3Connect/reducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  web3Reducer,
  themeReducer,
});
