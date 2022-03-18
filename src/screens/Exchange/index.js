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
import { Box, Button, TextField } from '@material-ui/core';
import Uniswap from '../../assets/icons/Uniswap.webp';
import Balancer from '../../assets/icons/balancer.png';
import { ethers } from 'ethers';
import { useParams } from 'react-router-dom';
import Avatar from 'react-avatar';
import switchTokensLight from '../../assets/icons/switchTokensLight.svg';
import switchTokensDark from '../../assets/icons/switchTokensDark.svg';
import paraSwapIcon from '../../assets/icons/exchangers/paraSwapExchangerIcon.svg';
import searchTokensImportModalLight from '../../assets/icons/searchTokensButtonMobileLight.svg';
import searchTokensImportModalDark from '../../assets/icons/searchTokensInputModalDark.svg';
import fastSpeedIcon from '../../assets/icons/iron_man_icon.svg';
import averageSpeedIcon from '../../assets/icons/starWarsIcon.svg';
import slowSpeedIcon from '../../assets/icons/futuramaIcon.svg';
import { addIconsGasPrices } from '../../commonFunctions/commonFunctions';
import { makeStyles } from '@material-ui/styles';
import {
  ChooseBtnTokenBlock,
  ChosenSendReceiveTokenValueInput,
  ChosenTokenLabel,
  ColumnMainSubTitles,
  ColumnMainTitles,
  DownDelimiterLabelsBlock,
  ExchangeMainLayout,
  FirstColumnSwapSubBlock,
  LabelsBlockSubBlock,
  AdditionalOptionsSwapTokensSubBlock,
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
  MultiSwapSendValueLabel,
  FirstColumnTitleHeaderBlock,
  TokensModalSubLayout,
  SearchTokensModalTextField,
  SendTokensModalList,
  SendTokenModalListItem,
  SendTokenImg,
  SendTokenLabelsBlock,
  SendTokenName,
  SendTokenConvertedMeasures,
  SendTokenBalance,
  AbsentFoundTokensBlock,
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
  TransactionSpeedGridLayout,
  TransactionSpeedGridLayoutItem,
  GridLayoutItemIconSubBlock,
  AdvancedSettingsButton,
  SlippageToleranceLabel,
  StablePercentChooseToleranceBtn,
  FloatPercentChooseToleranceBtn,
  SlippageToleranceBtnsLayout,
} from './styled';
import { useDispatch, useSelector } from 'react-redux';
import chevronDownBlack from '../../assets/icons/chevronDownLightTheme.svg';
import chevronDownLight from '../../assets/icons/chevronDownLight.svg';
import MultiSwapComponent from './multiSwap';
import SelectTokensModalContainer from './selectTokensModal';
import { ModalTitle, CloseButton, Header } from './selectTokensModal/styles';

import sushiSwapExchangerIcon from '../../assets/icons/exchangers/sushiSwapExchangerIcon.svg';
import uniswapV2ExchangerIcon from '../../assets/icons/exchangers/uniswapV2ExchangerIcon.svg';

import actionTypes from '../../constants/actionTypes';
import {
  checkIfExchangedTokenLimitIsExceeded,
  filteredTokensByName,
  initFilteringModalTokensList,
} from './helpers';

import { getTokenDataSaga } from '../../store/currentTokenData/actions';
import Popover from '@mui/material/Popover';

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
    // // console.log('no call of that name!');
  }
};

import TOKENDECIMALSABI from '../../abi/TokenDecomals.json';
import ROUTERABI from '../../abi/UniRouterV2.json';
// import exchangersOfferedList from './exchangersOfferedList';
import greenDot from '../../assets/icons/greenDot.svg';
import { singleSushiSwapV2 } from './helpers';
import { getWalletDataSaga } from '../../store/currentWalletData/actions';

const useStyles = makeStyles(() => ({
  noBorder: {
    border: 'none !important',
  },
}));

