import actionTypes from '../../constants/actionTypes';

const initialState = {
  liquityStakeAmountUSD: 0,
};

export const LiquityStakeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LIQUITY_STAKE_AMOUNT:
      return {
        ...state,
        liquityStakeAmountUSD: action?.payload,
      };
    default:
      return state;
  }
};
