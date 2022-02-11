import actionTypes from '../../constants/actionTypes';

export const getCurveLPTokenData = (payload) => {
  return {
    type: actionTypes.GET_CRVLP_TOKEN_DATA,
    payload,
  };
};

export const getCurveLPTokenTotal = (payload) => {
  return {
    type: actionTypes.GET_CRVLP_TOKEN_TOTAL,
    payload,
  };
};
