import actionTypes from '../../constants/actionTypes';

//The parameter currentState/state needs a default value equals to the initial structure of the store, and for that
//create an object called initialState and assign it as the default value of currentState.
//this current state passed as argument in the below function
const initialState = {
  sushiStakeData: [],
  sushiStakeTotal: 0,
};
//takes two arguments: The current state and the action and returns the new state.
export const sushiStaking = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SLP_STAKE_DATA:
      return {
        ...state,
        sushiStakeData: action?.payload,
      };
    case actionTypes.GET_SLP_STAKE_TOTAL:
      return {
        ...state,
        sushiStakeTotal: action?.payload,
      };
    default:
      return state;
  }
};
