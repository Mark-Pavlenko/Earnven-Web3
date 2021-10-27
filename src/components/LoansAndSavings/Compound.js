/** *********************************************************************************
Purpose : This component is used to get Coumpound cToken value from Compound Protocol
Developed by : Lakshya Kumar
Version log:
----------------------------------------------------------------------------------
Version           Date                         Description
---------------------------------------------------------------------------------
1.0               25/Oct/2021                   Initial Development

*********************************************************************************** */
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import axios from 'axios';
import CompoundCToken from '../../abi/CompoundCToken.json';
import Addresses from '../../contractAddresses';
import ApiUrl from '../../apiUrls';
import { toNumber } from 'lodash';

export default function CompoundData({ accountAddress, displayProp, totalSavings }) {
  const [TotalSavings, setTotalSavings] = useState(0);
  const [CompoundCDaiToken, setCompoundCDaiToken] = useState({});
  const [CompoundCUsdtToken, setCompoundCUsdtToken] = useState({});
  const [CompoundCUsdcToken, setCompoundCUsdcToken] = useState({});

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  async function checkCompoundData(
    accountAddress,
    CompoundCToken,
    CompoundTokenAddress,
    coingecko_contract_address,
    setToken
  ) {
    await loadWeb3();
    const { web3 } = window;
    const CompoundContract = new web3.eth.Contract(CompoundCToken, CompoundTokenAddress);
    const CompoundAmount = await CompoundContract.methods
      .balanceOfUnderlying(accountAddress)
      .call();
    const compoundSymbol = await CompoundContract.methods.symbol().call();
    const CompoundDecimals = await CompoundContract.methods.decimals().call();
    const CompoundTokenName = await CompoundContract.methods.name().call();
    let decimals;
    switch (compoundSymbol) {
      case 'cDAI':
        decimals = 10 ** 18;
        break;
      case 'cUSDT':
        decimals = 10 ** 6;
        break;
      case 'cUSDC':
        decimals = 10 ** 6;
        break;
      default:
        decimals = 10 ** CompoundDecimals;
    }
    const tokenAmount = CompoundAmount / decimals;
    if (tokenAmount != 0) {
      await axios
        .get(`${coingecko_contract_address}`, {}, {})
        .then(async ({ data }) => {
          const tokenPrice = data.market_data.current_price.usd;
          const compoundPriceInUSD = (tokenAmount * tokenPrice).toFixed(2);
          if (compoundPriceInUSD != 0) {
            setToken({
              tokenName: CompoundTokenName,
              symbol: compoundSymbol,
              price: compoundPriceInUSD,
              image: data.image.thumb,
            });
          } else {
            setToken({
              tokenName: '',
              symbol: '',
              price: 0,
              image: '',
            });
          }
        })
        .catch((err) => {
          console.log('Error Message message', err);
        });
    } else {
      displayProp(false);
      setToken({
        tokenName: '',
        symbol: '',
        price: 0,
        image: '',
      });
    }
  }

  useEffect(() => {
    async function getCompoundData(
      accountAddress,
      CompoundCToken,
      CompoundTokenAddress,
      coingecko_contract_address,
      setToken
    ) {
      const compoundDai = await checkCompoundData(
        accountAddress,
        CompoundCToken,
        CompoundTokenAddress,
        coingecko_contract_address,
        setToken
      );
    }
    getCompoundData(
      accountAddress,
      CompoundCToken,
      Addresses.compoundCDai,
      ApiUrl.DAI,
      setCompoundCDaiToken
    );
    getCompoundData(
      accountAddress,
      CompoundCToken,
      Addresses.compoundCUsdt,
      ApiUrl.USDT,
      setCompoundCUsdtToken
    );
    getCompoundData(
      accountAddress,
      CompoundCToken,
      Addresses.compoundCUsdc,
      ApiUrl.USDC,
      setCompoundCUsdcToken
    );
  }, [accountAddress]);

  useEffect(() => {
    totalSavings(TotalSavings);
    if (TotalSavings) {
      displayProp(true);
    } else {
      displayProp(false);
    }
  }, [TotalSavings]);

  useEffect(() => {
    setTotalSavings(
      toNumber(CompoundCDaiToken.price) +
        toNumber(CompoundCUsdtToken.price) +
        toNumber(CompoundCUsdcToken.price)
    );
  }, [CompoundCDaiToken, CompoundCUsdcToken, CompoundCUsdtToken]);

  const compoundLayout = (item) => {
    return (
      <div>
        {parseInt(item.price) ? (
          <div>
            <div
              style={{
                fontSize: '12px',
                marginLeft: '15px',
              }}>
              {item.tokenName} --- {item.price} USD
            </div>
            <div>
              <img
                src={item.image}
                style={{
                  height: '30px',
                  marginTop: '1em',
                  display: 'inline-block',
                  marginLeft: '30px',
                }}
                alt=""
              />
              <div
                style={{
                  fontSize: '13px',
                  display: 'inline-block',
                  marginLeft: '10px',
                }}>
                {item.symbol} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {item.price} USD
              </div>
            </div>
            <br />
          </div>
        ) : (
          ''
        )}
      </div>
    );
  };

  return (
    <div>
      {compoundLayout(CompoundCDaiToken)}
      {compoundLayout(CompoundCUsdtToken)}
      {compoundLayout(CompoundCUsdcToken)}
    </div>
  );
}
