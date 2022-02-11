import actionTypes from '../../constants/actionTypes';

export const getSythetixTokenData = (payload) => {
  return {
    type: actionTypes.GET_SNX_TOKEN_DATA,
    payload,
  };
};

export const getSythetixTokenTotal = (payload) => {
  return {
    type: actionTypes.GET_SNX_TOKEN_TOTAL,
    payload,
  };
};

export const getSythetixCollateralData = (payload) => {
  return {
    type: actionTypes.GET_SNX_COLL_DATA,
    payload,
  };
};

export const getSythetixCollateralTotal = (payload) => {
  return {
    type: actionTypes.GET_SNX_COLL_TOTAL,
    payload,
  };
};
