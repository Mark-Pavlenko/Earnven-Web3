import actionTypes from '../../constants/actionTypes';

export const getalchemixVaults = (payload) => {
  return {
    type: actionTypes.GET_ALX_DATA,
    payload,
  };
};

export const getalchemixTotal = (payload) => {
  return {
    type: actionTypes.GET_ALX_TOTAL,
    payload,
  };
};
