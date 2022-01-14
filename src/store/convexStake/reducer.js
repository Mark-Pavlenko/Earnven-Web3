import actionTypes from '../../constants/actionTypes';

const initialState = {
  convexStakeData: [],
  convexStakeTotal: 0,
  convexStakingTokenImage: '',
};

export const convexStake = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CONVEX_STAKE_DATA:
      return {
        ...state,
        convexStakeData: action?.payload,
      };
    case actionTypes.SET_CONVEX_STAKE_TOTAL:
      return {
        ...state,
        convexStakeTotal: action?.payload,
      };
    case actionTypes.SET_CONVEX_STAKE_TOKEN_IMAGE:
      return {
        ...state,
        convexStakingTokenImage: action?.payload,
      };
    default:
      return state;
  }
};
