const axios = require('axios');
// this function is to get graph data for uniswap
const getUniswapGraphData = async (token0, token1, epochDate) => {
  // console.log('sushiswap - Calling for the graph query page')
  // console.log('sushiswap token0 -', token0)
  // console.log('sushiswap token1 - ', token1)
  // console.log('sushiswap epoc time - ', epochDate)

  try {
    const result = await axios.post(
      `https://gateway.thegraph.com/api/c9596ce7bc47f7544cc808c3881427ed/subgraphs/id/0x4bb4c1b0745ef7b4642feeccd0740dec417ca0a0-0`,
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
                     token0 {
                            name
                            symbol
                            id
                      }
                      token1 {
                            name
                            symbol
                            id
                      } 
                    id  
                    reserveUSD
                    totalSupply
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
                      totalSupply
                      reserve0
    		              reserve1
                      token0Price
                      token1Price
                    }
                }`,
      }
    );
    console.log('sushiswap result from graph-', result.data.data);
    return result;
  } catch (err) {
    console.log('No data found for the give paired token');
  }
};
// 0xc3d03e4f041fd4cd388c549ee2a29a9e5075882f-18890
// 0xc3d03e4f041fd4cd388c549ee2a29a9e5075882f-18889
// getUniswapGraphData(
//   '0xc3d03e4f041fd4cd388c549ee2a29a9e5075882f',

//   1632096000,
// )

export default getUniswapGraphData;
