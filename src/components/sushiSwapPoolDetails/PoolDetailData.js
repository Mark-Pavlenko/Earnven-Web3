// import { ResponsiveLine } from '@nivo/line'
// eslint-disable-next-line
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import parse from 'html-react-parser'
import { useParams } from 'react-router-dom'
import ShowMoreText from 'react-show-more-text'
import TransparentButton from '../TransparentButton/index'
import { MobileView, BrowserView } from 'react-device-detect'
import Apexchart from '../../components/Chart/Apexchart'
import {
  Typography,
  Stack,
  Grid,
  Box,
  Container,
  TextField,
} from '@material-ui/core'
import {
  // ChartDataTwentyFour,
  // ChartDataOneWeek,
  // ChartDataOneMonth,
  ChartAllData,
} from '../../components/Chart/ChartDataFetch/ChartDataFetch'

import ExchangeMini from '../exchengeMini/exchange'
import { LoadingButton } from '@material-ui/lab'
import { fontStyle } from '@material-ui/system'
import SushiSwapLogo from '../../assets/icons/Sushiswap.webp'
import PoolDetailChart from './PoolDetailsChart'

const getUniswapGraphData = require('./getPoolDetailGraphData')
  .getUniswapGraphData

const getPoolTokenImage = require('./getPoolTokenImage').getPoolTokenImage

