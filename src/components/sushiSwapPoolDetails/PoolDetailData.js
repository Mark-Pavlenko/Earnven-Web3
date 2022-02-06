// import { ResponsiveLine } from '@nivo/line'
// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import axios from 'axios';
import SushiSwapLogo from '../../assets/icons/Sushiswap.webp';
import getUniswapGraphData from './getPoolDetailGraphData';
import getPoolTokenImage from './getPoolTokenImage';
import LightThemeChart from '../liquidityPoolDetails/lightThemeChart/lightThemeChart';

import {
  AboutBlock,
  BlockTitle,
  CompareTokens,
  Detail,
  DetailTitle,
  DetailValue,
  PairDetails,
  PairInfo,
  ShowMore,
  ShowMoreBlock,
  Stats,
  StatsItems,
  StatsWrapper,
  Token,
  TokenImage,
  TokenImageBlock,
  TokenPrice,
  TokensInfo,
} from '../liquidityPoolDetails/style';
import CopyIcon from '../../assets/icons/copy-address.svg';
import DarkThemeChart from '../liquidityPoolDetails/darkThemeChart/darkThemeChart';
import { useSelector } from 'react-redux';

const info =
  'SushiSwap enables the buying and selling of different cryptocurrencies between users. 0.3% in fees is charged for facilitating each swap, with 0.25% going to liquidity providers and 0.05% being converted to SUSHI and distributed to users holding the SUSHI token. SUSHI tokens also entitle their holders to continue earning a portion of fees, even after they’ve stopped actively providing liquidity. SushiSwap enables the buying and selling of different cryptocurrencies between users. 0.3% in fees is charged for facilitating each swap, with 0.25% going to liquidity providers and 0.05% being converted to SUSHI and distributed to users holding the SUSHI token. SUSHI tokens also entitle their holders to continue earning a portion of fees, even after they’ve stopped actively providing liquidity.';

