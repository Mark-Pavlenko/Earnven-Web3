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
        <InfoCard>
          <Mark>{'1 day'}</Mark>
          <Value>{`${statsDay} %`}</Value>
        </InfoCard>
        <InfoCard>
          <Mark>{'1 month'}</Mark>
          <Value>{`${statsMonth} %`}</Value>
        </InfoCard>
        <InfoCard>
          <Mark>{'2 months'}</Mark>
          <Value>{`${statsTwoMonths} %`}</Value>
        </InfoCard>
        <InfoCard>
          <Mark>{'1 year'}</Mark>
          <Value>{`${statsYear} %`}</Value>
        </InfoCard>
        <InfoCard>
          <Mark>{'Market Cap'}</Mark>
          <Value>{`$${marketCap}`}</Value>
        </InfoCard>
        <InfoCard>
          <Mark>{'24h High'}</Mark>
          <Value>{`${dayHigh}%`}</Value>
        </InfoCard>
        <InfoCard>
          <Mark>{'24h Low'}</Mark>
          <Value>{`${dayLow}%`}</Value>
        </InfoCard>
        <InfoCard>
          <Mark>
            <img src={CoinGeckoLogo} />
            {'CoinGecko Score'}
          </Mark>
          <Value>{`${coingeckoScore}`}</Value>
        </InfoCard>
      </Wrapper>
    </Main>
  );
};

export default Stats;
