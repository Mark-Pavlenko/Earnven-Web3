import actionTypes from '../../constants/actionTypes';

export const setpickleStake = (payload) => {
  return {
    type: actionTypes.SET_PICKLE_STAKE,
    payload,
  };
};

export const setpickleStakeTotal = (payload) => {
  return {
    type: actionTypes.SET_PICKLE_STAKE_TOTAL,
    payload,
  };
};

export const setpickleDill = (payload) => {
  return {
    type: actionTypes.GET_PICKLE_DILL,
    payload,
  };
};

export const setPickleDillIsLoading = (payload) => {
  return {
    type: actionTypes.SET_PICKLE_DILL_LOADING,
    payload,
  };
};
