import GET_THEME from '../../constants/actionTypes';
import GET_WEB3_OBJECT from '../../constants/actionTypes';

const initialState = {
  isLightTheme: true,
  web3Object: {},
};

export const web3Reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WEB3_OBJECT:
      console.log('action from reducer for web3', action);
      return {
        // ...state,
        // web3Data: action.web3Data,
      };
    default:
      return state;
  }
};

export const getWeb3Object = (web3Object) => {
  console.log('web3Object', web3Object);
  return { type: 'GET_WEB3_OBJECT', web3Object: web3Object };
};
