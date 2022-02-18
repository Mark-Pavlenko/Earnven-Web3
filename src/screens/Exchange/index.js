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
import { Box, Button } from '@material-ui/core';
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
  ExceededAmountTokensLimitWarning,
} from './styled';
import { useDispatch, useSelector } from 'react-redux';
import pyramidIcon from '../../assets/icons/pyramidIcon.svg';
import chevronDownBlack from '../../assets/icons/chevronDownLightTheme.svg';
import chevronDownLight from '../../assets/icons/chevronDownLight.svg';
import MultiSwapComponent from './multiSwap';
import SelectTokensModalContainer from './selectTokensModal';
import { TokenImage, ModalTitle, CloseButton, Header } from './selectTokensModal/styles';
import Autocomplete from '@mui/material/Autocomplete';
import searchIcon from '../../assets/icons/searchIconLight.png';

import SearchIcon from '@mui/icons-material/Search';
import { TokensListTextField } from '../../components/searchTokens/styles';
import actionTypes from '../../constants/actionTypes';
import {
  checkIfExchangedTokenLimitIsExceeded,
  convertSendTokenToUSDCurrencyHelper,
} from './helpers';
import { getTokenDataSaga } from '../../store/currentTokenData/actions';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import Popover from '@mui/material/Popover';
import sendTokensMockList from './sendTokensMockList.json';

const useStyles = makeStyles((theme) => ({
  noBorder: {
    border: 'none !important',
  },
}));

const erc20Abi = [
  'function balanceOf(address owner) view returns (uint256)',
  'function approve(address _spender, uint256 _value) public returns (bool success)',
  'function allowance(address _owner, address _spender) public view returns (uint256 remaining)',
];

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
import { addLiquiditySushiV2 } from '../liquidityPools/helpers';

