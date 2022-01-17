import actionTypes from '../../constants/actionTypes';

export const setAaveTokenData = (payload) => {
  return {
    type: actionTypes.SET_AAVE_STAKING_DATA,
    payload,
  };
};
