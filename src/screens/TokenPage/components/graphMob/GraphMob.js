import React from 'react';
import {
  Main,
  Net,
  Header,
  MainLinks,
  TokenLinks,
  NetWrapper,
  TokenPlatformLogo,
} from './styledComponents';
import sendIcon from '../../../../assets/icons/send-icon.svg';
import ethLogoBlue from '../../../../assets/icons/ethLogoBlue.png';
import etherScan from '../../../../assets/icons/etherScan-icon.svg';
import { TokenLink } from '../styledComponentsCommon';
import Chart from '../chart/chart';

const GraphMob = ({
  isLightTheme,
  social,
  tokenId,
  current_price,
  price_change_percentage_24h,
}) => {
  return (
    <Main isLightTheme={isLightTheme}>
      <Header>
        <TokenPlatformLogo>
          <img alt={'Platform'} src={ethLogoBlue} />
          <p>{'ETH'}</p>
        </TokenPlatformLogo>
        {social ? (
          <TokenLinks>
            <TokenLink isLightTheme={isLightTheme}>
              <img alt={'EtherScan'} src={etherScan} />
            </TokenLink>
            <TokenLink isLightTheme={isLightTheme}>
              <img alt={'EtherScan'} src={etherScan} />
            </TokenLink>
            <TokenLink isLightTheme={isLightTheme}>
              <img alt={'EtherScan'} src={etherScan} />
            </TokenLink>
          </TokenLinks>
        ) : (
          <MainLinks>
            <TokenLink isLightTheme={isLightTheme}>
              <img alt={'Send'} src={sendIcon} />
            </TokenLink>
            <TokenLink isLightTheme={isLightTheme}>
              <img alt={'EtherScan'} src={etherScan} />
            </TokenLink>
          </MainLinks>
        )}
      </Header>
      <NetWrapper>
        <Net>
          <img alt={'Net'} src={ethLogoBlue} />
          <p>{'MIR Token'}</p>
        </Net>
        <MainLinks>
          {social ? (
            <>
              <TokenLink isLightTheme={isLightTheme}>
                <img alt={'Send'} src={sendIcon} />
              </TokenLink>
              <TokenLink isLightTheme={isLightTheme}>
                <img alt={'EtherScan'} src={etherScan} />
              </TokenLink>
            </>
          ) : null}
        </MainLinks>
      </NetWrapper>
      <Chart
        theme={isLightTheme}
        tokenId={tokenId}
        totalValue={current_price ? `$${current_price}` : ''}
        difValue={price_change_percentage_24h ? `${price_change_percentage_24h}%` : ''}
      />
    </Main>
  );
};

export default GraphMob;
