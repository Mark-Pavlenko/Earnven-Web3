import actionTypes from '../../constants/actionTypes';

export const getYearnFinaceTokenData = (payload) => {
  console.log('TestYearn payload data', payload);
  return {
    type: actionTypes.GET_YFI_TOKEN_DATA,
    payload,
  };
};

export const getYearnFinanceTokenTotal = (payload) => {
  console.log('TestYearn payload total value', payload);
  return {
    type: actionTypes.GET_YFI_TOKEN_TOTAL,
    payload,
  };
};
