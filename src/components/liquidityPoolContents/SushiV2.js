/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import OneClickLiquidity from '../../abi/UniV2PoolsOneClick.json';
import AmountInput from '../../components/amountInput';
import Web3 from 'web3';
import TransparentButton from '../../components/TransparentButton';
import ERC20ABI from '../../abi/ERC20.json';
import ROUTERABI from '../../abi/UniRouterV2.json';
import FACTORYABI from '../../abi/UniFactoryV2.json';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import tokenURIs from '../../screens/Exchange/tokenURIs';
import Addresses from '../../contractAddresses';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import AmountInput from '../components/amountInput'

import { Button } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import {LiquidityPoolsTable} from "./liquidityPoolsTable/liquidityPoolsTable";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    //   flexGrow: 1,
    backgroundColor: '#0E1214',
    color: 'white',
  },
}));

export default function LiquidityPools() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [Loading, setLoading] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { address } = useParams();

  const [Data, setData] = useState([]); //UNI V2 Pools
  const [Content, setContent] = useState(''); //UNI V2 Pools
  const [TokenA, setTokenA] = useState('');
  const [TokenB, setTokenB] = useState('');
  const [Page, setPage] = useState('');
  const [AmountTokenA, setAmountTokenA] = useState('');
  const [AmountTokenB, setAmountTokenB] = useState('');
  const [SupplyToken, setSupplyToken] = useState('');
  const [SupplyTokenAmount, setSupplyTokenAmount] = useState('');
  const [AccountLiquidity, setAccountLiquidity] = useState('');
  const [ReceiveToken, setReceiveToken] = useState('');
  const [LiquidityAmount, setLiquidityAmount] = useState('');

  const [AllTokens, setAllTokens] = useState([]);

  // useEffect(() => {
  //   async function getData() {
  //     let fetchedTokens;
  //     await axios.get(`https://api.0x.org/swap/v1/tokens`, {}, {}).then(async (response) => {
  //       setAllTokens(response.data.records);
  //       fetchedTokens = response.data.records;
  //     });
  //     await axios
  //       .get(`https://tokens.coingecko.com/uniswap/all.json`, {}, {})
  //       .then(async (response) => {
  //         let data = response.data.tokens;
  //         let tokens = fetchedTokens.map((token) => ({
  //           ...token,
  //           logoURI: data.find((x) => x.address == token.address)
  //             ? data.find((x) => x.address == token.address).logoURI
  //             : tokenURIs.find((x) => x.address == token.address).logoURI,
  //         }));
  //         setAllTokens(tokens);
  //       }).catch((res) => {
  //           console.log('liquidity pools Sushiswap-V2 returns error', res)});
  //   }
  //   getData();
  // }, []);

  //worked useEffect
  useEffect(() => {
    var content = Data.map((object) => {
      return (<>
        <br />
        <Accordion
          style={{
            background: 'transparent',
            marginLeft: '40px',
            color: 'white',
            width: '90%',
            border: '1px',
            borderColor: 'white',
            borderStyle: 'solid',
          }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <div style={{ height: '60px', width: '100%' }}>
              <div style={{ display: 'inline-block', width: '5%' }}></div>

              <div style={{ display: 'inline-block', width: '25%' }}>
                <br />
                {object.token0.symbol} {object.token1.symbol}
              </div>

              <div style={{ display: 'inline-block', width: '30%' }}>
                <br />
                {parseFloat(object.reserveUSD).toFixed(2)} USD
              </div>

              <div
                style={{
                  display: 'inline-block',
                  width: '30%',
                  marginTop: '10px',
                }}>
                {(
                  ((parseInt(object.volumeUSD) * 0.003) / parseInt(object.reserveUSD)) *
                  100 *
                  365
                ).toFixed(2)}{' '}
                % (Yearly)
                <br />
                {(
                  ((parseInt(object.volumeUSD) * 0.003) / parseInt(object.reserveUSD)) *
                  100 *
                  7
                ).toFixed(2)}{' '}
                % (Weekly)
              </div>
              <Link to={`/${address}/sushiswap/address/${object.token0.id}/${object.token1.id}`}>
                <Button
                    color="primary"
                    sx={{
                      height: '0.1px',
                      color: '#fff',
                      fontWeight: 5,
                      fontSize: '13px',
                      // background: (theme) => theme.palette.gradients.custom,
                    }}>
                  Details
                </Button>
              </Link>
              <div style={{ display: 'inline-block', width: '10%' }}>
                <img
                  style={{
                    height: '30px',
                    width: '30px',
                    display: 'inline-block',
                  }}
                  alt=""
                  src={`https://ethplorer.io${object.token0.image}`}
                />
                &nbsp;&nbsp;&nbsp;
                <img
                  style={{
                    height: '30px',
                    width: '30px',
                    display: 'inline-block',
                  }}
                  alt=""
                  src={`https://ethplorer.io${object.token1.image}`}
                />
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <center>
                <AppBar position="static" style={{ width: '400px' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab
                      className={classes.root}
                      style={{ width: '50%' }}
                      label="Add Liquidity"
                      {...a11yProps(0)}
                    />
                    <Tab
                      className={classes.root}
                      style={{ width: '50%' }}
                      label="Remove Liquidity"
                      {...a11yProps(1)}
                    />
                  </Tabs>
                </AppBar>
              </center>

              <TabPanel value={value} index={0}>
                <br />
                <br />
                <div
                  style={{
                    width: '50%',
                    display: 'inline-block',
                  }}>
                  <center>
                    {/* <input
            type='text'
            onChange={(e)=>{setSupplyToken(e.target.value)}}
            style={{background:'transparent',
                    borderColor:'#737373',
                    borderStyle:'solid',
                    borderWidth:'1px',
                    height:'35px',
                    borderRadius:'10px',
                    color:'white',
                    paddingLeft:'15px', 
                    paddingRight:'15px',
                }}
                placeholder='Supply Token Address'
        >
        </input>  */}
                    <FormControl variant="outlined" style={{ width: '130px' }}>
                      <InputLabel id="demo-simple-select-label">Token</InputLabel>
                      <Select
                        style={{ height: '56px', color: 'white' }}
                        displayEmpty
                        // value={TokenTo}
                        onChange={(e) => {
                          setSupplyToken(e.target.value);
                        }}
                        inputProps={{ 'aria-label': 'Without label' }}
                        sx={
                          {
                            // background: (theme) => theme.palette.gradients.custom,
                          }
                        }>
                        <MenuItem
                          value=""
                          // sx={{
                          //   background: (theme) =>
                          //     // theme.palette.gradients.custom,
                          // }}
                        >
                          <Typography>Select</Typography>
                          {/*  <div className="logo-container">
                        <img src={AllTokens[4].logoURI} className="logo-uri" />
                    </div>
                    {AllTokens[4].symbol} */}
                        </MenuItem>
                        {AllTokens.map((object) => (
                          <MenuItem
                            value={object.address}
                            sx={{
                              backgroundColor: '#141a1e',
                              // '&:hover': {
                              //   background: (theme) =>
                              //     // theme.palette.gradients.custom,
                              // },
                            }}>
                            <div className="logo-container">
                              <img src={object.logoURI} className="logo-uri" />
                            </div>
                            {object.symbol}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <br />
                    <br />
                    Supply Token Amount : &nbsp;&nbsp;
                    <AmountInput
                      onChange={(e) => {
                        setSupplyTokenAmount(e.target.value);
                      }}
                    />{' '}
                    <br />
                    <br />
                    <TransparentButton
                      onClick={(e) => {
                        addLiquidity(
                          object.token0.id,
                          object.token1.id,
                          SupplyToken,
                          (SupplyTokenAmount * 10 ** 18).toString()
                        );
                      }}
                      value="Add Liquidity with Supply Token"
                    />
                  </center>
                </div>
                {/* -OR- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                <div
                  style={{
                    width: '50%',
                    display: 'inline-block',
                  }}>
                  <center>
                    {/* <input
            type='text'
            onChange={(e)=>{setSupplyToken(e.target.value)}}
            style={{background:'transparent',
                    borderColor:'#737373',
                    borderStyle:'solid',
                    borderWidth:'1px',
                    height:'35px',
                    borderRadius:'10px',
                    color:'white',
                    paddingLeft:'15px', 
                    paddingRight:'15px',
                }}
                placeholder='Supply Token Address'
        >
        </input>  */}
                    Ether Amount : &nbsp;&nbsp;
                    <AmountInput
                      onChange={(e) => {
                        setSupplyTokenAmount(e.target.value);
                      }}
                    />{' '}
                    <br />
                    <br />
                    <TransparentButton
                      onClick={(e) => {
                        addLiquidityEth(object.token0.id, object.token1.id, SupplyTokenAmount);
                      }}
                      value="Add Liquidity with Ether"
                    />
                  </center>
                </div>
                <br />
                <br /> <br />
                <center>
                  {' '}
                  OR <br />
                  <br />
                  <br />
                  {/*Input with button for swap tokens just between pair -------------------->*/}
                  {object.token0.name} Amount : &nbsp;&nbsp;
                  <AmountInput
                    onChange={(e) => {
                      setAmountTokenA(e.target.value);
                    }}
                  />
                  &nbsp;&nbsp;&nbsp;
                  {object.token1.name} Amount : &nbsp;&nbsp;
                  <AmountInput
                    onChange={(e) => {
                      setAmountTokenB(e.target.value);
                    }}
                  />
                  <br />
                  <br />
                  <TransparentButton
                    onClick={(e) => {}}
                    value="Add Liquidity Classic Method"
                  />
                  {/*Input with button for swap tokens just between pair -------------------->*/}
                </center>
                <br />
                <br />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <center>
                  <br />
                  <br />
                  Liquidity To Remove &nbsp; : &nbsp;{' '}
                  <AmountInput
                    onChange={(e) => {
                      setLiquidityAmount(e.target.value);
                      checkLiquidity(object.token0.id, object.token1.id);
                    }}
                  />
                  <br />
                  <font style={{ fontSize: '10px' }}>
                    Liquidity In Account &nbsp;: {AccountLiquidity}{' '}
                  </font>
                  <br />
                  <br />
                  <div style={{ display: 'inline-block', width: '40%' }}>
                    {/* <input
                type='text'
                onChange={(e)=>{setReceiveToken(e.target.value)}}
                style={{background:'transparent',
                        borderColor:'#737373',
                        borderStyle:'solid',
                        borderWidth:'1px',
                        height:'35px',
                        borderRadius:'10px',
                        color:'white',
                        paddingLeft:'15px', 
                        paddingRight:'15px',
                    }}
                    placeholder='Receive Token Address'/>  */}

                    <FormControl variant="outlined" style={{ width: '130px' }}>
                      <InputLabel id="demo-simple-select-label">Token</InputLabel>
                      <Select
                        style={{ height: '56px', color: 'white' }}
                        displayEmpty
                        onChange={(e) => {
                          setReceiveToken(e.target.value);
                        }}
                        inputProps={{ 'aria-label': 'Without label' }}
                        sx={
                          {
                            // background: (theme) => theme.palette.gradients.custom,
                          }
                        }>
                        <MenuItem
                          value=""
                          // sx={{
                          //   background: (theme) =>
                          //     // theme.palette.gradients.custom,
                          // }}
                        >
                          <Typography>Select</Typography>
                        </MenuItem>
                        {AllTokens.map((object) => (
                          <MenuItem
                            value={object.address}
                            sx={{
                              backgroundColor: '#141a1e',
                              // '&:hover': {
                              //   background: (theme) =>
                              //     // theme.palette.gradients.custom,
                              // },
                            }}>
                            <div className="logo-container">
                              <img src={object.logoURI} className="logo-uri" />
                            </div>
                            {object.symbol}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <br />
                    <br />
                    <TransparentButton
                      value="Remove Liquidity In Tokens"
                      onClick={(e) => {
                        removeLiquidity(
                          object.token0.id,
                          object.token1.id,
                          ReceiveToken,
                          (LiquidityAmount * 10 ** 18).toString()
                        );
                      }}
                    />
                  </div>
                  OR
                  <div style={{ display: 'inline-block', width: '40%' }}>
                    <TransparentButton
                      value="Remove Liquidity in Ether"
                      onClick={(e) => {
                        removeLiquidityETH(
                          object.token0.id,
                          object.token1.id,
                          (LiquidityAmount * 10 ** 18).toString()
                        );
                      }}
                    />
                  </div>
                  <br />
                  <br /> <b>OR</b> <br />
                  <br />
                  <TransparentButton
                    value="Remove Liquidity Classic"
                    onClick={(e) => {
                      removeLiquidityNormal(
                        object.token0.id,
                        object.token1.id,
                        (LiquidityAmount * 10 ** 18).toString()
                      );
                    }}
                  />
                </center>
              </TabPanel>
            </div>
          </AccordionDetails>
        </Accordion>
      </>)
  });
    setContent(content);
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
  ]);

  useEffect(() => {
    // console.log('lol')
    var d = new Date();
    var day = d.getUTCDate();
    var month = d.getUTCMonth();
    var year = d.getUTCFullYear();
    var offset = new Date(year, month, day).getTimezoneOffset() * 60;
    var epoch = new Date(year, month, day).getTime() / 1000 - offset;

    // console.log(epoch)
    async function getData() {
      setLoading(true);
      await axios
        .post(
          `https://gateway.thegraph.com/api/${Addresses.graph_API}/subgraphs/id/0x4bb4c1b0745ef7b4642feeccd0740dec417ca0a0-0`,
          {
            query: `
                {
                    pairDayDatas(first: 20,
                      skip : ${Page * 20}
                       where:{
                        date:${epoch}
                      }
                        orderBy:volumeUSD,
                        orderDirection: desc)
                    {
                      id
                      token0 {
                        id
                        symbol
                            name
                      }
                      token1 {
                        id
                        symbol
                        name
                      }
                      date
                      reserveUSD
                      volumeUSD
                    }
                }`,
          }
        )
        .then(async (response) => {
          if (response.data.data) {
            console.log('response.data.data', response.data.data)
            var res = response.data.data.pairDayDatas;
            for (var i = 0; i < res.length; i++) {
              await axios
                .get(
                  `https://api.ethplorer.io/getTokenInfo/${res[i].token0.id}?apiKey=EK-qSPda-W9rX7yJ-UY93y`,
                  {},
                  {}
                )
                .then((response) => {
                  if (response.data.image) {
                    // console.log(response.data.image)
                    res[i].token0.image = response.data.image;
                  }
                });
              await axios
                .get(
                  `https://api.ethplorer.io/getTokenInfo/${res[i].token1.id}?apiKey=EK-qSPda-W9rX7yJ-UY93y`,
                  {},
                  {}
                )
                .then((response) => {
                  if (response.data.image) {
                    res[i].token1.image = response.data.image;
                  }
                });
              var data2 = Data;
              data2.push(res[i]);
              console.log(data2);
              setData([...data2]);
            }
            // setData(Data.concat(res))
            setLoading(false);
            console.log(res);
          }
        });
    }
    getData();
  }, [Page]);

  useEffect(() => {
    setData([]);
  }, []);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  useEffect(() => {
    setData([]);
  }, []);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  async function checkLiquidity(tokenA, tokenB) {
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    var FactoryContract = new web3.eth.Contract(FACTORYABI, Addresses.sushiFactory);
    var pairAddress = await FactoryContract.methods.getPair(tokenA, tokenB).call();
    var PairContract = new web3.eth.Contract(ERC20ABI, pairAddress);
    var qtty = await PairContract.methods.balanceOf(accounts[0]).call();
    setAccountLiquidity(qtty);
  }

  async function removeLiquidity(tokenA, tokenB, receiveToken, liquidityAmount) {
    // console.log(tokenA, tokenB, receiveToken, liquidityAmount)
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    var FactoryContract = new web3.eth.Contract(FACTORYABI, Addresses.sushiFactory);
    var pairAddress = await FactoryContract.methods.getPair(tokenA, tokenB).call();
    var PairContract = new web3.eth.Contract(ERC20ABI, pairAddress);
    const oneClickContract = new web3.eth.Contract(
      OneClickLiquidity,
      Addresses.oneClickSushiV2Contract
    );
    await PairContract.methods
      .approve(Addresses.oneClickSushiV2Contract, liquidityAmount)
      .send({ from: accounts[0] });
    await oneClickContract.methods
      .removeLiquidityOneClick(tokenA, tokenB, receiveToken, liquidityAmount)
      .send({ from: accounts[0] });
  }

  async function removeLiquidityETH(tokenA, tokenB, LiquidityAmount) {
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    var FactoryContract = new web3.eth.Contract(FACTORYABI, Addresses.sushiFactory);
    var pairAddress = await FactoryContract.methods.getPair(tokenA, tokenB).call();
    var PairContract = new web3.eth.Contract(ERC20ABI, pairAddress);
    const oneClickContract = new web3.eth.Contract(
      OneClickLiquidity,
      Addresses.oneClickSushiV2Contract
    );
    await PairContract.methods
      .approve(Addresses.oneClickSushiV2Contract, LiquidityAmount)
      .send({ from: accounts[0] });
    await oneClickContract.methods
      .removeLiquidityOneClickETH(tokenA, tokenB, LiquidityAmount)
      .send({ from: accounts[0] });
  }

  async function removeLiquidityNormal(tokenA, tokenB, LiquidityAmount) {
    const start = parseInt(Date.now() / 1000) + 180;
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    var FactoryContract = new web3.eth.Contract(FACTORYABI, Addresses.sushiFactory);
    var pairAddress = await FactoryContract.methods.getPair(tokenA, tokenB).call();
    var PairContract = new web3.eth.Contract(ERC20ABI, pairAddress);
    const UniRouter = new web3.eth.Contract(ROUTERABI, Addresses.sushiRouter);
    await PairContract.methods
      .approve(Addresses.sushiRouter, LiquidityAmount)
      .send({ from: accounts[0] });
    await UniRouter.methods
      .removeLiquidity(tokenA, tokenB, LiquidityAmount, 0, 0, accounts[0], start.toString())
      .send({ from: accounts[0] });
  }

  async function addLiquidity(tokenA, tokenB, supplyToken, supplyTokenQtty) {
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    var tokenContract = new web3.eth.Contract(ERC20ABI, supplyToken);
    const oneClickContract = new web3.eth.Contract(
      OneClickLiquidity,
      Addresses.oneClickSushiV2Contract
    );
    await tokenContract.methods
      .approve(Addresses.oneClickSushiV2Contract, supplyTokenQtty)
      .send({ from: accounts[0] });
    await oneClickContract.methods
      .addLiquidityOneClick(tokenA, tokenB, supplyToken, supplyTokenQtty)
      .send({ from: accounts[0] });
  }

  async function addLiquidityEth(tokenA, tokenB, ethAmount) {
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const oneClickContract = new web3.eth.Contract(
      OneClickLiquidity,
      Addresses.oneClickSushiV2Contract
    );
    await oneClickContract.methods
      .addLiquidityOneClickETH(tokenA, tokenB)
      .send({ from: accounts[0], value: web3.utils.toWei(ethAmount, 'ether') });
  }

  return (
    <div>
      <LiquidityPoolsTable data={Data} AllTokens={AllTokens} />
      <br />
      <center>
        <button
          onClick={(e) => {
            setPage(Page + 1);
          }}
          style={{
            height: '25px',
            width: '100px',
            background: 'transparent',
            border: '1px solid #ac6afc',
            cursor: 'pointer',
            color: 'white',
            borderRadius: '10px',
          }}>
          {Loading ? 'Loading...' : 'Show More'}
        </button>
      </center>
    </div>
  );
}
