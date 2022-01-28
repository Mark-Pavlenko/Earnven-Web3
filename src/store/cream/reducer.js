import actionTypes from '../../constants/actionTypes';

const initialState = {
  creamData: [],
  creamTotal: 0,
};

export const cream = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CREAM_DATA:
      return {
        ...state,
        creamData: action?.payload,
      };
    case actionTypes.SET_CREAM_TOTAL:
      return {
        ...state,
        creamTotal: action?.payload,
      };
    default:
      return state;
  }
};
