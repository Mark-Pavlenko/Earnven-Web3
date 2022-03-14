import axios from 'axios';
import CoinGecko from 'coingecko-api';

const CoinGeckoClient = new CoinGecko();

const TOKEN =
  'AAAAAAAAAAAAAAAAAAAAAJKDUQEAAAAAdjHNlWVUmUvOCPqh05Vgo8bQouo%3DJY7PJWMZfUwejLcXHXKraQE9O9QDUQptUwtHVYIbSK0PFFmYzE';

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Access-Control-Request-Headers': 'Content-Type, x-requested-with',
  Origin: 'http://localhost:3000',
  'accept-encoding': 'gzip,deflate',
};

export const getTokens = async () => {
  // const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets');
  // return response.data;
  let data = await CoinGeckoClient.coins.all();
  // console.log('coingecko data', data.data);
  return data.data;
};

export const getAccountBalance = async (accountAddress) => {
  //ETH API Address data
  return await axios.get(
    `https://api.ethplorer.io/getAddressInfo/${accountAddress}?apiKey=EK-qSPda-W9rX7yJ-UY93y`
  );
};

export const getAddressInfo = async (accountAddress) => {
  //ETH API Address data
  return await axios.get(
    `https://api.ethplorer.io/getAddressInfo/${accountAddress}?apiKey=EK-qSPda-W9rX7yJ-UY93y`
  );
};

export const getCoinGeckoFullTokensList = async () => {
  const coinGeckoFullTokensList = await axios.get('https://api.coingecko.com/api/v3/coins/list');
  return coinGeckoFullTokensList.data;
};

export const getUniswapFullCoinsList = async () => {
  const uniswapFullCoinsList = await axios.get('https://tokens.coingecko.com/uniswap/all.json');
  return uniswapFullCoinsList.data;
};

export const getZeroAPITokensList = async () => {
  const rawZeroAPITokensList = await axios.get(`https://api.0x.org/swap/v1/tokens`);
  return rawZeroAPITokensList.data.records;
};

export const getTokenUSDAmount = async (tokenData) => {
  console.log('sagas USD receive tokenData', tokenData);

  if (tokenData.amount === '') {
    tokenData.amount = '0';
  }

  let tokenUSDCurrencyValue;
  let finalUSDCurrencyValue;

  if (tokenData.address !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
    await axios
      .get(
        `https://api.ethplorer.io/getTokenInfo/${tokenData.tokenData.address}?apiKey=EK-qSPda-W9rX7yJ-UY93y`
      )
      .then(async (response) => {
        tokenUSDCurrencyValue = response;
      })
      .catch((err) => {
        console.log('err of usd currency receive token', err);
      });

    console.log('tokenUSDCurrencyValue.data.price.rate', tokenUSDCurrencyValue.data.price.rate);

    if (tokenUSDCurrencyValue.data.price.rate !== undefined) {
      finalUSDCurrencyValue =
        tokenUSDCurrencyValue.data.price.rate * parseFloat(tokenData.amount).toFixed(2);
    } else {
      finalUSDCurrencyValue = -1;
    }
  } else {
    const ethDollarValue = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
    );
    finalUSDCurrencyValue = ethDollarValue.data.ethereum.usd * parseFloat(tokenData.amount);
  }
  return { ...tokenData.tokenData, USDCurrency: finalUSDCurrencyValue };
};

export const getCoinGeckoTokenUSDCurrency = async (tokenId) => {
  return await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`
  );
};

export const getTwitterPosts = async (attributes) => {
  const streamURL = `https://cmctoken-proxy.herokuapp.com/https://api.twitter.com/2/tweets/search/recent?query=from%3A${attributes.userTwitterId}&max_results=${attributes.count}&expansions=author_id,referenced_tweets.id,attachments.media_keys,entities.mentions.username,referenced_tweets.id.author_id&tweet.fields=id,created_at,text,author_id,attachments,public_metrics,source,context_annotations,entities&user.fields=id,name,username,profile_image_url,url,pinned_tweet_id,public_metrics&media.fields=preview_image_url,url,public_metrics`;
  return await axios.get(streamURL, { headers });
};

export const getNFTdata = async (attributes) => {
  // console.log('attributes', attributes);
  const response = await axios.get(
    `https://api.opensea.io/api/v1/assets?token_ids=${attributes.tokenId}&asset_contract_addresses=${attributes.contractAddress}`
  );
  return response;
};

export const getethApidata = async (attributes) => {
  const response = await fetch(
    `https://api.ethplorer.io/getAddressInfo/${attributes}?apiKey=EK-qSPda-W9rX7yJ-UY93y`
  );
  const data = await response.json();
  return data;
};
