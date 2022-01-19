import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TransactionHistory from '../components/transactionHistory';
import { useSelector } from 'react-redux';
import apiUrls from '../apiUrls';
import axios from 'axios';

export default function History() {
  const [currentUSDPrice, setCurrentUSDPrice] = useState();
  const { address } = useParams();
  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);

  useEffect(() => {
    axios.get(apiUrls.ETH).then((res) => {
      // console.log('res of get coingecko data', res.data.market_data.current_price.usd);
      setCurrentUSDPrice(res.data.market_data.current_price.usd);
    });
  }, []);

  console.log('setCurrentUSDPrice::', currentUSDPrice);

  return (
    <>
      <TransactionHistory
        address={address}
        isLightTheme={isLightTheme}
        currentUSDPrice={currentUSDPrice}
      />
    </>
  );
}
