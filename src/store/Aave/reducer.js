import actionTypes from '../../constants/actionTypes';

const initialState = {
  AaveStakingData: [],
  AaveStakingTotal: 0,
};

export const AaveStaking = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_AAVE_TOKEN_DATA:
      return {
        ...state,
        AaveStakingData: action?.payload,
      };
    case actionTypes.GET_AAVE_TOKEN_TOTAL:
      return {
        ...state,
        AaveStakingTotal: action?.payload,
      };
    default:
      return state;
  }
};
