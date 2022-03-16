import actionTypes from '../../constants/actionTypes';

const initialState = {
  sendTokensList: [],
  receiveTokensList: [],
  initSendTokenSwap: {},
  initSendTokenMultiSwap: [],
  initReceiveFirstTokenSwap: {},
  tokenWithUSDCurrencyAmount: {},
  initReceiveMultiSwapTokensList: [],
  isSendMultiSwapTokensListLoading: true,
  isReceiveMultiSwapTokensListLoading: true,

  // isReceiveMultiSwapUSDCurrencyLoading: true,
};
//takes two arguments: The current state and the action and returns the new state.
export const tokensListReducer = (state = initialState, action) => {
  // console.log('action payload tokens list reducer', state);
  switch (action.type) {
    case actionTypes.SET_INIT_SEND_MULTISWAP_TOKENS_LISTS_LIST_LOADING:
      return {
        ...state,
        isSendMultiSwapTokensListLoading: action?.payload,
      };

    case actionTypes.SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST_LOADING:
      return {
        ...state,
        isReceiveMultiSwapTokensListLoading: action?.payload,
      };

    case actionTypes.GET_SEND_TOKENS_LIST:
      return {
        ...state,
        sendTokensList: action?.payload,
      };

    case actionTypes.GET_RECEIVE_TOKENS_LIST:
      return {
        ...state,
        receiveTokensList: action?.payload,
      };

    case actionTypes.SET_INIT_SEND_TOKEN_SWAP:
      return {
        ...state,
        initSendTokenSwap: action?.payload,
      };

    case actionTypes.SET_INIT_SEND_MULTISWAP_TOKENS_LIST:
      return {
        ...state,
        initSendTokenMultiSwap: action?.payload,
      };

    case actionTypes.SET_INIT_RECEIVE_FIRST_TOKEN_SWAP:
      return {
        ...state,
        initReceiveFirstTokenSwap: action?.payload,
      };

    case actionTypes.SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST:
      return {
        ...state,
        initReceiveMultiSwapTokensList: action?.payload,
      };
    //unused
    case actionTypes.SET_INIT_USD_CURRENCY_TOKEN_AMOUNT:
      return {
        ...state,
        tokenWithUSDCurrencyAmount: action?.payload,
      };

    default:
      return state;
  }
};
