import React, { useEffect, useState } from 'react';
import axios from 'axios';
import addresses from '../../contractAddresses';
//import Addresses from '../../contractAddresses';
import SushiSwapLogo from '../../assets/icons/Sushiswap.webp';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../constants/actionTypes';
import YearnLogo from '../../assets/icons/yearnLogo.png';

export default function YearnFinance({ accountAddress, onYearnTokenValue }) {
  const [YearnContent, setYearnContent] = useState([]);

  const YearnData = useSelector((state) => state.yearnFinance.yearnFinanceData);
  const YearnTotalValue = useSelector((state) => state.yearnFinance.yearnFinanceTotal);

  const dispatch = useDispatch();

  const yearnAccountAddress = { accountAddress: accountAddress };
  useEffect(() => {
    const getYearnUserData = async () => {
      try {
        dispatch({
          type: actionTypes.SET_YFI_TOKEN_DATA,
          payload: yearnAccountAddress,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getYearnUserData();
    onYearnTokenValue(YearnTotalValue);
  }, [accountAddress]);

  //use below process to fetch slp token data to intergrate in UI
  useEffect(() => {
    if (YearnData.length > 0) {
      try {
        var content = YearnData.map((object) => (
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
                    src={object.tokenImageUrl}
                    alt=""
                  />
                </React.Fragment>
                {object.tokenName}&nbsp;
                {parseFloat(object.tokenValue).toLocaleString()} USD
              </React.Fragment>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ display: 'inline-block', width: '70%', fontSize: '12px' }}>
                Token name &nbsp;&nbsp; {object.tokenName}
                <br />
                Balance &nbsp; {parseFloat(object.tokenBalance).toFixed(2)}
                <br />
                Price &nbsp;&nbsp;&nbsp;&nbsp;${object.tokenPrice}
                <br />
                Value &nbsp;&nbsp;&nbsp;&nbsp;$
                {parseFloat(object.tokenValue).toLocaleString()}
                <br />
                APY &nbsp;&nbsp;&nbsp;&nbsp;
                {parseFloat(object.apy).toLocaleString()}%
                <br />
                Liquidity &nbsp;&nbsp;&nbsp;&nbsp;$
                {parseFloat(object.liquidity).toLocaleString()}
                <br />
                Chain &nbsp;&nbsp;&nbsp;&nbsp; {object.chain}
                <br />
                Protocol &nbsp;&nbsp; {object.protocol}
              </div>
            </AccordionDetails>
          </Accordion>
        ));
      } catch (err) {
        console.log('No Curve LP token data found');
      }
    }
    setYearnContent(content);
  }, [YearnData]);

  return (
    <React.Fragment>
      <div
        style={{
          fontSize: '15px',
          marginRight: '15px',
          display: YearnData.length > 0 ? '' : 'none',
        }}>
        <img
          src={YearnLogo}
          style={{
            height: '30px',
            marginTop: '',
            marginLeft: '15px',
            display: 'inline-block',
          }}
          alt=""
        />
        Yearn Finance -- {YearnTotalValue} USD
        {YearnContent}
      </div>
      <br />
    </React.Fragment>
  );
}
