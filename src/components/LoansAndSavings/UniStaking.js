import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../constants/actionTypes';

export default function UniStaking({ accountAddress }) {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch({
        type: actionTypes.SET_UNISWAPV2_STAKE,
        payload: accountAddress,
      });
    } catch (error) {
      console.log('dispatch error in uniswap stake v2', error);
    }
  }, [accountAddress]);

  return <></>;
}