export default function SwapComponent() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { address } = useParams();

  //work saga
  const finalSendTokensList = useSelector((state) => state.tokensListReducer.sendTokensList);
  const finalReceiveTokensList = useSelector((state) => state.tokensListReducer.receiveTokensList);
  const initSendTokenSwap = useSelector((state) => state.tokensListReducer.initSendTokenSwap);
  const initReceiveFirstTokenSwap = useSelector(
    (state) => state.tokensListReducer.initReceiveFirstTokenSwap
  );
  const selectedGasPrice = useSelector((state) => state.gesData.selectedGasPrice);
  const proposeGasPrice = useSelector((state) => state.gesData.proposeGasPrice);

  //console.log('single GasPrice selected', selectedGasPrice);
  //console.log('single GasPrice propose', proposeGasPrice);
  //console.log('initSendTokenSwap', initSendTokenSwap);
  //console.log('initReceiveFirstTokenSwap', initReceiveFirstTokenSwap);

  const [filteredData, setFilteredData] = useState([]);
  const [filteredReceiveTokensListData, setFilteredReceiveTokensListData] = useState([]);
  const [tokenSendUSDCurrency, setTokenSendUSDCurrency] = useState('$0.00');
  const [tokenReceiveUSDCurrency, setTokensReceiveUSDCurrency] = useState('$0.00');
  const [isTokensLimitExceeded, setIsTokensLimitExceeded] = useState(false);
  const [sendTokenForExchangeAmount, setSendTokenForExchangeAmount] = useState();
  const [receiveTokenForExchangeAmount, setReceiveTokenForExchangeAmount] = useState();
  const [isSendTokensModalVisible, setIsSendTokensModalVisible] = useState(false);
  const [isReceiveTokensModalVisible, setIsReceiveTokensModalVisible] = useState(false);
  const [toggleExchangedTokens, setToggleExchangedTokens] = useState(false);
  const [initConvertReceiveTokenAmount, setInitConvertReceiveTokenAmount] = useState(0);

  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);

  //mock data
  // const finalSendTokensList = sendTokensMockList;

  //console.log('single finalSendTokensList', finalSendTokensList);
  //console.log('single finalReceiveTokensList', finalReceiveTokensList);

  //console.log('1112 filteredSend', filteredData);
  //console.log('1112 filteredReceive', filteredReceiveTokensListData);

  //console.log('single swap sendTokenForExchangeAmount', sendTokenForExchangeAmount);
  //console.log('single swap receiveTokenForExchangeAmount', receiveTokenForExchangeAmount);

  //---OLD states

  const [TokenTo, setTokenTo] = useState('');

  // const [Slippage, setSlippage] = useState(2);
  // const [selectedRate, setselectedRate] = useState(null);

  //------

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

  useEffect(async () => {
    try {
      dispatch({ type: actionTypes.SET_SEND_TOKENS_LIST, payload: address });
      dispatch({ type: actionTypes.SET_RECEIVE_TOKENS_LIST });
      dispatch(getTokenDataSaga(initReceiveFirstTokenSwap.id));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    let filteredSendTokensList = finalSendTokensList.filter(
      (token) => token.symbol !== initSendTokenSwap.symbol
    );
    let filteredReceiveTokensList = finalReceiveTokensList.filter(
      (token) => token.symbol !== initReceiveFirstTokenSwap.symbol
    );

    //console.log('single filteredSendTokensList', filteredSendTokensList);
    //console.log('single filteredReceiveTokensList', filteredReceiveTokensList);

    finalSendTokensList.length !== 0 && setFilteredData(filteredSendTokensList);
    finalReceiveTokensList.length !== 0 &&
      setFilteredReceiveTokensListData(filteredReceiveTokensList);

    setSendTokenForExchangeAmount(0);
    setReceiveTokenForExchangeAmount(0);

    setTokenSendUSDCurrency('$0.00');
    setTokensReceiveUSDCurrency('$0.00');

    // should in first time page load output the 1 sent token to total receive token amount - get undefined error
    // setTimeout(
    //   () =>
    //     convertExchangeTokensCourse({
    //       inputId: 'firstPageLoad',
    //       tokenAmount: 1,
    //       sendTokenForExchangeAddress: initSendTokenSwap.address,
    //       receiveTokenForExchangeAddress: initReceiveFirstTokenSwap.address,
    //     }),
    //   5000
    // );

    //filter arr of tokens on existing values
    // const test = finalSendTokensList.filter(
    //   (token) => token.symbol !== sendTokenForExchange.symbol
    // );
    // console.log('test single', test);
  }, [finalSendTokensList, finalReceiveTokensList]);

  //function of dynamic converting of token value to USD Currency

  const toggleSwappedTokens = () => {
    setToggleExchangedTokens(!toggleExchangedTokens);

    dispatch({
      type: actionTypes.SET_INIT_SEND_TOKEN_SWAP,
      payload: initReceiveFirstTokenSwap,
    });

    dispatch({
      type: actionTypes.SET_INIT_RECEIVE_FIRST_TOKEN_SWAP,
      payload: initSendTokenSwap,
    });

    setTokenSendUSDCurrency(tokenReceiveUSDCurrency);
    setTokensReceiveUSDCurrency(tokenSendUSDCurrency);
    setSendTokenForExchangeAmount(receiveTokenForExchangeAmount);
    setReceiveTokenForExchangeAmount(sendTokenForExchangeAmount);
  };

  const searchTokensHandler = (event, searchTokensData) => {
    const result = filteredTokensByName(event, searchTokensData);
    //console.log('result single 111', result, searchTokensData);
    if (searchTokensData.searchSendTokensList === true) {
      let middle = result.filter((token) => token.symbol !== initSendTokenSwap.symbol);
      setFilteredData(middle);
    } else {
      setFilteredReceiveTokensListData(result);
    }
  };

  let convertSendTokenToUSDCurrency = (tokenData) => {
    let convertedToUSDValue = convertSendTokenToUSDCurrencyHelper(tokenData);
    // console.log('test convertedToUSDValue', convertedToUSDValue);
    setTokenSendUSDCurrency(convertedToUSDValue);
  };

  let convertReceiveTokenToUSDCurrency = async (tokenData) => {
    setTokensReceiveUSDCurrency('Loading');

    if (tokenData.amount === '') {
      tokenData.amount = '0';
    }

    //console.log('main receive tokenData', tokenData);

    let tokenUSDCurrencyValue;

    if (tokenData.address !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      //console.log('first triggered');

      await axios
        .get(
          `https://api.ethplorer.io/getTokenInfo/${tokenData.address}?apiKey=EK-qSPda-W9rX7yJ-UY93y`
        )
        .then(async (response) => {
          //console.log('suc get usd receive tokenData', response);
          tokenUSDCurrencyValue = response;
        })
        .catch((err) => {
          //console.log('err of usd currency receive token', err);
          // tokenUSDCurrencyValue = err;
        });

      //console.log('receive tokenData total USDCurrency', tokenUSDCurrencyValue.data.price.rate);

      if (tokenUSDCurrencyValue.data.price.rate !== undefined) {
        // console.log(
        //   'receive tokenData total',
        //   (tokenUSDCurrencyValue.data.price.rate * tokenData.amount).toFixed(2)
        // );

        setTokensReceiveUSDCurrency(
          `$ ${(tokenUSDCurrencyValue.data.price.rate * tokenData.amount).toFixed(2)}`
        );
      } else {
        setTokensReceiveUSDCurrency('Price not available');
      }
    } else {
      const ethDollarValue = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
      );

      setTokensReceiveUSDCurrency(
        `$${(ethDollarValue.data.ethereum.usd * tokenData.amount).toFixed(2)}`
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

    //useState with null

    if (selectedRate !== null) {
      let txObject = selectedRate.transactObject;
      txObject.gas = parseFloat(txObject.gas) + 100000;
      txObject.from = accounts[0];
      if (initSendTokenSwap.symbol !== 'ETH') {
        const ERC20contract = new web3.eth.Contract(ERC20ABI, txObject.sellTokenAddress);
        await ERC20contract.methods
          .approve(txObject.allowanceTarget, txObject.sellAmount)
          .send({ from: accounts[0] });
      }
      try {
        await web3.eth.sendTransaction(txObject);
        // settxSuccess(true);
      } catch (error) {
        console.log('tx failed::', error);
        // settxFailure(true);
      }
    } else {
      alert('Please Fill All fields');
    }
  }

  const calculateToAmount = async (tokenFromAmount) => {
    console.log('calculate method called with ammount::', tokenFromAmount);
    console.log('value of Tokenfromamount::', sendTokenForExchangeAmount);
    console.log('value of tokenfrom object::', initSendTokenSwap);
    console.log('value of tokenTo::', TokenTo);
    if (tokenFromAmount > 0) {
      // console.log("calculate amount is called")
      if (initSendTokenSwap.symbol !== '' && TokenTo !== '') {
        let differentQuoteList = [];
        const protocolsList = ['', 'Uniswap', 'Curve', 'SushiSwap', 'Bancor', 'Balancer'];
        let amount = parseFloat(tokenFromAmount) * Math.pow(10, 18);
        const tokenToDollarValue = await dollarValueOfToken(TokenTo.address);

        for (let i = 0; i < protocolsList.length; i++) {
          try {
            let protocolQuote = {};
            const response = await axios.get(
              `https://ropsten.api.0x.org/swap/v1/quote?buyToken=${TokenTo.symbol}&sellToken=${initSendTokenSwap.symbol}&sellAmount=${amount}&feeRecipient=0xE609192618aD9aC825B981fFECf3Dfd5E92E3cFB&buyTokenPercentageFee=0.02&includedSources=${protocolsList[i]}`
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
              // setSources(sources2);
            } else {
              protocolQuote.name = protocolsList[i];
            }
            protocolQuote.price = response.data.price;
            protocolQuote.minPrice = response.data.guaranteedPrice;
            protocolQuote.TokenToAmount = (
              parseFloat(response.data.buyAmount) * Math.pow(10, -TokenTo.decimals)
            )
              .toFixed(2)
              .toString();
            const ethPrice = 3000;
            protocolQuote.gas = (
              parseFloat(response.data.gas) *
              parseFloat(response.data.gasPrice) *
              Math.pow(10, -18) *
              ethPrice
            ).toFixed(2);
            console.log('dollar value of token', tokenToDollarValue);
            protocolQuote.receivedValueInDollar = (
              parseFloat(response.data.buyAmount) *
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
        // setselectedRate(differentQuoteList[0]);
        console.log('differentQuoteList[0].name', differentQuoteList);
        // setselectedExchangeName(differentQuoteList[0].name);
        // setprotocolsRateList(differentQuoteList);
        console.log('different rates we have::', differentQuoteList);
      }
    }
  };

  const selectSendTokenForExchange = (selectSendToken) => {
    //console.log('selected send token value object 222', selectSendToken);
    // setSendTokenForExchange(selectSendToken);
    setIsSendTokensModalVisible(false);
    setSendTokenForExchangeAmount(0);
    dispatch({
      type: actionTypes.SET_INIT_SEND_TOKEN_SWAP,
      payload: selectSendToken,
    });
    convertSendTokenToUSDCurrency({
      amount: 0,
      sendTokensListItem: true,
      ...selectSendToken,
      address: selectSendToken.address,
    });
  };

  const selectReceiveTokenForExchange = (selectReceiveToken) => {
    //console.log('selected receive token value object 222', selectReceiveToken);

    setIsReceiveTokensModalVisible(false);
    setReceiveTokenForExchangeAmount(0);

    dispatch({
      type: actionTypes.SET_INIT_RECEIVE_FIRST_TOKEN_SWAP,
      payload: selectReceiveToken,
    });

    convertReceiveTokenToUSDCurrency({
      amount: 0,
      receiveTokensListItem: true,
      ...selectReceiveToken,
      address: selectReceiveToken.address,
    });
    //old
    // setprotocolsRateList([]);
    // setselectedRate(null);
    // setSources([]);
  };

  // console.log('sendTokenForExchangeAmount 222', sendTokenForExchangeAmount);

  // console.log('token receive swap tokenReceiveUSDCurrency', tokenReceiveUSDCurrency);

  //---------------------

  //convert one token to another
  //now - mock Uniswap V2 Contract address

  const convertExchangeTokensCourse = async (convertTokensData) => {
    // console.log('convertTokensData single swap', convertTokensData);
    // console.log(
    //   ' convertTokensData single swap tokenDecimal token1',
    //   convertTokensData.sendTokenForExchangeAddress
    // );
    // console.log(
    //   ' convertTokensData single swap tokenDecimal token2',
    //   convertTokensData.receiveTokenForExchangeAddress
    // );

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

    //console.log('convertTokensData single swap tokenDecimal 1', tokenDecimal1);
    //console.log('convertTokensData single swap tokenDecimal 2', tokenDecimal2);

    const NewContract = new web3.eth.Contract(
      ROUTERABI,
      //Sushiswap contract address - should be changed dynamically
      '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
    );

    if (convertTokensData.tokenAmount !== 0 && !isNaN(convertTokensData.tokenAmount)) {
      if (convertTokensData.inputId === 'firstPageLoad') {
        const convertedValue = await NewContract.methods
          .getAmountsOut((convertTokensData.tokenAmount * 10 ** tokenDecimal1).toString(), [
            convertTokensData.sendTokenForExchangeAddress,
            convertTokensData.receiveTokenForExchangeAddress,
          ])
          .call();

        //console.log('initLoad convertTokensData', convertedValue);

        // setReceiveTokenForExchangeAmount(+convertedValue[1] / 10 ** tokenDecimal2);

        convertReceiveTokenToUSDCurrency({
          amount: +convertedValue[1] / 10 ** tokenDecimal2,
          address: convertTokensData.receiveTokenForExchangeAddress,
        });
      } else if (convertTokensData.inputId === 'chooseSendToken') {
        const convertedValue = await NewContract.methods
          .getAmountsOut((convertTokensData.tokenAmount * 10 ** tokenDecimal1).toString(), [
            convertTokensData.sendTokenForExchangeAddress,
            convertTokensData.receiveTokenForExchangeAddress,
          ])
          .call();

        //console.log('chooseSendToken convertTokensData', convertedValue);

        setInitConvertReceiveTokenAmount((+convertedValue[1] / 10 ** tokenDecimal2).toFixed(3));

        // setReceiveTokenForExchangeAmount(+convertedValue[1] / 10 ** tokenDecimal2);

        // convertReceiveTokenToUSDCurrency({
        //   amount: +convertedValue[1] / 10 ** tokenDecimal2,
        //   address: convertTokensData.receiveTokenForExchangeAddress,
        // });
      } else if (convertTokensData.inputId === 'sendInput') {
        const convertedValue = await NewContract.methods
          .getAmountsOut((convertTokensData.tokenAmount * 10 ** tokenDecimal1).toString(), [
            convertTokensData.sendTokenForExchangeAddress,
            convertTokensData.receiveTokenForExchangeAddress,
          ])
          .call();

        //console.log('convertTokensData convertedValue', convertedValue);
        // console.log(
        //   'convertTokensData receive input value ',
        //   +convertedValue[1] / 10 ** tokenDecimal2
        // );

        setReceiveTokenForExchangeAmount(+convertedValue[1] / 10 ** tokenDecimal2);

        convertReceiveTokenToUSDCurrency({
          amount: +convertedValue[1] / 10 ** tokenDecimal2,
          address: convertTokensData.receiveTokenForExchangeAddress,
        });
      } else if (convertTokensData.inputId === 'receiveInput') {
        const convertedValue = await NewContract.methods
          .getAmountsOut((convertTokensData.tokenAmount * 10 ** tokenDecimal1).toString(), [
            convertTokensData.sendTokenForExchangeAddress,
            convertTokensData.receiveTokenForExchangeAddress,
          ])
          .call();

        // console.log('convertTokensData convertedValue', convertedValue);
        // console.log(
        //   'convertTokensData receive input value ',
        //   +convertedValue[1] / 10 ** tokenDecimal2
        // );

        setSendTokenForExchangeAmount(+convertedValue[1] / 10 ** tokenDecimal2);

        convertSendTokenToUSDCurrency({
          amount: +convertedValue[1] / 10 ** tokenDecimal2,
          address: convertTokensData.receiveTokenForExchangeAddress,
          USDCurrency: initSendTokenSwap.USDCurrency,
        });
      }
    } else {
      console.log('convertTokensData null amount orNAN error!');
      setReceiveTokenForExchangeAmount(0);
      convertReceiveTokenToUSDCurrency({
        amount: 0,
        address: convertTokensData.receiveTokenForExchangeAddress,
      });
    }
  };

  const triggerSendTokenInputHandlers = (value, initSendTokenSwap) => {
    setSendTokenForExchangeAmount(value);

    // console.log('initSendTokenSwap handle value', value);
    // console.log('initSendTokenSwap handle', initSendTokenSwap);

    convertSendTokenToUSDCurrency({
      amount: value,
      ...initSendTokenSwap,
    });
    convertExchangeTokensCourse({
      inputId: 'sendInput',
      tokenAmount: parseFloat(value),
      sendTokenForExchangeAddress: initSendTokenSwap.address,
      receiveTokenForExchangeAddress: initReceiveFirstTokenSwap.address,
    });
    const isLimitExceeded = checkIfExchangedTokenLimitIsExceeded(value, initSendTokenSwap.balance);
    setIsTokensLimitExceeded(isLimitExceeded);
  };

  const triggerReceiveTokenInputHandlers = (value, initReceiveTokenSwap) => {
    setReceiveTokenForExchangeAmount(value);

    // console.log('initReceiveTokenSwap handle value', value);
    // console.log('initReceiveTokenSwap handle', initReceiveTokenSwap);

    convertReceiveTokenToUSDCurrency({
      amount: value,
      ...initReceiveFirstTokenSwap,
    });
    convertExchangeTokensCourse({
      inputId: 'receiveInput',
      tokenAmount: parseFloat(value),
      sendTokenForExchangeAddress: initSendTokenSwap.address,
      receiveTokenForExchangeAddress: initReceiveFirstTokenSwap.address,
    });

    const isLimitExceeded = checkIfExchangedTokenLimitIsExceeded(value, initSendTokenSwap.balance);
    setIsTokensLimitExceeded(isLimitExceeded);
  };

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
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <SendTokensChooseButton isLightTheme={isLightTheme}>
                    <ChooseBtnTokenBlock onClick={() => setIsSendTokensModalVisible(true)}>
                      {initSendTokenSwap.logoURI !== null ? (
                        <SendTokenImg alt="token_img" src={initSendTokenSwap.logoURI} />
                      ) : (
                        <Avatar
                          style={{
                            marginRight: '12px',
                            marginLeft: '12px',
                            marginTop: '2px',
                          }}
                          name={initSendTokenSwap.avatarIcon}
                          round={true}
                          size="21"
                          textSizeRatio={1}
                        />
                      )}
                      <ChosenTokenLabel isLightTheme={isLightTheme}>
                        {initSendTokenSwap.symbol === 'ethereum' ? 'ETH' : initSendTokenSwap.symbol}
                      </ChosenTokenLabel>
                      <img
                        src={isLightTheme ? chevronDownBlack : chevronDownLight}
                        alt="chevron_icon"
                      />
                    </ChooseBtnTokenBlock>

                    <ChosenSendReceiveTokenValueInput
                      //------
                      InputProps={{
                        inputProps: {
                          style: {
                            textAlign: 'right',
                            paddingRight: 0,
                            width: '200px',
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
                        triggerSendTokenInputHandlers(e.target.value, initSendTokenSwap);
                      }}
                    />
                  </SendTokensChooseButton>

                  {isTokensLimitExceeded && (
                    <ExceededAmountTokensLimitWarning>
                      Insufficient funds - available {initSendTokenSwap.balance}
                    </ExceededAmountTokensLimitWarning>
                  )}
                </div>
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
                        setFilteredData(
                          finalSendTokensList.filter(
                            (token) => token.symbol !== initSendTokenSwap.symbol
                          )
                        );
                      }}>
                      <TokensModalSubLayout isLightTheme={isLightTheme}>
                        <Header>
                          <ModalTitle isLightTheme={isLightTheme}>
                            Select token for sending
                          </ModalTitle>
                          <CloseButton
                            onClick={() => {
                              setIsSendTokensModalVisible(false);
                              setFilteredData(
                                finalSendTokensList.filter(
                                  (token) => token.symbol !== initSendTokenSwap.symbol
                                )
                              );
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
                                  selectSendTokenForExchange(object);

                                  setFilteredData(
                                    finalSendTokensList.filter(
                                      (token) => token.symbol !== object.symbol
                                    )
                                  );

                                  convertExchangeTokensCourse({
                                    inputId: 'chooseSendToken',
                                    tokenAmount: 1,
                                    sendTokenForExchangeAddress: initSendTokenSwap.address,
                                    receiveTokenForExchangeAddress:
                                      initReceiveFirstTokenSwap.address,
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
                                      {object.balance} ·{' '}
                                      {object.USDCurrency !== undefined
                                        ? `$${object.USDCurrency.toFixed(3)}`
                                        : 'Price is not available'}
                                    </SendTokenConvertedMeasures>
                                  </div>
                                </SendTokenLabelsBlock>
                                <SendTokenBalance isLightTheme={isLightTheme}>
                                  {object.balance !== undefined &&
                                    object.USDCurrency !== undefined && (
                                      // (
                                      <span>{`$${
                                        object.balance > 0
                                          ? (
                                              object.balance * object.USDCurrency.toFixed(2)
                                            ).toFixed(3)
                                          : (
                                              object.balance * object.USDCurrency.toFixed(2)
                                            ).toFixed(2)
                                      }`}</span>
                                    )}
                                  {/*) : ( */}
                                  {/*<Loader type="Rings" color="#BB86FC" height={30} width={30} />*/}
                                  {/* )}*/}
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
                    {initReceiveFirstTokenSwap.logoURI !== null ? (
                      <SendTokenImg alt="token_img" src={initReceiveFirstTokenSwap.logoURI} />
                    ) : (
                      <Avatar
                        style={{
                          marginRight: '12px',
                          marginLeft: '12px',
                          marginTop: '2px',
                        }}
                        name={initReceiveFirstTokenSwap.avatarIcon}
                        round={true}
                        size="21"
                        textSizeRatio={1}
                      />
                    )}
                    <ChosenTokenLabel isLightTheme={isLightTheme}>
                      {initReceiveFirstTokenSwap.symbol}
                    </ChosenTokenLabel>

                    <img
                      src={isLightTheme ? chevronDownBlack : chevronDownLight}
                      alt="chevron_icon"
                    />
                  </ChooseBtnTokenBlock>
                  {/*)}*/}
                  <ChosenSendReceiveTokenValueInput
                    //--------
                    InputProps={{
                      inputProps: {
                        style: {
                          textAlign: 'right',
                          paddingRight: 0,
                          width: '200px',
                          fontWeight: 600,
                          color: isLightTheme ? 'black' : 'white',
                        },
                      },
                      classes: { notchedOutline: classes.noBorder },
                    }}
                    isLightTheme={isLightTheme}
                    placeholder="0.0"
                    value={receiveTokenForExchangeAmount}
                    onChange={(event) => {
                      triggerReceiveTokenInputHandlers(
                        event.target.value,
                        initReceiveFirstTokenSwap
                      );
                      // setReceiveTokenForExchangeAmount(e.target.value);
                      // convertReceiveTokenToUSDCurrency({
                      //   amount: e.target.value,
                      //   ...initReceiveFirstTokenSwap,
                      // });
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
                        setFilteredReceiveTokensListData(
                          // finalReceiveTokensList.filter(
                          //   (token) => token.symbol !== receiveTokenForExchange.symbol
                          // )
                          finalReceiveTokensList
                        );
                      }}>
                      <TokensModalSubLayout isLightTheme={isLightTheme}>
                        <Header>
                          <ModalTitle isLightTheme={isLightTheme}>
                            Select token for receiving
                          </ModalTitle>
                          <CloseButton
                            onClick={() => {
                              setIsReceiveTokensModalVisible(false);
                              setFilteredReceiveTokensListData(
                                finalReceiveTokensList
                                // finalReceiveTokensList.filter(
                                //   (token) => token.symbol !== receiveTokenForExchange.symbol
                                // )
                              );
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
                                  setFilteredReceiveTokensListData(finalReceiveTokensList);
                                  convertExchangeTokensCourse({
                                    inputId: 'chooseSendToken',
                                    tokenAmount: 1,
                                    sendTokenForExchangeAddress: initSendTokenSwap.address,
                                    receiveTokenForExchangeAddress:
                                      initReceiveFirstTokenSwap.address,
                                  });
                                  // setFilteredReceiveTokensListData(
                                  //   finalReceiveTokensList.filter(
                                  //     (token) => token.symbol !== object.symbol
                                  //   )
                                  // );
                                  selectReceiveTokenForExchange(object);
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
                                    <SendTokenConvertedMeasures
                                      isLightTheme={isLightTheme}
                                      style={{ visibility: 'hidden' }}>
                                      409,333 UNI · $19,18
                                    </SendTokenConvertedMeasures>
                                  </div>
                                </SendTokenLabelsBlock>
                                {/*<SendTokenBalance isLightTheme={isLightTheme}>*/}
                                {/*  {object.balance === undefined ? (*/}
                                {/*    <Loader type="Rings" color="#BB86FC" height={30} width={30} />*/}
                                {/*  ) : (*/}
                                {/*    <span>${object.balance}</span>*/}
                                {/*  )}*/}
                                {/*</SendTokenBalance>*/}
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
                    {`1 ${initSendTokenSwap.symbol} =  ${initConvertReceiveTokenAmount} ${initReceiveFirstTokenSwap.symbol}`}
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
                <Button
                  disabled={isTokensLimitExceeded}
                  onClick={() => {
                    calculateToAmount(initSendTokenSwap);
                    //token swap (sushiswap exchanger only)
                    addLiquiditySushiV2(
                      initSendTokenSwap.address,
                      initReceiveFirstTokenSwap.address,
                      sendTokenForExchangeAmount,
                      proposeGasPrice
                    );
                  }}>
                  Exchange
                </Button>
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
