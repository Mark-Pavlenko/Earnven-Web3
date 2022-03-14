import actionType from '../../constants/actionTypes';

export const getSendTokensList = (payload) => {
  // console.log('getSendTokensList action payload', payload);
  return {
    type: actionType.GET_SEND_TOKENS_LIST,
    payload,
  };
};

export const setInitSendTokenSwap = (payload) => {
  // console.log('InitialSendTokenSingleSwap', payload);
  return {
    type: actionType.SET_INIT_SEND_TOKEN_SWAP,
    payload,
  };
};

export const setInitSendTokenMultiSwap = (payload) => {
  console.log('InitialSendTokenMultiSwap', payload);
  return {
    type: actionType.SET_INIT_SEND_MULTISWAP_TOKEN,
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

export const setInitReceiveFirstTokenSwap = (payload) => {
  // console.log('InitialReceiveFirstTokenSwap', payload);
  return {
    type: actionType.SET_INIT_RECEIVE_FIRST_TOKEN_SWAP,
    payload,
  };
};

export const setInitReceiveMultiSwapTokensList = (payload) => {
  // console.log('set InitialReceive MULTISWAP Tokens list', payload);
  return {
    type: actionType.SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST,
    payload,
  };
};

export const setInitSendMultiSwapTokensListLoading = (payload) => {
  // console.log('set InitialReceive MULTISWAP Tokens list loading', payload);
  return {
    type: actionType.SET_INIT_SEND_MULTISWAP_TOKENS_LIST_LOADING,
    payload,
  };
};

export const setInitReceiveMultiSwapTokensListLoading = (payload) => {
  // console.log('set InitialReceive MULTISWAP Tokens list loading', payload);
  return {
    type: actionType.SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST_LOADING,
    payload,
  };
};
//unused
export const getInitTokenWithUSDCurrencyAmount = (payload) => {
  return {
    type: actionType.SET_INIT_USD_CURRENCY_TOKEN_AMOUNT,
    payload,
  };
};
