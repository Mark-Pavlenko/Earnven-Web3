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

export default function YearnFinance({ accountAddress }) {
  const [YearnContent, setYearnContent] = useState([]);
  const [YearnTokenContent, setYearnTokenContent] = useState([]);
  console.log('YearnContent', YearnContent);
  console.log('YearnTokenContent', YearnTokenContent);
  //get useWeb3React hook
  const { account, activate, active, chainId, connector, deactivate, error, provider, setError } =
    useWeb3React();

  async function getWeb3() {
    const provider = await connector.getProvider();
    const web3 = await new Web3(provider);
    return web3;
  }

  const dispatch = useDispatch();

  //------Yearn.Finanace yVault data process-----------------//
  const YearnData = useSelector((state) => state.yearnFinance.yearnFinanceData);
  const YearnTotalValue = useSelector((state) => state.yearnFinance.yearnFinanceTotal);

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

  //use below process to fetch slp token data to intergrate in UI
  useEffect(() => {
    if (YearnData.length > 0) {
      try {
        var content = YearnData.map((object) => {
          return (
            <>
              <Investment protocol={object} logoImage={object.tokenImageUrl} />
              {/*<Accordion*/}
              {/*  style={{*/}
              {/*    background: 'transparent',*/}
              {/*    marginRight: '1px',*/}
              {/*    color: 'black',*/}
              {/*    width: '100%',*/}
              {/*    border: '1px',*/}
              {/*    borderColor: 'black',*/}
              {/*    borderStyle: 'hidden', //solid*/}
              {/*  }}>*/}
              {/*  <AccordionSummary*/}
              {/*    expandIcon={<ExpandMoreIcon />}*/}
              {/*    aria-controls="panel1a-content"*/}
              {/*    id="panel1a-header">*/}
              {/*    <React.Fragment*/}
              {/*      style={{*/}
              {/*        display: 'inline-block',*/}
              {/*        width: '100%',*/}
              {/*        //textAlign: 'left',*/}
              {/*        wordBreak: 'break-all',*/}
              {/*      }}>*/}
              {/*      <React.Fragment>*/}
              {/*        <img*/}
              {/*          style={{*/}
              {/*            height: '20px',*/}
              {/*            width: '20px',*/}
              {/*            display: 'inline-block',*/}
              {/*          }}*/}
              {/*          src={object.tokenImageUrl}*/}
              {/*          alt=""*/}
              {/*        />*/}
              {/*      </React.Fragment>*/}
              {/*      {object.tokenName}&nbsp;*/}
              {/*      {parseFloat(object.tokenValue).toLocaleString()} USD*/}
              {/*    </React.Fragment>*/}
              {/*  </AccordionSummary>*/}
              {/*  <AccordionDetails>*/}
              {/*    <div style={{ display: 'inline-block', width: '70%', fontSize: '12px' }}>*/}
              {/*      Token name &nbsp;&nbsp; {object.tokenName}*/}
              {/*      <br />*/}
              {/*      Balance &nbsp; {parseFloat(object.tokenBalance).toFixed(2)}*/}
              {/*      <br />*/}
              {/*      Price &nbsp;&nbsp;&nbsp;&nbsp;${object.tokenPrice}*/}
              {/*      <br />*/}
              {/*      Value &nbsp;&nbsp;&nbsp;&nbsp;$*/}
              {/*      {parseFloat(object.tokenValue).toLocaleString()}*/}
              {/*      <br />*/}
              {/*      APY &nbsp;&nbsp;&nbsp;&nbsp;*/}
              {/*      {parseFloat(object.apy).toLocaleString()}%*/}
              {/*      <br />*/}
              {/*      Liquidity &nbsp;&nbsp;&nbsp;&nbsp;$*/}
              {/*      {parseFloat(object.liquidity).toLocaleString()}*/}
              {/*      <br />*/}
              {/*      Chain &nbsp;&nbsp;&nbsp;&nbsp; {object.chain}*/}
              {/*      <br />*/}
              {/*      Protocol &nbsp;&nbsp; {object.protocol}*/}
              {/*    </div>*/}
              {/*  </AccordionDetails>*/}
              {/*</Accordion>*/}
            </>
          );
        });
      } catch (err) {
        console.log('No Curve LP token data found');
      }
    }
    setYearnContent(content);
  }, [YearnData]);

  //------Yearn.Finanace YToken data process-----------------//
  //Logic for yToken Yearn Finanace process
  //below function to get yToken data of yearn finanace
  const YearnTokenData = useSelector((state) => state.yearnFinance.yearnYTokenData);
  const YearnTokenTotalValue = useSelector((state) => state.yearnFinance.yearnYTokenTotal);

  useEffect(() => {
    const getYTokenData = async () => {
      const web3 = await getWeb3();

      const yearnTokenAttributes = { accountAddress: accountAddress, web3: web3 };
      try {
        dispatch({
          type: actionTypes.SET_YTOKEN_DATA,
          payload: yearnTokenAttributes,
          web3,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getYTokenData();
  }, [accountAddress]);

  //use below process to fetch slp token data to intergrate in UI
  useEffect(() => {
    if (YearnTokenData.length > 0) {
      try {
        var content = YearnTokenData.map((object) => (
          <Accordion
            style={{
              background: 'transparent',
              marginRight: '1px',
              color: 'black',
              width: '100%',
              border: '1px',
              borderColor: 'black',
              borderStyle: 'hidden', //solid
            }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <React.Fragment
                style={{
                  display: 'inline-block',
                  width: '100%',
                  //textAlign: 'left',
                  wordBreak: 'break-all',
                }}>
                <React.Fragment>
                  <img
                    style={{
                      height: '20px',
                      width: '20px',
                      display: 'inline-block',
                    }}
                    src={object.yTokenImageUrl}
                    alt=""
                  />
                </React.Fragment>
                {object.yTokenSymbol}&nbsp;
                {parseFloat(object.yTokenValue).toLocaleString()} USD
              </React.Fragment>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ display: 'inline-block', width: '70%', fontSize: '12px' }}>
                Token name &nbsp;&nbsp; {object.yTokenSymbol}
                <br />
                Balance &nbsp; {parseFloat(object.yTokenBalanceValue).toFixed(2)}
                <br />
                Price &nbsp;&nbsp;&nbsp;&nbsp;${object.yTokenPrice}
                <br />
                Value &nbsp;&nbsp;&nbsp;&nbsp;$
                {parseFloat(object.yTokenValue).toLocaleString()}
                <br />
                Chain &nbsp;&nbsp;&nbsp;&nbsp; {object.yTokenChain}
                <br />
                Protocol &nbsp;&nbsp; {object.yTokenProtocol}
              </div>
            </AccordionDetails>
          </Accordion>
        ));
      } catch (err) {
        console.log('No Curve LP token data found');
      }
    }
    setYearnTokenContent(content);
  }, [YearnTokenData]);

  return (
    <React.Fragment>
      <div
        style={{
          display: YearnData.length > 0 || YearnTokenData.length > 0 ? '' : 'none',
        }}>
        {/*<img*/}
        {/*  src={YearnLogo}*/}
        {/*  style={{*/}
        {/*    height: '30px',*/}
        {/*    marginTop: '',*/}
        {/*    marginLeft: '15px',*/}
        {/*    display: 'inline-block',*/}
        {/*  }}*/}
        {/*  alt=""*/}
        {/*/>*/}
        {/*Yearn Finance -- $*/}
        {/*{(parseFloat(YearnTotalValue) > 0 ? parseFloat(YearnTotalValue) : 0) +*/}
        {/*  (parseFloat(YearnTokenTotalValue) > 0 ? parseFloat(YearnTokenTotalValue) : 0)}*/}
        {/*USD*/}
        {YearnContent}
        {YearnTokenContent}
      </div>
      <br />
    </React.Fragment>
  );
}
