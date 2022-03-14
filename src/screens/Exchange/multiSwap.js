import React, { useEffect, useRef, useState } from 'react';
import {
  AdditionalOptionsSwapTokensSubBlock,
  AddReceiveTokenMultiSwapBtn,
  ChosenMultiSwapSendReceiveTokenValueInput,
  ChosenTokenLabel,
  ColumnMainSubTitles,
  ColumnMainTitles,
  DownDelimiterLabelsBlock,
  ExchangerElementListItem,
  ExchangersLayout,
  ExchangersLayoutTitlesBlock,
  ExchangersMainSubLayout,
  ExchangerMainList,
  FirstSubLayoutMultiSwapReceiveTokensBlock,
  LabelsBlockImportantSpan,
  LabelsBlockSubBlock,
  LabelsBlockSubBlockSpan,
  MultiSwapChooseBtnTokenBlock,
  MultiSwapReceiveTokensBlock,
  MultiSwapSendTokensChooseBlock,
  MultiSwapSendValueLabel,
  MultiSwapTokenAvatar,
  NewMultiSwapButton,
  OfferedByLayoutLabelBlock,
  SecondColumnSwapSubBlock,
  SecondColumnTitleBlock,
  SecondColumnTitleHeaderBlock,
  SecondSubLayoutMultiSwapReceiveTokensBlock,
  SendReceiveSubBlock,
  SendTokenImg,
  SwapBlockDelimiter,
  SwapBlockExchangeLayout,
  SwapTokensMainSubBlock,
  SwapTokensOfferedBySubBlock,
  SwitchTokensBtn,
  USDCurrencyInputBlock,
  ExchangerElementSpan,
  ExchangerBestRateSpan,
  ExchangerIcon,
  GreenDotIcon,
  ExchangersMainListLayout,
  SaveSelectedExchangerButton,
  TokensModalSubLayout,
  SearchTokensModalTextField,
  SendTokensModalList,
  SendTokenModalListItem,
  SendTokenLabelsBlock,
  SendTokenName,
  SendTokenConvertedMeasures,
  SendTokenBalance,
  AbsentFoundTokensBlock,
  ExceededAmountTokensLimitWarning,
  SubLayoutReceiveTokensBlock,
  USDCurrencySendInputBlock,
  MultiSwapSendValueLabelsLayout,
  SendBlockLabels,
} from './styled';
import EthIcon from '../../assets/icons/ethereum.svg';
import chevronDownBlack from '../../assets/icons/chevronDownLightTheme.svg';
import chevronDownLight from '../../assets/icons/chevronDownLight.svg';
import switchTokensLight from '../../assets/icons/switchTokensLight.svg';
import switchTokensDark from '../../assets/icons/switchTokensDark.svg';

import plusIconDark from '../../assets/icons/plusIconDark.svg';
import plusIconLight from '../../assets/icons/plusIconLight.svg';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import daiICon from '../../assets/icons/daiIcon.svg';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import actionTypes from '../../constants/actionTypes';
import { getTokenDataSaga } from '../../store/currentTokenData/actions';
import { useParams } from 'react-router-dom';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import Popover from '@mui/material/Popover';
import greenDot from '../../assets/icons/greenDot.svg';

import paraSwapIcon from '../../assets/icons/exchangers/paraSwapExchangerIcon.svg';
import uniswapExchangerIcon from '../../assets/icons/exchangers/uniswapExchangerIcon.svg';

import exchangersOfferedList from './exchangersOfferedListPolygon.js';
// import sendTokensMockList from './sendTokensMockList.json';
import sendTokensMockList from './sendTokensMockListPolygon.js';
import SelectTokensModalContainer from './selectTokensModal';
import OutsideClickHandler from './outsideClickHandler';
import { CloseButton, Header, ModalTitle } from './selectTokensModal/styles';
import closeModalIcon from '../../assets/icons/close_nft.svg';
import closeModalIconDark from '../../assets/icons/closenftdark.svg';
import searchTokensImportModalDark from '../../assets/icons/searchTokensInputModalDark.svg';
import searchTokensImportModalLight from '../../assets/icons/searchTokensButtonMobileLight.svg';
import Avatar from 'react-avatar';
import Loader from 'react-loader-spinner';
import {
  checkIfExchangedTokenLimitIsExceeded,
  convertSendTokenToUSDCurrencyHelper,
  filteredTokensByName,
  initFilteringModalTokensList,
} from './helpers';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import Web3 from 'web3';
import multiCallAbi from '../../abi/MultiCall.json';
import TOKENDECIMALSABI from '../../abi/TokenDecomals.json';
import ROUTERABI from '../../abi/UniRouterV2.json';

