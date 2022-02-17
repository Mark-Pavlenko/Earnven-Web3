import actionTypes from '../../constants/actionTypes';

const initialState = {
  snowSwanData: [],
  snowSwapTotal: 0,
};
//takes two arguments: The current state and the action and returns the new state.
export const snowSwap = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SNOW_SWAP_DATA:
      return {
        ...state,
        snowSwanData: action?.payload,
      };
    case actionTypes.GET_SNOW_SWAP_TOTAL:
      return {
        ...state,
        snowSwapTotal: action.payload,
      };
    default:
      return state;
  }
};
