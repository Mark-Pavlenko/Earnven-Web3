import actionTypes from '../../constants/actionTypes';

export const getCompTokenData = (payload) => {
  return {
    type: actionTypes.GET_COMP_TOKEN_DATA,
    payload,
  };
};

export const getCompTokenTotal = (payload) => {
  return {
    type: actionTypes.GET_COMP_TOKEN_TOTAL,
    payload,
  };
};

export const getCompClaimValue = (payload) => {
  return {
    type: actionTypes.GET_COMP_CLAIM_DATA,
    payload,
  };
};

export const getCompClaimTotalValue = (payload) => {
  return {
    type: actionTypes.GET_COMP_CLAIM_TOTAL,
    payload,
  };
};

export const setCompoundFinanceIsLoading = (payload) => {
  return {
    type: actionTypes.SET_COMP_LOADING,
    payload,
  };
};
