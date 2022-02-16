import actionTypes from '../../constants/actionTypes';

export const getCreamIronTokenData = (payload) => {
  return {
    type: actionTypes.GET_CREAM_IRON_DATA,
    payload,
  };
};

export const getCreamIronTokenTotal = (payload) => {
  return {
    type: actionTypes.GET_CREAM_IRON_TOTAL,
    payload,
  };
};
