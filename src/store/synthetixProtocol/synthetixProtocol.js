import actionTypes from '../../constants/actionTypes';

const initialState = {
  snxData: [],
  snxTokenData: [],
  snxTotal: 0,
  snxTokenTotal: 0,
};

export const SynthetixProtocol = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SNX_COLLATERAL_DATA:
      return {
        ...state,
        snxData: action?.payload,
      };
    case actionTypes.SET_SNX_TOTAL:
      return {
        ...state,
        snxTotal: action?.payload,
      };
    case actionTypes.SET_SNX_TOKEN_DATA:
      return {
        ...state,
        snxTokenData: action?.payload,
      };
    case actionTypes.SET_SNX_TOKEN_TOTAL:
      return {
        ...state,
        snxTokenTotal: action?.payload,
      };
    default:
      return state;
  }
};
