import actionTypes from '../../constants/actionTypes';

export const getCurveStakingData = (payload) => {
  return {
    type: actionTypes.GET_CRV_STKCLM_DATA,
    payload,
  };
};

export const getCurveStakingTotal = (payload) => {
  return {
    type: actionTypes.GET_CRV_STKCLM_TOTAL,
    payload,
  };
};
