import React, { useState, useEffect } from 'react';
import pickleGaugeAddressList from '../../../contractAddress/PickleTokenAddresses';
import abi from '../../../abi/PickleAbi.json';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { ethers } from 'ethers';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../../constants/actionTypes';
import Investment from '../../common/investment/investment';

const AlchemixVault = ({ accountAddress }) => {
  const dispatch = useDispatch();
  const [flag, setflag] = useState(0);

  //get useWeb3React hook
  const { account, activate, active, chainId, connector, deactivate, error, provider, setError } =
    useWeb3React();
  //logic implementing for web3 provider connection using web3 React hook
  async function getWeb3() {
    const provider = active ? await connector.getProvider() : ethers.getDefaultProvider();
    const web3 = await new Web3(provider);
    return web3;
  }

  const pickleDillArray = useSelector((state) => state.alchemixVaults.alchemixVaults);
  const pickleDillArray1 = useSelector((state) => state.ethExplorerApi.ethExplorerApi);

  useEffect(() => {
    // let balance = web3Conection_balance(accountAddress);
  }, [accountAddress]);

  async function fetchWeb3(ArrayDataApi) {
    const web3 = await getWeb3();
    if (ArrayDataApi.length == undefined) {
      let arrayData = [];
      arrayData.push(ArrayDataApi);
      arrayData.push(accountAddress);
      console.log('alchemixarraydata', arrayData);
      try {
        dispatch({
          type: actionTypes.SET_ALCHEMIX_VAULT,
          payload: arrayData,
        });
      } catch (err) {
        console.log('error in dispatch Alchemix', err);
      }
    }
  }
  useEffect(() => {
    if (pickleDillArray && pickleDillArray.length > 0) {
      setflag(1);
    }
  }, [pickleDillArray]);

  useEffect(() => {
    fetchWeb3(pickleDillArray1);
  }, [pickleDillArray1]);

  useEffect(() => {
    if (pickleDillArray && pickleDillArray.length > 0) {
      console.log('alchemix final result', pickleDillArray);
    }
  }, [pickleDillArray]);
  return (
    <div>
      {flag && (
        <div
          style={{
            display: pickleDillArray.length > 0 ? '' : 'none',
          }}>
          {pickleDillArray.map((object, index) => {
            return <Investment key={index} protocol={object} logoImage={object.icon} />;
          })}
        </div>
      )}
    </div>
  );
};

export default AlchemixVault;
