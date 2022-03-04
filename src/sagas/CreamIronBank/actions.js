import actionTypes from '../../constants/actionTypes';

export const getCreamIronTokenData = (payload) => {
  return {
    type: actionTypes.GET_CREAM_IRON_DATA,
    payload,
  };
};

export const getCreamIronTokenTotal = (payload) => {
  return {
    type: actionTypes.GET_CREAM_IRON_TOTAL,
    payload,
  };
};

export const setCreamIronIsLoading = (payload) => {
  return {
    type: actionTypes.SET_CREAM_IRON_LOADING,
    payload,
  };
};
