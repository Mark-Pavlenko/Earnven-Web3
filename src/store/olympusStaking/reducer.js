import actionTypes from '../../constants/actionTypes';

const initialState = {
  olympusTokenData: [],
  olympusTokenTotal: 0,
};
//takes two arguments: The current state and the action and returns the new state.
export const olympusStaking = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_OHM_TOKEN_DATA:
      return {
        ...state,
        olympusTokenData: action?.payload,
      };
    case actionTypes.GET_OHM_TOKEN_TOTAL:
      return {
        ...state,
        olympusTokenTotal: action?.payload,
      };
    default:
      return state;
  }
};
