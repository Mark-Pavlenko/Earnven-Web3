import actionTypes from '../../constants/actionTypes';

const initialState = {
  AaveStakingData: [],
};

export const AaveStaking = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AAVE_STAKING_DATA:
      return {
        AaveStakingData: action?.payload,
      };
    default:
      return state;
  }
};
