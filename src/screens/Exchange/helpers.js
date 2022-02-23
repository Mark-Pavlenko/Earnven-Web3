import axios from 'axios';
import ERC20ABI from '../../abi/ERC20.json';
import OneClickLiquidity from '../../abi/UniV2PoolsOneClick.json';
import Addresses from '../../contractAddresses';

export const initFilteringModalTokensList = (
  searchTokensData,
  initSendMultiSwapToken,
  initReceiveMultiSwapTokensList
) => {
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
  // test;
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
  console.log('send tokenData  single swap helper', tokenData);
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

//sushiswapV2 single swap exchange function
export const singleSushiSwapV2 = async (tokensData) => {
  //we need to get as a parameter 'slippage'. It will be percent. We takes sendTokenAmount and subtract slippage
  //(ExpectedAmountTokens - slippage) then we have amount below for this percent. This is protection from exchange rate
  // fluctuations. Then we put this value to contract like this:
  // const minAmountOut = ExpectedAmountTokens - slippage.
  // minAmountOut we will send to contract.

  console.log('single swap sushiswapV2  sendTokenAddress', tokensData.sendTokenAddress);
  console.log('single swap sushiswapV2  sendTokenAmount', tokensData.sendTokenAmount);
  console.log('single swap sushiswapV2  firstReceiveToken', tokensData.receiveTokenAddress);
  console.log('single swap sushiswapV2 gasPrice', tokensData.gasPrice);

  //liquidity pool functional - for couple of receive tokens
  // await loadWeb3();
  // const web3 = window.web3;
  // const accounts = await web3.eth.getAccounts();
  // var tokenContract = new web3.eth.Contract(ERC20ABI, sendTokenAddress);
  // const oneClickContract = new web3.eth.Contract(
  //   OneClickLiquidity,
  //   Addresses.oneClickSushiV2Contract
  // );
  // await tokenContract.methods
  //   .approve(Addresses.oneClickSushiV2Contract, sendTokenAmount)
  //   .send({ from: accounts[0], gasPrice: web3.utils.toWei(gasPrice, 'gwei') });
  // await oneClickContract.methods
  //   //.addLiquidityOneClick(tokenA, tokenB, sendTokenAddress, sendTokenAmount, minAmountOut) //examle of sending minAmountOut to contract
  //   .addLiquidityOneClick(tokenA, tokenB, sendTokenAddress, sendTokenAmount)
  //   .send({ from: accounts[0], gasPrice: web3.utils.toWei(gasPrice, 'gwei') });
};
