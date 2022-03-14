import axios from 'axios';
import Web3 from 'web3';
import UniStakingABI from '../../../abi/uniStakingContract.json';
import Addresses from '../../../contractAddresses';
import UniswapV2 from '../LiqudityPools/UniswapV2';
import BatchCall from 'web3-batch-call';

//use below function to get uniswap LP data
export const getuniswapV2data = async (attributes) => {
  const pools = [];
  await axios
    .post(`https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2`, {
      query: `{
        liquidityPositions(
          first:1000
          where:{
            user:"${attributes}"
            liquidityTokenBalance_gt:0
          }
          orderDirection:desc
        )
      
        {
          pair{
            totalSupply
            token0Price
            token1Price
            volumeUSD
            id
            reserveUSD
            token0{
              name
              symbol
              id
              tradeVolumeUSD
              tradeVolumeUSD
            }
            token1{
              name
              symbol
              id
            }
          }
          liquidityTokenBalance
        }
        }`,
    })
    .then(async (response) => {
      if (response.data.data) {
        let tot = 0;
        const res = response.data.data.liquidityPositions;
        for (let i = 0; i < res.length; i++) {
          const object = {};
          object.poolDetails = {
            poolAddress: res[i].pair.id,
            token0Address: res[i].pair.token0.id,
            token1Address: res[i].pair.token1.id,
          };
          object.id = res[i].pair.id;
          object.balance = res[i].liquidityTokenBalance;
          object.tokenSupply = res[i].pair.totalSupply;
          // object.token0name = res[i].pair.token0.name;
          // object.token1name = res[i].pair.token1.name;
          object.name = res[i].pair.token0.name + '-' + res[i].pair.token1.name;
          let token0Symbol = res[i].pair.token0.symbol;
          let token1Symbol = res[i].pair.token1.symbol;
          //object.symbol = res[i].pair.token0.symbol + '-' + res[i].pair.token1.symbol;
          object.symbol =
            token0Symbol.replace('yDAI+yUSDC+yUSDT+yTUSD', 'Y Curve') +
            '/' +
            token1Symbol.replace('yDAI+yUSDC+yUSDT+yTUSD', 'Y Curve');
          object.liquidity = res[i].pair.reserveUSD;
          object.volume = res[i].pair.volumeUSD;
          object.protocol = 'Uniswap V2';
          object.chain = 'Ethereum';
          let Images = [];
          object.value = (
            (res[i].liquidityTokenBalance / res[i].pair.totalSupply) *
            res[i].pair.reserveUSD
          ).toFixed(2);
          object.price = parseFloat(object.value / res[i].liquidityTokenBalance).toFixed(4);
          object.tokenName = object.symbol;
          // try {
          //   await axios
          //     .get(
          //       `https://api.coingecko.com/api/v3/coins/ethereum/contract/${res[i].pair.token0.id}`
          //     )
          //     .then(async ({ data }) => {
          //       Images.push(data.image.large);
          //     })
          //     .catch((err) => {
          //       console.log('Data is not found for given token from Uniswap v2');
          //     });
          // } catch (err) {
          //   console.log('Data not found for the given token');
          // }
          // try {
          //   await axios
          //     .get(
          //       `https://api.coingecko.com/api/v3/coins/ethereum/contract/${res[i].pair.token1.id}`
          //     )
          //     .then(async ({ data }) => {
          //       Images.push(data.image.large);
          //     })
          //     .catch((err) => {
          //       console.log('Data is not found for given token from Uniswap v2');
          //     });
          // } catch (err) {
          //   console.log('Data is not found for the given token');
          // }
          // object.imageData = Images;
          if (object.value > 0) {
            pools.push(object);
          }
        }
        pools.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
      }
    });

  return pools;
};

