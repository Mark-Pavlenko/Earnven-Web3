import React, { useEffect, useState } from 'react';
import CurveLogo from '../../assets/icons/Curve.webp';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import actionTypes from '../../constants/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import CurveLpImage from './CurveLpImage';

export default function CurveFarming({ accountAddress }) {
  const [CrvStakingTokenContent, setCrvStakingTokenContent] = useState([]); //cvx data content

  const { account, activate, active, chainId, connector, deactivate, error, provider, setError } =
    useWeb3React();
  async function getWeb3() {
    const provider = await connector.getProvider();
    const web3 = await new Web3(provider);
    return web3;
  }

  //Logic for yToken Curve Staking and Claimable process
  //below function to get Curve Staking data of Curve finanace
  const CrvStakingTokenData = useSelector((state) => state.curveStaking.curveStakingData);
  const CrvStakingTokenTotal = useSelector((state) => state.curveStaking.curveStakingTotal);
  // console.log('TestCrvFarming from main page');
  // console.log('TestCrvFarming CrvStakingTokenData', CrvStakingTokenData);
  //use dipatch hook to perform the action..
  const dispatch = useDispatch();
  useEffect(() => {
    const getCurveStakingData = async () => {
      const web3 = await getWeb3();

      const curveStakingAttributes = { accountAddress: accountAddress, web3: web3 };
      try {
        dispatch({
          type: actionTypes.SET_CRV_STKCLM_DATA,
          payload: curveStakingAttributes,
        });
      } catch (error) {
        console.log('Curve Staking process error', error.message);
      }
    };
    getCurveStakingData();
  }, [accountAddress]);

  //Below function is used to fetch the curve staking data from the state and design to render them
  useEffect(() => {
    if (CrvStakingTokenData.length > 0) {
      try {
        var content = CrvStakingTokenData.map((object) => (
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
                <CurveLpImage lpToken={object.crvStakeTokenName} /> {object.crvStakeTokenName}
                &nbsp; &nbsp;{parseFloat(object.crvStakeTokenValue.toFixed(2)).toLocaleString()} USD
              </React.Fragment>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ display: 'inline-block', width: '70%', fontSize: '13px' }}>
                Balance &nbsp;
                {parseFloat(object.crvStakeTokenBalanceUSD.toFixed(2)).toLocaleString()}
                <br />
                Price &nbsp;&nbsp;&nbsp;&nbsp;${object.crvStakeTokenPrice}
                <br />
                Value &nbsp;&nbsp;&nbsp;&nbsp;$
                {parseFloat(object.crvStakeTokenValue.toFixed(2)).toLocaleString()}
                <br />
                Chain &nbsp;&nbsp;Ethereum
                <br />
                Protocol &nbsp; Curve
                <br />
                Claimable &nbsp;&nbsp;{object.crvLiquidityGaugeClaimable}
                &nbsp;&nbsp;{object.crvLiquidityGaugeClaimable > 0 ? <br /> : ''}
                &nbsp;&nbsp;{object.crvLiquidityGaugeRewardClaimable}
                <br />
                &nbsp;&nbsp;{object.crvLiquidityGaugeV2Claimable}
                <br />
                &nbsp;&nbsp;{object.crvLiquidityGaugeV2RewardClaim}
                <br />
                &nbsp;&nbsp;{object.crvLiquidityGaugeV3Claimable}
                <br />
                &nbsp;&nbsp;{object.crvLiquidityGaugeV3RewardClaim}
              </div>
            </AccordionDetails>
          </Accordion>
        ));
      } catch (err) {
        console.log('No Curve staking token data found');
      }
    }

    setCrvStakingTokenContent(content);
  }, [CrvStakingTokenData]);

  return (
    <React.Fragment>
      <div
        style={{
          fontSize: '15px',
          marginRight: '15px',
          display: CrvStakingTokenData.length > 0 ? '' : 'none',
        }}>
        <img
          src={CurveLogo}
          style={{
            height: '30px',
            marginTop: '',
            marginLeft: '15px',
            display: 'inline-block',
          }}
          alt=""
        />
        Curve Staking-- ${CrvStakingTokenTotal} USD
        {CrvStakingTokenContent}
      </div>
      <br />
    </React.Fragment>
  );
}
