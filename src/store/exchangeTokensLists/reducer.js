import actionTypes from '../../constants/actionTypes';

const initialState = {
  sendTokensList: [],
  receiveTokensList: [],
  initSendTokenSwap: {},
  initSendTokenMultiSwap: {},
  initReceiveFirstTokenSwap: {},
  initReceiveSecondTokenSwap: {},
  initReceiveMultiSwapTokensList: [],
  isReceiveMultiSwapTokensListLoading: true,
  // isReceiveMultiSwapUSDCurrencyLoading: true,
};
//takes two arguments: The current state and the action and returns the new state.
export const tokensListReducer = (state = initialState, action) => {
  // console.log('action payload tokens list reducer', state);
  switch (action.type) {
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

    case actionTypes.SET_INIT_SEND_MULTISWAP_TOKEN:
      return {
        ...state,
        initSendTokenMultiSwap: action?.payload,
      };

    case actionTypes.SET_INIT_RECEIVE_FIRST_TOKEN_SWAP:
      return {
        ...state,
        initReceiveFirstTokenSwap: action?.payload,
      };

    case actionTypes.SET_INIT_RECEIVE_SECOND_TOKEN_SWAP:
      return {
        ...state,
        initReceiveSecondTokenSwap: action?.payload,
      };

    case actionTypes.SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST:
      return {
        ...state,
        initReceiveMultiSwapTokensList: action?.payload,
      };

    case actionTypes.SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST_LOADING:
      return {
        ...state,
        isReceiveMultiSwapTokensListLoading: action?.payload,
      };

    default:
      return state;
  }
};
