import axios from 'axios';
import AaveStakingABI from '../../../../abi/AaveStakingContract.json';
import addresses from '../../../../contractAddresses';
import { useSelector } from 'react-redux';

// export const getCoinGeckoAPIData = () => {
//   const getApiData = useSelector((state) => state.CoingeckoAPI.aaveCoinGeckoData);
//   return getApiData;
// };

//get the stkABPT image
export const getStakeBalancerImage = async (contractAddress) => {
  try {
    const result = await axios.get(
      `https://api.coingecko.com/api/v3/coins/ethereum/contract/${contractAddress}`,
      {}
    );
    return result;
  } catch (err) {
    console.log('Error log - In Aave stake data fetch from coingecko API', err.message);
    return false;
  }
};

//this function is used to interact with aave deployed contract to get balanceOf
//and claimable amount for given account
export const checkAaveStake = async (accountAddress, contractAddress, web3) => {
  const AaveStakingContract = new web3.eth.Contract(AaveStakingABI, contractAddress);
  const AaveBalaceAmount = await AaveStakingContract.methods.balanceOf(accountAddress).call();
  const AaveV2ClaimableAmt = await AaveStakingContract.methods
    .getTotalRewardsBalance(accountAddress)
    .call();
  const AaveTotlLiqudityEth = await AaveStakingContract.methods.totalSupply().call();
  return {
    AaveBalaceAmount: AaveBalaceAmount,
    AaveV2ClaimableAmt: AaveV2ClaimableAmt,
    AaveTotlLiqudityEth: AaveTotlLiqudityEth,
  };
};

//get Aave token price from Aave URL
export const getAavePrice = async () => {
  try {
    const response = await axios.get('https://aave-api-v2.aave.com/data/pools', {});
    return response;
  } catch (err) {
    console.log('Aave API call failed', err.message);
    return false;
  }
};
