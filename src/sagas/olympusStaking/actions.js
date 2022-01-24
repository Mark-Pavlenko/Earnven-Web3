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
