import actionTypes from '../../constants/actionTypes';

export const getmStable = (payload) => {
  return {
    type: actionTypes.GET_MSTABLE_SAVINGS,
    payload,
  };
};

export const getmStableFarm = (payload) => {
  return {
    type: actionTypes.GET_MSTABLE_FARM,
    payload,
  };
};

export const getmStablePools = (payload) => {
  return {
    type: actionTypes.GET_MSTABLE_POOL,
    payload,
  };
};
