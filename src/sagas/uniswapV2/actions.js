import actionTypes from '../../constants/actionTypes';

export const getuniswapV2 = (payload) => {
  return {
    type: actionTypes.GET_UNISWAPV2_LP,
    payload,
  };
};

export const getuniswapV2stake = (payload) => {
  return {
    type: actionTypes.GET_UNISWAPV2_STAKE,
    payload,
  };
};
