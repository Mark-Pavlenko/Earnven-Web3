/*
Developed by - Prabhakaran.R
Date : 08-SEP-2021
purpose : this component is used to display pool details for the selected pool of tokens
*/

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router'
import PoolDetailData from './PoolDetailData';
// import PoolDetailsRecord from "./Index"
import { PoolDetails } from '../liquidityPoolDetails/poolDetails';
import ABISUSHI from './ABISUSHI.json';
import Web3 from 'web3';

export default function DetailLoadPage(props) {
  // const navigate = useNavigate()
  const { address } = useParams();
  const { tokenid } = useParams();
  const [Loading, setLoading] = useState(false);
  const { token0 } = props;
  const { token1 } = props;
  const pairAddress = useParams();
  const [tokens, setTokens] = useState();
  // let tokenid = 0xceff51756c56ceffca006cd410b03ffc46dd3a58
  // let token0 = 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
  // let token1 = 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2
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
  const loadData = async () => {
    await loadWeb3();
    const web3 = window.web3;
    const tokensInfo = new web3.eth.Contract(ABISUSHI, pairAddress.tokenid);
    const token0Info = await tokensInfo.methods.token0().call();
    const token1Info = await tokensInfo.methods.token1().call();
    return { token0Info, token1Info };
  };

  useEffect(() => {
    loadData().then((res) => {
      setTokens(res);
    });
  }, []);

  // console.log('Address from loading page', props.address)
  console.log('sushiswap Pair token0 from loading page-', token0);
  console.log('sushiswap Pair token1 from loading page-', token1);
  const setLoadingFlag = (flag) => {
    setLoading(flag);
  };
  // const [Token, setToken] = useState('')
  // useEffect(() => {
  //   setToken(token0)
  // })
  // console.log('sushiswap Pair after from loading page-', Token)
  // <PoolDetailData address={props.address} tokenid={props.tokenid} />
  console.log('asijodqkmlwfq', tokens);
  return (
    <div style={{ margin: 'auto' }}>
      <h3>I am in sushiswap pool detail page {tokenid}</h3>
      {/*<PoolDetails address={address} token0={token0} token1={token1} />*/}
      {tokens && (
        <PoolDetailData address={address} token0={tokens.token0Info} token1={tokens.token1Info} />
      )}
    </div>
  );
}
