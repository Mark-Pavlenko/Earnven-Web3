/**************************************************************************************************
Purpose : This component is used to get CurveLpToken value for a given user
Developed by : Prabhakaran.R
Version log:
---------------------------------------------------------------------------------------------------
Version      Date                Description                                    Developed/Fixed 
----------------------------------------------------------------------------------------------------
1.0         26/Oct/2021          Initial Development                             Prabhakaran.R

**************************************************************************************************/
//import React, { useEffect, useState } from 'react';
//import Tooltip from '@material-ui/core/Tooltip';
//const { useState } = require('react');
//List all Curve LpToken ABI to interact with respective contract
import Curve3CrvPoolABI from '../../abi/CurveLpContracts/Curve3CrvPool.json'; //DAI/USDC/USDT(3Crv)
import CurveAavePoolABI from '../../abi/CurveLpContracts/CurveAavePool.json'; //ankrCRV
import CurveAnkrCRVABI from '../../abi/CurveLpContracts/CurveAnkrCRV.json'; //ETH/aETH
import CurveBUSDPoolABI from '../../abi/CurveLpContracts/CurveBUSDPool.json'; //yDAI/yUSDC/yUSDT/yBUSD
import CurveCompoundPoolABI from '../../abi/CurveLpContracts/CurveCompoundPool.json'; //cDAI/cUSDC
import CurveEURSPoolABI from '../../abi/CurveLpContracts/CurveEURSPool.json'; //EURS/sEUR
import CurvehBTCPoolABI from '../../abi/CurveLpContracts/CurvehBTCPool.json'; //hBTC/wBTC
import CurveIronBankPoolABI from '../../abi/CurveLpContracts/CurveIronBankPool.json'; //cyDAI/cyUSDC/cyUSDT
import CurveLinkPoolABI from '../../abi/CurveLpContracts/CurveLinkPool.json'; //LINK/sLINK
import CurvePAXPoolABI from '../../abi/CurveLpContracts/CurvePAXPool.json'; //DAI/USDC/USDT/PAX
import CurverenBTCPoolABI from '../../abi/CurveLpContracts/CurverenBTCPool.json'; //renBTC/wBTC
import CurverETHPoolABI from '../../abi/CurveLpContracts/CurverETHPool.json'; //ETH/rETH
import CurvesAAVEPoolABI from '../../abi/CurveLpContracts/CurvesAAVEPool.json'; //aDAI/aSUSD
import CurvesBTCPoolABI from '../../abi/CurveLpContracts/CurvesBTCPool.json'; //renBTC/wBTC/sBTC
import CurvesETHPoolABI from '../../abi/CurveLpContracts/CurvesETHPool.json'; //ETH/sETH
import CurvestETHPoolABI from '../../abi/CurveLpContracts/CurvestETHPool.json'; //ETH/stETH
import CurvesUSDPoolABI from '../../abi/CurveLpContracts/CurvesUSDPool.json'; //DAI/USDC/USDT/sUSD
import CurveTriCryptoPoolABI from '../../abi/CurveLpContracts/CurveTriCryptoPool.json'; //USD-BTC-ETH
import CurveUSDTPoolABI from '../../abi/CurveLpContracts/CurveUSDTPool.json'; //cDAI/cUSDC/USDT
import CurveYPoolABI from '../../abi/CurveLpContracts/CurveYPool.json'; //yDAI/yUSDC/yUSDT/yTUSD
import CurveYv2PoolABI from '../../abi/CurveLpContracts/CurveYv2Pool.json'; //cyDAI/cyUSDC/cyUSDT
//Registry contract to get virtual price of the pool
import CurvePoolRegistryABI from '../../abi/CurveLpContracts/CurveRegistry.json';
import Addresses from '../../contractAddress/CurveLpTokenContractAddress.js';
import CurvePoolRegAddress from '../../contractAddresses';
import Web3 from 'web3';
import axios from 'axios';
import getCoingeckoData from '../../utils/getCoingeckoAPIData.js';

//this function is used to get web3 that is used to connect with ethereum network
async function loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
}

