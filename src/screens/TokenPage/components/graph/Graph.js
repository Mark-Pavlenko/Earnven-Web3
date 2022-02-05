import React from 'react';
import { TokenName, Header, Links, TokenLinks, Chain } from './styledComponents';
import { Main, TokenLink } from '../styledComponentsCommon';
import sendIcon from '../../../../assets/icons/send-icon.svg';
import ethLogoBlue from '../../../../assets/icons/ethLogoBlue.png';
import etherScan from '../../../../assets/icons/etherScan-icon.svg';
import etherScanDark from '../../../../assets/icons/etherScanDark-icon.svg';
import homePage from '../../../../assets/icons/homePage.png';
import Chart from '../chart/chart';

const Graph = ({
  isLightTheme,
  tokenId,
  tokenName,
  tokenSymbol,
  tokenImage,
  current_price,
  price_change_percentage_24h,
  links,
  tokenContractAddress,
}) => {
  return (
    <Main isLightTheme={isLightTheme}>
      <Header>
        <Chain>
          <img alt={'eth'} src={ethLogoBlue} />
          <p>{'ETH'}</p>
        </Chain>
        <Links>
          <TokenLinks>
            {/*<TokenLink isLightTheme={isLightTheme}>*/}
            {/*  <img alt={'EtherScan'} src={etherScan} />*/}
            {/*</TokenLink>*/}
            {/*<TokenLink isLightTheme={isLightTheme}>*/}
            {/*  <img alt={'EtherScan'} src={etherScan} />*/}
            {/*</TokenLink>*/}
            <TokenLink
              isLightTheme={isLightTheme}
              href={links[0].link}
              target="_blank"
              rel="noopener noreferrer">
              <img alt={'website'} src={homePage} />
            </TokenLink>
            <TokenLink
              href={
                tokenContractAddress
                  ? `https://etherscan.io/token/${tokenContractAddress}`
                  : 'https://etherscan.io/'
              }
              target="_blank"
              rel="noopener noreferrer"
              isLightTheme={isLightTheme}>
              <img alt={'EtherScan'} src={isLightTheme ? etherScan : etherScanDark} />
            </TokenLink>
          </TokenLinks>
          <TokenLink isLightTheme={isLightTheme}>
            <img alt={'Send'} src={sendIcon} />
          </TokenLink>
        </Links>
      </Header>
      <TokenName>
        <img alt={tokenSymbol} src={tokenImage} />
        <p>{tokenName}</p>
      </TokenName>
      <Chart
        theme={isLightTheme}
        tokenId={tokenId}
        totalValue={current_price ? `$${current_price}` : ''}
        difValue={price_change_percentage_24h ? `${price_change_percentage_24h}%` : ''}
      />
    </Main>
  );
};

export default Graph;
