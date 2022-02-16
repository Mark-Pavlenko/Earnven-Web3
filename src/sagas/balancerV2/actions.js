import actionTypes from '../../constants/actionTypes';

export const getbalancerV2 = (payload) => {
  return {
    type: actionTypes.GET_BALANCER_LP,
    payload,
  };
};

export const getBalancerV2Total = (payload) => {
  return {
    type: actionTypes.GET_BALANCER_LP_TOT,
    payload,
  };
};