const getCurveLpData = async (accountAddress, contractAddress) => {
  console.log('Inside the getCurveLpData');
  console.log('Get user curve lp data ', accountAddress);
  console.log('Get contract data for ', contractAddress);

  //to get virtual price of the pool
  const fetchCurveLpTokenVirtualPrice = async (contractAddress) => {
    const CurvePoolRegistryContract = new web3.eth.Contract(
      CurvePoolRegistryABI,
      CurvePoolRegAddress.CuvePoolRegistry
    );
    let poolVirtualPrice = await CurvePoolRegistryContract.methods
      .get_virtual_price_from_lp_token(contractAddress.toLowerCase())
      .call();
    return poolVirtualPrice;
  };

  let curveLpTokenBalance = [];
  let curveLpTokenName = [];
  let curveLpTokenAddress = [];
  let curveLpTokenPrice = [];
  let curveLpPoolData = [];

  await loadWeb3();
  const web3 = window.web3;
  console.log('Contract address', contractAddress);
  //console.log('Pool Address', Addresses.CrvPoolToken)

  //call below list of curve lp token contracts to get lp value of the given user
  //1) DAI/USDC/USDT(3Crv)
  if (contractAddress === Addresses.CrvPoolToken.toUpperCase()) {
    console.log('Inside fetching contract data for 3CRV');
    const Curve3CrvPoolContract = new web3.eth.Contract(Curve3CrvPoolABI, Addresses.CrvPoolToken);
    let Curve3CrvBalance = await Curve3CrvPoolContract.methods.balanceOf(accountAddress).call();
    let Curve3CrvName = await Curve3CrvPoolContract.methods.name().call();
    let CurveLpTokenVirtualPrice = await fetchCurveLpTokenVirtualPrice(contractAddress);

    //assign the value into the array by all the corresponding value
    curveLpTokenPrice = CurveLpTokenVirtualPrice; // pool virtual price
    curveLpTokenBalance = Curve3CrvBalance; //token balance of Lp for the given user
    curveLpTokenName = Curve3CrvName; // token name
    curveLpTokenAddress = Addresses.CrvPoolToken; //token address

    console.log('Curve3CrvBalance', Curve3CrvBalance);
    console.log('Curve3CrvName', Curve3CrvName);
  }
  //2) ankrCRV
  if (contractAddress === Addresses.AAVEToken) {
    const CurveAavePoolContract = new web3.eth.Contract(CurveAavePoolABI, Addresses.AAVEToken);
    let CurveAavePoolBalance = await CurveAavePoolContract.methods.balanceOf(accountAddress).call();
    let CurveAavePoolName = await CurveAavePoolContract.methods.name().call();

    //get virtual price of the pool
    let CurveLpTokenVirtualPrice = await fetchCurveLpTokenVirtualPrice(contractAddress);

    //assign the value into the array by all the corresponding value
    curveLpTokenPrice = CurveLpTokenVirtualPrice; // pool virtual price
    curveLpTokenBalance = CurveAavePoolBalance;
    curveLpTokenName = CurveAavePoolName;
    curveLpTokenAddress = Addresses.AAVEToken;
    //console.log('CurveAavePoolBalance', CurveAavePoolBalance);
    //console.log('CurveAavePoolName', CurveAavePoolName);
  }

  //3) ETH/aETH
  if (contractAddress === Addresses.ankrETHToken) {
    const CurveAnkrCRVContract = new web3.eth.Contract(CurveAnkrCRVABI, Addresses.ankrETHToken);
    let CurveAnkrCRVBalance = await CurveAnkrCRVContract.methods.balanceOf(accountAddress).call();
    let CurveAnkrCRVName = await CurveAnkrCRVContract.methods.name().call();

    //get virtual price of the pool
    let CurveLpTokenVirtualPrice = await fetchCurveLpTokenVirtualPrice(contractAddress);

    //assign the value into the array by all the corresponding value
    curveLpTokenPrice = CurveLpTokenVirtualPrice; // pool virtual price
    curveLpTokenBalance = CurveAnkrCRVBalance;
    curveLpTokenName = CurveAnkrCRVName;
    curveLpTokenAddress = Addresses.ankrETHToken;
    //console.log('CurveAnkrCRVBalance', CurveAnkrCRVBalance);
    //console.log('CurveAnkrCRVName', CurveAnkrCRVName);
  }

  //4) yDAI/yUSDC/yUSDT/yBUSD
  if (contractAddress === Addresses.BUSDToken) {
    const CurveBUSDPoolContract = new web3.eth.Contract(CurveBUSDPoolABI, Addresses.BUSDToken);
    let CurveBUSDPoolBalance = await CurveBUSDPoolContract.methods.balanceOf(accountAddress).call();
    let CurveBUSDPoolName = await CurveBUSDPoolContract.methods.name().call();

    //get virtual price of the pool
    let CurveLpTokenVirtualPrice = await fetchCurveLpTokenVirtualPrice(contractAddress);

    //assign the value into the array by all the corresponding value
    curveLpTokenPrice = CurveLpTokenVirtualPrice; // pool virtual price
    curveLpTokenBalance = CurveBUSDPoolBalance;
    curveLpTokenName = CurveBUSDPoolName;
    curveLpTokenAddress = Addresses.BUSDToken;
    //console.log('CurveBUSDPoolBalance', CurveBUSDPoolBalance);
    //console.log('CurveBUSDPoolName', CurveBUSDPoolName);
  }

  //5) cDAI/cUSDC
  if (contractAddress === Addresses.CompoundToken) {
    const CurveCompoundPoolContract = new web3.eth.Contract(
      CurveCompoundPoolABI,
      Addresses.CompoundToken
    );
    let CurveCompoundPoolBalance = await CurveCompoundPoolContract.methods
      .balanceOf(accountAddress)
      .call();
    let CurveCompoundPoolName = await CurveCompoundPoolContract.methods.name().call();
    //get virtual price of the pool
    let CurveLpTokenVirtualPrice = await fetchCurveLpTokenVirtualPrice(contractAddress);
    //assign the value into the array by all the corresponding value
    curveLpTokenPrice = CurveLpTokenVirtualPrice; // pool virtual price
    curveLpTokenBalance = CurveCompoundPoolBalance;
    curveLpTokenName = CurveCompoundPoolName;
    curveLpTokenAddress = Addresses.CompoundToken;
    //console.log('CurveCompoundPoolBalance', CurveCompoundPoolBalance);
    //console.log('CurveCompoundPoolName', CurveCompoundPoolName);
  }

  //6) EURS/sEUR
  if (contractAddress === Addresses.EURSToken) {
    const CurveEURSPoolContract = new web3.eth.Contract(CurveEURSPoolABI, Addresses.EURSToken);
    let CurveEURSPoolBalance = await CurveEURSPoolContract.methods.balanceOf(accountAddress).call();
    let CurveEURSPoolName = await CurveEURSPoolContract.methods.name().call();
    //get virtual price of the pool
    let CurveLpTokenVirtualPrice = await fetchCurveLpTokenVirtualPrice(contractAddress);
    //assign the value into the array by all the corresponding value
    curveLpTokenPrice = CurveLpTokenVirtualPrice; // pool virtual price
    curveLpTokenBalance = CurveEURSPoolBalance;
    curveLpTokenName = CurveEURSPoolName;
    curveLpTokenAddress = Addresses.EURSToken;
    //console.log('CurveEURSPoolBalance', CurveEURSPoolBalance);
    //console.log('CurveEURSPoolName', CurveEURSPoolName);
  }

  //7) hBTC/wBTC
  if (contractAddress === Addresses.hBTCToken) {
    const CurvehBTCPoolContract = new web3.eth.Contract(CurvehBTCPoolABI, Addresses.hBTCToken);
    let CurvehBTCPoolBalance = await CurvehBTCPoolContract.methods.balanceOf(accountAddress).call();
    let CurvehBTCPoolName = await CurvehBTCPoolContract.methods.name().call();
    //get virtual price of the pool
    let CurveLpTokenVirtualPrice = await fetchCurveLpTokenVirtualPrice(contractAddress);
    //assign the value into the array by all the corresponding value
    curveLpTokenPrice = CurveLpTokenVirtualPrice; // pool virtual price
    curveLpTokenBalance = CurvehBTCPoolBalance;
    curveLpTokenName = CurvehBTCPoolName;
    curveLpTokenAddress = Addresses.hBTCToken;
    //console.log('CurvehBTCPoolBalance', CurvehBTCPoolBalance);
    //console.log('CurvehBTCPoolName', CurvehBTCPoolName);
  }

  //8) cyDAI/cyUSDC/cyUSDT
  if (contractAddress === Addresses.IronBankToken) {
    const CurveIronBankPoolContract = new web3.eth.Contract(
      CurveIronBankPoolABI,
      Addresses.IronBankToken
    );
    let CurveIronBankPoolBalance = await CurveIronBankPoolContract.methods
      .balanceOf(accountAddress)
      .call();
    let CurveIronBankPoolName = await CurveIronBankPoolContract.methods.name().call();
    //get virtual price of the pool
    let CurveLpTokenVirtualPrice = await fetchCurveLpTokenVirtualPrice(contractAddress);
    //assign the value into the array by all the corresponding value
    curveLpTokenPrice = CurveLpTokenVirtualPrice; // pool virtual price
    curveLpTokenBalance = CurveIronBankPoolBalance;
    curveLpTokenName = CurveIronBankPoolName;
    curveLpTokenAddress = Addresses.IronBankToken;
    //console.log('CurveIronBankPoolBalance', CurveIronBankPoolBalance);
    //console.log('CurveIronBankPoolName', CurveIronBankPoolName);
  }

  //9) LINK/sLINK
  if (contractAddress === Addresses.LinkToken) {
    const CurveLinkPoolContract = new web3.eth.Contract(CurveLinkPoolABI, Addresses.LinkToken);
    let CurveLinkPoolBalance = await CurveLinkPoolContract.methods.balanceOf(accountAddress).call();
    let CurveLinkPoolName = await CurveLinkPoolContract.methods.name().call();
    //get virtual price of the pool
    let CurveLpTokenVirtualPrice = await fetchCurveLpTokenVirtualPrice(contractAddress);
    //assign the value into the array by all the corresponding value
    curveLpTokenPrice = CurveLpTokenVirtualPrice; // pool virtual price
    curveLpTokenBalance = CurveLinkPoolBalance;
    curveLpTokenName = CurveLinkPoolName;
    curveLpTokenAddress = Addresses.LinkToken;
    //console.log('CurveLinkPoolBalance', CurveLinkPoolBalance);
    //console.log('CurveLinkPoolName', CurveLinkPoolName);
  }

  //10) DAI/USDC/USDT/PAX
  if (contractAddress === Addresses.PAXToken) {
    const CurvePAXPoolContract = new web3.eth.Contract(CurvePAXPoolABI, Addresses.PAXToken);
    let CurvePAXPoolBalance = await CurvePAXPoolContract.methods.balanceOf(accountAddress).call();
    let CurvePAXPoolName = await CurvePAXPoolContract.methods.name().call();
    //get virtual price of the pool
    let CurveLpTokenVirtualPrice = await fetchCurveLpTokenVirtualPrice(contractAddress);
    //assign the value into the array by all the corresponding value
    curveLpTokenPrice = CurveLpTokenVirtualPrice; // pool virtual price
    curveLpTokenBalance = CurvePAXPoolBalance;
    curveLpTokenName = CurvePAXPoolName;
    curveLpTokenAddress = Addresses.PAXToken;
    //console.log('CurvePAXPoolBalance', CurvePAXPoolBalance);
    //console.log('CurvePAXPoolName', CurvePAXPoolName);
  }

  //11) renBTC/wBTC
  if (contractAddress === Addresses.renBTCToken) {
    const CurverenBTCPoolContract = new web3.eth.Contract(
      CurverenBTCPoolABI,
      Addresses.renBTCToken
    );
    let CurverenBTCPoolBalance = await CurverenBTCPoolContract.methods
      .balanceOf(accountAddress)
      .call();
    let CurverenBTCPoolName = await CurverenBTCPoolContract.methods.name().call();
    //get virtual price of the pool
    let CurveLpTokenVirtualPrice = await fetchCurveLpTokenVirtualPrice(contractAddress);
    //assign the value into the array by all the corresponding value
    curveLpTokenPrice = CurveLpTokenVirtualPrice; // pool virtual price
    curveLpTokenBalance = CurverenBTCPoolBalance;
    curveLpTokenName = CurverenBTCPoolName;
    curveLpTokenAddress = Addresses.renBTCToken;
    //console.log('CurverenBTCPoolBalance', CurverenBTCPoolBalance);
    //console.log('CurverenBTCPoolName', CurverenBTCPoolName);
  }

  //12) ETH/rETH
  if (contractAddress === Addresses.rETHToken) {
    const CurverETHPoolContract = new web3.eth.Contract(CurverETHPoolABI, Addresses.rETHToken);
    let CurverETHPoolBalance = await CurverETHPoolContract.methods.balanceOf(accountAddress).call();
    let CurverETHPoolName = await CurverETHPoolContract.methods.name().call();
    //get virtual price of the pool
    let CurveLpTokenVirtualPrice = await fetchCurveLpTokenVirtualPrice(contractAddress);
    //assign the value into the array by all the corresponding value
    curveLpTokenPrice = CurveLpTokenVirtualPrice; // pool virtual price
    curveLpTokenBalance = CurverETHPoolBalance;
    curveLpTokenName = CurverETHPoolName;
    curveLpTokenAddress = Addresses.rETHToken;
    //console.log('CurverETHPoolBalance', CurverETHPoolBalance);
    //console.log('CurverETHPoolName', CurverETHPoolName);
  }

  //13) aDAI/aSUSD
  if (contractAddress === Addresses.sAAVEToken) {
    const CurvesAAVEPoolContract = new web3.eth.Contract(CurvesAAVEPoolABI, Addresses.sAAVEToken);
    let CurvesAAVEPoolBalance = await CurvesAAVEPoolContract.methods
      .balanceOf(accountAddress)
      .call();
    let CurvesAAVEPoolName = await CurvesAAVEPoolContract.methods.name().call();
    //get virtual price of the pool
    let CurveLpTokenVirtualPrice = await fetchCurveLpTokenVirtualPrice(contractAddress);
    //assign the value into the array by all the corresponding value
    curveLpTokenPrice = CurveLpTokenVirtualPrice; // pool virtual price
    curveLpTokenBalance = CurvesAAVEPoolBalance;
    curveLpTokenName = CurvesAAVEPoolName;
    curveLpTokenAddress = Addresses.sAAVEToken;
    //console.log('CurvesAAVEPoolBalance', CurvesAAVEPoolBalance);
    //console.log('CurvesAAVEPoolName', CurvesAAVEPoolName);
  }

  //14) renBTC/wBTC/sBTC
  if (contractAddress === Addresses.sBTCToken.toUpperCase()) {
    console.log('Inside to get contract data for renBtc/wBtc/sBtc');
    const CurvesBTCPoolContract = new web3.eth.Contract(CurvesBTCPoolABI, Addresses.sBTCToken);
    let CurvesBTCPoolBalance = await CurvesBTCPoolContract.methods.balanceOf(accountAddress).call();
    let CurvesBTCPoolName = await CurvesBTCPoolContract.methods.name().call();

    //get virtual price of the pool
    let CurveLpTokenVirtualPrice = await fetchCurveLpTokenVirtualPrice(contractAddress);
    //assign the value into the array by all the corresponding value
    curveLpTokenPrice = CurveLpTokenVirtualPrice; // pool virtual price
    curveLpTokenBalance = CurvesBTCPoolBalance; //token balance of Lp for the given user
    curveLpTokenName = CurvesBTCPoolName; // token name
    curveLpTokenAddress = Addresses.sBTCToken; //token address

    console.log('CurvesBTCPoolBalance', CurvesBTCPoolBalance);
    console.log('CurvesBTCPoolName', CurvesBTCPoolName);
    console.log('Curve lp token virutal price', CurveLpTokenVirtualPrice);
  }

  //15) ETH/sETH
  if (contractAddress === Addresses.sETHToken) {
    const CurvesETHPoolContract = new web3.eth.Contract(CurvesETHPoolABI, Addresses.sETHToken);
    let CurvesETHPoolBalance = await CurvesETHPoolContract.methods.balanceOf(accountAddress).call();
    let CurvesETHPoolName = await CurvesETHPoolContract.methods.name().call();
    //get virtual price of the pool
    let CurveLpTokenVirtualPrice = await fetchCurveLpTokenVirtualPrice(contractAddress);
    //assign the value into the array by all the corresponding value
    curveLpTokenPrice = CurveLpTokenVirtualPrice; // pool virtual price
    curveLpTokenBalance = CurvesETHPoolBalance;
    curveLpTokenName = CurvesETHPoolName;
    curveLpTokenAddress = Addresses.sETHToken;
    //console.log('CurvesETHPoolBalance', CurvesETHPoolBalance);
    //console.log('CurvesETHPoolName', CurvesETHPoolName);
  }

  //16) ETH/stETH
  if (contractAddress === Addresses.stETHToken) {
    const CurvestETHPoolContract = new web3.eth.Contract(CurvestETHPoolABI, Addresses.stETHToken);
    let CurvestETHPoolBalance = await CurvestETHPoolContract.methods
      .balanceOf(accountAddress)
      .call();
    let CurvestETHPoolName = await CurvestETHPoolContract.methods.name().call();
    //get virtual price of the pool
    let CurveLpTokenVirtualPrice = await fetchCurveLpTokenVirtualPrice(contractAddress);
    //assign the value into the array by all the corresponding value
    curveLpTokenPrice = CurveLpTokenVirtualPrice; // pool virtual price
    curveLpTokenBalance = CurvestETHPoolBalance;
    curveLpTokenName = CurvestETHPoolName;
    curveLpTokenAddress = Addresses.stETHToken;
    //console.log('CurvestETHPoolBalance', CurvestETHPoolBalance);
    //console.log('CurvestETHPoolName', CurvestETHPoolName);
  }

  //17) DAI/USDC/USDT/sUSD
  if (contractAddress === Addresses.sUSDToken) {
    const CurvesUSDPoolContract = new web3.eth.Contract(CurvesUSDPoolABI, Addresses.sUSDToken);
    let CurvesUSDPoolBalance = await CurvesUSDPoolContract.methods.balanceOf(accountAddress).call();
    let CurvesUSDPoolName = await CurvesUSDPoolContract.methods.name().call();
    //get virtual price of the pool
    let CurveLpTokenVirtualPrice = await fetchCurveLpTokenVirtualPrice(contractAddress);
    //assign the value into the array by all the corresponding value
    curveLpTokenPrice = CurveLpTokenVirtualPrice; // pool virtual price
    curveLpTokenBalance = CurvesUSDPoolBalance;
    curveLpTokenName = CurvesUSDPoolName;
    curveLpTokenAddress = Addresses.sUSDToken;
    //console.log('CurvesUSDPoolBalance', CurvesUSDPoolBalance);
    //console.log('CurvesUSDPoolName', CurvesUSDPoolName);
  }

  //18) USD-BTC-ETH
  if (contractAddress === Addresses.TriCryptoToken) {
    console.log("Inside of the 'USD-BTC-ETH contract");
    const CurveTriCryptoPoolContract = new web3.eth.Contract(
      CurveTriCryptoPoolABI,
      Addresses.TriCryptoToken.toLowerCase()
    );
    let CurveTriCryptoPoolBalance = await CurveTriCryptoPoolContract.methods
      .balanceOf(accountAddress)
      .call();
    let CurveTriCryptoPoolName = await CurveTriCryptoPoolContract.methods.name().call();
    console.log("value fetched for the 'USD-BTC-ETH contract", CurveTriCryptoPoolName);
    //get virtual price of the pool
    let CurveLpTokenVirtualPrice;
    try {
      CurveLpTokenVirtualPrice = await fetchCurveLpTokenVirtualPrice(contractAddress);
    } catch (err) {
      console.log('No virtual price is available for this pool', contractAddress);
    }
    //assign the value into the array by all the corresponding value
    curveLpTokenPrice = CurveLpTokenVirtualPrice; // pool virtual price
    curveLpTokenBalance = CurveTriCryptoPoolBalance;
    curveLpTokenName = CurveTriCryptoPoolName;
    curveLpTokenAddress = Addresses.TriCryptoToken;
    console.log('CurveTriCryptoPoolBalance', CurveTriCryptoPoolBalance);
    console.log('CurveTriCryptoPoolName', CurveTriCryptoPoolName);
  }

  //19) cDAI/cUSDC/USDT
  if (contractAddress === Addresses.USDTToken) {
    const CurveUSDTPoolContract = new web3.eth.Contract(CurveUSDTPoolABI, Addresses.USDTToken);
    let CurveUSDTPoolBalance = await CurveUSDTPoolContract.methods.balanceOf(accountAddress).call();
    let CurveUSDTPoolName = await CurveUSDTPoolContract.methods.name().call();
    //get virtual price of the pool
    let CurveLpTokenVirtualPrice = await fetchCurveLpTokenVirtualPrice(contractAddress);
    //assign the value into the array by all the corresponding value
    curveLpTokenPrice = CurveLpTokenVirtualPrice; // pool virtual price
    curveLpTokenBalance = CurveUSDTPoolBalance;
    curveLpTokenName = CurveUSDTPoolName;
    curveLpTokenAddress = Addresses.USDTToken;
    //console.log('CurveUSDTPoolBalance', CurveUSDTPoolBalance);
    //console.log('CurveUSDTPoolName', CurveUSDTPoolName);
  }

  //20) yDAI/yUSDC/yUSDT/yTUSD
  if (contractAddress === Addresses.YToken) {
    const CurveYPoolContract = new web3.eth.Contract(CurveYPoolABI, Addresses.YToken);
    let CurveYPoolBalance = await CurveYPoolContract.methods.balanceOf(accountAddress).call();
    let CurveYPoolName = await CurveYPoolContract.methods.name().call();
    //get virtual price of the pool
    let CurveLpTokenVirtualPrice = await fetchCurveLpTokenVirtualPrice(contractAddress);
    //assign the value into the array by all the corresponding value
    curveLpTokenPrice = CurveLpTokenVirtualPrice; // pool virtual price
    curveLpTokenBalance = CurveYPoolBalance;
    curveLpTokenName = CurveYPoolName;
    curveLpTokenAddress = Addresses.YToken;
    //console.log('CurveYPoolBalance', CurveYPoolBalance);
    //console.log('CurveYPoolName', CurveYPoolName);
  }

  //21) cyDAI/cyUSDC/cyUSDT
  if (contractAddress === Addresses.Yv2Token) {
    const CurveYv2PoolContract = new web3.eth.Contract(CurveYv2PoolABI, Addresses.Yv2Token);
    let CurveYv2PoolBalance = await CurveYv2PoolContract.methods.balanceOf(accountAddress).call();
    let CurveYv2PoolName = await CurveYv2PoolContract.methods.name().call();
    //get virtual price of the pool
    let CurveLpTokenVirtualPrice = await fetchCurveLpTokenVirtualPrice(contractAddress);
    //assign the value into the array by all the corresponding value
    curveLpTokenPrice = CurveLpTokenVirtualPrice; // pool virtual price
    curveLpTokenBalance = CurveYv2PoolBalance;
    curveLpTokenName = CurveYv2PoolName;
    curveLpTokenAddress = Addresses.Yv2Token;
  }

  let tokenPrice = 0;
  //Go thru all the lp token contracts and get the balance from each contract pool
  //for (let i = 0 ; i < curveLpTokenBalance.length ; i++ ) {
  var object = {};
  var poolTokenValue;
  //Procced to get the USD value of the token only If balance exist for that pool
  if (parseInt(curveLpTokenBalance) > 0) {
    //curveLpTokenBalance,curveLpTokenName,curveLpTokenAddress
    console.log('Curve Lp Token name ', curveLpTokenName);
    console.log('Curve Lp Token Balance', curveLpTokenBalance);
    console.log('Curve Lp Token Address', curveLpTokenAddress);
    console.log('Curve lp token virtual price', curveLpTokenPrice);
    //console.log("Curve Lp Token Virtual price",CurveLpTokenVirtualPrice)

    //calling the coinGecko API to get the given token/coin data from this we can get token market price
    try {
      let curveTokenName = curveLpTokenName.replace('Curve.fi ', '');
      //get the token market usd price from coingecko API
      const tokenData = await getCoingeckoData(curveLpTokenAddress, curveTokenName);
      if (tokenData) {
        //assign the receiving token price into local variable
        tokenPrice = await tokenData.data.market_data.current_price.usd;
      }
      //if tokeprice is available then calc and get the tokenprice from its pool virtual price
      if (tokenPrice != 0) {
        console.log('Checking the token price in if');
        let calcTokenPrice = tokenPrice * curveLpTokenPrice;
        tokenPrice = calcTokenPrice;
      }
      //if token price is not available for that pool then use the virtual price alone to get the
      //token value
      else {
        console.log('Checking the token price in elseif');
        tokenPrice = curveLpTokenPrice;
      }

      //if(CurveLpTokenVirtualPrice > 0) {

      let tokenCalcValue = (curveLpTokenBalance / 10 ** 18) * (tokenPrice / 10 ** 18);

      curveLpPoolData = [curveTokenName, curveLpTokenBalance, tokenPrice, tokenCalcValue];
    } catch (err) {
      console.log('Error', err.message);
    }
  } //end of if checking for curveLpTokenBalance[i])> 0

  return curveLpPoolData;
};

export default getCurveLpData;
