/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import OneClickLiquidity from '../../../abi/UniV2PoolsOneClick.json';
import AmountInput from '../../amountInput';
import Web3 from 'web3';
import TransparentButton from '../../TransparentButton';
import ERC20ABI from '../../../abi/ERC20.json';
import ROUTERABI from '../../../abi/UniRouterV2.json';
import FACTORYABI from '../../../abi/UniFactoryV2.json';
import Addresses from '../../../contractAddresses';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from 'react-select';
import tokenURIs from '../../../screens/Exchange/tokenURIs';
import eth from '../../../assets/icons/ethereum.svg';
import uni from '../../../assets/icons/uniswap-icon.svg';
import ethLend from '../../../assets/icons/ethLend-icon.svg';
import mkr from '../../../assets/icons/mkr.svg';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Add } from '@material-ui/icons';
// import AmountInput from '../components/amountInput'

import mockImg from '../../../assets/icons/plusIconDark.svg';

import { Button } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import ModalContainer from '../../common/modalContainer/modalContainer';
import { SelectWrapper } from '../styledComponents';
import {
  SelectTitle,
  ChangeToken,
  ButtonsBlock,
  AddNewGroupButton,
  ModalInput,
  SupplyTokenButton,
  InputBlock,
  Balance,
  LinksContainer,
  ModalLink,
  ModalLinkRight,
} from './StyledComponents';
import { LiquidityPoolsTable } from '../liquidityPoolsTable/liquidityPoolsTable/liquidityPoolsTable';
import {useSelector} from "react-redux";
import {addLiquidityNormal, addLiquidity} from "../../../screens/liquidityPools/helpers";

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

