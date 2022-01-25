import axios from 'axios';
import mStableAddressList from '../../../contractAddress/mStableAddress';
import mStableAddressPools from '../../../contractAddress/mStablePools';
export const getmStabledata = async (attributes) => {
  // const response = await fetch(
  //   `https://api.ethplorer.io/getAddressInfo/${attributes[1]}?apiKey=EK-qSPda-W9rX7yJ-UY93y`
  // );
  // const data_api = await response.json();
  const data_api = attributes[0];
  let apy = '';
  let totalStaked = '';
  let pool = [];
  if (attributes.length > 0) {
    // let data_api = attributes[1];
    // console.log('kill jull', data_api);
    // if (data_api.length > 0 && data_api !== 'x') {
    // console.log('')
    // let object = {};
    let contracts = [];
    contracts.push('0x17d8cbb6bce8cee970a4027d1198f6700a7a6c24');
    contracts.push('0x30647a72dc82d7fbb1123ea74716ab8a317eac19');
    for (let i = 0; i < data_api.tokens.length; i++) {
      for (let j = 0; j < contracts.length; j++) {
        let object = {};
        if (data_api.tokens[i].tokenInfo.address.toUpperCase() == contracts[j].toUpperCase()) {
          //   if (data_api.tokens[i].tokenInfo.website == 'https://mstable.org') {
          console.log('data_api.tokens[i].tokenInfo', data_api.tokens[i].tokenInfo);
          if (
            '0x17d8cbb6bce8cee970a4027d1198f6700a7a6c24'.toUpperCase() == contracts[j].toUpperCase()
          ) {
            await axios.get(`https://api.mstable.org/pools`).then(async ({ data }) => {
              apy = data.pools[0].averageApy;
              totalStaked = data.pools[0].totalStakedUSD;
            });
          }
          if (
            '0x30647a72dc82d7fbb1123ea74716ab8a317eac19'.toUpperCase() == contracts[j].toUpperCase()
          ) {
            await axios.get(`https://api.mstable.org/pools`).then(async ({ data }) => {
              apy = data.pools[1].averageApy;
              totalStaked = data.pools[1].totalStakedUSD;
            });
          }
          await axios
            .get(
              `https://api.coingecko.com/api/v3/coins/ethereum/contract/${data_api.tokens[i].tokenInfo.address}`
            )
            .then(async ({ data }) => {
              let currentprice = data.market_data.current_price.usd;
              let pickleIcon = data.image.small;
              object.protocol = 'mStable';
              object.chain = 'Ethereum';
              object.tokenImage = data.image.small;
              // object.price = data.market_data.current_price.usd;
              object.balance = data_api.tokens[i].rawBalance;
              object.value = object.price * object.balance;
              object.totalStaked = totalStaked;
              object.apy = apy;
              object.symbol = data_api.tokens[i].tokenInfo.symbol;
              object.tokenName = data_api.tokens[i].tokenInfo.name;
            })
            .catch((err) => {
              console.log('error in fetching pickle staking', err);
            });
          pool.push(object);
        }
      }
    }
    // }
  }
  return pool;
};

export const getmStableFarmdata = async (attributes) => {
  const data_api = attributes[0];
  let apy = '';
  let totalStaked = '';
  let mtaPrice = '';
  let pool = [];
  await axios
    .get(
      `https://api.coingecko.com/api/v3/coins/ethereum/contract/0xa3bed4e1c75d00fa6f4e5e6922db7261b5e9acd2`
    )
    .then(async ({ data }) => {
      mtaPrice = data.market_data.current_price.usd;
      console.log('mtaPrice', data.market_data.current_price.usd);
    })
    .catch((err) => {
      console.log('error in fetching Uniswap v2', err);
    });
  for (let i = 0; i < data_api.tokens.length; i++) {
    for (let j = 0; j < mStableAddressList.length; j++) {
      let object = {};
      let imagedata = '';
      await axios
        .get(
          `https://api.coingecko.com/api/v3/coins/ethereum/contract/0xa3bed4e1c75d00fa6f4e5e6922db7261b5e9acd2`
        )
        .then(async ({ data }) => {
          // mtaPrice = data.market_data.current_price.usd;
          imagedata = data.image.small;
          console.log('mtaPrice', data.market_data.current_price.usd);
        })
        .catch((err) => {
          console.log('error in fetching Uniswap v2', err);
        });
      if (
        data_api.tokens[i].tokenInfo.address.toUpperCase() == mStableAddressList[j].toUpperCase()
      ) {
        console.log('data_api.tokens[i].tokenInfo', data_api.tokens[i].tokenInfo);
        object.protocol = 'mStable';
        object.chain = 'Ethereum';
        object.tokenImage = imagedata;
        //   object.price = data.market_data.current_price.usd;
        object.balance = data_api.tokens[i].rawBalance / 10 ** 18;
        object.value = object.price * object.balance;
        object.claimable = attributes[2] * mtaPrice;
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
  console.log('mstable responce saga', data_api);
  return pool;
};

export const getmStablePoolsdata = async (attributes) => {
  console.log('mstale in api', attributes);
  const data_api = attributes[0];
  let apy = '';
  let totalStaked = '';
  let mtaPrice = '';
  let pool = [];
  let imagedata = '';
  await axios
    .get(
      `https://api.coingecko.com/api/v3/coins/ethereum/contract/0xa3bed4e1c75d00fa6f4e5e6922db7261b5e9acd2`
    )
    .then(async ({ data }) => {
      mtaPrice = data.market_data.current_price.usd;
      imagedata = data.image.small;
      console.log('mtaPrice', data.market_data.current_price.usd);
    })
    .catch((err) => {
      console.log('error in fetching Uniswap v2', err);
    });
  for (let i = 0; i < data_api.tokens.length; i++) {
    for (let j = 0; j < mStableAddressPools.length; j++) {
      let object = {};
      if (
        data_api.tokens[i].tokenInfo.address.toUpperCase() == mStableAddressPools[j].toUpperCase()
      ) {
        object.protocol = 'mStable';
        object.chain = 'Ethereum';
        //   object.image = data.image.small;
        //   object.price = data.market_data.current_price.usd;
        object.balance = data_api.tokens[i].rawBalance / 10 ** 18;
        object.value = object.price * object.balance;
        // object.claimable = attributes[2] * mtaPrice;
        //   object.totalStaked = totalStaked;
        //   object.apy = apy;
        console.log('object check', object);
        object.symbol = data_api.tokens[i].tokenInfo.symbol;
        object.tokenName = data_api.tokens[i].tokenInfo.name;
        object.tokenImage = imagedata;
        // })
        // .catch((err) => {
        //   console.log('error in fetching pickle staking', err);
        // });
        pool.push(object);
      }
    }
    // }
  }
  return pool;
};
