import actionTypes from '../../constants/actionTypes';

const initialState = {
  snxData: [],
  snxTotal: 0,
};

export const SynthetixProtocol = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SNX_COLLATERAL_DATA:
      return {
        ...state,
        snxData: action?.payload,
      };
    case actionTypes.SET_SNX_TOTAL:
      console.log('SET_SNX_TOTAL', action?.payload);
      return {
        ...state,
        snxTotal: action?.payload,
      };
    default:
      return state;
  }
};