export const getuniswapV2stakedata = async (attributes) => {
  let pools = [];
  let tot = 0;
  async function getWeb3() {
    const provider = Web3.givenProvider || Addresses.alchemyAPI;
    const web3 = new Web3(provider);
    return web3;
  }
  //batch-call process starts
  //configuration
  //set the request scheme with array of objects
  const contracts = [
    {
      namespace: 'uniswapStaking', //Namespace will be used to group contract results
      // list of contract address that need to look
      addresses: [
        '0x6c3e4cb2e96b01f4b866965a91ed4437839a121a', // USDT
        '0xa1484C3aa22a66C62b77E0AE78E15258bd0cB711', // DAI
        '0x7FBa4B8Dc5E7616e59622806932DBea72537A56b', // USDC
        '0xCA35e32e7926b96A9988f61d510E038108d8068e', // WBTC
      ],
      // Specify an ABI to use for all addresses in this contract config
      abi: UniStakingABI,
      allReadMethods: false,
      // set the read methods/Array of methods with custom arguments
      readMethods: [
        {
          name: 'balanceOf', //method name
          args: [attributes], //list of args that method need/expecting - here its userAddress
        },
        {
          name: 'earned',
          args: [attributes],
        },
      ],
    },
  ];
  //--------set the batch call request-----------------------//
  //get the web3 instance provider
  const instance = {
    web3: await getWeb3(),
  };
  // call the batchcall by passing the args with web3 instance
  const batchCall = new BatchCall(instance);
  //exeucte the batchCall by passing configure contracts to get the result of it
  const result = await batchCall.execute(contracts);
  //variable to store balanceOf the user
  let USDTAmount = 0;
  let DAIAmount = 0;
  let USDCAmount = 0;
  let WBTCAmount = 0;
  //varisbles to store claimable value of the user
  let USDTAmountClaimables = 0;
  let DAIAmountClaimables = 0;
  let USDCAmountClaimables = 0;
  let WBTCAmountClaimable = 0;

  //read the result return from contract

  //USDT
  USDTAmount = result[0].balanceOf[0].value / 10 ** 18;
  USDTAmountClaimables = result[0].earned[0].value / 10 ** 18;
  //DAI
  DAIAmount = result[1].balanceOf[0].value / 10 ** 18;
  DAIAmountClaimables = result[1].earned[0].value / 10 ** 18;
  //USDC
  USDCAmount = result[2].balanceOf[0].value / 10 ** 18;
  USDCAmountClaimables = result[2].earned[0].value / 10 ** 18;
  //WBTC
  WBTCAmount = result[3].balanceOf[0].value / 10 ** 18;
  WBTCAmountClaimable = result[3].earned[0].value / 10 ** 18;

  //end of batch call process
  let uniCurrentPrice = 0;
  let imageUni = '';
  await axios
    .get(
      `https://api.coingecko.com/api/v3/coins/ethereum/contract/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984`
    )
    .then(async ({ data }) => {
      uniCurrentPrice = data.market_data.current_price.usd;
      // setuniPrice(uniCurrentPrice);
      imageUni = data.image.small;
      WBTCAmountClaimable = uniCurrentPrice * WBTCAmountClaimable;
      USDCAmountClaimables = uniCurrentPrice * USDCAmountClaimables;
      DAIAmountClaimables = uniCurrentPrice * DAIAmountClaimables;
      USDTAmountClaimables = uniCurrentPrice * USDTAmountClaimables;
    })
    .catch((err) => {
      console.log('error in univ2staking', err);
    });
  // var graphData;

  await axios
    .post(`https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2`, {
      query: `
      {
        USDT: pairs(
          where:{
            id:"0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852"
          }  
        ){
          reserveUSD
          totalSupply
          volumeUSD
          token0{
            symbol
            name
          }
          token1 {
            symbol
            name
          }
        }
        
        USDC : pairs(
          where:{
            id:"0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc"
          }  
        ){
          reserveUSD
          totalSupply
          volumeUSD
          token0{
            symbol
            name
          }
          token1 {
            symbol
            name
          }
        }
        
        DAI : pairs(
          where:{
            id:"0xa478c2975ab1ea89e8196811f51a7b7ade33eb11"
          }  
        ){
          reserveUSD
          totalSupply
          volumeUSD
          token0{
            symbol
            name
          }
          token1 {
            symbol
            name
          }
        }
        
        WBTC: pairs(
          where:{
            id:"0xbb2b8038a1640196fbe3e38816f3e67cba72d940"
          }  
        ){
          reserveUSD
          totalSupply
          volumeUSD
          token0{
            symbol
            name
          }
          token1 {
            symbol
            name
          }
        }
      }`,
    })
    .then(async (response) => {
      // USDT ----------------------------------------------------------------------
      if (USDTAmount > 0) {
        let object = {};
        object.liquidity = response.data.data.USDT[0].reserveUSD;
        object.volume = response.data.data.USDT[0].volumeUSD;
        object.claimable = USDTAmountClaimables;
        object.balance = USDTAmount;
        object.price =
          response.data.data.USDT[0].reserveUSD / response.data.data.USDT[0].totalSupply;
        object.protocol = 'Uniswap V2';
        //object.tokenName = 'USDT';
        object.tokenName =
          response.data.data.USDT[0].token0.symbol + '/' + response.data.data.USDT[0].token1.symbol;
        object.value =
          (response.data.data.USDT[0].reserveUSD / response.data.data.USDT[0].totalSupply) *
          USDTAmount;
        tot = tot + object.value;
        object.totalValue = tot;
        object.icon = imageUni;
        object.chain = 'Ethereum';

        pools.push(object);
      }

      // Dai ----------------------------------------------------------------------
      if (DAIAmount > 0) {
        let DAI = [];
        let object = {};
        object.liquidity = response.data.data.DAI[0].reserveUSD;
        object.volume = response.data.data.DAI[0].volumeUSD;
        object.claimable = DAIAmountClaimables;
        object.balance = DAIAmount;
        object.price = response.data.data.DAI[0].reserveUSD / response.data.data.DAI[0].totalSupply;
        object.protocol = 'Uniswap V2';
        object.chain = 'Ethereum';
        //object.tokenName = 'DAI';
        object.tokenName =
          response.data.data.DAI[0].token0.symbol + '/' + response.data.data.DAI[0].token1.symbol;
        object.value =
          (response.data.data.DAI[0].reserveUSD / response.data.data.DAI[0].totalSupply) *
          DAIAmount;
        tot = tot + object.value;
        object.totalValue = tot;
        object.icon = imageUni;

        pools.push(object);
      }

      // USDC -----------------------------------------------------------------------
      if (USDCAmount > 0) {
        let USDC = [];
        let object = {};
        object.liquidity = response.data.data.USDC[0].reserveUSD;
        object.volume = response.data.data.USDC[0].volumeUSD;
        object.claimable = USDCAmountClaimables;
        object.balance = USDCAmount;
        object.price =
          response.data.data.USDC[0].reserveUSD / response.data.data.USDC[0].totalSupply;
        object.protocol = 'Uniswap V2';
        object.chain = 'Ethereum';
        //object.tokenName = 'USDC';
        object.tokenName =
          response.data.data.USDC[0].token0.symbol + '/' + response.data.data.USDC[0].token1.symbol;
        object.value =
          (response.data.data.USDC[0].reserveUSD / response.data.data.USDC[0].totalSupply) *
          USDCAmount;
        tot = tot + object.value;
        object.totalValue = tot;
        object.icon = imageUni;

        pools.push(object);
      }

      // WBTC ----------------------------------------------------------------------
      if (WBTCAmount > 0) {
        let WBTC = [];
        let object = {};
        object.liquidity = response.data.data.WBTC[0].reserveUSD;
        object.volume = response.data.data.WBTC[0].volumeUSD;
        object.claimable = WBTCAmountClaimables;
        object.balance = WBTCAmount;
        object.price =
          response.data.data.WBTC[0].reserveUSD / response.data.data.WBTC[0].totalSupply;
        object.protocol = 'Uniswap V2';
        //object.tokenName = 'WBTC';
        object.tokenName =
          response.data.data.WBTC[0].token0.symbol + '/' + response.data.data.WBTC[0].token1.symbol;
        object.chain = 'Ethereum';
        object.value =
          (response.data.data.WBTC[0].reserveUSD / response.data.data.WBTC[0].totalSupply) *
          WBTCAmount;
        tot = tot + object.value;
        object.totalValue = tot;
        object.icon = imageUni;

        pools.push(object);
      }
    });

  return pools;
};
