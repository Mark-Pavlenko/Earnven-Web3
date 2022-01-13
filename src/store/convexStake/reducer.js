import actionTypes from '../../constants/actionTypes';

const initialState = {
  convexStakeData: [],
};

export const convexStake = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CONVEX_STAKE_DATA:
      return {
        convexStakeData: action?.payload,
      };
    default:
      return state;
  }
};
