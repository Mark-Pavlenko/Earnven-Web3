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
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import actionTypes from '../../constants/actionTypes';

export default function CreamIronBank({ accountAddress, getTotal }) {
  const dispatch = useDispatch();
  const { account, activate, active, chainId, connector, deactivate, error, provider, setError } =
    useWeb3React();
  //logic implementing for web3 provider connection using web3 React hook
  async function getWeb3() {
    const provider = active ? await connector.getProvider() : ethers.getDefaultProvider();
    const web3 = new Web3(provider);
    return web3;
  }

  useEffect(() => {
    const getCreamIronBankData = async () => {
      const web3 = await getWeb3();

      const creamIronAttributes = { accountAddress: accountAddress, web3: web3 };
      try {
        dispatch({
          type: actionTypes.SET_CREAM_IRON_DATA,
          payload: creamIronAttributes,
        });
      } catch (error) {
        console.log('Dispatch error on Cream Iron Staking process error', error.message);
      }
    };
    getCreamIronBankData();
  }, [accountAddress]);

  async function checkCreamData(
    accountAddress,
    CreamABI,
    CreamIronBankAddress,
    coingecko_contract_address
  ) {
    const web3 = await getWeb3();
    const IronBankContract = new web3.eth.Contract(CreamABI, CreamIronBankAddress);
    const IronBankAmount = await IronBankContract.methods.balanceOf(accountAddress).call();
    const CreamSymbol = await IronBankContract.methods.symbol().call();
    const CreamDecimal = await IronBankContract.methods.decimals().call();
    const CreamTokenName = await IronBankContract.methods.name().call();
    let decimals;

    const tokenAmount = IronBankAmount / CreamDecimal;
    if (tokenAmount > 0) {
      await axios
        .get(`${coingecko_contract_address}`, {}, {})
        .then(async ({ data }) => {
          const tokenPrice = data.market_data.current_price.usd;
          const IronBankUSDPrice = (tokenAmount * tokenPrice).toFixed(2);
        })
        .catch((err) => {
          console.log('Error Message message', err);
        });
    }
  }

  useEffect(() => {
    async function getCreamData(
      accountAddress,
      CreamABI,
      CreamIronBankAddress,
      coingecko_contract_address
    ) {
      const CreamAmount = await checkCreamData(
        accountAddress,
        CreamABI,
        CreamIronBankAddress,
        coingecko_contract_address
      );
    }
    // USDT
    getCreamData(accountAddress, CreamIronBankContract, Addresses.CreamCRUSDT, ApiUrl.USDT);
    // DAI
    getCreamData(accountAddress, CreamIronBankContract, Addresses.CreamCRDAI, ApiUrl.DAI);
    // USDC
    getCreamData(accountAddress, CreamIronBankContract, Addresses.CreamCRUSDC, ApiUrl.USDC);
    // WETH
    getCreamData(accountAddress, CreamIronBankContract, Addresses.CreamCWETH, ApiUrl.ETH);
    // LINK
    getCreamData(accountAddress, CreamIronBankContract, Addresses.CreamCLINK, ApiUrl.LINK);
    // CRV
    getCreamData(accountAddress, CreamIronBankContract, Addresses.CreamCCRV, ApiUrl.CRV);
    // CREAM
    getCreamData(accountAddress, CreamIronBankContract, Addresses.CreamCCream, ApiUrl.CREAM);
    // UNI
    getCreamData(accountAddress, CreamIronBankContract, Addresses.CreamCUNI, ApiUrl.UNI);
    // SUSHI
    getCreamData(accountAddress, CreamIronBankContract, Addresses.CreamCSUSHI, ApiUrl.SUSHI);
    // YFI
    getCreamData(accountAddress, CreamIronBankContract, Addresses.CreamCYFI, ApiUrl.YFI);
    // SNX
    getCreamData(accountAddress, CreamIronBankContract, Addresses.CreamCSNX, ApiUrl.SNX);
    // WBTC
    getCreamData(accountAddress, CreamIronBankContract, Addresses.CreamCWBTC, ApiUrl.WBTC);
    // SUSD
    getCreamData(accountAddress, CreamIronBankContract, Addresses.CreamCSUSD, ApiUrl.SUSD);
    // MUSD
    getCreamData(accountAddress, CreamIronBankContract, Addresses.CreamCMUSD, ApiUrl.MUSD);
    // EURS
    getCreamData(accountAddress, CreamIronBankContract, Addresses.CreamCEURS, ApiUrl.EURS);
    // SEUR
    getCreamData(accountAddress, CreamIronBankContract, Addresses.CreamCSEUR, ApiUrl.SEUR);
    // DPI
    getCreamData(accountAddress, CreamIronBankContract, Addresses.CreamCDPI, ApiUrl.DPI);
    // AAVE
    getCreamData(accountAddress, CreamIronBankContract, Addresses.CreamCAAVE, ApiUrl.AAVE);
    // MIM
    getCreamData(accountAddress, CreamIronBankContract, Addresses.CreamCMIM, ApiUrl.MIM);
    // // ZAR
    // getCreamData(
    //   accountAddress,
    //   CreamIronBankContract,
    //   Addresses.CreamCZAR,
    //   ApiUrl.Z,
    //   setCreamSUSHI
    // );
  }, [accountAddress]);

  return <></>;
}
