import React, { useState, useEffect } from 'react';
import axios from 'axios';
import abi from '../../../abi/PickleAbi.json';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { ethers } from 'ethers';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../../constants/actionTypes';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Investment from '../../common/investment/investment';
const MstableSavings = ({ accountAddress }) => {
  const dispatch = useDispatch();
  const [TokenContent, setTokenContent] = useState(null);
  const [flag, setflag] = useState(0);
  useEffect(() => {
    fetchDara();
  }, [accountAddress]);
  async function fetchDara() {
    await axios.get(`https://api.mstable.org/pools`).then(async ({ data }) => {
      let apy = data.pools[1].averageApy;
      let totalStaked = data.pools[1].totalStakedUSD;
    });
  }
  async function fetchData(data) {
    if (data.length > 0) {
      for (let i = 0; i < data.tokens.length; i++) {
        if (
          data.tokens[i].tokenInfo.address.toUpperCase() ==
            '0x17d8cbb6bce8cee970a4027d1198f6700a7a6c24'.toUpperCase() ||
          data.tokens[i].tokenInfo.address.toUpperCase() ==
            '0x30647a72dc82d7fbb1123ea74716ab8a317eac19'.toUpperCase()
        ) {
          //   if (data.tokens[i].tokenInfo.website == 'https://mstable.org') {
          console.log('data.tokens[i].tokenInfo', data.tokens[i].tokenInfo);
          await axios
            .get(
              `https://api.coingecko.com/api/v3/coins/ethereum/contract/${data.tokens[i].tokenInfo.address}`
            )
            .then(async ({ data }) => {
              let currentprice = data.market_data.current_price.usd;
              let pickleIcon = data.image.small;
              console.log('image data', data.image.small);
            })
            .catch((err) => {
              console.log('error in fetching pickle staking', err);
            });
        }
      }
    }
    console.log('mstable responce saga', data);
  }
  const pickleDillArray = useSelector((state) => state.mStableSavings.mStableSavings);
  const pickleDillArray1 = useSelector((state) => state.ethExplorerApi.ethExplorerApi);

  useEffect(() => {
    if (pickleDillArray.length > 0) {
      try {
        var content = pickleDillArray.map((object) => (
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
  }, [pickleDillArray]);

  useEffect(() => {
    console.log('saga test mstable savings', pickleDillArray);
    if (pickleDillArray && pickleDillArray.length > 0) {
      console.log('insdide if mstable data check ikoko', pickleDillArray);
      setflag(1);
      // fetchData(pickleDillArray);
    }
  }, [pickleDillArray]);

  useEffect(() => {
    console.log('pickleDillArray1', pickleDillArray1);
    console.log(pickleDillArray1.length);
    if (pickleDillArray1.length == undefined) {
      console.log('pickleDillArray1 in if', pickleDillArray1);
      let arrayData = [];
      arrayData.push(pickleDillArray1);
      arrayData.push(accountAddress);
      try {
        dispatch({
          type: actionTypes.SET_MSTABLE_SAVINGS,
          payload: arrayData,
        });
      } catch (err) {
        console.log('error in dispatch mStable', err);
      }
    }
  }, [pickleDillArray1]);
  return (
    <div>
      {flag && (
        <div
          style={{
            display: pickleDillArray.length > 0 ? '' : 'none',
          }}>
          {pickleDillArray.map((object, index) => {
            return <Investment key={index} protocol={object} logoImage={object.tokenImage} />;
          })}
        </div>
      )}
    </div>
  );
};

export default MstableSavings;
