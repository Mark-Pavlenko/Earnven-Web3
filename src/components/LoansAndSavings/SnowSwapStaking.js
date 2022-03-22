/***********************************************************************************
Purpose : This component is used to get stake token value from SnowSwap Protocol
Developed by : Sathyakrishna T
Version log:
----------------------------------------------------------------------------------
Version           Date                         Description
---------------------------------------------------------------------------------
1.0               19/oct/2021                   Initial Development
************************************************************************************/

import Web3 from 'web3';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import actionTypes from '../../constants/actionTypes';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import loadWeb3 from '../../utils/loadWeb3';

export const SnowSwapStaking = ({ accountAddress }) => {
  const dispatch = useDispatch();

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

  useEffect(() => {
    const getSnowSwapData = async () => {
      const web3 = await getWeb3();
      if (web3 != undefined) {
        const snowSwapAttributes = { accountAddress: accountAddress, web3: web3 };
        try {
          dispatch({
            type: actionTypes.SET_SNOW_SWAP_DATA,
            payload: snowSwapAttributes,
          });
        } catch (error) {
          console.log('Dispatch process failed for snowSwap protocol', err.message);
        }
      }
    };
    getSnowSwapData();
  }, [accountAddress]);

  return <></>;
};
