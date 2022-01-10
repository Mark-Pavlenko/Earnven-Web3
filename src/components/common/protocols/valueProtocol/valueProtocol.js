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

const ValueProtocol = ({ token0Symbol, token1Symbol, liquidity, protocol }) => {
  const theme = useSelector((state) => state.themeReducer.isLightTheme);

  const [isOpen, setIsOpen] = useState(false);

  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Main isOpen={isOpen} isLightTheme={theme}>
      <TotalValue isOpen={isOpen}>
        <div style={{ display: 'flex' }}>
          {/*{imageData && (*/}
          {/*  <ImagesWrapper>*/}
          {/*    {imageData ? (*/}
          {/*      imageData.map((name, index) => <TokenImage firstElement={index} src={name} />)*/}
          {/*    ) : (*/}
          {/*      <MockTokenImage src={logoImage} />*/}
          {/*    )}*/}
          {/*  </ImagesWrapper>*/}
          {/*)}*/}
          <div style={{ display: 'flex' }}>
            <TokenName isLightTheme={theme}>{`${token0Symbol}-${token1Symbol}`}</TokenName>
          </div>
        </div>
        <ContentRightWrapper isLightTheme={theme}>
          <div>
            {parseFloat(liquidity && +liquidity).toFixed(2)}
            &nbsp;USD
          </div>
          <ToggleButton isLightTheme={theme} isOpen={isOpen} onClick={toggleHandler} />
        </ContentRightWrapper>
      </TotalValue>
      {isOpen && (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: '600',
              padding: '0 32px 11px 26px',
            }}>
            <div style={{ fontSize: '10px' }}>Liquidity</div>
            <div style={{ fontSize: '10px' }}>${parseFloat(liquidity).toFixed(2)}</div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: '600',
              padding: '0 32px 11px 26px',
            }}>
            <div style={{ fontSize: '10px' }}>Protocol</div>
            <div style={{ fontSize: '10px' }}>{protocol}</div>
          </div>
        </>
      )}
    </Main>
  );
};

export default ValueProtocol;
