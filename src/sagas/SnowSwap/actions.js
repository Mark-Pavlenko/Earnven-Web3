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

export const setSnowSwapIsLoading = (payload) => {
  return {
    type: actionTypes.SET_SNOW_SWAP_LOADING,
    payload,
  };
};
