import actionTypes from '../../constants/actionTypes';

//The parameter currentState/state needs a default value equals to the initial structure of the store, and for that
//create an object called initialState and assign it as the default value of currentState.
//this current state passed as argument in the below function
const initialState = {
  eth2StakeData: [],
  eth2StakeTotal: 0,
  eth2StakeIsLoading: true,
};
//takes two arguments: The current state and the action and returns the new state.
export const eth2Stake = (state = initialState, action) => {
  // console.log('TestABC checking in side the reducer');
  switch (action.type) {
    case actionTypes.GET_ETH2_STAKE_DATA:
      return {
        ...state,
        eth2StakeData: action?.payload,
      };
    case actionTypes.GET_ETH2_STAKE_TOTAL:
      return {
        ...state,
        eth2StakeTotal: action?.payload,
      };
    case actionTypes.SET_ETH2_LOADING:
      return {
        ...state,
        eth2StakeIsLoading: action?.payload,
      };
    default:
      return state;
  }
};
