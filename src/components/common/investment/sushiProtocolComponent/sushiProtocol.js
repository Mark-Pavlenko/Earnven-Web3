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

const SushiProtocol = ({ protocol, protocolName, logoImage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { imageData, tokens, price, sushiLpTokenValue, sushiLpTokenSymbol } = protocol;

  const protocolData = {
    Liquidity: protocol.sushiLpTokenLiquidity
      ? `$${parseFloat(protocol.sushiLpTokenLiquidity).toFixed(2)}`
      : `$0`,
    Balance: parseFloat(
      protocol.sushiLpTokenBalance
        ? protocol.sushiLpTokenBalance
        : protocol.balanceShares / 10 ** 18
    ).toFixed(3),
    Chain: protocol.sushiLpChain,
    Protocol: protocol.sushiLpProtocol,
    Volume: protocol.sushiLpTokenVolume,
    Price: `$${protocol.sushiLpTokenPrice}`,
  };

  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };
  const gap = '-';

  return (
    <Main isOpen={isOpen}>
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
                  <TokenName>{`${name.symbol}`}</TokenName>
                </>
              ))
            ) : (
              <TokenName>{`${sushiLpTokenSymbol}`}</TokenName>
            )}
          </div>
        </div>
        <ContentRightWrapper>
          <div>{parseFloat(price ? price : sushiLpTokenValue).toFixed(2)}&nbsp;USD</div>
          <ToggleButton isOpen={isOpen} onClick={toggleHandler} />
        </ContentRightWrapper>
      </TotalValue>
      {isOpen &&
        Object.keys(protocolData).map((el) => (
          <ContentWrapper>
            <div>{el}</div>
            <div>{protocolData[el]}</div>
          </ContentWrapper>
        ))}
    </Main>
  );
};

export default SushiProtocol;
