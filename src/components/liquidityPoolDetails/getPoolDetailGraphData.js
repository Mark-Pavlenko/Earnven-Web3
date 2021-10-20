const axios = require('axios');
// this function is to get graph data for uniswap

const getUniswapGraphData = async (tokenPair, epochDate) => {
  // console.log('uniswap - Calling from the main page')
  // console.log('uniswap -', tokenPair)
  // console.log('uniswap - ', epochDate)
  try {
    const result = await axios.post(`https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2`, {
      query: `{
                 pairDayDatas  (where:
                      {pairAddress : "${tokenPair}",
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
                    reserveUSD
                    totalSupply
                    dailyVolumeUSD
                    }
                    pairs  
                      (where:
                      { id : "${tokenPair}",
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
    });
    // console.log('uniswap result-', result.data.data)
    return result;
  } catch (err) {
    console.log('No data found for the give paired token');
  }
};

// getUniswapGraphData('0xa478c2975ab1ea89e8196811f51a7b7ade33eb11', 1631664000)

export default getUniswapGraphData;
