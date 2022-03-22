import actionTypes from '../../constants/actionTypes';

export const getAaveStakeData = (payload) => {
  return {
    type: actionTypes.GET_AAVE_TOKEN_DATA,
    payload,
  };
};

export const getAaveStakeTotalValue = (payload) => {
  return {
    type: actionTypes.GET_AAVE_TOKEN_TOTAL,
    payload,
  };
};

export const setAaveIsLoading = (payload) => {
  return {
    type: actionTypes.SET_AAVE_LOADING,
    payload,
  };
};
