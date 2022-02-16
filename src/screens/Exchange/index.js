/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import './exchange.css';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import TransparentButton from '../../components/TransparentButton';
import Web3 from 'web3';
import ERC20ABI from '../../abi/ERC20.json';
import closeModalIcon from '../../assets/icons/close_nft.svg';
import closeModalIconDark from '../../assets/icons/closenftdark.svg';
import OutsideClickHandler from './outsideClickHandler';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Modal,
  OutlinedInput,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@material-ui/core';
import Uniswap from '../../assets/icons/Uniswap.webp';
import EthIcon from '../../assets/icons/ethereum.svg';
// import Curve from '../../generalAssets/icons/Curve.webp';
// import SushiSwap from '../../generalAssets/icons/Sushiswap.webp';
// import Bancor from '../../generalAssets/icons/Bancor.webp';
import Balancer from '../../assets/icons/balancer.png';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { useParams } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Avatar from 'react-avatar';
import ethImage from '../../assets/icons/eth.png';
import switchTokensLight from '../../assets/icons/switchTokensLight.svg';
import switchTokensDark from '../../assets/icons/switchTokensDark.svg';
import daiICon from '../../assets/icons/daiIcon.svg';
import paraSwapIcon from '../../assets/icons/exchangers/paraSwapExchangerIcon.svg';
import searchTokensImportModalLight from '../../assets/icons/searchTokensButtonMobileLight.svg';
import searchTokensImportModalDark from '../../assets/icons/searchTokensInputModalDark.svg';

import uniIcon from '../../assets/icons/exchangers/uniswapExchangerIcon.svg';
import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@material-ui/styles';
import plusIconLight from '../../assets/icons/plusIconLight.svg';
import plusIconDark from '../../assets/icons/plusIconDark.svg';

//-------

import NukeExchange from './nukeExchange';
import MenuItem from '@material-ui/core/MenuItem';
import CurrencySearchModal from '../../components/CurrencySearchModal';
import {
  ChooseBtnTokenBlock,
  ChosenSendReceiveTokenValueInput,
  ChosenTokenLabel,
  ColumnMainSubTitles,
  ColumnMainTitles,
  DownDelimiterLabelsBlock,
  ExchangeMainLayout,
  FirstColumnSwapSubBlock,
  FirstColumnTitleBlock,
  LabelsBlockSubBlock,
  NewMultiSwapButton,
  AdditionalOptionsSwapTokensSubBlock,
  SecondColumnSwapSubBlock,
  SecondColumnTitleBlock,
  SecondColumnTitleHeaderBlock,
  SendBlockLabels,
  SendReceiveSubBlock,
  SendTokensChooseButton,
  SwapTokensMainSubBlock,
  SwapBlockDelimiter,
  SwapFirstColumn,
  SwapSecondColumn,
  SwitchTokensBtn,
  LabelsBlockImportantSpan,
  LabelsBlockSubBlockSpan,
  SwapBlockExchangeLayout,
  MultiSwapChooseBtnTokenBlock,
  MultiSwapSendTokensChooseBlock,
  MultiSwapSendValueLabel,
  MultiSwapReceiveTokensBlock,
  AddReceiveTokenMultiSwapBtn,
  FirstColumnTitleHeaderBlock,
  TokensModalSubLayout,
  SearchTokensModal,
  SearchTokensModalTextField,
  SendTokensModalList,
  SendTokenModalListItem,
  SendTokenImg,
  SendTokenLabelsBlock,
  SendTokenName,
  SendTokenConvertedMeasures,
  SendTokenBalance,
  AbsentFoundTokensBlock,
  SwapTokensOfferedBySubBlock,
  ExchangersMainSubLayout,
  OfferedByLayoutLabelBlock,
  ExchangersLayout,
  ExchangersLayoutTitlesBlock,
  ExchangersMainListLayout,
  ExchangerMainList,
  ExchangerElementListItem,
  ExchangerElementSpan,
  ExchangerBestRateSpan,
  ExchangerIcon,
  GreenDotIcon,
  SaveSelectedExchangerButton,
  SingleSwapTokensOfferedBySubBlock,
} from './styled';
import { useDispatch, useSelector } from 'react-redux';
import pyramidIcon from '../../assets/icons/pyramidIcon.svg';
import chevronDownBlack from '../../assets/icons/chevronDownLightTheme.svg';
import chevronDownLight from '../../assets/icons/chevronDownLight.svg';
import MultiSwapComponent from './multiSwap';
import SelectTokensModalContainer from './selectTokensModal';
import { SelectWrapper } from '../../components/liquidityPoolContents/styledComponents';
import {
  Balance,
  BlockTokenName,
  BlockTokens,
  ButtonsBlock,
  ChangeToken,
  InputBlock,
  LinksContainer,
  ModalInput,
  ModalLink,
  ModalLinkRight,
  SelectTitle,
  SupplyTokenButton,
} from '../../components/liquidityPoolContents/uniV2/StyledComponents';
import { TokenImage, ModalTitle, CloseButton, Header } from './selectTokensModal/styles';
import Autocomplete from '@mui/material/Autocomplete';
import searchIcon from '../../assets/icons/searchIconLight.png';

