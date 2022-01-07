import actionTypes from '../../constants/actionTypes';

export const getCurveTokenData = (payload) => {
  return {
    type: actionTypes.GET_CRV_TOKEN_DATA,
    payload,
  };
};

export const getCurveTokenTotal = (payload) => {
  return {
    type: actionTypes.GET_CRV_TOKEN_TOTAL,
    payload,
  };
};
