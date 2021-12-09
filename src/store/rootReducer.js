import { themeReducer } from './themeChanger/reducer';
import { web3Reducer } from './web3Connect/reducer';
import { combineReducers, createStore } from 'redux';

const rootReducer = combineReducers({
  web3Reducer,
  themeReducer,
});

export const store = createStore(rootReducer);
