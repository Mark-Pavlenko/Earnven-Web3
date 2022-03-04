import actionTypes from '../../constants/actionTypes';

//The parameter currentState/state needs a default value equals to the initial structure of the store, and for that
//create an object called initialState and assign it as the default value of currentState.
//this current state passed as argument in the below function
const initialState = {
  sushiSwapLPData: [],
  sushiSwapLPTotal: 0,
  sushiSwapLpIsLoading: true,
};
//takes two arguments: The current state and the action and returns the new state.
export const sushiSwap = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SUSHILP_DATA:
      return {
        ...state,
        sushiSwapLPData: action?.payload,
      };
    case actionTypes.GET_SUSHILP_TOTAL:
      return {
        ...state,
        sushiSwapLPTotal: action?.payload,
      };
    case actionTypes.SET_SHUSHI_LP_LOADING:
      return {
        ...state,
        sushiSwapLpIsLoading: action?.payload,
      };
    default:
      return state;
  }
};
