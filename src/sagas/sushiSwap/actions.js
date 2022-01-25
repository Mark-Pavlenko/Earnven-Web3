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
