import GET_ADDRESS_INFO_DATA from '../../constants/actionTypes';

export const getAddressInfoData = (payload) => {
  console.log('getAddressInfoData action payload', payload);
  return {
    type: GET_ADDRESS_INFO_DATA,
    payload,
  };
};
