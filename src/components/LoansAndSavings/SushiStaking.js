import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Addresses from '../../contractAddresses';
import SushiSwapLogo from '../../assets/icons/Sushiswap.webp';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../constants/actionTypes';

export default function SushiStaking({ accountAddress }) {
  const [SLPTokenDataContent, setSLPTokenDataContent] = useState([]);
  const getEpoch = () => {
    const d = new Date();
    const day = d.getUTCDate();
    const month = d.getUTCMonth();
    const year = d.getUTCFullYear();
    const offset = new Date(year, month, day).getTimezoneOffset() * 60;
    const epoch = new Date(year, month, day).getTime() / 1000 - offset;
    return epoch;
  };
  //use useSelector hook to get the current state from store
  const SLPTokenData = useSelector((state) => state.sushiStaking.sushiStakeData);
  const SLPTokenTotalValue = useSelector((state) => state.sushiStaking.sushiStakeTotal);
  //then make dispatch/send an action
  const dispatch = useDispatch();
  //below function is used to get sushi staking balance from the subgraph
  console.log('SLPTokenData', SLPTokenData);
  useEffect(() => {
    const getSushiStakeData = async () => {
      const epocDate = await getEpoch();
      const sushiStakingObjects = { accountAddress: accountAddress, epocDate: epocDate };
      try {
        dispatch({
          type: actionTypes.GET_SLP_STAKE_DATA,
          payload: sushiStakingObjects,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getSushiStakeData();
  }, [accountAddress]);

  //use below process to fetch slp token data to intergrate in UI
  useEffect(() => {
    if (SLPTokenData.length > 0) {
      try {
        var content = SLPTokenData.map((object) => (
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
                    src={object.sushiLPToken0ImageUrl}
                    alt=""
                  />
                  <img
                    style={{
                      height: '20px',
                      width: '20px',
                      display: 'inline-block',
                    }}
                    src={object.sushiLPToken1ImageUrl}
                    alt=""
                  />
                </React.Fragment>
                {object.sushiLpTokenSymbol}&nbsp;
                {parseFloat(object.sushiLpTokenValue).toLocaleString()} USD
              </React.Fragment>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ display: 'inline-block', width: '70%', fontSize: '12px' }}>
                Staked token &nbsp;&nbsp; {object.sushiLpTokenSymbol}
                <br />
                Balance &nbsp; {parseFloat(object.sushiLpTokenBalance).toFixed(5)}
                <br />
                Price &nbsp;&nbsp;&nbsp;&nbsp;${object.sushiLpTokenPrice}
                <br />
                Value &nbsp;&nbsp;&nbsp;&nbsp;$
                {parseFloat(object.sushiLpTokenValue).toLocaleString()}
                <br />
                Volume &nbsp;&nbsp;&nbsp;&nbsp;$
                {parseFloat(object.sushiLpTokenVolume).toLocaleString()}
                <br />
                Liquidity &nbsp;&nbsp;&nbsp;&nbsp;$
                {parseFloat(object.sushiLpTokenLiquidity).toLocaleString()}
                <br />
                Chain &nbsp;&nbsp;&nbsp;&nbsp; {object.sushiLpProtocol}
                <br />
                Protocol &nbsp;&nbsp; {object.sushiLpChain}
              </div>
            </AccordionDetails>
          </Accordion>
        ));
      } catch (err) {
        console.log('No Curve LP token data found');
      }
    }
    setSLPTokenDataContent(content);
  }, [SLPTokenData]);

  return (
    <React.Fragment>
      <h1>Sushi</h1>
      <div
        style={{
          fontSize: '15px',
          marginRight: '15px',
          display: SLPTokenData.length > 0 ? '' : 'none',
        }}>
        <img
          src={SushiSwapLogo}
          style={{
            height: '30px',
            marginTop: '',
            marginLeft: '15px',
            display: 'inline-block',
          }}
          alt=""
        />
        Sushi staking -- {SLPTokenTotalValue.toLocaleString()} USD
        {SLPTokenDataContent}
      </div>
      <br />
    </React.Fragment>
  );
}
