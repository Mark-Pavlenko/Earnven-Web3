/**************************************************************************************************
Purpose : This component is used to get liquity tokens and staking, collateral value for a given user
Developed by : Prabhakaran.R
Version log:
---------------------------------------------------------------------------------------------------
Version      Date                Description                                    Developed/Fixed 
----------------------------------------------------------------------------------------------------
1.0         18/Jan/2022          Initial Development                             Prabhakaran.R

**************************************************************************************************/
import React, { useEffect, useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../constants/actionTypes';
import loadWeb3 from '../../utils/loadWeb3';

export default function Liquity({ accountAddress, onSynthetixTokenValue }) {
  const [LqtyTokenContent, setLqtyTokenContent] = useState([]);
  const [LqtyLogoUrl, setLqtyLogoUrl] = useState();

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

  //------Liquity Token data process-----------------//
  //Logic for liquity token data process

  let LqtyTokenData = useSelector((state) => state.liquityToken.liquityTokenData);
  let LqtyTokenTotalValue = useSelector((state) => state.liquityToken.liquityTokenTotal);

  useEffect(() => {
    const getLiquityTokenData = async () => {
      const web3 = await getWeb3();
      if (web3 != undefined) {
        const liquityTokenAttributes = { accountAddress: accountAddress, web3: web3 };
        try {
          dispatch({
            type: actionTypes.SET_LQTY_TOKEN_DATA,
            payload: liquityTokenAttributes,
          });
        } catch (error) {
          console.log('Liquity Protocol error in dispatch', error.message);
        }
      }
    };
    getLiquityTokenData();
  }, [accountAddress]);

  //Below process is used to implement the fetched SNX token in UI
  useEffect(() => {
    if (LqtyTokenData.length > 0) {
      try {
        var content = LqtyTokenData.map((object) => (
          <Accordion
            style={{
              background: 'transparent',
              marginRight: '1px',
              color: 'black',
              width: '100%',
              border: '1px',
              borderColor: 'black',
              borderStyle: 'hidden',
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
                    src={object.lqtyTokenImageUrl}
                    alt=""
                  />
                </React.Fragment>
                Liquity&nbsp; $
                {parseFloat(parseFloat(object.lqtyTokenTotalValue).toFixed(2)).toLocaleString()} USD
              </React.Fragment>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ display: 'inline-block', width: '70%', fontSize: '15px' }}>
                {parseFloat(object.lqtyTokenVaultValue) > 0 ? (
                  <React.Fragment>
                    Vault --- &nbsp;&nbsp;&nbsp;&nbsp; $
                    {parseFloat(object.lqtyTokenVaultValue).toLocaleString()}
                    <br />
                    &nbsp;&nbsp;&nbsp;Balance &nbsp;{' '}
                    {parseFloat(object.lqtyTokenVaultUSD).toLocaleString()}
                    <br />
                    &nbsp;&nbsp;&nbsp; LUSD Price &nbsp;&nbsp;&nbsp;&nbsp;$
                    {object.LUSDPrice}
                    <br />{' '}
                  </React.Fragment>
                ) : (
                  ''
                )}
                {parseFloat(object.lqtyDebtLusdValue) > 0 ? (
                  <React.Fragment>
                    Debt --- &nbsp;&nbsp;&nbsp;&nbsp; $
                    {parseFloat(object.lqtyDebtLusdValue).toLocaleString()}
                    <br />
                    &nbsp;&nbsp;&nbsp;Balance &nbsp;&nbsp;&nbsp;&nbsp;{' '}
                    {parseFloat(object.lqtyDebtAmt).toLocaleString()}
                    <br />
                    &nbsp;&nbsp;&nbsp; LUSD Price &nbsp;&nbsp;&nbsp;&nbsp; {object.LUSDPrice}
                    <br />
                  </React.Fragment>
                ) : (
                  ''
                )}
                {parseFloat(object.lqtyCollateralEthValue) > 0 ? (
                  <React.Fragment>
                    Collateral --- &nbsp;&nbsp;&nbsp;&nbsp; $
                    {parseFloat(object.lqtyCollateralEthValue).toLocaleString()}
                    <br />
                    &nbsp;&nbsp;&nbsp;Balance &nbsp;&nbsp;&nbsp;&nbsp;{' '}
                    {parseFloat(object.lqtyCollateralAmt).toLocaleString()}
                    <br />
                    &nbsp;&nbsp;&nbsp;ETH Price &nbsp;&nbsp;&nbsp;&nbsp; {object.ethPrice}
                    <br />
                  </React.Fragment>
                ) : (
                  ''
                )}
                {parseFloat(object.lqtyStakingLqtyValue) > 0 ? (
                  <React.Fragment>
                    Staking --- &nbsp;&nbsp;&nbsp;&nbsp; $
                    {parseFloat(object.lqtyStakingLqtyValue).toLocaleString()}
                    <br />
                    &nbsp;&nbsp;&nbsp;Balance &nbsp;&nbsp;&nbsp;&nbsp;{' '}
                    {parseFloat(object.lqtyStakingAmt).toLocaleString()}
                    <br />
                    &nbsp;&nbsp; LQTY Price &nbsp;&nbsp;&nbsp;&nbsp; {object.LQTYPrice}
                    <br />
                  </React.Fragment>
                ) : (
                  ''
                )}
                {parseFloat(object.lqtyTokenClaimableValue) > 0 ||
                parseFloat(object.lqtyEthClaimableValue) > 0 ? (
                  <React.Fragment>
                    Claimable --{' '}
                    {parseFloat(object.lqtyTokenClaimableValue) > 0
                      ? parseFloat(object.lqtyTokenClaimableValue)
                      : 0 + parseFloat(object.lqtyEthClaimableValue) > 0
                      ? parseFloat(object.lqtyEthClaimableValue)
                      : 0}
                    <br />
                    &nbsp;&nbsp;&nbsp;{object.lqtyTokenClaimableValue}
                    <br />
                    &nbsp;&nbsp;&nbsp;{object.lqtyEthClaimableValue}
                    <br />
                  </React.Fragment>
                ) : (
                  ''
                )}
                Chain &nbsp;&nbsp;&nbsp;&nbsp; Ethereum
                <br />
                Protocol &nbsp;&nbsp; Liquity
              </div>
            </AccordionDetails>
          </Accordion>
        ));
      } catch (err) {
        console.log('No Curve LP token data found');
      }
    }

    setLqtyTokenContent(content);
  }, [LqtyTokenData]);

  return (
    <React.Fragment>
      {/* <div
        style={{
          fontSize: '15px',
          marginRight: '15px',

          display: LqtyTokenData.length > 0 ? '' : 'none',
        }}>
        <img
          src={LqtyTokenData.length > 0 ? LqtyTokenData[0].lqtyTokenImageUrl : ''}
          style={{
            height: '30px',
            marginTop: '',
            marginLeft: '15px',
            display: 'inline-block',
          }}
          alt=""
        />
        Liquity -- ${LqtyTokenTotalValue} USD
        {LqtyTokenContent}
      </div>
      <br /> */}
    </React.Fragment>
  );
}
