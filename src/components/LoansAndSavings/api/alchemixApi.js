import axios from 'axios';
import AlchemixAddress from '../../../contractAddress/AlchemixPools';

export const getalchemixVaultsfunction = async (attributes) => {
  console.log('alchemix api');
  const data_api = attributes[0];
  let pool = [];
  for (let i = 0; i < data_api.tokens.length; i++) {
    for (let j = 0; j < AlchemixAddress.length; j++) {
      let object = {};
      if (data_api.tokens[i].tokenInfo.address.toUpperCase() == AlchemixAddress[j].toUpperCase()) {
        console.log(' alchemix data_api.tokens[i].tokenInfo', data_api.tokens[i].tokenInfo);
        object.protocol = 'Alchemix';
        object.chain = 'Ethereum';
        try {
          await axios
            .get(
              `https://api.coingecko.com/api/v3/coins/ethereum/contract/${data_api.tokens[i].tokenInfo.address}`
            )
            .then(async ({ data }) => {
              object.price = data.market_data.current_price.usd;
              object.icon = data.image.small;
              console.log('alchemix price', data.market_data.current_price.usd);
            })
            .catch((err) => {
              console.log('error in fetching Uniswap v2', err);
            });
        } catch (err) {
          console.log('error alchemix', err);
        }
        try {
          object.volume = data_api.tokens[i].tokenInfo.price.volume24h;
        } catch (err) {
          //
        }
        try {
          object.liquidity = data_api.tokens[i].tokenInfo.price.marketCapUsd;
        } catch (err) {
          //
        }

        // object.tokenImage = imagedata;
        //   object.price = data.market_data.current_price.usd;
        object.balance = data_api.tokens[i].rawBalance / 10 ** 18;
        object.totalValue = object.price * object.balance;
        console.log('price check', object.price, object.balance);
        // object.claimable = attributes[2] * mtaPrice;
        //   object.totalStaked = totalStaked;
        //   object.apy = apy;
        console.log('object check', object);
        object.symbol = data_api.tokens[i].tokenInfo.symbol;
        object.tokenName = data_api.tokens[i].tokenInfo.name;
        // })
        // .catch((err) => {
        //   console.log('error in fetching pickle staking', err);
        // });
        pool.push(object);
      }
    }
    // }
  }
  console.log('alchemix responce saga', data_api);
  return pool;
};
