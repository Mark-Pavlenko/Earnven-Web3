/** *********************************************************************************
Purpose : This component is used to get Cream IronBank value from Cream-v2 Protocol
Developed by : Lakshya Kumar
Version log:
----------------------------------------------------------------------------------
Version           Date                         Description
---------------------------------------------------------------------------------
1.0               12/Nov/2021                   Initial Development

*********************************************************************************** */
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import axios from 'axios';
import CreamIronBankContract from '../../abi/CreamIronBank.json';
import Addresses from '../../contractAddresses';
import ApiUrl from '../../apiUrls';
import { toNumber } from 'lodash';
import { symbol } from 'prop-types';

export default function CreamIronBank({ accountAddress, totalSavings }) {
  const [TotalSavings, setTotalSavings] = useState(0);
  const [CreamUSDT, setCreamUSDT] = useState({});
  const [CreamDAI, setCreamDAI] = useState({});
  const [CreamUSDC, setCreamUSDC] = useState({});
  const [CreamWETH, setCreamWETH] = useState({});
  const [CreamLINK, setCreamLINK] = useState({});
  const [CreamUNI, setCreamUNI] = useState({});
  const [CreamSUSHI, setCreamSUSHI] = useState({});
  const [CreamCRV, setCreamCRV] = useState({});
  const [Creamv2, setCreamv2] = useState({});

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

  async function checkCreamData(
    accountAddress,
    CreamABI,
    CreamIronBankAddress,
    coingecko_contract_address,
    setToken
  ) {
    await loadWeb3();
    const { web3 } = window;
    const IronBankContract = new web3.eth.Contract(CreamABI, CreamIronBankAddress);
    const IronBankAmount = await IronBankContract.methods.balanceOf(accountAddress).call();
    const CreamSymbol = await IronBankContract.methods.symbol().call();
    const CreamDecimal = await IronBankContract.methods.decimals().call();
    const CreamTokenName = await IronBankContract.methods.name().call();
    let decimals;
    switch (CreamSymbol) {
      case 'cyUSDT':
        decimals = 10 ** 10;
        break;
      case 'cyDAI':
        decimals = 10 ** 10;
        break;
      default:
        decimals = 10 ** 10;
    }
    const tokenAmount = IronBankAmount / decimals;
    if (tokenAmount > 0) {
      await axios
        .get(`${coingecko_contract_address}`, {}, {})
        .then(async ({ data }) => {
          const tokenPrice = data.market_data.current_price.usd;
          const IronBankUSDPrice = (tokenAmount * tokenPrice).toFixed(2);
          if (IronBankUSDPrice > 0) {
            setToken({
              tokenName: CreamTokenName,
              symbol: CreamSymbol,
              price: parseFloat(IronBankUSDPrice),
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
      setToken({
        tokenName: '',
        symbol: '',
        price: 0,
        image: '',
      });
    }
  }

  useEffect(() => {
    async function getCreamData(
      accountAddress,
      CreamABI,
      CreamIronBankAddress,
      coingecko_contract_address,
      setToken
    ) {
      const CreamAmount = await checkCreamData(
        accountAddress,
        CreamABI,
        CreamIronBankAddress,
        coingecko_contract_address,
        setToken
      );
    }
    getCreamData(
      accountAddress,
      CreamIronBankContract,
      Addresses.CreamCRUSDT,
      ApiUrl.USDT,
      setCreamUSDT
    );
    getCreamData(
      accountAddress,
      CreamIronBankContract,
      Addresses.CreamCRDAI,
      ApiUrl.DAI,
      setCreamDAI
    );
    getCreamData(
      accountAddress,
      CreamIronBankContract,
      Addresses.CreamCRUSDC,
      ApiUrl.USDC,
      setCreamUSDC
    );
    getCreamData(
      accountAddress,
      CreamIronBankContract,
      Addresses.CreamCWETH,
      ApiUrl.ETH,
      setCreamWETH
    );
    getCreamData(
      accountAddress,
      CreamIronBankContract,
      Addresses.CreamCLINK,
      ApiUrl.LINK,
      setCreamLINK
    );
    getCreamData(
      accountAddress,
      CreamIronBankContract,
      Addresses.CreamCCRV,
      ApiUrl.CRV,
      setCreamCRV
    );
    getCreamData(
      accountAddress,
      CreamIronBankContract,
      Addresses.CreamCCream,
      ApiUrl.CREAM,
      setCreamv2
    );
    getCreamData(
      accountAddress,
      CreamIronBankContract,
      Addresses.CreamCUNI,
      ApiUrl.UNI,
      setCreamUNI
    );
    getCreamData(
      accountAddress,
      CreamIronBankContract,
      Addresses.CreamCSUSHI,
      ApiUrl.SUSHI,
      setCreamSUSHI
    );
  }, [accountAddress]);

  useEffect(() => {
    totalSavings(TotalSavings);
  }, [TotalSavings]);

  useEffect(() => {
    setTotalSavings(
      parseFloat(
        CreamUSDT.price +
          CreamDAI.price +
          CreamUSDC.price +
          CreamWETH.price +
          CreamLINK.price +
          CreamCRV.price +
          Creamv2.price +
          CreamUNI.price +
          CreamSUSHI.price
      )
    );
  }, [
    CreamUSDT.price,
    CreamDAI.price,
    CreamUSDC.price,
    CreamWETH.price,
    CreamLINK.price,
    CreamCRV.price,
    Creamv2.price,
    CreamUNI.price,
    CreamSUSHI.price,
  ]);

  const IronBankLayout = (item) => {
    return (
      <div>
        {parseFloat(item.price) ? (
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
      {IronBankLayout(CreamUSDT)}
      {IronBankLayout(CreamDAI)}
      {IronBankLayout(CreamUSDC)}
      {IronBankLayout(CreamWETH)}
      {IronBankLayout(CreamLINK)}
      {IronBankLayout(CreamUNI)}
      {IronBankLayout(CreamSUSHI)}
      {IronBankLayout(Creamv2)}
      {IronBankLayout(CreamCRV)}
    </div>
  );
}
