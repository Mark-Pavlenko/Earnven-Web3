import actionTypes from '../../constants/actionTypes';

const initialState = {
  sendTokensList: [],
  receiveTokensList: [],
};
//takes two arguments: The current state and the action and returns the new state.
export const tokensListReducer = (state = initialState, action) => {
  console.log('action payload tokens list reducer', action?.payload);
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
        // curveLpTokenImages: [...state.curveLpTokenImages, action?.payload].flat(),
      };
    default:
      return state;
  }
};
