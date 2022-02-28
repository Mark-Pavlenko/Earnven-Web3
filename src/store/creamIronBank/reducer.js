import actionTypes from '../../constants/actionTypes';

const initialState = {
  creamIronBankData: [],
  creamIronBankTotal: 0,
  creamIronBankIsLoading: true,
};

export const creamIronBank = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CREAM_IRON_DATA:
      return {
        ...state,
        creamIronBankData: action?.payload,
      };
    case actionTypes.GET_CREAM_IRON_TOTAL:
      return {
        ...state,
        creamIronBankTotal: action?.payload,
      };
    case actionTypes.SET_CREAM_IRON_LOADING:
      return {
        ...state,
        creamIronBankIsLoading: action?.payload,
      };
    default:
      return state;
  }
};
