import actionTypes from '../../constants/actionTypes';

const initialState = {
  liquityTokenData: [],
  liquityTokenTotal: 0,
};
//takes two arguments: The current state and the action and returns the new state.
export const liquityToken = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LQTY_TOKEN_DATA:
      return {
        ...state,
        liquityTokenData: action?.payload,
      };
    case actionTypes.GET_LQTY_TOKEN_TOTAL:
      return {
        ...state,
        liquityTokenTotal: action?.payload,
      };
    default:
      return state;
  }
};
