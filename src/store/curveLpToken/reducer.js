import actionTypes from '../../constants/actionTypes';

const initialState = {
  curveLpTokenData: [],
  curveLpTokenTotal: 0,
};
//takes two arguments: The current state and the action and returns the new state.
export const curveLpToken = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CRVLP_TOKEN_DATA:
      return {
        ...state,
        curveLpTokenData: action?.payload,
      };
    case actionTypes.GET_CRVLP_TOKEN_TOTAL:
      return {
        ...state,
        curveLpTokenTotal: action?.payload,
      };
    default:
      return state;
  }
};
