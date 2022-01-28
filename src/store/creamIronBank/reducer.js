import actionTypes from '../../constants/actionTypes';

const initialState = {
  creamIronBankTotal: 0,
};

export const creamIronBank = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREAM_IRON_BANK_TOTAL:
      return {
        ...state,
        creamIronBankTotal: action?.payload,
      };
    default:
      return state;
  }
};
