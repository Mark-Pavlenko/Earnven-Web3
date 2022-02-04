import React from 'react';
import {
  AdditionalOptionsSwapTokensSubBlock,
  AddReceiveTokenMultiSwapBtn,
  ChosenSendTokenValue,
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
  NewMultiSwapButton,
  SecondColumnSwapSubBlock,
  SecondColumnTitleBlock,
  SecondColumnTitleHeaderBlock,
  SendReceiveSubBlock,
  SwapBlockDelimiter,
  SwapBlockExchangeLayout,
  SwapTokensMainSubBlock,
  SwitchTokensBtn,
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

export default function MultiSwapComponent() {
  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);

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
        {/*send block */}
        <SendReceiveSubBlock>
          <MultiSwapSendTokensChooseButton isLightTheme={isLightTheme}>
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
            <ChosenSendTokenValue isLightTheme={isLightTheme}>
              <span>1</span>
              <MultiSwapSendValueLabel isLightTheme={isLightTheme}>
                $3 510,03
              </MultiSwapSendValueLabel>
            </ChosenSendTokenValue>
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
            <ChosenSendTokenValue isLightTheme={isLightTheme}>
              <span>1</span>
              <MultiSwapSendValueLabel isLightTheme={isLightTheme}>
                $3 510,03
              </MultiSwapSendValueLabel>
            </ChosenSendTokenValue>
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
            <ChosenSendTokenValue isLightTheme={isLightTheme}>
              <span>1</span>
              <MultiSwapSendValueLabel isLightTheme={isLightTheme}>
                $3 510,03
              </MultiSwapSendValueLabel>
            </ChosenSendTokenValue>
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
