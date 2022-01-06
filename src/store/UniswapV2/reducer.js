import actionTypes from '../../constants/actionTypes';

const initialState = {
  uniswapV2lp: [],
};

export const uniswapV2lp = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_UNISWAPV2_LP:
      return {
        uniswapV2lp: action?.payload,
      };
    default:
      return state;
  }
};
