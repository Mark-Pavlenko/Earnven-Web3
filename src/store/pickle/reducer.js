import actionTypes from '../../constants/actionTypes';

const initialState = {
  pickeStake: [],
  pickleStakeTotal: 0,
};

const initialStateDill = {
  pickeDill: [],
  pickeDillTotal: 0,
};

export const pickeStake = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PICKLE_STAKE:
      return {
        ...state,
        pickeStake: action?.payload,
      };
    case actionTypes.SET_PICKLE_STAKE_TOTAL:
      return {
        ...state,
        pickleStakeTotal: action?.payload,
      };
    default:
      return state;
  }
};

export const pickeDill = (state = initialStateDill, action) => {
  switch (action.type) {
    case actionTypes.GET_PICKLE_DILL:
      return {
        ...state,
        pickeDill: action?.payload,
        pickeDillTotal: action?.payload[0].total,
      };
    default:
      return state;
  }
};
