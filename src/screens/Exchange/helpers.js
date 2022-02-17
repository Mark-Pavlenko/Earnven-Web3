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

  console.log('multiswap helper tokenData', tokenData);

  if (tokenData.amount === '') {
    tokenData.amount = '0';
  }

  // if (tokenData.symbol === 'ETH') {
  //   axios
  //     .get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
  //     .then((res) => {
  //       const ethData = res.data;
  //       console.log('ethData helper', ethData);
  //       return `$${(ethData.ethereum.usd * parseInt(tokenData.amount)).toFixed(2)}`;
  //     });
  // } else {
  if (tokenData.USDCurrency !== undefined) {
    return `$${(tokenData.USDCurrency * parseInt(tokenData.amount)).toFixed(2)}`;
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
