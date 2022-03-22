import actionTypes from '../../constants/actionTypes';

export const getOHMTokenData = (payload) => {
  return {
    type: actionTypes.GET_OHM_TOKEN_DATA,
    payload,
  };
};

export const getOHMTokenTotal = (payload) => {
  return {
    type: actionTypes.GET_OHM_TOKEN_TOTAL,
    payload,
  };
};

export const setOlympusIsLoading = (payload) => {
  return {
    type: actionTypes.SET_OHM_LOADING,
    payload,
  };
};
