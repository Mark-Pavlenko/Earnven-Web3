import GET_SEND_TOKENS_LIST from '../../constants/actionTypes';

export const getAddressInfoData = (payload) => {
  console.log('getAddressInfoData action payload', payload);
  return {
    type: GET_SEND_TOKENS_LIST,
    payload,
  };
};
