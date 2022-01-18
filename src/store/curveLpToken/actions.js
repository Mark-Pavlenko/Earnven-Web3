import actionTypes from '../../constants/actionTypes';

export const setCurveLpTokenImags = (payload) => {
  return {
    type: actionTypes.GET_CRV_LP_TOKEN_IMAGES,
    payload,
  };
};

export const setCurveLpTokenDataAction = (payload) => {
  return {
    type: actionTypes.SET_CURVE_LP_TOKEN_DATA,
    payload,
  };
};

export const setCurveLpTokenTotalAction = (payload) => {
  return {
    type: actionTypes.SET_CURVE_LP_TOKEN_TOTAL,
    payload,
  };
};
