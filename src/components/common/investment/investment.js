import React, { useState } from 'react';
import {
  Main,
  TokenName,
  TokenImage,
  TotalValue,
  ToggleButton,
  ImagesWrapper,
  MockTokenImage,
  ContentWrapper,
  ContentRightWrapper,
} from './styledComponents';
import { useSelector } from 'react-redux';
import { numberWithCommas } from '../../../commonFunctions/commonFunctions';

const Investment = ({ protocol, protocolName, logoImage, chain, stakedToken, isStaked }) => {
  const theme = useSelector((state) => state.themeReducer.isLightTheme);
  const [isOpen, setIsOpen] = useState(false);

  const {
    imageData,
    tokens,
    totalInvestment,
    mainTokenSymbol,
    totalTokensBalance,
    ethPrice,
    totalDeposit,
    totalValue,
  } = protocol;
  const protocolData = {
    Value: isStaked ? totalInvestment : `$${parseFloat(totalValue).toFixed(2)}`,
    Balance: isStaked
      ? totalDeposit
      : parseFloat(protocol.balance ? protocol.balance : protocol.balanceShares / 10 ** 18).toFixed(
          3
        ),
    Chain: chain ? chain : protocol.chain,
    Protocol: protocolName ? protocolName : protocol.protocol,
  };

  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };
  const gap = '-';

  return (
    <Main isOpen={isOpen} isLightTheme={theme}>
      <TotalValue isOpen={isOpen}>
        <div style={{ display: 'flex' }}>
          <ImagesWrapper>
            {imageData ? (
              imageData.map((name, index) => <TokenImage firstElement={index} src={name} />)
            ) : (
              <MockTokenImage src={logoImage} />
            )}
          </ImagesWrapper>

          <div style={{ display: 'flex' }}>
            {tokens ? (
              tokens.map((name, index) => (
                <>
                  {index !== 0 && <div>{gap}</div>}
                  <TokenName isLightTheme={theme}>{`${name.symbol}`}</TokenName>
                </>
              ))
            ) : (
              <TokenName isLightTheme={theme}>{`${mainTokenSymbol}`}</TokenName>
            )}
          </div>
        </div>
        <ContentRightWrapper isLightTheme={theme}>
          <div>
            $
            {numberWithCommas(
              parseFloat(totalTokensBalance ? totalTokensBalance : totalValue).toFixed(2)
            )}
          </div>
          <ToggleButton isLightTheme={theme} isOpen={isOpen} onClick={toggleHandler} />
        </ContentRightWrapper>
      </TotalValue>
      {isOpen && (
        <>
          {tokens &&
            tokens.map((token) => {
              return (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontWeight: '600',
                    padding: '0 32px 11px 26px',
                  }}>
                  <div style={{ fontSize: '10px' }}>balance {token.symbol}</div>
                  <div style={{ fontSize: '10px' }}>
                    {numberWithCommas(parseFloat(token.balance).toFixed(2))}
                  </div>
                </div>
              );
            })}
          {stakedToken && (
            <ContentWrapper isLightTheme={theme}>
              <div>Staked Token</div>
              <div>{stakedToken}</div>
            </ContentWrapper>
          )}
          {ethPrice && (
            <ContentWrapper isLightTheme={theme}>
              <div>Price</div>
              <div>{numberWithCommas(ethPrice)}</div>
            </ContentWrapper>
          )}
          {!stakedToken && protocol.price && (
            <ContentWrapper isLightTheme={theme}>
              <div>LPprice</div>
              <div>{`$${numberWithCommas(parseFloat(protocol.price).toFixed(2))}`}</div>
            </ContentWrapper>
          )}
          {!stakedToken && (
            <ContentWrapper isLightTheme={theme}>
              <div>Liquidity</div>
              <div>
                {protocol.liquidity
                  ? `$${numberWithCommas(parseFloat(protocol.liquidity).toFixed(2))}`
                  : `$0`}
              </div>
            </ContentWrapper>
          )}
          {Object.keys(protocolData).map((el) => {
            return (
              <ContentWrapper isLightTheme={theme}>
                <div>{el}</div>
                <div>{numberWithCommas(protocolData[el])}</div>
              </ContentWrapper>
            );
          })}
        </>
      )}
    </Main>
  );
};

export default Investment;
