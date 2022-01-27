import axios from 'axios';

export const getbalancerV2data = async (attributes) => {
  console.log('inside api call', attributes);
  const pools = [];
  const tot_float = 0;
  await axios
    .post(`https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-v2`, {
      query: `{
          users
          (
            where:{
              id:"${attributes}"
            }
          )
          {
            id
            sharesOwned {
              id
              balance
              poolId{
                symbol
                tokensList
                tokens{
                  symbol
                  balance
                }
                tokensList
                totalShares
                totalLiquidity
                totalSwapVolume
                tx
              }
            }
            
          }
        }`,
    })
    .then(async (response) => {
      if (response.data.data.users[0]) {
        const res = response.data.data.users[0].sharesOwned;
        let tot = parseInt(0);
        for (let i = 0; i < res.length; i++) {
          const object = {};
          object.balance = res[i].balance;
          object.liquidity = res[i].poolId.totalLiquidity;
          object.tokens = res[i].poolId.tokens;
          object.totalShares = res[i].poolId.totalShares;
          object.poolPercentage = ((res[i].balance / res[i].poolId.totalShares) * 100).toString();
          object.totalValue = parseFloat(
            (res[i].poolId.totalLiquidity / res[i].poolId.totalShares) * res[i].balance
          ).toFixed(2);
          object.price = (object.totalValue / res[i].balance).toString();
          object.tokenList = res[i].poolId.tokensList;
          if (object.totalValue > 0) {
            pools.push(object);
            let Images = [];
            let CurrentPrice = [];
            let TokenPoolPrice = [];
            let sum = 0;
            for (var k = 0; k < object.tokenList.length; k++) {
              await axios
                .get(
                  `https://api.coingecko.com/api/v3/coins/ethereum/contract/${object.tokenList[k]}`
                )
                .then(async ({ data }) => {
                  CurrentPrice.push(data.market_data.current_price.usd);
                  CurrentPrice.push(object.tokenList[k]);
                  for (var l = 0; l < object.tokenList.length; l++) {
                    if (data.symbol.toLowerCase() == object.tokens[l].symbol.toLowerCase()) {
                      TokenPoolPrice.push(
                        data.market_data.current_price.usd * object.tokens[l].balance
                      );
                      sum = sum + data.market_data.current_price.usd * object.tokens[l].balance;
                    }
                  }
                  Images.push(data.image.large);
                })
                .catch((err) => {
                  console.log('error in fetching balancer v2', err);
                });
            }
            object.imageData = Images;
            object.currentPrice = CurrentPrice;
            object.tokenPoolPrice = TokenPoolPrice;
            object.chain = 'Ethereum';
            object.protocol = 'Balancer-V2';
            object.priceSum = sum;
            tot += object.priceSum;
          }
        }
        pools.sort((a, b) => parseFloat(b.totalValue) - parseFloat(a.totalValue));
        // setBalancerTotalv2(parseFloat(tot).toFixed(2));
        // setBalancerPoolsDatav2(pools);
        let tot_float = parseFloat(tot).toFixed(2);
      }
    });
  return pools;
};
