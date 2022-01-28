import actionTypes from '../../constants/actionTypes';

const initialState = {
  AaveStakingData: [],
  AaveStakingTotal: 0,
};

export const AaveStaking = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AAVE_STAKING_DATA:
      return {
        AaveStakingData: action?.payload,
        AaveStakingTotal: action?.payload[0].totalValue,
      };
    default:
      return state;
  }
};
