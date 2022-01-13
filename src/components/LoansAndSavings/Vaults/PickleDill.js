import React, { useState, useEffect } from 'react';
import pickleGaugeAddressList from '../../../contractAddress/PickleTokenAddresses';
import abi from '../../../abi/PickleAbi.json';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { ethers } from 'ethers';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../../constants/actionTypes';

const PickleDill = ({ accountAddress }) => {
  const dispatch = useDispatch();
  const [imgdata, setimgdata] = useState('');
  const [accountbalance, setaccountbalance] = useState(0);
  //get useWeb3React hook
  const { account, activate, active, chainId, connector, deactivate, error, provider, setError } =
    useWeb3React();
  //logic implementing for web3 provider connection using web3 React hook
  async function getWeb3() {
    const provider = active ? await connector.getProvider() : ethers.getDefaultProvider();
    const web3 = await new Web3(provider);
    return web3;
  }

  async function fetchData() {
    const web3 = await getWeb3();
    const contract = new web3.eth.Contract(abi, '0xbBCf169eE191A1Ba7371F30A1C344bFC498b29Cf');
    const balance = (await contract.methods.balanceOf(accountAddress).call()) / 10 ** 18;
    setaccountbalance(balance);
    console.log('balance  pickle', balance);
    let dataSend = [];
    dataSend.push(accountAddress);
    dataSend.push(balance);
    try {
      dispatch({
        type: actionTypes.SET_PICKLE_DILL,
        payload: dataSend,
      });
    } catch (err) {
      console.log('error in dispatch dill', err);
    }
    return balance;
  }

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log('dispatch error in pickle dill', error);
    }
  }, [accountAddress]);

  const pickleDillArray = useSelector((state) => state.pickeDill?.pickeDill);

  useEffect(() => {
    console.log('saga test dill', pickleDillArray);
    // setimgdata(pickleDillArray[0].icon);
  }, [pickleDillArray]);
  return <div></div>;
};

export default PickleDill;
