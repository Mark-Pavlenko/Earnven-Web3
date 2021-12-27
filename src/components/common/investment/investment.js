import React, { useState } from 'react';
import { Main, TotalValue, ToggleButton, ContentRightWrapper } from './styledComponents';

const Investment = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };

  const mockData = [
    {
      asdffs: '$142',
      bdsadas: '$223424',
      casdas: '$33243',
    },
  ];

  return (
    <Main isOpen={isOpen}>
      <TotalValue>
        <div>AAVE</div>
        <ContentRightWrapper>
          <div>$32432</div>
          <ToggleButton isOpen={isOpen} onClick={toggleHandler} />
        </ContentRightWrapper>
      </TotalValue>
      {isOpen &&
        mockData.map((el) =>
          Object.keys(el).map((field) => (
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 25px' }}>
              <div>{field}</div>
              <div>{el[field]}</div>
            </div>
          ))
        )}
    </Main>
  );
};

export default Investment;
