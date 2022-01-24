import axios from 'axios';
import sOHMV2TokenContractABI from '../../../../abi/OlympusStaking.json';
import Addresses from '../../../../contractAddresses';

//get the OHM staked Token data for the given user
//bascially there are two tokens either sOHM or gOHM so we are using same smart contract for two tokens
export const getOHMTokenData = async (accountAddress, web3) => {
  //get contract instanace of sOHM to get the balance value of the given user
  const sOHMinstance = new web3.eth.Contract(sOHMV2TokenContractABI, Addresses.sOHMV2TokenAddress);
  let sOHMtokenBalance = await sOHMinstance.methods.balanceOf(accountAddress).call();
  let sOHMtokenSymbol = await sOHMinstance.methods.symbol().call();
  let sOHMtokenSupply = await sOHMinstance.methods.totalSupply().call();

  //get contract instanace of gOHM to get the balance value of the given user
  const gOHMinstance = new web3.eth.Contract(sOHMV2TokenContractABI, Addresses.gOHMTokenAddress);
  let gOHMtokenBalance = await gOHMinstance.methods.balanceOf(accountAddress).call();
  let gOHMtokenSymbol = await gOHMinstance.methods.symbol().call();
  let gOHMtokenSupply = await gOHMinstance.methods.totalSupply().call();

  //return the value of the token
  //user can have either sOHM or converted/migrated gOHM
  let tokenBalance;
  let tokenSymbol;
  let tokenLiquidity;
  //get the sOHM token data if its available
  //as per the staking OHM the decimal value is 9
  if (parseFloat(sOHMtokenBalance) > 0) {
    tokenBalance = sOHMtokenBalance / 10 ** 9;
    tokenLiquidity = sOHMtokenSupply / 10 ** 9;
    tokenSymbol = sOHMtokenSymbol;
  }

  //get the gOHM token data if its available
  //as per the governance OHM the decimal value is 18
  if (parseFloat(gOHMtokenBalance) > 0) {
    tokenBalance = gOHMtokenBalance / 10 ** 18;
    tokenLiquidity = gOHMtokenSupply / 10 ** 18;
    tokenSymbol = gOHMtokenSymbol;
  }

  //assign the value into the array by all the corresponding value
  return {
    tokenBalance: tokenBalance,
    tokenSymbol: tokenSymbol,
    tokenLiquidity: tokenLiquidity,
  };
};

//get the price logic for the OHM token to calculate for staking ohm amount
export const getOHMTokenInfo = async (OHMContractAddress) => {
  const result = await axios.get(
    `https://api.coingecko.com/api/v3/coins/ethereum/contract/${OHMContractAddress}`,
    {}
  );
  const OHMImageUrl = result.data.image.thumb;
  const OHMPrice = result.data.market_data.current_price.usd;

  return {
    tokenImage: OHMImageUrl,
    price: OHMPrice,
  };
};
