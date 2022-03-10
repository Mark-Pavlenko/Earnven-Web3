import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Addresses from '../../contractAddresses';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SushiSwapLogo from '../../assets/icons/Sushiswap.webp';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../constants/actionTypes';
import SushiProtocol from '../common/investment/sushiProtocolComponent/sushiProtocol';

export default function SushiStaking({ accountAddress }) {
  const getEpoch = () => {
    const d = new Date();
    const day = d.getUTCDate();
    const month = d.getUTCMonth();
    const year = d.getUTCFullYear();
    const offset = new Date(year, month, day).getTimezoneOffset() * 60;
    const epoch = new Date(year, month, day).getTime() / 1000 - offset;
    return epoch;
  };
  //then make dispatch/send an action
  const dispatch = useDispatch();
  //below function is used to get sushi staking balance from the subgraph
  useEffect(() => {
    const getSushiStakeData = async () => {
      const epocDate = await getEpoch();
      const sushiStakingObjects = { accountAddress: accountAddress, epocDate: epocDate };
      try {
        dispatch({
          type: actionTypes.SET_SLP_STAKE_DATA,
          payload: sushiStakingObjects,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getSushiStakeData();
  }, [accountAddress]);

  return <></>;
}
