import {
  GET_TOKEN_TRANSACTIONS,
  GET_TOKEN_TRANSACTIONS_FAIL,
  GET_TOKEN_TRANSACTIONS_SAGA,
  GET_TOKEN_TRANSACTIONS_SUCCESS,
} from '../../constants/actionTypes';

export const getTokenTransactionsSaga = (tokenContractAddress, walletAddress) => {
  return {
    type: GET_TOKEN_TRANSACTIONS_SAGA,
    payload: { tokenContractAddress, walletAddress },
  };
};

export const getTokenTransactions = (isLoading) => {
  return {
    type: GET_TOKEN_TRANSACTIONS,
    payload: { isLoading },
  };
};

export const getTokenTransactionsSuccess = (currentTokenTransactions, isLoading) => {
  return {
    type: GET_TOKEN_TRANSACTIONS_SUCCESS,
    payload: { currentTokenTransactions, isLoading },
  };
};

export const getTokenTransactionsFail = (error, isLoading) => {
  return {
    type: GET_TOKEN_TRANSACTIONS_FAIL,
    payload: { error, isLoading },
  };
};
