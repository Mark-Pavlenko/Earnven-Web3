import React from 'react';
import { Main, Net, Header, MainLinks, TokenLinks, NetWrapper, Chain } from './styledComponents';
import sendIcon from '../../../../assets/icons/send-icon.svg';
import ethLogoBlue from '../../../../assets/icons/ethLogoBlue.png';
import etherScan from '../../../../assets/icons/etherScan-icon.svg';
import { TokenLink } from '../styledComponentsCommon';
import Chart from '../chart/chart';
import etherScanDark from '../../../../assets/icons/etherScanDark-icon.svg';
import homePage from '../../../../assets/icons/homePage.png';

const GraphMob = ({
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
        {links.length > 0 ? (
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
          </TokenLinks>
        ) : (
          <MainLinks>
            <TokenLink isLightTheme={isLightTheme}>
              <img alt={'Send'} src={sendIcon} />
            </TokenLink>
            <TokenLink
              isLightTheme={isLightTheme}
              href={
                tokenContractAddress
                  ? `https://etherscan.io/token/${tokenContractAddress}`
                  : 'https://etherscan.io/'
              }
              target="_blank"
              rel="noopener noreferrer">
              <img alt={'EtherScan'} src={isLightTheme ? etherScan : etherScanDark} />
            </TokenLink>
          </MainLinks>
        )}
      </Header>
      <NetWrapper>
        <Net>
          <img alt={tokenSymbol} src={tokenImage} />
          <p>{tokenName}</p>
        </Net>
        <MainLinks>
          {links.length > 0 ? (
            <>
              <TokenLink isLightTheme={isLightTheme}>
                <img alt={'Send'} src={sendIcon} />
              </TokenLink>
              <TokenLink
                isLightTheme={isLightTheme}
                href={
                  tokenContractAddress
                    ? `https://etherscan.io/token/${tokenContractAddress}`
                    : 'https://etherscan.io/'
                }
                target="_blank"
                rel="noopener noreferrer">
                <img alt={'EtherScan'} src={isLightTheme ? etherScan : etherScanDark} />
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
