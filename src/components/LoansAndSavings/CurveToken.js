import React, { useEffect, useState } from 'react';
import axios from 'axios';
import addresses from '../../contractAddresses';
import CurveLogo from '../../assets/icons/Curve.webp';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CurveTokenContractABI from '../../abi/CurveTokenContract.json';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../constants/actionTypes';

export default function CurveToken({ accountAddress }) {
  const [CurveTokenContent, setCurveTokenContent] = useState([]); //cvx data content

  const { account, activate, active, chainId, connector, deactivate, error, provider, setError } =
    useWeb3React();

  async function getWeb3() {
    const provider = await connector.getProvider();
    const web3 = await new Web3(provider);
    return web3;
  }

  const dispatch = useDispatch();

  //------Curve.Finanace Token data process-----------------//
  //Logic for Curve process
  //below function to get Curve finanace
  let CurveTokenDataPoint = [];
  CurveTokenDataPoint = useSelector((state) => state.curveToken.curveTokenData);
  const CurveTokenTotal = useSelector((state) => state.curveToken.curveTokenTotal);

  useEffect(() => {
    const getCurveTokenData = async () => {
      const web3 = await getWeb3();

      const curveTokenAttributes = { accountAddress: accountAddress, web3: web3 };

      try {
        dispatch({
          type: actionTypes.SET_CRV_TOKEN_DATA,
          payload: curveTokenAttributes,
        });
      } catch (error) {
        console.log('Curve Token error in dispatch', error.message);
      }
    };
    getCurveTokenData();
  }, [accountAddress]);
  //implementing below logic for ETH2.0 staking
  useEffect(() => {
    if (CurveTokenDataPoint.length > 0) {
      try {
        var content = CurveTokenDataPoint.map((object) => (
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
                    src={object.cvxTokenImageUrl}
                    alt=""
                  />
                </React.Fragment>
                CRV &nbsp; ${parseFloat(object.cvxTokenValue).toLocaleString()}
              </React.Fragment>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ display: 'inline-block', width: '70%', fontSize: '15px' }}>
                Token &nbsp;&nbsp; CVX
                <br />
                Balance &nbsp; {parseFloat(object.cvxTokenBalanceValue).toLocaleString()}
                <br />
                Price &nbsp;&nbsp;&nbsp;&nbsp;${parseFloat(object.cvxTokenPrice).toFixed(2)}
                <br />
                Value &nbsp;&nbsp;${parseFloat(object.cvxTokenValue).toFixed(2).toLocaleString()}
                <br />
                Chain &nbsp;&nbsp;&nbsp;&nbsp; {object.cvxTokenChain}
                <br />
                Protocol &nbsp;&nbsp; {object.cvxTokenProtocol}
              </div>
            </AccordionDetails>
          </Accordion>
        ));
      } catch (err) {
        console.log('No Curve token data found');
      }
    }

    setCurveTokenContent(content);
  }, [CurveTokenDataPoint]);

  return (
    <React.Fragment>
      <div
        style={{
          fontSize: '15px',
          marginRight: '15px',
          display: CurveTokenDataPoint.length > 0 ? '' : 'none',
        }}>
        <img
          src={CurveLogo}
          s
          style={{
            height: '30px',
            marginTop: '',
            marginLeft: '15px',
            display: 'inline-block',
          }}
          alt=""
        />
        Curve -- ${CurveTokenTotal} USD
        {CurveTokenContent}
      </div>
      <br />
    </React.Fragment>
  );
}
