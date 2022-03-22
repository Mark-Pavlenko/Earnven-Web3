import actionTypes from '../../constants/actionTypes';

export const getEth2StakeData = (payload) => {
  return {
    type: actionTypes.GET_ETH2_STAKE_DATA,
    payload,
  };
};

export const getEth2StakeTotalValue = (payload) => {
  return {
    type: actionTypes.GET_ETH2_STAKE_TOTAL,
    payload,
  };
};

export const setEth2IsLoading = (payload) => {
  return {
    type: actionTypes.SET_ETH2_LOADING,
    payload,
  };
};
