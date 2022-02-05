import React from 'react';
import { Main, Title } from '../styledComponentsCommon';
import { Wrapper, InfoCard, Mark, Value } from './styledComponents';

const Performance = ({
  isLightTheme,
  tokensHolding,
  totalHoldValue,
  accumulationCost,
  avgBuyingCost,
  profitLoss,
  profitLossPercent,
}) => {
  return (
    <Main isLightTheme={isLightTheme}>
      <Title>{'Performance'}</Title>
      <Wrapper>
        <InfoCard>
          <Mark>{'Tokens Holding'}</Mark>
          <Value>{tokensHolding}</Value>
        </InfoCard>
        <InfoCard>
          <Mark>{'Total HODL Value'}</Mark>
          <Value>{totalHoldValue}</Value>
        </InfoCard>
        <InfoCard>
          <Mark>{'Accumulation Cost'}</Mark>
          <Value>{accumulationCost}</Value>
        </InfoCard>
        <InfoCard>
          <Mark>{'Avg. Buying Cost'}</Mark>
          <Value>{avgBuyingCost}</Value>
        </InfoCard>
        <InfoCard>
          <Mark>{'Profit/Loss'}</Mark>
          <Value>{profitLoss}</Value>
        </InfoCard>
        <InfoCard>
          <Mark>{'Profit/Loss Percent'}</Mark>
          <Value>{profitLossPercent}</Value>
        </InfoCard>
      </Wrapper>
    </Main>
  );
};

export default Performance;
