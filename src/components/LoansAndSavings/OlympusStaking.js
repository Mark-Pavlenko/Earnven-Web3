/**************************************************************************************************
Purpose : This component is used to get Olympus staking token value for a given user
Developed by : Prabhakaran.R
Version log:
---------------------------------------------------------------------------------------------------
Version      Date                Description                                    Developed/Fixed 
----------------------------------------------------------------------------------------------------
1.0         21/Jan/2022          Initial Development                             Prabhakaran.R

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
export default function OlympusStaking({ accountAddress }) {
  const [TokenContent, setTokenContent] = useState([]);
  //get useWeb3React hook
  const { account, activate, active, chainId, connector, deactivate, error, provider, setError } =
    useWeb3React();

  //logic implementing for web3 provider connection using web3 React hook
  async function getWeb3() {
    const provider = await connector.getProvider();
    const web3 = await new Web3(provider);
    return web3;
  }

  //dispatch the action
  const dispatch = useDispatch();
  useEffect(() => {
    const getOHMTokenData = async () => {
      const web3 = await getWeb3();
      const olympusTokenAttributes = { accountAddress: accountAddress, web3: web3 };
      try {
        dispatch({
          type: actionTypes.SET_OHM_TOKEN_DATA,
          payload: olympusTokenAttributes,
        });
      } catch (err) {
        console.log('Dispatch error in olympus process', err.message);
      }
    };
    getOHMTokenData();
  }, [accountAddress]);

  // //get the data from saga
  const olympusStakingData = useSelector((state) => state.olympusStaking.olympusTokenData);
  const olympusTokenTotal = useSelector((state) => state.olympusStaking.olympusTokenTotal);

  //Below process is used to implement the fetched SNX collateral value in UI
  useEffect(() => {
    if (olympusStakingData.length > 0) {
      try {
        var content = olympusStakingData.map((object) => (
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

                  wordBreak: 'break-all',
                }}>
                <React.Fragment>
                  <img
                    style={{
                      height: '20px',
                      width: '20px',
                      display: 'inline-block',
                    }}
                    src={object.tokenImage}
                    alt=""
                  />
                </React.Fragment>
                {object.symbol}&nbsp;
                {parseFloat(olympusTokenTotal)} USD
              </React.Fragment>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ display: 'inline-block', width: '70%', fontSize: '15px' }}>
                Olympus token &nbsp;&nbsp;&nbsp;&nbsp; {object.symbol}
                <br />
                Balance &nbsp; {parseFloat(object.balance).toLocaleString()}
                <br />
                Price &nbsp;&nbsp;&nbsp;&nbsp;${parseFloat(object.price)}
                <br />
                Liquidity &nbsp;&nbsp;&nbsp;&nbsp;${parseFloat(object.liquidity).toLocaleString()}
                <br />
                Value &nbsp;&nbsp;&nbsp;&nbsp;$
                {parseFloat(object.value).toLocaleString()}
                <br />
                Chain &nbsp;&nbsp;&nbsp;&nbsp; Ethereum
                <br />
                Protocol &nbsp;&nbsp; Olympus
              </div>
            </AccordionDetails>
          </Accordion>
        ));
      } catch (err) {
        console.log('No Olympus Staking data found');
      }
    }

    setTokenContent(content);
  }, [olympusStakingData]);

  return (
    <React.Fragment>
      {/* <div
        style={{
          fontSize: '15px',
          marginRight: '15px',

          display: olympusStakingData.length > 0 ? '' : 'none',
        }}>
        <img
          src={olympusStakingData.length > 0 ? olympusStakingData[0].tokenImage : ''}
          style={{
            height: '30px',
            marginTop: '',
            marginLeft: '15px',
            display: 'inline-block',
          }}
          alt=""
        />
        {parseFloat(olympusTokenTotal) > 0 ? (
          <React.Fragment>
            Olympus &nbsp;&nbsp; --- {olympusTokenTotal.toLocaleString()} USD
            {TokenContent}
          </React.Fragment>
        ) : (
          ''
        )}
      </div>
      <br /> */}
    </React.Fragment>
  );
}
