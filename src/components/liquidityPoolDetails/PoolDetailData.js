/* eslint-disable */
import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import unilogo from '../../assets/icons/Uniswap.webp';
import PoolDetailChart from './PoolDetailsChart';
import { useSelector } from 'react-redux'
// import PoolDetailsInfo from '../../utils/PoolDetailsInfo'
import getUniswapGraphData from './getPoolDetailGraphData';
import getPoolTokenImage from './getPoolTokenImage';
import LightThemeChart from "./lightThemeChart/lightThemeChart";
import DarkThemeChart from "./darkThemeChart/darkThemeChart";
import {
  AboutBlock,
  BlockTitle,
  CompareTokens, CopyBlock, Detail, DetailTitle, DetailValue, PairDetails,
  PairInfo, ShowMore, ShowMoreBlock, Stats, StatsItems, StatsWrapper,
  Token,
  TokenImage,
  TokenImageBlock,
  TokenPrice,
  TokensInfo, Wrapper
} from "./style";
import CopyIcon from "../../assets/icons/copy-address.svg";
// const getUniswapGraphData = require('./getPoolDetailGraphData')
//   .getUniswapGraphData

//const getPoolTokenImage = require('./getPoolTokenImage').getPoolTokenImage

export default function Chart(props) {
  const [Data, setData] = useState([]); //UNI V2 Pools
  const [Loading, setLoading] = useState(false);
  const [Page, setPage] = useState('');

  const { tokenid } = props;
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
  const [tokenAId, setToken0Id] = useState();
  const [tokenBId, setToken1Id] = useState();
  const [isHiddenText, setIsHiddenText] = useState(true);
  const info = `UNI-V2 token represents a share in the Uniswap ${tokenASymbol}/${tokenBSymbol} Pool. Liquidity providers earn 0.3% fee on
                  every trade made through the protocol. The fees are then split
                  proportionally to your share of the pool. By purchasing a share in this
                  pool, you become a liquidity provider of the Uniswap ${tokenASymbol}/
                  ${tokenBSymbol} Pool. UNI-V2 token represents a share in the Uniswap ${tokenASymbol}/${tokenBSymbol} Pool. Liquidity providers earn 0.3% fee on
                  every trade made through the protocol. The fees are then split
                  proportionally to your share of the pool. By purchasing a share in this
                  pool, you become a liquidity provider of the Uniswap ${tokenASymbol}
                  ${tokenBSymbol} Pool.`

  const hideText = () => {
    setIsHiddenText(!isHiddenText);
  };

  const cutInfo = (info) => {
    return info.slice(0, 500) + '...';
  };

  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);

  var accounts = props.address;
  var tokenPair = tokenid; //getting from useParams()

  //const { tokenid } = useParams()
  let token0Id;
  let token1Id;
  let token0;
  let token1;
  let currentReserve = 0;

  const convertTokenAddress = (address) => {
    if (address) {
      return `${address.slice(0, 6)}...${address.slice(address.length - 4, address.length)}`;
    }
  };
  function executeOnClick(isExpanded) {
    console.log(isExpanded);
  }

  //function to get epoch time stamp
  const getEpoch = () => {
    var d = new Date();
    var day = d.getUTCDate();
    var month = d.getUTCMonth();
    var year = d.getUTCFullYear();
    var offset = new Date(year, month, day).getTimezoneOffset() * 60;
    var epoch = new Date(year, month, day).getTime() / 1000 - offset;
    return epoch;
  };

  //This function is to get MarketCap  and FullyDiluted
  //this hook is used to get uniswap pool detail data from the graph for the sepecific pool token
  //this function is used to get the current market cap value
  useEffect(() => {
    setLoading(true);

    //function to fetch current pool data from graph
    async function getData() {
      //call below function to get epoc time stamp
      const epoch = getEpoch();
      //call this util function to get uniswap graph data
      const response = await getUniswapGraphData(tokenPair, epoch);

      //main derive code
      if (response.data.data) {
        try {
          var res = response.data.data.pairDayDatas;
          token0 = res[0].token0.symbol;
          token1 = res[0].token1.symbol;
          token0Id = res[0].token0.id;
          token1Id = res[0].token1.id;
          //assing the current reserver to the local variable to get 24hrs difference
          //currentReserve = res[0].reserveUSD
          //get current market price by giving below formula
          let totalVolume = res[0].reserveUSD / res[0].totalSupply;

          //to get fullydiluted value muliply totalMarketValue with current market price
          let fullyDiluted = totalVolume * res[0].totalSupply; //total market value * with market price

          //set/update value for state varaible

          //setSelection(Data)
          setLoading(false);
          setToken0(token0);
          setToken1(token1);
          setToken0Id(token0Id);
          setToken1Id(token1Id);
          setMarketCap(parseInt(res[0].reserveUSD).toLocaleString());
          setfullyDiluted(parseInt(fullyDiluted).toLocaleString());
          setTotalVolume(parseFloat(totalVolume).toLocaleString());
        } catch (err) {
          console.log('No record found for the paired token');
        }
      }
    }

    getData();
  }, [tokenid]);

  //OneDay
  //below function is used to get 24hrs/oneday before value of the pair token
  useEffect(() => {
    async function getStateData() {
      //call below function to get epoc time stamp
      const epoch = getEpoch();
      const oneDayPrior = epoch - 86400; //take one day prior to the current date
      //call this util function to get uniswap graph data
      const response = await getUniswapGraphData(tokenPair, oneDayPrior);
      //main derive code

      if (response.data.data) {
        try {
          var pairDayDatas = response.data.data.pairDayDatas;
          var pairsData = response.data.data.pairs;

          var oneDayPriorReserverdUSD = pairDayDatas[0].reserveUSD;
          var oneDayPrirorTotalSupply = pairDayDatas[0].totalSupply;
          var currentReserverUsd = pairsData[0].reserveUSD;
          // var currentReserverUsd =
          //   Math.round(parseFloat(pairsData[0].reserveUSD) / 1000000) *
          //   1000000
          var currentTotalSupply = pairsData[0].totalSupply;

          var priorVolume =
            parseFloat(oneDayPriorReserverdUSD) / parseFloat(oneDayPrirorTotalSupply);

          var currentVolume = parseFloat(currentReserverUsd) / parseFloat(currentTotalSupply);

          var oneDayState = ((currentVolume - priorVolume) / priorVolume) * 100; //take the difference

          //set/update value for state variable
          //setSelection(Data)
          //setLoading(false)
          setOneDayReserverUSD(parseFloat(oneDayState).toFixed(2).concat('%'));
        } catch (err) {
          console.log('No record found for the paired token');
        }
      }
    }

    getStateData();
  }, [tokenid]);

  //oneMonthState
  //this query will fetch the current data and based on that will calcuate oneMonth and oneYear state
  useEffect(() => {
    async function getStateData() {
      //call below function to get epoc time stamp
      const epoch = getEpoch();
      const oneMonth = epoch - 2764800; //to fetch one month prior from the current month
      //call this util function to get uniswap graph data
      const response = await getUniswapGraphData(tokenPair, oneMonth);

      //main derive code
      if (response.data.data) {
        try {
          var pairDayData = response.data.data.pairDayDatas;
          var parisData = response.data.data.pairs;

          var priorMonthReserveUSD = pairDayData[0].reserveUSD;
          var priorMonthTotalSupply = pairDayData[0].totalSupply;
          var currentreservedUsd = parisData[0].reserveUSD;
          var currentTotalSupply = parisData[0].totalSupply;

          var oneMonthPirorVolume = priorMonthReserveUSD / priorMonthTotalSupply;

          var currentMonthVolume = currentreservedUsd / currentTotalSupply;
          //calculate to get oneMonth state value
          const oneMonthState =
            ((parseInt(currentMonthVolume) - parseInt(oneMonthPirorVolume)) /
              parseInt(oneMonthPirorVolume)) *
            100;

          //setSelection(Data)
          //setLoading(false)
          setOneMonthState(parseFloat(oneMonthState).toFixed(2).concat('%'));
        } catch (err) {
          console.log('No record found for the paired token');
        }
      }
    }

    getStateData();
  }, [tokenid]);

  //3monthState
  //this query will fetch the three month data and based on that will calcuate the state
  useEffect(() => {
    async function getStateData() {
      //call below function to get epoc time stamp
      const epoch = getEpoch();
      const threeMonth = epoch - 8035200; //take three months before the current month
      //call this util function to get uniswap graph data
      const response = await getUniswapGraphData(tokenPair, threeMonth);
      //Main derive logic
      if (response.data.data) {
        try {
          var pairDayData = response.data.data.pairDayDatas;
          var pairsData = response.data.data.pairs;

          var threeMonthPriorReserverUsd = pairDayData[0].reserveUSD;
          var threeMonthPriorTotalSupply = pairDayData[0].totalSupply;

          var currentReservedUsd = pairsData[0].reserveUSD;
          var currentTotalSupply = pairsData[0].totalSupply;

          var threeMonthPriorVolume = threeMonthPriorReserverUsd / threeMonthPriorTotalSupply;

          var currentVolume = currentReservedUsd / currentTotalSupply;

          let threeMonthState =
            ((parseInt(currentVolume) - parseInt(threeMonthPriorVolume)) /
              parseInt(threeMonthPriorVolume)) *
            100;

          //setSelection(Data)
          //setLoading(false)
          setThreeMonthState(parseFloat(threeMonthState).toFixed(2).concat('%'));
        } catch (err) {
          console.log('No record found for the paired token');
        }
      }
    }

    getStateData();
  }, [tokenid]);

  //One year state
  //this query will fetch the one year prior data and based on that will calcuate the state
  useEffect(() => {
    async function getStateData() {
      //call below function to get epoc time stamp
      const epoch = getEpoch();
      const oneYeartime = epoch - 31536000; //take previous year from the current year
      //call this util function to get uniswap graph data
      const response = await getUniswapGraphData(tokenPair, oneYeartime);
      //Main detail code
      if (response.data.data) {
        try {
          var pairDayData = response.data.data.pairDayDatas;
          var parisData = response.data.data.pairs;

          var oneYearTotalSupply = pairDayData[0].totalSupply;
          var oneYearReserveUSD = pairDayData[0].reserveUSD;

          var currentReservedUsd = parisData[0].reserveUSD;
          var currentTotalSupply = parisData[0].totalSupply;

          var oneYearVolume = oneYearReserveUSD / oneYearTotalSupply;
          var currentVolume = currentReservedUsd / currentTotalSupply;
          //below formula to get onday stats in percentage
          let oneYearState = ((currentVolume - oneYearVolume) / oneYearVolume) * 100;

          //setSelection(Data)
          //setLoading(false)
          setOneYearState(parseFloat(oneYearState).toFixed(2).concat('%'));
        } catch (err) {
          console.log('No record found for the paired token');
        }
      }
    }

    getStateData();
  }, [tokenid]);

  //query to get volume(24hrs) and fees(24hrs)
  useEffect(() => {
    //these query will return the most recent record
    async function getStateData() {
      //call below function to get epoc time stamp
      const epoch = getEpoch();
      const oneDayPrior = epoch - 86400; //take one day prior/24hrs to the current date
      //call this util function to get uniswap graph data
      const response = await getUniswapGraphData(tokenPair, oneDayPrior);
      //main derive code
      if (response.data.data) {
        try {
          var pairDayData = response.data.data.pairDayDatas;
          var volume24Hrs = pairDayData[0].dailyVolumeUSD;
          var fees24Hrs = (volume24Hrs * 0.3) / 100;

          //setSelection(Data)
          //setLoading(false)
          setVolume24Hrs(parseInt(volume24Hrs).toLocaleString());
          setFees24Hrs(parseInt(fees24Hrs).toLocaleString());
        } catch (err) {
          console.log('No record found for the paired token');
        }
      }
    }

    getStateData();
  }, [tokenid]);

  //use the function to get token image
  useEffect(() => {
    async function getData() {
      const epoch = getEpoch();
      let token0ImageId;
      let token1ImageId;
      //call this util function to get uniswap graph data
      try {
        const response = await getUniswapGraphData(tokenPair, epoch);
        if (response.data.data) {
          var res = response.data.data.pairDayDatas;
          token0ImageId = res[0].token0.id;
          token1ImageId = res[0].token1.id;
        }
      } catch (err) {
        console.log('No data found for the give token');
      }

      try {
        const response = await getPoolTokenImage(token0ImageId, token1ImageId);
        //setToken1Image(response[0])
        setToken0Image(response.token0Image);
        setToken1Image(response.token1Image);
      } catch (err) {
        console.log('No record found for the paired token');
      }
    }

    getData();
  }, []);

  //this functin is to get data for each token in the pair to display its status in the UI
  useEffect(() => {
    async function getStateData() {
      //call below function to get epoc time stamp
      const epoch = getEpoch(); //get the current time unix time stamp
      //const oneDayPrior = epoch - 86400 //take one day prior/24hrs to the current date
      //call this util function to get uniswap graph data
      try {
        const response = await getUniswapGraphData(tokenPair, epoch);
        //main derive code
        if (response.data.data) {
          var pairData = response.data.data.pairs;
          //for tokenA ex: DAI
          var token0Reserve = pairData[0].reserve0;
          var token1Price = pairData[0].token1Price;
          //for tokenB ex: WETH
          var token1Reserve = pairData[0].reserve1;
          var token0Price = pairData[0].token0Price;

          setToken0Reserve(parseInt(token0Reserve).toLocaleString());
          setToken1Price(parseFloat(token1Price).toFixed(7));
          setToken1Reserve(parseInt(token1Reserve).toLocaleString());
          setToken0Price(parseFloat(token0Price).toFixed(2));
        }
      } catch (err) {
        console.log('No record found for the paired token');
      }
    }

    getStateData();
  }, []);

  //Below function is used to get USD price for the given token from the api ethplorer
  useEffect(() => {
    async function getStateData() {
      const epoch = getEpoch();
      let token0Address;
      let token1Address;
      //call this util function to get uniswap graph data
      try {
        const response = await getUniswapGraphData(tokenPair, epoch);
        if (response.data.data) {
          var res = response.data.data.pairDayDatas;
          token0Address = res[0].token0.id;
          token1Address = res[0].token1.id;
        }
      } catch (err) {
        console.log('No data found for the give token');
      }
      //get the usd price for the token0
      await axios
        .get(
          `https://api.ethplorer.io/getAddressInfo/${token0Address}?apiKey=EK-qSPda-W9rX7yJ-UY93y`,
          {},
          {}
        )
        .then(async (response) => {

          var tokens = response.data.tokenInfo;

          if (tokens.symbol.toUpperCase() === tokenASymbol) {
            setToken0USDRate(parseFloat(tokens.price.rate).toFixed(2));
          }
        });
      //get the usd price for the token1
      await axios
        .get(
          `https://api.ethplorer.io/getAddressInfo/${token1Address}?apiKey=EK-qSPda-W9rX7yJ-UY93y`,
          {},
          {}
        )
        .then(async (response) => {

          var tokens = response.data.tokenInfo;

          if (tokens.symbol.toUpperCase() === tokenBSymbol) {
            setToken1USDRate(parseFloat(tokens.price.rate).toFixed(2));
          }
        });
    }

    getStateData();
  }, [token0, token1, tokenASymbol, tokenBSymbol]);

  return (
    <Fragment>
      <Wrapper>
        <>
          <div>
            {tokenid && isLightTheme === true ? (
              <LightThemeChart
                isLightTheme={true}
                img={unilogo}
                type={'Uniswap'}
                address={tokenid}
                logo1={token0Image}
                logo2={token1Image}
                symbol1={tokenASymbol}
                symbol2={tokenBSymbol}
                totalValue={'$' + currentMarketCap} />) :
              (<DarkThemeChart
                isLightTheme={false}
                img={unilogo}
                type={'Uniswap'}
                address={tokenid}
                logo1={token0Image}
                logo2={token1Image}
                symbol1={tokenASymbol}
                symbol2={tokenBSymbol}
                totalValue={'$' + currentMarketCap} />)
              }
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
                  <div onClick={() => navigator.clipboard.writeText(tokenASymbol + ' - ' + tokenBSymbol)}>
                    <CopyBlock src={CopyIcon} alt="" />
                  </div>
                </Detail>
              </div>
              <div>
                <DetailTitle>Pair Address</DetailTitle>
                <Detail>
                  <DetailValue>{convertTokenAddress(tokenid)}</DetailValue>
                  <div onClick={() => navigator.clipboard.writeText(tokenid)}>
                    <CopyBlock src={CopyIcon} alt="" />
                  </div>
                </Detail>
              </div>
              <div>
                <DetailTitle>{tokenASymbol} Address</DetailTitle>
                <Detail>
                  <DetailValue>{convertTokenAddress(tokenAId)}</DetailValue>
                  <div onClick={() => navigator.clipboard.writeText(tokenAId)}>
                    <CopyBlock src={CopyIcon} alt="" />
                  </div>
                </Detail>
              </div>
              <div>
                <DetailTitle>{tokenBSymbol} Address</DetailTitle>
                <Detail>
                  <DetailValue>{convertTokenAddress(tokenBId)}</DetailValue>
                  <div onClick={() => navigator.clipboard.writeText(tokenBId)}>
                    <CopyBlock src={CopyIcon} alt="" />
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
                    <DetailTitle>{oneYearState}</DetailTitle>
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
            <BlockTitle>About</BlockTitle>
            <div style={{ textAlign: 'justify', opacity: '0.5' }}>{isHiddenText ? cutInfo(info) : info}</div>
            {info.length > 300 && (
              <ShowMoreBlock>
                <ShowMore isLightTheme={isLightTheme} onClick={hideText}>{isHiddenText ? 'Show More' : 'Hide'}</ShowMore>
              </ShowMoreBlock>
            )}
          </AboutBlock>
        </>
      </Wrapper>
    </Fragment>
  );
}
