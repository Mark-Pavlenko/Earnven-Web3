/**************************************************************************************************
Purpose : This component is used to get CurveLpToken value for a given user
Developed by : Prabhakaran.R
Version log:
---------------------------------------------------------------------------------------------------
Version      Date                Description                                    Developed/Fixed 
----------------------------------------------------------------------------------------------------
1.0         28/Oct/2021          Initial Development                             Prabhakaran.R
1.1         17/Nov/2021          Features add to bring additonal field           Prabhakaran.R  
1.2         12/Dec/2021          implement web3 and code simplify/performance    Prabhakaran.R  
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
import curveLogo from '../../assets/icons/curveLogo.png';
import CurveLpImage from './CurveLpImage';
import Curve3CrvPoolABI from '../../abi/CurveLpContracts/Curve3CrvPool.json';
import CurvePoolRegistryABI from '../../abi/CurveLpContracts/CurveRegistry.json';
import CurvePoolRegAddress from '../../contractAddresses';
import getCoingeckoData from '../../utils/getCoingeckoAPIData.js';
import { useWeb3React } from '@web3-react/core';
import Investment from '../common/investment/investment';

export default function CurveLpToken({ accountAddress, onCurveLptoken }) {
  const [CurveLpTokenData, setCurveLpTokenData] = useState([]);
  const [CurveLpTokenTotal, setCurveLpTokenTotal] = useState([]);
  const [CurveLpTokenContent, setCurveLpTokenContent] = useState([]);
  //get useWeb3React hook
  const { account, activate, active, chainId, connector, deactivate, error, provider, setError } =
    useWeb3React();

  //logic implementing for web3 provider connection using web3 React hook
  async function getWeb3() {
    const provider = await connector.getProvider();
    const web3 = await new Web3(provider);
    return web3;
  }

  //to get virtual price of the pool
  const fetchCurveLpTokenVirtualPrice = async (contractAddress) => {
    //get the web3 provider instance
    const web3 = await getWeb3();

    const CurvePoolRegistryContract = new web3.eth.Contract(
      CurvePoolRegistryABI,
      CurvePoolRegAddress.CuvePoolRegistry
    );
    let poolVirtualPrice = await CurvePoolRegistryContract.methods
      .get_virtual_price_from_lp_token(contractAddress.toLowerCase())
      .call();
    return poolVirtualPrice;
  };

  const getCurveLpData = async (accountAddress, contractAddress) => {
    //get the web3 provider instance
    const web3 = await getWeb3();

    const Curve3CrvPoolContract = new web3.eth.Contract(Curve3CrvPoolABI, contractAddress);
    let Curve3CrvBalance = await Curve3CrvPoolContract.methods.balanceOf(accountAddress).call();
    let Curve3CrvName = await Curve3CrvPoolContract.methods.name().call();
    let CurveLpTokenVirtualPrice = await fetchCurveLpTokenVirtualPrice(contractAddress);
    let curveLpTokenTotal = await Curve3CrvPoolContract.methods.totalSupply().call();
    let curveTokenSymbol = await Curve3CrvPoolContract.methods.symbol().call();

    return {
      curveLpTokenPrice: CurveLpTokenVirtualPrice, // pool virtual price
      curveLpTokenBalance: Curve3CrvBalance, //token balance of Lp for the given user
      curveLpTokenName: Curve3CrvName, // token name
      curveLpTokenSymbol: curveTokenSymbol, //token symbol
      curveLpTokenLiquidity: curveLpTokenTotal, //pool Liquidity
    };
  };

  //this function is used to get Curve lp token value for the give user address
  useEffect(() => {
    let curveLpDataPoint = [];
    let cuveLpTokenName;
    let tokenPrice = 0;
    let staking = [];
    let curveLpTokenTotalValue = 0;

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
            let object = {};
            curveLpDataPoint = await getCurveLpData(accountAddress, tokenAddress);
            cuveLpTokenName = curveLpDataPoint.curveLpTokenName.replace('Curve.fi ', '');
            //get the token market usd price from coingecko API
            const tokenData = await getCoingeckoData(tokenAddress, cuveLpTokenName);
            if (tokenData) {
              //assign the receiving token price into local variable
              tokenPrice = await tokenData.data.market_data.current_price.usd;
            }
            //if tokenPrice is not get from coingecko then use the lptoken virtual price
            if (tokenPrice == 0) {
              tokenPrice = curveLpDataPoint.curveLpTokenPrice;
            }
            object.curveLpTokenName = cuveLpTokenName;
            object.cuveLpTokenBalance = curveLpDataPoint.curveLpTokenBalance / 10 ** 18;
            object.curveLpTokenValue =
              (curveLpDataPoint.curveLpTokenBalance / 10 ** 18) * tokenPrice;
            object.curveLpTokenPrice = tokenPrice;
            object.curveLpTokenLiquidity =
              (curveLpDataPoint.curveLpTokenLiquidity / 10 ** 18) * tokenPrice;
            object.curveLpTokenSymbol = curveLpDataPoint.curveLpTokenSymbol;
            curveLpTokenTotalValue += object.curveLpTokenValue;
            staking.push(object);
          }
          //rest the value
          tokenPrice = 0;
        } //end of for loop
        setCurveLpTokenTotal(parseFloat(curveLpTokenTotalValue).toFixed(2));
        setCurveLpTokenData(staking);
        //keep this console logs to check the data point validation
        console.log('Curve lp token from dataset', staking);
        staking = [];
      } catch (err) {
        console.log('No curve lp token holding for this user', accountAddress);
      }
    } //end of function

    fetchCurvePoolData();
  }, [accountAddress]);

  useEffect(() => {
    if (CurveLpTokenData.length > 0) {
      try {
        var content = CurveLpTokenData.map((object) => {
          console.log('CurveLpTokenData', object);
          return (
            <>
              <Investment protocol={object} />
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
                    {/*Get the Curve lp token Name */}
                    <CurveLpImage lpToken={object.curveLpTokenName} /> {object.curveLpTokenName}
                    &nbsp; &nbsp;{parseFloat(
                      object.curveLpTokenValue.toFixed(2)
                    ).toLocaleString()}{' '}
                    USD
                  </React.Fragment>
                </AccordionSummary>
                <AccordionDetails>
                  <div style={{ display: 'inline-block', width: '70%', fontSize: '13px' }}>
                    Value &nbsp;&nbsp;&nbsp;&nbsp;$
                    {parseFloat(object.curveLpTokenValue.toFixed(2)).toLocaleString()}
                    <br />
                    Price &nbsp;&nbsp;&nbsp;&nbsp;${parseFloat(object.curveLpTokenPrice.toFixed(4))}
                    <br />
                    Balance &nbsp;{' '}
                    {parseFloat(object.cuveLpTokenBalance.toFixed(2)).toLocaleString()}
                    <br />
                    Liquidity &nbsp; $
                    {parseFloat(object.curveLpTokenLiquidity.toFixed(2)).toLocaleString()}
                    <br />
                    Chain &nbsp;&nbsp;Ethereum
                    <br />
                    Protocol &nbsp; {object.curveLpTokenSymbol}
                  </div>
                </AccordionDetails>
              </Accordion>
            </>
          );
        });
      } catch (err) {
        console.log('No Curve LP token data found');
      }
    }

    setCurveLpTokenContent(content);
    onCurveLptoken(CurveLpTokenData);
  }, [CurveLpTokenData, accountAddress]);

  return (
    <React.Fragment>
      <div
        style={{
          fontSize: '13px',
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
        &nbsp;&nbsp;Curve Lp token --- {parseFloat(CurveLpTokenTotal).toLocaleString()} USD
        {CurveLpTokenContent}
      </div>
      <br />
    </React.Fragment>
  );
}
