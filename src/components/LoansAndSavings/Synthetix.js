/**************************************************************************************************
Purpose : This component is used to get Synthetix tokens and SNX collateral value for a given user
Developed by : Prabhakaran.R
Version log:
---------------------------------------------------------------------------------------------------
Version      Date                Description                                    Developed/Fixed 
----------------------------------------------------------------------------------------------------
1.0         17/Dec/2021          Initial Development                             Prabhakaran.R

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
import SnxCollateralABI from '../../abi/SynthetixSNXContract.json';
import SnxTokenContractABI from '../../abi/SynthetixTokenContract.json';
import SnxTokenAddressList from '../../contractAddress/SnxTokenAddress';
import Addresses from '../../contractAddresses';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
export default function Synthetix({ accountAddress, onSynthetixTokenValue }) {
  const [SnxCollateralData, setSnxCollateralData] = useState([]);
  const [SnxTokenData, setSnxTokenData] = useState([]);
  const [SnxTokenTotalValue, setSnxTokenTotalValue] = useState(0);
  const [SnxTokenContent, setSnxTokenContent] = useState([]);
  const [SnxCollateralContent, setSnxCollateralContent] = useState([]);
  const [SnxCollateralTotal, setSnxCollateralTotal] = useState(0);

  //get useWeb3React hook
  const { account, activate, active, chainId, connector, deactivate, error, provider, setError } =
    useWeb3React();

  //logic implementing for web3 provider connection using web3 React hook
  async function getWeb3() {
    const provider = active ? await connector.getProvider() : ethers.getDefaultProvider();
    const web3 = await new Web3(provider);
    return web3;
  }

  //get the collateral value in SNX token for the given account address and for SNX contract
  const getSynthetixCollateralData = async (accountAddress) => {
    //get the web3 provider instance
    const web3 = await getWeb3();

    const snxCollateralContract = new web3.eth.Contract(
      SnxCollateralABI,
      Addresses.snxTokenAddress
    );
    let snxCollateralBalance = await snxCollateralContract.methods
      .collateral(accountAddress)
      .call();
    let snxCollateralSymbol = await snxCollateralContract.methods.symbol().call();

    //assign the value into the array by all the corresponding value
    return {
      snxCollateralBalanceAmt: snxCollateralBalance,
      snxCollateralSymbolName: snxCollateralSymbol,
    };
  };

  //get the snxToken data for respective to the user
  const getSnxTokenData = async (accountAddress, contractAddress) => {
    //get the web3 provider instance
    const web3 = await getWeb3();

    //console.log('SNX - Token value ');
    const snxTokenContract = new web3.eth.Contract(SnxTokenContractABI, contractAddress);
    let snxTokenBalance = await snxTokenContract.methods.balanceOf(accountAddress).call();
    let snxTokenSymbol = await snxTokenContract.methods.symbol().call();

    //assign the value into the array by all the corresponding value
    return {
      snxTokenBalanceAmt: snxTokenBalance,
      snxTokenSymbol: snxTokenSymbol,
    };
  };

  //get the price logic for the SNX token to calculate for collateral amount
  //send SNX contract address to get the price of the SNX collateral.
  const getSnxPrice = async (snxContractAddress) => {
    const result = await axios.get(
      `https://api.coingecko.com/api/v3/coins/ethereum/contract/${snxContractAddress}`,
      {}
    );
    const snxImageUrl = result.data.image.thumb;
    const snxPrice = result.data.market_data.current_price.usd;

    return {
      snxPrice: snxPrice,
      snxImageUrl: snxImageUrl,
    };
  };

  //-------------------------------SNX Collateral-------------------------------------------------//
  //Collateral data points section
  //this function is used to get snx collateral value for the given user
  useEffect(() => {
    //let totalCurveLpTokenValue = 0;
    let snxCollateralData = [];
    let snxCollateralPriceData = [];
    let collateralData = [];
    let snxCollateralTotal = 0;

    async function fetchSynthetixCollateral() {
      let object = {};
      //call the below function to get the SNX collateral value
      snxCollateralData = await getSynthetixCollateralData(accountAddress);
      //send the Collateral contract address to get collateral balance value for the usr
      snxCollateralPriceData = await getSnxPrice('0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F');

      //get the token market usd price from coingecko API
      if (snxCollateralData.snxCollateralBalanceAmt) {
        object.snxCollateralBalance = snxCollateralData.snxCollateralBalanceAmt / 10 ** 18;
        object.snxCollateralPrice = snxCollateralPriceData.snxPrice;
        object.snxCollateralValue = object.snxCollateralBalance * object.snxCollateralPrice;
        object.snxCollateralSymbol = snxCollateralData.snxCollateralSymbolName;
        object.snxImageUrl = snxCollateralPriceData.snxImageUrl;
        snxCollateralTotal += object.snxCollateralValue;
      }

      collateralData.push(object);

      setSnxCollateralData(collateralData);
      setSnxCollateralTotal(parseFloat(snxCollateralTotal.toFixed(2)).toLocaleString());
      //need this log to varify the data ouput for now
      console.log('snx Collateral data', collateralData);

      collateralData = [];
    }
    fetchSynthetixCollateral();
  }, [accountAddress]);

  //Below process is used to implement the fetched SNX collateral value in UI
  useEffect(() => {
    if (SnxCollateralData.length > 0) {
      try {
        var content = SnxCollateralData.map((object) => (
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
                    src={object.snxImageUrl}
                    alt=""
                  />
                </React.Fragment>
                {object.snxCollateralSymbol}&nbsp;
                {parseFloat(object.snxCollateralValue.toFixed(2)).toLocaleString()} USD
              </React.Fragment>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ display: 'inline-block', width: '70%', fontSize: '15px' }}>
                SNX token &nbsp;&nbsp;&nbsp;&nbsp; {object.snxCollateralSymbol}
                <br />
                Balance &nbsp; {parseFloat(object.snxCollateralBalance.toFixed(2)).toLocaleString()}
                <br />
                Price &nbsp;&nbsp;&nbsp;&nbsp;${parseFloat(object.snxCollateralPrice.toFixed(4))}
                <br />
                Value &nbsp;&nbsp;&nbsp;&nbsp;$
                {parseFloat(object.snxCollateralValue.toFixed(2)).toLocaleString()}
                <br />
                Chain &nbsp;&nbsp;&nbsp;&nbsp; Ethereum
                <br />
                Protocol &nbsp;&nbsp; Synthetix
              </div>
            </AccordionDetails>
          </Accordion>
        ));
      } catch (err) {
        console.log('No Curve LP token data found');
      }
    }

    setSnxCollateralContent(content);
  }, [SnxCollateralData]);

  //-------------------------------SNX tokens-------------------------------------------------//
  //snxToken datapoints for list of tokens (sUSD, sEUR etc..)
  //call below function to get the snxToken Data repective with list of snxTokens for the given user
  useEffect(() => {
    //let totalCurveLpTokenValue = 0;
    let snxTokenDataPoint = [];
    let snxTokenPriceData = [];
    let snxDataSet = [];
    let svxTokenTotalValue = 0;

    async function fetchSynthetixData() {
      try {
        const response = await fetch(
          `https://api.ethplorer.io/getAddressInfo/${accountAddress}?apiKey=EK-qSPda-W9rX7yJ-UY93y`
        );

        const data = await response.json();

        for (let i = 0; i < data.tokens.length; i++) {
          const synthetixData = data.tokens[i];
          const tokenAddress = synthetixData.tokenInfo.address.toLowerCase();
          //console.log('TestXX, looking for the account', tokenAddress)
          if (SnxTokenAddressList.indexOf(tokenAddress) != -1) {
            let object = {};

            //use the below function to get the snxToken data points
            snxTokenDataPoint = await getSnxTokenData(accountAddress, tokenAddress);
            //send the Collateral contract address to get collateral balance value for the usr
            snxTokenPriceData = await getSnxPrice(tokenAddress);

            let valueCheck = [];
            valueCheck = parseFloat(snxTokenDataPoint.snxTokenBalanceAmt) / 10 ** 18;
            //check balanace value is returning exponentiation since some of the account is not
            //having valid data example the balance is returning value as '195' or '165'
            var e = parseInt(valueCheck.toString().split('e-')[1]);
            if (e > 0) {
              snxTokenDataPoint.snxTokenBalanceAmt = 0;
            }

            //get the token market usd price from coingecko API
            if (snxTokenDataPoint.snxTokenBalanceAmt) {
              try {
                object.snxTokenBalance =
                  parseFloat(snxTokenDataPoint.snxTokenBalanceAmt) / 10 ** 18;

                object.snxTokenPrice = snxTokenPriceData.snxPrice;
                object.snxTokenValue = object.snxTokenBalance * object.snxTokenPrice;
                object.snxTokenSymbol = snxTokenDataPoint.snxTokenSymbol;
                object.snxTokenImageUrl = snxTokenPriceData.snxImageUrl;
                svxTokenTotalValue += object.snxTokenValue;
                snxDataSet.push(object);
              } catch (err) {
                console.log('SNX Token', err.message);
              }
            }
          }
        } //end of for loop

        setSnxTokenData(snxDataSet);
        setSnxTokenTotalValue(svxTokenTotalValue);
        //need this log to varify the data output for now

        snxDataSet = [];
      } catch (err) {
        console.log('SNX Token - No curve lp token holding for this user', accountAddress);
      }
    } //end of function

    fetchSynthetixData();

    onSynthetixTokenValue(SnxTokenTotalValue);
  }, [accountAddress]);

  //Below process is used to implement the fetched SNX token in UI
  useEffect(() => {
    if (SnxTokenData.length > 0) {
      try {
        var content = SnxTokenData.map((object) => (
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
                    src={object.snxTokenImageUrl}
                    alt=""
                  />
                </React.Fragment>
                {object.snxTokenSymbol}&nbsp;
                {parseFloat(object.snxTokenValue.toFixed(2)).toLocaleString()} USD
              </React.Fragment>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ display: 'inline-block', width: '70%', fontSize: '15px' }}>
                SNX token &nbsp;&nbsp;&nbsp;&nbsp; {object.snxTokenSymbol}
                <br />
                Balance &nbsp; {parseFloat(object.snxTokenBalance.toFixed(2)).toLocaleString()}
                <br />
                Price &nbsp;&nbsp;&nbsp;&nbsp;${parseFloat(object.snxTokenPrice.toFixed(4))}
                <br />
                Value &nbsp;&nbsp;&nbsp;&nbsp;$
                {parseFloat(object.snxTokenValue.toFixed(2)).toLocaleString()}
                <br />
                Chain &nbsp;&nbsp;&nbsp;&nbsp; Ethereum
                <br />
                Protocol &nbsp;&nbsp; Sythentix
              </div>
            </AccordionDetails>
          </Accordion>
        ));
      } catch (err) {
        console.log('No Curve LP token data found');
      }
    }

    setSnxTokenContent(content);
  }, [SnxTokenData]);

  return (
    <React.Fragment>
      <div
        style={{
          fontSize: '15px',
          marginRight: '15px',

          display: (SnxTokenData.length || SnxCollateralData.length) > 0 ? '' : 'none',
        }}>
        <img
          src={
            parseFloat(SnxTokenTotalValue) > 0 || parseFloat(SnxCollateralTotal) > 0
              ? 'https://assets.coingecko.com/coins/images/3406/thumb/SNX.png?1598631139'
              : 'none'
          }
          style={{
            height: '30px',
            marginTop: '',
            marginLeft: '15px',
            display: 'inline-block',
          }}
          alt=""
        />
        {parseFloat(SnxTokenTotalValue) > 0 ? (
          <React.Fragment>
            Synthetix &nbsp;&nbsp; --- {SnxTokenTotalValue.toLocaleString()} USD
            {SnxTokenContent}
          </React.Fragment>
        ) : (
          ''
        )}
        {parseFloat(SnxCollateralTotal) > 0 ? (
          <React.Fragment>
            SNX Collateral &nbsp;--{SnxCollateralTotal} USD
            {SnxCollateralContent}
          </React.Fragment>
        ) : (
          ''
        )}
      </div>
      <br />
    </React.Fragment>
  );
}