export default function Chart(props) {
  console.log('I am inside the sushi pool details page')
  const [Data, setData] = useState([]) //UNI V2 Pools
  const [Loading, setLoading] = useState(false)
  const [Page, setPage] = useState('')

  const { token0 } = useParams()
  const { token1 } = useParams()
  // const { tokenid } = useParams()
  // const [tokenPair0, setTokenPair0] = useState()
  // const [tokenPair1, setTokenPair1] = useState()
  //const tokenid = props.tokenid

  var accounts = props.address
  var tokenPairId = props.tokenid
  //var tokenPair = tokenid //getting from useParams()

  const [Price, setPrice] = useState(null)
  const [Selection, setSelection] = useState(null)
  // eslint-disable-next-line
  const [View, setView] = useState('Month View')

  const [pairOftoke0, setToken0] = useState()
  const [pairOftoke1, setToken1] = useState()
  const [currentMarketCap, setMarketCap] = useState(0)
  const [totalVolume, setTotalVolume] = useState('')
  const [fullyDiluted, setfullyDiluted] = useState(0)
  const [oneMonthState, setOneMonthState] = useState(0)
  const [threeMonthState, setThreeMonthState] = useState(0)
  const [oneYearState, setOneYearState] = useState(0)
  const [volume24Hrs, setVolume24Hrs] = useState(0)
  const [fees24Hrs, setFees24Hrs] = useState(0)
  const [oneDayReserverUSD, setOneDayReserverUSD] = useState(0)
  const [token0Image, setToken0Image] = useState()
  const [token1Image, setToken1Image] = useState()
  const [token0Reserve, setToken0Reserve] = useState()
  const [token1Reserve, setToken1Reserve] = useState()
  const [token0Price, setToken0Price] = useState()
  const [token1Price, setToken1Price] = useState()
  const [token0USDRate, setToken0USDRate] = useState()
  const [token1USDRate, setToken1USDRate] = useState()

  //const [tokenPairId, setTokenPairId] = useState(tokenid)

  // var tokenA = tokenid //getting from useParams()
  //console.log('From sushi pool detail page token0-', token0)
  //console.log('From sushi pool detail page token1-', token1)
  //console.log('sushi lp pair token -', tokenid)
  console.log('sushi lp pair address -', accounts)

  //const { tokenid } = useParams()

  let currentReserve = 0
  //console.log('Prabha Accounts -', accounts)
  //console.log(' Prabha tokenPair from main page-', tokenPair)
  //console.log('Prabha tokenPair from main detail page-', tokenid)

  function executeOnClick(isExpanded) {
    console.log(isExpanded)
  }

  //function to get epoch time stamp
  const getEpoch = () => {
    var d = new Date()
    var day = d.getUTCDate()
    var month = d.getUTCMonth()
    var year = d.getUTCFullYear()
    var offset = new Date(year, month, day).getTimezoneOffset() * 60
    var epoch = new Date(year, month, day).getTime() / 1000 - offset
    return epoch
  }

  //This function is to get MarketCap  and FullyDiluted
  //this hook is used to get uniswap pool detail data from the graph for the sepecific pool token
  //this function is used to get the current market cap value
  useEffect(() => {
    setLoading(true)

    //function to fetch current pool data from graph
    async function getData() {
      //call below function to get epoc time stamp
      const epoch = getEpoch()
      //call this util function to get uniswap graph data
      try {
        const response = await getUniswapGraphData(token0, token1, epoch)
        //console.log('uniswap data', response)

        //main derive code
        if (response.data.data) {
          console.log('I am inside the sushi data deriven section')
          console.log(
            'Sushi data from detail page',
            response.data.data.pairDayDatas,
          )

          var res = response.data.data.pairDayDatas
          let token0 = res[0].token0.symbol
          let token1 = res[0].token1.symbol

          //assing the current reserver to the local variable to get 24hrs difference
          //currentReserve = res[0].reserveUSD
          //get current market price by giving below formula
          let totalVolume = res[0].reserveUSD / res[0].totalSupply

          //to get fullydiluted value muliply totalMarketValue with current market price
          let fullyDiluted = totalVolume * res[0].totalSupply //total market value * with market price

          //set/update value for state varaible

          //setSelection(Data)
          setLoading(false)
          setToken0(token0)
          setToken1(token1)
          setMarketCap(parseInt(res[0].reserveUSD).toLocaleString())
          setfullyDiluted(parseInt(fullyDiluted).toLocaleString())
          setTotalVolume(parseFloat(totalVolume).toLocaleString())
        }
      } catch (err) {
        console.log('No record found for the paired token')
      }
    }
    getData()
  }, [])

  //OneDay
  //below function is used to get 24hrs/oneday before value of the pair token
  useEffect(() => {
    async function getStateData() {
      //call below function to get epoc time stamp
      const epoch = getEpoch()
      const oneDayPrior = epoch - 86400 //take one day prior to the current date
      //call this util function to get uniswap graph data
      try {
        const response = await getUniswapGraphData(token0, token1, oneDayPrior)
        //main derive code

        if (response.data.data) {
          var pairDayDatas = response.data.data.pairDayDatas
          var pairsData = response.data.data.pairs

          var oneDayPriorReserverdUSD = pairDayDatas[0].reserveUSD
          var oneDayPrirorTotalSupply = pairDayDatas[0].totalSupply
          var currentReserverUsd = pairsData[0].reserveUSD
          // var currentReserverUsd =
          //   Math.round(parseFloat(pairsData[0].reserveUSD) / 1000000) *
          //   1000000
          var currentTotalSupply = pairsData[0].totalSupply

          var priorVolume =
            parseFloat(oneDayPriorReserverdUSD) /
            parseFloat(oneDayPrirorTotalSupply)

          var currentVolume =
            parseFloat(currentReserverUsd) / parseFloat(currentTotalSupply)

          var oneDayState = ((currentVolume - priorVolume) / priorVolume) * 100 //take the difference

          //set/update value for state variable
          //setSelection(Data)
          //setLoading(false)
          setOneDayReserverUSD(parseFloat(oneDayState).toFixed(2).concat('%'))
        }
      } catch (err) {
        console.log('No record found for the paired token')
      }
    }
    getStateData()
  }, [])

  //oneMonthState
  //this query will fetch the current data and based on that will calcuate oneMonth and oneYear state
  useEffect(() => {
    async function getStateData() {
      //call below function to get epoc time stamp
      const epoch = getEpoch()
      const oneMonth = epoch - 2764800 //to fetch one month prior from the current month
      //call this util function to get uniswap graph data
      try {
        const response = await getUniswapGraphData(token0, token1, oneMonth)

        //main derive code
        if (response.data.data) {
          var pairDayData = response.data.data.pairDayDatas
          var parisData = response.data.data.pairs

          var priorMonthReserveUSD = pairDayData[0].reserveUSD
          var priorMonthTotalSupply = pairDayData[0].totalSupply
          var currentreservedUsd = parisData[0].reserveUSD
          var currentTotalSupply = parisData[0].totalSupply

          var oneMonthPirorVolume = priorMonthReserveUSD / priorMonthTotalSupply

          var currentMonthVolume = currentreservedUsd / currentTotalSupply
          //calculate to get oneMonth state value
          const oneMonthState =
            ((parseInt(currentMonthVolume) - parseInt(oneMonthPirorVolume)) /
              parseInt(oneMonthPirorVolume)) *
            100

          //setSelection(Data)
          //setLoading(false)
          setOneMonthState(parseFloat(oneMonthState).toFixed(2).concat('%'))
        }
      } catch (err) {
        console.log('No record found for the paired token')
      }
    }
    getStateData()
  }, [])

  //3monthState
  //this query will fetch the three month data and based on that will calcuate the state
  useEffect(() => {
    async function getStateData() {
      //call below function to get epoc time stamp
      const epoch = getEpoch()
      const threeMonth = epoch - 8035200 //take three months before the current month
      //call this util function to get uniswap graph data
      try {
        const response = await getUniswapGraphData(token0, token1, threeMonth)
        //Main derive logic
        if (response.data.data) {
          var pairDayData = response.data.data.pairDayDatas
          var pairsData = response.data.data.pairs

          var threeMonthPriorReserverUsd = pairDayData[0].reserveUSD
          var threeMonthPriorTotalSupply = pairDayData[0].totalSupply

          var currentReservedUsd = pairsData[0].reserveUSD
          var currentTotalSupply = pairsData[0].totalSupply

          var threeMonthPriorVolume =
            threeMonthPriorReserverUsd / threeMonthPriorTotalSupply

          var currentVolume = currentReservedUsd / currentTotalSupply

          let threeMonthState =
            ((parseInt(currentVolume) - parseInt(threeMonthPriorVolume)) /
              parseInt(threeMonthPriorVolume)) *
            100

          //setSelection(Data)
          //setLoading(false)
          setThreeMonthState(parseFloat(threeMonthState).toFixed(2).concat('%'))
        }
      } catch (err) {
        console.log('No record found for the paired token')
      }
    }
    getStateData()
  }, [])

  //One year state
  //this query will fetch the one year prior data and based on that will calcuate the state
  useEffect(() => {
    async function getStateData() {
      //call below function to get epoc time stamp
      const epoch = getEpoch()
      const oneYeartime = epoch - 31536000 //take previous year from the current year
      //call this util function to get uniswap graph data
      try {
        const response = await getUniswapGraphData(token0, token1, oneYeartime)
        //Main detail code
        if (response.data.data) {
          var pairDayData = response.data.data.pairDayDatas
          var parisData = response.data.data.pairs

          var oneYearTotalSupply = pairDayData[0].totalSupply
          var oneYearReserveUSD = pairDayData[0].reserveUSD

          var currentReservedUsd = parisData[0].reserveUSD
          var currentTotalSupply = parisData[0].totalSupply

          var oneYearVolume = oneYearReserveUSD / oneYearTotalSupply
          var currentVolume = currentReservedUsd / currentTotalSupply
          //below formula to get onday stats in percentage
          let oneYearState =
            ((currentVolume - oneYearVolume) / oneYearVolume) * 100

          // console.log('Infinity Logic to currentVolume', currentVolume)
          // console.log('Infinity Logic to oneYearVolume', oneYearVolume)
          // console.log('Infinity one year state', oneYearState)

          //setSelection(Data)
          //setLoading(false)
          setOneYearState(parseFloat(oneYearState).toFixed(2))
        }
      } catch (err) {
        console.log('No record found for the paired token')
      }
    }
    getStateData()
  }, [])

  //query to get volume(24hrs) and fees(24hrs)
  useEffect(() => {
    //these query will return the most recent record
    async function getStateData() {
      //call below function to get epoc time stamp
      const epoch = getEpoch() //get the current time unix time stamp
      //const oneDayPrior = epoch - 86400 //take one day prior/24hrs to the current date
      //call this util function to get uniswap graph data
      try {
        const response = await getUniswapGraphData(token0, token1, epoch)
        //console.log('One day prior-', oneDayPrior)
        //main derive code
        if (response.data.data) {
          var pairDayData = response.data.data.pairDayDatas
          var volume24Hrs = pairDayData[0].volumeUSD
          var fees24Hrs = (volume24Hrs * 0.3) / 100

          console.log('volume24Hrs', volume24Hrs)
          console.log('fees24Hrs', fees24Hrs)

          //setSelection(Data)
          //setLoading(false)
          setVolume24Hrs(parseInt(volume24Hrs).toLocaleString())
          setFees24Hrs(parseInt(fees24Hrs).toLocaleString())
        }
      } catch (err) {
        console.log('No record found for the paired token')
      }
    }
    getStateData()
  }, [])
  //use the function to get token image
  useEffect(() => {
    async function getData() {
      try {
        const response = await getPoolTokenImage(token0, token1)
        //setToken1Image(response[0])
        //console.log('Token A image data', response.token0Image)
        //console.log('Token B image data', response.token1Image)
        setToken0Image(response.token0Image)
        setToken1Image(response.token1Image)
      } catch (err) {
        console.log('No record found for the paired token')
      }
    }
    getData()
  }, [])

  //this functin is to get data for each token in the pair to display its status in the UI
  useEffect(() => {
    async function getStateData() {
      //call below function to get epoc time stamp
      const epoch = getEpoch() //get the current time unix time stamp
      //const oneDayPrior = epoch - 86400 //take one day prior/24hrs to the current date
      //call this util function to get uniswap graph data
      try {
        const response = await getUniswapGraphData(token0, token1, epoch)
        console.log('for current day epoch-', epoch)
        //main derive code
        if (response.data.data) {
          var pairData = response.data.data.pairs
          //for tokenA ex: DAI
          var token0Reserve = pairData[0].reserve0
          var token1Price = pairData[0].token1Price
          //for tokenB ex: WETH
          var token1Reserve = pairData[0].reserve1
          var token0Price = pairData[0].token0Price

          console.log('token0Reserve', token0Reserve)
          console.log('token1Price', token1Price)
          setToken0Reserve(parseInt(token0Reserve).toLocaleString())
          setToken1Price(parseFloat(token1Price).toFixed(7))
          setToken1Reserve(parseInt(token1Reserve).toLocaleString())
          setToken0Price(parseFloat(token0Price).toFixed(2))
        }
      } catch (err) {
        console.log('No record found for the paired token')
      }
    }
    getStateData()
  }, [])

  //Below function is used to get USD price for the given token from the api ethplorer
  useEffect(() => {
    async function getStateData() {
      //get the usd price for the token0
      await axios
        .get(
          `https://api.ethplorer.io/getAddressInfo/${token0}?apiKey=EK-qSPda-W9rX7yJ-UY93y`,
          {},
          {},
        )
        .then(async (response) => {
          // console.log(response)

          var tokens = response.data.tokenInfo
          //console.log('ethplorer data', tokens)
          console.log('Token0 sumbol', pairOftoke0)
          console.log(
            `token price for ${tokens.symbol.toUpperCase()}`,
            tokens.price.rate,
          )
          if (tokens.symbol.toUpperCase() === pairOftoke0) {
            console.log(`token price for ${pairOftoke0}`, tokens.price.rate)
            setToken0USDRate(parseFloat(tokens.price.rate).toFixed(2))
          }
        })
      //get the usd price for the token1
      await axios
        .get(
          `https://api.ethplorer.io/getAddressInfo/${token1}?apiKey=EK-qSPda-W9rX7yJ-UY93y`,
          {},
          {},
        )
        .then(async (response) => {
          // console.log(response)

          var tokens = response.data.tokenInfo
          //console.log('ethplorer data', tokens)
          console.log('Token0 sumbol', pairOftoke1)
          console.log(
            `token price for ${tokens.symbol.toUpperCase()}`,
            tokens.price.rate,
          )

          if (tokens.symbol.toUpperCase() === pairOftoke1) {
            console.log(`token price for ${pairOftoke1}`, tokens.price.rate)
            setToken1USDRate(parseFloat(tokens.price.rate).toFixed(2))
          }
        })
    }
    getStateData()
  }, [token0, token1, pairOftoke0, pairOftoke1])

  return (
    <Grid container>
      <Grid item md={8}>
        <Container>
          <Box sx={{ mt: 4, mb: 3 }}>
            <div>
              {Loading ? (
                <center> Loading...</center>
              ) : (
                <div>
                  <Box sx={{ width: '100%' }}>
                    <center>
                      <h2 style={{ fontSize: '40px', color: 'white' }}>
                        Liquidity Pool Details
                      </h2>
                    </center>
                  </Box>
                  <center>
                    <h2>
                      <img
                        style={{
                          height: '30px',
                          width: '30px',
                          display: 'inline-block',
                        }}
                        title="Sushiswap"
                        src={SushiSwapLogo}
                        alt=""
                      />
                      &nbsp; Sushiswap
                    </h2>
                  </center>
                  <br />
                  <div>
                    <img
                      style={{
                        height: '30px',
                        width: '30px',
                        display: 'inline-block',
                      }}
                      src={`https://ethplorer.io${token0Image}`}
                    />
                    <img
                      style={{
                        height: '30px',
                        width: '30px',
                        display: 'inline-block',
                      }}
                      src={`https://ethplorer.io${token1Image}`}
                    />
                    &nbsp;
                    <h3
                      style={{
                        marginBottom: '2rem 0',
                        display: 'inline-block',
                      }}
                    >
                      {pairOftoke0}-{pairOftoke1}
                    </h3>
                  </div>
                  <h4
                    style={{
                      fontFamily: 'sans-serif',
                      color: 'wheat',
                      fontSize: '15px',
                    }}
                  >
                    {tokenPairId}
                  </h4>

                  <div
                    style={{
                      width: '100%',
                      margin: 'auto',
                      marginLeft: '10px',
                    }}
                  >
                    {/*Blow logic is to implement pair's individual token detials  */}
                    <div
                      style={{
                        // marginLeft:'25px',
                        width: '49%',
                        marginTop: '15px',
                        minWidth: '30px',
                        border: '1px solid rgb(115, 115, 115)',
                        height: '80px',
                        minHeight: '50px',
                        borderRadius: '20px',
                        display: 'inline-block',
                        margin: '1rem 0',
                      }}
                    >
                      <div style={{ marginTop: '10px', padding: '0 1rem' }}>
                        <img
                          style={{
                            height: '20px',
                            width: '25px',
                            display: 'inline-block',
                          }}
                          src={`https://ethplorer.io${token0Image}`}
                        />
                        &nbsp; &nbsp;{token0Reserve}&nbsp;{pairOftoke0}
                      </div>

                      <div style={{ display: 'inline-block' }}>
                        &nbsp; &nbsp;1&nbsp;{pairOftoke0}={token1Price}&nbsp;
                        {pairOftoke1}(${token0USDRate})
                      </div>
                    </div>
                    {/*End of logic to implement pair's individual token detials  */}
                    &nbsp;
                    {/*Logic of second token */}
                    <div
                      style={{
                        // marginLeft:'25px',
                        width: '49%',
                        marginTop: '15px',

                        minWidth: '30px',
                        border: '1px solid rgb(115, 115, 115)',
                        height: '80px',
                        minHeight: '50px',
                        borderRadius: '20px',
                        display: 'inline-block',
                        margin: '1rem 0',
                      }}
                    >
                      <div style={{ marginTop: '10px', padding: '0 1rem' }}>
                        <img
                          style={{
                            height: '20px',
                            width: '25px',
                            display: 'inline-block',
                          }}
                          src={`https://ethplorer.io${token1Image}`}
                        />
                        &nbsp; &nbsp;{token1Reserve}&nbsp;{pairOftoke1}
                      </div>

                      <div style={{ display: 'inline-block' }}>
                        &nbsp; &nbsp;1&nbsp;{pairOftoke1}={token0Price}&nbsp;
                        {pairOftoke0}(${token1USDRate})
                      </div>
                    </div>
                    {/*End of the Logic for secound token */}
                    <br />
                    <Typography
                      variant="h4"
                      sx={{ mt: 2, ml: 1, color: 'turquoise' }}
                    >
                      ${totalVolume}
                    </Typography>
                    <hr
                      style={{
                        marginTop: '0.01px',
                        borderTop: '0px ',
                        borderBottom: '1px solid #737373',
                      }}
                    />
                    <div
                      style={{
                        color: 'darkviolet',
                        textAlign: 'left',
                        marginTop: '15px',
                        fontStyle: 'unset',
                      }}
                    >
                      STATS
                    </div>
                    <div>
                      <BrowserView>
                        <div
                          style={{
                            width: '25%',
                            height: '125px',
                            display: 'inline-block',
                            color: 'blanchedalmond',
                            marginTop: '8px',
                          }}
                        >
                          1 Day
                          <br />
                          <br />
                          <font
                            color={
                              parseInt(oneDayReserverUSD) >= 0
                                ? '#00FFE7'
                                : 'red'
                            }
                          >
                            {oneDayReserverUSD}
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
                            color: 'blanchedalmond',
                          }}
                        >
                          1 Month
                          <br />
                          <br />
                          <font
                            color={
                              parseInt(oneMonthState) >= 0 ? '#00FFE7' : 'red'
                            }
                          >
                            {oneMonthState}
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
                            color: 'blanchedalmond',
                          }}
                        >
                          3 Months
                          <br />
                          <br />
                          <font
                            color={
                              parseInt(threeMonthState) >= 0 ? '#00FFE7' : 'red'
                            }
                          >
                            {threeMonthState}
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
                            color: 'blanchedalmond',
                          }}
                        >
                          1 Year
                          <br />
                          <br />
                          <font
                            color={
                              parseInt(oneYearState) >= 0 ? '#00FFE7' : 'red'
                            }
                          >
                            {oneYearState}%
                          </font>
                          <br />
                          <br />
                          <br />
                          <br />
                        </div>

                        <div
                          style={{
                            width: '25%',
                            height: '100px',
                            display: 'inline-block',
                            color: 'blanchedalmond',
                          }}
                        >
                          Market Cap
                          <br />
                          <br />
                          <font color="#00FFE7">{currentMarketCap}</font>
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
                            color: 'blanchedalmond',
                          }}
                        >
                          Fully Diluted
                          <br />
                          <br />
                          <font color="#00FFE7">{fullyDiluted}</font>
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
                            color: 'blanchedalmond',
                          }}
                        >
                          Volume(24hrs)
                          <br />
                          <br />
                          <font color="#00FFE7">{volume24Hrs}</font>
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
                            color: 'blanchedalmond',
                          }}
                        >
                          Fees(24hrs)
                          <br />
                          <br />
                          <font color="#00FFE7">{fees24Hrs}</font>
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
                            color: 'blanchedalmond',
                          }}
                        >
                          1 DAY
                          <br />
                          <br />
                          <font
                            color={
                              parseInt(oneDayReserverUSD) > 0
                                ? '#00FFE7'
                                : 'red'
                            }
                          >
                            {oneDayReserverUSD}
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
                            color: 'blanchedalmond',
                          }}
                        >
                          1 Month
                          <br />
                          <br />
                          <font
                            color={
                              parseInt(oneMonthState) > 0 ? '#00FFE7' : 'red'
                            }
                          >
                            {oneMonthState}
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
                            color: 'blanchedalmond',
                          }}
                        >
                          3 Months
                          <br />
                          <br />
                          <font
                            color={
                              parseInt(threeMonthState) > 0 ? '#00FFE7' : 'red'
                            }
                          >
                            {threeMonthState}
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
                            color: 'blanchedalmond',
                          }}
                        >
                          1 Year
                          <br />
                          <br />
                          <font
                            color={
                              parseInt(oneYearState) > 0 ? '#00FFE7' : 'red'
                            }
                          >
                            {oneYearState}
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
                            color: 'blanchedalmond',
                          }}
                        >
                          Market Cap
                          <br />
                          <br />
                          <font color="#00FFE7">{currentMarketCap}</font>
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
                            color: 'blanchedalmond',
                          }}
                        >
                          Fully Diluted
                          <br />
                          <br />
                          <font color="#00FFE7">{fullyDiluted}</font>
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
                            color: 'blanchedalmond',
                          }}
                        >
                          Volume(24hrs)
                          <br />
                          <br />
                          <font color="#00FFE7">{volume24Hrs}</font>
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
                            color: 'blanchedalmond',
                          }}
                        >
                          Fees(24hrs)
                          <br />
                          <br />
                          <font color="#00FFE7">{fees24Hrs}</font>
                          <br />
                          <br />
                          <br />
                          <br />
                        </div>
                      </MobileView>
                    </div>
                    <hr
                      style={{
                        marginTop: '1px',
                        borderTop: '0px ',
                        borderBottom: '1px solid #737373',
                      }}
                    />
                    <br />
                    <div
                      style={{
                        color: 'darkviolet',
                        textAlign: 'left',
                        fontStyle: 'unset',
                      }}
                    >
                      ABOUT
                    </div>
                    <br />
                    <div style={{ color: 'white' }}>
                      <h4>
                        &nbsp;&nbsp;&nbsp;&nbsp; SushiSwap enables the buying
                        and selling of different cryptocurrencies between users.
                        0.3% in fees is charged for facilitating each swap, with
                        0.25% going to liquidity providers and 0.05% being
                        converted to SUSHI and distributed to users holding the
                        SUSHI token. SUSHI tokens also entitle their holders to
                        continue earning a portion of fees, even after they’ve
                        stopped actively providing liquidity.
                      </h4>
                    </div>
                    <br />
                    <br />
                    <hr
                      style={{
                        marginTop: '8px',
                        borderTop: '0px ',
                        borderBottom: '1px solid #737373',
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </Box>
        </Container>
      </Grid>
      <Grid item md={4} style={{ display: 'inline-block' }}>
        {!Loading && <PoolDetailChart token0={token0} token1={token1} />}
      </Grid>
    </Grid>
  )
}
