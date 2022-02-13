import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Main,
  Mobile,
  Desktop,
  TopContainer,
  LeftSideWrapper,
  RightSideWrapper,
} from './styledComponents';
import Stats from './components/stats/Stats';
import About from './components/about/About';
import Graph from './components/graph/Graph';
import Exchange from './components/exchange/Exchange';
import GraphMob from './components/graphMob/GraphMob';
import Performance from './components/performance/Performance';
import { useParams } from 'react-router-dom';
import { numberWithCommas } from '../../commonFunctions/commonFunctions';
import { getTokenDataSaga } from '../../store/currentTokenData/actions';
import { getTokenTransactionsSaga } from '../../store/currentTokenTransactions/actions';
import { getWalletDataSaga } from '../../store/currentWalletData/actions';
import { getTokenPriceHistorySaga } from '../../store/currentTokenPriceHistory/actions';

const TokenPage = () => {
  const { address } = useParams();
  const { tokenId } = useParams();
  const theme = useSelector((state) => state?.themeReducer.isLightTheme);
  const dispatch = useDispatch();
  const currentTokenData = useSelector((state) => state?.currentTokenDataReducer.currentTokenData);
  const tokenData = currentTokenData?.id === tokenId ? currentTokenData : null;
  const tokenTransactions = useSelector(
    (state) => state?.currentTokenTransactionsReducer.currentTokenTransactions
  );
  const walletData = useSelector((state) => state?.walletDataReducer.walletData);
  const tokenHistoryData = useSelector(
    (state) => state?.tokenPriceHistoryReducer.tokenPriceHistory
  );

  useEffect(() => {
    dispatch(getTokenDataSaga(tokenId));
    dispatch(getWalletDataSaga(address));
    dispatch(getTokenPriceHistorySaga(tokenId));
  }, [tokenId]);

  const tokenContractAddress = tokenData ? tokenData.contract_address : '';

  useEffect(() => {
    if (tokenContractAddress) {
      dispatch(getTokenTransactionsSaga(tokenContractAddress, address));
    }
  }, [tokenContractAddress]);

  const textAbout = tokenData
    ? tokenData.description.en.replace(/<a\b[^>]*>/g, '').replace(/<\/a>/g, '')
    : '';

  const usersTokenData = walletData
    ? tokenId === 'ethereum'
      ? {
          balance: walletData.ETH.balance,
          rate: walletData.ETH.price.rate,
          decimals: 0,
          symbol: 'ETH',
        }
      : (() => {
          const token = walletData.tokens.find((e) => e.tokenInfo.coingecko === tokenId);
          return {
            balance: token.balance,
            rate: token.tokenInfo.price.rate,
            decimals: token.tokenInfo.decimals,
            symbol: token.tokenInfo.symbol,
          };
        })()
    : '';

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

  const profitLoss =
    accumulationCost && tokenData
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

  const profitLossPercent =
    accumulationCost && profitLoss ? ((profitLoss / accumulationCost) * 100).toFixed(2) : '';

  const links = [
    {
      nameOfLink: 'Website',
      link: tokenData?.links.homepage[0],
    },
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
              price_change_percentage_24h={tokenData?.market_data.price_change_percentage_24h || ''}
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
          price_change_percentage_24h={tokenData?.market_data.price_change_percentage_24h || ''}
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
      </Mobile>
    </Main>
  );
};

export default TokenPage;
