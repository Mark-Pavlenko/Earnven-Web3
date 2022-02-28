import actionTypes from '../../constants/actionTypes';

export const getConvexStakingData = (payload) => {
  return {
    type: actionTypes.GET_CVX_TOKEN_DATA,
    payload,
  };
};

export const getConvexStakingTotal = (payload) => {
  return {
    type: actionTypes.GET_CVX_TOKEN_TOTAL,
    payload,
  };
};

export const setConvexIsLoading = (payload) => {
  return {
    type: actionTypes.SET_CONVEX_LOADING,
    payload,
  };
};
