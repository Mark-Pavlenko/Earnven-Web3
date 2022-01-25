import axios from 'axios';
import addresses from '../../../../contractAddresses';

//below subgraph query is used to get sushiswap lp token data
export const getSushiV2SubgraphData = async (accountAddress) => {
  const response = await axios.post(
    `https://gateway.thegraph.com/api/${addresses.graph_API}/subgraphs/id/0x4bb4c1b0745ef7b4642feeccd0740dec417ca0a0-0`,
    {
      query: `{
                    users(
                     where:{
                       id:"${accountAddress}"
                     }
                   ){
                     liquidityPositions(first:1000
                         where:{
                         liquidityTokenBalance_gt:0
                         }
                     ){
                       liquidityTokenBalance
                       pair{
                         id
                         totalSupply
                         reserveUSD
                         volumeUSD
                         token0{
                           id
                           name
                           symbol
                         }
                         token1{
                           id
                           name
                           symbol
                         }
                       }
                     }
                   } 
                   }`,
    }
  );
  return response;
};

//below query is used to get sushiV2 token images from coingecko API call
export const getSushiLpTokenImage = async (tokenContractAddress) => {
  try {
    const result = await axios.get(
      `https://api.coingecko.com/api/v3/coins/ethereum/contract/${tokenContractAddress}`,
      {}
    );
    const tokenImage = result.data.image.thumb;
    const tokenPrice = result.data.market_data.current_price.usd;
    //console.log('TestSushiV2 token image url', sushiTokenImageUrl);
    return {
      tokenImage: tokenImage,
      tokenPrice: tokenPrice,
    };
  } catch (err) {
    return {
      tokenImage: '',
      tokenPrice: 0,
    };
  }
};
