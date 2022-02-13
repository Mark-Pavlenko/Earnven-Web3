import actionTypes from '../../constants/actionTypes';

export const setAaveTokenData = (payload) => {
  console.log('TestAave paylod', payload);
  return {
    type: actionTypes.SET_AAVE_STAKING_DATA,
    payload,
  };
};

export const setAaveTokenTotal = (payload) => {
  return {
    type: actionTypes.SET_AAVE_STAKING_TOTAL,
    payload,
  };
};
