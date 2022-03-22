import axios from 'axios';
import ConvexContractABI from '../../../../abi/ConvexCVXContract.json';
import ConvexStakingContractABI from '../../../../abi/ConvexStakingContract.json';
import BatchCall from 'web3-batch-call';

//this function is used to get the stake amount for given contract address by calling
//the respective contract methods
export const getConvexStakes = async (accountAddress, contractAddress, web3) => {
  //batch-call process starts
  //configuration
  //set the request scheme with array of objects
  const contracts = [
    {
      namespace: 'convexStaking', //Namespace will be used to group contract results
      // list of contract address that need to look
      addresses: [contractAddress],
      // Specify an ABI to use for all addresses in this contract config
      abi: ConvexContractABI,
      allReadMethods: false,
      // set the read methods/Array of methods with custom arguments
      readMethods: [
        {
          name: 'balanceOf', //method name
          args: [accountAddress], //list of args that method need/expecting - here its userAddress
        },
        {
          name: 'earned',
          args: [accountAddress],
        },
        {
          name: 'rewardToken',
          args: [],
        },
        {
          name: 'stakingToken',
          args: [],
        },
        {
          name: 'totalSupply',
          args: [],
        },
      ],
    },
  ];
  //--------set the batch call request-----------------------//
  //get the web3 instance provider
  const instance = {
    web3: web3,
  };
  // call the batchcall by passing the args with web3 instance
  const batchCall = new BatchCall(instance);
  //exeucte the batchCall by passing configure contracts to get the result of it
  const result = await batchCall.execute(contracts);

  //call the CVX contract to get the balance of CVX token staking value
  let ConvexBalaceAmount = result[0].balanceOf[0].value;
  let ConvexEarnedBalance = result[0].earned[0].value;
  let ConvexRewardTokenAddress = result[0].rewardToken[0].value;
  let ConvexStakingTokenAddress = result[0].stakingToken[0].value;
  let ConvexTotalSupply = result[0].totalSupply[0].value;

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
