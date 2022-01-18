import actionTypes from '../../constants/actionTypes';

const initialState = {
  pickeStake: [],
};

const initialStateDill = {
  pickeDill: [],
};

export const pickeStake = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PICKLE_STAKE:
      console.log('pickleStake', action?.payload);
      return {
        pickeStake: action?.payload,
      };
    default:
      return state;
  }
};

export const pickeDill = (state = initialStateDill, action) => {
  switch (action.type) {
    case actionTypes.GET_PICKLE_DILL:
      console.log('pickleDill', action?.payload);
      return {
        pickeDill: action?.payload,
      };
    default:
      return state;
  }
};
