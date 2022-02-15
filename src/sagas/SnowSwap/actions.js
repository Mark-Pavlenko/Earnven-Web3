import actionTypes from '../../constants/actionTypes';

export const getSnowSwapData = (payload) => {
  return {
    type: actionTypes.GET_SNOW_SWAP_DATA,
    payload,
  };
};

export const getSnowSwapTotal = (payload) => {
  return {
    type: actionTypes.GET_SNOW_SWAP_TOTAL,
    payload,
  };
};
