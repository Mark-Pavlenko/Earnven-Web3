import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import addresses from '../../contractAddresses';
//import Addresses from '../../contractAddresses';
import SushiSwapLogo from '../../assets/icons/Sushiswap.webp';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../constants/actionTypes';
import YearnLogo from '../../assets/icons/yearnLogo.png';
import { useWeb3React } from '@web3-react/core';
import Investment from '../common/investment/investment';
import loadWeb3 from '../../utils/loadWeb3';

export default function YearnFinance({ accountAddress }) {
  const [YearnContent, setYearnContent] = useState([]);
  const [YearnTokenContent, setYearnTokenContent] = useState([]);

  //get useWeb3React hook
  const { account, activate, active, chainId, connector, deactivate, error, provider, setError } =
    useWeb3React();

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

  const dispatch = useDispatch();

  //------Yearn.Finanace yVault data process-----------------//
  const yearnAccountAddress = { accountAddress: accountAddress };
  useEffect(() => {
    const getYearnUserData = async () => {
      try {
        dispatch({
          type: actionTypes.SET_YFI_TOKEN_DATA,
          payload: yearnAccountAddress,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getYearnUserData();
  }, [accountAddress]);

  return <></>;
}
