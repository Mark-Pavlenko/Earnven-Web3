import actionTypes from '../../constants/actionTypes';

const initialState = {
  curveTokenData: [],
  curveTokenTotal: 0,
};
//takes two arguments: The current state and the action and returns the new state.
export const curveToken = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CRV_TOKEN_DATA:
      return {
        ...state,
        curveTokenData: action?.payload,
      };
    case actionTypes.GET_CRV_TOKEN_TOTAL:
      return {
        ...state,
        curveTokenTotal: action?.payload,
      };
    default:
      return state;
  }
};
