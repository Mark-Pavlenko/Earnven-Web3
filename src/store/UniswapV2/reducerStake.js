import actionTypes from '../../constants/actionTypes';

const initialState = {
  uniswapV2stake: [],
};

export const uniswapV2stake = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_UNISWAPV2_STAKE:
      return {
        uniswapV2stake: action?.payload,
      };
    default:
      return state;
  }
};
