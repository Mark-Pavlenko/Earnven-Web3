import actionTypes from '../../constants/actionTypes';

const initialState = {
  snxData: [],
};

export const SynthetixProtocol = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SNX_COLLATERAL_DATA:
      return {
        ...state,
        snxData: action?.payload,
      };
    default:
      return state;
  }
};
