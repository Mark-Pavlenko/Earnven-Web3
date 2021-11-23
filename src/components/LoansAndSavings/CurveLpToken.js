/**************************************************************************************************
Purpose : This component is used to get CurveLpToken value for a given user
Developed by : Prabhakaran.R
Version log:
---------------------------------------------------------------------------------------------------
Version      Date                Description                                    Developed/Fixed 
----------------------------------------------------------------------------------------------------
1.0         28/Oct/2021          Initial Development                             Prabhakaran.R
1.1         17/Nov/2021          Features add to bring additonal field           Prabhakaran.R  

**************************************************************************************************/
import React, { useEffect, useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import CuveLpTokenList from '../../contractAddress/CurveLpTokenAddressList';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Web3 from 'web3';
import axios from 'axios';
import getCurveLpData from './getCurveLpData';
import curveLogo from '../../assets/icons/curveLogo.png';

import CurveLpImage from './CurveLpImage';

export default function CurveLpToken({ accountAddress, onCurveLptoken }) {
  const [CurveLpTokenData, setCurveLpTokenData] = useState([]);
  const [CurveLpTokenTotal, setCurveLpTokenTotal] = useState([]);
  const [CurveLpTokenContent, setCurveLpTokenContent] = useState([]);
  const [CurveLpTokenImage, setCurveLpTokenImage] = useState([]);
  let curveLpContractData = [];
  let totalCurveLpTokenValue = 0;

  useEffect(() => {
    if (CurveLpTokenData.length > 0) {
      try {
        var content = CurveLpTokenData.map((object) => (
          <Accordion
            style={{
              background: 'transparent',
              marginRight: '1px',
              color: 'white',
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
                  width: '110%',
                  //textAlign: 'left',
                  wordBreak: 'break-all',
                }}>
                {/*Get the Curve lp token Name */}
                <CurveLpImage lpToken={object[0]} /> ${object[0]}
                &nbsp; &nbsp;{parseFloat(object[3]).toFixed(2)} USD
              </React.Fragment>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ display: 'inline-block', width: '70%', fontSize: '13px' }}>
                {/*Get the Curve lp token price */}
                Value &nbsp;&nbsp;&nbsp;&nbsp;{parseFloat(object[3]).toFixed(2)}
                <br />
                LP Price &nbsp;&nbsp;&nbsp;&nbsp;{parseFloat((object[2] / 10 ** 18).toFixed(2))}
                <br />
                {/*Get the Curve lp token balance */}
                LP Balance &nbsp; {parseFloat(object[1] / 10 ** 18).toFixed(4)}
                <br />
                Liquidity &nbsp; {parseFloat(object[4].toFixed(2)).toLocaleString()}
                <br />
                Chain &nbsp;&nbsp;Ethereum
                <br />
                Protocol &nbsp;Curve
              </div>
            </AccordionDetails>
          </Accordion>
        ));
      } catch (err) {
        console.log('No Curve LP token data found');
      }
    }

    setCurveLpTokenContent(content);
    onCurveLptoken(CurveLpTokenData);
  }, [CurveLpTokenData]);

  //this function is used to get Curve lp token value for the give user address
  useEffect(() => {
    let totalCurveLpTokenValue = 0;
    let curveLpDataPoint = [];
    let object = {};
    let tokenNames = [];
    let tokenImageUrl = [];

    async function fetchCurvePoolData() {
      try {
        const response = await fetch(
          `https://api.ethplorer.io/getAddressInfo/${accountAddress}?apiKey=EK-qSPda-W9rX7yJ-UY93y`
        );

        const data = await response.json();

        for (let i = 0; i < data.tokens.length; i++) {
          const curveLpData = data.tokens[i];
          const tokenAddress = curveLpData.tokenInfo.address.toUpperCase();
          if (CuveLpTokenList.indexOf(tokenAddress) != -1) {
            curveLpDataPoint[i] = await getCurveLpData(accountAddress, tokenAddress);
            totalCurveLpTokenValue += curveLpDataPoint[i][3];
            curveLpContractData.push(curveLpDataPoint[i]);
          }
        } //end of for loop
      } catch (err) {
        console.log('No curve lp token holding for this user', accountAddress);
      }
      setCurveLpTokenTotal(parseFloat(totalCurveLpTokenValue).toFixed(2));
      setCurveLpTokenData(curveLpContractData);
    } //end of function

    fetchCurvePoolData();
  }, [accountAddress]);

  return (
    <React.Fragment>
      <div
        style={{
          fontSize: '12px',
          marginRight: '15px',

          display: CurveLpTokenData.length > 0 ? '' : 'none',
        }}>
        <img
          src={curveLogo}
          style={{
            height: '30px',
            marginTop: '',
            marginLeft: '15px',
          }}
          alt=""
        />
        &nbsp;&nbsp;Curve Lp token --- {CurveLpTokenTotal} USD
        {CurveLpTokenContent}
      </div>
      <br />
    </React.Fragment>
  );
}
