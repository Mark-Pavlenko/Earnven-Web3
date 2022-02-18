import axios from 'axios';
import Web3 from 'web3';
import UniStakingABI from '../../../abi/uniStakingContract.json';
import Addresses from '../../../contractAddresses';
import UniswapV2 from '../LiqudityPools/UniswapV2';

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
          await axios
            .get(
              `https://api.coingecko.com/api/v3/coins/ethereum/contract/${res[i].pair.token0.id}`
            )
            .then(async ({ data }) => {
              Images.push(data.image.large);
            })
            .catch((err) => {
              console.log('error in fetching Uniswap v2', err);
            });
          await axios
            .get(
              `https://api.coingecko.com/api/v3/coins/ethereum/contract/${res[i].pair.token1.id}`
            )
            .then(async ({ data }) => {
              Images.push(data.image.large);
            })
            .catch((err) => {
              console.log('error in fetching Uniswap v2', err);
            });
          object.imageData = Images;
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
  const web3 = await getWeb3();
  const UniStakeUSDT = new web3.eth.Contract(UniStakingABI, Addresses.uniStakingUSDT);
  const UniStakeDAI = new web3.eth.Contract(UniStakingABI, Addresses.uniStakingDAI);
  const UniStakeUSDC = new web3.eth.Contract(UniStakingABI, Addresses.uniStakingUSDC);
  const UniStakeWBTC = new web3.eth.Contract(UniStakingABI, Addresses.uniStakingWBTC);
  const USDTAmount = (await UniStakeUSDT.methods.balanceOf(attributes).call()) / 10 ** 18;
  const DAIAmount = (await UniStakeDAI.methods.balanceOf(attributes).call()) / 10 ** 18;
  const USDCAmount = (await UniStakeUSDC.methods.balanceOf(attributes).call()) / 10 ** 18;
  const WBTCAmount = (await UniStakeWBTC.methods.balanceOf(attributes).call()) / 10 ** 18;
  let WBTCAmountClaimable = (await UniStakeWBTC.methods.earned(attributes).call()) / 10 ** 18;
  let USDCAmountClaimables = (await UniStakeUSDC.methods.earned(attributes).call()) / 10 ** 18;
  let DAIAmountClaimables = (await UniStakeDAI.methods.earned(attributes).call()) / 10 ** 18;
  let USDTAmountClaimables = (await UniStakeUSDT.methods.earned(attributes).call()) / 10 ** 18;
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
        }
        
        USDC : pairs(
          where:{
            id:"0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc"
          }  
        ){
          reserveUSD
          totalSupply
          volumeUSD
        }
        
        DAI : pairs(
          where:{
            id:"0xa478c2975ab1ea89e8196811f51a7b7ade33eb11"
          }  
        ){
          reserveUSD
          totalSupply
          volumeUSD
        }
        
        WBTC: pairs(
          where:{
            id:"0xbb2b8038a1640196fbe3e38816f3e67cba72d940"
          }  
        ){
          reserveUSD
          totalSupply
          volumeUSD
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
        object.tokenName = 'USDT';
        object.value =
          (response.data.data.USDT[0].reserveUSD / response.data.data.USDT[0].totalSupply) *
          USDTAmount;
        tot = tot + object.value;
        object.totalValue = tot;
        object.icon = imageUni;
        object.chain = 'Ethereum';
        // USDT.push(response.data.data.USDT[0].reserveUSD);
        // USDT.push(response.data.data.USDT[0].volumeUSD);
        // USDT.push(response.data.data.USDT[0].reserveUSD / response.data.data.USDT[0].totalSupply);
        // USDT.push(
        //   (response.data.data.USDT[0].reserveUSD / response.data.data.USDT[0].totalSupply) *
        //     USDTAmount
        // );
        // USDT.push(USDTAmount);
        // USDT.push(USDTAmountClaimables);
        // object.USDT = USDT;
        pools.push(object);
      }
      // else {
      //   object.USDT = 'null';
      // }
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
        object.tokenName = 'DAI';
        object.value =
          (response.data.data.DAI[0].reserveUSD / response.data.data.DAI[0].totalSupply) *
          DAIAmount;
        tot = tot + object.value;
        object.totalValue = tot;
        object.icon = imageUni;

        // DAI.push(response.data.data.DAI[0].reserveUSD);
        // DAI.push(response.data.data.DAI[0].volumeUSD);
        // DAI.push(response.data.data.DAI[0].reserveUSD / response.data.data.DAI[0].totalSupply);
        // DAI.push(
        //   (response.data.data.DAI[0].reserveUSD / response.data.data.DAI[0].totalSupply) * DAIAmount
        // );
        // DAI.push(DAIAmount);
        // DAI.push(DAIAmountClaimables);
        // object.DAI = DAI;
        pools.push(object);
      }
      //  else {
      //   object.DAI = 'null';
      // }
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
        object.tokenName = 'USDC';
        object.value =
          (response.data.data.USDC[0].reserveUSD / response.data.data.USDC[0].totalSupply) *
          USDCAmount;
        tot = tot + object.value;
        object.totalValue = tot;
        object.icon = imageUni;

        // USDC.push(response.data.data.USDC[0].reserveUSD);
        // USDC.push(response.data.data.USDC[0].volumeUSD);
        // USDC.push(response.data.data.USDC[0].reserveUSD / response.data.data.USDC[0].totalSupply);
        // USDC.push(
        //   (response.data.data.USDC[0].reserveUSD / response.data.data.USDC[0].totalSupply) *
        //     USDCAmount
        // );
        // USDC.push(USDCAmount);
        // USDC.push(USDCAmountClaimables);
        // object.USDC = USDC;
        pools.push(object);
      }
      //  else {
      //   object.USDC = 'null';
      // }
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
        object.tokenName = 'WBTC';
        object.chain = 'Ethereum';
        object.value =
          (response.data.data.WBTC[0].reserveUSD / response.data.data.WBTC[0].totalSupply) *
          WBTCAmount;
        tot = tot + object.value;
        object.totalValue = tot;
        object.icon = imageUni;

        // WBTC.push(response.data.data.WBTC[0].reserveUSD);
        // WBTC.push(response.data.data.WBTC[0].volumeUSD);
        // WBTC.push(response.data.data.WBTC[0].reserveUSD / response.data.data.WBTC[0].totalSupply);
        // WBTC.push(
        //   (response.data.data.WBTC[0].reserveUSD / response.data.data.WBTC[0].totalSupply) *
        //     WBTCAmount
        // );
        // WBTC.push(WBTCAmount);
        // WBTC.push(WBTCAmountClaimable);
        // object.WBTC = WBTC;
        pools.push(object);
      }
      // } else {
      //   object.WBTC = 'null';
      // }
    });
  console.log('uniswapApi', pools);
  return pools;
};
