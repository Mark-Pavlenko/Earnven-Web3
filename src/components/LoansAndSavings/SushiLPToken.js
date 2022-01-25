/** *********************************************************************************
Purpose : This component is used to get sushi LP token data for sushiv2 Protocol
Developed by : Prabhakaran.R
procedures/packages/components used in this process
1)Using the graph sushi api materChef to get users staked list of pools
    https://api.thegraph.com/subgraphs/name/sushiswap/master-chef

Version log:
----------------------------------------------------------------------------------
Version           Date                         Description
---------------------------------------------------------------------------------
1.0               24/Jan/2022                   Initial Development

*********************************************************************************** */

import React, { useEffect, useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../constants/actionTypes';
import SushiSwapLogo from '../../assets/icons/Sushiswap.webp';

export default function SushiLPToken({ accountAddress }) {
  const [SushiPoolsContent, setSushiPoolsContent] = useState([]); // Sushi v2
  //dispatch the action
  const dispatch = useDispatch();
  useEffect(() => {
    const getSushiSwapLPData = async () => {
      const sushiSwapObjects = { accountAddress: accountAddress };
      try {
        dispatch({
          type: actionTypes.SET_SUSHILP_DATA,
          payload: sushiSwapObjects,
        });
      } catch (err) {
        console.log('Dispatch error in sushu=iswapLP process', err.message);
      }
    };
    getSushiSwapLPData();
  }, [accountAddress]);

  // //get the data from saga
  const SushiPoolsData = useSelector((state) => state.sushiSwap.sushiSwapLPData);
  const SushiV2Total = useSelector((state) => state.sushiSwap.sushiSwapLPTotal);

  //implementing below logic for ETH2.0 staking
  useEffect(() => {
    if (SushiPoolsData.length > 0) {
      try {
        var content = SushiPoolsData.map((object) => (
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
                    src={object.token0Image}
                    alt=""
                  />
                  <img
                    style={{
                      height: '20px',
                      width: '20px',
                      display: 'inline-block',
                    }}
                    src={object.token1Image}
                    alt=""
                  />
                </React.Fragment>
                {object.token0Symbol}-{object.token1Symbol} --- &nbsp; $
                {parseFloat(object.value).toLocaleString()}
              </React.Fragment>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ display: 'inline-block', width: '70%', fontSize: '15px' }}>
                LP Token &nbsp;&nbsp;&nbsp;&nbsp; {object.token0Symbol}-{object.token1Symbol}
                <br />
                Balance &nbsp; {parseFloat(object.balance).toFixed(4)}
                <br />
                Price &nbsp;&nbsp;&nbsp;&nbsp;${object.price}
                <br />
                Value &nbsp;&nbsp;${parseFloat(object.value).toLocaleString()}
                <br />
                Liquidity &nbsp;&nbsp;&nbsp;&nbsp;${parseFloat(object.liquidity).toLocaleString()}
                <br />
                Volume &nbsp;&nbsp;&nbsp;&nbsp;${parseFloat(object.volume).toLocaleString()}
                <br />
                Chain &nbsp;&nbsp;&nbsp;&nbsp; {object.chain}
                <br />
                Protocol &nbsp;&nbsp; {object.protocol}
              </div>
            </AccordionDetails>
          </Accordion>
        ));
      } catch (err) {
        console.log('No sushiSwap LP token data found');
      }
    }

    setSushiPoolsContent(content);
  }, [SushiPoolsData]);

  return (
    <React.Fragment>
      <div
        style={{
          fontSize: '15px',
          marginRight: '15px',
          display: SushiPoolsData.length > 0 ? '' : 'none',
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
        SushiSwap -- ${SushiV2Total.toLocaleString()}
        {SushiPoolsContent}
      </div>
      <br />
    </React.Fragment>
  );
}
