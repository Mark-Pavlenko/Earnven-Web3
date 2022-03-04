import actionTypes from '../../constants/actionTypes';

export const getSushiStakeData = (payload) => {
  return {
    type: actionTypes.GET_SLP_STAKE_DATA,
    payload,
  };
};

export const getSushiStakeTotalValue = (payload) => {
  return {
    type: actionTypes.GET_SLP_STAKE_TOTAL,
    payload,
  };
};
export const setSushiStakeIsLoading = (payload) => {
  return {
    type: actionTypes.SET_SUSHI_STAKE_LOADING,
    payload,
  };
};
