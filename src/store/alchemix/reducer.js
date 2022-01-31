import actionTypes from '../../constants/actionTypes';

const initialState = {
  alchemixVaults: [],
};

export const alchemixVaults = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALCHEMIX_VAULT:
      return {
        alchemixVaults: action?.payload,
      };
    default:
      return state;
  }
};
