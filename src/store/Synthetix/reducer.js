import actionTypes from '../../constants/actionTypes';

const initialState = {
  snxTokenData: [],
  snxTokenTotal: 0,
  snxCollateralData: [],
  snxCollateralTotal: 0,
};

export const Synthetix = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SNX_TOKEN_DATA:
      return {
        ...state,
        snxTokenData: action.payload,
      };
    case actionTypes.GET_SNX_TOKEN_TOTAL:
      return {
        ...state,
        snxTokenTotal: action.payload,
      };
    case actionTypes.GET_SNX_COLL_DATA:
      return {
        ...state,
        snxCollateralData: action.payload,
      };
    case actionTypes.GET_SNX_COLL_TOTAL:
      return {
        ...state,
        snxCollateralTotal: action.payload,
      };
    default:
      return state;
  }
};
