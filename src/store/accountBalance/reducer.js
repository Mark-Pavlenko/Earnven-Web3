import actionTypes from '../../constants/actionTypes';

const initialState = {
  accountBalance: [],
};

//reducer to get all users data
export const accountBalance = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ACCOUNT_BALANCE:
      // console.log('=============', action.payload);
      // console.log('statestatestatestate', state);
      return {
        ...state,
        ...state.accountBalance,
        accountBalance: action?.payload,
      };
    default:
      return state;
  }
};
