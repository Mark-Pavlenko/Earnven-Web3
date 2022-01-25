import React, { useEffect, useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../../constants/actionTypes';
import Investment from '../../common/investment/investment';
const MstablePools = ({ accountAddress }) => {
  const dispatch = useDispatch();
  const pickleDillArray = useSelector((state) => state.mStableSavingsPool.mStableSavingsPool);
  const pickleDillArray1 = useSelector((state) => state.ethExplorerApi.ethExplorerApi);
  const [flag, setflag] = useState(0);
  useEffect(() => {
    if (pickleDillArray && pickleDillArray.length > 0) {
      setflag(1);
      // fetchData(pickleDillArray);dsjfh fsdhkh
    }
  }, [pickleDillArray]);
  useEffect(() => {
    fetchWeb3(pickleDillArray1);
  }, [pickleDillArray1]);

  async function fetchWeb3(ArrayDataApi) {
    if (ArrayDataApi.length == undefined) {
      console.log('ArrayDataApi in if', ArrayDataApi);
      let arrayData = [];
      arrayData.push(ArrayDataApi);
      arrayData.push(accountAddress);
      // for (let i = 0; i < ArrayDataApi.tokens.length; i++) {
      //   for (let j = 0; j < mStableAddressList.length; j++) {
      //     let object = {};
      //     if (
      //       ArrayDataApi.tokens[i].tokenInfo.address.toUpperCase() ==
      //       mStableAddressList[j].toUpperCase()
      //     ) {
      //       //   if (data_api.tokens[i].tokenInfo.website == 'https://mstable.org') {
      //       const contract = new web3.eth.Contract(abi, ArrayDataApi.tokens[i].tokenInfo.address);
      //       const balance = (await contract.methods.earned(accountAddress).call()) / 10 ** 18;
      //       console.log('ArrayDataApi.tokens[i].tokenInfo in ', balance);
      //       arrayData.push(balance);
      //     }
      //   }
      // }
      try {
        dispatch({
          type: actionTypes.SET_MSTABLE_POOL,
          payload: arrayData,
        });
      } catch (err) {
        console.log('error in dispatch mStable', err);
      }
    }
  }
  return (
    <div>
      {flag && (
        <div
          style={{
            display: pickleDillArray.length > 0 ? '' : 'none',
          }}>
          {pickleDillArray.map((object, index) => {
            return <Investment key={index} protocol={object} logoImage={object.tokenImage} />;
          })}
        </div>
      )}
    </div>
  );
};

export default MstablePools;
