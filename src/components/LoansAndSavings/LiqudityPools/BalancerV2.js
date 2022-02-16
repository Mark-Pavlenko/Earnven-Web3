import React, { useEffect, useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../../constants/actionTypes';

const BalancerV2 = ({ accountAddress }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      console.log('inside dispatch', accountAddress);
      dispatch({
        type: actionTypes.SET_BALANCER_LP,
        payload: accountAddress,
      });
    } catch (error) {
      console.log('dispatch error in balancer v2', error);
    }
  }, [accountAddress]);

  return <></>;
};

export default BalancerV2;
