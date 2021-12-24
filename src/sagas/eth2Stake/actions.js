import actionTypes from '../../constants/actionTypes';

export const getEth2StakeData = (payload) => {
  console.log('TestABC payload', payload);
  return {
    type: actionTypes.GET_ETH2_STAKE_DATA,
    payload,
  };
};

export const getEth2StakeTotalValue = (payload) => {
  console.log('TestABC ETH2 Totalvalue payload', payload);
  return {
    type: actionTypes.GET_ETH2_STAKE_TOTAL,
    payload,
  };
};
