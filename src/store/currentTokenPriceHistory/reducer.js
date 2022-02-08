import {
  GET_TOKEN_PRICE_HISTORY_FAIL,
  GET_TOKEN_PRICE_HISTORY,
  GET_TOKEN_PRICE_HISTORY_SUCCESS,
} from '../../constants/actionTypes';

const initialState = {
  tokenPriceHistory: [],
  error: '',
  isLoading: false,
};

export const tokenPriceHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOKEN_PRICE_HISTORY:
      return { ...state, isLoading: true };
    case GET_TOKEN_PRICE_HISTORY_SUCCESS:
      return {
        ...state,
        tokenPriceHistory: action.payload.tokenPriceHistory,
        isLoading: false,
      };

    case GET_TOKEN_PRICE_HISTORY_FAIL:
      return {
        ...state,
        error: 'Error',
        isLoading: false,
      };
    default:
      return { ...state };
  }
};
