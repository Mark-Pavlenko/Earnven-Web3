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
  const [CreamYFI, setCreamYFI] = useState({});
  const [CreamSNX, setCreamSNX] = useState({});
  const [CreamWBTC, setCreamWBTC] = useState({});
  const [CreamSUSD, setCreamSUSD] = useState({});
  const [CreamMUSD, setCreamMUSD] = useState({});
  const [CreamEURS, setCreamEURS] = useState({});
  const [CreamSEUR, setCreamSEUR] = useState({});
  const [CreamDPI, setCreamDPI] = useState({});
  const [CreamAAVE, setCreamAAVE] = useState({});
  const [CreamMIM, setCreamMIM] = useState({});
  const [CreamZAR, setCreamZAR] = useState({});

  const numberWithCommas = (x) => {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, '$1,$2');
    return x;
  };

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
      case 'cyLINK':
        decimals = 10 ** 14;
        break;
      case 'cyYFI':
        decimals = 10 ** 13;
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
              pricePerToken: tokenPrice,
              balance: tokenAmount,
              protocol: 'Cream Iron Bank',
            });
          } else {
            setToken({
              tokenName: '',
              symbol: '',
              price: 0,
              image: '',
              pricePerToken: 0,
              balance: 0,
              protocol: '',
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
    // USDT
    getCreamData(
      accountAddress,
      CreamIronBankContract,
      Addresses.CreamCRUSDT,
      ApiUrl.USDT,
      setCreamUSDT
    );
    // DAI
    getCreamData(
      accountAddress,
      CreamIronBankContract,
      Addresses.CreamCRDAI,
      ApiUrl.DAI,
      setCreamDAI
    );
    // USDC
    getCreamData(
      accountAddress,
      CreamIronBankContract,
      Addresses.CreamCRUSDC,
      ApiUrl.USDC,
      setCreamUSDC
    );
    // WETH
    getCreamData(
      accountAddress,
      CreamIronBankContract,
      Addresses.CreamCWETH,
      ApiUrl.ETH,
      setCreamWETH
    );
    // LINK
    getCreamData(
      accountAddress,
      CreamIronBankContract,
      Addresses.CreamCLINK,
      ApiUrl.LINK,
      setCreamLINK
    );
    // CRV
    getCreamData(
      accountAddress,
      CreamIronBankContract,
      Addresses.CreamCCRV,
      ApiUrl.CRV,
      setCreamCRV
    );
    // CREAM
    getCreamData(
      accountAddress,
      CreamIronBankContract,
      Addresses.CreamCCream,
      ApiUrl.CREAM,
      setCreamv2
    );
    // UNI
    getCreamData(
      accountAddress,
      CreamIronBankContract,
      Addresses.CreamCUNI,
      ApiUrl.UNI,
      setCreamUNI
    );
    // SUSHI
    getCreamData(
      accountAddress,
      CreamIronBankContract,
      Addresses.CreamCSUSHI,
      ApiUrl.SUSHI,
      setCreamSUSHI
    );
    // YFI
    getCreamData(
      accountAddress,
      CreamIronBankContract,
      Addresses.CreamCYFI,
      ApiUrl.YFI,
      setCreamYFI
    );
    // SNX
    getCreamData(
      accountAddress,
      CreamIronBankContract,
      Addresses.CreamCSNX,
      ApiUrl.SNX,
      setCreamSNX
    );
    // WBTC
    getCreamData(
      accountAddress,
      CreamIronBankContract,
      Addresses.CreamCWBTC,
      ApiUrl.WBTC,
      setCreamWBTC
    );
    // SUSD
    getCreamData(
      accountAddress,
      CreamIronBankContract,
      Addresses.CreamCSUSD,
      ApiUrl.SUSD,
      setCreamSUSD
    );
    // MUSD
    getCreamData(
      accountAddress,
      CreamIronBankContract,
      Addresses.CreamCMUSD,
      ApiUrl.MUSD,
      setCreamMUSD
    );
    // EURS
    getCreamData(
      accountAddress,
      CreamIronBankContract,
      Addresses.CreamCEURS,
      ApiUrl.EURS,
      setCreamEURS
    );
    // SEUR
    getCreamData(
      accountAddress,
      CreamIronBankContract,
      Addresses.CreamCSEUR,
      ApiUrl.SEUR,
      setCreamSEUR
    );
    // DPI
    getCreamData(
      accountAddress,
      CreamIronBankContract,
      Addresses.CreamCDPI,
      ApiUrl.DPI,
      setCreamDPI
    );
    // AAVE
    getCreamData(
      accountAddress,
      CreamIronBankContract,
      Addresses.CreamCAAVE,
      ApiUrl.AAVE,
      setCreamAAVE
    );
    // MIM
    getCreamData(
      accountAddress,
      CreamIronBankContract,
      Addresses.CreamCMIM,
      ApiUrl.MIM,
      setCreamMIM
    );
    // // ZAR
    // getCreamData(
    //   accountAddress,
    //   CreamIronBankContract,
    //   Addresses.CreamCZAR,
    //   ApiUrl.Z,
    //   setCreamSUSHI
    // );
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
          CreamSUSHI.price +
          CreamYFI.price +
          CreamSNX.price +
          CreamWBTC.price +
          CreamSUSD.price +
          CreamMUSD.price +
          CreamEURS.price +
          CreamSEUR.price +
          CreamDPI.price +
          CreamAAVE.price +
          CreamMIM.price
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
    CreamYFI.price,
    CreamSNX.price,
    CreamWBTC.price,
    CreamSUSD.price,
    CreamMUSD.price,
    CreamEURS.price,
    CreamSEUR.price,
    CreamDPI.price,
    CreamAAVE.price,
    CreamMIM.price,
  ]);

  const IronBankLayout = (item) => {
    return (
      <div>
        {parseFloat(item.price) > 0 ? (
          <div>
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
                {item.symbol} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {numberWithCommas(item.price)}{' '}
                USD
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: '13px',
                  display: 'inline-block',
                  marginLeft: '30px',
                }}>
                Tokens: {numberWithCommas(item.balance.toFixed(2))} &nbsp; Price:{' '}
                {numberWithCommas(item.pricePerToken.toFixed(2))} USD
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
      <div
        style={{
          fontSize: '12px',
          marginLeft: '15px',
          display: TotalSavings ? '' : 'none',
        }}>
        Cream Iron Bank --- {numberWithCommas(TotalSavings.toFixed(2))} USD
      </div>
      <div
        style={{
          fontSize: '12px',
          marginLeft: '15px',
          display: TotalSavings ? '' : 'none',
        }}>
        <span> Network </span> : <span> Ethereum </span>
      </div>
      {IronBankLayout(CreamUSDT)}
      {IronBankLayout(CreamDAI)}
      {IronBankLayout(CreamUSDC)}
      {IronBankLayout(CreamWETH)}
      {IronBankLayout(CreamLINK)}
      {IronBankLayout(CreamUNI)}
      {IronBankLayout(CreamSUSHI)}
      {IronBankLayout(Creamv2)}
      {IronBankLayout(CreamCRV)}
      {IronBankLayout(CreamYFI)}
      {IronBankLayout(CreamSNX)}
      {IronBankLayout(CreamWBTC)}
      {IronBankLayout(CreamSUSD)}
      {IronBankLayout(CreamMUSD)}
      {IronBankLayout(CreamEURS)}
      {IronBankLayout(CreamSEUR)}
      {IronBankLayout(CreamDPI)}
      {IronBankLayout(CreamAAVE)}
      {IronBankLayout(CreamMIM)}
    </div>
  );
}
