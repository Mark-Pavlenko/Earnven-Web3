import React from 'react';
import { Net, Header, Links, TokenLinks, TokenLink, TokenPlatformLogo } from './styledComponents';
import { Main } from '../styledComponentsCommon';
import sendIcon from '../../../../assets/icons/send-icon.svg';
import ethLogoBlue from '../../../../assets/icons/ethLogoBlue.png';
import etherScan from '../../../../assets/icons/etherScan-icon.svg';

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
            <TokenLink>
              <img alt={'EtherScan'} src={etherScan} />
            </TokenLink>
            <TokenLink>
              <img alt={'EtherScan'} src={etherScan} />
            </TokenLink>
            <TokenLink>
              <img alt={'EtherScan'} src={etherScan} />
            </TokenLink>
            <TokenLink>
              <img alt={'EtherScan'} src={etherScan} />
            </TokenLink>
          </TokenLinks>

          <TokenLink>
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
