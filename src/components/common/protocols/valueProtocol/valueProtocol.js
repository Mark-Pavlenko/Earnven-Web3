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
import { numberWithCommas } from '../../../../commonFunctions/commonFunctions';

const ValueProtocol = ({
  token0Symbol,
  token1Symbol,
  liquidity,
  protocol,
  token1SymbolArray,
  protocolName,
  logoImage,
}) => {
  const theme = useSelector((state) => state.themeReducer.isLightTheme);

  const [isOpen, setIsOpen] = useState(false);
  const tokenNamesArray = ['yDAI', 'yUSDC', 'yUSDT', 'yTUSD'];

  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };
  const { imageData, balance, volume, price, totalInvestment } = protocol;
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
            <TokenName isLightTheme={theme}>{`${token0Symbol}-${token1Symbol}`}</TokenName>
          </div>
        </div>
        <ContentRightWrapper isLightTheme={theme}>
          <div>${numberWithCommas(parseFloat(totalInvestment).toFixed(2))}</div>
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
            <div style={{ fontSize: '10px' }}>
              {`$${numberWithCommas(parseFloat(protocol.liquidity).toFixed(2))}`}
            </div>
          </div>
          {/*<div*/}
          {/*  style={{*/}
          {/*    display: 'flex',*/}
          {/*    justifyContent: 'space-between',*/}
          {/*    fontWeight: '600',*/}
          {/*    padding: '0 32px 11px 26px',*/}
          {/*  }}>*/}
          {/*  <div style={{ fontSize: '10px' }}>Protocol</div>*/}
          {/*  <div style={{ fontSize: '10px' }}>{protocol}</div>*/}
          {/*</div>*/}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: '600',
              padding: '0 32px 11px 26px',
            }}>
            <div style={{ fontSize: '10px' }}>Value</div>
            <div style={{ fontSize: '10px' }}>{`$${numberWithCommas(totalInvestment)}`}</div>
          </div>
          {balance && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: '600',
                padding: '0 32px 11px 26px',
              }}>
              <div style={{ fontSize: '10px' }}>Balance</div>
              <div style={{ fontSize: '10px' }}>
                {numberWithCommas(parseFloat(balance).toFixed(2))}
              </div>
            </div>
          )}
          {volume && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: '600',
                padding: '0 32px 11px 26px',
              }}>
              <div style={{ fontSize: '10px' }}>Volume</div>
              <div style={{ fontSize: '10px' }}>{`$${numberWithCommas(
                parseFloat(volume).toFixed(2)
              )}`}</div>
            </div>
          )}
          {protocol.chain && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: '600',
                padding: '0 32px 11px 26px',
              }}>
              <div style={{ fontSize: '10px' }}>Chain</div>
              <div style={{ fontSize: '10px' }}>{protocol.chain}</div>
            </div>
          )}
          {price && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: '600',
                padding: '0 32px 11px 26px',
              }}>
              <div style={{ fontSize: '10px' }}>Price</div>{' '}
              <div style={{ fontSize: '10px' }}>
                {`$${numberWithCommas(parseFloat(price).toFixed(2))}`}
              </div>
            </div>
          )}
          {protocol.protocol && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: '600',
                padding: '0 32px 11px 26px',
              }}>
              <div style={{ fontSize: '10px' }}>Protocol</div>
              <div style={{ fontSize: '10px' }}>{protocol.protocol}</div>
            </div>
          )}
        </>
      )}
    </Main>
  );
};

export default ValueProtocol;
