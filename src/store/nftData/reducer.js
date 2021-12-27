import actionTypes from '../../constants/actionTypes';

const initialState = {
  nftData: [],
};

export const nftData = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_NFT_DATA:
      return {
        // ...state,
        // for single data
        nftData: action?.payload,
        // get nft data as a group
        // nftData: state.nftData.concat(action?.payload),
      };
    case actionTypes.INITIAL_NFT_DATA:
      console.log('initial state', initialState);
      return {
        nftData: initialState,
      };
    case actionTypes.TEST:
      return {
        nftData: [],
      };
    default:
      return state;
  }
};
