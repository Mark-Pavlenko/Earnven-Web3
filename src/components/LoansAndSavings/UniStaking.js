import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import axios from 'axios';
import UniStakingABI from '../../abi/uniStakingContract.json';
import Addresses from '../../contractAddresses';

export default function UniStaking({ accountAddress }) {
  const [USDTAmountUSD, setUSDTAmountUSD] = useState(0);
  const [USDCAmountUSD, setUSDCAmountUSD] = useState(0);
  const [DAIAmountUSD, setDAIAmountUSD] = useState(0);
  const [WBTCAmountUSD, setWBTCAmuntUSD] = useState(0);

  useEffect(() => {
    async function getBlockchainData() {
      const web3 = new Web3(Web3.givenProvider || Addresses.alchemyAPI);
      const UniStakeUSDT = new web3.eth.Contract(UniStakingABI, Addresses.uniStakingUSDT);
      const UniStakeDAI = new web3.eth.Contract(UniStakingABI, Addresses.uniStakingDAI);
      const UniStakeUSDC = new web3.eth.Contract(UniStakingABI, Addresses.uniStakingUSDC);
      const UniStakeWBTC = new web3.eth.Contract(UniStakingABI, Addresses.uniStakingWBTC);
      const USDTAmount = (await UniStakeUSDT.methods.balanceOf(accountAddress).call()) / 10 ** 18;
      const DAIAmount = (await UniStakeDAI.methods.balanceOf(accountAddress).call()) / 10 ** 18;
      const USDCAmount = (await UniStakeUSDC.methods.balanceOf(accountAddress).call()) / 10 ** 18;
      const WBTCAmount = (await UniStakeWBTC.methods.balanceOf(accountAddress).call()) / 10 ** 18;

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
            }
            
            USDC : pairs(
              where:{
                id:"0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc"
              }  
            ){
              reserveUSD
              totalSupply
            }
            
            DAI : pairs(
              where:{
                id:"0xa478c2975ab1ea89e8196811f51a7b7ade33eb11"
              }  
            ){
              reserveUSD
              totalSupply
            }
            
            WBTC: pairs(
              where:{
                id:"0xbb2b8038a1640196fbe3e38816f3e67cba72d940"
              }  
            ){
              reserveUSD
              totalSupply
            }
            
          }`,
        })
        .then(async (response) => {
          console.log(response.data.data);

          const USDTPrice =
            response.data.data.USDT[0].reserveUSD / response.data.data.USDT[0].totalSupply;
          const USDCPrice =
            response.data.data.USDC[0].reserveUSD / response.data.data.USDC[0].totalSupply;
          const DAIPrice =
            response.data.data.DAI[0].reserveUSD / response.data.data.DAI[0].totalSupply;
          const WBTCPrice =
            response.data.data.WBTC[0].reserveUSD / response.data.data.WBTC[0].totalSupply;

          setUSDTAmountUSD(USDTPrice * USDTAmount);
          setUSDCAmountUSD(USDCPrice * USDCAmount);
          setDAIAmountUSD(DAIPrice * DAIAmount);
          setWBTCAmuntUSD(WBTCPrice * WBTCAmount);
        });
    }

    getBlockchainData();
  }, []);

  return (
    <div>
      <h1>UNI</h1>
      <div
        style={{
          display: USDTAmountUSD + USDCAmountUSD + DAIAmountUSD + WBTCAmountUSD > 0 ? '' : 'none',
        }}>
        <div
          style={{
            fontSize: '12px',
            marginLeft: '15px',
          }}>
          Uniswap LP Staking ---{' '}
          {parseFloat(USDTAmountUSD + USDCAmountUSD + DAIAmountUSD + WBTCAmountUSD).toFixed(2)} USD
          <br />
          <br />
        </div>
        <div style={{ marginLeft: '10%' }}>
          <div style={{ display: USDTAmountUSD > 0 ? '' : 'none' }}>
            USDT/ETH : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {parseFloat(USDTAmountUSD).toFixed(2)}{' '}
            USD
            <br />
          </div>
          <div style={{ display: USDCAmountUSD > 0 ? '' : 'none' }}>
            USDC/ETH : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {parseFloat(USDCAmountUSD).toFixed(2)} USD
            <br />
          </div>

          <div style={{ display: DAIAmountUSD > 0 ? '' : 'none' }}>
            DAI/ETH : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
            {parseFloat(DAIAmountUSD).toFixed(2)} USD
            <br />
          </div>

          <div style={{ display: WBTCAmountUSD > 0 ? '' : 'none' }}>
            WBTC/ETH : &nbsp;&nbsp;&nbsp;&nbsp; {parseFloat(WBTCAmountUSD).toFixed(2)} USD
            <br />
          </div>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
}
