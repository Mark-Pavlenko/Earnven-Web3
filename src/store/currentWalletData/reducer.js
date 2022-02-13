import {
  GET_WALLET_DATA,
  GET_WALLET_DATA_FAIL,
  GET_WALLET_DATA_SUCCESS,
} from '../../constants/actionTypes';

const initialState = {
  walletData: null,
  error: '',
  isLoading: false,
};

export const walletDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WALLET_DATA:
      return { ...state, isLoading: true };
    case GET_WALLET_DATA_SUCCESS:
      return {
        ...state,
        walletData: action.payload.walletData,
        isLoading: false,
      };

    case GET_WALLET_DATA_FAIL:
      return {
        ...state,
        error: 'Error',
        isLoading: false,
      };
    default:
      return { ...state };
  }
};
