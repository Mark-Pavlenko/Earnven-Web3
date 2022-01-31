import actionTypes from '../../constants/actionTypes';

export const getalchemixVaults = (payload) => {
  console.log('alchemix payload');
  return {
    type: actionTypes.GET_ALCHEMIX_VAULT,
    payload,
  };
};
