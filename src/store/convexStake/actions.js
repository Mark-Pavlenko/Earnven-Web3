import actionTypes from '../../constants/actionTypes';

export const setConvexStakingData = (payload) => {
  return {
    type: actionTypes.SET_CONVEX_STAKE_DATA,
    payload,
  };
};

export const setConvexStakingTotal = (payload) => {
  return {
    type: actionTypes.SET_CONVEX_STAKE_TOTAL,
    payload,
  };
};

export const setConvexStakingTokenImage = (payload) => {
  return {
    type: actionTypes.SET_CONVEX_STAKE_TOKEN_IMAGE,
    payload,
  };
};
