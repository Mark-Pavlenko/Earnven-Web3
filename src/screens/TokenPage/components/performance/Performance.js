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
        {tokensHolding ? (
          <InfoCard>
            <Mark>{'Tokens Holding'}</Mark>
            <Value>{tokensHolding}</Value>
          </InfoCard>
        ) : null}
        {totalHoldValue ? (
          <InfoCard>
            <Mark>{'Total HODL Value'}</Mark>
            <Value>{totalHoldValue}</Value>
          </InfoCard>
        ) : null}
        {accumulationCost ? (
          <InfoCard>
            <Mark>{'Accumulation Cost'}</Mark>
            <Value>{accumulationCost}</Value>
          </InfoCard>
        ) : null}
        {avgBuyingCost ? (
          <InfoCard>
            <Mark>{'Avg. Buying Cost'}</Mark>
            <Value>{avgBuyingCost}</Value>
          </InfoCard>
        ) : null}
        {profitLoss ? (
          <InfoCard>
            <Mark>{'Profit/Loss'}</Mark>
            <Value>{profitLoss}</Value>
          </InfoCard>
        ) : null}
        {profitLossPercent ? (
          <InfoCard>
            <Mark>{'Profit/Loss Percent'}</Mark>
            <Value>{profitLossPercent}</Value>
          </InfoCard>
        ) : null}
      </Wrapper>
    </Main>
  );
};

export default Performance;
