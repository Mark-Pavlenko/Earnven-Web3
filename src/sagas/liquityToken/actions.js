import actionTypes from '../../constants/actionTypes';

export const getLiquityTokenData = (payload) => {
  return {
    type: actionTypes.GET_LQTY_TOKEN_DATA,
    payload,
  };
};

export const getLiquityTokenTotal = (payload) => {
  return {
    type: actionTypes.GET_LQTY_TOKEN_TOTAL,
    payload,
  };
};
