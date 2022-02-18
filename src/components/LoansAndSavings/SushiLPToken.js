/** *********************************************************************************
Purpose : This component is used to get sushi LP token data for sushiv2 Protocol
Developed by : Prabhakaran.R
procedures/packages/components used in this process
1)Using the graph sushi api materChef to get users staked list of pools
    https://api.thegraph.com/subgraphs/name/sushiswap/master-chef

Version log:
----------------------------------------------------------------------------------
Version           Date                         Description
---------------------------------------------------------------------------------
1.0               24/Jan/2022                   Initial Development

*********************************************************************************** */

import React, { useEffect, useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../constants/actionTypes';
import SushiSwapLogo from '../../assets/icons/Sushiswap.webp';

export default function SushiLPToken({ accountAddress }) {
  //dispatch the action
  const dispatch = useDispatch();
  useEffect(() => {
    const getSushiSwapLPData = async () => {
      const sushiSwapObjects = { accountAddress: accountAddress };
      try {
        dispatch({
          type: actionTypes.SET_SUSHILP_DATA,
          payload: sushiSwapObjects,
        });
      } catch (err) {
        console.log('Dispatch error in sushu=iswapLP process', err.message);
      }
    };
    getSushiSwapLPData();
  }, [accountAddress]);

  return <React.Fragment></React.Fragment>;
}
