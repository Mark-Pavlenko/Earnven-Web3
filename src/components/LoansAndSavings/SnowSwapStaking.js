/***********************************************************************************
Purpose : This component is used to get stake token value from SnowSwap Protocol
Developed by : Sathyakrishna T
Version log:
----------------------------------------------------------------------------------
Version           Date                         Description
---------------------------------------------------------------------------------
1.0               19/oct/2021                   Initial Development
************************************************************************************/

import Web3 from 'web3';
import React, { useEffect, useState } from 'react';
import Addresses from '../../contractAddresses';
import SnowSwapABI from '../../abi/SnowSwapContratct.json';
import axios from 'axios';
import SnowSwapLogo from '../../assets/icons/snowswap-snow-logo.svg';

export const SnowSwapStaking = ({ accountAddress }) => {
  const [StakeBalance, setStakeBalance] = useState();
  const [flag, setflag] = useState(false);
  const [USDStakeValue, setUSDStakeValue] = useState();
  const [finalValue, setfinalValue] = useState();

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

  async function checkSnowSwapStake() {
    await loadWeb3();
    const web3 = window.web3;
    const SnowSwapStakingContract = new web3.eth.Contract(SnowSwapABI, Addresses.snowSwap);
    console.log('address of snowSwapStakeContract', Addresses.snowSwap);
    console.log('SnowSwapStakingContract-Contract', SnowSwapStakingContract);
    try {
      var SnowSwapBalaceAmount = await SnowSwapStakingContract.methods
        .balanceOf(accountAddress)
        .call();
      console.log('SnowSwapStakingContract-result', SnowSwapBalaceAmount);
    } catch (errr) {
      console.log('calling method error', errr);
    }
    return SnowSwapBalaceAmount;
  }
  let balance = 0;
  useEffect(() => {
    checkSnowSwapStake();
    async function getBlockchainData() {
      console.log('inside SnowSwap');
      const SnowSwapBalaceAmount = await checkSnowSwapStake(accountAddress);
      await axios
        .get(
          `https://api.coingecko.com/api/v3/coins/ethereum/contract/0xfe9A29aB92522D14Fc65880d817214261D8479AE`
        )
        .then(async ({ data }) => {
          console.log('usd price=', data.market_data.current_price.usd);
          setUSDStakeValue(data.market_data.current_price.usd);
          console.log('SnowSwapTotalStake', SnowSwapBalaceAmount);
          SnowSwapBalaceAmount !== 0 && setStakeBalance(SnowSwapBalaceAmount);
          balance = USDStakeValue * (SnowSwapBalaceAmount / 10 ** 18);
          setfinalValue(parseFloat(balance).toFixed(2));
          balance != 0 && setflag(true);
          console.log('final value', finalValue);
        })
        .catch((err) => {
          console.log('error', err);
        });
    }

    getBlockchainData();
  }, [accountAddress, finalValue]);

  return (
    <>
      <div>
        {finalValue && StakeBalance > 0 && flag ? (
          <div>
            <div
              style={{
                fontSize: '12px',
                marginLeft: '15px',
              }}>
              SnowSwap Staking --- {finalValue} USD
            </div>
            <div>
              <img
                src={SnowSwapLogo}
                style={{
                  height: '30px',
                  marginTop: '20px',
                  display: 'inline-block',
                  marginLeft: '30px',
                }}
                alt=""
              />
              <div
                style={{
                  fontSize: '12px',
                  display: 'inline-block',
                  marginLeft: '15px',
                }}>
                &nbsp;&nbsp;Snowstorm
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
                {finalValue} USD
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
};
