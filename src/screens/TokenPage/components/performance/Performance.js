import React from 'react';
import { Wrapper, InfoCard, Mark, Value } from './styledComponents';
import { Main, Title } from '../styledComponentsCommon';

const Performance = () => {
  return (
    <Main>
      <Title>{'Performance'}</Title>
      <Wrapper>
        <InfoCard>
          <Mark>{'Tokens Holding'}</Mark>
          <Value>{'19065,14 $MIR'}</Value>
        </InfoCard>
        <InfoCard>
          <Mark>{'Total HODL Value'}</Mark>
          <Value>{'$52342,67'}</Value>
        </InfoCard>
        <InfoCard>
          <Mark>{'Accumulation Cost'}</Mark>
          <Value>{'$52342,67'}</Value>
        </InfoCard>
        <InfoCard>
          <Mark>{'Avg. Buying Cost'}</Mark>
          <Value>{'$8,53'}</Value>
        </InfoCard>
        <InfoCard>
          <Mark>{'Profit/Loss'}</Mark>
          <Value>{'$ -110209,04'}</Value>
        </InfoCard>
        <InfoCard>
          <Mark>{'Profit/Loss Percent'}</Mark>
          <Value>{'67,80%'}</Value>
        </InfoCard>
      </Wrapper>
    </Main>
  );
};

export default Performance;
