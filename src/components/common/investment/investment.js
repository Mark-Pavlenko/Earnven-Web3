import React, { useState } from 'react';
import {
  Main,
  TotalValue,
  ToggleButton,
  ContentRightWrapper,
  TokenImage,
  TokenName,
  ImagesWrapper,
  ContentWrapper,
} from './styledComponents';
import { log10 } from 'chart.js/helpers';

const Investment = ({ protocol, protocolName }) => {
  console.log('protocol', protocol);
  const [isOpen, setIsOpen] = useState(false);

  const { imageData, tokens, price } = protocol;

  const protocolData = {
    Liquidity: `$${parseFloat(protocol.liquidity).toFixed(2)}`,
    Balance: parseFloat(protocol.balance).toFixed(3),
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
            {imageData &&
              imageData.map((name, index) => (
                <TokenImage firstElement={index} src={name} alt="noimage" />
              ))}
          </ImagesWrapper>
          <div style={{ display: 'flex' }}>
            {tokens &&
              tokens.map((name, index) => (
                <>
                  {index !== 0 && <div>{gap}</div>}
                  <TokenName>{`${name.symbol}`}</TokenName>
                </>
              ))}
          </div>
        </div>
        <ContentRightWrapper>
          <div>{parseFloat(price).toFixed(2)}&nbsp;USD</div>
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
