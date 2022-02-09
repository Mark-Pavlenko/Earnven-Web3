import GET_SEND_TOKENS_LIST from '../../constants/actionTypes';

const initialState = {
  addressInfoDataObject: [],
};

export const addressInfoDataReducer = (state = initialState, action) => {
  // console.log('exchangeTokensLists payload reducer', action?.payload);
  switch (action.type) {
    case GET_SEND_TOKENS_LIST:
      return {
        addressInfoDataObject: action?.payload,
      };
    default:
      return state;
  }
};
