import actionTypes from '../../constants/actionTypes';

const initialState = {
  compTokenData: [],
  compTokenTotal: 0,
  compClaimValue: 0,
  compoundFinanceIsLoading: true,
};
//takes two arguments: The current state and the action and returns the new state.
export const compoundFinance = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_COMP_TOKEN_DATA:
      return {
        ...state,
        compTokenData: action?.payload,
      };
    case actionTypes.GET_COMP_TOKEN_TOTAL:
      return {
        ...state,
        compTokenTotal: action?.payload,
      };
    case actionTypes.GET_COMP_CLAIM_DATA:
      return {
        ...state,
        compClaimValue: action?.payload,
      };
    case actionTypes.SET_COMP_LOADING:
      return {
        ...state,
        compoundFinanceIsLoading: action?.payload,
      };

    default:
      return state;
  }
};
