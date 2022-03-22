import actionTypes from '../../constants/actionTypes';

export const getSushiSwapLPData = (payload) => {
  return {
    type: actionTypes.GET_SUSHILP_DATA,
    payload,
  };
};

export const getSushiSwapLPTotalValue = (payload) => {
  return {
    type: actionTypes.GET_SUSHILP_TOTAL,
    payload,
  };
};

export const setSushiSwapLpIsLoading = (payload) => {
  return {
    type: actionTypes.SET_SHUSHI_LP_LOADING,
    payload,
  };
};