export default function Chart(props) {
  console.log('I am inside the sushi pool details page');
  const [Data, setData] = useState([]); // UNI V2 Pools
  const [Loading, setLoading] = useState(false);
  const [Page, setPage] = useState('');
  const { token0, token1 } = props;
  const [isHiddenText, setIsHiddenText] = useState(true);

  const hideText = () => {
    setIsHiddenText(!isHiddenText);
  };
  console.log('qwrafskpl', isHiddenText);
  const cutInfo = (info) => {
    return info.slice(0, 500) + '...';
  };
  console.log('asidasjdkasndjask', token0, token1);
  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);

  // const { tokenid } = useParams()
  // const [tokenPair0, setTokenPair0] = useState()
  // const [tokenPair1, setTokenPair1] = useState()
  // const tokenid = props.tokenid

  const accounts = props.address;
  const tokenPairId = props.tokenid;
  // var tokenPair = tokenid //getting from useParams()

  const [Price, setPrice] = useState(null);
  const [Selection, setSelection] = useState(null);
  // eslint-disable-next-line
  const [View, setView] = useState('Month View');

  const [tokenASymbol, setToken0] = useState();
  const [tokenBSymbol, setToken1] = useState();
  const [currentMarketCap, setMarketCap] = useState(0);
  const [totalVolume, setTotalVolume] = useState('');
  const [fullyDiluted, setfullyDiluted] = useState(0);
  const [oneMonthState, setOneMonthState] = useState(0);
  const [threeMonthState, setThreeMonthState] = useState(0);
  const [oneYearState, setOneYearState] = useState(0);
  const [volume24Hrs, setVolume24Hrs] = useState(0);
  const [fees24Hrs, setFees24Hrs] = useState(0);
  const [oneDayReserverUSD, setOneDayReserverUSD] = useState(0);
  const [token0Image, setToken0Image] = useState();
  const [token1Image, setToken1Image] = useState();
  const [token0Reserve, setToken0Reserve] = useState();
  const [token1Reserve, setToken1Reserve] = useState();
  const [token0Price, setToken0Price] = useState();
  const [token1Price, setToken1Price] = useState();
  const [token0USDRate, setToken0USDRate] = useState();
  const [token1USDRate, setToken1USDRate] = useState();

  const convertTokenAddress = (address) => {
    if (address) {
      return `${address.slice(0, 6)}...${address.slice(address.length - 4, address.length)}`;
    }
  };

  const convertNumber = (value) => {
    return parseInt(value).toLocaleString('ja-JP');
  };

  // const [tokenPairId, setTokenPairId] = useState(tokenid)

  // var tokenA = tokenid //getting from useParams()
  // console.log('From sushi pool detail page token0-', token0)
  // console.log('From sushi pool detail page token1-', token1)
  // console.log('sushi lp pair token -', tokenid)
  console.log('sushi lp pair address -', accounts);

  // const { tokenid } = useParams()

  const currentReserve = 0;
  // console.log('Prabha Accounts -', accounts)
  // console.log(' Prabha tokenPair from main page-', tokenPair)
  // console.log('Prabha tokenPair from main detail page-', tokenid)

  function executeOnClick(isExpanded) {
    console.log(isExpanded);
  }

  // function to get epoch time stamp
  const getEpoch = () => {
    const d = new Date();
    const day = d.getUTCDate();
    const month = d.getUTCMonth();
    const year = d.getUTCFullYear();
    const offset = new Date(year, month, day).getTimezoneOffset() * 60;
    const epoch = new Date(year, month, day).getTime() / 1000 - offset;
    return epoch;
  };

  // This function is to get MarketCap  and FullyDiluted
  // this hook is used to get uniswap pool detail data from the graph for the sepecific pool token
  // this function is used to get the current market cap value
  useEffect(() => {
    setLoading(true);

    // function to fetch current pool data from graph
    async function getData() {
      // call below function to get epoc time stamp
      const epoch = getEpoch();
      // call this util function to get uniswap graph data
      try {
        const response = await getUniswapGraphData(token0, token1, epoch);
        console.log('asidasjdioasdio', response);

        // main derive code
        if (response.data.data) {
          console.log('I am inside the sushi data deriven section');
          console.log('Sushi data from detail page', response.data.data.pairDayDatas);

          const res = response.data.data.pairDayDatas;
          const token0 = res[0].token0.symbol;
          const token1 = res[0].token1.symbol;

          // assing the current reserver to the local variable to get 24hrs difference
          // currentReserve = res[0].reserveUSD
          // get current market price by giving below formula
          const totalVolume = res[0].reserveUSD / res[0].totalSupply;

          // to get fullydiluted value muliply totalMarketValue with current market price
          const fullyDiluted = totalVolume * res[0].totalSupply; // total market value * with market price

          // set/update value for state varaible

          // setSelection(Data)
          setLoading(false);
          setToken0(token0);
          setToken1(token1);
          setMarketCap(parseInt(res[0].reserveUSD).toLocaleString());
          setfullyDiluted(parseInt(fullyDiluted).toLocaleString());
          setTotalVolume(parseFloat(totalVolume).toLocaleString());
        }
      } catch (err) {
        console.log('No record found for the paired token');
      }
    }
    getData();
  }, []);

  // OneDay
  // below function is used to get 24hrs/oneday before value of the pair token
  useEffect(() => {
    async function getStateData() {
      // call below function to get epoc time stamp
      const epoch = getEpoch();
      const oneDayPrior = epoch - 86400; // take one day prior to the current date
      // call this util function to get uniswap graph data
      try {
        const response = await getUniswapGraphData(token0, token1, oneDayPrior);
        // main derive code

        if (response.data.data) {
          const { pairDayDatas } = response.data.data;
          const pairsData = response.data.data.pairs;

          const oneDayPriorReserverdUSD = pairDayDatas[0].reserveUSD;
          const oneDayPrirorTotalSupply = pairDayDatas[0].totalSupply;
          const currentReserverUsd = pairsData[0].reserveUSD;
          // var currentReserverUsd =
          //   Math.round(parseFloat(pairsData[0].reserveUSD) / 1000000) *
          //   1000000
          const currentTotalSupply = pairsData[0].totalSupply;

          const priorVolume =
            parseFloat(oneDayPriorReserverdUSD) / parseFloat(oneDayPrirorTotalSupply);

          const currentVolume = parseFloat(currentReserverUsd) / parseFloat(currentTotalSupply);

          const oneDayState = ((currentVolume - priorVolume) / priorVolume) * 100; // take the difference

          // set/update value for state variable
          // setSelection(Data)
          // setLoading(false)
          setOneDayReserverUSD(parseFloat(oneDayState).toFixed(2).concat('%'));
        }
      } catch (err) {
        console.log('No record found for the paired token');
      }
    }
    getStateData();
  }, []);

  // oneMonthState
  // this query will fetch the current data and based on that will calcuate oneMonth and oneYear state
  useEffect(() => {
    async function getStateData() {
      // call below function to get epoc time stamp
      const epoch = getEpoch();
      const oneMonth = epoch - 2764800; // to fetch one month prior from the current month
      // call this util function to get uniswap graph data
      try {
        const response = await getUniswapGraphData(token0, token1, oneMonth);

        // main derive code
        if (response.data.data) {
          const pairDayData = response.data.data.pairDayDatas;
          const parisData = response.data.data.pairs;

          const priorMonthReserveUSD = pairDayData[0].reserveUSD;
          const priorMonthTotalSupply = pairDayData[0].totalSupply;
          const currentreservedUsd = parisData[0].reserveUSD;
          const currentTotalSupply = parisData[0].totalSupply;

          const oneMonthPirorVolume = priorMonthReserveUSD / priorMonthTotalSupply;

          const currentMonthVolume = currentreservedUsd / currentTotalSupply;
          // calculate to get oneMonth state value
          const oneMonthState =
            ((parseInt(currentMonthVolume) - parseInt(oneMonthPirorVolume)) /
              parseInt(oneMonthPirorVolume)) *
            100;

          // setSelection(Data)
          // setLoading(false)
          setOneMonthState(parseFloat(oneMonthState).toFixed(2).concat('%'));
        }
      } catch (err) {
        console.log('No record found for the paired token');
      }
    }
    getStateData();
  }, []);
  // 3monthState
  // this query will fetch the three month data and based on that will calcuate the state
  useEffect(() => {
    async function getStateData() {
      // call below function to get epoc time stamp
      const epoch = getEpoch();
      const threeMonth = epoch - 8035200; // take three months before the current month
      // call this util function to get uniswap graph data
      try {
        const response = await getUniswapGraphData(token0, token1, threeMonth);
        // Main derive logic
        if (response.data.data) {
          const pairDayData = response.data.data.pairDayDatas;
          const pairsData = response.data.data.pairs;

          const threeMonthPriorReserverUsd = pairDayData[0].reserveUSD;
          const threeMonthPriorTotalSupply = pairDayData[0].totalSupply;

          const currentReservedUsd = pairsData[0].reserveUSD;
          const currentTotalSupply = pairsData[0].totalSupply;

          const threeMonthPriorVolume = threeMonthPriorReserverUsd / threeMonthPriorTotalSupply;

          const currentVolume = currentReservedUsd / currentTotalSupply;

          const threeMonthState =
            ((parseInt(currentVolume) - parseInt(threeMonthPriorVolume)) /
              parseInt(threeMonthPriorVolume)) *
            100;

          // setSelection(Data)
          // setLoading(false)
          setThreeMonthState(parseFloat(threeMonthState).toFixed(2).concat('%'));
        }
      } catch (err) {
        console.log('No record found for the paired token');
      }
    }
    getStateData();
  }, []);

  // One year state
  // this query will fetch the one year prior data and based on that will calcuate the state
  useEffect(() => {
    async function getStateData() {
      // call below function to get epoc time stamp
      const epoch = getEpoch();
      const oneYeartime = epoch - 31536000; // take previous year from the current year
      // call this util function to get uniswap graph data
      try {
        const response = await getUniswapGraphData(token0, token1, oneYeartime);
        // Main detail code
        if (response.data.data) {
          const pairDayData = response.data.data.pairDayDatas;
          const parisData = response.data.data.pairs;

          const oneYearTotalSupply = pairDayData[0].totalSupply;
          const oneYearReserveUSD = pairDayData[0].reserveUSD;

          const currentReservedUsd = parisData[0].reserveUSD;
          const currentTotalSupply = parisData[0].totalSupply;

          const oneYearVolume = oneYearReserveUSD / oneYearTotalSupply;
          const currentVolume = currentReservedUsd / currentTotalSupply;
          // below formula to get onday stats in percentage
          const oneYearState = ((currentVolume - oneYearVolume) / oneYearVolume) * 100;

          // console.log('Infinity Logic to currentVolume', currentVolume)
          // console.log('Infinity Logic to oneYearVolume', oneYearVolume)
          // console.log('Infinity one year state', oneYearState)

          // setSelection(Data)
          // setLoading(false)
          setOneYearState(parseFloat(oneYearState).toFixed(2));
        }
      } catch (err) {
        console.log('No record found for the paired token');
      }
    }
    getStateData();
  }, []);

  // query to get volume(24hrs) and fees(24hrs)
  useEffect(() => {
    // these query will return the most recent record
    async function getStateData() {
      // call below function to get epoc time stamp
      const epoch = getEpoch(); // get the current time unix time stamp
      // const oneDayPrior = epoch - 86400 //take one day prior/24hrs to the current date
      // call this util function to get uniswap graph data
      try {
        const response = await getUniswapGraphData(token0, token1, epoch);
        // console.log('One day prior-', oneDayPrior)
        // main derive code
        if (response.data.data) {
          const pairDayData = response.data.data.pairDayDatas;
          const volume24Hrs = pairDayData[0].volumeUSD;
          const fees24Hrs = (volume24Hrs * 0.3) / 100;

          console.log('volume24Hrs', volume24Hrs);
          console.log('fees24Hrs', fees24Hrs);

          // setSelection(Data)
          // setLoading(false)
          setVolume24Hrs(parseInt(volume24Hrs).toLocaleString());
          setFees24Hrs(parseInt(fees24Hrs).toLocaleString());
        }
      } catch (err) {
        console.log('No record found for the paired token');
      }
    }
    getStateData();
  }, []);
  // use the function to get token image
  useEffect(() => {
    async function getData() {
      try {
        const response = await getPoolTokenImage(token0, token1);
        // setToken1Image(response[0])
        // console.log('Token A image data', response.token0Image)
        // console.log('Token B image data', response.token1Image)
        setToken0Image(response.token0Image);
        setToken1Image(response.token1Image);
      } catch (err) {
        console.log('No record found for the paired token');
      }
    }
    getData();
  }, []);

  // this functin is to get data for each token in the pair to display its status in the UI
  useEffect(() => {
    async function getStateData() {
      // call below function to get epoc time stamp
      const epoch = getEpoch(); // get the current time unix time stamp
      // const oneDayPrior = epoch - 86400 //take one day prior/24hrs to the current date
      // call this util function to get uniswap graph data
      try {
        const response = await getUniswapGraphData(token0, token1, epoch);
        console.log('for current day epoch-', epoch);
        // main derive code
        if (response.data.data) {
          const pairData = response.data.data.pairs;
          // for tokenA ex: DAI
          const token0Reserve = pairData[0].reserve0;
          const { token1Price } = pairData[0];
          // for tokenB ex: WETH
          const token1Reserve = pairData[0].reserve1;
          const { token0Price } = pairData[0];

          console.log('token0Reserve', token0Reserve);
          console.log('token1Price', token1Price);
          setToken0Reserve(parseInt(token0Reserve).toLocaleString());
          setToken1Price(token1Price);
          setToken1Reserve(parseInt(token1Reserve).toLocaleString());
          setToken0Price(token0Price);
        }
      } catch (err) {
        console.log('No record found for the paired token');
      }
    }
    getStateData();
  }, []);

  // Below function is used to get USD price for the given token from the api ethplorer
  useEffect(() => {
    async function getStateData() {
      // get the usd price for the token0
      await axios
        .get(
          `https://api.ethplorer.io/getAddressInfo/${token0}?apiKey=EK-qSPda-W9rX7yJ-UY93y`,
          {},
          {}
        )
        .then(async (response) => {
          // console.log(response)

          const tokens = response.data.tokenInfo;
          // console.log('ethplorer data', tokens)
          console.log('Token0 sumbol', tokenASymbol);
          console.log(`token price for ${tokens.symbol.toUpperCase()}`, tokens.price.rate);
          if (tokens.symbol.toUpperCase() === tokenASymbol) {
            console.log(`token price for ${tokenASymbol}`, tokens);
            setToken0USDRate(parseFloat(tokens.price.rate).toFixed(2));
          }
        });
      // get the usd price for the token1
      await axios
        .get(
          `https://api.ethplorer.io/getAddressInfo/${token1}?apiKey=EK-qSPda-W9rX7yJ-UY93y`,
          {},
          {}
        )
        .then(async (response) => {
          // console.log(response)

          const tokens = response.data.tokenInfo;
          // console.log('ethplorer data', tokens)
          console.log('Token0 sumbol', tokenBSymbol);
          console.log(`token price for ${tokens.symbol.toUpperCase()}`, tokens);

          if (tokens.symbol.toUpperCase() === tokenBSymbol) {
            console.log(`token price for ${tokenBSymbol}`, tokens.price.rate);
            setToken1USDRate(parseFloat(tokens.price.rate).toFixed(2));
          }
        });
    }
    getStateData();
  }, [token0, token1, tokenASymbol, tokenBSymbol]);

  return (
    <>
      {/*<Grid container>*/}
      {/*  <Grid item md={8}>*/}
      {/*    <Container>*/}
      {/*      <Box sx={{ mt: 4, mb: 3 }}>*/}
      {/*        <div>*/}
      {/*          <div>*/}
      {/*            <Box sx={{ width: '100%' }}>*/}
      {/*              <center>*/}
      {/*                <h2 style={{ fontSize: '40px', color: 'white' }}>Liquidity Pool Details</h2>*/}
      {/*              </center>*/}
      {/*            </Box>*/}
      {/*            <center>*/}
      {/*              <h2>*/}
      {/*                <img*/}
      {/*                  style={{*/}
      {/*                    height: '30px',*/}
      {/*                    width: '30px',*/}
      {/*                    display: 'inline-block',*/}
      {/*                  }}*/}
      {/*                  title="Sushiswap"*/}
      {/*                  src={SushiSwapLogo}*/}
      {/*                  alt=""*/}
      {/*                />*/}
      {/*                &nbsp; Sushiswap*/}
      {/*              </h2>*/}
      {/*            </center>*/}
      {/*            <br />*/}
      {/*            <div>*/}
      {/*              <img*/}
      {/*                style={{*/}
      {/*                  height: '30px',*/}
      {/*                  width: '30px',*/}
      {/*                  display: 'inline-block',*/}
      {/*                }}*/}
      {/*                src={`https://ethplorer.io${token0Image}`}*/}
      {/*              />*/}
      {/*              <img*/}
      {/*                style={{*/}
      {/*                  height: '30px',*/}
      {/*                  width: '30px',*/}
      {/*                  display: 'inline-block',*/}
      {/*                }}*/}
      {/*                src={`https://ethplorer.io${token1Image}`}*/}
      {/*              />*/}
      {/*              &nbsp;*/}
      {/*              <h3*/}
      {/*                style={{*/}
      {/*                  marginBottom: '2rem 0',*/}
      {/*                  display: 'inline-block',*/}
      {/*                }}>*/}
      {/*                {tokenASymbol}-{tokenBSymbol}*/}
      {/*              </h3>*/}
      {/*            </div>*/}

      {/*            <div*/}
      {/*              style={{*/}
      {/*                width: '100%',*/}
      {/*                margin: 'auto',*/}
      {/*                marginLeft: '10px',*/}
      {/*              }}>*/}
      {/*              /!* Blow logic is to implement pair's individual token detials  *!/*/}
      {/*              <div*/}
      {/*                style={{*/}
      {/*                  // marginLeft:'25px',*/}
      {/*                  width: '49%',*/}
      {/*                  marginTop: '15px',*/}
      {/*                  minWidth: '30px',*/}
      {/*                  border: '1px solid rgb(115, 115, 115)',*/}
      {/*                  height: '80px',*/}
      {/*                  minHeight: '50px',*/}
      {/*                  borderRadius: '20px',*/}
      {/*                  display: 'inline-block',*/}
      {/*                  margin: '1rem 0',*/}
      {/*                }}>*/}
      {/*                <div style={{ marginTop: '10px', padding: '0 1rem' }}>*/}
      {/*                  <img*/}
      {/*                    style={{*/}
      {/*                      height: '20px',*/}
      {/*                      width: '25px',*/}
      {/*                      display: 'inline-block',*/}
      {/*                    }}*/}
      {/*                    src={`https://ethplorer.io${token0Image}`}*/}
      {/*                  />*/}
      {/*                  &nbsp; &nbsp;{token0Reserve}&nbsp;{tokenASymbol}*/}
      {/*                </div>*/}

      {/*                <div style={{ display: 'inline-block' }}>*/}
      {/*                  &nbsp; &nbsp;1&nbsp;{tokenASymbol}={token1Price}&nbsp;*/}
      {/*                  {tokenBSymbol}(${token0USDRate})*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*              /!* End of logic to implement pair's individual token detials  *!/*/}
      {/*              &nbsp;*/}
      {/*              /!* Logic of second token *!/*/}
      {/*              <div*/}
      {/*                style={{*/}
      {/*                  // marginLeft:'25px',*/}
      {/*                  width: '49%',*/}
      {/*                  marginTop: '15px',*/}

      {/*                  minWidth: '30px',*/}
      {/*                  border: '1px solid rgb(115, 115, 115)',*/}
      {/*                  height: '80px',*/}
      {/*                  minHeight: '50px',*/}
      {/*                  borderRadius: '20px',*/}
      {/*                  display: 'inline-block',*/}
      {/*                  margin: '1rem 0',*/}
      {/*                }}>*/}
      {/*                <div style={{ marginTop: '10px', padding: '0 1rem' }}>*/}
      {/*                  <img*/}
      {/*                    style={{*/}
      {/*                      height: '20px',*/}
      {/*                      width: '25px',*/}
      {/*                      display: 'inline-block',*/}
      {/*                    }}*/}
      {/*                    src={`https://ethplorer.io${token1Image}`}*/}
      {/*                  />*/}
      {/*                  &nbsp; &nbsp;{token1Reserve}&nbsp;{tokenBSymbol}*/}
      {/*                </div>*/}

      {/*                <div style={{ display: 'inline-block' }}>*/}
      {/*                  &nbsp; &nbsp;1&nbsp;{tokenBSymbol}={token0Price}&nbsp;*/}
      {/*                  {tokenASymbol}(${token1USDRate})*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*              /!* End of the Logic for secound token *!/*/}
      {/*              <br />*/}
      {/*              <Typography variant="h4" sx={{ mt: 2, ml: 1, color: 'turquoise' }}>*/}
      {/*                ${totalVolume}*/}
      {/*              </Typography>*/}
      {/*              <hr*/}
      {/*                style={{*/}
      {/*                  marginTop: '0.01px',*/}
      {/*                  borderTop: '0px ',*/}
      {/*                  borderBottom: '1px solid #737373',*/}
      {/*                }}*/}
      {/*              />*/}
      {/*<div*/}
      {/*  style={{*/}
      {/*    color: 'darkviolet',*/}
      {/*    textAlign: 'left',*/}
      {/*    marginTop: '15px',*/}
      {/*    fontStyle: 'unset',*/}
      {/*  }}>*/}
      {/*  STATS*/}
      {/*</div>*/}
      {/*<div>*/}
      {/*  <BrowserView>*/}
      {/*    <div*/}
      {/*      style={{*/}
      {/*        width: '25%',*/}
      {/*        height: '125px',*/}
      {/*        display: 'inline-block',*/}
      {/*        color: 'blanchedalmond',*/}
      {/*        marginTop: '8px',*/}
      {/*      }}>*/}
      {/*      1 Day*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <font color={parseInt(oneDayReserverUSD) >= 0 ? '#00FFE7' : 'red'}>*/}
      {/*        {oneDayReserverUSD}*/}
      {/*      </font>*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*    </div>*/}
      {/*    <div*/}
      {/*      style={{*/}
      {/*        width: '25%',*/}
      {/*        height: '125px',*/}
      {/*        display: 'inline-block',*/}
      {/*        color: 'blanchedalmond',*/}
      {/*      }}>*/}
      {/*      1 Month*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <font color={parseInt(oneMonthState) >= 0 ? '#00FFE7' : 'red'}>*/}
      {/*        {oneMonthState}*/}
      {/*      </font>*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*    </div>*/}
      {/*    <div*/}
      {/*      style={{*/}
      {/*        width: '25%',*/}
      {/*        height: '125px',*/}
      {/*        display: 'inline-block',*/}
      {/*        color: 'blanchedalmond',*/}
      {/*      }}>*/}
      {/*      3 Months*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <font color={parseInt(threeMonthState) >= 0 ? '#00FFE7' : 'red'}>*/}
      {/*        {threeMonthState}*/}
      {/*      </font>*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*    </div>*/}
      {/*    <div*/}
      {/*      style={{*/}
      {/*        width: '25%',*/}
      {/*        height: '125px',*/}
      {/*        display: 'inline-block',*/}
      {/*        color: 'blanchedalmond',*/}
      {/*      }}>*/}
      {/*      1 Year*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <font color={parseInt(oneYearState) >= 0 ? '#00FFE7' : 'red'}>*/}
      {/*        {oneYearState}%*/}
      {/*      </font>*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*    </div>*/}
      {/*    <div*/}
      {/*      style={{*/}
      {/*        width: '25%',*/}
      {/*        height: '100px',*/}
      {/*        display: 'inline-block',*/}
      {/*        color: 'blanchedalmond',*/}
      {/*      }}>*/}
      {/*      Market Cap*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <font color="#00FFE7">{currentMarketCap}</font>*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*    </div>*/}
      {/*    <div*/}
      {/*      style={{*/}
      {/*        width: '25%',*/}
      {/*        height: '125px',*/}
      {/*        display: 'inline-block',*/}
      {/*        color: 'blanchedalmond',*/}
      {/*      }}>*/}
      {/*      Fully Diluted*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <font color="#00FFE7">{fullyDiluted}</font>*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*    </div>*/}
      {/*    <div*/}
      {/*      style={{*/}
      {/*        width: '25%',*/}
      {/*        height: '125px',*/}
      {/*        display: 'inline-block',*/}
      {/*        color: 'blanchedalmond',*/}
      {/*      }}>*/}
      {/*      Volume(24hrs)*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <font color="#00FFE7">{volume24Hrs}</font>*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*    </div>*/}
      {/*    <div*/}
      {/*      style={{*/}
      {/*        width: '25%',*/}
      {/*        height: '125px',*/}
      {/*        display: 'inline-block',*/}
      {/*        color: 'blanchedalmond',*/}
      {/*      }}>*/}
      {/*      Fees(24hrs)*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <font color="#00FFE7">{fees24Hrs}</font>*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*    </div>*/}
      {/*  </BrowserView>*/}
      {/*  <MobileView>*/}
      {/*    <div*/}
      {/*      style={{*/}
      {/*        width: '50%',*/}
      {/*        height: '125px',*/}
      {/*        display: 'inline-block',*/}
      {/*        color: 'blanchedalmond',*/}
      {/*      }}>*/}
      {/*      1 DAY*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <font color={parseInt(oneDayReserverUSD) > 0 ? '#00FFE7' : 'red'}>*/}
      {/*        {oneDayReserverUSD}*/}
      {/*      </font>*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*    </div>*/}
      {/*    <div*/}
      {/*      style={{*/}
      {/*        width: '50%',*/}
      {/*        height: '125px',*/}
      {/*        display: 'inline-block',*/}
      {/*        color: 'blanchedalmond',*/}
      {/*      }}>*/}
      {/*      1 Month*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <font color={parseInt(oneMonthState) > 0 ? '#00FFE7' : 'red'}>*/}
      {/*        {oneMonthState}*/}
      {/*      </font>*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*    </div>*/}
      {/*    <br />*/}
      {/*    <div*/}
      {/*      style={{*/}
      {/*        width: '50%',*/}
      {/*        height: '125px',*/}
      {/*        display: 'inline-block',*/}
      {/*        color: 'blanchedalmond',*/}
      {/*      }}>*/}
      {/*      3 Months*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <font color={parseInt(threeMonthState) > 0 ? '#00FFE7' : 'red'}>*/}
      {/*        {threeMonthState}*/}
      {/*      </font>*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*    </div>*/}
      {/*    <div*/}
      {/*      style={{*/}
      {/*        width: '50%',*/}
      {/*        height: '125px',*/}
      {/*        display: 'inline-block',*/}
      {/*        color: 'blanchedalmond',*/}
      {/*      }}>*/}
      {/*      1 Year*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <font color={parseInt(oneYearState) > 0 ? '#00FFE7' : 'red'}>*/}
      {/*        {oneYearState}*/}
      {/*      </font>*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*    </div>*/}
      {/*    <br />*/}
      {/*    <div*/}
      {/*      style={{*/}
      {/*        width: '50%',*/}
      {/*        height: '125px',*/}
      {/*        display: 'inline-block',*/}
      {/*        color: 'blanchedalmond',*/}
      {/*      }}>*/}
      {/*      Market Cap*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <font color="#00FFE7">{currentMarketCap}</font>*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*    </div>*/}
      {/*    <div*/}
      {/*      style={{*/}
      {/*        width: '50%',*/}
      {/*        height: '125px',*/}
      {/*        display: 'inline-block',*/}
      {/*        color: 'blanchedalmond',*/}
      {/*      }}>*/}
      {/*      Fully Diluted*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <font color="#00FFE7">{fullyDiluted}</font>*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*    </div>*/}
      {/*    <br />*/}
      {/*    <div*/}
      {/*      style={{*/}
      {/*        width: '50%',*/}
      {/*        height: '125px',*/}
      {/*        display: 'inline-block',*/}
      {/*        color: 'blanchedalmond',*/}
      {/*      }}>*/}
      {/*      Volume(24hrs)*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <font color="#00FFE7">{volume24Hrs}</font>*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*    </div>*/}
      {/*    <div*/}
      {/*      style={{*/}
      {/*        width: '50%',*/}
      {/*        height: '125px',*/}
      {/*        display: 'inline-block',*/}
      {/*        color: 'blanchedalmond',*/}
      {/*      }}>*/}
      {/*      Fees(24hrs)*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <font color="#00FFE7">{fees24Hrs}</font>*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*    </div>*/}
      {/*  </MobileView>*/}
      {/*</div>*/}
      {/*              <hr*/}
      {/*                style={{*/}
      {/*                  marginTop: '1px',*/}
      {/*                  borderTop: '0px ',*/}
      {/*                  borderBottom: '1px solid #737373',*/}
      {/*                }}*/}
      {/*              />*/}
      {/*              <br />*/}
      {/*              <div*/}
      {/*                style={{*/}
      {/*                  color: 'darkviolet',*/}
      {/*                  textAlign: 'left',*/}
      {/*                  fontStyle: 'unset',*/}
      {/*                }}>*/}
      {/*                ABOUT*/}
      {/*              </div>*/}
      {/*              <br />*/}
      {/*              <div style={{ color: 'white' }}>*/}
      {/*                <h4>*/}
      {/*                  &nbsp;&nbsp;&nbsp;&nbsp; SushiSwap enables the buying and selling of*/}
      {/*                  different cryptocurrencies between users. 0.3% in fees is charged for*/}
      {/*                  facilitating each swap, with 0.25% going to liquidity providers and 0.05%*/}
      {/*                  being converted to SUSHI and distributed to users holding the SUSHI token.*/}
      {/*                  SUSHI tokens also entitle their holders to continue earning a portion of*/}
      {/*                  fees, even after they’ve stopped actively providing liquidity.*/}
      {/*                </h4>*/}
      {/*              </div>*/}
      {/*              <br />*/}
      {/*              <br />*/}
      {/*              <hr*/}
      {/*                style={{*/}
      {/*                  marginTop: '8px',*/}
      {/*                  borderTop: '0px ',*/}
      {/*                  borderBottom: '1px solid #737373',*/}
      {/*                }}*/}
      {/*              />*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </Box>*/}
      {/*    </Container>*/}
      {/*  </Grid>*/}
      {/*  <Grid item md={4} style={{ display: 'inline-block' }}>*/}
      {/*    {!Loading && <PoolDetailChart token0={token0} token1={token1} />}*/}
      {/*  </Grid>*/}
      {/*</Grid>*/}
      {/*<Grid item md={12}>*/}
      {/*  {!Loading && (*/}
      {/*    <PoolDetailsInfo*/}
      {/*      tokenASymbol={tokenASymbol}*/}
      {/*      tokenBSymbol={tokenBSymbol}*/}
      {/*      tokenAId={token0}*/}
      {/*      tokenBId={token1}*/}
      {/*      tokenPair={tokenPairId}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*</Grid>*/}
      <div style={{ padding: '32px 0' }}>
        <>
          <div>
            {tokenPairId && isLightTheme === true ? (
              <LightThemeChart
                isLightTheme={true}
                img={SushiSwapLogo}
                type={'Sushiswap'}
                logo1={token0Image}
                logo2={token1Image}
                symbol1={tokenASymbol}
                symbol2={tokenBSymbol}
                address={tokenPairId}
                totalValue={'$' + currentMarketCap}
              />
            ) : (
              <DarkThemeChart
                isLightTheme={false}
                img={SushiSwapLogo}
                type={'Sushiswap'}
                logo1={token0Image}
                logo2={token1Image}
                symbol1={tokenASymbol}
                symbol2={tokenBSymbol}
                address={tokenPairId}
                totalValue={'$' + currentMarketCap}
              />
            )}
          </div>
          <TokensInfo>
            <Token isLightTheme={isLightTheme}>
              <TokenImageBlock>
                <div>
                  <TokenImage src={`https://ethplorer.io${token0Image}`} alt="" />
                </div>
                <TokenPrice>{token0Reserve + ' ' + tokenASymbol}</TokenPrice>
              </TokenImageBlock>
              <CompareTokens>
                {'1 ' +
                  tokenASymbol +
                  ' = ' +
                  parseFloat(token1Price).toFixed(token1Price > 1 ? 2 : 7) +
                  ' ' +
                  tokenBSymbol +
                  ` ($${!isNaN(token0USDRate) ? token0USDRate : '0'})`}
              </CompareTokens>
            </Token>
            <Token isLightTheme={isLightTheme}>
              <TokenImageBlock>
                <div>
                  <TokenImage src={`https://ethplorer.io${token1Image}`} alt="" />
                </div>
                <TokenPrice>
                  {token1Reserve} {tokenBSymbol}
                </TokenPrice>
              </TokenImageBlock>
              <CompareTokens>
                {'1 ' +
                  tokenBSymbol +
                  ' = ' +
                  parseFloat(token0Price).toFixed(token0Price > 1 ? 2 : 7) +
                  ' ' +
                  tokenASymbol +
                  ` ($${!isNaN(token1USDRate) ? token1USDRate : '0'})`}
              </CompareTokens>
            </Token>
          </TokensInfo>
          <PairInfo isLightTheme={isLightTheme}>
            <BlockTitle>Pair Information</BlockTitle>
            <PairDetails>
              <div>
                <DetailTitle>Pair Name</DetailTitle>
                <Detail>
                  <DetailValue>{tokenASymbol + ' - ' + tokenBSymbol}</DetailValue>
                  <div onClick={() => navigator.clipboard.writeText('123123123')}>
                    <img src={CopyIcon} alt="" />
                  </div>
                </Detail>
              </div>
              <div>
                <DetailTitle>Pair Address</DetailTitle>
                <Detail>
                  <DetailValue>{convertTokenAddress(tokenPairId)}</DetailValue>
                  <div>
                    <img src={CopyIcon} alt="" />
                  </div>
                </Detail>
              </div>
              <div>
                <DetailTitle>{tokenASymbol} Address</DetailTitle>
                <Detail>
                  <DetailValue>{convertTokenAddress(token0)}</DetailValue>
                  <div>
                    <img src={CopyIcon} alt="" />
                  </div>
                </Detail>
              </div>
              <div>
                <DetailTitle>{tokenBSymbol} Address</DetailTitle>
                <Detail>
                  <DetailValue>{convertTokenAddress(token1)}</DetailValue>
                  <div>
                    <img src={CopyIcon} alt="" />
                  </div>
                </Detail>
              </div>
            </PairDetails>
          </PairInfo>
          <Stats isLightTheme={isLightTheme}>
            <BlockTitle>Stats</BlockTitle>
            <StatsWrapper>
              <StatsItems>
                <div>
                  <DetailValue>1 day</DetailValue>
                  <Detail>
                    <DetailTitle>{oneDayReserverUSD}</DetailTitle>
                  </Detail>
                </div>
                <div>
                  <DetailValue>1 month</DetailValue>
                  <Detail>
                    <DetailTitle>{oneMonthState}</DetailTitle>
                  </Detail>
                </div>
                <div>
                  <DetailValue>3 months</DetailValue>
                  <Detail>
                    <DetailTitle>{threeMonthState}</DetailTitle>
                  </Detail>
                </div>
                <div>
                  <DetailValue>1 year</DetailValue>
                  <Detail>
                    <DetailTitle>{oneYearState}%</DetailTitle>
                  </Detail>
                </div>
                <div>
                  <DetailValue>Market Cap</DetailValue>
                  <Detail>
                    <DetailTitle>{currentMarketCap}</DetailTitle>
                  </Detail>
                </div>
                <div>
                  <DetailValue>Fully Diluted</DetailValue>
                  <Detail>
                    <DetailTitle>{fullyDiluted}</DetailTitle>
                  </Detail>
                </div>
                <div>
                  <DetailValue>Volume (24hrs)</DetailValue>
                  <Detail>
                    <DetailTitle>{volume24Hrs}</DetailTitle>
                  </Detail>
                </div>
                <div>
                  <DetailValue>Fees (24hrs)</DetailValue>
                  <Detail>
                    <DetailTitle>{fees24Hrs}</DetailTitle>
                  </Detail>
                </div>
              </StatsItems>
            </StatsWrapper>
          </Stats>
          <AboutBlock isLightTheme={isLightTheme}>
            <div style={{ textAlign: 'justify' }}>{isHiddenText ? cutInfo(info) : info}</div>
            {info.length > 300 && (
              <ShowMoreBlock>
                <ShowMore isLightTheme={isLightTheme} onClick={hideText}>
                  {isHiddenText ? 'Show More' : 'Hide'}
                </ShowMore>
              </ShowMoreBlock>
            )}
          </AboutBlock>
        </>
      </div>
    </>
  );
}
