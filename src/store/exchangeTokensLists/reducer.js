import actionTypes from '../../constants/actionTypes';

const initialState = {
  sendTokensList: [],
  receiveTokensList: [],
  initSendTokenSwap: {},
};
//takes two arguments: The current state and the action and returns the new state.
export const tokensListReducer = (state = initialState, action) => {
  // console.log('action payload tokens list reducer', action?.payload);
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

    default:
      return state;
  }
};
