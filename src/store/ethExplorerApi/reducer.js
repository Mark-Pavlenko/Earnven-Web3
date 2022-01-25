import actionTypes from '../../constants/actionTypes';

const initialState = {
  ethExplorerApi: [],
};

export const ethExplorerApi = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ETH_API:
      return {
        ethExplorerApi: action?.payload,
      };
    default:
      return state;
  }
};
