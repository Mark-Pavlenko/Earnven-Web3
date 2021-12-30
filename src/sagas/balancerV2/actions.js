import actionTypes from '../../constants/actionTypes';

export const getbalancerV2 = (payload) => {
  return {
    type: actionTypes.GET_BALANCER_LP,
    payload,
  };
};
