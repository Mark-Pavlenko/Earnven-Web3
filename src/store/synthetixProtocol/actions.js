import actionTypes from '../../constants/actionTypes';

export const snxData = (payload) => ({
  type: actionTypes.SET_SNX_COLLATERAL_DATA,
  payload,
});
