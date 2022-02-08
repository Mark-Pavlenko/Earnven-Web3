import {
  GET_TOKEN_PRICE_HISTORY,
  GET_TOKEN_PRICE_HISTORY_FAIL,
  GET_TOKEN_PRICE_HISTORY_SAGA,
  GET_TOKEN_PRICE_HISTORY_SUCCESS,
} from '../../constants/actionTypes';

export const getTokenPriceHistorySaga = (tokenId) => {
  return {
    type: GET_TOKEN_PRICE_HISTORY_SAGA,
    payload: { tokenId },
  };
};

export const getTokenPriceHistory = (isLoading) => {
  return {
    type: GET_TOKEN_PRICE_HISTORY,
    payload: { isLoading },
  };
};

export const getTokenPriceHistorySuccess = (tokenPriceHistory, isLoading) => {
  return {
    type: GET_TOKEN_PRICE_HISTORY_SUCCESS,
    payload: { tokenPriceHistory, isLoading },
  };
};

export const getTokenPriceHistoryFail = (error, isLoading) => {
  return {
    type: GET_TOKEN_PRICE_HISTORY_FAIL,
    payload: { error, isLoading },
  };
};
