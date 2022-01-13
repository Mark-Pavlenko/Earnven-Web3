import actionTypes from '../../constants/actionTypes';

export const getpickleStake = (payload) => {
  return {
    type: actionTypes.GET_PICKLE_STAKE,
    payload,
  };
};

export const getpickleDill = (payload) => {
  return {
    type: actionTypes.GET_PICKLE_DILL,
    payload,
  };
};
