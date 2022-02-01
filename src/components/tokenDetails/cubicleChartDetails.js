import React, { useState } from 'react';
import SearchTokens from '../searchTokens';
import { Chart } from '../Chart/chartCubicle';

export default function Index() {
  const [Token, setToken] = useState('');

  function callbackFunction(childData) {
    setToken(childData);
    // useNavigate()(`/app/token/${childData}`)
  }

  return (
    <>
      <div>
        <SearchTokens parentCallback={callbackFunction} />{' '}
      </div>
      <br />
      <br />
      <div>
        <Chart tokenid={Token} />
      </div>
    </>
  );
}
