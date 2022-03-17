import actionTypes from '../../constants/actionTypes';

export const getmStableStaking = (payload) => {
  return {
    type: actionTypes.GET_MSTABLE_STAKE_DATA,
    payload,
  };
};

export const getmStableStakingTotal = (payload) => {
  return {
    type: actionTypes.GET_MSTABLE_STAKE_TOTAL,
    payload,
  };
};

export const setmStableStakingIsLoading = (payload) => {
  return {
    type: actionTypes.SET_MSTABLE_LOADING,
    payload,
  };
};

// export const getmStableFarm = (payload) => {
//   return {
//     type: actionTypes.GET_MSTABLE_FARM,
//     payload,
//   };
// };

// export const getmStablePools = (payload) => {
//   return {
//     type: actionTypes.GET_MSTABLE_POOL,
//     payload,
//   };
// };
