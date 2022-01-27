import React from 'react';
import { Wrapper, InfoCard, Mark, Value } from './styledComponents';
import { Main, Title } from '../styledComponentsCommon';
import CoinGeckoLogo from '../../../../assets/icons/CoinGeckoLogo.png';

const Stats = ({ isLightTheme }) => {
  return (
    <Main isLightTheme={isLightTheme}>
      <Title>{'Stats'}</Title>
      <Wrapper>
        <InfoCard>
          <Mark>{'1 day'}</Mark>
          <Value>{'-5,85%'}</Value>
        </InfoCard>
        <InfoCard>
          <Mark>{'1 month'}</Mark>
          <Value>{'-24,57%'}</Value>
        </InfoCard>
        <InfoCard>
          <Mark>{'2 months'}</Mark>
          <Value>{'-18,85%'}</Value>
        </InfoCard>
        <InfoCard>
          <Mark>{'1 year'}</Mark>
          <Value>{'0,00%'}</Value>
        </InfoCard>
        <InfoCard>
          <Mark>{'Market Cap'}</Mark>
          <Value>{'$296609311'}</Value>
        </InfoCard>
        <InfoCard>
          <Mark>{'1 Year High'}</Mark>
          <Value>{'67,80%'}</Value>
        </InfoCard>
        <InfoCard>
          <Mark>{'1 Year Law'}</Mark>
          <Value>{'$29,4'}</Value>
        </InfoCard>
        <InfoCard>
          <Mark>
            <img src={CoinGeckoLogo} />
            {'CoinGecko Score'}
          </Mark>
          <Value>{'25,979'}</Value>
        </InfoCard>
      </Wrapper>
    </Main>
  );
};

export default Stats;
