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

export const setBalancerProtocolisLoading = (payload) => {
  return {
    type: actionTypes.SET_BALANCER_PROTOCOL_LOADING,
    payload,
  };
};
