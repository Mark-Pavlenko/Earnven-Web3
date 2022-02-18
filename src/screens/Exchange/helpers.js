import axios from 'axios';

export const filteredTokensByName = (event, searchTokensData) => {
  console.log('searched tokens Data', searchTokensData);

  let lowerCase = event.target.value.toLowerCase();
  return searchTokensData.tokensList.filter((el) => {
    if (lowerCase.input === '') {
      return el;
    }
    //return the item which contains the user input
    else if (el.name !== undefined) {
      return el.name.toLowerCase().includes(lowerCase);
    } else {
      // console.log('undef el', el);
    }
  });
};

export const convertSendTokenToUSDCurrencyHelper = (tokenData) => {
  let convertedUSDValue;
  // convertedUSDValue = 'Loading';
  // setTokenSendUSDCurrency('Loading');

  console.log('send tokenData helper', tokenData);
  // console.log('send tokenData helper parseInt(tokenData.amount)', parseInt(tokenData.amount));

  if (tokenData.amount === '') {
    tokenData.amount = '0';
  }

  if (tokenData.USDCurrency !== undefined) {
    return `$${(tokenData.USDCurrency * parseFloat(tokenData.amount)).toFixed(2)}`;
  } else {
    return 'Price not available';
  }
  // }
};

export const checkIfExchangedTokenLimitIsExceeded = (chosenTokenAmount, totalTokensBalance) => {
  if (chosenTokenAmount > totalTokensBalance) {
    console.log('limit is exceeded');
    return true;
  } else {
    console.log('limit is not exceeded');
    return false;
  }
};
