// import GET_THEME from '../../constants/actionTypes';
import {
  GET_SELECTED_ADDRESS,
  GET_SELECTED_NAME,
  GET_WALLETS_LIST,
} from '../../constants/actionTypes';

let selectedAddress;
let selectedName;
let walletsList;
let myWallet;
let firstConnection;
let currentWallet;

if (localStorage.getItem('selected-account') === null) {
  selectedAddress = 'noAddress';
} else {
  selectedAddress = localStorage.getItem('selected-account');
}

if (localStorage.getItem('selected-name') === null) {
  selectedName = 'noName';
} else {
  selectedName = localStorage.getItem('selected-name');
}

if (localStorage.getItem('wallets') === null) {
  walletsList = [];
} else {
  walletsList = JSON.parse(localStorage.getItem('wallets'));
}

if (localStorage.getItem('mywallet') === null) {
  myWallet = [];
} else {
  myWallet = JSON.parse(localStorage.getItem('mywallet'))[0];
  // console.log('myWallet', myWallet);
}

// if (localStorage.getItem('firstConnection') === null) {
//   localStorage.setItem('firstConnection', true);
//   firstConnection = true;
// } else {
//   firstConnection = false;
// }

const initialState = {
  selectedAddress,
  selectedName,
  walletsList,
  myWallet,
  firstConnection: localStorage.getItem('firstConnection'),
  // currentWalletAddress: myWallet.address,
};

export const initSidebarValuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SELECTED_ADDRESS':
      console.log('GET_SELECTED_ADDRESS', action.type);
      return {
        ...state,
        selectedAddress: action.selectedAddress,
      };
    default:
      return state;
  }
};
