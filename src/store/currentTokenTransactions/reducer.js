import {
  GET_TOKEN_TRANSACTIONS,
  GET_TOKEN_TRANSACTIONS_FAIL,
  GET_TOKEN_TRANSACTIONS_SUCCESS,
} from '../../constants/actionTypes';

const initialState = {
  currentTokenTransactions: null,
  error: '',
  isLoading: false,
};

export const currentTokenTransactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOKEN_TRANSACTIONS:
      return { ...state, isLoading: true };
    case GET_TOKEN_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        currentTokenTransactions: action.payload.currentTokenTransactions,
        isLoading: false,
      };

    case GET_TOKEN_TRANSACTIONS_FAIL:
      return {
        ...state,
        error: 'Error',
        isLoading: false,
      };
    default:
      return { ...state };
  }
};
