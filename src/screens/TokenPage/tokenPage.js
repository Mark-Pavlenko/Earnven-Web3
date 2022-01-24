import React from 'react';
import {
  BottomContainer,
  LeftSideWrapper,
  Main,
  RightSideWrapper,
  TopContainer,
} from './styledComponents';
import Graph from './components/graph/Graph';
import Performance from './components/performance/Performance';
import Stats from './components/stats/Stats';
import About from './components/about/About';
import History from './components/history/History';
import Exchange from './components/exchange/Exchange';

const TokenPage = () => {
  return (
    <Main>
      <TopContainer>
        <LeftSideWrapper>
          <Graph />
          <Performance />
          <Stats />
          <About />
        </LeftSideWrapper>
        <RightSideWrapper>
          <Exchange />
        </RightSideWrapper>
      </TopContainer>
      <BottomContainer>
        <History />
      </BottomContainer>
    </Main>
  );
};

export default TokenPage;
