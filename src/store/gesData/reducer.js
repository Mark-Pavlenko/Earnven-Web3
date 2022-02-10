import actionTypes from '../../constants/actionTypes';

const initialState = {
  gasPriceData: [],
};

export const gesData = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_GAS_DATA:
      console.log('gesDataReducer', action.payload);
      return {
        ...state,
        gasPriceData: action.payload,
      };
    default:
      return state;
  }
};
