import actionTypes from '../../constants/actionTypes';

export const setCreamData = (payload) => {
  return {
    type: actionTypes.SET_CREAM_DATA,
    payload,
  };
};

export const setCreamTotal = (payload) => {
  return {
    type: actionTypes.SET_CREAM_TOTAL,
    payload,
  };
};
