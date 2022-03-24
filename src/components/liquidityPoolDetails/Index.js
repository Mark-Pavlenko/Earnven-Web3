/*
Developed by - Prabhakaran.R
Date : 08-SEP-2021
purpose : this component is used to display pool details for the selected pool of tokens
*/

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Web3 from 'web3';
import PoolDetailsPage from './PoolDetailData';
import FACTORYABI from '../../abi/UniFactoryV2.json';
import Addresses from '../../contractAddresses';

export default function Index() {
  const navigate = useNavigate();
  const { address } = useParams();
  const { token0 } = useParams();
  const { token1 } = useParams();
  console.log('Prabha pairToken0 - ', token0);
  console.log('Prabha pairToken1 - ', token1);
  const [tokenid, setTokenPair] = useState();

  // added by Prabha on 15-09-2021
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

  // const getPairToken = async (token0, token1) => {
  //   await loadWeb3()
  //   const web3 = window.web3
  //   var FactoryContract = new web3.eth.Contract(
  //     FACTORYABI,
  //     Addresses.uniFactory,
  //   )
  //   const tokenPair = await FactoryContract.methods
  //     .getPair(token0, token1)
  //     .call()
  //   console.log('Prabha 2nd Pair Address', tokenPair)
  //   return tokenPair
  // }

  useEffect(() => {
    async function getPairToken(token0, token1) {
      await loadWeb3();
      const { web3 } = window;
      const FactoryContract = new web3.eth.Contract(FACTORYABI, Addresses.uniFactory);

      const tokenid = await FactoryContract.methods.getPair(token0, token1).call();

      console.log('Prabha Pair from Index page', tokenid.toLowerCase());
      setTokenPair(tokenid.toLowerCase());
    }

    getPairToken(token0, token1);
    return () => {};
  }, [tokenid]);

  // useEffect(() => {
  //   setTokenPair();
  // }, []);
  return (
    <div style={{ margin: 'auto' }}>
      {tokenid && <PoolDetailsPage address={address} tokenid={tokenid} />}
      {/*{navigate(`/${address}/uniswap/pair/${tokenid}`)}*/}
    </div>
  );
}
