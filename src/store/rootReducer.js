import { themeReducer } from './themeChanger/reducer';
import { combineReducers, createStore } from 'redux';

const rootReducer = combineReducers({
  themeReducer,
});

export const store = createStore(rootReducer);
