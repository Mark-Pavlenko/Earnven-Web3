import actionTypes from '../../constants/actionTypes';

const initialState = {
  mStableSavings: [],
};

export const mStableSavings = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MSTABLE_SAVINGS:
      return {
        mStableSavings: action?.payload,
      };
    default:
      return state;
  }
};

const initialStateFarm = {
  mStableSavingsFarm: [],
};

export const mStableSavingsFarm = (state = initialStateFarm, action) => {
  switch (action.type) {
    case actionTypes.GET_MSTABLE_FARM:
      return {
        mStableSavingsFarm: action?.payload,
      };
    default:
      return state;
  }
};

const initialStatePool = {
  mStableSavingsPool: [],
};

export const mStableSavingsPool = (state = initialStatePool, action) => {
  switch (action.type) {
    case actionTypes.GET_MSTABLE_POOL:
      return {
        ...state,
        mStableSavingsPool: action?.payload,
      };
    default:
      return state;
  }
};
