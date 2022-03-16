import React, { useEffect, useRef, useState } from 'react';
import {
  AbsentFoundTokensBlock,
  AdditionalOptionsSwapTokensSubBlock,
  AddReceiveTokenMultiSwapBtn,
  ChosenMultiSwapSendReceiveTokenValueInput,
  ChosenTokenLabel,
  ColumnMainSubTitles,
  ColumnMainTitles,
  DownDelimiterLabelsBlock,
  ExceededAmountTokensLimitWarning,
  ExchangerBestRateSpan,
  ExchangerElementListItem,
  ExchangerElementSpan,
  ExchangerIcon,
  ExchangerMainList,
  ExchangersLayout,
  ExchangersLayoutTitlesBlock,
  ExchangersMainListLayout,
  ExchangersMainSubLayout,
  FirstSubLayoutMultiSwapReceiveTokensBlock,
  GreenDotIcon,
  LabelsBlockImportantSpan,
  LabelsBlockSubBlock,
  LabelsBlockSubBlockSpan,
  MultiSwapChooseBtnTokenBlock,
  MultiSwapReceiveTokensBlock,
  MultiSwapSendTokensChooseBlock,
  MultiSwapSendValueLabel,
  MultiSwapSendValueLabelsLayout,
  MultiSwapTokenAvatar,
  NewMultiSwapButton,
  OfferedByLayoutLabelBlock,
  SaveSelectedExchangerButton,
  SearchTokensModalTextField,
  SecondColumnSwapSubBlock,
  SecondColumnTitleBlock,
  SecondColumnTitleHeaderBlock,
  SecondSubLayoutMultiSwapReceiveTokensBlock,
  SendBlockLabels,
  SendReceiveSubBlock,
  SendTokenBalance,
  SendTokenConvertedMeasures,
  SendTokenImg,
  SendTokenLabelsBlock,
  SendTokenModalListItem,
  SendTokenName,
  SendTokensModalList,
  SubLayoutReceiveTokensBlock,
  SwapBlockDelimiter,
  SwapBlockExchangeLayout,
  SwapTokensMainSubBlock,
  SwapTokensOfferedBySubBlock,
  SwitchTokensBtn,
  TokensModalSubLayout,
  USDCurrencyInputBlock,
  USDCurrencySendInputBlock,
} from './styled';
import chevronDownBlack from '../../assets/icons/chevronDownLightTheme.svg';
import chevronDownLight from '../../assets/icons/chevronDownLight.svg';
import switchTokensLight from '../../assets/icons/switchTokensLight.svg';
import switchTokensDark from '../../assets/icons/switchTokensDark.svg';

import plusIconDark from '../../assets/icons/plusIconDark.svg';
import plusIconLight from '../../assets/icons/plusIconLight.svg';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import actionTypes from '../../constants/actionTypes';
import Popover from '@mui/material/Popover';
import greenDot from '../../assets/icons/greenDot.svg';
import paraSwapIcon from '../../assets/icons/exchangers/paraSwapExchangerIcon.svg';

// import exchangersOfferedList from './exchangersOfferedListPolygon.js';
// import sendTokensMockList from './sendTokensMockList.json';
import SelectTokensModalContainer from './selectTokensModal';
import OutsideClickHandler from './outsideClickHandler';
import { CloseButton, Header, ModalTitle } from './selectTokensModal/styles';
import closeModalIcon from '../../assets/icons/close_nft.svg';
import closeModalIconDark from '../../assets/icons/closenftdark.svg';
import searchTokensImportModalDark from '../../assets/icons/searchTokensInputModalDark.svg';
import searchTokensImportModalLight from '../../assets/icons/searchTokensButtonMobileLight.svg';
import Avatar from 'react-avatar';
import {
  checkIfExchangedTokenLimitIsExceeded,
  convertSendTokenToUSDCurrencyHelper,
  filteredTokensByName,
  getTokenUSDAmount,
  initFilteringModalTokensListMultiSwap,
} from './helpers';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import multiCallAbi from '../../abi/MultiCall.json';
import TOKENDECIMALSABI from '../../abi/TokenDecomals.json';
import ROUTERABI from '../../abi/UniRouterV2.json';
import { send } from 'eth-permit/dist/rpc';
import uniswapV2ExchangerIcon from '../../assets/icons/exchangers/uniswapV2ExchangerIcon.svg';
import sushiSwapExchangerIcon from '../../assets/icons/exchangers/sushiSwapExchangerIcon.svg';
import swerveExchangerIcon from '../../assets/icons/exchangers/swerveExchangerIcon.png';

