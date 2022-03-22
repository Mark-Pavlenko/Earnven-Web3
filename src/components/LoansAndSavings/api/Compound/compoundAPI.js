import axios from 'axios';
import CompoundTrollerABI from '../../../../abi/CompoundTroller.json';
import addresses from '../../../../contractAddresses';

//get the compound contract data to calculate comp claimable
export const getCompClaim = async (accountAddress, web3) => {
  const compInstance = new web3.eth.Contract(CompoundTrollerABI, addresses.compTrollerAddress);
  let claimComp = await compInstance.methods.compAccrued(accountAddress).call();
  //assign the value into the array by all the corresponding value
  return {
    claimComp: claimComp,
  };
};

//get the price and token image for COMP token
export const getCompCoinData = async (tokenAddress) => {
  try {
    const result = await axios.get(
      `https://api.coingecko.com/api/v3/coins/ethereum/contract/${tokenAddress}`,
      {}
    );
    const cTokenImageUrl = result.data.image.thumb;
    const cTokenPrice = result.data.market_data.current_price.usd;

    return {
      cTokenImageUrl: cTokenImageUrl,
      cTokenPrice: cTokenPrice,
    };
  } catch (err) {
    console.log('Error log - In compound data fetch from coingecko API', err.message);
    return false;
  }
};

//call the below compound API to get the cToken data for the respective uer
export const getCompTokenSavingsData = async (accountAddress) => {
  const response = await axios.get(
    `https://api.compound.finance/api/v2/account?addresses=${accountAddress}`,
    {}
  );
  return response;
};

//call the below compound API to get the underlying token data for the cToken
//ex: for cUSDT to get underlying USDT data points
export const getCompUnderlyingAPIData = async (cTokenAddress) => {
  const response = await axios.get(
    `https://api.compound.finance/api/v2/ctoken?addresses[]=${cTokenAddress}`
  );
  return response;
};