import SearchIcon from '@mui/icons-material/Search';
import { TokensListTextField } from '../../components/searchTokens/styles';
import actionTypes from '../../constants/actionTypes';
import testFunction from './helpers';
import { getTokenDataSaga } from '../../store/currentTokenData/actions';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import Popover from '@mui/material/Popover';
import sendTokensMockList from './sendTokensMockList.json';

const useStyles = makeStyles((theme) => ({
  noBorder: {
    border: 'none !important',
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const styles = () => ({
  selected: {
    color: 'red',
  },
});
const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.default',
  // border: '2px solid #000',
  // boxShadow: 24,
  p: 4,
  borderRadius: '10px',
};
const CurrencySelect = styled.button`
  align-items: center;
  height: 42px;
  font-size: 18px;
  font-weight: 600;
  background-color: transparent;
  color: #737373;
  border-radius: 12px;
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
  padding: 0 0.5rem;
  margin: 0 0.5rem;
  :focus,
  :hover {
    background-color: blue;
  }
`;
const erc20Abi = [
  'function balanceOf(address owner) view returns (uint256)',
  'function approve(address _spender, uint256 _value) public returns (bool success)',
  'function allowance(address _owner, address _spender) public view returns (uint256 remaining)',
];
// const selectedProvider = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/8b2159b7b0944586b64f0280c927d0a8"))
const selectedProvider = new ethers.providers.JsonRpcProvider(
  'https://mainnet.infura.io/v3/8b2159b7b0944586b64f0280c927d0a8'
);
const makeCall = async (callName, contract, args, metadata = {}) => {
  if (contract[callName]) {
    let result;
    if (args) {
      result = await contract[callName](...args, metadata);
    } else {
      result = await contract[callName]();
    }
    return result;
  } else {
    console.log('no call of that name!');
  }
};

import { filteredTokensByName } from './helpers';
import TOKENDECIMALSABI from '../../abi/TokenDecomals.json';
import ROUTERABI from '../../abi/UniRouterV2.json';
import exchangersOfferedList from './exchangersOfferedList';
import greenDot from '../../assets/icons/greenDot.svg';

export default function SwapComponent() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { address } = useParams();

  const [value, setValue] = useState(0);
  const [sendTokenForExchange, setSendTokenForExchange] = useState({
    symbol: 'ETH',
    logoURI: EthIcon,
    avatarIcon: 'Ethereum',
    name: 'Ethereum',
    id: 'ethereum',
    sendTokensListItem: true,
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  });
  const [receiveTokenForExchange, setReceiveTokenForExchange] = useState({
    symbol: 'DAI',
    logoURI: daiICon,
    avatarIcon: 'Dai Stablecoin',
    name: 'dai',
    id: 'dai',
    receiveTokensListItem: true,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  });
  const [filteredData, setFilteredData] = useState([]);
  const [filteredReceiveTokensListData, setFilteredReceiveTokensListData] = useState([]);
  const [tokenSendUSDCurrency, setTokenSendUSDCurrency] = useState('$0.00');
  const [tokenReceiveUSDCurrency, setTokensReceiveUSDCurrency] = useState('$0.00');

  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);

  //mock data
  // const finalSendTokensList = sendTokensMockList;

  //work saga
  const finalSendTokensList = useSelector((state) => state.tokensListReducer.sendTokensList);
  const finalReceiveTokensList = useSelector((state) => state.tokensListReducer.receiveTokensList);

  console.log('single finalSendTokensList', finalSendTokensList);
  console.log('single finalReceiveTokensList', finalReceiveTokensList);
  // console.log('sendTokenForExchange singleSwap state', sendTokenForExchange);
  // console.log('receiveTokenForExchange singleSwap state', receiveTokenForExchange);

  //---OLD states

  const [TokenTo, setTokenTo] = useState('');
  const [sendTokenForExchangeAmount, setSendTokenForExchangeAmount] = useState();
  const [receiveTokenForExchangeAmount, setReceiveTokenForExchangeAmount] = useState();
  const [TokenToAmount, setTokenToAmount] = useState();
  const [Slippage, setSlippage] = useState(2);
  const [Sources, setSources] = useState([]);
  const [protocolsRateList, setprotocolsRateList] = useState([]);
  const [ethPrice, setethPrice] = useState(0);
  const [selectedRate, setselectedRate] = useState(null);
  const [newSelectedRate, setnewSelectedRate] = useState(null);
  const [txSuccess, settxSuccess] = useState(false);
  const [txFailure, settxFailure] = useState(false);
  const [selectedExchangeName, setselectedExchangeName] = useState('');
  const [currencyModal, setcurrencyModal] = useState(false);
  const [currencyToModal, setcurrencyToModal] = useState(false);
  const [toTokens, settoTokens] = useState([]);
  const [isSendTokensModalVisible, setIsSendTokensModalVisible] = useState(false);
  const [isReceiveTokensModalVisible, setIsReceiveTokensModalVisible] = useState(false);

  useEffect(async () => {
    try {
      dispatch({ type: actionTypes.SET_SEND_TOKENS_LIST, payload: address });
      dispatch({ type: actionTypes.SET_RECEIVE_TOKENS_LIST });
      dispatch(getTokenDataSaga(receiveTokenForExchange.id));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    finalSendTokensList.length !== 0 && setFilteredData(finalSendTokensList);
    finalReceiveTokensList.length !== 0 && setFilteredReceiveTokensListData(finalReceiveTokensList);
  }, [finalSendTokensList, finalReceiveTokensList]);

  //function of dynamic converting of token value to USD Currency

  let convertSendTokenToUSDCurrency = async (tokenData) => {
    console.log('main send tokenData', tokenData);

    if (tokenData.amount === '') tokenData.amount = '0';

    if (tokenData.symbol === 'ETH') {
      // console.log('type send USD eth triggered');
      const ethDollarValue = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
      );
      setTokenSendUSDCurrency(
        `$${(ethDollarValue.data.ethereum.usd * parseInt(tokenData.amount)).toFixed(2)}`
      );
    } else {
      if (tokenData.USDCurrency !== undefined) {
        setTokenSendUSDCurrency(
          `$${(tokenData.USDCurrency * parseInt(tokenData.amount)).toFixed(2)}`
        );
      } else {
        setTokenSendUSDCurrency('Price not available');
      }
    }
  };

  let convertReceiveTokenToUSDCurrency = async (tokenData) => {
    if (tokenData.amount === '') {
      tokenData.amount = '0';
    }

    console.log('main receive tokenData', tokenData);

    let tokenUSDCurrencyValue;

    if (tokenData.address !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      console.log('first triggered');

      await axios
        .get(
          `https://api.ethplorer.io/getTokenInfo/${tokenData.address}?apiKey=EK-qSPda-W9rX7yJ-UY93y`
        )
        .then(async (response) => {
          // console.log('suc get usd', response);
          tokenUSDCurrencyValue = response;
        })
        .catch((err) => {
          console.log('err of usd currency receive token', err);
          // tokenUSDCurrencyValue = err;
        });

      console.log('receive tokenData USDCurrency', tokenUSDCurrencyValue);

      if (tokenUSDCurrencyValue) {
        setTokensReceiveUSDCurrency(
          `$ ${(tokenUSDCurrencyValue.data.price.rate * parseInt(tokenData.amount)).toFixed(2)}`
        );
      } else {
        setTokensReceiveUSDCurrency('Price not available');
      }
    } else {
      const ethDollarValue = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
      );

      setTokensReceiveUSDCurrency(
        `$${(ethDollarValue.data.ethereum.usd * parseInt(tokenData.amount)).toFixed(2)}`
      );
    }
  };

  //----------

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

  async function transact() {
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log('account selected is :::', accounts[0]);

    if (selectedRate !== null) {
      let txObject = selectedRate.transactObject;
      txObject.gas = parseInt(txObject.gas) + 100000;
      txObject.from = accounts[0];
      if (sendTokenForExchange.symbol !== 'ETH') {
        const ERC20contract = new web3.eth.Contract(ERC20ABI, txObject.sellTokenAddress);
        await ERC20contract.methods
          .approve(txObject.allowanceTarget, txObject.sellAmount)
          .send({ from: accounts[0] });
      }
      try {
        await web3.eth.sendTransaction(txObject);
        settxSuccess(true);
      } catch (error) {
        console.log('tx failed::', error);
        settxFailure(true);
      }
    } else {
      alert('Please Fill All fields');
    }
  }

  const calculateToAmount = async (tokenFromAmount) => {
    console.log('calculate method called with ammount::', tokenFromAmount);
    console.log('value of Tokenfromamount::', sendTokenForExchangeAmount);
    console.log('value of tokenfrom object::', sendTokenForExchange);
    console.log('value of tokenTo::', TokenTo);
    if (tokenFromAmount > 0) {
      // console.log("calculate amount is called")
      if (sendTokenForExchange.symbol !== '' && TokenTo !== '') {
        let differentQuoteList = [];
        const protocolsList = ['', 'Uniswap', 'Curve', 'SushiSwap', 'Bancor', 'Balancer'];
        let amount = parseFloat(tokenFromAmount) * Math.pow(10, 18);
        const tokenToDollarValue = await dollarValueOfToken(TokenTo.address);

        for (let i = 0; i < protocolsList.length; i++) {
          try {
            let protocolQuote = {};
            const response = await axios.get(
              `https://ropsten.api.0x.org/swap/v1/quote?buyToken=${TokenTo.symbol}&sellToken=${sendTokenForExchange.symbol}&sellAmount=${amount}&feeRecipient=0xE609192618aD9aC825B981fFECf3Dfd5E92E3cFB&buyTokenPercentageFee=0.02&includedSources=${protocolsList[i]}`
            );
            console.log(`response for all ${protocolsList[i]}`, response.data);

            if (protocolsList[i] === '') {
              protocolQuote.name = '0x Index';
              var sources = response.data.sources;
              sources.sort((a, b) => parseFloat(b.proportion) - parseFloat(a.proportion));
              var sources2 = [];
              for (var j = 0; j < sources.length; j++) {
                if (sources[j].proportion > 0) {
                  sources2.push(sources[j]);
                }
              }
              setSources(sources2);
            } else {
              protocolQuote.name = protocolsList[i];
            }
            protocolQuote.price = response.data.price;
            protocolQuote.minPrice = response.data.guaranteedPrice;
            protocolQuote.TokenToAmount = (
              parseInt(response.data.buyAmount) * Math.pow(10, -TokenTo.decimals)
            )
              .toFixed(2)
              .toString();
            protocolQuote.gas = (
              parseInt(response.data.gas) *
              parseInt(response.data.gasPrice) *
              Math.pow(10, -18) *
              ethPrice
            ).toFixed(2);
            console.log('dollar value of token', tokenToDollarValue);
            protocolQuote.receivedValueInDollar = (
              parseInt(response.data.buyAmount) *
              Math.pow(10, -TokenTo.decimals) *
              tokenToDollarValue
            ).toFixed(2);
            protocolQuote.netReceived =
              parseFloat(protocolQuote.receivedValueInDollar) - parseFloat(protocolQuote.gas);
            protocolQuote.transactObject = response.data;
            // protocolQuote.image = `../../generalAssets/icons/${protocolsList[i]}.webp`;
            if (protocolsList[i] === 'Bancor') {
              protocolQuote.image =
                'https://assets.coingecko.com/coins/images/14053/small/bancorvbnt_32.png?1614048819';
            }
            if (protocolsList[i] === 'Uniswap') {
              protocolQuote.image =
                'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png?1600306604';
            }
            if (protocolsList[i] === 'Curve') {
              protocolQuote.image =
                'https://assets.coingecko.com/markets/images/538/small/Curve.png?1591605481';
            }
            if (protocolsList[i] === 'SushiSwap') {
              protocolQuote.image =
                'https://assets.coingecko.com/markets/images/576/small/2048x2048_Logo.png?1609208464';
            }
            if (protocolsList[i] === 'Balancer') {
              protocolQuote.image =
                'https://assets.coingecko.com/coins/images/11683/small/Balancer.png?1592792958';
            }
            if (protocolsList[i] === '') {
              protocolQuote.image =
                'https://assets.coingecko.com/markets/images/565/small/0x-protocol.png?1596623034';
            }
            differentQuoteList.push(protocolQuote);
          } catch (err) {
            console.log(`error come for ${protocolsList[i]}`, err);
          }
        }
        differentQuoteList.sort((a, b) => b.netReceived - a.netReceived);
        setselectedRate(differentQuoteList[0]);
        console.log('differentQuoteList[0].name', differentQuoteList);
        setselectedExchangeName(differentQuoteList[0].name);
        setprotocolsRateList(differentQuoteList);
        console.log('different rates we have::', differentQuoteList);
      }
    }
  };

  const selectSendTokenForExchange = (selectSendToken) => {
    console.log('selected send token value object 111', selectSendToken);
    setSendTokenForExchange(selectSendToken);
    setSendTokenForExchangeAmount(1);
    //old
    setTokenToAmount(0);
    setprotocolsRateList([]);
    setselectedRate(null);
    setSources([]);
  };

  const selectReceiveTokenForExchange = (selectReceiveToken) => {
    console.log('selected receive token value object 111', selectReceiveToken);
    setReceiveTokenForExchange(selectReceiveToken);
    setReceiveTokenForExchangeAmount(1);
    //old
    setTokenToAmount(0);
    setprotocolsRateList([]);
    setselectedRate(null);
    setSources([]);
  };

  console.log('token receive swap tokenReceiveUSDCurrency', tokenReceiveUSDCurrency);

  //---------------------

  const [toggleExchangedTokens, setToggleExchangedTokens] = useState(false);

  const toggleSwappedTokens = () => {
    setToggleExchangedTokens(!toggleExchangedTokens);
    setReceiveTokenForExchange(sendTokenForExchange);
    setSendTokenForExchange(receiveTokenForExchange);
    setTokenSendUSDCurrency(tokenReceiveUSDCurrency);
    setTokensReceiveUSDCurrency(tokenSendUSDCurrency);
    setSendTokenForExchangeAmount(receiveTokenForExchangeAmount);
    setReceiveTokenForExchangeAmount(sendTokenForExchangeAmount);
  };

  const searchTokensHandler = (event, searchTokensData) => {
    const result = filteredTokensByName(event, searchTokensData);
    console.log('result', result);
    if (searchTokensData.searchSendTokensList === true) {
      setFilteredData(result);
    } else {
      setFilteredReceiveTokensListData(result);
    }
  };

  //convert one token to another
  //now - mock Uniswap V2 Contract address

  const convertExchangeTokensCourse = async (convertTokensData) => {
    console.log('convertTokensData single swap', convertTokensData);
    console.log('single swap tokenDecimal token1', convertTokensData.sendTokenForExchangeAddress);
    console.log(
      'single swap tokenDecimal token2',
      convertTokensData.receiveTokenForExchangeAddress
    );

    await loadWeb3();
    const web3 = window.web3;

    const tokenDecimal1 = await new web3.eth.Contract(
      TOKENDECIMALSABI,
      convertTokensData.sendTokenForExchangeAddress
    ).methods
      .decimals()
      .call()
      .then((res) => {
        return res;
      });
    const tokenDecimal2 = await new web3.eth.Contract(
      TOKENDECIMALSABI,
      convertTokensData.receiveTokenForExchangeAddress
    ).methods
      .decimals()
      .call()
      .then((res) => {
        return res;
      });

    console.log('single swap tokenDecimal 1', tokenDecimal1);
    console.log('single swap tokenDecimal 2', tokenDecimal2);

    // const NewContract = new web3.eth.Contract(
    //   ROUTERABI,
    //   //UNISWAP V2 contract address
    //   '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
    // );
    // if (!isNaN(value)) {
    //   if (inputId === 'firstInput') {
    //     const convertedValue = await NewContract.methods
    //       .getAmountsOut((value * 10 ** tokenDecimal1).toString(), [token1, token2])
    //       .call();
    //
    //     setAddLiquidityNormalTokenA((value * 10 ** tokenDecimal1).toString());
    //     setAddLiquidityNormalTokenB(convertedValue[1]);
    //
    //     setOutValue(+convertedValue[1] / 10 ** tokenDecimal2);
    //     setInValue(value);
    //   }
    //   if (inputId === 'secondInput') {
    //     const convertedValue = await NewContract.methods
    //       .getAmountsIn((value * 10 ** tokenDecimal2).toString(), [token1, token2])
    //       .call();
    //
    //     setAddLiquidityNormalTokenA(convertedValue[0]);
    //     setAddLiquidityNormalTokenB((value * 10 ** tokenDecimal2).toString());
    //
    //     setInValue(+convertedValue[0] / 10 ** tokenDecimal1);
    //     setOutValue(value);
    //   }
    // } else {
    //   setInValue('');
    //   setOutValue('');
    // }
  };

  //popover

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  //-----

  return (
    <>
      <ExchangeMainLayout>
        <SwapFirstColumn>
          <FirstColumnSwapSubBlock>
            <FirstColumnTitleHeaderBlock>
              <ColumnMainTitles isLightTheme={isLightTheme}>Swap</ColumnMainTitles>
              <ColumnMainSubTitles isLightTheme={isLightTheme}>
                Trade any token or LP share in a single transaction
              </ColumnMainSubTitles>
            </FirstColumnTitleHeaderBlock>
            <SwapTokensMainSubBlock isLightTheme={isLightTheme}>
              {/*send block */}
              <SendReceiveSubBlock>
                <SendBlockLabels isLightTheme={isLightTheme}>
                  <span>Send</span>
                  <span>{tokenSendUSDCurrency}</span>
                </SendBlockLabels>

                {/* Open modal with tokens list*/}
                <SendTokensChooseButton isLightTheme={isLightTheme}>
                  <ChooseBtnTokenBlock onClick={() => setIsSendTokensModalVisible(true)}>
                    {sendTokenForExchange.logoURI !== null ? (
                      <SendTokenImg alt="token_img" src={sendTokenForExchange.logoURI} />
                    ) : (
                      <Avatar
                        style={{
                          marginRight: '12px',
                          marginLeft: '12px',
                          marginTop: '2px',
                        }}
                        name={sendTokenForExchange.avatarIcon}
                        round={true}
                        size="21"
                        textSizeRatio={1}
                      />
                    )}
                    <ChosenTokenLabel isLightTheme={isLightTheme}>
                      {sendTokenForExchange.symbol === 'ethereum'
                        ? 'ETH'
                        : sendTokenForExchange.symbol}
                    </ChosenTokenLabel>
                    <img
                      src={isLightTheme ? chevronDownBlack : chevronDownLight}
                      alt="chevron_icon"
                    />
                  </ChooseBtnTokenBlock>
                  <ChosenSendReceiveTokenValueInput
                    InputProps={{
                      inputProps: {
                        style: {
                          textAlign: 'right',
                          paddingRight: 0,
                          width: '100px',
                          fontWeight: 600,
                          color: isLightTheme ? 'black' : 'white',
                        },
                      },
                      classes: { notchedOutline: classes.noBorder },
                    }}
                    isLightTheme={isLightTheme}
                    placeholder="0.0"
                    value={sendTokenForExchangeAmount}
                    onChange={(e) => {
                      setSendTokenForExchangeAmount(e.target.value);
                      convertSendTokenToUSDCurrency({
                        amount: e.target.value,
                        ...sendTokenForExchange,
                      });
                      convertExchangeTokensCourse({
                        inputId: 'firstInput',
                        tokenAmount: parseInt(e.target.value),
                        sendTokenForExchangeAddress: sendTokenForExchange.address,
                        receiveTokenForExchangeAddress: receiveTokenForExchange.address,
                      });
                    }}
                  />
                </SendTokensChooseButton>

                {/* modal with send tokens list*/}

                {isSendTokensModalVisible && (
                  <SelectTokensModalContainer
                    theme={isLightTheme}
                    isOpen={isSendTokensModalVisible}
                    onClose={() => {
                      setIsSendTokensModalVisible(false);
                    }}>
                    <OutsideClickHandler
                      onOutsideClick={() => {
                        setIsSendTokensModalVisible(false);
                        setFilteredData(finalSendTokensList);
                      }}>
                      <TokensModalSubLayout isLightTheme={isLightTheme}>
                        <Header>
                          <ModalTitle isLightTheme={isLightTheme}>
                            Select token for sending
                          </ModalTitle>
                          <CloseButton
                            onClick={() => {
                              setIsSendTokensModalVisible(false);
                              setFilteredData(finalSendTokensList);
                            }}
                            isLightTheme={isLightTheme}>
                            <img
                              src={isLightTheme ? closeModalIcon : closeModalIconDark}
                              alt="close_modal_btn"
                            />
                          </CloseButton>
                        </Header>

                        <SearchTokensModalTextField
                          isLightTheme={isLightTheme}
                          onChange={(event) => {
                            searchTokensHandler(event, {
                              tokensList: finalSendTokensList,
                              searchSendTokensList: true,
                            });
                          }}
                          InputProps={{
                            endAdornment: (
                              <img
                                src={
                                  isLightTheme
                                    ? searchTokensImportModalDark
                                    : searchTokensImportModalLight
                                }
                                alt="search_icon"
                              />
                            ),
                            classes: { notchedOutline: classes.noBorder },
                            sx: {
                              color: isLightTheme ? '#1E1E20' : '#FFFFFF',
                              paddingRight: '20px',
                              fontSize: 14,
                            },
                          }}
                          id="filled-search"
                          variant="outlined"
                          label="Search tokens..."
                          InputLabelProps={{
                            style: {
                              color: isLightTheme ? 'black' : 'white',
                              fontSize: 14,
                              fontWeight: 400,
                              opacity: 0.5,
                              lineHeight: '22px',
                            },
                          }}
                          size="small"
                        />

                        {filteredData.length !== 0 ? (
                          <SendTokensModalList isLightTheme={isLightTheme}>
                            {filteredData.map((object) => (
                              <SendTokenModalListItem
                                key={object.name}
                                onClick={() => {
                                  setIsSendTokensModalVisible(false);
                                  setFilteredData(finalSendTokensList);
                                  selectSendTokenForExchange({
                                    ...object,
                                    sendTokensListItem: true,
                                  });
                                  convertSendTokenToUSDCurrency({
                                    amount: 1,
                                    sendTokensListItem: true,
                                    ...object,
                                    address: object.address,
                                  });
                                }}
                                isLightTheme={isLightTheme}>
                                <SendTokenLabelsBlock>
                                  {object.logoURI !== null ? (
                                    <SendTokenImg alt="token_img" src={object.logoURI} />
                                  ) : (
                                    <Avatar
                                      style={{
                                        marginLeft: '12px',
                                        marginRight: '12px',
                                        marginTop: '2px',
                                      }}
                                      name={object.name}
                                      round={true}
                                      size="21"
                                      textSizeRatio={1}
                                    />
                                  )}
                                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <SendTokenName isLightTheme={isLightTheme}>
                                      {object.name}
                                    </SendTokenName>
                                    <SendTokenConvertedMeasures isLightTheme={isLightTheme}>
                                      409,333 UNI · $19,18
                                    </SendTokenConvertedMeasures>
                                  </div>
                                </SendTokenLabelsBlock>
                                <SendTokenBalance isLightTheme={isLightTheme}>
                                  {object.balance === undefined ? (
                                    <Loader type="Rings" color="#BB86FC" height={30} width={30} />
                                  ) : (
                                    <span>${object.balance}</span>
                                  )}
                                </SendTokenBalance>
                              </SendTokenModalListItem>
                            ))}
                          </SendTokensModalList>
                        ) : (
                          <AbsentFoundTokensBlock isLightTheme={isLightTheme}>
                            <p>No tokens were found</p>
                          </AbsentFoundTokensBlock>
                        )}
                      </TokensModalSubLayout>
                    </OutsideClickHandler>
                  </SelectTokensModalContainer>
                )}

                <SwitchTokensBtn
                  onClick={toggleSwappedTokens}
                  src={isLightTheme ? switchTokensLight : switchTokensDark}
                  alt="switch_tokens_btn"
                />
              </SendReceiveSubBlock>

              {/* modal with receive tokens list*/}

              <SendReceiveSubBlock style={{ marginTop: '-9px' }}>
                <SendBlockLabels isLightTheme={isLightTheme}>
                  <span>Receive</span>
                  <span>{tokenReceiveUSDCurrency}</span>
                </SendBlockLabels>
                <SendTokensChooseButton isLightTheme={isLightTheme}>
                  {/*{toggleExchangedTokens ? (*/}
                  {/*  <div>Toggled</div>*/}
                  {/*) : (*/}
                  <ChooseBtnTokenBlock onClick={() => setIsReceiveTokensModalVisible(true)}>
                    {receiveTokenForExchange.logoURI !== null ? (
                      <SendTokenImg alt="token_img" src={receiveTokenForExchange.logoURI} />
                    ) : (
                      <Avatar
                        style={{
                          marginRight: '12px',
                          marginLeft: '12px',
                          marginTop: '2px',
                        }}
                        name={receiveTokenForExchange.avatarIcon}
                        round={true}
                        size="21"
                        textSizeRatio={1}
                      />
                    )}
                    <ChosenTokenLabel isLightTheme={isLightTheme}>
                      {receiveTokenForExchange.symbol}
                    </ChosenTokenLabel>

                    <img
                      src={isLightTheme ? chevronDownBlack : chevronDownLight}
                      alt="chevron_icon"
                    />
                  </ChooseBtnTokenBlock>
                  {/*)}*/}
                  <ChosenSendReceiveTokenValueInput
                    InputProps={{
                      inputProps: {
                        style: {
                          textAlign: 'right',
                          paddingRight: 0,
                          width: '100px',
                          fontWeight: 600,
                          color: isLightTheme ? 'black' : 'white',
                        },
                      },
                      classes: { notchedOutline: classes.noBorder },
                    }}
                    isLightTheme={isLightTheme}
                    placeholder="0.0"
                    value={receiveTokenForExchangeAmount}
                    onChange={(e) => {
                      setReceiveTokenForExchangeAmount(e.target.value);
                      convertReceiveTokenToUSDCurrency({
                        amount: e.target.value,
                        ...receiveTokenForExchange,
                      });
                    }}
                    onBlur={(e) => {
                      console.log('focus removed');
                    }}
                  />
                </SendTokensChooseButton>

                {/*  Modal for receive tokens list*/}
                {isReceiveTokensModalVisible && (
                  <SelectTokensModalContainer
                    theme={isLightTheme}
                    title="Select token"
                    isOpen={isReceiveTokensModalVisible}
                    onClose={() => {
                      setIsReceiveTokensModalVisible(false);
                    }}>
                    <OutsideClickHandler
                      onOutsideClick={() => {
                        setIsReceiveTokensModalVisible(false);
                        setFilteredReceiveTokensListData(finalReceiveTokensList);
                      }}>
                      <TokensModalSubLayout isLightTheme={isLightTheme}>
                        <Header>
                          <ModalTitle isLightTheme={isLightTheme}>
                            Select token for receiving
                          </ModalTitle>
                          <CloseButton
                            onClick={() => {
                              setIsReceiveTokensModalVisible(false);
                              setFilteredReceiveTokensListData(finalReceiveTokensList);
                            }}
                            isLightTheme={isLightTheme}>
                            <img
                              src={isLightTheme ? closeModalIcon : closeModalIconDark}
                              alt="close_modal_btn"
                            />
                          </CloseButton>
                        </Header>
                        <SearchTokensModalTextField
                          isLightTheme={isLightTheme}
                          onChange={(event) => {
                            searchTokensHandler(event, {
                              tokensList: finalReceiveTokensList,
                              searchReceiveTokensList: true,
                            });
                          }}
                          InputProps={{
                            endAdornment: (
                              <img
                                src={
                                  isLightTheme
                                    ? searchTokensImportModalDark
                                    : searchTokensImportModalLight
                                }
                                alt="search_icon"
                              />
                            ),
                            classes: { notchedOutline: classes.noBorder },
                            sx: {
                              color: isLightTheme ? '#1E1E20' : '#FFFFFF',
                              paddingRight: '20px',
                              fontSize: 14,
                            },
                          }}
                          id="filled-search"
                          // onChange={this.searchTokens}
                          variant="outlined"
                          label="Search tokens..."
                          InputLabelProps={{
                            style: {
                              color: isLightTheme ? 'black' : 'white',
                              fontSize: 14,
                              fontWeight: 400,
                              opacity: 0.5,
                              lineHeight: '22px',
                            },
                          }}
                          size="small"
                        />
                        {/* Tokens list for receive*/}
                        {filteredReceiveTokensListData.length !== 0 ? (
                          <SendTokensModalList isLightTheme={isLightTheme}>
                            {filteredReceiveTokensListData.map((object) => (
                              <SendTokenModalListItem
                                key={object.name}
                                onClick={() => {
                                  setIsReceiveTokensModalVisible(false);
                                  setFilteredReceiveTokensListData(finalReceiveTokensList);
                                  selectReceiveTokenForExchange({
                                    ...object,
                                    receiveTokensListItem: true,
                                  });
                                  convertReceiveTokenToUSDCurrency({
                                    amount: 1,
                                    receiveTokensListItem: true,
                                    ...receiveTokenForExchange,
                                    address: object.address,
                                  });
                                }}
                                isLightTheme={isLightTheme}>
                                <SendTokenLabelsBlock>
                                  {object.logoURI !== null ? (
                                    <SendTokenImg alt="token_img" src={object.logoURI} />
                                  ) : (
                                    <Avatar
                                      style={{
                                        marginLeft: '12px',
                                        marginRight: '12px',
                                        marginTop: '2px',
                                      }}
                                      name={object.name}
                                      round={true}
                                      size="21"
                                      textSizeRatio={1}
                                    />
                                  )}
                                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <SendTokenName isLightTheme={isLightTheme}>
                                      {object.name}
                                    </SendTokenName>
                                    <SendTokenConvertedMeasures isLightTheme={isLightTheme}>
                                      409,333 UNI · $19,18
                                    </SendTokenConvertedMeasures>
                                  </div>
                                </SendTokenLabelsBlock>
                                <SendTokenBalance isLightTheme={isLightTheme}>
                                  {object.balance === undefined ? (
                                    <Loader type="Rings" color="#BB86FC" height={30} width={30} />
                                  ) : (
                                    <span>${object.balance}</span>
                                  )}
                                </SendTokenBalance>
                              </SendTokenModalListItem>
                            ))}
                          </SendTokensModalList>
                        ) : (
                          <AbsentFoundTokensBlock isLightTheme={isLightTheme}>
                            <p>No tokens were found</p>
                          </AbsentFoundTokensBlock>
                        )}
                      </TokensModalSubLayout>
                    </OutsideClickHandler>
                  </SelectTokensModalContainer>
                )}
              </SendReceiveSubBlock>

              <SwapBlockDelimiter isLightTheme={isLightTheme} />

              {/* Labels block*/}
              <DownDelimiterLabelsBlock isLightTheme={isLightTheme}>
                <LabelsBlockSubBlock isLightTheme={isLightTheme}>
                  <LabelsBlockSubBlockSpan isLightTheme={isLightTheme}>
                    Min.Received
                  </LabelsBlockSubBlockSpan>
                  <LabelsBlockSubBlockSpan isLightTheme={isLightTheme}>
                    2829.673262 DA
                  </LabelsBlockSubBlockSpan>
                </LabelsBlockSubBlock>

                <LabelsBlockSubBlock isLightTheme={isLightTheme}>
                  <LabelsBlockSubBlockSpan isLightTheme={isLightTheme}>
                    Rate
                  </LabelsBlockSubBlockSpan>
                  <LabelsBlockSubBlockSpan isLightTheme={isLightTheme}>
                    1 ETH = 2,858.255 DAI
                  </LabelsBlockSubBlockSpan>
                </LabelsBlockSubBlock>

                <LabelsBlockSubBlock isLightTheme={isLightTheme}>
                  <LabelsBlockSubBlockSpan isLightTheme={isLightTheme}>
                    Offered by
                  </LabelsBlockSubBlockSpan>

                  <AdditionalOptionsSwapTokensSubBlock isLightTheme={isLightTheme}>
                    <img src={paraSwapIcon} alt="paraSwapIcon" />
                    <span onClick={handleClick} style={{ cursor: 'pointer' }}>
                      ParaSwap
                    </span>
                    <Popover
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                      }}
                      PaperProps={{
                        sx: {
                          marginTop: '-103px',
                          marginLeft: '27px',
                          width: '525px',
                          height: '490px',
                          backgroundColor: isLightTheme ? '#FFFFFF29' : '#4453AD1A',
                          boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(35px)',
                          mixBlendMode: 'normal',
                          borderRadius: '10px',
                        },
                      }}>
                      <SingleSwapTokensOfferedBySubBlock isLightTheme={isLightTheme}>
                        <ExchangersMainSubLayout>
                          <OfferedByLayoutLabelBlock
                            isLightTheme={isLightTheme}
                            onClick={handleClose}>
                            <img
                              src={isLightTheme ? chevronDownBlack : chevronDownLight}
                              alt="chevron_icon"
                            />
                            <span>Offered by</span>
                          </OfferedByLayoutLabelBlock>
                          <ExchangersLayout isLightTheme={isLightTheme}>
                            <ExchangersLayoutTitlesBlock isLightTheme={isLightTheme}>
                              <span>Receive</span>
                              <span>Gas fee</span>
                            </ExchangersLayoutTitlesBlock>
                            <ExchangersMainListLayout isLightTheme={isLightTheme}>
                              <ExchangerMainList>
                                {exchangersOfferedList.map((exchanger) => (
                                  <ExchangerElementListItem isLightTheme={isLightTheme}>
                                    <ExchangerElementSpan
                                      isLightTheme={isLightTheme}
                                      style={{ marginRight: '36px' }}>
                                      {exchanger.receiveTokenUSDCurrencyCourse}
                                    </ExchangerElementSpan>
                                    <ExchangerElementSpan isLightTheme={isLightTheme}>
                                      {exchanger.gasFee}
                                    </ExchangerElementSpan>
                                    <ExchangerBestRateSpan
                                      isLightTheme={isLightTheme}
                                      style={{
                                        visibility: exchanger.isBestRate === false && 'hidden',
                                      }}>
                                      Best rate
                                    </ExchangerBestRateSpan>
                                    <ExchangerIcon src={exchanger.logoIcon} alt="icon" />
                                    <GreenDotIcon
                                      src={greenDot}
                                      alt="green_dot"
                                      style={{
                                        visibility: exchanger.greenDotIcon === false && 'hidden',
                                      }}
                                    />
                                  </ExchangerElementListItem>
                                ))}
                              </ExchangerMainList>
                            </ExchangersMainListLayout>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <SaveSelectedExchangerButton isLightTheme={isLightTheme}>
                                Save
                              </SaveSelectedExchangerButton>
                            </div>
                          </ExchangersLayout>
                        </ExchangersMainSubLayout>
                      </SingleSwapTokensOfferedBySubBlock>
                    </Popover>
                  </AdditionalOptionsSwapTokensSubBlock>
                </LabelsBlockSubBlock>

                <LabelsBlockSubBlock isLightTheme={isLightTheme}>
                  <LabelsBlockImportantSpan isLightTheme={isLightTheme}>
                    Slippage Tolerance
                  </LabelsBlockImportantSpan>
                  <AdditionalOptionsSwapTokensSubBlock isLightTheme={isLightTheme}>
                    <span>1%</span>
                  </AdditionalOptionsSwapTokensSubBlock>
                </LabelsBlockSubBlock>

                <LabelsBlockSubBlock isLightTheme={isLightTheme}>
                  <LabelsBlockImportantSpan isLightTheme={isLightTheme}>
                    Transaction speed
                  </LabelsBlockImportantSpan>
                  <AdditionalOptionsSwapTokensSubBlock isLightTheme={isLightTheme}>
                    <span>$20 ^ Average</span>
                  </AdditionalOptionsSwapTokensSubBlock>
                </LabelsBlockSubBlock>
              </DownDelimiterLabelsBlock>

              <SwapBlockExchangeLayout isLightTheme={isLightTheme}>
                <Button onClick={() => calculateToAmount(sendTokenForExchange)}>Exchange</Button>
              </SwapBlockExchangeLayout>
            </SwapTokensMainSubBlock>
          </FirstColumnSwapSubBlock>
        </SwapFirstColumn>
        <SwapSecondColumn>
          <MultiSwapComponent />
        </SwapSecondColumn>
      </ExchangeMainLayout>
    </>
  );
}
