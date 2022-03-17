import axios from 'axios';

export const initFilteringModalTokensList = (
  searchTokensData,
  initSendMultiSwapToken,
  initReceiveMultiSwapTokensList
) => {
  console.log('helper searchTokensData', searchTokensData);
  console.log('helper initSendMultiSwapToken', initSendMultiSwapToken);
  console.log('helper initReceiveMultiSwapTokensList', initReceiveMultiSwapTokensList);

  let copyTokensList = searchTokensData.tokensList.filter(function (obj) {
    return obj.address !== initSendMultiSwapToken.address;
  });

  let test;

  for (let i = copyTokensList.length - 1; i >= 0; i--) {
    for (let j = 0; j < initReceiveMultiSwapTokensList.length; j++) {
      if (
        copyTokensList[i] &&
        copyTokensList[i].address === initReceiveMultiSwapTokensList[j].address
      ) {
        test = copyTokensList.splice(i, 1);
      }
    }
  }
  copyTokensList.filter(function (obj) {
    return obj !== test;
  });

  return copyTokensList;
};

export const initFilteringModalTokensListMultiSwap = (tokensList, tokensListForRemoving) => {
  console.log('filter helper searchTokensData init', tokensList);
  console.log('filter helper tokensListForRemoving', tokensListForRemoving);

  let test = [...tokensList];
  for (let i = tokensList.length - 1; i >= 0; i--) {
    for (let j = 0; j < tokensListForRemoving.length; j++) {
      if (tokensList[i].address === tokensListForRemoving[j].address) {
        test.splice(i, 1);
      }
    }
  }

  console.log('filter helper test filtered', test);

  return test;
};

export const filteredTokensByName = (event, searchTokensData) => {
  console.log('searched tokens Data', searchTokensData);

  let lowerCase = event.target.value.toLowerCase();
  return searchTokensData.filter((el) => {
    if (lowerCase.input === '') {
      return el;
    }
    //return the item which contains the user input
    else if (el.name !== undefined) {
      // console.log('test el.name', el.name.includes(lowerCase));
      return el.name.toLowerCase().includes(lowerCase);
    } else {
      // console.log('undef el', el);
    }
  });
};

export const convertSendTokenToUSDCurrencyHelper = (tokenData) => {
  console.log('send tokenData single swap helper', tokenData);
  // console.log('send tokenData helper parseInt(tokenData.amount)', parseInt(tokenData.amount));

  if (tokenData.amount === '') {
    tokenData.amount = '0';
  }

  if (tokenData.USDCurrency !== undefined && tokenData.USDCurrency !== '$0.00') {
    return `$${(tokenData.USDCurrency * parseFloat(tokenData.amount)).toFixed(2)}`;
  } else if (tokenData.USDCurrency === '$0.00') {
    return 'Not able to count';
  } else {
    return 'Price not available';
  }
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

export const checkIfExchangedMultiSwapTokenLimitIsExceeded = (inputTokenData, tokensList) => {
  // console.log('result helper inputTokenAmount', inputTokenData);
  // console.log('result helper tokensList', tokensList);

  let formattedTokensList = tokensList.map((token) => {
    if (token.address === inputTokenData.address) {
      return {
        ...token,
        amount: Number(inputTokenData.amount),
      };
    }
    return {
      ...token,
    };
  });

  // console.log('result helper formattedTokensList', formattedTokensList);

  let isLimitNotExceeded = formattedTokensList.every((item) => item.balance > Number(item.amount));
  console.log('result helper isLimitNotExceeded', isLimitNotExceeded);
  return isLimitNotExceeded;
};

//sushiswapV2 single swap exchange function
export const singleSushiSwapV2 = async (tokensData) => {};

export const getTokenUSDAmount = async (tokenData) => {
  // console.log('res amount helper init', tokenData);

  if (tokenData.amount === '') {
    tokenData.amount = '0';
  }

  let tokenUSDCurrencyValue;
  let finalUSDCurrencyValue;

  if (tokenData.tokenData.address !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
    await axios
      .get(
        `https://api.ethplorer.io/getTokenInfo/${tokenData.tokenData.address}?apiKey=EK-qSPda-W9rX7yJ-UY93y`
      )
      .then(async (response) => {
        tokenUSDCurrencyValue = response;
      })
      .catch((err) => {
        console.log('err of usd currency receive token', err);
      });

    console.log('tokenUSDCurrencyValue.data.price.rate', tokenUSDCurrencyValue.data.price.rate);

    if (tokenUSDCurrencyValue.data.price.rate !== undefined) {
      finalUSDCurrencyValue = (
        tokenUSDCurrencyValue.data.price.rate * parseFloat(tokenData.amount)
      ).toFixed(3);
    } else {
      finalUSDCurrencyValue = -1;
    }
  } else {
    const ethDollarValue = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
    );
    finalUSDCurrencyValue = ethDollarValue.data.ethereum.usd * parseFloat(tokenData.amount);
  }

  // finalUSDCurrencyValue = Math.round(finalUSDCurrencyValue * 100) / 100;

  // console.log('total helper finalUSDCurrencyValue', finalUSDCurrencyValue);
  return {
    ...tokenData.tokenData,
    USDCurrency: Number(finalUSDCurrencyValue),
  };
};
