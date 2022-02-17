import React, { useEffect, useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../../constants/actionTypes';
import { ConsoleView } from 'react-device-detect';

const UniswapV2 = ({ accountAddress }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch({
        type: actionTypes.SET_UNISWAPV2_LP,
        payload: accountAddress,
      });
    } catch (error) {
      console.log('dispatch error in balancer v2', error);
    }
  }, [accountAddress]);

  return <></>;
};

export default UniswapV2;
