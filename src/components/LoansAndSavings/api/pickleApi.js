import axios from 'axios';
import Web3 from 'web3';
import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react';
import pickleGaugeAddressList from '../../../contractAddress/PickleTokenAddresses';
import abi from '../../../abi/PickleAbi.json';
import pickleIcon from '../../../assets/icons/pickle_finance_logo.webp';
import { object } from 'prop-types';
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

async function getWeb3(provider_hook) {
  const provider = await provider_hook;
  const web3 = await new Web3(provider);
  return web3;
}

export async function fetchBalance(attributes) {
  try {
    let pool = [];
    const response = await fetch(
      `https://api.ethplorer.io/getAddressInfo/${attributes[0]}?apiKey=EK-qSPda-W9rX7yJ-UY93y`
    );
    // const web3 = await getWeb3(attributes[1]);
    await loadWeb3();
    const web3 = window.web3;
    const data = await response.json();
    var dataArray = [];
    var tot = 0;
    // var object = {};
    let currentprice = 0;
    let pickleIcon = '';
    await axios
      .get(`https://api.pickle.finance/prod/protocol/pfcore/`)
      .then(async ({ data }) => {
        for (var k = 2; k < data.assets.jars.length; k++) {
          dataArray.push(data.assets.jars[k].farm);
        }
      })
      .catch((err) => {
        console.log('error in fetching Uniswap v2', err);
      });
    await axios
      .get(
        `https://api.coingecko.com/api/v3/coins/ethereum/contract/0x429881672B9AE42b8EbA0E26cD9C73711b891Ca5`
      )
      .then(async ({ data }) => {
        currentprice = data.market_data.current_price.usd;
        pickleIcon = data.image.small;
      })
      .catch((err) => {
        console.log('error in fetching pickle staking', err);
      });
    for (let i = 0; i < data.tokens.length; i++) {
      for (let j = 0; j < pickleGaugeAddressList.length; j++) {
        if (
          data.tokens[i].tokenInfo.address.toUpperCase() == pickleGaugeAddressList[j].toUpperCase()
        ) {
          let object = {};
          object.contractAddress = data.tokens[i].tokenInfo.address;
          const contract = new web3.eth.Contract(abi, data.tokens[i].tokenInfo.address);
          const balance = (await contract.methods.balanceOf(attributes[0]).call()) / 10 ** 18;
          object.balance = balance;
          for (var x = 0; x < dataArray.length; x++) {
            if (dataArray[x] !== undefined) {
              //   console.log(';inisde', dataArray[x].farmAddress);
              if (
                dataArray[x].farmNickname !== 'pUniV2 BAC/DAI' &&
                dataArray[x].farmNickname !== 'pSushi MIC/USDT' &&
                dataArray[x].farmAddress !== '0x0000000000000000000000000000000000000000' &&
                dataArray[x].farmAddress !== undefined
              ) {
                // console.log('test in pickle', 'number', x, dataArray[x].farmAddress);
                if (
                  dataArray[x].farmAddress.toUpperCase() ==
                  data.tokens[i].tokenInfo.address.toUpperCase()
                ) {
                  object.price =
                    dataArray[x].details.valueBalance / dataArray[x].details.tokenBalance;
                  object.value = object.price * object.balance;
                  tot = tot + object.value;
                  object.total = tot;
                  object.tokenName = dataArray[x].farmNickname;
                }
              }
            }
          }
          const earned = (await contract.methods.earned(attributes[0]).call()) / 10 ** 18;
          object.earned = earned * currentprice;
          object.protocol = 'Pickle Finance';
          object.chain = 'Ethereum';
          pool.push(object);
        }
      }
    }
    console.log('final object', pool);
    return pool;
  } catch (err) {
    console.log('error in pickle stakeing', err);
  }
}

export async function fetchBalanceDill(attributes) {
  let asset = [];
  let object = {};
  await axios
    .get(`https://api.pickle.finance/prod/protocol/pfcore/`)
    .then(async ({ data }) => {
      object.price = data.dill.dillWeeks[data.dill.dillWeeks.length - 1].picklePriceUsd;
      object.liquidity = data.dill.dillWeeks[data.dill.dillWeeks.length - 1].totalDillAmount;
      object.totalValue = object.price * attributes[1];
      console.log('attributes', attributes);
      object.balance = attributes[1];
      object.protocol = 'Pickle Finance';
      object.chain = 'Ethereum';
      object.icon = pickleIcon;
      object.tokenName = 'Dill';
      object.total = object.totalValue;
      asset.push(object);
    })
    .catch((err) => {
      console.log('error in fetching pickle dill', err);
    });
  return asset;
}
