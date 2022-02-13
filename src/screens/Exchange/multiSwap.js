import React, { useState } from 'react';
import {
  AdditionalOptionsSwapTokensSubBlock,
  AddReceiveTokenMultiSwapBtn,
  ChosenMultiSwapSendReceiveTokenValueInput,
  ChosenSendReceiveTokenValueInput,
  ChosenTokenLabel,
  ColumnMainSubTitles,
  ColumnMainTitles,
  DownDelimiterLabelsBlock,
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
  SecondColumnSwapSubBlock,
  SecondColumnTitleBlock,
  SecondColumnTitleHeaderBlock,
  SecondSubLayoutMultiSwapReceiveTokensBlock,
  SendReceiveSubBlock,
  SendTokenImg,
  SwapBlockDelimiter,
  SwapBlockExchangeLayout,
  SwapTokensMainSubBlock,
  SwitchTokensBtn,
  USDCurrencyInputBlock,
} from './styled';
import EthIcon from '../../assets/icons/ethereum.svg';
import chevronDownBlack from '../../assets/icons/chevronDownLightTheme.svg';
import chevronDownLight from '../../assets/icons/chevronDownLight.svg';
import switchTokensLight from '../../assets/icons/switchTokensLight.svg';
import switchTokensDark from '../../assets/icons/switchTokensDark.svg';
import paraSwapIcon from '../../assets/icons/paraSwapIcon.svg';
import uniIcon from '../../assets/icons/uniIcon.svg';
import plusIconDark from '../../assets/icons/plusIconDark.svg';
import plusIconLight from '../../assets/icons/plusIconLight.svg';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import daiICon from '../../assets/icons/daiIcon.svg';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  noBorder: {
    border: 'none !important',
  },
}));

export default function MultiSwapComponent() {
  const [sendTokenForExchange, setSendTokenForExchange] = useState({
    symbol: 'ETH',
    logoURI: EthIcon,
    avatarIcon: 'Ethereum',
    name: 'Ethereum',
    id: 'ethereum',
    sendTokensListItem: true,
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  });
  const [receiveFirstTokenForExchange, setReceiveFirstTokenForExchange] = useState({
    symbol: 'DAI',
    logoURI: daiICon,
    avatarIcon: 'Dai Stablecoin',
    name: 'dai',
    id: 'dai',
    receiveTokensListItem: true,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  });
  const [receiveSecondTokenForExchange, setReceiveSecondTokenForExchange] = useState({
    symbol: 'UNI',
    logoURI: uniIcon,
    avatarIcon: 'Uniswap Protocol Governance Token',
    name: 'unicorn-token',
    id: 'unicorn-token',
    receiveTokensListItem: true,
    address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
  });

  const [isSendTokensModalVisible, setIsSendTokensModalVisible] = useState(false);
  const [isReceiveTokensModalVisible, setIsReceiveTokensModalVisible] = useState(false);
  // const [exchangeTokenAmount, setExchangeTokenAmount] = useState();

  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);
  const classes = useStyles();

  const receiveTokensFullList = [receiveFirstTokenForExchange, receiveSecondTokenForExchange];
  console.log('receiveTokensList multiswap', receiveTokensFullList);

  let convertTokenToUSDCurrency = async (tokenData) => {
    console.log('multiswap tokenData', tokenData);
    let tokenUSDCurrencyValue = await axios.get(
      `https://api.ethplorer.io/getTokenInfo/${tokenData.address}?apiKey=EK-qSPda-W9rX7yJ-UY93y`
    );
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
            <MultiSwapChooseBtnTokenBlock onClick={() => setIsSendTokensModalVisible(true)}>
              <div>
                {sendTokenForExchange.logoURI !== null ? (
                  <SendTokenImg
                    alt="token_img"
                    src={sendTokenForExchange.logoURI}
                    style={{ marginLeft: '4px' }}
                  />
                ) : (
                  <MultiSwapTokenAvatar
                    name={sendTokenForExchange.avatarIcon}
                    round={true}
                    size="21"
                    textSizeRatio={1}
                  />
                )}
                <ChosenTokenLabel isLightTheme={isLightTheme}>
                  {sendTokenForExchange.symbol === 'ethereum' ? 'ETH' : sendTokenForExchange.symbol}
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
                // value={sendTokenForExchangeAmount}
                onChange={(e) => {
                  // setSendTokenForExchangeAmount(e.target.value);
                  convertTokenToUSDCurrency({
                    amount: e.target.value,
                    ...sendTokenForExchange,
                  });
                }}
              />
              <MultiSwapSendValueLabel isLightTheme={isLightTheme} style={{ marginLeft: '40px' }}>
                $3 510,03
              </MultiSwapSendValueLabel>
            </USDCurrencyInputBlock>
          </MultiSwapSendTokensChooseBlock>

          <SwitchTokensBtn
            src={isLightTheme ? switchTokensLight : switchTokensDark}
            alt="switch_tokens_btn"
          />
        </SendReceiveSubBlock>
        {/* 1st receive block */}
        {receiveTokensFullList.map((receiveToken) => (
          <MultiSwapReceiveTokensBlock isLightTheme={isLightTheme}>
            <FirstSubLayoutMultiSwapReceiveTokensBlock>
              <MultiSwapChooseBtnTokenBlock>
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
                  // value={sendTokenForExchangeAmount}
                  onChange={(e) => {
                    // setSendTokenForExchangeAmount(e.target.value);
                    convertTokenToUSDCurrency({
                      amount: e.target.value,
                      ...receiveToken,
                    });
                  }}
                />
                <MultiSwapSendValueLabel isLightTheme={isLightTheme} style={{ marginLeft: '40px' }}>
                  $3 510,03
                </MultiSwapSendValueLabel>
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
                  <span>ParaSwap</span>
                </AdditionalOptionsSwapTokensSubBlock>
              </LabelsBlockSubBlock>
            </SecondSubLayoutMultiSwapReceiveTokensBlock>
          </MultiSwapReceiveTokensBlock>
        ))}

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
          <Button>Exchange</Button>
        </SwapBlockExchangeLayout>
      </SwapTokensMainSubBlock>
    </SecondColumnSwapSubBlock>
  );
}
