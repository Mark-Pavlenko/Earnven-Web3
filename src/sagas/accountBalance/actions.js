import actionTypes from '../../constants/actionTypes';

export const getAccountBalance = (payload) => {
  // console.log(payload);
  return {
    type: actionTypes.GET_ACCOUNT_BALANCE,
    payload,
  };
};
