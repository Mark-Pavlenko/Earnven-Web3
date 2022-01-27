import React, { useState } from 'react';
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

const TokenPage = () => {
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
  // const [social, setSocial] = useState(false);
  const theme = useSelector((state) => state.themeReducer.isLightTheme);

  return (
    <Main>
      <Desktop>
        <TopContainer>
          <LeftSideWrapper>
            <Graph isLightTheme={theme} />
            <Performance isLightTheme={theme} />
            <Stats isLightTheme={theme} />
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
        <GraphMob isLightTheme={theme} social={social} />
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
