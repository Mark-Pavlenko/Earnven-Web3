import actionTypes from '../../constants/actionTypes';

export const snxData = (payload) => ({
  type: actionTypes.SET_SNX_COLLATERAL_DATA,
  payload,
});

export const snxTotal = (payload) => ({
  type: actionTypes.SET_SNX_TOTAL,
  payload,
});

export const snxTokenData = (payload) => ({
  type: actionTypes.SET_SNX_TOKEN_DATA,
  payload,
});

export const snxTokenTotal = (payload) => ({
  type: actionTypes.SET_SNX_TOKEN_TOTAL,
  payload,
});
