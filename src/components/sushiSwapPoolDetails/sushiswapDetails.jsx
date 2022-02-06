import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import getUniswapGraphData from './getPoolDetailGraphData';
import getPoolTokenImage from '../liquidityPoolDetails/getPoolTokenImage';
import axios from 'axios';
import LightThemeChart from '../portfolioperf/components/lightThemeChart/lightThemeChart';
import {
  BlockTitle,
  CompareTokens,
  Detail,
  DetailTitle,
  DetailValue,
  PairDetails,
  PairInfo,
  Stats,
  StatsItems,
  StatsWrapper,
  SupplyTokens,
  Token,
  TokenImage,
  TokenImageBlock,
  TokenPrice,
  TokensInfo,
} from '../liquidityPoolDetails/style';
import CopyIcon from '../../assets/icons/copy-address.svg';
import ABISUSHI from './ABISUSHI.json';
import Web3 from 'web3';

export const SushiswapDetails = ({ address, token0, token1, tokenid }) => {
  const [tokens, setTokens] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [statsDay, setStatsDay] = useState('');
  const [statsMonth, setStatsMonth] = useState('');
  const [statsThreeMonths, setStatsThreeMonths] = useState('');
  const [statsYear, setStatsYear] = useState('');
  const [statsVolume, setStatsVolume] = useState('');
  const [statsFees, setStatsFees] = useState('');
  const [token0Rate, setToken0Rate] = useState('');
  const [token1Rate, setToken1Rate] = useState('');
  // const [token0, setToken0] = useState('');
  // const [token1, setToken1] = useState('');
  console.log('asdnasifjio', address, token0, token1, tokenid);
  // const pairAddress = useParams();
  // // const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);
  // async function loadWeb3() {
  //   if (window.ethereum) {
  //     window.web3 = new Web3(window.ethereum);
  //     await window.ethereum.enable();
  //   } else if (window.web3) {
  //     window.web3 = new Web3(window.web3.currentProvider);
  //   } else {
  //     window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
  //   }
  // }

  // const getEpoch = () => {
  //   var d = new Date();
  //   var day = d.getUTCDate();
  //   var month = d.getUTCMonth();
  //   var year = d.getUTCFullYear();
  //   var offset = new Date(year, month, day).getTimezoneOffset() * 60;
  //   var epoch = new Date(year, month, day).getTime() / 1000 - offset;
  //   return epoch;
  // };

  // const loadData = async () => {
  //   const epoch = getEpoch();
  //   await loadWeb3();
  //   const web3 = window.web3;
  //   const tokensInfo = new web3.eth.Contract(ABISUSHI, pairAddress.tokenid);
  //   const token0Info = await tokensInfo.methods.token0().call();
  //   const token1Info = await tokensInfo.methods.token1().call();
  //   let images = {};
  //   const response = await getUniswapGraphData(token0Info, token1Info, epoch);
  //
  //   // try {
  //   //   const imgRes = await getPoolTokenImage(
  //   //     response.data.data.pairDayDatas[0].token0.id,
  //   //     response.data.data.pairDayDatas[0].token1.id
  //   //   );
  //   //   images = { ...imgRes };
  //   // } catch (err) {
  //   //   console.log('No record found for the paired token');
  //   // }
  //   return response;
  //   // return { ...response, ...images };
  // };
  //
  // const getStatsData = async (value) => {
  //   const epoch = getEpoch();
  //   const response = await getSushiswapGraphData(token0, token1, epoch);
  //
  //   if (response.data.data) {
  //     const currentTotalSupply = response.data.data.pairs[0].totalSupply;
  //     const currentReserverUsd = response.data.data.pairs[0].reserveUSD;
  //
  //     const oneDayPrirorTotalSupply = response.data.data.pairDayDatas[0]?.totalSupply;
  //     const oneDayPriorReserverdUSD = response.data.data.pairDayDatas[0]?.reserveUSD;
  //
  //     const priorVolume = parseFloat(oneDayPriorReserverdUSD) / parseFloat(oneDayPrirorTotalSupply);
  //
  //     const currentVolume = parseFloat(currentReserverUsd) / parseFloat(currentTotalSupply);
  //     console.log('yathebest', currentTotalSupply, oneDayPrirorTotalSupply, response.data.data);
  //     let oneDayState = '';
  //
  //     if (!isNaN(((currentVolume - priorVolume) / priorVolume) * 100)) {
  //       oneDayState = parseFloat(((currentVolume - priorVolume) / priorVolume) * 100)
  //         .toFixed(2)
  //         .concat('%');
  //     } else {
  //       oneDayState = '0%';
  //     }
  //
  //     switch (value) {
  //       case 86400:
  //         setStatsDay(oneDayState);
  //         setStatsVolume(
  //           parseInt(response.data.data.pairDayDatas[0]?.dailyVolumeUSD).toLocaleString('ja-JP')
  //         );
  //         setStatsFees(
  //           parseInt(
  //             (response.data.data.pairDayDatas[0]?.dailyVolumeUSD * 0.3) / 100
  //           ).toLocaleString('ja-JP')
  //         );
  //
  //         break;
  //       case 2764800:
  //         setStatsMonth(oneDayState);
  //         break;
  //       case 8035200:
  //         setStatsThreeMonths(oneDayState);
  //         break;
  //       case 31536000:
  //         setStatsYear(oneDayState);
  //         break;
  //     }
  //   }
  // };
  //
  // const getRateData = async (address, symbol, type) => {
  //   await axios
  //     .get(
  //       `https://api.ethplorer.io/getAddressInfo/${address}?apiKey=EK-qSPda-W9rX7yJ-UY93y`,
  //       {},
  //       {}
  //     )
  //     .then(async (response) => {
  //       const tokens = response.data.tokenInfo;
  //       if (tokens.symbol.toUpperCase() === symbol) {
  //         if (type === 'first') {
  //           setToken0Rate(parseFloat(tokens.price.rate).toFixed(2));
  //         }
  //
  //         if (type === 'second') {
  //           setToken1Rate(parseFloat(tokens.price.rate).toFixed(2));
  //         }
  //       }
  //     });
  // };

  // const convertTokenAddress = (address) => {
  //   if (address) {
  //     return `${address.slice(0, 6)}...${address.slice(address.length - 4, address.length)}`;
  //   }
  // };

  // const getAllTokenInfo = async () => {
  //   await loadWeb3();
  //   const web3 = window.web3;
  //   const tokensInfo = new web3.eth.Contract(ABISUSHI, pairAddress.tokenid);
  //   const token0Info = await tokensInfo.methods.token0().call();
  //   const token1Info = await tokensInfo.methods.token1().call();
  //   return { token0Info, token1Info };
  // };

  // useEffect(() => {
  // getAllTokenInfo().then((res) => {
  //   console.log('asdasqwklq', res);
  // });
  // setIsLoading(true);
  // loadData().then((res) => {
  //   console.log('asdkjasndakjsd', res);
  // if (res) {
  //   setTokens({ ...res.data.data, token0Logo: res.token0Image, token1Logo: res.token1Image });
  //   getRateData(
  //     res.data.data.pairDayDatas[0].token0.id,
  //     res.data.data.pairDayDatas[0].token0.symbol,
  //     'first'
  //   );
  //   getRateData(
  //     res.data.data.pairDayDatas[0].token1.id,
  //     res.data.data.pairDayDatas[0].token1.symbol,
  //     'second'
  //   );
  //   setIsLoading(false);
  // }
  // });
  // getStatsData(86400);
  // getStatsData(2764800);
  // getStatsData(8035200);
  // getStatsData(31536000);
  // }, []);
  //
  // const convertNumber = (value) => {
  //   return parseInt(value).toLocaleString('ja-JP');
  // };

  return (
    <div>123</div>
    // <div style={{ padding: '32px 0' }}>
    //   {!isLoading && Object.keys(tokens).length > 0 && (
    //     <>
    //       <div>
    //         <LightThemeChart
    //           address={pairAddress.tokenid}
    //           totalValue={'$' + parseInt(tokens.pairDayDatas[0].reserveUSD).toLocaleString('ja-JP')}
    //         />
    //       </div>
    //       <TokensInfo>
    //         <Token isLightTheme={isLightTheme}>
    //           <TokenImageBlock>
    //             <div>
    //               <TokenImage src={`https://ethplorer.io${tokens.token0Logo}`} alt="" />
    //             </div>
    //             <TokenPrice>
    //               {convertNumber(tokens.pairs[0].reserve0) +
    //                 ' ' +
    //                 tokens.pairDayDatas[0].token0.symbol}
    //             </TokenPrice>
    //           </TokenImageBlock>
    //           <CompareTokens>
    //             {'1 ' +
    //               tokens.pairDayDatas[0].token0.symbol +
    //               ' = ' +
    //               parseFloat(tokens.pairs[0].token1Price).toFixed(
    //                 tokens.pairs[0].token1Price > 1 ? 2 : 7
    //               ) +
    //               ' ' +
    //               tokens.pairDayDatas[0].token1.symbol +
    //               ` ($${token0Rate})`}
    //           </CompareTokens>
    //         </Token>
    //         <Token isLightTheme={isLightTheme}>
    //           <TokenImageBlock>
    //             <div>
    //               <TokenImage src={`https://ethplorer.io${tokens.token1Logo}`} alt="" />
    //             </div>
    //             <TokenPrice>
    //               {convertNumber(tokens.pairs[0].reserve1)} {tokens.pairDayDatas[0].token1.symbol}
    //             </TokenPrice>
    //           </TokenImageBlock>
    //           <CompareTokens>
    //             {'1 ' +
    //               tokens.pairDayDatas[0].token1.symbol +
    //               ' = ' +
    //               parseFloat(tokens.pairs[0].token0Price).toFixed(
    //                 tokens.pairs[0].token0Price > 1 ? 2 : 7
    //               ) +
    //               ' ' +
    //               tokens.pairDayDatas[0].token0.symbol +
    //               ` ($${token1Rate})`}
    //           </CompareTokens>
    //         </Token>
    //       </TokensInfo>
    //       <PairInfo isLightTheme={isLightTheme}>
    //         <BlockTitle onClick={loadData}>Pair Information</BlockTitle>
    //         <PairDetails>
    //           <div>
    //             <DetailTitle>Pair Name</DetailTitle>
    //             <Detail>
    //               <DetailValue>
    //                 {tokens.pairDayDatas[0].token0.symbol +
    //                   ' - ' +
    //                   tokens.pairDayDatas[0].token1.symbol}
    //               </DetailValue>
    //               <div onClick={() => navigator.clipboard.writeText('123123123')}>
    //                 <img src={CopyIcon} alt="" />
    //               </div>
    //             </Detail>
    //           </div>
    //           <div>
    //             <DetailTitle>Pair Address</DetailTitle>
    //             <Detail>
    //               <DetailValue>{convertTokenAddress(pairAddress.tokenid)}</DetailValue>
    //               <div>
    //                 <img src={CopyIcon} alt="" />
    //               </div>
    //             </Detail>
    //           </div>
    //           <div>
    //             <DetailTitle>{tokens.pairDayDatas[0].token0.symbol} Address</DetailTitle>
    //             <Detail>
    //               <DetailValue>{convertTokenAddress(tokens.pairDayDatas[0].token0.id)}</DetailValue>
    //               <div>
    //                 <img src={CopyIcon} alt="" />
    //               </div>
    //             </Detail>
    //           </div>
    //           <div>
    //             <DetailTitle>{tokens.pairDayDatas[0].token1.symbol} Address</DetailTitle>
    //             <Detail>
    //               <DetailValue>{convertTokenAddress(tokens.pairDayDatas[0].token1.id)}</DetailValue>
    //               <div>
    //                 <img src={CopyIcon} alt="" />
    //               </div>
    //             </Detail>
    //           </div>
    //         </PairDetails>
    //       </PairInfo>
    //       <Stats isLightTheme={isLightTheme}>
    //         <BlockTitle>Stats</BlockTitle>
    //         <StatsWrapper>
    //           <SupplyTokens>
    //             <div>1</div>
    //             <div>2</div>
    //           </SupplyTokens>
    //           <StatsItems>
    //             <div>
    //               <DetailValue>1 day</DetailValue>
    //               <Detail>
    //                 <DetailTitle>{statsDay}</DetailTitle>
    //               </Detail>
    //             </div>
    //             <div>
    //               <DetailValue>1 month</DetailValue>
    //               <Detail>
    //                 <DetailTitle>{statsMonth}</DetailTitle>
    //               </Detail>
    //             </div>
    //             <div>
    //               <DetailValue>3 months</DetailValue>
    //               <Detail>
    //                 <DetailTitle>{statsThreeMonths}</DetailTitle>
    //               </Detail>
    //             </div>
    //             <div>
    //               <DetailValue>1 year</DetailValue>
    //               <Detail>
    //                 <DetailTitle>{statsYear}</DetailTitle>
    //               </Detail>
    //             </div>
    //             <div>
    //               <DetailValue>Market Cap</DetailValue>
    //               <Detail>
    //                 <DetailTitle>
    //                   {parseInt(tokens.pairDayDatas[0].reserveUSD).toLocaleString('ja-JP')}
    //                 </DetailTitle>
    //               </Detail>
    //             </div>
    //             <div>
    //               <DetailValue>Fully Diluted</DetailValue>
    //               <Detail>
    //                 <DetailTitle>
    //                   {parseInt(
    //                     (tokens.pairDayDatas[0].reserveUSD / tokens.pairDayDatas[0].totalSupply) *
    //                       tokens.pairDayDatas[0].totalSupply
    //                   ).toLocaleString('ja-JP')}
    //                 </DetailTitle>
    //               </Detail>
    //             </div>
    //             <div>
    //               <DetailValue>Volume (24hrs)</DetailValue>
    //               <Detail>
    //                 <DetailTitle>{statsVolume}</DetailTitle>
    //               </Detail>
    //             </div>
    //             <div>
    //               <DetailValue>Fees (24hrs)</DetailValue>
    //               <Detail>
    //                 <DetailTitle>{statsFees}</DetailTitle>
    //               </Detail>
    //             </div>
    //           </StatsItems>
    //         </StatsWrapper>
    //       </Stats>
    //     </>
    //   )}
    // </div>
  );
};
