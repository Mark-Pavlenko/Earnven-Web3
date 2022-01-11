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
import CurveLogo from '../../../assets/icons/curveLogo.png';

const StakedProtocols = ({ protocol, protocolName, logoImage }) => {
  console.log('logoImage', logoImage);
  const theme = useSelector((state) => state.themeReducer.isLightTheme);

  const [isOpen, setIsOpen] = useState(false);

  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Main isOpen={isOpen} isLightTheme={theme}>
      <TotalValue isOpen={isOpen}>
        <div style={{ display: 'flex' }}>
          <MockTokenImage src={CurveLogo} />
          <div style={{ display: 'flex' }}>
            <TokenName isLightTheme={theme}>{`${protocol.symbol}`}</TokenName>
          </div>
        </div>
        <ContentRightWrapper isLightTheme={theme}>
          <div>
            {parseFloat(protocol.totalInvestment && +protocol.totalInvestment).toFixed(2)}
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
            <div style={{ fontSize: '10px' }}>Price</div>
            <div style={{ fontSize: '10px' }}>${parseFloat(protocol.price).toFixed(2)}</div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: '600',
              padding: '0 32px 11px 26px',
            }}>
            <div style={{ fontSize: '10px' }}>Protocol</div>
            <div style={{ fontSize: '10px' }}>{protocolName}</div>
          </div>
        </>
      )}
    </Main>
  );
};

export default StakedProtocols;
