// import { ResponsiveLine } from '@nivo/line'
// eslint-disable-next-line
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import ShowMoreText from 'react-show-more-text';
import { MobileView, BrowserView } from 'react-device-detect';
import TransparentButton from '../TransparentButton/index';
import {
  // ChartDataTwentyFour,
  // ChartDataOneWeek,
  // ChartDataOneMonth,
  ChartAllData,
} from './ChartDataFetch/ChartDataFetch';
import Apexchart from './Apexchart';
import { Typography, Stack, Grid } from '@material-ui/core';
// import { AiFillTwitterCircle } from "react-icons/ai";
// import { FaTelegram } from "react-icons/fa";

import ExchangeMini from '../exchengeMini/exchange';

export const Chart = () => {
  const { tokenid } = useParams();
  const { address } = useParams();
  const [Price, setPrice] = useState(null);
  const [Selection, setSelection] = useState(null);
  const [tokenAddress, setTokenAddress] = useState('');
  // eslint-disable-next-line
  const [View, setView] = useState('Month View')

  // const [Token, setToken] = useState('aave')

  React.useEffect(() => {
    // console.log(tokenid)
    // console.log(tokenid)
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${tokenid}`, {}, {})
      .then(async (response) => {
        await setTokenAddress(response.data.contract_address);
        await setSelection(response.data);
      });
    setView('Month View');
    // console.log("heelo1")
    if (tokenid !== '' && tokenid !== null && tokenid !== undefined) {
      // console.log("heelo2")

      console.log(1, tokenid);
      ChartAllData(tokenid).then((res) => {
        setPrice(res);
        // console.log(Price)
      });
    } else {
      alert('Data Not Available For This Coin!');
    }
  }, [tokenid]);

  useEffect(() => {
    // console.log('lol',tokenAddress)
    let buyDetails = { tokens: 0, ether: 0, usd: 0 };
    let sellDetails = { tokens: 0, ether: 0, usd: 0 };
    let totalDetails = { tokens: 0, ether: 0, usd: 0 };
    let res2 = [];
    let res3 = 0;

    axios
      .get(
        `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${tokenAddress}&address=${address}&apikey=CISZAVU4237H8CFPFCFWEA25HHBI3QKB8W`
      )
      .then(async (response) => {
        var res1 = response.data.result;
        console.log('res1', res1);

        axios
          .get(
            `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&apikey=CISZAVU4237H8CFPFCFWEA25HHBI3QKB8W`
          )
          .then(async (response) => {
            res2 = response.data.result;
            console.log('res2', res2);

            for (var i = 0; i < res1.length; i++) {
              for (var j = 0; j < res2.length; j++) {
                if (res1[i].hash === res2[j].hash) {
                  console.log('halla');
                  if (res1[i].from === address) {
                    if (parseInt(res1[i].value) > 0 && parseInt(res2[j].value) > 0) {
                      sellDetails.tokens += parseInt(res1[i].value);
                      sellDetails.ether += parseInt(res2[j].value);
                    }
                  } else if (res1[i].to === address) {
                    if (parseInt(res1[i].value) > 0 && parseInt(res2[j].value) > 0) {
                      var d = new Date();
                      var day = d.getUTCDate();
                      var month = d.getUTCMonth();
                      let year = d.getUTCFullYear();

                      await axios
                        .get(
                          `https://api.coingecko.com/api/v3/coins/ethereum/history?date=${
                            day + '-' + month + '-' + year
                          }&localization=false`
                        )
                        .then(async (response) => {
                          res3 = response.data.market_data.current_price.usd;
                          console.log('res3', res3);
                        });

                      buyDetails.tokens += parseInt(res1[i].value);
                      buyDetails.ether += parseInt(res2[j].value);
                      buyDetails.usd += (parseInt(res2[j].value) / 10 ** 18) * parseFloat(res3);
                      console.log('buyDetails', buyDetails);
                    }
                  }
                }
              }
            }

            console.log('buyDetails', buyDetails);
            console.log('sellDetails', sellDetails);
          });
      });
  }, [tokenAddress]);

  function executeOnClick(isExpanded) {
    console.log(isExpanded);
  }

  let data;
  // to set coin price we get from coingecko api
  Price
    ? (data = [
        {
          id: 'japan',
          color: 'hsl(214, 70%, 50%)',
          data: Price,
        },
      ])
    : (data = [
        {
          id: 'japan',
          color: 'hsl(72, 70%, 50%)',
          data: [
            {
              x: 'plane',
              y: 97,
            },
            {
              x: 'helicopter',
              y: 230,
            },
            {
              x: 'boat',
              y: 45,
            },
            {
              x: 'train',
              y: 174,
            },
            {
              x: 'subway',
              y: 203,
            },
            {
              x: 'bus',
              y: 158,
            },
            {
              x: 'car',
              y: 152,
            },
            {
              x: 'moto',
              y: 227,
            },
            {
              x: 'bicycle',
              y: 120,
            },
            {
              x: 'horse',
              y: 51,
            },
            {
              x: 'skateboard',
              y: 176,
            },
            {
              x: 'others',
              y: 290,
            },
          ],
        },
      ]);
  return (
    <Grid container>
      <Grid item md={8}>
        <div>
          {Selection ? (
            <div style={{ width: '100%', margin: 'auto', marginLeft: '27px' }}>
              <div style={{ textAlign: 'left', marginTop: '20px' }}>
                <Stack direction="row">
                  <img
                    alt=""
                    style={{ marginTop: '5px', height: '40px', width: '40px' }}
                    src={Selection.image ? Selection.image.small : ''}
                  />
                  <Typography variant="body2" sx={{ mt: 2, ml: 1, color: '#737373' }}>
                    {Selection.symbol ? Selection.symbol.toUpperCase() : ''}
                  </Typography>
                </Stack>
                <div>
                  <Typography variant="h3" sx={{ mt: 1.5 }}>
                    {Selection.name ? Selection.name.toUpperCase() : ''}
                  </Typography>
                </div>
                <Typography variant="body2" sx={{ color: '#00FFE7' }}>
                  <span style={{ fontSize: '30px' }}>
                    {Selection.market_data ? '$' + Selection.market_data.current_price.usd : ''}
                  </span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {Selection.market_data
                    ? parseFloat(Selection.market_data.price_change_percentage_24h).toFixed(2) + '%'
                    : ''}
                </Typography>
              </div>

              {Price && <Apexchart data={Price} />}
              <br />

              <hr
                style={{ marginTop: '8px', borderTop: '0px ', borderBottom: '1px solid #737373' }}
              />
              <div style={{ color: 'white', textAlign: 'left', marginTop: '15px' }}>STATS</div>
              <div>
                <BrowserView>
                  <div
                    style={{
                      width: '25%',
                      height: '125px',
                      display: 'inline-block',
                      color: 'white',
                      marginTop: '8px',
                    }}>
                    1 DAY
                    <br />
                    <br />
                    <font color="#00FFE7">
                      {Selection.market_data
                        ? parseFloat(Selection.market_data.price_change_percentage_24h).toFixed(2) +
                          '%'
                        : ''}
                    </font>
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>

                  <div
                    style={{
                      width: '25%',
                      height: '125px',
                      display: 'inline-block',
                      color: 'white',
                    }}>
                    1 MONTH
                    <br />
                    <br />
                    <font color="#00FFE7">
                      {Selection.market_data
                        ? parseFloat(Selection.market_data.price_change_percentage_30d).toFixed(2) +
                          '%'
                        : ''}
                    </font>
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>

                  <div
                    style={{
                      width: '25%',
                      height: '125px',
                      display: 'inline-block',
                      color: 'white',
                    }}>
                    2 MONTHS
                    <br />
                    <br />
                    <font color="#00FFE7">
                      {Selection.market_data
                        ? parseFloat(Selection.market_data.price_change_percentage_60d).toFixed(2) +
                          '%'
                        : ''}
                    </font>
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>

                  <div
                    style={{
                      width: '25%',
                      height: '125px',
                      display: 'inline-block',
                      color: 'white',
                    }}>
                    1 YEAR
                    <br />
                    <br />
                    <font color="#00FFE7">
                      {Selection.market_data
                        ? parseFloat(Selection.market_data.price_change_percentage_1y).toFixed(2) +
                          '%'
                        : ''}
                    </font>
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>

                  <br />

                  <div
                    style={{
                      width: '25%',
                      height: '125px',
                      display: 'inline-block',
                      color: 'white',
                    }}>
                    MARKET CAP
                    <br />
                    <br />
                    <font color="#00FFE7">
                      {Selection.market_data ? `$${Selection.market_data.market_cap.usd}` : ''}
                    </font>
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>

                  <div
                    style={{
                      width: '25%',
                      height: '125px',
                      display: 'inline-block',
                      color: 'white',
                    }}>
                    24H HIGH
                    <br />
                    <br />
                    <font color="#00FFE7">
                      {Selection.market_data ? `$${Selection.market_data.high_24h.usd}` : ''}
                    </font>
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>

                  <div
                    style={{
                      width: '25%',
                      height: '125px',
                      display: 'inline-block',
                      color: 'white',
                    }}>
                    24H LOW
                    <br />
                    <br />
                    <font color="#00FFE7">
                      {Selection.market_data ? `$${Selection.market_data.low_24h.usd}` : ''}
                    </font>
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>

                  <div
                    style={{
                      width: '25%',
                      height: '125px',
                      display: 'inline-block',
                      color: 'white',
                    }}>
                    COINGECKO SCORE
                    <br />
                    <br />
                    <font color="#00FFE7">
                      {Selection.coingecko_score ? Selection.coingecko_score : ''}
                    </font>
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>
                </BrowserView>
                <MobileView>
                  <div
                    style={{
                      width: '50%',
                      height: '125px',
                      display: 'inline-block',
                      color: 'white',
                    }}>
                    1 DAY
                    <br />
                    <br />
                    <font color="#00FFE7">
                      {Selection.market_data
                        ? parseFloat(Selection.market_data.price_change_percentage_24h).toFixed(2) +
                          '%'
                        : ''}
                    </font>
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>

                  <div
                    style={{
                      width: '50%',
                      height: '125px',
                      display: 'inline-block',
                      color: 'white',
                    }}>
                    1 MONTH
                    <br />
                    <br />
                    <font color="#00FFE7">
                      {Selection.market_data
                        ? parseFloat(Selection.market_data.price_change_percentage_30d).toFixed(2) +
                          '%'
                        : ''}
                    </font>
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>
                  <br />

                  <div
                    style={{
                      width: '50%',
                      height: '125px',
                      display: 'inline-block',
                      color: 'white',
                    }}>
                    2 MONTHS
                    <br />
                    <br />
                    <font color="#00FFE7">
                      {Selection.market_data
                        ? parseFloat(Selection.market_data.price_change_percentage_60d).toFixed(2) +
                          '%'
                        : ''}
                    </font>
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>

                  <div
                    style={{
                      width: '50%',
                      height: '125px',
                      display: 'inline-block',
                      color: 'white',
                    }}>
                    1 YEAR
                    <br />
                    <br />
                    <font color="#00FFE7">
                      {Selection.market_data
                        ? parseFloat(Selection.market_data.price_change_percentage_1y).toFixed(2) +
                          '%'
                        : ''}
                    </font>
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>

                  <br />

                  <div
                    style={{
                      width: '50%',
                      height: '125px',
                      display: 'inline-block',
                      color: 'white',
                    }}>
                    MARKET CAP
                    <br />
                    <br />
                    <font color="#00FFE7">
                      {Selection.market_data ? `$${Selection.market_data.market_cap.usd}` : ''}
                    </font>
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>

                  <div
                    style={{
                      width: '50%',
                      height: '125px',
                      display: 'inline-block',
                      color: 'white',
                    }}>
                    24H HIGH
                    <br />
                    <br />
                    <font color="#00FFE7">
                      {Selection.market_data ? `$${Selection.market_data.high_24h.usd}` : ''}
                    </font>
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>

                  <br />

                  <div
                    style={{
                      width: '50%',
                      height: '125px',
                      display: 'inline-block',
                      color: 'white',
                    }}>
                    24H LOW
                    <br />
                    <br />
                    <font color="#00FFE7">
                      {Selection.market_data ? `$${Selection.market_data.low_24h.usd}` : ''}
                    </font>
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>

                  <div
                    style={{
                      width: '50%',
                      height: '125px',
                      display: 'inline-block',
                      color: 'white',
                    }}>
                    COINGECKO SCORE
                    <br />
                    <br />
                    <font color="#00FFE7">
                      {Selection.coingecko_score ? Selection.coingecko_score : ''}
                    </font>
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>
                </MobileView>
              </div>

              <hr
                style={{ marginTop: '8px', borderTop: '0px ', borderBottom: '1px solid #737373' }}
              />
              <br />
              <div style={{ color: 'white', textAlign: 'left' }}>ABOUT</div>
              <br />
              <br />
              <div style={{ color: 'white', textAlign: 'left' }}>
                <ShowMoreText
                  /* Default options */
                  lines={3}
                  more={
                    <div style={{ textAlign: 'center' }}>
                      <TransparentButton value="Show More" />
                    </div>
                  }
                  less={
                    <div style={{ textAlign: 'center' }}>
                      <TransparentButton value="Less" />
                    </div>
                  }
                  className="content-css"
                  anchorClass="my-anchor-css-class"
                  onClick={executeOnClick}
                  expanded={false}
                  // width={280}
                  truncatedEndingComponent={
                    <>
                      <br />
                      <br />
                    </>
                  }>
                  {Selection.description ? parse(Selection.description.en) : ''}
                </ShowMoreText>
              </div>
              <br />
              <br />
              <hr
                style={{ marginTop: '8px', borderTop: '0px ', borderBottom: '1px solid #737373' }}
              />
              <br />
              <div>
                <BrowserView>
                  <div
                    style={{
                      width: '20%',
                      height: '125px',
                      display: 'inline-block',
                      color: '#00FFE7',
                    }}>
                    <a
                      href={Selection.links ? Selection.links.chat_url[0] : ''}
                      style={{ textDecoration: 'none', color: '#00FFE7' }}
                      target="blank">
                      Discord &#8599;
                    </a>
                  </div>

                  <div
                    style={{
                      width: '20%',
                      height: '125px',
                      display: 'inline-block',
                      color: '#00FFE7',
                    }}>
                    <a
                      href={Selection.links ? Selection.links.homepage[0] : ''}
                      style={{ textDecoration: 'none', color: '#00FFE7' }}
                      target="blank">
                      Website &#8599;
                    </a>
                  </div>

                  <div
                    style={{
                      width: '20%',
                      height: '125px',
                      display: 'inline-block',
                      color: '#00FFE7',
                    }}>
                    <a
                      href={
                        Selection.links
                          ? `https://twitter.com/${Selection.links.twitter_screen_name}`
                          : ''
                      }
                      style={{ textDecoration: 'none', color: '#00FFE7' }}
                      target="blank">
                      Twitter &#8599;
                    </a>
                  </div>

                  <div
                    style={{
                      width: '20%',
                      height: '125px',
                      display: 'inline-block',
                      color: '#00FFE7',
                    }}>
                    <a
                      href={Selection.links ? Selection.links.blockchain_site[0] : ''}
                      style={{ textDecoration: 'none', color: '#00FFE7' }}
                      target="blank">
                      Etherscan &#8599;
                    </a>
                  </div>

                  <div
                    style={{
                      width: '20%',
                      height: '125px',
                      display: 'inline-block',
                      color: '#00FFE7',
                    }}>
                    <a
                      href={
                        Selection.links ? `https://www.coingecko.com/en/coins/${Selection.id}` : ''
                      }
                      style={{ textDecoration: 'none', color: '#00FFE7' }}
                      target="blank">
                      Coingecko &#8599;
                    </a>
                  </div>
                </BrowserView>
                <MobileView>
                  <div
                    style={{
                      width: '33%',
                      height: '125px',
                      display: 'inline-block',
                      color: '#00FFE7',
                    }}>
                    <a
                      href={Selection.links ? Selection.links.chat_url[0] : ''}
                      style={{ textDecoration: 'none', color: '#00FFE7' }}
                      target="blank">
                      Discord &#8599;
                    </a>
                  </div>

                  <div
                    style={{
                      width: '33%',
                      height: '125px',
                      display: 'inline-block',
                      color: '#00FFE7',
                    }}>
                    <a
                      href={Selection.links ? Selection.links.homepage[0] : ''}
                      style={{ textDecoration: 'none', color: '#00FFE7' }}
                      target="blank">
                      Website &#8599;
                    </a>
                  </div>

                  <div
                    style={{
                      width: '33%',
                      height: '125px',
                      display: 'inline-block',
                      color: '#00FFE7',
                    }}>
                    <a
                      href={
                        Selection.links
                          ? `https://twitter.com/${Selection.links.twitter_screen_name}`
                          : ''
                      }
                      style={{ textDecoration: 'none', color: '#00FFE7' }}
                      target="blank">
                      Twitter &#8599;
                    </a>
                  </div>

                  <br />

                  <div
                    style={{
                      width: '50%',
                      height: '125px',
                      display: 'inline-block',
                      color: '#00FFE7',
                    }}>
                    <a
                      href={Selection.links ? Selection.links.blockchain_site[0] : ''}
                      style={{ textDecoration: 'none', color: '#00FFE7' }}
                      target="blank">
                      Etherscan &#8599;
                    </a>
                  </div>

                  <div
                    style={{
                      width: '50%',
                      height: '125px',
                      display: 'inline-block',
                      color: '#00FFE7',
                    }}>
                    <a
                      href={
                        Selection.links ? `https://www.coingecko.com/en/coins/${Selection.id}` : ''
                      }
                      style={{ textDecoration: 'none', color: '#00FFE7' }}
                      target="blank">
                      Coingecko &#8599;
                    </a>
                  </div>
                </MobileView>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </Grid>
      <Grid item md={4}>
        <ExchangeMini />
      </Grid>
    </Grid>
  );
};