export default function LiquidityPools({ inputValue, AllTokens }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [Loading, setLoading] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { address } = useParams();

  const [Data, setData] = useState([]); //UNI V2 Pools
  const [Content, setContent] = useState(''); //UNI V2 Pools
  const [Page, setPage] = useState('');
  const [AmountTokenA, setAmountTokenA] = useState('');
  const [AmountTokenB, setAmountTokenB] = useState('');
  const [SupplyToken, setSupplyToken] = useState('');
  const [SupplyTokenAmount, setSupplyTokenAmount] = useState('');
  const [AccountLiquidity, setAccountLiquidity] = useState('');
  const [ReceiveToken, setReceiveToken] = useState('');
  const [LiquidityAmount, setLiquidityAmount] = useState('');

  // const [AllTokens, setAllTokens] = useState([]);
  const [allTokensSelect, setAllTokensSelect] = useState([]);

  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);

  // useEffect(() => {
  //   async function getData() {
  //     let fetchedTokens;
  //     await axios.get(`https://api.0x.org/swap/v1/tokens`, {}, {}).then(async (response) => {
  //       const selectOptions = []
  //       for (let i = 0; i < response.data.records.length; i++) {
  //         let object = {};
  //         object.name = response.data.records[i].name;
  //         object.value = response.data.records[i].name;
  //         object.address = response.data.records[i].address;
  //         selectOptions.push(object)
  //       }
  //       setAllTokensSelect(selectOptions)
  //       setAllTokens(response.data.records);
  //       fetchedTokens = response.data.records;
  //     });
  //     await axios
  //       .get(`https://tokens.coingecko.com/uniswap/all.json`, {}, {})
  //       .then(async (response) => {
  //         let data = response.data.tokens;
  //         let tokens = fetchedTokens.map((token) => ({
  //           ...token,
  //           logoURI: data.find((x) => x.address === token.address)
  //             ? data.find((x) => x.address === token.address).logoURI
  //             : tokenURIs.find((x) => x.address === token.address).logoURI,
  //         }));
  //         setAllTokens(tokens);
  //       })
  //       .catch((res) => {
  //         console.log('liquidity pools Uniswap-V2 returns error', res);
  //       });
  //   }
  //   getData();
  // }, []);

  useEffect(() => {
    var content = Data.map((object) => (
      <>
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
                  ((parseInt(object.dailyVolumeUSD) * 0.003) / parseInt(object.reserveUSD)) *
                  100 *
                  365
                ).toFixed(2)}{' '}
                % (Yearly)
                <br />
                {(
                  ((parseInt(object.dailyVolumeUSD) * 0.003) / parseInt(object.reserveUSD)) *
                  100 *
                  7
                ).toFixed(2)}{' '}
                % (Weekly)
              </div>
              <div style={{ display: 'inline-block', width: '10%' }}>
                {/*Link code added by Prabha on 15-Sep-2021 */}
                <Link to={`/${address}/uniswap/address/${object.token0.id}/${object.token1.id}`}>
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
                <br />
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
                    {/*submit one------------------------------------------------->*/}
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
                <div
                  style={{
                    width: '50%',
                    display: 'inline-block',
                  }}>
                  <center>
                    {/* <input
            type='text'
            onChange={(e)=>{setSupplyToken(e.target.value)}}
                placeholder='Supply Token Address'
        >
        </input>  */}
                    {/*submit one finish------------------------------------------------->*/}
                    {/*submit two------------------------------------------------->*/}
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
                  {/*submit two finish------------------------------------------------->*/}

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
                    onClick={(e) => {
                      addLiquidityNormal(
                        object.token0.id,
                        object.token1.id,
                        AmountTokenA,
                        AmountTokenB
                      );
                    }}
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
                      // removeLiquidityNormal(
                      //   object.token0.id,
                      //   object.token1.id,
                      //   (LiquidityAmount * 10 ** 18).toString()
                      // );
                    }}
                  />
                </center>
              </TabPanel>
            </div>
          </AccordionDetails>
        </Accordion>
      </>
    ));
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
    var d = new Date();
    var day = d.getUTCDate();
    var month = d.getUTCMonth();
    var year = d.getUTCFullYear();
    var offset = new Date(year, month, day).getTimezoneOffset() * 60;
    var epoch = new Date(year, month, day).getTime() / 1000 - offset;

    async function getData() {
      setLoading(true);
      await axios
        .post(`https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2`, {
          query: `
                {
                    pairDayDatas(first: 20,
                      skip : ${Page * 20}
                       where:{
                        date:${epoch}
                      }
                        orderBy:dailyVolumeUSD,
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
                      dailyVolumeUSD
                    }
                }`,
        })
        .then(async (response) => {
          if (response.data.data) {
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
              data2.push({
                date: res[i].date,
                id: res[i].id,
                reserveUSD: res[i].reserveUSD,
                volumeUSD: res[i].dailyVolumeUSD,
                token0: res[i].token0,
                token1: res[i].token1,
              });
              setData([...data2]);
            }
            // setData(Data.concat(res))
            setLoading(false);
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

  async function checkLiquidity(tokenA, tokenB) {
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    var FactoryContract = new web3.eth.Contract(FACTORYABI, Addresses.uniFactory);
    var pairAddress = await FactoryContract.methods.getPair(tokenA, tokenB).call();
    var PairContract = new web3.eth.Contract(ERC20ABI, pairAddress);
    var qtty = await PairContract.methods.balanceOf(accounts[0]).call();
    setAccountLiquidity(qtty);
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
    var FactoryContract = new web3.eth.Contract(FACTORYABI, Addresses.uniFactory);
    var pairAddress = await FactoryContract.methods.getPair(tokenA, tokenB).call();
    var PairContract = new web3.eth.Contract(ERC20ABI, pairAddress);
    var qtty = await PairContract.methods.balanceOf(accounts[0]).call();
    setAccountLiquidity(qtty);
  }

  // async function removeLiquidity(tokenA, tokenB, receiveToken, liquidityAmount) {
  //   console.log('removeFunc tokenA', tokenA)
  //   console.log('removeFunc tokenB', tokenB)
  //   console.log('removeFunc receiveToken', receiveToken)
  //   console.log('removeFunc liquidityAmount', liquidityAmount)
  //   console.log('removeFunc removeLiquidity')
  //   await loadWeb3();
  //   const web3 = window.web3;
  //   const accounts = await web3.eth.getAccounts();
  //   var FactoryContract = new web3.eth.Contract(FACTORYABI, Addresses.uniFactory);
  //   var pairAddress = await FactoryContract.methods.getPair(tokenA, tokenB).call();
  //   var PairContract = new web3.eth.Contract(ERC20ABI, pairAddress);
  //   const oneClickContract = new web3.eth.Contract(
  //     OneClickLiquidity,
  //     Addresses.oneClickUniV2Contract
  //   );
  //   await PairContract.methods
  //     .approve(Addresses.oneClickUniV2Contract, liquidityAmount)
  //     .send({ from: accounts[0] });
  //   await oneClickContract.methods
  //     .removeLiquidityOneClick(tokenA, tokenB, receiveToken, liquidityAmount)
  //     .send({ from: accounts[0] });
  // }

  async function removeLiquidityETH(tokenA, tokenB, LiquidityAmount) {
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    var FactoryContract = new web3.eth.Contract(FACTORYABI, Addresses.uniFactory);
    var pairAddress = await FactoryContract.methods.getPair(tokenA, tokenB).call();
    var PairContract = new web3.eth.Contract(ERC20ABI, pairAddress);
    const oneClickContract = new web3.eth.Contract(
      OneClickLiquidity,
      Addresses.oneClickUniV2Contract
    );
    await PairContract.methods
      .approve(Addresses.oneClickUniV2Contract, LiquidityAmount)
      .send({ from: accounts[0] });
    await oneClickContract.methods
      .removeLiquidityOneClickETH(tokenA, tokenB, LiquidityAmount)
      .send({ from: accounts[0] });
  }

  // async function removeLiquidityNormal(tokenA, tokenB, LiquidityAmount) {
  //     console.log('removeFunc tokenA', tokenA)
  //     console.log('removeFunc tokenB', tokenB)
  //     console.log('removeFunc receiveToken', LiquidityAmount)
  //
  //   const start = parseInt(Date.now() / 1000) + 180;
  //   await loadWeb3();
  //   const web3 = window.web3;
  //   const accounts = await web3.eth.getAccounts();
  //   var FactoryContract = new web3.eth.Contract(FACTORYABI, Addresses.uniFactory);
  //   var pairAddress = await FactoryContract.methods.getPair(tokenA, tokenB).call();
  //   var PairContract = new web3.eth.Contract(ERC20ABI, pairAddress);
  //   const UniRouter = new web3.eth.Contract(ROUTERABI, Addresses.uniRouter);
  //   await PairContract.methods
  //     .approve(Addresses.uniRouter, LiquidityAmount)
  //     .send({ from: accounts[0] });
  //   await UniRouter.methods
  //     .removeLiquidity(tokenA, tokenB, LiquidityAmount, 0, 0, accounts[0], start.toString())
  //     .send({ from: accounts[0] });
  // }
  //----->

  //*first input value sends to smartContract
  // async function addLiquidity(tokenA, tokenB, supplyToken, supplyTokenQtty) {
  //   await loadWeb3();
  //   const web3 = window.web3;
  //   const accounts = await web3.eth.getAccounts();
  //   var tokenContract = new web3.eth.Contract(ERC20ABI, supplyToken);
  //   const oneClickContract = new web3.eth.Contract(
  //     OneClickLiquidity,
  //     Addresses.oneClickUniV2Contract
  //   );
  //   await tokenContract.methods
  //     .approve(Addresses.oneClickUniV2Contract, supplyTokenQtty)
  //     .send({ from: accounts[0] });
  //   await oneClickContract.methods
  //     .addLiquidityOneClick(tokenA, tokenB, supplyToken, supplyTokenQtty)
  //     .send({ from: accounts[0] });
  // }

  async function addLiquidityEth(tokenA, tokenB, ethAmount) {
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const oneClickContract = new web3.eth.Contract(
      OneClickLiquidity,
      Addresses.oneClickUniV2Contract
    );
    await oneClickContract.methods
      .addLiquidityOneClickETH(tokenA, tokenB)
      .send({ from: accounts[0], value: web3.utils.toWei(ethAmount, 'ether') });
  }

  // //*two inputs value send to smartContract
  // async function addLiquidityNormal(tokenA, tokenB, amountTokenA, amountTokenB) {
  //   const start = parseInt(Date.now() / 1000) + 180;
  //   await loadWeb3();
  //   const web3 = window.web3;
  //   const accounts = await web3.eth.getAccounts();
  //   var tokenAContract = new web3.eth.Contract(ERC20ABI, tokenA);
  //   var tokenBContract = new web3.eth.Contract(ERC20ABI, tokenB);
  //   await tokenAContract.methods
  //     .approve(Addresses.uniRouter, web3.utils.toWei(amountTokenA, 'ether'))
  //     .send({ from: accounts[0] });
  //   await tokenBContract.methods
  //     .approve(Addresses.uniRouter, web3.utils.toWei(amountTokenB, 'ether'))
  //     .send({ from: accounts[0] });
  //   const UniRouter = new web3.eth.Contract(ROUTERABI, Addresses.uniRouter);
  //   await UniRouter.methods
  //     .addLiquidity(
  //       tokenA,
  //       tokenB,
  //       web3.utils.toWei(amountTokenA, 'ether'),
  //       web3.utils.toWei(amountTokenB, 'ether'),
  //       0,
  //       0,
  //       accounts[0],
  //       start.toString()
  //     )
  //     .send({ from: accounts[0] });
  // }

  //select styles
  // const selectStyle = {
  //   menu: (provided, state) => ({
  //     ...provided,
  //     width: '100%',
  //     height: 'fitContent',
  //     background: 'rgba(255, 255, 255, 0.16)',
  //     boxSizing: 'border-box',
  //     boxShadow: 'inset 2px 0px 0px rgba(255, 255, 255, 0.1)',
  //     borderTop: 'none',
  //     borderRadius: '0 0 7px 7px',
  //     mixBlendMode: 'normal',
  //     backdropFilter: 'blur(35px)',
  //     marginTop: '0px',
  //     padding: '0 20px 22px 11px',
  //   }),
  //   control: (provided, state) => {
  //     //valueLine
  //     return {
  //       ...provided,
  //       background: state.menuIsOpen ? 'rgba(255, 255, 255, 0.16)' : '#FFFFFF',
  //       boxShadow: state.menuIsOpen
  //         ? 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'
  //         : 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)',
  //       backdropFilter: 'blur(35px)',
  //       mixBlendMode: 'normal',
  //       border: 'none',
  //       borderRadius: state.menuIsOpen ? '7px 7px 0 0' : '7px',
  //       color: '#464C52',
  //       height: '60px',
  //       width: '100%',
  //       cursor: 'pointer',
  //       marginBottom: '20px',
  //       paddingRight: '28px',
  //       paddingLeft: '12px',
  //     };
  //   },
  //   placeholder: (provided, state) => ({
  //     ...provided,
  //     color: '#464C52',
  //     fontSize: '18px',
  //     textAlign: 'left',
  //   }),
  //   dropdownIndicator: (provided, state) => ({
  //     // ...provided,
  //     height: '20px',
  //     width: '20px',
  //     color: '#4453AD',
  //   }),
  //   indicatorsContainer: () => ({
  //     color: 'transparent',
  //   }),
  //   singleValue: (provided, state) => ({
  //     ...provided,
  //     color: '#464C52',
  //     fontSize: '18px',
  //     background: state.isSelected ? 'black' : 'transparent',
  //   }),
  //   option: (provided, state) => {
  //     return {
  //       ...provided,
  //       ':hover': {
  //         background: '#FFFFFF',
  //         boxShadow: 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)',
  //         borderRadius: '7px',
  //       },
  //       // -------------------------------->
  //       background: state.isSelected ? 'rgba(255, 255, 255, 0.16)' : 'transparent',
  //       // -------------------------------->
  //       boxShadow: state.isSelected && '7px 21px 22px -15px rgba(51, 78, 131, 0.17)',
  //       // -------------------------------->
  //       display: 'flex',
  //       color: '#616161',
  //       mixBlendMode: 'normal',
  //       height: state.isSelected ? '43px' : '60px',
  //       padding: '5px 10px',
  //       fontSize: '18px',
  //       borderRadius: '7px',
  //     };
  //   },
  // };

  const filterData = (Data) => {
    return Data.filter(d => d.id.includes(inputValue) || (d.token0.symbol + ' ' + d.token1.symbol).includes(inputValue.toUpperCase()) || d.token0.name.includes(inputValue) || d.token1.name.includes(inputValue));
  }

  return (
    <div>
      {/*<button onClick={() => {setIsModalOpen(true)}}>Open</button>*/}
      {/*{Content}*/}
      <LiquidityPoolsTable
          data={Data}
          type={'uniswap'}
          AllTokens={AllTokens}
          addLiquidity={addLiquidity}
          addLiquidityNormal={addLiquidityNormal}
          protocolType={'Unisvap V2'}
      />

      <br />
      <center>
        <AddNewGroupButton
          isLightTheme={isLightTheme}
          onClick={(e) => {
            setPage(Page + 1);
          }}>
          {Loading ? 'Loading...' : 'More Pools'}
        </AddNewGroupButton>

        {/*ModalContainer - this is component consists portal logic inside. Component wraps content and displays it as a children. */}
       {/*Modal is here =====================================>*/}
       {/* <ModalContainer title={'Add Liquidity'} isOpen={isModalOpen} onClose={() => {setIsModalOpen(false)}}>*/}
       {/*   <SelectWrapper>*/}
       {/*     <SelectTitle>{'Supply a token'}</SelectTitle>*/}
       {/*     <Select*/}
       {/*         defaultValue={'Ethereum'}*/}
       {/*         styles={selectStyle}*/}
       {/*       options={updatedOptions}*/}
       {/*   />*/}
       {/*   <InputBlock>*/}
       {/*     <ModalInput type="number"/>*/}
       {/*     <Balance>{`Balance: ${5}`}</Balance>*/}
       {/*   </InputBlock>*/}
       {/*     <ButtonsBlock>*/}
       {/*       <SupplyTokenButton>{`Supply a token`}</SupplyTokenButton>*/}
       {/*     </ButtonsBlock>*/}
       {/*     <ButtonsBlock>*/}
       {/*       <ChangeToken>{'Or'}</ChangeToken>*/}
       {/*     </ButtonsBlock>*/}
       {/*     <SelectTitle>{'Supply a token'}</SelectTitle>*/}
       {/*     <InputBlock>*/}
       {/*       <ModalInput type="number"/>*/}
       {/*       <Balance>{`Balance: ${5}`}</Balance>*/}
       {/*     </InputBlock>*/}
       {/*     <InputBlock>*/}
       {/*       <ModalInput type="number"/>*/}
       {/*       <Balance>{`Balance: ${5}`}</Balance>*/}
       {/*     </InputBlock>*/}
       {/*     <LinksContainer>*/}
       {/*       <ModalLink href={'#'}>aaa</ModalLink>*/}
       {/*       <ModalLinkRight href={'#'}>bbb</ModalLinkRight>*/}
       {/*       <ModalLink href={'#'}>ccc</ModalLink>*/}
       {/*       <ModalLinkRight href={'#'}>ddd</ModalLinkRight>*/}
       {/*     </LinksContainer>*/}
       {/*   <ButtonsBlock>*/}
       {/*     <SupplyTokenButton>{`Supply tokens`}</SupplyTokenButton>*/}
       {/*   </ButtonsBlock>*/}
       {/*   </SelectWrapper>*/}
       {/* </ModalContainer>*/}
        {/*Modal is here =====================================>*/}
      </center>
      {/*{Content}*/}
    </div>
  );
}
