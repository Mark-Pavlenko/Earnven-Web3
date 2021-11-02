/**************************************************************************************************
Purpose : This component is used to get CurveLpToken value for a given user
Developed by : Prabhakaran.R
Version log:
---------------------------------------------------------------------------------------------------
Version      Date                Description                                    Developed/Fixed 
----------------------------------------------------------------------------------------------------
1.0         28/Oct/2021          Initial Development                             Prabhakaran.R

**************************************************************************************************/
import React, { useEffect, useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import CuveLpTokenList from '../../contractAddress/CurveLpTokenAddressList';
import Web3 from 'web3';
import axios from 'axios';
import getCurveLpData from './getCurveLpData';
import curveLogo from '../../assets/icons/curveLogo.png';

export default function CurveLpToken({ accountAddress, onCurveLptoken }) {
  const [CurveLpTokenData, setCurveLpTokenData] = useState([]);
  const [CurveLpTokenTotal, setCurveLpTokenTotal] = useState([]);
  const [CurveLpTokenContent, setCurveLpTokenContent] = useState([]);
  let curveLpContractData = [];
  let totalCurveLpTokenValue = 0;

  //use below function to fetch the received and stored data from the above function
  //to display in the UI
  //console.log(" I am inside the data map fetching",CurveLpTokenData )

  useEffect(() => {
    if (CurveLpTokenData.length > 0) {
      try {
        var content = CurveLpTokenData.map((object) => (
          <Tooltip>
            <div style={{ width: '90%', marginTop: '12px', marginLeft: '30px' }}>
              <div
                style={{
                  display: 'inline-block',
                  width: '45%',
                  textAlign: 'left',
                  wordBreak: 'break-all',
                }}>
                {/*Get the Curve lp token Name */}${object[0]}
              </div>

              <div style={{ display: 'inline-block', width: '15%' }}></div>

              <div style={{ display: 'inline-block', width: '40%', fontSize: '13px' }}>
                {/*Get the Curve lp token value */}
                {parseFloat(object[3]).toFixed(2)} USD
              </div>

              <br />
            </div>
          </Tooltip>
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
    //const CuveLpTokenAddressList = CuveLpTokenList.toUpperCase();

    let totalCurveLpTokenValue = 0;
    let curveLpDataPoint = [];
    let object = {};

    async function fetchCurvePoolData() {
      console.log('Inside the fetch process to fetch curve lp data from api');
      try {
        const response = await fetch(
          `https://api.ethplorer.io/getAddressInfo/${accountAddress}?apiKey=EK-qSPda-W9rX7yJ-UY93y`
        );

        const data = await response.json();

        for (let i = 0; i < data.tokens.length; i++) {
          const curveLpData = data.tokens[i];
          const tokenAddress = curveLpData.tokenInfo.address.toUpperCase();
          //console.log("Token address",tokenAddress)
          if (CuveLpTokenList.indexOf(tokenAddress) != -1) {
            console.log('Filtered Curve LP token', tokenAddress);
            curveLpDataPoint[i] = await getCurveLpData(accountAddress, tokenAddress);
            //object.tokenName = curveLpDataPoint[i][0]
            // object.tokenValue = curveLpDataPoint[i][3]

            //console.log('Curve lp data from array', object.tokenName)
            //console.log('Curve lp data from array', object.tokenValue)
            totalCurveLpTokenValue += curveLpDataPoint[i][3];
            curveLpContractData.push(curveLpDataPoint[i]);
          }
        } //end of for loop
      } catch (err) {
        console.log('No curve lp token holding for this user', accountAddress);
      }
      console.log('Curve lp token total value', totalCurveLpTokenValue);
      console.log('Curve lp token data from object', curveLpContractData);
      setCurveLpTokenTotal(parseFloat(totalCurveLpTokenValue).toFixed(2));
      setCurveLpTokenData(curveLpContractData);
    } //end of function

    fetchCurvePoolData();
  }, [accountAddress]);

  // return (
  //   <div>
  //     testing
  //     </div>
  // )
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
