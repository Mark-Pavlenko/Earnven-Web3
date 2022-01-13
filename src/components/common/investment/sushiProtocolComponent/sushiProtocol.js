import React, { useState } from 'react';
import {
  Main,
  TokenName,
  TokenImage,
  TotalValue,
  ToggleButton,
  ImagesWrapper,
  ContentWrapper,
  MockTokenImage,
  ContentRightWrapper,
} from './styledComponents';
import { useSelector } from 'react-redux';
import { numberWithCommas } from '../../../../commonFunctions/commonFunctions';

const SushiProtocol = ({ protocol, protocolName, logoImage }) => {
  const theme = useSelector((state) => state.themeReducer.isLightTheme);
  const [isOpen, setIsOpen] = useState(false);

  const { imageData, tokens, price, sushiLpTokenValue, sushiLpTokenSymbol } = protocol;

  const protocolData = {
    Value: `$${protocol.sushiLpTokenValue}`,
    Liquidity: protocol.sushiLpTokenLiquidity
      ? `$${parseFloat(protocol.sushiLpTokenLiquidity).toFixed(2)}`
      : `$0`,
    Balance: parseFloat(
      protocol.sushiLpTokenBalance
        ? protocol.sushiLpTokenBalance
        : protocol.balanceShares / 10 ** 18
    ).toFixed(3),
    Chain: protocol.sushiLpProtocol,
    Protocol: protocol.sushiLpChain,
    Volume: protocol.sushiLpTokenVolume,
    Price: `$${protocol.sushiLpTokenPrice}`,
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
              <TokenName isLightTheme={theme}>{`${sushiLpTokenSymbol}`}</TokenName>
            )}
          </div>
        </div>
        <ContentRightWrapper isLightTheme={theme}>
          <div>${numberWithCommas(parseFloat(price ? price : sushiLpTokenValue).toFixed(2))}</div>
          <ToggleButton isLightTheme={theme} isOpen={isOpen} onClick={toggleHandler} />
        </ContentRightWrapper>
      </TotalValue>
      {isOpen &&
        Object.keys(protocolData).map((el) => (
          <ContentWrapper isLightTheme={theme}>
            <div>{el}</div>
            <div>{numberWithCommas(protocolData[el])}</div>
          </ContentWrapper>
        ))}
    </Main>
  );
};

export default SushiProtocol;
