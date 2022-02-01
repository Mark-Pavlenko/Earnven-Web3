import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Main,
  Mobile,
  Desktop,
  TopContainer,
  LeftSideWrapper,
  BottomContainer,
  RightSideWrapper,
} from './styledComponents';
import Stats from './components/stats/Stats';
import About from './components/about/About';
import Graph from './components/graph/Graph';
import History from './components/history/History';
import Exchange from './components/exchange/Exchange';
import GraphMob from './components/graphMob/GraphMob';
import Performance from './components/performance/Performance';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { numberWithCommas } from '../../commonFunctions/commonFunctions';

const TokenPage = () => {
  const { address } = useParams();
  const { tokenId } = useParams();
  const [textAbout, setTextAbout] = useState(
    'At vero eos et accusamus et iusto odio dignissimos ducimus qui ' +
      'blanditiis praesentium voluptatum deleniti atque corrupti quos dolores ' +
      'et quas molestias excepturi sint occaecati cupiditate non provident, ' +
      'similique sunt in culpa qui officia deserunt mollitia animi, id est laborum ' +
      'et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.' +
      'blanditiis praesentium voluptatum deleniti atque corrupti quos dolores ' +
      'et quas molestias excepturi sint occaecati cupiditate non provident, ' +
      'similique sunt in culpa qui officia deserunt mollitia animi, id est laborum ' +
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui ' +
      'blanditiis praesentium voluptatum deleniti atque corrupti quos dolores ' +
      'et quas molestias excepturi sint occaecati cupiditate non provident, ' +
      'similique sunt in culpa qui officia deserunt mollitia animi, id est laborum ' +
      'et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.' +
      'blanditiis praesentium voluptatum deleniti atque corrupti quos dolores ' +
      'et quas molestias excepturi sint occaecati cupiditate non provident, ' +
      'similique sunt in culpa qui officia deserunt mollitia animi, id est laborum ' +
      'et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.'
  );
  const [social, setSocial] = useState(true);
  const [tokenData, setTokenData] = useState(null);
  const [tokenAddress, setTokenAddress] = useState(null);
  const [walletData, setWalletData] = useState(null);
  const theme = useSelector((state) => state?.themeReducer.isLightTheme);

  const balanceConverter = (balance) => {
    // const balanceArr = balance ? balance.split('e+') : [];
    // const rez =
    //   balanceArr.length > 1
    //     ? parseFloat(balanceArr[0]) * 10 ** (balanceArr[1] - 18).toFixed(2)
    //     : parseFloat(balance).toFixed(2);
    // console.log(rez);
    return 'rez';
  };

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${tokenId}`, {}).then(async (response) => {
      console.log('response', response);
      await setTokenData(response.data);
    });

    axios
      .get(`https://api.ethplorer.io/getAddressInfo/${address}?apiKey=EK-qSPda-W9rX7yJ-UY93y`, {})
      .then(async (response) => {
        console.log('response2', response);
        await setWalletData(response.data);
        await setTokenAddress(
          tokenId === 'ethereum'
            ? address
            : response.data.tokens.find(
                (e) => e.tokenInfo.name?.toLowerCase() === tokenId.toLowerCase()
              ).tokenInfo.address
        );
      });
  }, [tokenId]);

  const tokensHolding =
    tokenId === 'ethereum'
      ? // ? walletData?.ETH.balance.toFixed(2) + '$ETH' || ''
        balanceConverter(walletData?.ETH.balance) + '$ETH' || ''
      : balanceConverter(
          walletData?.tokens.find((el) => el.tokenInfo.name?.toLowerCase() === tokenId)?.balance
        ) +
          // : parseFloat(
          //     walletData?.tokens.find((el) => el.tokenInfo.name?.toLowerCase() === tokenId)?.balance
          //   ).toFixed(2) +
          `$${
            walletData?.tokens.find((el) => el.tokenInfo.name?.toLowerCase() === tokenId)?.tokenInfo
              .symbol
          }` || '';

  // const totalHoldValue=tokensHolding ? tokensHolding*

  return (
    <Main>
      <Desktop>
        <TopContainer>
          <LeftSideWrapper>
            <Graph
              isLightTheme={theme}
              tokenId={tokenId}
              tokenName={tokenData?.name || ''}
              tokenSymbol={tokenData?.symbol || ''}
              tokenImage={tokenData?.image.small || ''}
              current_price={
                numberWithCommas(tokenData?.market_data.current_price.usd.toFixed(2)) || ''
              }
              price_change_percentage_24h={
                tokenData?.market_data.price_change_percentage_24h.toFixed(2) || ''
              }
            />
            <Performance isLightTheme={theme} tokensHolding={tokensHolding} />
            <Stats
              isLightTheme={theme}
              statsDay={tokenData?.market_data.price_change_percentage_24h.toFixed(2) || ''}
              statsMonth={tokenData?.market_data.price_change_percentage_30d.toFixed(2) || ''}
              statsTwoMonths={tokenData?.market_data.price_change_percentage_60d.toFixed(2) || ''}
              statsYear={tokenData?.market_data.price_change_percentage_1y.toFixed(2) || ''}
              marketCap={numberWithCommas(tokenData?.market_data.market_cap.usd) || ''}
              dayHigh={tokenData?.market_data.high_24h.usd.toFixed(2) || ''}
              dayLow={tokenData?.market_data.low_24h.usd.toFixed(2) || ''}
              coingeckoScore={tokenData?.coingecko_score || ''}
            />
            <About isLightTheme={theme} textAbout={textAbout} />
          </LeftSideWrapper>
          <RightSideWrapper>
            <Exchange isLightTheme={theme} />
          </RightSideWrapper>
        </TopContainer>
        <BottomContainer>
          <History isLightTheme={theme} />
        </BottomContainer>
      </Desktop>
      <Mobile>
        <GraphMob
          isLightTheme={theme}
          tokenId={tokenId}
          current_price={
            numberWithCommas(tokenData?.market_data.current_price.usd.toFixed(2)) || ''
          }
          price_change_percentage_24h={
            tokenData?.market_data.price_change_percentage_24h.toFixed(2) || ''
          }
          social={social}
        />
        <Exchange isLightTheme={theme} />
        <Performance isLightTheme={theme} />
        <Stats isLightTheme={theme} />
        <About isLightTheme={theme} textAbout={textAbout} />
        <History isLightTheme={theme} />
      </Mobile>
    </Main>
  );
};

export default TokenPage;