const useStyles = makeStyles((theme) => ({
  noBorder: {
    border: 'none !important',
  },
}));

export default function MultiSwapComponent() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [tokenSendUSDCurrency, setTokenSendUSDCurrency] = useState('$0.00');
  const [tokenSendAmount, setTokenSendAmount] = useState();
  let [tokensListModal, setTokensListModal] = useState([]);
  const [sendTokenForExchangeAmount, setSendTokenForExchangeAmount] = useState();
  const [receiveTokensRefsList, setReceiveTokensRefsList] = useState([]);
  //
  let [oldTokenSwappedAddress, setOldTokenSwappedAddress] = useState();
  let [isSendTokenSelectedSwapped, setIsSendTokenSelectedSwapped] = useState(false);
  const [openTokensModal, setOpenTokensModal] = useState(false);
  const [isTokensLimitExceeded, setIsTokensLimitExceeded] = useState(false);
  let [isAddedReceiveTokensLimitExceeded, setIsAddedReceiveTokensLimitExceeded] = useState(false);

  let textInput = useRef(null);

  const isLoadingReceiveTokensList = useSelector(
    (state) => state.tokensListReducer.isReceiveMultiSwapTokensListLoading
  );

  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);

  const initSendMultiSwapToken = useSelector(
    (state) => state.tokensListReducer.initSendTokenMultiSwap
  );
  const initReceiveMultiSwapTokensList = useSelector(
    (state) => state.tokensListReducer.initReceiveMultiSwapTokensList
  );

  console.log('receive USD multi init state SendTokenSwap 12345', initSendMultiSwapToken);
  // console.log('receive USD token send Amount', tokenSendAmount);
  console.log(
    ' receive USD multi init state ReceiveMultiSwapTokensList',
    initReceiveMultiSwapTokensList
  );

  //popover open/close

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  //-------------

  const { account, activate, active, chainId, connector, deactivate, error, provider, setError } =
    useWeb3React();

  //working saga
  const finalSendTokensList = useSelector((state) => state.tokensListReducer.sendTokensList);
  console.log('multiswap finalSendTokensList 12345', finalSendTokensList);

  // const finalReceiveTokensList = sendTokensMockList;
  let finalReceiveTokensList = useSelector((state) => state.tokensListReducer.receiveTokensList);

  async function getWeb3() {
    // const provider = active ? await connector.getProvider() : ethers.getDefaultProvider();
    const web3 = await new Web3(window.ethereum);
    return web3;
  }

  let convertSendTokenToUSDCurrency = (tokenData) => {
    let convertedToUSDValue = convertSendTokenToUSDCurrencyHelper(tokenData);
    // console.log('multiswap convertedToUSDValue', convertedToUSDValue);
    setTokenSendUSDCurrency(convertedToUSDValue);
    setTokenSendAmount(tokenData.amount);
  };

  let convertReceiveTokenToUSDCurrency = async (amount, tokenData) => {
    // dispatch({ type: actionTypes.SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST_LOADING, payload: true });

    if (amount === '') {
      amount = '0';
    }

    let tokenUSDCurrencyValue;
    let finalUSDCurrencyValue;

    if (tokenData.address !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      await axios
        .get(
          `https://api.ethplorer.io/getTokenInfo/${tokenData.address}?apiKey=EK-qSPda-W9rX7yJ-UY93y`
        )
        .then(async (response) => {
          tokenUSDCurrencyValue = response;
        })
        .catch((err) => {
          console.log('err of usd currency receive token', err);
        });

      if (tokenUSDCurrencyValue.data.price.rate !== undefined) {
        finalUSDCurrencyValue = `$ ${(
          tokenUSDCurrencyValue.data.price.rate * parseFloat(amount)
        ).toFixed(2)}`;
      } else {
        finalUSDCurrencyValue = 'Price not available';
      }
    } else {
      const ethDollarValue = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
      );
      finalUSDCurrencyValue = `$${(ethDollarValue.data.ethereum.usd * parseFloat(amount)).toFixed(
        2
      )}`;
    }

    console.log('multiswap receive USD finalUSDCurrencyValue', finalUSDCurrencyValue);

    let receiveTokensListCopy = [...initReceiveMultiSwapTokensList];
    console.log('receiveTokensListCopy', receiveTokensListCopy);

    const needIndex = receiveTokensListCopy.findIndex(
      (token) => token.address === tokenData.address
    );

    console.log('multiswap receive USD index', needIndex);

    if (needIndex !== -1) {
      receiveTokensListCopy[needIndex].USDCurrency = finalUSDCurrencyValue;
      receiveTokensListCopy[needIndex].amount = amount;
    }

    dispatch({
      type: actionTypes.SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST,
      payload: receiveTokensListCopy,
    });

    // dispatch({ type: actionTypes.SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST_LOADING, payload: false });

    console.log('multiswap receive USD total', initReceiveMultiSwapTokensList);

    await getAmountMulti();
  };

  useEffect(() => {
    setSendTokenForExchangeAmount(0);

    for (let i = 0; i < initReceiveMultiSwapTokensList.length; i++) {
      if (
        initSendMultiSwapToken.address !== undefined &&
        initReceiveMultiSwapTokensList[i].address !== undefined
      )
        convertExchangeTokensCourse({
          sendTokenForExchangeAddress: initSendMultiSwapToken.address,
          receiveTokenForExchangeAddress: initReceiveMultiSwapTokensList[i].address,
          tokenAmount: 1,
        });
    }
  }, [initSendMultiSwapToken, initReceiveMultiSwapTokensList]);

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

  const convertExchangeTokensCourse = async (convertTokensData) => {
    console.log('convertTokensData multiswap', convertTokensData);

    let needIndex = initReceiveMultiSwapTokensList.findIndex(
      (token) => token.address === convertTokensData.receiveTokenForExchangeAddress
    );

    if (needIndex !== -1) {
      initReceiveMultiSwapTokensList[needIndex] = {
        ...initReceiveMultiSwapTokensList[needIndex],
        singleAmountSendTokenConvert: 0,
      };
    }

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

    const NewContract = new web3.eth.Contract(
      ROUTERABI,
      //Sushiswap contract address - should be changed dynamically
      '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
    );

    if (convertTokensData.tokenAmount !== 0 && !isNaN(convertTokensData.tokenAmount)) {
      // console.log('is not null!');

      const convertedValue = await NewContract.methods
        .getAmountsOut((convertTokensData.tokenAmount * 10 ** tokenDecimal1).toString(), [
          convertTokensData.sendTokenForExchangeAddress,
          convertTokensData.receiveTokenForExchangeAddress,
        ])
        .call();

      if (needIndex !== -1) {
        initReceiveMultiSwapTokensList[needIndex] = {
          ...initReceiveMultiSwapTokensList[needIndex],
          singleAmountSendTokenConvert: (+convertedValue[1] / 10 ** tokenDecimal2)
            .toString()
            .substring(0, 7),
        };
      }
    } else {
      console.log('convertTokensData null amount orNAN error!');

      if (needIndex !== -1) {
        initReceiveMultiSwapTokensList[needIndex] = {
          ...initReceiveMultiSwapTokensList[needIndex],
          singleAmountSendTokenConvert: 0,
        };
      }
    }
  };

  //----- convert token course (need to implement necessary network)

  let exchange = async () => {
    console.log('total MultiSwap sendToken initSendMultiSwapToken', initSendMultiSwapToken);
    console.log('total MultiSwap sendToken object AMOUNT', tokenSendAmount);
    console.log(
      'total MultiSwap receiveTokensList exchange object',
      initReceiveMultiSwapTokensList
    );
  };

  const openModalHelper = (payload) => {
    // console.log('modal payload value', payload);
    setTokensListModal([]);
    setOpenTokensModal(true);
    let removedInitTokenValuesList = initFilteringModalTokensList(
      payload,
      initSendMultiSwapToken,
      initReceiveMultiSwapTokensList
    );
    setTokensListModal(removedInitTokenValuesList);
    setIsSendTokenSelectedSwapped(payload.isSendModalOpen);
  };

  // console.log('tokensListModal modal', tokensListModal);

  const searchTokensHandler = (event, isSendTokenSelectedSwapped, searchTokensData) => {
    let removedInitTokenValuesList = initFilteringModalTokensList(
      searchTokensData,
      initSendMultiSwapToken,
      initReceiveMultiSwapTokensList
    );
    let filteredTokensList = filteredTokensByName(event, removedInitTokenValuesList);
    setTokensListModal(filteredTokensList);
  };

  const getAmountMulti = async () => {
    const web3 = await getWeb3();
    const multiCallContract = new web3.eth.Contract(
      multiCallAbi,
      '0xFe2C75Fdd496792c8684F2e1168362E2f9e7c56f'
    );

    const routers = exchangersOfferedList.map((i) => i.routerAddress);
    console.log('multiswap routers', routers);

    let sendTokenAddress = initSendMultiSwapToken.address;

    if (sendTokenAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      sendTokenAddress = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270';
    }

    console.log('multiswap receiveTokensList', initReceiveMultiSwapTokensList);

    for (let i = 0; i < initReceiveMultiSwapTokensList.length; i++) {
      const item = initReceiveMultiSwapTokensList[i];
      console.log('multiswap item111111111', item);
      if (item.amount && item.amount > 0) {
        // const decimals = web3.utils.toBN(item.decimals);
        const amount = item.amount * 10 ** item.decimals;
        console.log('multiswap amount', amount.toString());
        initReceiveMultiSwapTokensList[i].swap = await multiCallContract.methods
          .getAmountsIn(routers, sendTokenAddress, item.address, amount.toString())
          .call();
      }
    }

    console.log(initReceiveMultiSwapTokensList, 'multiswap receiveTokensList111111111111');
    return true;
  };

  const selectTokenForSwap = async (selectedSwapToken, isSendTokenSelectedSwapped) => {
    // console.log('copy multiswap send/receive selectedSwapToken', selectedSwapToken);

    // await getAmountMulti(selectedSwapToken, isSendTokenSelectedSwapped);

    if (isSendTokenSelectedSwapped === true) {
      setSendTokenForExchangeAmount(0);

      dispatch({
        type: actionTypes.SET_INIT_SEND_MULTISWAP_TOKEN,
        payload: selectedSwapToken,
      });

      convertSendTokenToUSDCurrency({
        amount: 0,
        ...selectedSwapToken,
        address: selectedSwapToken.address,
      });
    } else if (selectedSwapToken.receiveTokensListItem === true) {
      dispatch({ type: actionTypes.SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST_LOADING, payload: true });

      let receiveTokensListCopy = [...initReceiveMultiSwapTokensList];

      // found necessary index of element, which currency is updated
      const needIndex = receiveTokensListCopy.findIndex(
        (token) => token.address === oldTokenSwappedAddress
      );

      if (needIndex !== -1) {
        receiveTokensListCopy[needIndex] = {
          ...selectedSwapToken,
          receiveTokensListItem: true,
          USDCurrency: '$ 0.00',
          // amount: 0,
        };
      }

      //clear the old input value from token field
      // should bee done for all tokens - do only for last by ref, should be done by keys
      textInput.current.value = '';

      dispatch({
        type: actionTypes.SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST,
        payload: receiveTokensListCopy,
      });

      dispatch({
        type: actionTypes.SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST_LOADING,
        payload: false,
      });
    }
  };

  console.log('finalReceiveTokensList multiswap', finalReceiveTokensList);
  console.log(
    'finalReceiveTokensList initReceiveMultiSwapTokensList multiswap',
    initReceiveMultiSwapTokensList
  );

  const addReceiveTokensHandler = (fullTokensList) => {
    dispatch({
      type: actionTypes.SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST_LOADING,
      payload: true,
    });

    // searchTokensData.tokensList
    // console.log('add receive token handler fullTokensList init', fullTokensList);

    let removedInitTokenValuesList = initFilteringModalTokensList(
      fullTokensList,
      initSendMultiSwapToken,
      initReceiveMultiSwapTokensList
    );

    // console.log('add receive token handler finalReceiveTokensList ', removedInitTokenValuesList);

    if (removedInitTokenValuesList.length !== 0) {
      initReceiveMultiSwapTokensList.push(removedInitTokenValuesList[0]);
    } else {
      setIsAddedReceiveTokensLimitExceeded(true);
    }

    dispatch({
      type: actionTypes.SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST_LOADING,
      payload: false,
    });
  };

  console.log('isSendTokenSelectedSwapped', isSendTokenSelectedSwapped);

  return (
    <SecondColumnSwapSubBlock>
      <SecondColumnTitleBlock>
        <SecondColumnTitleHeaderBlock>
          <ColumnMainTitles isLightTheme={isLightTheme}>Multiswap</ColumnMainTitles>
          <NewMultiSwapButton>New!</NewMultiSwapButton>
        </SecondColumnTitleHeaderBlock>
        <ColumnMainSubTitles style={{ marginTop: '15px' }} isLightTheme={isLightTheme}>
          Trade any token for many tokens or many tokens for a token in a single transaction
        </ColumnMainSubTitles>
      </SecondColumnTitleBlock>
      <SwapTokensMainSubBlock
        isLightTheme={isLightTheme}
        style={{ marginTop: '0', height: 'auto' }}>
        {/*Choose send tokens block*/}
        <SendReceiveSubBlock>
          <SendBlockLabels isLightTheme={isLightTheme} style={{ margin: '32px 20px 0px 20px' }}>
            <span>Send</span>
          </SendBlockLabels>
          <MultiSwapSendTokensChooseBlock isLightTheme={isLightTheme}>
            {/* SEND block */}

            <MultiSwapChooseBtnTokenBlock>
              <div
                onClick={() =>
                  openModalHelper({ tokensList: finalSendTokensList, isSendModalOpen: true })
                }>
                {initSendMultiSwapToken.logoURI !== null ? (
                  <SendTokenImg
                    alt="token_img"
                    src={initSendMultiSwapToken.logoURI}
                    style={{ marginLeft: '0px' }}
                  />
                ) : (
                  <MultiSwapTokenAvatar
                    name={initSendMultiSwapToken.avatarIcon}
                    round={true}
                    size="21"
                    textSizeRatio={1}
                  />
                )}
                <ChosenTokenLabel isLightTheme={isLightTheme}>
                  {initSendMultiSwapToken.symbol === 'ethereum'
                    ? 'ETH'
                    : initSendMultiSwapToken.symbol}
                </ChosenTokenLabel>
                <img src={isLightTheme ? chevronDownBlack : chevronDownLight} alt="chevron_icon" />
              </div>
              <USDCurrencySendInputBlock>
                <ChosenMultiSwapSendReceiveTokenValueInput
                  // disabled={true}
                  style={{ marginRight: '0px' }}
                  InputProps={{
                    inputProps: {
                      style: {
                        marginTop: '4px',
                        textAlign: 'right',
                        padding: 0,
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
                    setSendTokenForExchangeAmount(e.target.value);
                    convertSendTokenToUSDCurrency({
                      amount: e.target.value,
                      ...initSendMultiSwapToken,
                    });

                    // convertReceiveTokenToUSDCurrency

                    const isLimitExceeded = checkIfExchangedTokenLimitIsExceeded(
                      e.target.value,
                      initSendMultiSwapToken.balance
                    );
                    setIsTokensLimitExceeded(isLimitExceeded);
                  }}
                />
              </USDCurrencySendInputBlock>
            </MultiSwapChooseBtnTokenBlock>

            <MultiSwapSendValueLabelsLayout
            // style={{ backgroundColor: 'red' }}
            >
              <MultiSwapSendValueLabel isLightTheme={isLightTheme} style={{ marginLeft: '30px' }}>
                {initSendMultiSwapToken.balance} {initSendMultiSwapToken.symbol}
              </MultiSwapSendValueLabel>

              <MultiSwapSendValueLabel isLightTheme={isLightTheme}>
                {tokenSendUSDCurrency}
              </MultiSwapSendValueLabel>
            </MultiSwapSendValueLabelsLayout>
          </MultiSwapSendTokensChooseBlock>
          {isTokensLimitExceeded && (
            <ExceededAmountTokensLimitWarning style={{ marginRight: '30px', marginTop: '-10px' }}>
              Insufficient funds
            </ExceededAmountTokensLimitWarning>
          )}

          <SwitchTokensBtn
            src={isLightTheme ? switchTokensLight : switchTokensDark}
            alt="switch_tokens_btn"
          />
        </SendReceiveSubBlock>

        {/* mapped received block */}
        {isLoadingReceiveTokensList === true ? (
          <span style={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>
            Loading...
          </span>
        ) : (
          <>
            <SendBlockLabels isLightTheme={isLightTheme} style={{ margin: '0px 20px 5px 20px' }}>
              <span>Receive</span>
            </SendBlockLabels>
            <SubLayoutReceiveTokensBlock>
              {initReceiveMultiSwapTokensList.map((receiveToken, key) => (
                <MultiSwapReceiveTokensBlock isLightTheme={isLightTheme}>
                  <FirstSubLayoutMultiSwapReceiveTokensBlock>
                    <MultiSwapChooseBtnTokenBlock
                      style={{ marginTop: '-15px', marginLeft: '8px' }}
                      onClick={() => {
                        setOldTokenSwappedAddress(receiveToken.address);
                        openModalHelper(
                          {
                            tokensList: finalReceiveTokensList,
                            isSendModalOpen: false,
                            receiveToken,
                          },
                          key
                        );
                      }}>
                      <div>
                        {receiveToken.logoURI !== null ? (
                          <SendTokenImg
                            alt="token_img"
                            src={receiveToken.logoURI}
                            style={{ marginLeft: '4px' }}
                          />
                        ) : (
                          <Avatar
                            style={{
                              marginRight: '12px',
                              height: '21px',
                              width: '21px',
                              marginLeft: '5px',
                            }}
                            name={receiveToken.name}
                            round={true}
                            size="21"
                            textSizeRatio={1}
                          />
                        )}
                        <ChosenTokenLabel isLightTheme={isLightTheme}>
                          {receiveToken.symbol === 'ethereum' ? 'ETH' : receiveToken.symbol}
                        </ChosenTokenLabel>
                        <img
                          src={isLightTheme ? chevronDownBlack : chevronDownLight}
                          alt="chevron_icon"
                        />
                      </div>
                    </MultiSwapChooseBtnTokenBlock>
                    <USDCurrencyInputBlock>
                      <ChosenMultiSwapSendReceiveTokenValueInput
                        // inputRef={(ref) => (receiveTokensRefsList[key] = ref)}
                        InputProps={{
                          inputProps: {
                            style: {
                              marginTop: '4px',
                              textAlign: 'right',
                              padding: 0,
                              width: '200px',
                              fontWeight: 600,
                              color: isLightTheme ? 'black' : 'white',
                            },
                          },
                          classes: { notchedOutline: classes.noBorder },
                        }}
                        isLightTheme={isLightTheme}
                        placeholder="0.0"
                        inputRef={textInput}
                        value={receiveToken.amount}
                        onChange={(e) => {
                          convertReceiveTokenToUSDCurrency(e.target.value, {
                            ...receiveToken,
                          });
                        }}
                      />

                      <div style={{ display: 'flex', marginRight: '20px' }}>
                        <MultiSwapSendValueLabel
                          isLightTheme={isLightTheme}
                          style={{ marginLeft: 'auto' }}>
                          {receiveToken.USDCurrency}
                        </MultiSwapSendValueLabel>
                      </div>
                    </USDCurrencyInputBlock>
                  </FirstSubLayoutMultiSwapReceiveTokensBlock>
                  <SecondSubLayoutMultiSwapReceiveTokensBlock>
                    <LabelsBlockSubBlock
                      isLightTheme={isLightTheme}
                      style={{ marginBottom: '3px' }}>
                      <LabelsBlockSubBlockSpan isLightTheme={isLightTheme}>
                        Exchange rate
                      </LabelsBlockSubBlockSpan>

                      {receiveToken.singleAmountSendTokenConvert !== 0 ? (
                        <LabelsBlockSubBlockSpan isLightTheme={isLightTheme}>
                          1 {initSendMultiSwapToken.symbol} ={' '}
                          {receiveToken.singleAmountSendTokenConvert} {receiveToken.symbol}
                        </LabelsBlockSubBlockSpan>
                      ) : (
                        <LabelsBlockSubBlockSpan isLightTheme={isLightTheme}>
                          Unavailable
                        </LabelsBlockSubBlockSpan>
                      )}
                    </LabelsBlockSubBlock>
                    <LabelsBlockSubBlock isLightTheme={isLightTheme}>
                      <LabelsBlockSubBlockSpan isLightTheme={isLightTheme}>
                        Offered by
                      </LabelsBlockSubBlockSpan>
                      <AdditionalOptionsSwapTokensSubBlock isLightTheme={isLightTheme}>
                        <img src={paraSwapIcon} alt="paraSwapIcon" />
                        <span onClick={handleClick}>ParaSwap</span>
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
                              marginLeft: '49px',
                              width: '525px',
                              height: '480px',
                              backgroundColor: isLightTheme ? '#FFFFFF29' : '#4453AD1A',
                              boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
                              backdropFilter: 'blur(35px)',
                              mixBlendMode: 'normal',
                              borderRadius: '10px',
                            },
                          }}>
                          <SwapTokensOfferedBySubBlock isLightTheme={isLightTheme}>
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
                                            visibility:
                                              exchanger.greenDotIcon === false && 'hidden',
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
                          </SwapTokensOfferedBySubBlock>
                        </Popover>
                      </AdditionalOptionsSwapTokensSubBlock>
                    </LabelsBlockSubBlock>
                  </SecondSubLayoutMultiSwapReceiveTokensBlock>
                </MultiSwapReceiveTokensBlock>
              ))}
            </SubLayoutReceiveTokensBlock>

            {/* choose send/receive tokens modal*/}
            {openTokensModal && (
              <SelectTokensModalContainer
                theme={isLightTheme}
                isOpen={openTokensModal}
                onClose={() => {
                  setOpenTokensModal(false);
                }}>
                <OutsideClickHandler
                  onOutsideClick={() => {
                    setOpenTokensModal(false);
                  }}>
                  <TokensModalSubLayout isLightTheme={isLightTheme}>
                    <Header>
                      <ModalTitle isLightTheme={isLightTheme}>
                        Select token for send multiswap
                      </ModalTitle>
                      <CloseButton
                        onClick={() => {
                          setOpenTokensModal(false);
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
                        isSendTokenSelectedSwapped
                          ? searchTokensHandler(event, isSendTokenSelectedSwapped, {
                              tokensList: finalSendTokensList,
                            })
                          : searchTokensHandler(event, isSendTokenSelectedSwapped, {
                              tokensList: finalReceiveTokensList,
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

                    {tokensListModal.length !== 0 ? (
                      <SendTokensModalList isLightTheme={isLightTheme}>
                        {tokensListModal.map((object) => (
                          <SendTokenModalListItem
                            onClick={() => {
                              setOpenTokensModal(false);
                              selectTokenForSwap(object, isSendTokenSelectedSwapped);
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
                            <SendTokenBalance isLightTheme={isLightTheme}>
                              {object.balance !== undefined && isSendTokenSelectedSwapped === true && (
                                // <Loader type="Rings" color="#BB86FC" height={30} width={30} />
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

            {isAddedReceiveTokensLimitExceeded === false && (
              <AddReceiveTokenMultiSwapBtn
                style={{ marginTop: '20px' }}
                isLightTheme={isLightTheme}
                onClick={() => {
                  addReceiveTokensHandler({ tokensList: finalReceiveTokensList });
                }}>
                <img
                  src={isLightTheme ? plusIconDark : plusIconLight}
                  alt="add_receive_multiswap_token"
                />
              </AddReceiveTokenMultiSwapBtn>
            )}
          </>
        )}
        <SwapBlockDelimiter isLightTheme={isLightTheme} style={{ margin: '20px  27px 0 20px' }} />
        {/* Labels block*/}
        <DownDelimiterLabelsBlock
          isLightTheme={isLightTheme}
          style={{ marginTop: '20px', padding: '20 27px 16px 20px' }}>
          <div style={{ padding: '0 27px 16px 20px' }}>
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
          </div>
        </DownDelimiterLabelsBlock>
        <SwapBlockExchangeLayout isLightTheme={isLightTheme} style={{ marginBottom: '40px' }}>
          <Button
            onClick={() => exchange()}
            disabled={
              isTokensLimitExceeded ||
              false ||
              sendTokenForExchangeAmount === '0' ||
              sendTokenForExchangeAmount === 0 ||
              sendTokenForExchangeAmount?.length === 0
            }>
            Exchange
          </Button>
        </SwapBlockExchangeLayout>
      </SwapTokensMainSubBlock>
    </SecondColumnSwapSubBlock>
  );
}
