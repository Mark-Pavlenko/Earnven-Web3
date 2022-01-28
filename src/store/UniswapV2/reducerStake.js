import actionTypes from '../../constants/actionTypes';

const initialState = {
  uniswapV2stake: [],
  uniswapV2stakeTotal: 0,
};

export const uniswapV2stake = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_UNISWAPV2_STAKE:
      return {
        ...state,
        uniswapV2stake: action?.payload,
      };
    case actionTypes.GET_UNISWAPV2_STAKE_TOTAL:
      return {
        ...state,
        uniswapV2stakeTotal: action?.payload,
      };
    default:
      return state;
  }
};
