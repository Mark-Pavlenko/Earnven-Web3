import React, { useEffect, useState } from 'react';
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
import { convertSendTokenToUSDCurrencyHelper, filteredTokensByName } from './helpers';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import Web3 from 'web3';
import multiCallAbi from '../../abi/MultiCall.json';

const useStyles = makeStyles((theme) => ({
  noBorder: {
    border: 'none !important',
  },
}));

export default function MultiSwapComponent() {
  const { address } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [tokenSendUSDCurrency, setTokenSendUSDCurrency] = useState('$0.00');
  let [tokensListModal, setTokensListModal] = useState([]);
  const [sendTokenForExchangeAmount, setSendTokenForExchangeAmount] = useState();
  let [oldTokenSwappedAddress, setOldTokenSwappedAddress] = useState();
  let [isSendTokenSelectedSwapped, setIsSendTokenSelectedSwapped] = useState(false);
  const [openTokensModal, setOpenTokensModal] = useState(false);

  // Polygon
  const [sendTokenForExchange, setSendTokenForExchange] = useState({
    symbol: 'ETH',
    logoURI: EthIcon,
    avatarIcon: 'Ethereum',
    name: 'Ethereum',
    id: 'ethereum',
    sendTokensListItem: true,
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  });
  const initReceiveTokensList = [
    {
      symbol: 'WETH',
      logoURI: 'https://assets.coingecko.com/coins/images/2518/thumb/weth.png?1628852295',
      avatarIcon: 'Weth',
      name: 'Wrapped Ether',
      id: 'weth',
      receiveTokensListItem: true,
      address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    },
    {
      symbol: 'USDC',
      logoURI: 'https://assets.coingecko.com/coins/images/9956/thumb/4943.png?1636636734',
      avatarIcon: 'Usdc Stablecoin',
      name: 'Dai Stablecoin',
      id: 'usdc',
      receiveTokensListItem: true,
      address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    },
  ];

  const [receiveTokensList, setReceiveTokensList] = useState(initReceiveTokensList);

  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);

  const initSendMultiSwapToken = useSelector(
    (state) => state.tokensListReducer.initSendTokenMultiSwap
  );
  const initReceiveMultiSwapTokensList = useSelector(
    (state) => state.tokensListReducer.initReceiveMultiSwapTokensList
  );

  console.log('multi init state SendTokenSwap', initSendMultiSwapToken);
  console.log('multi init state ReceiveMultiSwapTokensList', initReceiveMultiSwapTokensList);

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

  const finalReceiveTokensList = sendTokensMockList;

  const [filteredSendTokensListData, setFilteredSendTokensListData] = useState([]);
  const [filteredReceiveTokensListData, setFilteredReceiveTokensListData] = useState([]);

  useEffect(() => {
    finalSendTokensList.length !== 0 && setFilteredSendTokensListData(finalSendTokensList);
    finalReceiveTokensList.length !== 0 && setFilteredReceiveTokensListData(finalReceiveTokensList);
  }, [finalSendTokensList, finalReceiveTokensList]);

  console.log('state receiveTokenForExchange array multiswap 123', receiveTokensList);
  console.log('state setSendTokenForExchangeAmount multiswap', sendTokenForExchangeAmount);

  async function getWeb3() {
    // const provider = active ? await connector.getProvider() : ethers.getDefaultProvider();
    const web3 = await new Web3(window.ethereum);
    return web3;
  }

  let exchange = async () => {
    console.log(11111, '11111');
  };

  let convertSendTokenToUSDCurrency = (tokenData) => {
    let convertedToUSDValue = convertSendTokenToUSDCurrencyHelper(tokenData);
    // console.log('multiswap convertedToUSDValue', convertedToUSDValue);
    setTokenSendUSDCurrency(convertedToUSDValue);
  };

  let convertReceiveTokenToUSDCurrency = async (tokenData) => {
    // console.log('receive USD tokenData multiswap', tokenData);

    if (tokenData.amount === '' || typeof tokenData.amount === 'symbol') {
      tokenData.amount = '0';
    }

    let tokenUSDCurrencyValue;
    let finalUSDCurrencyValue;

    if (
      tokenData.receiveTokensListItem === true &&
      tokenData.address !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' &&
      tokenData.USDCurrency === undefined
    ) {
      tokenUSDCurrencyValue = await axios.get(
        `https://api.ethplorer.io/getTokenInfo/${tokenData.address}?apiKey=EK-qSPda-W9rX7yJ-UY93y`
      );

      if (tokenUSDCurrencyValue.data.price.rate !== undefined) {
        finalUSDCurrencyValue = `$ ${(
          tokenUSDCurrencyValue.data.price.rate * parseInt(tokenData.amount)
        ).toFixed(2)}`;
      } else {
        console.log('Price not available');
      }
    } else if (
      tokenData.address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' &&
      tokenData.receiveTokensListItem === true
    ) {
      const ethDollarValue = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
      );
      finalUSDCurrencyValue = `$${(
        ethDollarValue.data.ethereum.usd * parseInt(tokenData.amount)
      ).toFixed(2)}`;
    }

    console.log('multiswap receive USD finalUSDCurrencyValue', finalUSDCurrencyValue);

    // found necessary index of element, which currency is updated
    const needIndex = receiveTokensList.findIndex((token) => token.address === tokenData.address);

    console.log('multiswap receive USD index', needIndex);

    // && needIndex === tokenData.receiveTokenIndex

    if (needIndex !== -1) {
      receiveTokensList[tokenData.receiveTokenIndex] = {
        ...receiveTokensList.filter((token) => token.address === tokenData.address)[0],
        USDCurrency: finalUSDCurrencyValue,
        amount: parseInt(tokenData.amount),
      };
    }

    let temp_state = [...receiveTokensList];

    let temp_element = { ...temp_state[needIndex] };

    temp_element.USDCurrency = finalUSDCurrencyValue;

    temp_state[needIndex] = temp_element;

    setReceiveTokensList(temp_state);

    await getAmountMulti();
  };

  const openModalHelper = (payload) => {
    setOpenTokensModal(true);
    console.log('tokensList multiswap payload', payload);
    setTokensListModal(payload.tokensList);
    setIsSendTokenSelectedSwapped(payload.isSendModalOpen);
  };

  const searchTokensHandler = (event, searchTokensData) => {
    console.log('event multiswap', event);
    const result = filteredTokensByName(event, searchTokensData);
    console.log('result multiswap', result);
    setTokensListModal(result);
  };

  // console.log('useState tokensListModal multiswap', tokensListModal);
  // console.log('useState isSendTokenSelectedSwappedTokenType', isSendTokenSelectedSwapped);

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

    console.log('multiswap receiveTokensList', receiveTokensList);

    for (let i = 0; i < receiveTokensList.length; i++) {
      const item = receiveTokensList[i];
      console.log('multiswap item111111111', item);
      if (item.amount && item.amount > 0) {
        // const decimals = web3.utils.toBN(item.decimals);
        const amount = item.amount * 10 ** item.decimals;
        console.log('multiswap amount', amount.toString());
        receiveTokensList[i].swap = await multiCallContract.methods
          .getAmountsIn(routers, sendTokenAddress, item.address, amount.toString())
          .call();
      }
    }

    console.log(receiveTokensList, 'multiswap receiveTokensList111111111111');
    return true;
  };

  const selectTokenForSwap = async (selectedSwapToken, isSendTokenSelectedSwapped) => {
    console.log('multiswap selectedSwapToken multiswap 123', selectedSwapToken);
    console.log('multiswap objIDAddress multiswap 123', oldTokenSwappedAddress);
    console.log('multiswap isSendTokenSelectedSwapped multiswap 123', isSendTokenSelectedSwapped);
    await getAmountMulti(selectedSwapToken, isSendTokenSelectedSwapped);

    if (isSendTokenSelectedSwapped === true) {
      dispatch({
        type: actionTypes.SET_INIT_SEND_MULTISWAP_TOKEN,
        payload: selectedSwapToken,
      });

      setSendTokenForExchangeAmount(1);
      convertSendTokenToUSDCurrency({
        amount: 1,
        ...selectedSwapToken,
        address: selectedSwapToken.address,
      });
    } else {
      console.log('multiswap 123 typeof', typeof oldTokenSwappedAddress);

      const needIndex = receiveTokensList.findIndex(
        (token) => token.address === oldTokenSwappedAddress
      );

      console.log('need index receive multiswap 123', needIndex);
      console.log('obj multiswap 123', { ...selectedSwapToken, receiveTokensListItem: true });
      console.log('multiswap 123 need elem', receiveTokensList[needIndex]);

      receiveTokensList[needIndex] = {
        ...selectedSwapToken,
        receiveTokensListItem: true,
      };

      // setReceiveTokenForExchangeAmount(1)

      // if (needIndex !== -1) {
      //   receiveTokensList[needIndex] = {
      //     ...receiveTokensList.filter((token) => token.address === tokenData.address)[0],
      //     USDCurrency: finalUSDCurrencyValue,
      //   };
      // }
    }
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
      <SwapTokensMainSubBlock
        isLightTheme={isLightTheme}
        style={{ marginTop: '0', height: '600px' }}>
        {/*Choose send tokens block*/}
        <SendReceiveSubBlock>
          <MultiSwapSendTokensChooseBlock isLightTheme={isLightTheme}>
            {/* SEND block */}
            <MultiSwapChooseBtnTokenBlock
              onClick={() =>
                openModalHelper({ tokensList: finalSendTokensList, isSendModalOpen: true })
              }>
              <div>
                {initSendMultiSwapToken.logoURI !== null ? (
                  <SendTokenImg
                    alt="token_img"
                    src={initSendMultiSwapToken.logoURI}
                    style={{ marginLeft: '4px' }}
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
              <div>
                <MultiSwapSendValueLabel isLightTheme={isLightTheme}>
                  3510,03 BTC
                </MultiSwapSendValueLabel>
              </div>
            </MultiSwapChooseBtnTokenBlock>

            <USDCurrencyInputBlock>
              <ChosenMultiSwapSendReceiveTokenValueInput
                // disabled={true}
                InputProps={{
                  inputProps: {
                    style: {
                      marginTop: '4px',
                      textAlign: 'right',
                      padding: 0,
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
                    ...initSendMultiSwapToken,
                  });
                }}
              />
              <div style={{ display: 'flex', marginRight: '20px' }}>
                <MultiSwapSendValueLabel isLightTheme={isLightTheme} style={{ marginLeft: 'auto' }}>
                  {tokenSendUSDCurrency}
                </MultiSwapSendValueLabel>
              </div>
            </USDCurrencyInputBlock>
          </MultiSwapSendTokensChooseBlock>

          <SwitchTokensBtn
            src={isLightTheme ? switchTokensLight : switchTokensDark}
            alt="switch_tokens_btn"
          />
        </SendReceiveSubBlock>

        {/* mapped received block */}
        {receiveTokensList.map((receiveToken) => (
          <MultiSwapReceiveTokensBlock isLightTheme={isLightTheme}>
            <FirstSubLayoutMultiSwapReceiveTokensBlock>
              <MultiSwapChooseBtnTokenBlock
                onClick={() => {
                  setOldTokenSwappedAddress(receiveToken.address);
                  openModalHelper({ tokensList: finalReceiveTokensList, isSendModalOpen: false });
                }}>
                <div>
                  {receiveToken.logoURI !== null ? (
                    <SendTokenImg
                      alt="token_img"
                      src={receiveToken.logoURI}
                      style={{ marginLeft: '4px' }}
                    />
                  ) : (
                    <MultiSwapTokenAvatar
                      name={receiveToken.avatarIcon}
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
                <div>
                  <MultiSwapSendValueLabel isLightTheme={isLightTheme}>
                    3510,03 BTC
                  </MultiSwapSendValueLabel>
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
                        width: '100px',
                        fontWeight: 600,
                        color: isLightTheme ? 'black' : 'white',
                      },
                    },
                    classes: { notchedOutline: classes.noBorder },
                  }}
                  isLightTheme={isLightTheme}
                  placeholder="0.0"
                  // value={receiveTokensList.amount}
                  onChange={(e) => {
                    // setSendTokenForExchangeAmount(e.target.value);
                    convertReceiveTokenToUSDCurrency({
                      amount: e.target.value,
                      receiveTokenIndex: receiveTokensList.indexOf(receiveToken),
                      address: receiveToken.address,
                      receiveTokensListItem: receiveToken.receiveTokensListItem,
                    });
                  }}
                />

                <div style={{ display: 'flex', marginRight: '20px' }}>
                  <MultiSwapSendValueLabel
                    isLightTheme={isLightTheme}
                    style={{ marginLeft: 'auto' }}>
                    {receiveToken.USDCurrency !== undefined ? receiveToken.USDCurrency : '$0.00'}
                  </MultiSwapSendValueLabel>
                </div>
              </USDCurrencyInputBlock>
            </FirstSubLayoutMultiSwapReceiveTokensBlock>
            <SecondSubLayoutMultiSwapReceiveTokensBlock>
              <LabelsBlockSubBlock isLightTheme={isLightTheme} style={{ marginBottom: '3px' }}>
                <LabelsBlockSubBlockSpan isLightTheme={isLightTheme}>
                  Exchange rate
                </LabelsBlockSubBlockSpan>
                <LabelsBlockSubBlockSpan isLightTheme={isLightTheme}>
                  1 ETH = 0,82 DAI
                </LabelsBlockSubBlockSpan>
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
                    </SwapTokensOfferedBySubBlock>
                  </Popover>
                </AdditionalOptionsSwapTokensSubBlock>
              </LabelsBlockSubBlock>
            </SecondSubLayoutMultiSwapReceiveTokensBlock>
          </MultiSwapReceiveTokensBlock>
        ))}

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
                    searchTokensHandler(event, {
                      tokensList: tokensListModal,
                    });
                  }}
                  InputProps={{
                    endAdornment: (
                      <img
                        src={
                          isLightTheme ? searchTokensImportModalDark : searchTokensImportModalLight
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
                        key={object.id}
                        onClick={() => {
                          setOpenTokensModal(false);
                          selectTokenForSwap(object, isSendTokenSelectedSwapped);
                        }}
                        // onClick={() => {
                        //   setOpenTokensModal(false);
                        //   setFilteredData(finalSendTokensList);
                        //   selectSendTokenForExchange({
                        //     ...object,
                        //     sendTokensListItem: true,
                        //   });
                        //   convertSendTokenToUSDCurrency({
                        //     amount: 1,
                        //     sendTokensListItem: true,
                        //     ...object,
                        //     address: object.address,
                        //   });
                        // }}
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
                            <SendTokenName isLightTheme={isLightTheme}>{object.name}</SendTokenName>
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

        <AddReceiveTokenMultiSwapBtn isLightTheme={isLightTheme}>
          <img
            src={isLightTheme ? plusIconDark : plusIconLight}
            alt="add_receive_multiswap_token"
          />
        </AddReceiveTokenMultiSwapBtn>

        <SwapBlockDelimiter isLightTheme={isLightTheme} style={{ marginTop: '10px' }} />
        {/* Labels block*/}
        <DownDelimiterLabelsBlock isLightTheme={isLightTheme} style={{ marginTop: '20px' }}>
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
          <Button onClick={() => exchange()}>Exchange</Button>
        </SwapBlockExchangeLayout>
      </SwapTokensMainSubBlock>
    </SecondColumnSwapSubBlock>
  );
}
