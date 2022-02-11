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
  LabelsBlockImportantSpan,
  LabelsBlockSubBlock,
  LabelsBlockSubBlockSpan,
  MultiSwapChooseBtnTokenBlock,
  MultiSwapReceiveTokensBlock,
  MultiSwapSendTokensChooseButton,
  MultiSwapSendValueLabel,
  MultiSwapTokenAvatar,
  NewMultiSwapButton,
  SecondColumnSwapSubBlock,
  SecondColumnTitleBlock,
  SecondColumnTitleHeaderBlock,
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
  const [sendTokenForExchangeAmount, setSendTokenForExchangeAmount] = useState();

  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);
  const classes = useStyles();

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
        <SendReceiveSubBlock>
          <MultiSwapSendTokensChooseButton isLightTheme={isLightTheme}>
            <MultiSwapChooseBtnTokenBlock
              // style={{ backgroundColor: 'red' }}
              onClick={() => setIsSendTokensModalVisible(true)}>
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
                value={sendTokenForExchangeAmount}
                onChange={(e) => {
                  setSendTokenForExchangeAmount(e.target.value);
                  convertSendTokenToUSDCurrency({
                    amount: e.target.value,
                    ...sendTokenForExchange,
                  });
                }}
              />
              <MultiSwapSendValueLabel isLightTheme={isLightTheme} style={{ marginLeft: '40px' }}>
                $3 510,03
              </MultiSwapSendValueLabel>
            </USDCurrencyInputBlock>
          </MultiSwapSendTokensChooseButton>

          <SwitchTokensBtn
            src={isLightTheme ? switchTokensLight : switchTokensDark}
            alt="switch_tokens_btn"
          />
        </SendReceiveSubBlock>

        {/* 1st receive block */}
        <MultiSwapReceiveTokensBlock isLightTheme={isLightTheme}>
          <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
            <MultiSwapChooseBtnTokenBlock>
              <div>
                <img src={EthIcon} alt="eth_icon" style={{ marginRight: '10px' }} />
                <ChosenTokenLabel isLightTheme={isLightTheme}>ETH</ChosenTokenLabel>
                <img src={isLightTheme ? chevronDownBlack : chevronDownLight} alt="chevron_icon" />
              </div>
              <div>
                <MultiSwapSendValueLabel isLightTheme={isLightTheme}>
                  3510,03 BTC
                </MultiSwapSendValueLabel>
              </div>
            </MultiSwapChooseBtnTokenBlock>
            <ChosenSendReceiveTokenValueInput isLightTheme={isLightTheme}>
              <span>1</span>
              <MultiSwapSendValueLabel isLightTheme={isLightTheme}>
                $3 510,03
              </MultiSwapSendValueLabel>
            </ChosenSendReceiveTokenValueInput>
          </div>

          <div style={{ paddingLeft: '12px', paddingRight: '19px', marginTop: '5px' }}>
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
          </div>
        </MultiSwapReceiveTokensBlock>

        {/* 2st receive block */}
        <MultiSwapReceiveTokensBlock isLightTheme={isLightTheme}>
          <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
            <MultiSwapChooseBtnTokenBlock>
              <div>
                <img src={uniIcon} alt="eth_icon" style={{ marginRight: '10px' }} />
                <ChosenTokenLabel isLightTheme={isLightTheme}>UNI</ChosenTokenLabel>
                <img src={isLightTheme ? chevronDownBlack : chevronDownLight} alt="chevron_icon" />
              </div>
              <div>
                <MultiSwapSendValueLabel isLightTheme={isLightTheme}>
                  3510,03 BTC
                </MultiSwapSendValueLabel>
              </div>
            </MultiSwapChooseBtnTokenBlock>
            <ChosenSendReceiveTokenValueInput isLightTheme={isLightTheme}>
              <span>1</span>
              <MultiSwapSendValueLabel isLightTheme={isLightTheme}>
                $3 510,03
              </MultiSwapSendValueLabel>
            </ChosenSendReceiveTokenValueInput>
          </div>

          <div style={{ paddingLeft: '12px', paddingRight: '19px', marginTop: '5px' }}>
            <LabelsBlockSubBlock isLightTheme={isLightTheme} style={{ marginBottom: '3px' }}>
              <LabelsBlockSubBlockSpan isLightTheme={isLightTheme}>
                Exchange rate
              </LabelsBlockSubBlockSpan>
              <LabelsBlockSubBlockSpan isLightTheme={isLightTheme}>
                1 ETH = 0,82 UNI
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
          </div>
        </MultiSwapReceiveTokensBlock>

        <div style={{ display: 'flex', marginTop: '5px' }}>
          <AddReceiveTokenMultiSwapBtn isLightTheme={isLightTheme} style={{}}>
            <img
              src={isLightTheme ? plusIconDark : plusIconLight}
              alt="add_receive_multiswap_token"
            />
          </AddReceiveTokenMultiSwapBtn>
        </div>

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
