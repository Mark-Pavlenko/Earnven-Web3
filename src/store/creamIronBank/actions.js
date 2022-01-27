import actionTypes from '../../constants/actionTypes';

export const setCreamIronBankTotal = (payload) => {
  return {
    type: actionTypes.CREAM_IRON_BANK_TOTAL,
    payload,
  };
};
