import actionTypes from '../../constants/actionTypes';

export const getethApi = (payload) => {
  return {
    type: actionTypes.GET_ETH_API,
    payload,
  };
};
