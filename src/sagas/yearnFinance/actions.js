import actionTypes from '../../constants/actionTypes';

export const getYearnFinaceTokenData = (payload) => {
  return {
    type: actionTypes.GET_YFI_TOKEN_DATA,
    payload,
  };
};

export const getYearnFinanceTokenTotal = (payload) => {
  return {
    type: actionTypes.GET_YFI_TOKEN_TOTAL,
    payload,
  };
};

export const getYTokenData = (payload) => {
  return {
    type: actionTypes.GET_YTOKEN_DATA,
    payload,
  };
};

export const getYTokenTotal = (payload) => {
  return {
    type: actionTypes.GET_YTOKEN_TOTAL,
    payload,
  };
};

export const setYearnFinanceisLoading = (payload) => {
  return {
    type: actionTypes.SET_YFI_LOADING,
    payload,
  };
};
