import React, { useState } from 'react';
import { Content, Button } from './styledComponents';
import { Main, Title } from '../styledComponentsCommon';

const About = ({ isLightTheme, textAbout }) => {
  const [showedMore, setShowedMore] = useState(false);
  const toggleHandler = () => {
    setShowedMore(!showedMore);
  };

  return (
    <Main isLightTheme={isLightTheme}>
      <Title>{'About'}</Title>
      <Content>
        <p>
          {!showedMore && textAbout.split('').length > 500
            ? textAbout.split('').slice(0, 500).join('') + '...'
            : textAbout}
        </p>
      </Content>
      {textAbout.split('').length > 500 ? (
        <Button onClick={toggleHandler}>
          <span>{!showedMore ? 'Show More' : 'Show Less'}</span>
        </Button>
      ) : null}
    </Main>
  );
};

export default About;
