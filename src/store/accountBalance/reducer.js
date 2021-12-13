import actionTypes from '../../constants/actionTypes';

const initialState = {
  accountBalance: [],
  isLoading: false,
};

//reducer to get all users data
export const accountBalance = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ACCOUNT_BALANCE:
      return {
        ...state,
        ...state.accountBalance,
        accountBalance: action?.payload,
      };
    case actionTypes.SET_ACCOUNT_LOADER:
      return {
        isLoading: action?.payload,
      };
    default:
      return state;
  }
};
