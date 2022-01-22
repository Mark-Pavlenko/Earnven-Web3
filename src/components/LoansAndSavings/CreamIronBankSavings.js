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
import Investment from '../common/investment/investment';
import { useDispatch } from 'react-redux';
import { setCreamIronBankTotal } from '../../store/creamIronBank/actions';

export default function CreamIronBank({ accountAddress }) {
  const dispatch = useDispatch();
  const [TotalSavings, setTotalSavings] = useState(0);
  console.log('TotalSavings', TotalSavings);
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
  const tokensArray = [
    CreamUSDT,
    CreamDAI,
    CreamUSDC,
    CreamWETH,
    CreamLINK,
    CreamUNI,
    CreamSUSHI,
    CreamCRV,
    Creamv2,
    CreamYFI,
    CreamSNX,
    CreamWBTC,
    CreamSUSD,
    CreamMUSD,
    CreamEURS,
    CreamSEUR,
    CreamDPI,
    CreamAAVE,
    CreamMIM,
  ];
  const filteredTokensArray = tokensArray.filter((el) => el.totalValue > 0);
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
              totalValue: parseFloat(IronBankUSDPrice),
              image: data.image.thumb,
              price: tokenPrice,
              balance: tokenAmount,
              protocol: 'Cream Iron Bank',
              chain: 'Ethereum',
            });
          } else {
            setToken({
              tokenName: '',
              symbol: '',
              totalValue: 0,
              image: '',
              price: 0,
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
        totalValue: 0,
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
    setTotalSavings(
      parseFloat(
        CreamUSDT.totalValue +
          CreamDAI.totalValue +
          CreamUSDC.totalValue +
          CreamWETH.totalValue +
          CreamLINK.totalValue +
          CreamCRV.totalValue +
          Creamv2.totalValue +
          CreamUNI.totalValue +
          CreamSUSHI.totalValue +
          CreamYFI.totalValue +
          CreamSNX.totalValue +
          CreamWBTC.totalValue +
          CreamSUSD.totalValue +
          CreamMUSD.totalValue +
          CreamEURS.totalValue +
          CreamSEUR.totalValue +
          CreamDPI.totalValue +
          CreamAAVE.totalValue +
          CreamMIM.totalValue
      )
    );
  }, [
    CreamUSDT.totalValue,
    CreamDAI.totalValue,
    CreamUSDC.totalValue,
    CreamWETH.totalValue,
    CreamLINK.totalValue,
    CreamCRV.totalValue,
    Creamv2.totalValue,
    CreamUNI.totalValue,
    CreamSUSHI.totalValue,
    CreamYFI.totalValue,
    CreamSNX.totalValue,
    CreamWBTC.totalValue,
    CreamSUSD.totalValue,
    CreamMUSD.totalValue,
    CreamEURS.totalValue,
    CreamSEUR.totalValue,
    CreamDPI.totalValue,
    CreamAAVE.totalValue,
    CreamMIM.totalValue,
  ]);

  const IronBankLayout = (item) => {
    return (
      <div>
        {parseFloat(item.totalValue) > 0 ? (
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
                {item.symbol} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
                {numberWithCommas(item.totalValue)} USD
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
                {numberWithCommas(item.price.toFixed(2))} USD
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

  IronBankLayout(CreamUSDT);
  IronBankLayout(CreamDAI);
  IronBankLayout(CreamUSDC);
  IronBankLayout(CreamWETH);
  IronBankLayout(CreamLINK);
  IronBankLayout(CreamUNI);
  IronBankLayout(CreamSUSHI);
  IronBankLayout(Creamv2);
  IronBankLayout(CreamCRV);
  IronBankLayout(CreamYFI);
  IronBankLayout(CreamSNX);
  IronBankLayout(CreamWBTC);
  IronBankLayout(CreamSUSD);
  IronBankLayout(CreamMUSD);
  IronBankLayout(CreamEURS);
  IronBankLayout(CreamSEUR);
  IronBankLayout(CreamDPI);
  IronBankLayout(CreamAAVE);
  IronBankLayout(CreamMIM);

  // const result = filteredTokensArray.reduce((el, acc) => {
  //   return el + +acc.totalValue;
  // }, 0);
  // getTotalValue(result);
  return (
    <div>
      {filteredTokensArray &&
        filteredTokensArray.map((object, index) => {
          return <Investment key={index} protocol={object} logoImage={object.image} />;
        })}
    </div>
  );
}