export default function SwapComponent() {
  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);

  const dispatch = useDispatch();
  const classes = useStyles(isLightTheme);
  const { address } = useParams();

  //work saga
  const gasPrices = useSelector((state) => state.gesData.gasPriceData);
  const finalSendTokensList = useSelector((state) => state.tokensListReducer.sendTokensList);
  const finalReceiveTokensList = useSelector((state) => state.tokensListReducer.receiveTokensList);
  const initSendTokenSwap = useSelector((state) => state.tokensListReducer.initSendTokenSwap);
  const initReceiveFirstTokenSwap = useSelector(
    (state) => state.tokensListReducer.initReceiveFirstTokenSwap
  );
  const selectedGasPrice = useSelector((state) => state.gesData.selectedGasPrice);
  const proposeGasPrice = useSelector((state) => state.gesData.proposeGasPrice);

  console.log('finalSendTokensList', finalSendTokensList);

  const addIconsGasPricesWithIcons = addIconsGasPrices(
    gasPrices,
    fastSpeedIcon,
    averageSpeedIcon,
    slowSpeedIcon
  );

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
  const [initConvertReceiveTokenAmount, setInitConvertReceiveTokenAmount] = useState('Loading...');
  const [isAbleToReplaceTokensInSingleSwap, setIsAbleToReplaceTokensInSingleSwap] = useState(true);
  const [isOfferedByPopoverActivated, setisOfferedByPopoverActivated] = useState(true);
  const [exchangersOfferedList, setExchangersOfferedList] = useState([
    {
      name: 'Uniswap_V2',
      routerAddress: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
      receiveTokenUSDCurrencyCourse: '3510 DAI ($3510.03)',
      gasFee: '$10.03',
      isBestRate: true,
      logoIcon: uniswapV2ExchangerIcon,
      isExchangerSelected: true,
    },
    {
      name: 'SushiSwap',
      routerAddress: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
      receiveTokenUSDCurrencyCourse: '3510 DAI ($3510.03)',
      gasFee: '$10.03',
      isBestRate: false,
      logoIcon: sushiSwapExchangerIcon,
      isExchangerSelected: false,
    },
    //if wrong Exchanger name/router address - Uniswap_V3 by default of 0x API
    // {
    //   name: 'testName',
    //   routerAddress: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997DDD',
    //   receiveTokenUSDCurrencyCourse: '3510 DAI ($3510.03)',
    //   gasFee: '$10.03',
    //   isBestRate: false,
    //   logoIcon: fastSpeedIcon,
    //   isExchangerSelected: false,
    // },
  ]);
  const [activeExchanger, setActiveExchanger] = useState(exchangersOfferedList[0]);
  const [isTokensSwappingActive, setIsTokensSwappingActive] = useState(false);
  const [slippageTolerance, setSlippageTolerance] = useState(0);
  const [rawPersonalSlippageTolerance, setRawPersonalSlippageTolerance] = useState(0);
  const [personalSlippageTolerance, setPersonalSlippageTolerance] = useState(0);

  console.log('filteredData', filteredData);

  const [anchorEl, setAnchorEl] = useState(null);

  const openExchangersListPopover = (event, flag) => {
    setAnchorEl(event.currentTarget);

    // console.log('flag isOfferedByPopoverActivated', flag.isOfferedByPopoverActivated);

    if (flag.isOfferedByPopoverActivated === true) {
      setisOfferedByPopoverActivated(true);
    } else {
      setisOfferedByPopoverActivated(false);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setPersonalSlippageTolerance(0);
    setRawPersonalSlippageTolerance(0);
  };

  const open = Boolean(anchorEl);

  //-----

  useEffect(async () => {
    try {
      dispatch({ type: actionTypes.SET_SEND_TOKENS_LIST, payload: address });
      dispatch({ type: actionTypes.SET_RECEIVE_TOKENS_LIST });
      dispatch(getTokenDataSaga(initReceiveFirstTokenSwap.id));
      dispatch(getWalletDataSaga(address));
      setSlippageTolerance(0.03);
    } catch (error) {
      // console.log('err swap init load', error);
    }
  }, []);

  useEffect(() => {
    let ifSendTokenAvailableForSwap = finalReceiveTokensList.some((el) => {
      if (el.address === initSendTokenSwap.address) {
        return true;
      }
    });

    let ifReceiveTokenAvailableForSwap = finalSendTokensList.some((el) => {
      if (el.address === initReceiveFirstTokenSwap.address) {
        return true;
      }
    });

    if (ifSendTokenAvailableForSwap === true && ifReceiveTokenAvailableForSwap === true) {
      setIsAbleToReplaceTokensInSingleSwap(true);
    } else if (ifSendTokenAvailableForSwap === false || ifReceiveTokenAvailableForSwap === false) {
      setIsAbleToReplaceTokensInSingleSwap(false);
    }

    //init format receive token - add token amount to it
    let formattedReceiveToken;
    if (initReceiveFirstTokenSwap.balance === undefined) {
      let foundSendTokenListItem = finalSendTokensList.find((el) => {
        return el.address === initReceiveFirstTokenSwap.address;
      });

      formattedReceiveToken = {
        ...initReceiveFirstTokenSwap,
        balance: foundSendTokenListItem !== undefined ? foundSendTokenListItem.balance : 0,
      };
    } else {
      formattedReceiveToken = initReceiveFirstTokenSwap;
    }

    dispatch({
      type: actionTypes.SET_INIT_RECEIVE_FIRST_TOKEN_SWAP,
      payload: formattedReceiveToken,
    });

    if (
      initSendTokenSwap.address !== undefined &&
      initReceiveFirstTokenSwap.address !== undefined
    ) {
      // console.log('effect init SendTokenSwap', initSendTokenSwap);
      // console.log('effect init ReceiveFirstTokenSwap', initReceiveFirstTokenSwap);

      convertExchangeTokensCourse({
        sendTokenForExchangeAddress: initSendTokenSwap.address,
        receiveTokenForExchangeAddress: initReceiveFirstTokenSwap.address,
        tokenAmount: 1,
        inputId: 'firstPageLoad',
        routerAddress: activeExchanger.routerAddress,
      });
    }
  }, [initSendTokenSwap, initReceiveFirstTokenSwap]);

  useEffect(() => {
    let filteredSendTokensList = finalSendTokensList.filter(
      (token) => token.address !== initSendTokenSwap.address
    );
    let filteredReceiveTokensList = finalReceiveTokensList.filter(
      (token) => token.address !== initReceiveFirstTokenSwap.address
    );

    finalSendTokensList.length !== 0 && setFilteredData(filteredSendTokensList);
    finalReceiveTokensList.length !== 0 &&
      setFilteredReceiveTokensListData(filteredReceiveTokensList);

    setSendTokenForExchangeAmount(0);
    setReceiveTokenForExchangeAmount(0);

    setTokenSendUSDCurrency('$0.00');
    setTokensReceiveUSDCurrency('$0.00');
  }, [finalSendTokensList, finalReceiveTokensList]);

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

    // // // console.log('toggleButton balance send token', initSendTokenSwap.balance);

    setTokenSendUSDCurrency('$0.00');
    setTokensReceiveUSDCurrency('$0.00');
    setSendTokenForExchangeAmount(0);
    setReceiveTokenForExchangeAmount(0);
    setIsTokensLimitExceeded(false);
  };

  const searchTokensHandler = (event, searchTokensData) => {
    // // // console.log('single search init data', searchTokensData.tokensList);

    let removedInitTokenValuesList = initFilteringModalTokensList(
      searchTokensData,
      initSendTokenSwap,
      [initReceiveFirstTokenSwap]
    );

    const result = filteredTokensByName(event, removedInitTokenValuesList);

    // // // console.log('single search result 111', result, searchTokensData);
    if (searchTokensData.searchSendTokensList === true) {
      let middle = result.filter((token) => token.symbol !== initSendTokenSwap.symbol);
      setFilteredData(middle);
    } else {
      setFilteredReceiveTokensListData(result);
    }
  };

  let convertSendTokenToUSDCurrency = async (tokenData) => {
    console.log('single amount convertSendTokenToUSDCurrency', tokenData);
    if (tokenData.amount === '') {
      tokenData.amount = '0';
      setReceiveTokenForExchangeAmount(0);

      convertReceiveTokenToUSDCurrency(0, {
        amount: 0,
        ...initReceiveFirstTokenSwap,
      });
    }

    let filteredTokenDataAmount;
    if (typeof tokenData.amount === 'string') {
      filteredTokenDataAmount = tokenData.amount.replace(/[^\d.-]/g, '').replace(/[^\w.]|_/g, '');
    } else {
      filteredTokenDataAmount = tokenData.amount;
    }
    try {
      setTokenSendUSDCurrency(
        `$ ${(tokenData.singleTokenUSDCurrencyAmount * filteredTokenDataAmount).toFixed(3)}`
      );
    } catch (err) {
      setTokenSendUSDCurrency('Price not available');
    }
  };

  let convertReceiveTokenToUSDCurrency = async (amount, tokenData) => {
    console.log('convertReceiveTokenToUSDCurrency amount', amount);
    console.log('convertReceiveTokenToUSDCurrency tokenData', tokenData);

    if (tokenData.amount === '') {
      tokenData.amount = '0';
      setSendTokenForExchangeAmount(0);

      convertSendTokenToUSDCurrency({
        amount: 0,
        ...initSendTokenSwap,
      });
    }

    let filteredTokenDataAmount;
    if (typeof amount === 'string') {
      filteredTokenDataAmount = amount.replace(/[^\d.-]/g, '').replace(/[^\w.]|_/g, '');
    } else {
      filteredTokenDataAmount = amount;
    }

    if (tokenData.address !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      await axios
        .get(
          `https://api.ethplorer.io/getTokenInfo/${tokenData.address}?apiKey=EK-qSPda-W9rX7yJ-UY93y`
        )
        .then(async (response) => {
          // console.log('convertReceiveTokenToUSDCurrency res', response);
          if (response.data.price.rate !== undefined) {
            setTokensReceiveUSDCurrency(
              `$ ${(response.data.price.rate * filteredTokenDataAmount).toFixed(3)}`
            );
          } else {
            setTokensReceiveUSDCurrency('Price not available');
          }
        })
        .catch((err) => {
          console.log('err of usd currency receive token', err);
          setTokensReceiveUSDCurrency('Price not available');
        });
    } else {
      await axios
        .get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
        .then(async (response) => {
          setTokensReceiveUSDCurrency(
            `$${(response.data.ethereum.usd * filteredTokenDataAmount).toFixed(3)}`
          );
        })
        .catch((err) => {
          console.log('err of usd currency receive token', err);
          setTokensReceiveUSDCurrency('Price not available');
        });
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

  const selectTokenForExchange = (rawSelectedToken, flag) => {
    // // // console.log('flag', flag.isSendTokenChosen);
    setInitConvertReceiveTokenAmount('Loading...');
    let selectedToken;
    if (rawSelectedToken.balance === undefined) {
      let foundSendTokenListItem = finalSendTokensList.find((el) => {
        return el.address === rawSelectedToken.address;
      });

      selectedToken = {
        ...rawSelectedToken,
        balance: foundSendTokenListItem !== undefined ? foundSendTokenListItem.balance : 0,
      };
    } else {
      selectedToken = rawSelectedToken;
    }

    // // // console.log('selectToken total', selectedToken);

    if (flag.isSendTokenChosen === true) {
      let ifSendTokenAvailableForSwap = finalReceiveTokensList.some((el) => {
        if (el.address === selectedToken.address) {
          return true;
        }
      });

      let ifReceiveTokenAvailableForSwap = finalSendTokensList.some((el) => {
        if (el.address === initReceiveFirstTokenSwap.address) {
          return true;
        }
      });

      if (ifSendTokenAvailableForSwap === true && ifReceiveTokenAvailableForSwap === true) {
        setIsAbleToReplaceTokensInSingleSwap(true);
      } else if (
        ifSendTokenAvailableForSwap === false ||
        ifReceiveTokenAvailableForSwap === false
      ) {
        setIsAbleToReplaceTokensInSingleSwap(false);
      }

      dispatch({
        type: actionTypes.SET_INIT_SEND_TOKEN_SWAP,
        payload: selectedToken,
      });

      setTokenSendUSDCurrency('$0.00');
      setTokensReceiveUSDCurrency('$0.00');
      setSendTokenForExchangeAmount(0);
      setReceiveTokenForExchangeAmount(0);
      setIsTokensLimitExceeded(false);
      setIsSendTokensModalVisible(false);
    } else {
      let ifSendTokenAvailableForSwap = finalReceiveTokensList.some((el) => {
        if (el.address === initSendTokenSwap.address) {
          return true;
        }
      });

      let ifReceiveTokenAvailableForSwap = finalSendTokensList.some((el) => {
        if (el.address === selectedToken.address) {
          return true;
        }
      });

      if (ifSendTokenAvailableForSwap === true && ifReceiveTokenAvailableForSwap === true) {
        setIsAbleToReplaceTokensInSingleSwap(true);
      } else if (
        ifSendTokenAvailableForSwap === false ||
        ifReceiveTokenAvailableForSwap === false
      ) {
        setIsAbleToReplaceTokensInSingleSwap(false);
      }

      dispatch({
        type: actionTypes.SET_INIT_RECEIVE_FIRST_TOKEN_SWAP,
        payload: selectedToken,
      });

      setTokenSendUSDCurrency('$0.00');
      setTokensReceiveUSDCurrency('$0.00');
      setSendTokenForExchangeAmount(0);
      setReceiveTokenForExchangeAmount(0);
      setIsTokensLimitExceeded(false);
      setIsReceiveTokensModalVisible(false);
    }
  };

  const convertExchangeTokensCourse = async (convertTokensData) => {
    // console.log('convertTokensData single swap helper', convertTokensData);

    try {
      await loadWeb3();
      const web3 = window.web3;
      let tokenDecimal1, tokenDecimal2;

      tokenDecimal1 = await new web3.eth.Contract(
        TOKENDECIMALSABI,
        convertTokensData.sendTokenForExchangeAddress
      ).methods
        .decimals()
        .call()
        .then((res) => {
          return res;
        });

      tokenDecimal2 = await new web3.eth.Contract(
        TOKENDECIMALSABI,
        convertTokensData.receiveTokenForExchangeAddress
      ).methods
        .decimals()
        .call()
        .then((res) => {
          return res;
        });

      const NewContract = new web3.eth.Contract(
        ROUTERABI,
        //Sushiswap contract address - should be changed dynamically
        convertTokensData.routerAddress
      );

      if (convertTokensData.tokenAmount !== 0 && !isNaN(convertTokensData.tokenAmount)) {
        if (convertTokensData.inputId === 'firstPageLoad') {
          let convertedValue = await NewContract.methods
            .getAmountsOut((convertTokensData.tokenAmount * 10 ** tokenDecimal1).toString(), [
              convertTokensData.sendTokenForExchangeAddress,
              convertTokensData.receiveTokenForExchangeAddress,
            ])
            .call();

          let countedTokenAmount = +convertedValue[1] / 10 ** tokenDecimal2;
          setInitConvertReceiveTokenAmount(
            `1 ${initSendTokenSwap.symbol} =  ${countedTokenAmount.toFixed(3)} ${
              initReceiveFirstTokenSwap.symbol
            }`
          );
        } else if (convertTokensData.inputId === 'chooseSendToken') {
          let convertedValue = await NewContract.methods
            .getAmountsOut((convertTokensData.tokenAmount * 10 ** tokenDecimal1).toString(), [
              convertTokensData.sendTokenForExchangeAddress,
              convertTokensData.receiveTokenForExchangeAddress,
            ])
            .call();

          let countedTokenAmount = +convertedValue[1] / 10 ** tokenDecimal2;
          setInitConvertReceiveTokenAmount(
            `1 ${initSendTokenSwap.symbol} =  ${countedTokenAmount.toFixed(3)} ${
              initReceiveFirstTokenSwap.symbol
            }`
          );
        } else if (convertTokensData.inputId === 'sendInput') {
          let convertedValue = await NewContract.methods
            .getAmountsOut((convertTokensData.tokenAmount * 10 ** tokenDecimal1).toString(), [
              convertTokensData.sendTokenForExchangeAddress,
              convertTokensData.receiveTokenForExchangeAddress,
            ])
            .call();

          let countedTokenAmount = +convertedValue[1] / 10 ** tokenDecimal2;

          console.log('convertReceiveTokenToUSDCurrency countedTokenAmount', countedTokenAmount);

          setReceiveTokenForExchangeAmount(countedTokenAmount);

          convertReceiveTokenToUSDCurrency(countedTokenAmount, {
            amount: countedTokenAmount,
            address: convertTokensData.sendTokenForExchangeAddress,
          });
        } else if (convertTokensData.inputId === 'receiveInput') {
          let convertedValue = await NewContract.methods
            .getAmountsOut((convertTokensData.tokenAmount * 10 ** tokenDecimal2).toString(), [
              convertTokensData.receiveTokenForExchangeAddress,
              convertTokensData.sendTokenForExchangeAddress,
            ])
            .call();

          let countedTokenAmount = +convertedValue[1] / 10 ** tokenDecimal2;

          // // // console.log('single swap 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', countedTokenAmount);

          setSendTokenForExchangeAmount(countedTokenAmount);

          convertSendTokenToUSDCurrency({
            amount: countedTokenAmount,
            address: convertTokensData.receiveTokenForExchangeAddress,
            USDCurrency: initSendTokenSwap.USDCurrency,
          });
        }
      } else {
        // // console.log('convertTokensData null amount orNAN error!');

        convertReceiveTokenToUSDCurrency(0, {
          amount: 0,
          address: convertTokensData.receiveTokenForExchangeAddress,
        });
      }
    } catch (err) {
      // console.log('smth went wrong');
      setInitConvertReceiveTokenAmount('An error was occured!');
    }
  };

  const triggerTokenInputHandler = (value, tokenForSwap, chosenTokenType) => {
    // // // console.log('chosenTokenType value', value);
    // // // console.log('chosenTokenType tokenForSwap', tokenForSwap);
    // // // console.log('chosenTokenType tokenForSwap send type', chosenTokenType.isSendTokenSwapped);

    if (chosenTokenType.isSendTokenSwapped === true) {
      setSendTokenForExchangeAmount(value);

      convertExchangeTokensCourse({
        inputId: 'sendInput',
        tokenAmount: parseFloat(value),
        sendTokenForExchangeAddress: initSendTokenSwap.address,
        receiveTokenForExchangeAddress: initReceiveFirstTokenSwap.address,
        routerAddress: activeExchanger.routerAddress,
      });

      convertSendTokenToUSDCurrency({
        amount: value,
        ...tokenForSwap,
      });

      const isLimitExceeded = checkIfExchangedTokenLimitIsExceeded(
        value,
        initSendTokenSwap.balance
      );
      setIsTokensLimitExceeded(isLimitExceeded);
    } else if (chosenTokenType.isSendTokenSwapped === false) {
      setReceiveTokenForExchangeAmount(value);

      convertExchangeTokensCourse({
        inputId: 'receiveInput',
        tokenAmount: parseFloat(value),
        sendTokenForExchangeAddress: initSendTokenSwap.address,
        receiveTokenForExchangeAddress: initReceiveFirstTokenSwap.address,
        routerAddress: activeExchanger.routerAddress,
      });

      // console.log('convertReceiveTokenToUSDCurrency triggered', value);
      convertReceiveTokenToUSDCurrency(value, {
        amount: value,
        ...tokenForSwap,
      });
    }
  };

  const tokensListModalHelper = (listModalData) => {
    // // console.log('isSendTokensList', listModalData);
    // // console.log('isSendTokensListModalOpen', listModalData.isSendTokensListModalOpen);

    if (listModalData.isSendTokensListModalOpen === true) {
      let searchTokensData = { tokensList: finalSendTokensList };

      let removedInitTokenValuesList = initFilteringModalTokensList(
        searchTokensData,
        initSendTokenSwap,
        [initReceiveFirstTokenSwap]
      );

      setFilteredData(removedInitTokenValuesList);
      setIsSendTokensModalVisible(true);
    } else {
      let searchTokensData = { tokensList: finalReceiveTokensList };

      let removedInitTokenValuesList = initFilteringModalTokensList(
        searchTokensData,
        initSendTokenSwap,
        [initReceiveFirstTokenSwap]
      );

      setFilteredReceiveTokensListData(removedInitTokenValuesList);
      setIsReceiveTokensModalVisible(true);
    }
  };

  const filterAmountInputFunction = (e, flag) => {
    let test = e.currentTarget.value.replace(/[^\d.-]/g, '').replace(/[^\w.]|_/g, '');
    // // console.log('regex test', test);

    if (flag.isSendTokenSwapped === true) {
      setSendTokenForExchangeAmount(test);
    } else {
      setReceiveTokenForExchangeAmount(test);
    }
  };

  const selectNewExchanger = (selectedNewExchanger) => {
    const chosenExchanger = { ...selectedNewExchanger, isExchangerSelected: true };
    let notSelectedExchangersList = exchangersOfferedList.filter((el) => {
      return chosenExchanger.routerAddress !== el.routerAddress;
    });
    notSelectedExchangersList = notSelectedExchangersList.map((el) => {
      return { ...el, isExchangerSelected: false };
    });
    notSelectedExchangersList.unshift(chosenExchanger);
    setActiveExchanger(chosenExchanger);
    setExchangersOfferedList(notSelectedExchangersList);
    setSendTokenForExchangeAmount(0);
    setReceiveTokenForExchangeAmount(0);
    setAnchorEl(false);
  };

  const makeSwappedTokensOperation = async (swappedTokensData) => {
    // console.log('single swap tokens operation swappedTokensData', swappedTokensData);

    setIsTokensSwappingActive(true);
    await loadWeb3();
    const web3 = window.web3;
    const metaMaskWalletAddress = await web3.eth.getAccounts();
    // //

    // // console.log('single swap tokens operation walletData', walletData);
    // console.log('single swap tokens operation raw data object', swappedTokensData);

    //As exchanger - UniSwap_V3 by default
    let response;
    try {
      response = await axios.get(
        `https://api.0x.org/swap/v1/quote?buyToken=${swappedTokensData.buyToken}&sellToken=${swappedTokensData.sellToken}&sellAmount=${swappedTokensData.sellAmount}&includedSources=${swappedTokensData.includedSources}&slippagePercentage=${swappedTokensData.slippagePercentage}`
      );

      //from: walletData.address
      // // console.log('single swap tokens operation 0x API obj', response.data);

      let totalObject = { ...response.data, from: metaMaskWalletAddress[0] };

      // console.log('single swap tokens operation total obj', totalObject);

      try {
        await web3.eth.sendTransaction(totalObject);
        // console.log('single swap tokens operation - transaction in progress');
        setIsTokensSwappingActive(false);
      } catch (err) {
        // console.log('single swap tokens operation - tx failed::', err);
        setIsTokensSwappingActive(false);
      }
    } catch (err) {
      alert('An error was occured!');
      console.log('err 0X API data', err);
      setIsTokensSwappingActive(false);
    }
  };

  async function transact() {
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    // // console.log('account selected is :::', accounts[0]);

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
        // // console.log('tx failed::', error);
        // settxFailure(true);
      }
    } else {
      alert('Please Fill All fields');
    }
  }

  const staticSlippageToleranceValueHandler = (slippageToleranceValue) => {
    setSlippageTolerance(slippageToleranceValue / 100);

    setAnchorEl(null);
  };

  const personalSlippageToleranceValueHandler = (slippageToleranceValue) => {
    // // console.log('slippageToleranceValue before', slippageToleranceValue);
    slippageToleranceValue = slippageToleranceValue
      .replace(/[^\d.-]/g, '')
      .replace(/[^\w.]|_/g, '');

    // // console.log('slippageToleranceValue after', slippageToleranceValue);
    // // console.log('slippageToleranceValue after length', slippageToleranceValue.length);
    let totalSlippageTolerance;
    if (slippageToleranceValue.length !== 0) {
      totalSlippageTolerance = slippageToleranceValue / 100;
    } else {
      totalSlippageTolerance = 0;
    }
    // console.log('totalSlippageTolerance 1 totalSlipageTolerance', totalSlippageTolerance);
    setRawPersonalSlippageTolerance(slippageToleranceValue);
    setPersonalSlippageTolerance(totalSlippageTolerance);

    // setAnchorEl(null);
  };

  // // console.log('slippageToleranceValue final', slippageTolerance);
  // // console.log('totalSlippageTolerance pesonal', personalSlippageTolerance);

  const rewriteSlippageTolerance = (value) => {
    setSlippageTolerance(value);
    setAnchorEl(null);
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
            <SwapTokensMainSubBlock isLightTheme={isLightTheme} isMultiSwap={false}>
              {/*send block */}
              <SendReceiveSubBlock>
                <SendBlockLabels isLightTheme={isLightTheme}>
                  <span>Send</span>
                  <span>{tokenSendUSDCurrency}</span>
                </SendBlockLabels>

                {/* Open modal with tokens list*/}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <SendTokensChooseButton
                    isLightTheme={isLightTheme}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'normal',
                    }}>
                    <div style={{ display: 'flex', height: '34px' }}>
                      <ChooseBtnTokenBlock
                        onClick={() =>
                          tokensListModalHelper({
                            isSendTokensListModalOpen: true,
                            token: initSendTokenSwap,
                          })
                        }
                        style={{ height: '45px' }}>
                        {initSendTokenSwap.logoURI !== null &&
                        initSendTokenSwap.logoURI !== undefined ? (
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
                          {initSendTokenSwap.symbol === 'ethereum'
                            ? 'ETH'
                            : initSendTokenSwap.symbol}
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
                              color: isTokensLimitExceeded
                                ? 'red'
                                : isLightTheme
                                ? 'black'
                                : 'white',
                              height: '18px',
                            },
                          },
                          classes: { notchedOutline: classes.noBorder },
                        }}
                        isLightTheme={isLightTheme}
                        placeholder="0.0"
                        value={sendTokenForExchangeAmount}
                        onChange={(e) => {
                          triggerTokenInputHandler(e.target.value, initSendTokenSwap, {
                            isSendTokenSwapped: true,
                          });
                          filterAmountInputFunction(e, { isSendTokenSwapped: true });
                        }}
                      />
                    </div>
                    <div>
                      <MultiSwapSendValueLabel
                        isLightTheme={isLightTheme}
                        style={{ marginLeft: '43px', marginTop: '-5px' }}>
                        {initSendTokenSwap.balance} {initSendTokenSwap.symbol}
                      </MultiSwapSendValueLabel>
                    </div>
                  </SendTokensChooseButton>

                  {isTokensLimitExceeded && (
                    <ExceededAmountTokensLimitWarning style={{ marginTop: '5px' }}>
                      Insufficient funds
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
                                  selectTokenForExchange(object, { isSendTokenChosen: true });

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
                                    routerAddress: activeExchanger.routerAddress,
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
                                      {`${object.balance} ${object.symbol} · 
                                    $ ${
                                      Math.round(object.singleTokenUSDCurrencyAmount * 100000) /
                                      100000

                                      // (object.singleTokenUSDCurrencyAmount * 100000).toString()
                                    } 
                                    `}
                                    </SendTokenConvertedMeasures>
                                  </div>
                                </SendTokenLabelsBlock>
                                <SendTokenBalance isLightTheme={isLightTheme}>
                                  {object.balance !== undefined &&
                                    object.USDCurrency !== undefined && (
                                      <span>
                                        {`$${
                                          Math.round(
                                            object.balance *
                                              object.singleTokenUSDCurrencyAmount *
                                              100000
                                          ) / 100000
                                        }`}
                                      </span>
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

                {isAbleToReplaceTokensInSingleSwap ? (
                  <SwitchTokensBtn
                    onClick={toggleSwappedTokens}
                    src={isLightTheme ? switchTokensLight : switchTokensDark}
                    alt="switch_tokens_btn"
                  />
                ) : (
                  <SwitchTokensBtn
                    style={{ opacity: 0.5 }}
                    src={isLightTheme ? switchTokensLight : switchTokensDark}
                    alt="switch_tokens_btn"
                  />
                )}
              </SendReceiveSubBlock>

              {/* modal with receive tokens list*/}

              <SendReceiveSubBlock style={{ marginTop: '-9px' }}>
                <SendBlockLabels isLightTheme={isLightTheme}>
                  <span>Receive</span>
                  <span>{tokenReceiveUSDCurrency}</span>
                </SendBlockLabels>
                <SendTokensChooseButton isLightTheme={isLightTheme}>
                  <ChooseBtnTokenBlock
                    onClick={() =>
                      tokensListModalHelper({
                        isSendTokensListModalOpen: false,
                        token: initReceiveFirstTokenSwap,
                      })
                    }>
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
                      triggerTokenInputHandler(event.target.value, initReceiveFirstTokenSwap, {
                        isSendTokenSwapped: false,
                      });
                      filterAmountInputFunction(event, { isSendTokenSwapped: false });
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
                                key={object.symbol}
                                onClick={() => {
                                  setFilteredReceiveTokensListData(finalReceiveTokensList);

                                  convertExchangeTokensCourse({
                                    inputId: 'chooseSendToken',
                                    tokenAmount: 1,
                                    sendTokenForExchangeAddress: initSendTokenSwap.address,
                                    receiveTokenForExchangeAddress:
                                      initReceiveFirstTokenSwap.address,
                                    routerAddress: activeExchanger.routerAddress,
                                  });
                                  selectTokenForExchange(object, {
                                    isSendTokenChosen: false,
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
                    {initConvertReceiveTokenAmount}
                  </LabelsBlockSubBlockSpan>
                </LabelsBlockSubBlock>

                <LabelsBlockSubBlock isLightTheme={isLightTheme}>
                  <LabelsBlockSubBlockSpan isLightTheme={isLightTheme}>
                    Offered by
                  </LabelsBlockSubBlockSpan>

                  <AdditionalOptionsSwapTokensSubBlock isLightTheme={isLightTheme}>
                    <img src={activeExchanger.logoIcon} alt="e" />
                    <span
                      onClick={(event) =>
                        openExchangersListPopover(event, { isOfferedByPopoverActivated: true })
                      }
                      style={{ cursor: 'pointer' }}>
                      {activeExchanger.name}
                    </span>
                    {/* offered by exchangers list popover*/}
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
                      {isOfferedByPopoverActivated ? (
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
                                    <ExchangerElementListItem
                                      isLightTheme={isLightTheme}
                                      onClick={() =>
                                        exchanger.routerAddress !== activeExchanger.routerAddress &&
                                        selectNewExchanger(exchanger)
                                      }>
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
                                          visibility:
                                            exchanger.isExchangerSelected === false && 'hidden',
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
                      ) : (
                        <SingleSwapTokensOfferedBySubBlock isLightTheme={isLightTheme}>
                          <ExchangersMainSubLayout style={{ height: '490px' }}>
                            <OfferedByLayoutLabelBlock
                              isLightTheme={isLightTheme}
                              onClick={handleClose}>
                              <img
                                src={isLightTheme ? chevronDownBlack : chevronDownLight}
                                alt="chevron_icon"
                              />
                              <span>Transaction speed</span>
                            </OfferedByLayoutLabelBlock>
                            <ExchangersLayout isLightTheme={isLightTheme}>
                              {/*Transaction speed content*/}

                              <TransactionSpeedGridLayout>
                                {addIconsGasPricesWithIcons.map((option) => (
                                  <TransactionSpeedGridLayoutItem isLightTheme={isLightTheme}>
                                    <GridLayoutItemIconSubBlock>
                                      <div>
                                        <img src={option.icon} alt="f" />
                                        <span>{option.label}</span>
                                      </div>
                                    </GridLayoutItemIconSubBlock>
                                    <span>{option.value} Gwei ($40.50)</span>
                                  </TransactionSpeedGridLayoutItem>
                                ))}
                              </TransactionSpeedGridLayout>

                              {/*<div*/}
                              {/*  style={{*/}
                              {/*    display: 'flex',*/}
                              {/*    justifyContent: 'center',*/}
                              {/*  }}>*/}
                              {/*  <AdvancedSettingsButton isLightTheme={isLightTheme}>*/}
                              {/*    Advanced settings*/}
                              {/*  </AdvancedSettingsButton>*/}
                              {/*</div>*/}

                              <SlippageToleranceLabel isLightTheme={isLightTheme}>
                                Slippage Tolerance
                              </SlippageToleranceLabel>
                              <SlippageToleranceBtnsLayout>
                                <StablePercentChooseToleranceBtn
                                  disabled={slippageTolerance === 0.01}
                                  isLightTheme={isLightTheme}
                                  onClick={() => staticSlippageToleranceValueHandler(1)}>
                                  1%
                                </StablePercentChooseToleranceBtn>
                                <StablePercentChooseToleranceBtn
                                  disabled={slippageTolerance === 0.03}
                                  isLightTheme={isLightTheme}
                                  onClick={() => staticSlippageToleranceValueHandler(3)}>
                                  3%
                                </StablePercentChooseToleranceBtn>
                                <FloatPercentChooseToleranceBtn isLightTheme={isLightTheme}>
                                  <TextField
                                    onChange={(e) =>
                                      personalSlippageToleranceValueHandler(e.target.value)
                                    }
                                    InputProps={{
                                      inputProps: {
                                        style: {
                                          textAlign: 'center',
                                          fontWeight: 600,
                                          color: isLightTheme ? 'black' : 'white',
                                        },
                                      },
                                      endAdornment: (
                                        <span
                                          style={{
                                            fontWeight: 'bold',
                                            color: isLightTheme ? 'black' : 'white',
                                          }}>
                                          %
                                        </span>
                                      ),
                                      classes: {
                                        notchedOutline: classes.noBorder,
                                        input: classes.input,
                                      },
                                    }}
                                    InputLabelProps={{
                                      style: { textAlign: 'center' },
                                    }}
                                    value={rawPersonalSlippageTolerance}
                                    // placeholder="%"
                                  />
                                </FloatPercentChooseToleranceBtn>
                              </SlippageToleranceBtnsLayout>

                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  marginTop: '13px',
                                }}>
                                <AdvancedSettingsButton
                                  isLightTheme={isLightTheme}
                                  disabled={
                                    personalSlippageTolerance <= 0 || personalSlippageTolerance >= 1
                                  }
                                  onClick={() => {
                                    rewriteSlippageTolerance(personalSlippageTolerance);
                                  }}>
                                  Save
                                </AdvancedSettingsButton>
                              </div>
                            </ExchangersLayout>
                          </ExchangersMainSubLayout>
                        </SingleSwapTokensOfferedBySubBlock>
                      )}
                    </Popover>
                    {/*  end popover  */}
                  </AdditionalOptionsSwapTokensSubBlock>
                </LabelsBlockSubBlock>

                <LabelsBlockSubBlock isLightTheme={isLightTheme}>
                  <LabelsBlockImportantSpan isLightTheme={isLightTheme}>
                    Slippage Tolerance
                  </LabelsBlockImportantSpan>
                  <AdditionalOptionsSwapTokensSubBlock isLightTheme={isLightTheme}>
                    <span
                      onClick={(event) =>
                        openExchangersListPopover(event, { isOfferedByPopoverActivated: false })
                      }
                      style={{ cursor: 'pointer' }}>
                      {`${slippageTolerance * 100}%`}
                    </span>
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
                  disabled={
                    isTokensLimitExceeded ||
                    false ||
                    sendTokenForExchangeAmount === '0' ||
                    sendTokenForExchangeAmount === 0 ||
                    sendTokenForExchangeAmount?.length === 0 ||
                    isTokensSwappingActive === true
                  }
                  onClick={() => {
                    // calculateToAmount(initSendTokenSwap);
                    makeSwappedTokensOperation({
                      buyToken: initReceiveFirstTokenSwap.symbol,
                      sellToken: initSendTokenSwap.symbol,
                      sellAmount: sendTokenForExchangeAmount * Math.pow(10, 18).toString(),
                      includedSources: activeExchanger.name,
                      slippagePercentage: slippageTolerance,
                      sendTokenAddress: initSendTokenSwap.address,
                      receiveTokenAddress: initReceiveFirstTokenSwap.address,
                      gasPrice: selectedGasPrice ? selectedGasPrice : proposeGasPrice,
                    });
                  }}>
                  {isTokensSwappingActive ? 'Executing...' : 'Exchange'}
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