const useStyles = makeStyles((theme) => ({
  noBorder: {
    border: 'none !important',
  },
}));

export default function MultiSwapComponent() {
  const dispatch = useDispatch();
  const classes = useStyles();
  let [tokensListModal, setTokensListModal] = useState([]);
  let [oldTokenSwappedAddress, setOldTokenSwappedAddress] = useState();
  let [isSendTokenSelectedSwapped, setIsSendTokenSelectedSwapped] = useState(false);
  const [openTokensModal, setOpenTokensModal] = useState(false);
  const [isTokensLimitExceeded, setIsTokensLimitExceeded] = useState(false);
  let [isAddedReceiveTokensLimitExceeded, setIsAddedReceiveTokensLimitExceeded] = useState(false);
  const [isAbleToReplaceTokens, setIsAbleToReplaceTokens] = useState(false);
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
      name: 'Swerve',
      routerAddress: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
      receiveTokenUSDCurrencyCourse: '3510 DAI ($3510.03)',
      gasFee: '$10.03',
      isBestRate: false,
      logoIcon: swerveExchangerIcon,
      isExchangerSelected: false,
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
  ]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [chosenNewExchangerToken, setChosenNewExchangerToken] = useState({});

  let textInput = useRef(null);

  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);

  const isLoadingSendTokensList = useSelector(
    (state) => state.tokensListReducer.isSendMultiSwapTokensListLoading
  );
  const isLoadingReceiveTokensList = useSelector(
    (state) => state.tokensListReducer.isReceiveMultiSwapTokensListLoading
  );

  const initSendMultiSwapTokenList = useSelector(
    (state) => state.tokensListReducer.initSendTokenMultiSwap
  );
  const initReceiveMultiSwapTokensList = useSelector(
    (state) => state.tokensListReducer.initReceiveMultiSwapTokensList
  );

  console.log('receive USD multi init state SendTokenSwap 12345', initSendMultiSwapTokenList);
  console.log(
    ' receive USD multi init state ReceiveMultiSwapTokensList 12345',
    initReceiveMultiSwapTokensList
  );

  //popover open/close

  let [chosenExchangerTokensList, setChosenExchangerTokensList] = useState([]);

  const openExchangersModal = (event, tokensList, chosenToken) => {
    console.log('openExchangersModal chosenReceiveToken', chosenToken);
    setChosenExchangerTokensList(tokensList);
    setChosenNewExchangerToken(chosenToken);
    setAnchorEl(event.currentTarget);
  };

  const closeExchangersModal = () => {
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
    return new Web3(window.ethereum);
  }

  let convertSendTokenToUSDCurrency = async (amount, tokenData) => {
    let formattedAmount = amount.replace(/[^\d.-]/g, '').replace(/[^\w.]|_/g, '');

    console.log('res amount tokenData send amount', amount);
    // console.log('res amount send formattedAmount', formattedAmount);
    // console.log('res amount send formattedAmount typeof', typeof formattedAmount);

    await getTokenUSDAmount({ amount: formattedAmount, tokenData }).then((res) => {
      // console.log('res amount send middle', res);

      let sendTokensListCopy = [...initSendMultiSwapTokenList];
      const needIndex = sendTokensListCopy.findIndex(
        (token) => token.address === tokenData.address
      );
      if (needIndex !== -1) {
        sendTokensListCopy[needIndex].USDCurrency = res.USDCurrency;
        sendTokensListCopy[needIndex].amount = formattedAmount;
      }

      // console.log('res amount send list total', sendTokensListCopy);
      dispatch({
        type: actionTypes.SET_INIT_SEND_MULTISWAP_TOKENS_LIST,
        payload: sendTokensListCopy,
      });
    });
  };

  let convertReceiveTokenToUSDCurrency = async (amount, tokenData) => {
    let formattedAmount = amount.replace(/[^\d.-]/g, '').replace(/[^\w.]|_/g, '');

    console.log('res amount tokenData receive', tokenData);
    console.log('res amount formattedAmount', formattedAmount);
    console.log('res amount formattedAmount typeof', typeof formattedAmount);

    await getTokenUSDAmount({ amount: formattedAmount, tokenData }).then((res) => {
      console.log('res amount middle', res);

      // console.log('res amount formatted', formattedAmount);

      let receiveTokensListCopy = [...initReceiveMultiSwapTokensList];
      const needIndex = receiveTokensListCopy.findIndex(
        (token) => token.address === tokenData.address
      );
      if (needIndex !== -1) {
        receiveTokensListCopy[needIndex].USDCurrency = res.USDCurrency;
        receiveTokensListCopy[needIndex].amount = formattedAmount;
      }

      console.log('res amount total', receiveTokensListCopy[needIndex]);
      dispatch({
        type: actionTypes.SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST,
        payload: receiveTokensListCopy,
      });
    });
    // await getAmountMulti();
  };

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
    console.log('exchange data initSendMultiSwapTokenList', initSendMultiSwapTokenList);
    console.log('exchange data initReceiveMultiSwapTokensList', initReceiveMultiSwapTokensList);
  };

  const openModalHelper = (payload) => {
    setTokensListModal([]);
    setOpenTokensModal(true);
    let removedInitTokensList = initFilteringModalTokensListMultiSwap(payload.tokensList, [
      ...initSendMultiSwapTokenList,
      ...initReceiveMultiSwapTokensList,
    ]);
    setTokensListModal(removedInitTokensList);
    setIsSendTokenSelectedSwapped(payload.isSendModalOpen);
  };

  const searchTokensHandler = (event, isSendTokenSelectedSwapped, searchTokensData) => {
    let removedInitTokenValuesList = initFilteringModalTokensListMultiSwap(searchTokensData, [
      ...initSendMultiSwapTokenList,
      ...initReceiveMultiSwapTokensList,
    ]);
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

    let sendTokenAddress = initSendMultiSwapTokenList[0].address;

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
    if (isSendTokenSelectedSwapped === true) {
      console.log('send selectedSwapToken', selectedSwapToken);

      let sendTokensListCopy = [...initSendMultiSwapTokenList];

      const needIndex = sendTokensListCopy.findIndex(
        (token) => token.address === oldTokenSwappedAddress
      );

      // console.log('send selectedSwapToken needIndex', needIndex);

      if (needIndex !== -1) {
        sendTokensListCopy[needIndex] = {
          ...selectedSwapToken,
          receiveTokensListItem: false,
          USDCurrency: 0,
          amount: 0,
        };
      }

      // console.log('send selectedSwapToken sendTokensListCopy total', sendTokensListCopy);

      dispatch({
        type: actionTypes.SET_INIT_SEND_MULTISWAP_TOKENS_LIST,
        payload: sendTokensListCopy,
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
          USDCurrency: 0,
          amount: 0,
        };
      }

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

  console.log('finalSendTokensList multiswap init saga list', finalSendTokensList);
  console.log('finalReceiveTokensList multiswap init saga list', finalReceiveTokensList);
  console.log(
    'finalReceiveTokensList initReceiveMultiSwapTokensList multiswap',
    initReceiveMultiSwapTokensList
  );

  const addReceiveTokensHandler = (fullTokensList) => {
    dispatch({
      type: actionTypes.SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST_LOADING,
      payload: true,
    });

    let removedInitTokenValuesList = initFilteringModalTokensListMultiSwap(fullTokensList, [
      ...initSendMultiSwapTokenList,
      ...initReceiveMultiSwapTokensList,
    ]);

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

  const toggleSwappedTokens = () => {
    // [...initReceiveMultiSwapTokensList];
    let sendTokensListCopy = initSendMultiSwapTokenList.map((obj) => {
      return { ...obj, amount: 0, USDCurrency: 0 };
      // return obj;
    });
    let receiveTokensListCopy = initReceiveMultiSwapTokensList.map((obj) => {
      if (Number(obj.amount) > 0) {
        return { ...obj, amount: 0, USDCurrency: 0 };
      }
      return obj;
    });

    console.log('sendTokensListCopy toggle', sendTokensListCopy);
    console.log('result toggle test receiveTokensListCopy toggle', receiveTokensListCopy);

    let totalReceiveTokensArr = [];
    finalSendTokensList
      .filter((sendToken) =>
        receiveTokensListCopy.some((receiveToken) => {
          return sendToken.address === receiveToken.address;
        })
      )
      .map((el1) =>
        receiveTokensListCopy.map((el2) => {
          if (el1.address === el2.address) {
            // console.log('total toggle test', { ...el2, balance: el1.balance });
            totalReceiveTokensArr.push({ ...el2, balance: el1.balance });
          }
        })
      );

    console.log('result toggle total', totalReceiveTokensArr);

    dispatch({
      type: actionTypes.SET_INIT_SEND_MULTISWAP_TOKENS_LIST,
      payload: totalReceiveTokensArr,
    });
    dispatch({
      type: actionTypes.SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST,
      payload: sendTokensListCopy,
    });
  };

  useEffect(() => {
    if (initSendMultiSwapTokenList[0] !== undefined && initSendMultiSwapTokenList.length !== 0) {
      //functionality to add best exchanger to final send/receive tokens lists - should be done in sagas
      let bestRateExchanger = exchangersOfferedList.find((el) => {
        return el.isBestRate === true;
      });

      console.log('bestRateExchanger', bestRateExchanger);

      let test1 = initSendMultiSwapTokenList.map((sendToken) => {
        return { ...sendToken, chosenExchanger: bestRateExchanger };
      });

      let test2 = initReceiveMultiSwapTokensList.map((receiveToken) => {
        return { ...receiveToken, chosenExchanger: bestRateExchanger };
      });

      console.log('bestRateExchanger test1', test1);
      console.log('bestRateExchanger test2', test2);

      ///-------------

      let ifSendTokenAvailableForSwap = finalReceiveTokensList.some((el) => {
        if (el.address === initSendMultiSwapTokenList[0].address) {
          return true;
        }
      });

      let availableNumOfReceiveTokensToSwap = finalSendTokensList
        .map((x) =>
          initReceiveMultiSwapTokensList.some((y) => {
            if (y.address === x.address) return true;
          })
        )
        .filter((value) => value === true).length;

      if (
        availableNumOfReceiveTokensToSwap === initReceiveMultiSwapTokensList.length &&
        ifSendTokenAvailableForSwap === true
      ) {
        setIsAbleToReplaceTokens(true);
      } else {
        setIsAbleToReplaceTokens(false);
      }
    }
  }, [initSendMultiSwapTokenList, initReceiveMultiSwapTokensList]);

  const selectNewExchanger = (
    selectedNewExchanger,
    chosenExchangerTokensList,
    chosenNewExchangerToken
  ) => {
    // console.log('tokenWithChosenExchanger multiswap selectedNewExchanger', selectedNewExchanger);
    const tokenWithChosenExchanger = {
      ...chosenNewExchangerToken,
      chosenExchanger: { ...selectedNewExchanger, isExchangerSelected: true },
    };
    // console.log('tokenWithChosenExchanger multiswap', tokenWithChosenExchanger);

    let formattedReceiveTokensList = chosenExchangerTokensList.map((token) => {
      if (token.address === tokenWithChosenExchanger.address) {
        return {
          ...token,
          chosenExchanger: { ...selectedNewExchanger, isExchangerSelected: true },
        };
      }
      return {
        ...token,
        chosenExchanger: { ...token.chosenExchanger, isExchangerSelected: false },
      };
    });

    console.log('tokenWithChosenExchanger multiswap test1', formattedReceiveTokensList);

    dispatch({
      type: actionTypes.SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST,
      payload: formattedReceiveTokensList,
    });

    setChosenExchangerTokensList([]);
    setChosenNewExchangerToken({});
    setAnchorEl(false);
  };

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
      {isLoadingSendTokensList === false && isLoadingReceiveTokensList === false ? (
        <SwapTokensMainSubBlock
          isLightTheme={isLightTheme}
          style={{ marginTop: '0', height: 'auto' }}>
          {/*Choose send tokens block*/}
          <SendReceiveSubBlock>
            <SendBlockLabels isLightTheme={isLightTheme} style={{ margin: '32px 20px 0px 20px' }}>
              <span>Send</span>
            </SendBlockLabels>

            {/* SEND block */}
            {initSendMultiSwapTokenList.map((sendToken, key) => (
              <MultiSwapSendTokensChooseBlock isLightTheme={isLightTheme}>
                <MultiSwapChooseBtnTokenBlock>
                  <div
                    onClick={() => {
                      setOldTokenSwappedAddress(sendToken.address);
                      openModalHelper({ tokensList: finalSendTokensList, isSendModalOpen: true });
                    }}>
                    {sendToken.logoURI !== null ? (
                      <SendTokenImg
                        alt="token_img"
                        src={sendToken.logoURI}
                        style={{ marginLeft: '0px' }}
                      />
                    ) : (
                      <MultiSwapTokenAvatar
                        name={sendToken.avatarIcon}
                        round={true}
                        size="21"
                        textSizeRatio={1}
                      />
                    )}
                    <ChosenTokenLabel isLightTheme={isLightTheme}>
                      {sendToken.symbol === 'ethereum' ? 'ETH' : sendToken.symbol}
                    </ChosenTokenLabel>
                    <img
                      src={isLightTheme ? chevronDownBlack : chevronDownLight}
                      alt="chevron_icon"
                    />
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
                            color: isTokensLimitExceeded ? 'red' : isLightTheme ? 'black' : 'white',
                          },
                        },
                        classes: { notchedOutline: classes.noBorder },
                      }}
                      isLightTheme={isLightTheme}
                      placeholder="0.0"
                      value={sendToken.amount}
                      onChange={(e) => {
                        convertSendTokenToUSDCurrency(e.target.value, {
                          ...sendToken,
                        });

                        const isLimitExceeded = checkIfExchangedTokenLimitIsExceeded(
                          e.target.value,
                          sendToken.balance
                        );
                        setIsTokensLimitExceeded(isLimitExceeded);
                      }}
                    />
                  </USDCurrencySendInputBlock>
                </MultiSwapChooseBtnTokenBlock>

                <MultiSwapSendValueLabelsLayout
                // style={{ backgroundColor: 'red' }}
                >
                  <MultiSwapSendValueLabel
                    isLightTheme={isLightTheme}
                    style={{ marginLeft: '30px' }}>
                    {sendToken.balance} {sendToken.symbol}
                  </MultiSwapSendValueLabel>

                  <MultiSwapSendValueLabel
                    isLightTheme={isLightTheme}
                    style={{ marginLeft: 'auto' }}>
                    {sendToken.USDCurrency < 0 ? (
                      <>Price not available</>
                    ) : (
                      <>${sendToken.USDCurrency}</>
                    )}
                  </MultiSwapSendValueLabel>
                </MultiSwapSendValueLabelsLayout>
              </MultiSwapSendTokensChooseBlock>
            ))}

            {isTokensLimitExceeded && (
              <ExceededAmountTokensLimitWarning style={{ marginRight: '30px', marginTop: '-10px' }}>
                Insufficient funds
              </ExceededAmountTokensLimitWarning>
            )}

            {isAbleToReplaceTokens ? (
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
          {/* mapped received block */}

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
                          {receiveToken.USDCurrency < 0 ? (
                            <>Price not available</>
                          ) : (
                            <>${receiveToken.USDCurrency}</>
                          )}
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

                      {receiveToken.singleAmountSendTokenConvert !== 0 &&
                      initSendMultiSwapTokenList[0].symbol !== undefined ? (
                        <LabelsBlockSubBlockSpan isLightTheme={isLightTheme}>
                          1 {initSendMultiSwapTokenList[0].symbol} ={' '}
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
                        <img src={receiveToken.chosenExchanger.logoIcon} alt="paraSwapIcon" />
                        <span
                          onClick={(event) =>
                            openExchangersModal(event, initReceiveMultiSwapTokensList, receiveToken)
                          }>
                          {receiveToken.chosenExchanger.name}
                        </span>
                        {/* Offered by popover*/}
                        <Popover
                          open={open}
                          anchorEl={anchorEl}
                          chosenNewExchangerToken={chosenNewExchangerToken}
                          chosenExchangerTokensList={chosenExchangerTokensList}
                          onClose={closeExchangersModal}
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
                                onClick={closeExchangersModal}>
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
                                          selectNewExchanger(
                                            exchanger,
                                            chosenExchangerTokensList,
                                            chosenNewExchangerToken
                                          )
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
                      <ModalTitle isLightTheme={isLightTheme}>Select token</ModalTitle>
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
                          ? searchTokensHandler(
                              event,
                              isSendTokenSelectedSwapped,
                              finalSendTokensList
                            )
                          : searchTokensHandler(
                              event,
                              isSendTokenSelectedSwapped,
                              finalReceiveTokensList
                            );
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
                                {isSendTokenSelectedSwapped ? (
                                  <SendTokenConvertedMeasures isLightTheme={isLightTheme}>
                                    {`${object.balance} ${object.symbol} · 
                                    $ ${
                                      Math.round(object.singleTokenUSDCurrencyAmount * 100000) /
                                      100000
                                    } 
                                    `}
                                  </SendTokenConvertedMeasures>
                                ) : (
                                  <SendTokenConvertedMeasures
                                    isLightTheme={isLightTheme}
                                    style={{ visibility: 'hidden' }}>
                                    409,333 UNI · $19,18
                                  </SendTokenConvertedMeasures>
                                )}
                              </div>
                            </SendTokenLabelsBlock>
                            <SendTokenBalance isLightTheme={isLightTheme}>
                              {object.balance !== undefined && isSendTokenSelectedSwapped === true && (
                                // <Loader type="Rings" color="#BB86FC" height={30} width={30} />
                                <span>
                                  {`$${
                                    Math.round(
                                      object.balance * object.singleTokenUSDCurrencyAmount * 100000
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

            {isAddedReceiveTokensLimitExceeded === false && (
              <AddReceiveTokenMultiSwapBtn
                style={{ marginTop: '20px' }}
                isLightTheme={isLightTheme}
                onClick={() => {
                  addReceiveTokensHandler(finalReceiveTokensList);
                }}>
                <img
                  src={isLightTheme ? plusIconDark : plusIconLight}
                  alt="add_receive_multiswap_token"
                />
              </AddReceiveTokenMultiSwapBtn>
            )}
          </>

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
                isTokensLimitExceeded
                // ||
                // false ||
                // sendTokenForExchangeAmount === '0' ||
                // sendTokenForExchangeAmount === 0 ||
                // sendTokenForExchangeAmount?.length === 0
              }>
              Exchange
            </Button>
          </SwapBlockExchangeLayout>
        </SwapTokensMainSubBlock>
      ) : (
        <span style={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>
          Loading...
        </span>
      )}
    </SecondColumnSwapSubBlock>
  );
}
