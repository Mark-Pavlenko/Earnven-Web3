import React, { useState } from 'react';
import { Content, Button } from './styledComponents';
import { Main, Title } from '../styledComponentsCommon';

const About = () => {
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
  const [showedMore, setShowedMore] = useState(false);
  const toggleHandler = () => {
    setShowedMore(!showedMore);
  };

  return (
    <Main isLightTheme={isLightTheme}>
      <Title>{'About'}</Title>
      <Content isLightTheme={isLightTheme}>
        <p>
          {!showedMore && textAbout.split('').length > 500
            ? textAbout.split('').slice(0, 500).join('') + '...'
            : textAbout}
        </p>
      </Content>
      {textAbout.split('').length > 500 ? (
        <Button isLightTheme={isLightTheme} onClick={toggleHandler}>
          <span>{!showedMore ? 'Show More' : 'Show Less'}</span>
        </Button>
      ) : null}
    </Main>
  );
};

export default About;
