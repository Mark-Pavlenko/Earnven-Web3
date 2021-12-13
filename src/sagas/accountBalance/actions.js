import actionTypes from '../../constants/actionTypes';

export const getAccountBalance = (payload) => {
  // console.log(payload);
  return {
    type: actionTypes.GET_ACCOUNT_BALANCE,
    payload,
  };
};

export const getAccountLoader = (payload) => {
  // console.log(payload);
  return {
    type: actionTypes.SET_ACCOUNT_LOADER,
    payload,
  };
};
