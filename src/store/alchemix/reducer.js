import actionTypes from '../../constants/actionTypes';

const initialState = {
  alchemixVaults: [],
  alchemixTotal: 0,
};

export const alchemixVaults = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALX_DATA:
      return {
        ...state,
        alchemixVaults: action?.payload,
      };
    case actionTypes.GET_ALX_TOTAL:
      return {
        ...state,
        alchemixTotal: action?.payload,
      };
    default:
      return state;
  }
};
