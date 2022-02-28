import actionTypes from '../../constants/actionTypes';
//c
export const getuniswapV2 = (payload) => {
  return {
    type: actionTypes.GET_UNISWAPV2_LP,
    payload,
  };
};

export const setUniswapV2isLoading = (payload) => {
  return {
    type: actionTypes.SET_UNISWAPV2_PROTOCOL_LOADING,
    payload,
  };
};

export const getuniswapV2stake = (payload) => {
  return {
    type: actionTypes.GET_UNISWAPV2_STAKE,
    payload,
  };
};

export const getuniswapV2stakeTotal = (payload) => {
  return {
    type: actionTypes.GET_UNISWAPV2_STAKE_TOTAL,
    payload,
  };
};
