import actionTypes from '../../constants/actionTypes';

const initialState = {
  curveLpTokenData: [],
  curveLpTokenImages: [],
  curveLpTokenTotal: 0,
};
//takes two arguments: The current state and the action and returns the new state.
export const curveLpToken = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURVE_LP_TOKEN_DATA:
      return {
        ...state,
        curveLpTokenData: action?.payload,
      };
    case actionTypes.GET_CRV_LP_TOKEN_IMAGES:
      return {
        ...state,
        curveLpTokenImages: [...state.curveLpTokenImages, action?.payload],
        // curveLpTokenImages: [...state.curveLpTokenImages, action?.payload].flat(),
      };
    case actionTypes.SET_CURVE_LP_TOKEN_TOTAL:
      return {
        ...state,
        curveLpTokenTotal: action?.payload,
      };
    default:
      return state;
  }
};
