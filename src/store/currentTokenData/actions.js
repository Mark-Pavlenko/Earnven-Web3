import {
  GET_TOKEN_DATA_SAGA,
  GET_TOKEN_DATA,
  GET_TOKEN_DATA_SUCCESS,
  GET_TOKEN_DATA_FAIL,
} from '../../constants/actionTypes';

export const getTokenDataSaga = (tokenId) => {
  return {
    type: GET_TOKEN_DATA_SAGA,
    payload: { tokenId },
  };
};

export const getTokenData = (isLoading) => {
  return {
    type: GET_TOKEN_DATA,
    payload: { isLoading },
  };
};

export const getTokenDataSuccess = (currentTokenData, isLoading) => {
  return {
    type: GET_TOKEN_DATA_SUCCESS,
    payload: { currentTokenData, isLoading },
  };
};

export const getTokenDataFail = (error, isLoading) => {
  return {
    type: GET_TOKEN_DATA_FAIL,
    payload: { error, isLoading },
  };
};
