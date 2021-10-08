/*
Developed on 27-Sep-2021, this is basically a clone of UniV2 component created in liquidity pools
*/
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import OneClickLiquidity from '../../abi/UniV2PoolsOneClick.json'
import AmountInput from '../../components/amountInput'
import Web3 from 'web3'
import TransparentButton from '../../components/TransparentButton'
import ERC20ABI from '../../abi/ERC20.json'
import ROUTERABI from '../../abi/UniRouterV2.json'
import FACTORYABI from '../../abi/UniFactoryV2.json'
import Addresses from '../../contractAddresses'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import tokenURIs from '../../screens/Exchange/tokenURIs'

import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { Add } from '@material-ui/icons'
// import AmountInput from '../components/amountInput'

import { Button } from '@material-ui/core'
import { Link, useParams } from 'react-router-dom'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    //   flexGrow: 1,
    backgroundColor: '#0E1214',
    color: 'white',
  },
}))

export default function LiquidityPools(props) {
  const tokenPair = props.tokenPair
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const [Loading, setLoading] = useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const { address } = useParams()

  const [Data, setData] = useState([]) //UNI V2 Pools
  const [Content, setContent] = useState('') //UNI V2 Pools
  const [TokenA, setTokenA] = useState('')
  const [TokenB, setTokenB] = useState('')
  const [Page, setPage] = useState('')
  const [AmountTokenA, setAmountTokenA] = useState('')
  const [AmountTokenB, setAmountTokenB] = useState('')
  const [SupplyToken, setSupplyToken] = useState('')
  const [SupplyTokenAmount, setSupplyTokenAmount] = useState('')
  const [AccountLiquidity, setAccountLiquidity] = useState('')
  const [ReceiveToken, setReceiveToken] = useState('')
  const [LiquidityAmount, setLiquidityAmount] = useState('')

  const [AllTokens, setAllTokens] = useState([])

  useEffect(() => {
    async function getData() {
      let fetchedTokens
      await axios
        .get(`https://api.0x.org/swap/v1/tokens`, {}, {})
        .then(async (response) => {
          setAllTokens(response.data.records)
          fetchedTokens = response.data.records
          console.log(response.data.records)
        })
      await axios
        .get(`https://tokens.coingecko.com/uniswap/all.json`, {}, {})
        .then(async (response) => {
          let data = response.data.tokens
          let tokens = fetchedTokens.map((token) => ({
            ...token,
            logoURI: data.find((x) => x.address == token.address)
              ? data.find((x) => x.address == token.address).logoURI
              : tokenURIs.find((x) => x.address == token.address).logoURI,
          }))
          console.log(tokens.filter((token) => token.logoURI === ''))
          setAllTokens(tokens)
        })
    }
    getData()
  }, [])

  useEffect(() => {
    var content = (
      <AccordionDetails>
        <div>
          <center>
            <AppBar position="static" style={{ width: '400px' }}>
              <Tabs value={value} onChange={handleChange}>
                <Tab style={{ width: '50%' }} label="Add Liquidity" />
                {/* <Tab
                    className={classes.root}
                    style={{ width: '50%' }}
                    label="Remove Liquidity"
                    {...a11yProps(1)}
                  />*/}
              </Tabs>
            </AppBar>
          </center>
        </div>
      </AccordionDetails>
    )
    setContent(content)
  }, [
    Data,
    AmountTokenA,
    AmountTokenB,
    value,
    AccountLiquidity,
    LiquidityAmount,
    SupplyToken,
    SupplyTokenAmount,
    ReceiveToken,
  ])

  //   useEffect(() => {
  //     // console.log('lol')
  //     var d = new Date()
  //     var day = d.getUTCDate()
  //     var month = d.getUTCMonth()
  //     var year = d.getUTCFullYear()
  //     var offset = new Date(year, month, day).getTimezoneOffset() * 60
  //     var epoch = new Date(year, month, day).getTime() / 1000 - offset

  //     // console.log(epoch)
  //     async function getData() {
  //       setLoading(true)
  //       await axios
  //         .post(`https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2`, {
  //           query: `
  //                 {
  //                    pairDayDatas  (where:
  //                       {pairAddress : "${tokenPair}",
  //                       date : ${epoch}
  //                       }
  //                       orderBy : date ,
  //                       orderDirection: desc
  //                     )
  //                     {
  //                       id
  //                       token0 {
  //                         id
  //                         symbol
  //                             name
  //                       }
  //                       token1 {
  //                         id
  //                         symbol
  //                         name
  //                       }
  //                       date
  //                       reserveUSD
  //                       dailyVolumeUSD
  //                     }
  //                 }`,
  //         })
  //         .then(async (response) => {
  //           if (response.data.data) {
  //             var res = response.data.data.pairDayDatas
  //             for (var i = 0; i < res.length; i++) {
  //               await axios
  //                 .get(
  //                   `https://api.ethplorer.io/getTokenInfo/${res[i].token0.id}?apiKey=EK-qSPda-W9rX7yJ-UY93y`,
  //                   {},
  //                   {},
  //                 )
  //                 .then((response) => {
  //                   if (response.data.image) {
  //                     // console.log(response.data.image)
  //                     res[i].token0.image = response.data.image
  //                   }
  //                 })
  //               await axios
  //                 .get(
  //                   `https://api.ethplorer.io/getTokenInfo/${res[i].token1.id}?apiKey=EK-qSPda-W9rX7yJ-UY93y`,
  //                   {},
  //                   {},
  //                 )
  //                 .then((response) => {
  //                   if (response.data.image) {
  //                     res[i].token1.image = response.data.image
  //                   }
  //                 })
  //             }
  //             setData(Data.concat(res))
  //             setLoading(false)
  //             console.log(res)
  //           }
  //         })
  //     }
  //     getData()
  //   }, [Page])

  useEffect(() => {
    setData([])
  }, [])

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!',
      )
    }
  }

  async function checkLiquidity(tokenA, tokenB) {
    await loadWeb3()
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    var FactoryContract = new web3.eth.Contract(
      FACTORYABI,
      Addresses.uniFactory,
    )
    var pairAddress = await FactoryContract.methods
      .getPair(tokenA, tokenB)
      .call()
    var PairContract = new web3.eth.Contract(ERC20ABI, pairAddress)
    var qtty = await PairContract.methods.balanceOf(accounts[0]).call()
    setAccountLiquidity(qtty)
  }

  async function removeLiquidity(
    tokenA,
    tokenB,
    receiveToken,
    liquidityAmount,
  ) {
    // console.log(tokenA, tokenB, receiveToken, liquidityAmount)
    await loadWeb3()
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    var FactoryContract = new web3.eth.Contract(
      FACTORYABI,
      Addresses.uniFactory,
    )
    var pairAddress = await FactoryContract.methods
      .getPair(tokenA, tokenB)
      .call()
    var PairContract = new web3.eth.Contract(ERC20ABI, pairAddress)
    const oneClickContract = new web3.eth.Contract(
      OneClickLiquidity,
      Addresses.oneClickUniV2Contract,
    )
    await PairContract.methods
      .approve(Addresses.oneClickUniV2Contract, liquidityAmount)
      .send({ from: accounts[0] })
    await oneClickContract.methods
      .removeLiquidityOneClick(tokenA, tokenB, receiveToken, liquidityAmount)
      .send({ from: accounts[0] })
  }

  async function removeLiquidityETH(tokenA, tokenB, LiquidityAmount) {
    await loadWeb3()
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    var FactoryContract = new web3.eth.Contract(
      FACTORYABI,
      Addresses.uniFactory,
    )
    var pairAddress = await FactoryContract.methods
      .getPair(tokenA, tokenB)
      .call()
    var PairContract = new web3.eth.Contract(ERC20ABI, pairAddress)
    const oneClickContract = new web3.eth.Contract(
      OneClickLiquidity,
      Addresses.oneClickUniV2Contract,
    )
    await PairContract.methods
      .approve(Addresses.oneClickUniV2Contract, LiquidityAmount)
      .send({ from: accounts[0] })
    await oneClickContract.methods
      .removeLiquidityOneClickETH(tokenA, tokenB, LiquidityAmount)
      .send({ from: accounts[0] })
  }

  async function removeLiquidityNormal(tokenA, tokenB, LiquidityAmount) {
    const start = parseInt(Date.now() / 1000) + 180
    await loadWeb3()
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    var FactoryContract = new web3.eth.Contract(
      FACTORYABI,
      Addresses.uniFactory,
    )
    var pairAddress = await FactoryContract.methods
      .getPair(tokenA, tokenB)
      .call()
    var PairContract = new web3.eth.Contract(ERC20ABI, pairAddress)
    const UniRouter = new web3.eth.Contract(ROUTERABI, Addresses.uniRouter)
    await PairContract.methods
      .approve(Addresses.uniRouter, LiquidityAmount)
      .send({ from: accounts[0] })
    await UniRouter.methods
      .removeLiquidity(
        tokenA,
        tokenB,
        LiquidityAmount,
        0,
        0,
        accounts[0],
        start.toString(),
      )
      .send({ from: accounts[0] })
  }

  async function addLiquidity(tokenA, tokenB, supplyToken, supplyTokenQtty) {
    await loadWeb3()
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    var tokenContract = new web3.eth.Contract(ERC20ABI, supplyToken)
    const oneClickContract = new web3.eth.Contract(
      OneClickLiquidity,
      Addresses.oneClickUniV2Contract,
    )
    await tokenContract.methods
      .approve(Addresses.oneClickUniV2Contract, supplyTokenQtty)
      .send({ from: accounts[0] })
    await oneClickContract.methods
      .addLiquidityOneClick(tokenA, tokenB, supplyToken, supplyTokenQtty)
      .send({ from: accounts[0] })
  }

  async function addLiquidityEth(tokenA, tokenB, ethAmount) {
    await loadWeb3()
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    const oneClickContract = new web3.eth.Contract(
      OneClickLiquidity,
      Addresses.oneClickUniV2Contract,
    )
    await oneClickContract.methods
      .addLiquidityOneClickETH(tokenA, tokenB)
      .send({ from: accounts[0], value: web3.utils.toWei(ethAmount, 'ether') })
  }

  async function addLiquidityNormal(
    tokenA,
    tokenB,
    amountTokenA,
    amountTokenB,
  ) {
    const start = parseInt(Date.now() / 1000) + 180
    await loadWeb3()
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    var tokenAContract = new web3.eth.Contract(ERC20ABI, tokenA)
    var tokenBContract = new web3.eth.Contract(ERC20ABI, tokenB)
    await tokenAContract.methods
      .approve(Addresses.uniRouter, web3.utils.toWei(amountTokenA, 'ether'))
      .send({ from: accounts[0] })
    await tokenBContract.methods
      .approve(Addresses.uniRouter, web3.utils.toWei(amountTokenB, 'ether'))
      .send({ from: accounts[0] })
    const UniRouter = new web3.eth.Contract(ROUTERABI, Addresses.uniRouter)
    await UniRouter.methods
      .addLiquidity(
        tokenA,
        tokenB,
        web3.utils.toWei(amountTokenA, 'ether'),
        web3.utils.toWei(amountTokenB, 'ether'),
        0,
        0,
        accounts[0],
        start.toString(),
      )
      .send({ from: accounts[0] })
  }

  return (
    <div>
      {Content}
      <br />
    </div>
  )
}
