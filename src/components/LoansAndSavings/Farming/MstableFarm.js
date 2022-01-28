import React, { useState, useEffect } from 'react';
import axios from 'axios';
import abi from '../../../abi/mStableAbi.json';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { ethers } from 'ethers';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../../constants/actionTypes';
import mStableAddressList from '../../../contractAddress/mStableAddress';
import Investment from '../../common/investment/investment';
const MstableFarm = ({ accountAddress }) => {
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

  useEffect(() => {
    // fetcnData();
    // try {
    //   dispatch({
    //     type: actionTypes.SET_MSTABLE_FARM,
    //     payload: accountAddress,
    //   });
    // } catch (err) {
    //   console.log('error in dispatch mStable', err);
    // }
  }, [accountAddress]);

  const pickleDillArray = useSelector((state) => state.mStableSavingsFarm.mStableSavingsFarm);
  const pickleDillArray1 = useSelector((state) => state.ethExplorerApi.ethExplorerApi);

  useEffect(() => {
    if (pickleDillArray && pickleDillArray.length > 0) {
      // fetchData(pickleDillArray);
      setflag(1);
    }
  }, [pickleDillArray]);
  useEffect(() => {
    fetchWeb3(pickleDillArray1);
  }, [pickleDillArray1]);

  async function fetchWeb3(ArrayDataApi) {
    const web3 = await getWeb3();
    if (ArrayDataApi.length == undefined) {
      let arrayData = [];
      arrayData.push(ArrayDataApi);
      arrayData.push(accountAddress);
      if (ArrayDataApi) {
        try {
          for (let i = 0; i < ArrayDataApi.tokens.length; i++) {
            for (let j = 0; j < mStableAddressList.length; j++) {
              let object = {};
              if (
                ArrayDataApi.tokens[i].tokenInfo.address.toUpperCase() ==
                mStableAddressList[j].toUpperCase()
              ) {
                //   if (data_api.tokens[i].tokenInfo.website == 'https://mstable.org') {
                const contract = new web3.eth.Contract(
                  abi,
                  ArrayDataApi.tokens[i].tokenInfo.address
                );
                const balance = (await contract.methods.earned(accountAddress).call()) / 10 ** 18;
                console.log('ArrayDataApi.tokens[i].tokenInfo in ', balance);
                arrayData.push(balance);
              }
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
      try {
        dispatch({
          type: actionTypes.SET_MSTABLE_FARM,
          payload: arrayData,
        });
      } catch (err) {
        console.log('error in dispatch mStable', err);
      }
    }
  }
  return (
    <div>
      {flag ? (
        <div
          style={{
            display: pickleDillArray.length > 0 ? '' : 'none',
          }}>
          {pickleDillArray.map((object, index) => {
            return <Investment key={index} protocol={object} logoImage={object.tokenImage} />;
          })}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default MstableFarm;
