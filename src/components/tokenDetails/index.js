import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Chart } from '../Chart/Chart';
import TransactionPerToken from '../transactionHistory/transactionPerToken';

export default function Index() {
  const navigate = useNavigate();
  const { address } = useParams();
  const { tokenid } = useParams();
  console.log(tokenid);

  const [Token, setToken] = useState('');

  function callbackFunction(childData) {
    setToken(childData);
    navigate(`/app/token/${childData}`);
  }

  return (
    <div style={{ margin: 'auto' }}>
      {/* <span style={{visibility:'hidden'}}>{Token}
            <SearchTokensLight parentCallback = {callbackFunction}/> </span> */}
      {/* <br/><br/><br/><br/> */}
      {/*  <center><hr width='80%'/></center> */}
      {/* {address} */}
      <Chart />
      <center>
        <TransactionPerToken address={address} tokenid={tokenid} />
      </center>
    </div>
  );
}
