import { SET_ALL_TOKENS, SET_CHOSEN_TOKENS_LIST } from './actions';

const initialState = {
  tokensList: [],
  chosenTokensList: [],
};

export const tokensList = (state = initialState, action) => {
  // console.log('tokensList payload', action?.payload);
  switch (action.type) {
    case SET_ALL_TOKENS:
      return {
        tokensList: action?.payload,
      };
    default:
      return state;
  }
};

export const chosenTokensList = (state = initialState, action) => {
  // console.log('chosen tokensList payload', action?.payload);
  switch (action.type) {
    case SET_CHOSEN_TOKENS_LIST:
      return {
        chosenTokensList: action?.payload,
      };
    default:
      return state;
  }
};
