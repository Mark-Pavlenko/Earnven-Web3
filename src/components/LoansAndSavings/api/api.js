import axios from 'axios';
import YearnTokenContract from '../../../abi/YearnTokenContract.json';
import addresses from '../../../contractAddresses';
import BatchCall from 'web3-batch-call';

//for eth2.0 protocol section
export const getEth2StakeData = async (stakeUserAccount) => {
  const response = await axios.post(
    `https://gateway.thegraph.com/api/${addresses.graph_API}/subgraphs/id/0x540b14e4bd871cfe59e48d19254328b5ff11d820-0`,
    {
      query: `{
                depositors
                (
                  where:{
                    id:"${stakeUserAccount.accountAddress}"
                  }
                ) {
                  id
                  totalAmountDeposited
                  depositCount
                  deposits {
                    id
                    amount
                  }
                }
              }
              `,
    }
  );
  return response;
};

//below section is used to get the eth market USD price
export const getEthPriceData = async () => {
  const response = await axios.get(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
  );
  return response;
};

//below section is used to get the token image based on the given tokenAddress
export const getTokenImage = async (tokenAddress) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/ethereum/contract/${tokenAddress}`,
    {}
  );
  return response;
};

//SushiStaking LP token SLP starts
//below function is used to get given SushiLP token (SLP) volume and liquidity
export const getSushiLpTokenData = async (token0, token1, epochDate) => {
  try {
    const response = await axios.post(
      `https://gateway.thegraph.com/api/${addresses.graph_API}/subgraphs/id/0x4bb4c1b0745ef7b4642feeccd0740dec417ca0a0-0`,
      {
        query: `{
                 pairDayDatas  (where:
                      {
                        token0 : "${token0}",
                        token1 : "${token1}",
                        date : ${epochDate}
                      } 
                      orderBy : date , 
                      orderDirection: desc
                    ) 
                    {
                      volumeUSD
                    }
                    pairs  
                      (where:
                      { token0 : "${token0}",
                        token1 : "${token1}"
                      } 
                      )  
                    {
                      
                      reserveUSD
                    }
                }`,
      }
    );

    return response.data.data;
  } catch (err) {
    console.log('No data found for the give paired token');
  }
};

//below function is used to get sushiStaked data
export const getSushiStakedUserData = async (accountAddress) => {
  try {
    const response = await axios.post(
      'https://api.thegraph.com/subgraphs/name/sushiswap/master-chef',
      {
        query: `
          {
                users (where :{
                            address :"${accountAddress}",
                            pool_not : null
                      })
                {
                    id
                    address
                    amount
                    pool 
                    {
                        id
                        pair
                        balance
                    }
                }
            }`,
      }
    );
    return response;
  } catch (err) {
    console.log('Sushi staking process Error message', err.message);
  }
};

//below function is used to get pair pool data for sushi staking protocol
export const getSushiPoolData = async (poolId) => {
  try {
    const response = await axios.post(
      `https://gateway.thegraph.com/api/${addresses.graph_API}/subgraphs/id/0x4bb4c1b0745ef7b4642feeccd0740dec417ca0a0-0`,
      {
        query: `{
            pairs
                  (where:
                      { id : "${poolId}"
                   })
                  {
                    name
                    reserveUSD
                    totalSupply
                    volumeUSD
                    token0 {
                      id
                      name
                      symbol
                    }
                    token1 {
                      id
                      name
                      symbol
                    }
                  }
          }`,
      }
    );
    return response;
  } catch (err) {
    console.log('Sushi staking pool data Error message', err.message);
  }
};
//SushiStaking LP token SLP Ends
//YearnFinance Protocol subgraph
export const getYearnUserData = async (accountAddress) => {
  try {
    const response = await axios.post(
      `https://gateway.thegraph.com/api/${addresses.graph_API}/subgraphs/id/0xf50b705e4eaba269dfe954f10c65bd34e6351e0c-0`,
      {
        query: `{
                accountVaultPositions(
                  first:1000
                  where:{
                    account:"${accountAddress}"
                    balanceShares_gt:0
                  }
                )
                {
                  id
                  balanceTokens
                  balancePosition
                  balanceShares
                  balanceProfit
                  vault{
                    token{
                      symbol
                      name
                      id
                      decimals
                    }
                    shareToken{
                      id
                      name
                      symbol
                      decimals
                    }
                    latestUpdate{
                      pricePerShare
                    }
                  }
                }
              }`,
      }
    );
    return response;
  } catch (err) {
    console.log('Year Finance protocol', err.message);
  }
};
//use Yearn Finance API call
export const getYearnData = async () => {
  const response = await axios.get(`https://api.yearn.finance/v1/chains/1/vaults/all`);
  return response;
};

//use below API call to get the given user level information for yearn Finance
export const getUserAccountInfo = async (accountAddress) => {
  const response = await axios.get(
    `https://api.ethplorer.io/getAddressInfo/${accountAddress}?apiKey=EK-qSPda-W9rX7yJ-UY93y`,
    {}
  );
  return response;
};
//get yearn finance token price
export const getYearnTokenPrice = async (contractAddress) => {
  let result = await axios.get(
    `https://api.coingecko.com/api/v3/coins/ethereum/contract/${contractAddress}`
  );
  return result;
};

//get yearn.Finanace contract data

export const getYearnTokenData = async (accountAddress, tokenAddress, web3) => {
  const contracts = [
    {
      namespace: 'yearnYToken',
      addresses: [tokenAddress],
      abi: YearnTokenContract,
      allReadMethods: false,
      readMethods: [
        {
          name: 'balanceOf', //method name
          args: [accountAddress], //list of args that method need/expecting - here its userAddress
        },
        {
          name: 'name',
          args: [],
        },
        {
          name: 'symbol',
          args: [],
        },
        {
          name: 'decimals',
          args: [],
        },
        {
          name: 'token',
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

  let yTokenBalance = result[0].balanceOf[0].value;
  let yTokenName = result[0].name[0].value;
  let yTokenSymbol = result[0].symbol[0].value;
  let yTokenDecimals = result[0].decimals[0].value;
  let yTokenUnderlyingToken = result[0].token[0].value;
  let yTokenTotalSupply = result[0].totalSupply[0].value;

  return {
    yTokenBalance: yTokenBalance, // yToken Balance
    yTokenName: yTokenName, //yTokenName
    yTokenSymbol: yTokenSymbol, // yTokenSymbol
    yTokenDecimals: yTokenDecimals, //yTokenDecimals
    yTokenUnderlyingToken: yTokenUnderlyingToken, //yToken underlying Token to get token info
    yTokenTotalSupply: yTokenTotalSupply, //yToken Total supply
  };
};

export const getGasPriceData = async () => {
  const gasPriceData = await axios.get(
    'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=CISZAVU4237H8CFPFCFWEA25HHBI3QKB8W'
  );
  return gasPriceData;
};
