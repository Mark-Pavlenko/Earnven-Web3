import actionType from '../../constants/actionTypes';

export const getSendTokensList = (payload) => {
  // console.log('getSendTokensList action payload', payload);
  return {
    type: actionType.GET_SEND_TOKENS_LIST,
    payload,
  };
};

export const getReceiveTokensList = (payload) => {
  // console.log('getReceiveTokensList action payload', payload);
  return {
    type: actionType.GET_RECEIVE_TOKENS_LIST,
    payload,
  };
};
