import React from 'react';
import { Wrapper, InfoCard, Mark, Value } from './styledComponents';
import { Main, Title } from '../styledComponentsCommon';
import CoinGeckoLogo from '../../../../assets/icons/CoinGeckoLogo.png';

const Stats = ({
  isLightTheme,
  statsDay,
  statsMonth,
  statsTwoMonths,
  statsYear,
  marketCap,
  dayHigh,
  dayLow,
  coingeckoScore,
}) => {
  return (
    <Main isLightTheme={isLightTheme}>
      <Title>{'Stats'}</Title>
      <Wrapper>
        {statsDay ? (
          <InfoCard>
            <Mark>{'1 day'}</Mark>
            <Value>{`${statsDay} %`}</Value>
          </InfoCard>
        ) : null}
        {statsMonth ? (
          <InfoCard>
            <Mark>{'1 month'}</Mark>
            <Value>{`${statsMonth} %`}</Value>
          </InfoCard>
        ) : null}
        {statsTwoMonths ? (
          <InfoCard>
            <Mark>{'2 months'}</Mark>
            <Value>{`${statsTwoMonths} %`}</Value>
          </InfoCard>
        ) : null}
        {statsYear ? (
          <InfoCard>
            <Mark>{'1 year'}</Mark>
            <Value>{`${statsYear} %`}</Value>
          </InfoCard>
        ) : null}
        {marketCap ? (
          <InfoCard>
            <Mark>{'Market Cap'}</Mark>
            <Value>{`$${marketCap}`}</Value>
          </InfoCard>
        ) : null}
        {dayHigh ? (
          <InfoCard>
            <Mark>{'24h High'}</Mark>
            <Value>{`${dayHigh}%`}</Value>
          </InfoCard>
        ) : null}
        {dayLow ? (
          <InfoCard>
            <Mark>{'24h Low'}</Mark>
            <Value>{`${dayLow}%`}</Value>
          </InfoCard>
        ) : null}
        {coingeckoScore ? (
          <InfoCard>
            <Mark>
              <img src={CoinGeckoLogo} />
              {'CoinGecko Score'}
            </Mark>
            <Value>{`${coingeckoScore}`}</Value>
          </InfoCard>
        ) : null}
      </Wrapper>
    </Main>
  );
};

export default Stats;
