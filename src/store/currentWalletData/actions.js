import {
  GET_WALLET_DATA,
  GET_WALLET_DATA_FAIL,
  GET_WALLET_DATA_SAGA,
  GET_WALLET_DATA_SUCCESS,
} from '../../constants/actionTypes';

export const getWalletDataSaga = (walletAddress) => {
  return {
    type: GET_WALLET_DATA_SAGA,
    payload: { walletAddress },
  };
};

export const getWalletData = (isLoading) => {
  return {
    type: GET_WALLET_DATA,
    payload: { isLoading },
  };
};

export const getWalletDataSuccess = (walletData, isLoading) => {
  return {
    type: GET_WALLET_DATA_SUCCESS,
    payload: { walletData, isLoading },
  };
};

export const getWalletDataFail = (error, isLoading) => {
  return {
    type: GET_WALLET_DATA_FAIL,
    payload: { error, isLoading },
  };
};
