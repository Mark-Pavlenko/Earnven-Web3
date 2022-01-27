import React from 'react';
import { Net, Header, Links, TokenLinks, TokenPlatformLogo } from './styledComponents';
import { Main, TokenLink } from '../styledComponentsCommon';
import sendIcon from '../../../../assets/icons/send-icon.svg';
import ethLogoBlue from '../../../../assets/icons/ethLogoBlue.png';
import etherScan from '../../../../assets/icons/etherScan-icon.svg';
import etherScanDark from '../../../../assets/icons/etherScanDark-icon.svg';

const Graph = ({ isLightTheme }) => {
  return (
    <Main isLightTheme={isLightTheme}>
      <Header>
        <TokenPlatformLogo>
          <img alt={'Platform'} src={ethLogoBlue} />
          <p>{'ETH'}</p>
        </TokenPlatformLogo>
        <Links>
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
            <TokenLink isLightTheme={isLightTheme}>
              <img alt={'EtherScan'} src={isLightTheme ? etherScan : etherScanDark} />
            </TokenLink>
          </TokenLinks>
          <TokenLink isLightTheme={isLightTheme}>
            <img alt={'Send'} src={sendIcon} />
          </TokenLink>
        </Links>
      </Header>
      <Net>
        <img alt={'Net'} src={ethLogoBlue} />
        <p>{'MIR Token'}</p>
      </Net>
      <br />
      <br />
      <br />
      -------Graph-------
      <br />
      <br />
      <br />
    </Main>
  );
};

export default Graph;
