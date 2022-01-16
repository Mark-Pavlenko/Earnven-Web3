import React from 'react';
import { useParams } from 'react-router-dom';
import TransactionHistory from '../components/transactionHistory';
import { useSelector } from 'react-redux';

export default function History() {
  const { address } = useParams();
  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);
  return (
    <>
      {/*{console.log('address inside history component::', address)}*/}
      <TransactionHistory accounts={address} isLightTheme={isLightTheme} />
    </>
  );
}
