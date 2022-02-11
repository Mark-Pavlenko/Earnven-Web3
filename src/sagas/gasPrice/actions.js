import actionTypes from '../../constants/actionTypes';

export const setGasData = (payload) => {
  return {
    type: actionTypes.SET_GAS_DATA,
    payload,
  };
};

export const setProposeGasPrice = (payload) => {
  return {
    type: actionTypes.SET_PROPOSE_GAS_PRICE,
    payload,
  };
};
