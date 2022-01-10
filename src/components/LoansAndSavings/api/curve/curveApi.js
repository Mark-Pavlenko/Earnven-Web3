import axios from 'axios';
import CurveTokenContractABI from '../../../../abi/CurveTokenContract.json';
import addresses from '../../../../contractAddresses';

//get yearn finance token price
export const getCurveTokenPriceData = async (contractAddress) => {
  const result = await axios.get(
    `https://api.coingecko.com/api/v3/coins/ethereum/contract/0xD533a949740bb3306d119CC777fa900bA034cd52`,
    {}
  );
  const cvxImageUrl = result.data.image.thumb;
  const cvxTokenPrice = result.data.market_data.current_price.usd;

  return {
    cvxTokenPrice: cvxTokenPrice,
    cvxImageUrl: cvxImageUrl,
  };
};

export const getCurveContractData = async (accountAddress, web3) => {
  const cvxContractInstance = new web3.eth.Contract(
    CurveTokenContractABI,
    addresses.cvxTokenAddress
  );
  const crvTokenBalance = await cvxContractInstance.methods.locked(accountAddress).call();
  const crvTokenDecimals = await cvxContractInstance.methods.decimals().call();
  return {
    crvTokenBalanceValue: crvTokenBalance.amount,
    crvTokenDecimals: crvTokenDecimals,
  };
};
