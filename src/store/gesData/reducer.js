import actionTypes from '../../constants/actionTypes';

const initialState = {
  gasPriceData: [],
  selectedGasPrice: '',
  proposeGasPrice: '',
};

export const gesData = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_GAS_DATA:
      return {
        ...state,
        gasPriceData: action.payload,
      };
    case actionTypes.SET_SELECTED_GAS_PRICE:
      return {
        ...state,
        selectedGasPrice: action.payload,
      };
    case actionTypes.SET_PROPOSE_GAS_PRICE:
      return {
        ...state,
        proposeGasPrice: action.payload,
      };
    default:
      return state;
  }
};
