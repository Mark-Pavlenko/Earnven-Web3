import actionTypes from '../../constants/actionTypes';

const initialState = {
  mStableStakingData: [],
  mStableTotal: 0,
  mStableStakingIsLoading: true,
};

export const mStableStaking = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MSTABLE_STAKE_DATA:
      return {
        ...state,
        mStableStakingData: action?.payload,
      };
    case actionTypes.GET_MSTABLE_STAKE_TOTAL:
      return {
        ...state,
        mStableTotal: action?.payload,
      };
    case actionTypes.SET_MSTABLE_LOADING:
      return {
        ...state,
        mStableStakingIsLoading: action?.payload,
      };
    default:
      return state;
  }
};

// const initialStateFarm = {
//   mStableSavingsFarm: [],
// };

// export const mStableSavingsFarm = (state = initialStateFarm, action) => {
//   switch (action.type) {
//     case actionTypes.GET_MSTABLE_FARM:
//       return {
//         mStableSavingsFarm: action?.payload,
//       };
//     default:
//       return state;
//   }
// };

// const initialStatePool = {
//   mStableSavingsPool: [],
// };

// export const mStableSavingsPool = (state = initialStatePool, action) => {
//   switch (action.type) {
//     case actionTypes.GET_MSTABLE_POOL:
//       return {
//         ...state,
//         mStableSavingsPool: action?.payload,
//       };
//     default:
//       return state;
//   }
// };
