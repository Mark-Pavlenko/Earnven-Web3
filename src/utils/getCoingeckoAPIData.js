/**************************************************************************************************
Purpose : This component is used to get given CurveLpToken market price from coingecko API
Developed by : Prabhakaran.R
Version log:
---------------------------------------------------------------------------------------------------
Version      Date                Description                                    Developed/Fixed 
----------------------------------------------------------------------------------------------------
1.0         26/Oct/2021          Initial Development                             Prabhakaran.R

**************************************************************************************************/

const axios = require('axios');
//this function is to get given token/coin details from coinGecko API
const getCoingeckoAPIData = async (contractAddress, tokenAddress) => {
  console.log('I am inside to get the price of the token for token name', tokenAddress);
  let curveLpTokenMarketPrice = 0;
  //this API should run based on the lp token address but for some of the data should fetched from its
  //underlying token rather than lp token address so we need to split on this fetching process

  //list of tokens having usd price for given lp tokens from coingecko API
  let tokenListforCoingecko = new Array(
    'DAI/USDC/USDT',
    //'yDAI/yUSDC/yUSDT/yBUSD',
    'cDAI/cUSDC',
    'DAI/USDC/USDT/PAX',
    'renBTC/wBTC',
    'renBTC/wBTC/sBTC',
    'DAI/USDC/USDT/sUSD',
    'yDAI/yUSDC/yUSDT/yTUSD'
  );
  if (tokenListforCoingecko.indexOf(tokenAddress) != -1) {
    try {
      //get the current market price of the token 'Curve'
      let result = await axios.get(
        `https://api.coingecko.com/api/v3/coins/ethereum/contract/${contractAddress}`,
        {},
        {}
      );
      //return the coingecko fetched result to the calling function
      return result;
    } catch (err) {
      console.log(`Coingecko API : No data found for the given token ${contractAddress}`);
      return 0;
    }
  } //end of if find
  //Below is the list of tokens need to fetch USD price for underlying tokens
  let contractCoinAddress;
  let tokenListforEth = new Array('ETH/aETH', 'ETH/rETH', 'ETH/sETH', 'ETH/stETH');
  if (tokenListforEth.indexOf(tokenAddress) != -1) {
    contractCoinAddress = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'; //WETH address
  }
  // //look for DAI/USD pair
  // let tokenListforDAI = new Array('aDAI/aSUSD')
  // if(tokenListforDAI.indexOf(tokenAddress) !=-1) {
  //   contractCoinAddress = '0x028171bca77440897b824ca71d1c56cac55b68a3' //aDAI address
  //  }
  if (contractCoinAddress) {
    try {
      //get the current market price of the token 'Curve'
      let result = await axios.get(
        `https://api.coingecko.com/api/v3/coins/ethereum/contract/${contractCoinAddress}`,
        {},
        {}
      );
      //return the coingecko fetched result to the calling function
      return result;
    } catch (err) {
      console.log(`Coingecko API : No data found for the given token ${contractAddress}`);
      return 0;
    }
  } //end of if find
};

//getCoinDetailsFromCoingecko('0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490')

export default getCoingeckoAPIData;
