import React, { useState, useEffect } from 'react';
import pickleGaugeAddressList from '../../../contractAddress/PickleTokenAddresses';
//import abi from '../../../abi/PickleAbi.json';
import abi from '../../../abi/PickleDill.json';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { ethers } from 'ethers';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../../constants/actionTypes';
import loadWeb3 from '../../../utils/loadWeb3';

const PickleDill = ({ accountAddress }) => {
  const dispatch = useDispatch();
  const [imgdata, setimgdata] = useState('');
  const [accountbalance, setaccountbalance] = useState(0);
  //get useWeb3React hook
  const { account, activate, active, chainId, connector, deactivate, error, provider, setError } =
    useWeb3React();
  //logic implementing for web3 provider connection using web3 React hook
  async function getWeb3() {
    let web3;
    try {
      const provider = active ? await connector.getProvider() : await loadWeb3();
      web3 = new Web3(provider);
    } catch (err) {
      console.log('Web3 is not connected, check the Metamask connectivity!!');
    }
    return web3;
  }

  async function fetchData() {
    const web3 = await getWeb3();
    if (web3 != undefined) {
      const contract = new web3.eth.Contract(abi, '0xbBCf169eE191A1Ba7371F30A1C344bFC498b29Cf');
      // const balance = (await contract.methods.balanceOf(accountAddress).call()) / 10 ** 18;
      // setaccountbalance(balance);
      const lockedBalance = await contract.methods.locked(accountAddress).call();
      let result = JSON.stringify(lockedBalance).split(',')[2];
      let balanceAmt = JSON.parse(result.split(':')[1]);
      let balance = balanceAmt > 0 ? balanceAmt / 10 ** 18 : 0;

      setaccountbalance(balance);

      let dataSend = [];
      dataSend.push(accountAddress);
      dataSend.push(balance);
      try {
        dispatch({
          type: actionTypes.SET_PICKLE_DILL,
          payload: dataSend,
        });
      } catch (err) {
        console.log('error in dispatch dill new', err);
      }
      return balance;
    }
  }

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log('dispatch error in pickle dill new', error);
    }
  }, [accountAddress]);

  // const pickleDillArray = useSelector((state) => state.pickeDill.pickeDill);
  // //console.log('TestPicke from main saga test dill', pickleDillArray);

  return <div></div>;
};

export default PickleDill;
