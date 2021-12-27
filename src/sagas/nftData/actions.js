import actionTypes from '../../constants/actionTypes';

export const getNftData = (payload) => {
  console.log('payload', payload);
  return {
    type: actionTypes.GET_NFT_DATA,
    payload,
  };
};
