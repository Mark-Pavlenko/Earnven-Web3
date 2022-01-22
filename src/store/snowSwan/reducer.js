import actionTypes from '../../constants/actionTypes';

const initialState = {
  snowSwanData: [],
};
//takes two arguments: The current state and the action and returns the new state.
export const snowSwan = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SNOW_SWAN_DATA:
      return {
        ...state,
        snowSwanData: action?.payload,
      };
    default:
      return state;
  }
};
