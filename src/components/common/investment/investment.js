import React, { useState } from 'react';
import {
  Main,
  TokenName,
  TokenImage,
  TotalValue,
  ToggleButton,
  ImagesWrapper,
  ContentWrapper,
  ContentRightWrapper,
} from './styledComponents';

const Investment = ({ protocol, protocolName, logoImage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { imageData, tokens, price, totalInvestment, mainTokenSymbol } = protocol;

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
    <Main isOpen={isOpen}>
      <TotalValue isOpen={isOpen}>
        <div style={{ display: 'flex' }}>
          <ImagesWrapper>
            {imageData ? (
              imageData.map((name, index) => <TokenImage firstElement={index} src={name} />)
            ) : (
              <TokenImage src={logoImage} />
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
              <TokenName>{`${mainTokenSymbol}`}</TokenName>
            )}
          </div>
        </div>
        <ContentRightWrapper>
          <div>{parseFloat(price ? price : totalInvestment).toFixed(2)}&nbsp;USD</div>
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

export default Investment;
