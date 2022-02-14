import axios from 'axios';
import ConvexContractABI from '../../../../abi/ConvexCVXContract.json';
import ConvexStakingContractABI from '../../../../abi/ConvexStakingContract.json';
import { ComingSoonLabel } from '../../../networkDropDown/styles';

//this function is used to get the stake amount for given contract address by calling
//the respective contract methods
export const getConvexStakes = async (accountAddress, contractAddress, web3) => {
  //ConvexCvxStaking contract
  const ConvexCVXStakingContract = new web3.eth.Contract(ConvexContractABI, contractAddress);
  //call the CVX contract to get the balance of CVX token staking value
  let ConvexBalaceAmount = await ConvexCVXStakingContract.methods.balanceOf(accountAddress).call();
  let ConvexEarnedBalance = await ConvexCVXStakingContract.methods.earned(accountAddress).call();
  let ConvexRewardTokenAddress = await ConvexCVXStakingContract.methods.rewardToken().call();
  let ConvexStakingTokenAddress = await ConvexCVXStakingContract.methods.stakingToken().call();
  let ConvexTotalSupply = await ConvexCVXStakingContract.methods.totalSupply().call();

  //retrun the value as object
  return {
    convexStakingBalance: ConvexBalaceAmount,
    earnedClaimbale: ConvexEarnedBalance,
    rewardTokenAddress: ConvexRewardTokenAddress,
    stakingTokenAddress: ConvexStakingTokenAddress,
    cvxTotalSupply: ConvexTotalSupply,
  };
};

//Call the ConvexReward/staking Contract data such as symbol
//this symbol is used to display in the UI to show the staked token and claimable token
export const getRewardTokenSymbol = async (contractAddress, web3) => {
  //get the contract instance
  const ConvexStakingContract = new web3.eth.Contract(ConvexStakingContractABI, contractAddress);
  //call the below method to get the symbol of the token
  const symbol = await ConvexStakingContract.methods.symbol().call();
  return symbol;
};

//get the price of the convex token based on the given contract address
export const getConvexTokenPrice = async (contractAddress) => {
  let result;

  try {
    result = await axios.get(
      `https://api.coingecko.com/api/v3/coins/ethereum/contract/${contractAddress}`
    );

    return result;
  } catch (err) {
    console.log('Error message from Convex staking process', err.message);
  }
};

//get the price of the given token address
export const getCvxCrvTokenPrice = async (cvxProtocol, tokenAddress, stakedAddress) => {
  let result;
  let tokenPrice = 0;
  try {
    if (cvxProtocol == 'cvxCRV' || cvxProtocol == 'cvxankrCRV' || cvxProtocol == 'cvxalETH+ETH-f') {
      result = await fetch(
        `https://api.ethplorer.io/getAddressInfo/${tokenAddress}?apiKey=EK-qSPda-W9rX7yJ-UY93y`,
        {}
      );
    }
    const data = await result.json();
    if (cvxProtocol == 'cvxCRV') {
      for (let i = 0; i < data.tokens.length; i++) {
        const curveLpData = data.tokens[i];
        const returnAddress = curveLpData.tokenInfo.address.toLowerCase();
        if (stakedAddress.toLowerCase() == returnAddress.toLowerCase()) {
          tokenPrice = curveLpData.tokenInfo.price.rate;
        }
      }
    }
  } catch (err) {
    console.log(err.message);
  }
  return tokenPrice;
};

export const getUserInvestInfo = async (accountAddress) => {
  let response;
  try {
    response = await axios.get(
      `https://api.ethplorer.io/getAddressInfo/${accountAddress}?apiKey=EK-qSPda-W9rX7yJ-UY93y`
    );
  } catch (err) {
    console.log('Error in getting user information from coingecko api', err.message);
  }
  return response.data;
};
