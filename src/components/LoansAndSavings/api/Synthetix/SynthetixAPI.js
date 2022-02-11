import axios from 'axios';
import AaveStakingABI from '../../../../abi/AaveStakingContract.json';
import addresses from '../../../../contractAddresses';
import SnxCollateralABI from '../../../../abi/SynthetixSNXContract.json';
import SnxTokenContractABI from '../../../../abi/SynthetixTokenContract.json';

//get the collateral value in SNX token for the given account address and for SNX collateral contract
export const getSynthetixCollateralData = async (accountAddress, web3) => {
  const snxCollateralContract = new web3.eth.Contract(SnxCollateralABI, addresses.snxTokenAddress);
  let snxCollateralBalance = await snxCollateralContract.methods.collateral(accountAddress).call();
  let snxCollateralSymbol = await snxCollateralContract.methods.symbol().call();

  //assign the value into the array by all the corresponding value
  return {
    snxCollateralBalanceAmt: snxCollateralBalance,
    snxCollateralSymbolName: snxCollateralSymbol,
  };
};

//get the snxToken balace of the given user from snx contract
export const getSnxTokenData = async (accountAddress, contractAddress, web3) => {
  const snxTokenContract = new web3.eth.Contract(SnxTokenContractABI, contractAddress);
  let snxTokenBalance = await snxTokenContract.methods.balanceOf(accountAddress).call();
  let snxTokenSymbol = await snxTokenContract.methods.symbol().call();

  //assign the value into the array by all the corresponding value
  return {
    snxTokenBalanceAmt: snxTokenBalance,
    snxTokenSymbol: snxTokenSymbol,
  };
};

//get the price logic for the SNX token to calculate for collateral amount
//send SNX contract address to get the price of the SNX collateral.
export const getSnxPrice = async (snxContractAddress) => {
  const result = await axios.get(
    `https://api.coingecko.com/api/v3/coins/ethereum/contract/${snxContractAddress}`,
    {}
  );
  const snxImageUrl = result.data.image.thumb;
  const snxPrice = result.data.market_data.current_price.usd;

  return {
    snxPrice: snxPrice,
    snxImageUrl: snxImageUrl,
  };
};

//call below function to get the snxToken Data repective with list of snxTokens for the given user
export const getUserAddressInfo = async (accountAddress) => {
  const response = await fetch(
    `https://api.ethplorer.io/getAddressInfo/${accountAddress}?apiKey=EK-qSPda-W9rX7yJ-UY93y`
  );
  return response.json();
};
