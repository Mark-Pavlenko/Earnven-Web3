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
