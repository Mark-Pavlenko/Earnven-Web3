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
  CopyBlock,
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
  Wrapper,
} from '../liquidityPoolDetails/style';
import CopyIcon from '../../assets/icons/copy-address.svg';
import DarkThemeChart from '../liquidityPoolDetails/darkThemeChart/darkThemeChart';
import { useSelector } from 'react-redux';

const info =
  'SushiSwap enables the buying and selling of different cryptocurrencies between users. 0.3% in fees is charged for facilitating each swap, with 0.25% going to liquidity providers and 0.05% being converted to SUSHI and distributed to users holding the SUSHI token. SUSHI tokens also entitle their holders to continue earning a portion of fees, even after they’ve stopped actively providing liquidity. SushiSwap enables the buying and selling of different cryptocurrencies between users. 0.3% in fees is charged for facilitating each swap, with 0.25% going to liquidity providers and 0.05% being converted to SUSHI and distributed to users holding the SUSHI token. SUSHI tokens also entitle their holders to continue earning a portion of fees, even after they’ve stopped actively providing liquidity.';

export default function Chart(props) {
  console.log('Chart(props)', props);
  const [Data, setData] = useState([]); // UNI V2 Pools
  const [Loading, setLoading] = useState(false);
  const [Page, setPage] = useState('');
  const { token0, token1, token0Symbol, token1Symbol } = props;
  const [isHiddenText, setIsHiddenText] = useState(true);

  const hideText = () => {
    setIsHiddenText(!isHiddenText);
  };
  const cutInfo = (info) => {
    return info.slice(0, 500) + '...';
  };
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

  const [tokenASymbol, setTokenASymbol] = useState();
  const [tokenBSymbol, setTokenBSymbol] = useState();
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

  // const { tokenid } = useParams()

  const currentReserve = 0;

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
        console.log('getUniswapGraphData', response);
        // main derive code
        if (response.data.data) {
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
          setTokenASymbol(token0);
          setTokenBSymbol(token1);
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
        // main derive code
        if (response.data.data) {
          const pairDayData = response.data.data.pairDayDatas;
          const volume24Hrs = pairDayData[0].volumeUSD;
          const fees24Hrs = (volume24Hrs * 0.3) / 100;

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
        // main derive code
        if (response.data.data) {
          const pairData = response.data.data.pairs;
          // for tokenA ex: DAI
          const token0Reserve = pairData[0].reserve0;
          const { token1Price } = pairData[0];
          // for tokenB ex: WETH
          const token1Reserve = pairData[0].reserve1;
          const { token0Price } = pairData[0];

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
          const tokens = response.data.tokenInfo;
          if (tokens.symbol.toUpperCase() === tokenASymbol) {
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
          const tokens = response.data.tokenInfo;

          if (tokens.symbol.toUpperCase() === tokenBSymbol) {
            setToken1USDRate(parseFloat(tokens.price.rate).toFixed(2));
          }
        });
    }
    getStateData();
  }, [token0, token1, tokenASymbol, tokenBSymbol]);

  return (
    <>
      <Wrapper>
        <>
          <div>
            {tokenPairId && isLightTheme === true ? (
              <LightThemeChart
                isLightTheme={true}
                img={SushiSwapLogo}
                type={'Sushiswap'}
                logo1={token0Image}
                logo2={token1Image}
                symbol1={token0Symbol}
                symbol2={token1Symbol}
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
                symbol1={token0Symbol}
                symbol2={token1Symbol}
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
                  <div
                    onClick={() =>
                      navigator.clipboard.writeText(tokenASymbol + ' - ' + tokenBSymbol)
                    }>
                    <CopyBlock src={CopyIcon} alt="" />
                  </div>
                </Detail>
              </div>
              <div>
                <DetailTitle>Pair Address</DetailTitle>
                <Detail>
                  <DetailValue>{convertTokenAddress(tokenPairId)}</DetailValue>
                  <div onClick={() => navigator.clipboard.writeText(tokenPairId)}>
                    <CopyBlock src={CopyIcon} alt="" />
                  </div>
                </Detail>
              </div>
              <div>
                <DetailTitle>{tokenASymbol} Address</DetailTitle>
                <Detail>
                  <DetailValue>{convertTokenAddress(token0)}</DetailValue>
                  <div onClick={() => navigator.clipboard.writeText(token0)}>
                    <CopyBlock src={CopyIcon} alt="" />
                  </div>
                </Detail>
              </div>
              <div>
                <DetailTitle>{tokenBSymbol} Address</DetailTitle>
                <Detail>
                  <DetailValue>{convertTokenAddress(token1)}</DetailValue>
                  <div onClick={() => navigator.clipboard.writeText(token1)}>
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
            <BlockTitle>About</BlockTitle>
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
      </Wrapper>
    </>
  );
}
