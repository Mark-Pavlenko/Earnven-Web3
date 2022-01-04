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

const Investment = ({ protocol, protocolName, logoImage }) => {
  const theme = useSelector((state) => state.themeReducer.isLightTheme);

  const [isOpen, setIsOpen] = useState(false);

  const { imageData, tokens, totalInvestment, mainTokenSymbol, totalTokensBalance } = protocol;

  const protocolData = {
    Liquidity: protocol.liquidity ? `$${parseFloat(protocol.liquidity).toFixed(2)}` : `$0`,
    Balance: parseFloat(
      protocol.balance ? protocol.balance : protocol.balanceShares / 10 ** 18
    ).toFixed(3),
    Chain: 'Ethereum',
    Protocol: protocolName,
  };

  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };
  const gap = '-';

  return (
    <Main isOpen={isOpen} isLightTheme={theme}>
      <TotalValue isOpen={isOpen}>
        <div style={{ display: 'flex' }}>
          {imageData && (
            <ImagesWrapper>
              {imageData ? (
                imageData.map((name, index) => <TokenImage firstElement={index} src={name} />)
              ) : (
                <MockTokenImage src={logoImage} />
              )}
            </ImagesWrapper>
          )}
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
            {parseFloat(totalTokensBalance ? totalTokensBalance : totalInvestment).toFixed(2)}
            &nbsp;USD
          </div>
          <ToggleButton isLightTheme={theme} isOpen={isOpen} onClick={toggleHandler} />
        </ContentRightWrapper>
      </TotalValue>
      {isOpen && (
        <>
          {tokens &&
            tokens.map((token) => (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: '600',
                  padding: '0 32px 11px 26px',
                }}>
                <div style={{ fontSize: '10px' }}>{token.symbol}</div>
                <div style={{ fontSize: '10px' }}>${parseFloat(token.balance).toFixed(2)}</div>
              </div>
            ))}
          {Object.keys(protocolData).map((el) => (
            <ContentWrapper>
              <div>{el}</div>
              <div>{protocolData[el]}</div>
            </ContentWrapper>
          ))}
        </>
      )}
    </Main>
  );
};

export default Investment;
