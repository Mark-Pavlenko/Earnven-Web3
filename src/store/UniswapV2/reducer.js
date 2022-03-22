import actionTypes from '../../constants/actionTypes';

const initialState = {
  uniswapV2lp: [],
  uniswapProtocolisLoading: true,
};

export const uniswapV2lp = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_UNISWAPV2_LP:
      return {
        uniswapV2lp: action?.payload,
      };
    case actionTypes.SET_UNISWAPV2_PROTOCOL_LOADING:
      return {
        ...state,
        uniswapProtocolisLoading: action?.payload,
      };
    default:
      return state;
  }
};
