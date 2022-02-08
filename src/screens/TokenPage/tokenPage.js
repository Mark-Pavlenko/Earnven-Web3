import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { getTokenDataSaga } from '../../store/currentTokenData/actions';
import { getTokenTransactionsSaga } from '../../store/currentTokenTransactions/actions';

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
  const [usersTokenData, setUsersTokenData] = useState(null);
  const [tokenHistoryData, setTokenHistoryData] = useState(null);
  const [walletData, setWalletData] = useState(null);
  const theme = useSelector((state) => state?.themeReducer.isLightTheme);
  const dispatch = useDispatch();
  const tokenData = useSelector((state) => {
    console.log(state?.currentTokenDataReducer.currentTokenData);
    return state?.currentTokenDataReducer.currentTokenData;
  });
  const tokenContractAddress = useSelector((state) => {
    console.log(state?.currentTokenDataReducer.currentTokenData?.contract_address);
    return state?.currentTokenDataReducer.currentTokenData?.contract_address;
  });
  const tokenTransactions = useSelector((state) => {
    console.log(state?.currentTokenTransactionsReducer.currentTokenTransactions);
    return state?.currentTokenTransactionsReducer.currentTokenTransactions;
  });

  useEffect(() => {
    dispatch(getTokenDataSaga(tokenId));
  }, [tokenId]);

  useEffect(() => {
    dispatch(getTokenTransactionsSaga(tokenContractAddress, address));

    axios
      .get(`https://api.ethplorer.io/getAddressInfo/${address}?apiKey=EK-qSPda-W9rX7yJ-UY93y`, {})
      .then(async (response) => {
        console.log('response UsersTokenData', response);
        await setWalletData(response.data);
        await setUsersTokenData(
          tokenId === 'ethereum'
            ? {
                balance: response.data.ETH.balance,
                rate: response.data.ETH.price.rate,
                decimals: 0,
                symbol: 'ETH',
              }
            : () => {
                const token = response.data.tokens.find((e) => e.tokenInfo.coingecko === tokenId);
                return {
                  balance: token.balance,
                  rate: token.tokenInfo.price.rate,
                  decimals: token.tokenInfo.decimals,
                  symbol: token.tokenInfo.symbol,
                };
              }
        );
      });

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart/range?vs_currency=usd&from=1200000000&to=${new Date().getTime()}`,
        {}
      )
      .then(async (response) => {
        console.log('response TokenHistoryData', response);
        setTokenHistoryData(
          await response.data.prices.map((el) => ({
            date: new Date(el[0]).toISOString().split('').splice(0, 10).join(''),
            rate: el[1],
          }))
        );
      });
  }, [tokenContractAddress]);

  const tokensHolding = usersTokenData
    ? `${numberWithCommas(
        (parseFloat(usersTokenData.balance) / 10 ** parseInt(usersTokenData.decimals)).toFixed(2)
      )} ${usersTokenData.symbol}`
    : '';

  const totalHoldValue = usersTokenData
    ? `$${numberWithCommas(
        (
          (parseFloat(usersTokenData.balance) / 10 ** parseInt(usersTokenData.decimals)) *
          parseFloat(usersTokenData.rate)
        ).toFixed(2)
      )}`
    : '';
  console.log(tokenTransactions);
  const accumulationCost =
    Array.isArray(tokenTransactions) && tokenHistoryData
      ? tokenTransactions
          .filter((e) => e.from === address)
          .map(
            (el) =>
              (parseFloat(el.value) / 10 ** parseInt(el.tokenDecimal)) *
              tokenHistoryData.find(
                (e) =>
                  e.date ===
                  new Date(parseInt(el.timeStamp) * 1000)
                    .toISOString()
                    .split('')
                    .splice(0, 10)
                    .join('')
              ).rate
          )
          .reduce((prev, el) => prev + el, 0)
          .toFixed(2)
      : '';

  const avgBuyingCost =
    Array.isArray(tokenTransactions) && tokenHistoryData
      ? `$${numberWithCommas(
          (
            tokenTransactions
              .filter((e) => e.to === address)
              .map(
                (el) =>
                  (parseFloat(el.value) / 10 ** parseInt(el.tokenDecimal)) *
                  tokenHistoryData.find(
                    (e) =>
                      e.date ===
                      new Date(parseInt(el.timeStamp) * 1000)
                        .toISOString()
                        .split('')
                        .splice(0, 10)
                        .join('')
                  ).rate
              )
              .reduce((prev, el) => prev + el, 0) /
            tokenTransactions
              .filter((e) => e.to === address)
              .map((el) => parseFloat(el.value) / 10 ** parseInt(el.tokenDecimal))
              .reduce((prev, el) => prev + el, 0)
          ).toFixed(2)
        )}`
      : '';

  const profitLoss = accumulationCost
    ? (
        accumulationCost -
        tokenTransactions
          .filter((e) => e.from === address)
          .map(
            (el) =>
              (parseFloat(el.value) / 10 ** parseInt(el.tokenDecimal)) *
              parseFloat(tokenData.market_data.current_price.usd)
          )
          .reduce((prev, el) => prev + el, 0)
      ).toFixed(2)
    : '';

  const profitLossPercent = accumulationCost
    ? ((profitLoss / accumulationCost) * 100).toFixed(2)
    : '';

  const links = [
    {
      nameOfLink: 'Website',
      link: tokenData?.links.homepage[0],
    },
    // {
    //   nameOfLink: 'Twitter',
    //   link: tokenData?.links.homepage,
    // },
    // {
    //   nameOfLink: 'Discord ',
    //   link: tokenData?.links.homepage,
    // },
    // {
    //   nameOfLink: 'Coingecko ',
    //   link: tokenData?.links.homepage,
    // },
  ];

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
              links={links}
              tokenContractAddress={tokenContractAddress}
            />
            <Performance
              isLightTheme={theme}
              tokensHolding={tokensHolding}
              totalHoldValue={totalHoldValue}
              accumulationCost={accumulationCost ? `$${numberWithCommas(accumulationCost)}` : ''}
              avgBuyingCost={avgBuyingCost}
              profitLoss={profitLoss ? `$${numberWithCommas(profitLoss)}` : ''}
              profitLossPercent={profitLossPercent ? `${numberWithCommas(profitLossPercent)}%` : ''}
            />
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
          tokenName={tokenData?.name || ''}
          tokenSymbol={tokenData?.symbol || ''}
          tokenImage={tokenData?.image.small || ''}
          current_price={
            numberWithCommas(tokenData?.market_data.current_price.usd.toFixed(2)) || ''
          }
          price_change_percentage_24h={
            tokenData?.market_data.price_change_percentage_24h.toFixed(2) || ''
          }
          links={links}
          tokenContractAddress={tokenContractAddress}
        />
        <Exchange isLightTheme={theme} />
        <Performance
          isLightTheme={theme}
          tokensHolding={tokensHolding}
          totalHoldValue={totalHoldValue}
          accumulationCost={accumulationCost ? `$${numberWithCommas(accumulationCost)}` : ''}
          avgBuyingCost={avgBuyingCost}
          profitLoss={profitLoss ? `$${numberWithCommas(profitLoss)}` : ''}
          profitLossPercent={profitLossPercent ? `${numberWithCommas(profitLossPercent)}%` : ''}
        />
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
        <History isLightTheme={theme} />
      </Mobile>
    </Main>
  );
};

export default TokenPage;
