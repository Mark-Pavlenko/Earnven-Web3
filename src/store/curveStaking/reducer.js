import actionTypes from '../../constants/actionTypes';

//The parameter currentState/state needs a default value equals to the initial structure of the store, and for that
//create an object called initialState and assign it as the default value of currentState.
//this current state passed as argument in the below function
const initialState = {
  curveStakingData: [],
  curveStakingTotal: 0,
};
//takes two arguments: The current state and the action and returns the new state.
export const curveStaking = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CRV_STKCLM_DATA:
      return {
        ...state,
        curveStakingData: action?.payload,
      };
    case actionTypes.GET_CRV_STKCLM_TOTAL:
      return {
        ...state,
        curveStakingTotal: action?.payload,
      };
    default:
      return state;
  }
};
