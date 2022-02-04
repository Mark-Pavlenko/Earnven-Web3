import React from 'react';
import {
  Header,
  LeftSide,
  TokenPlatformLogo,
  TokenLink,
  SendButton,
  Token,
} from './styledComponents';
import { Main } from '../styledComponentsCommon';

import ethLogoBlue from '../../../../assets/icons/ethLogoBlue.png';
import sendIcon from '../../../../assets/icons/send-icon.svg';

const Graph = () => {
  return (
    <Main>
      <Header>
        <LeftSide>
          <TokenPlatformLogo>
            <img src={ethLogoBlue} />
            <p>{'ETH'}</p>
          </TokenPlatformLogo>
          <TokenLink />
        </LeftSide>
        <SendButton>
          <img src={sendIcon} />
        </SendButton>
      </Header>
      <Token>
        <img src={ethLogoBlue} />
        <p>{'MIR Token'}</p>
      </Token>
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
