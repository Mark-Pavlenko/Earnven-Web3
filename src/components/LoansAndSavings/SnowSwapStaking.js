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
import SnowSwapABI from '../../abi/SnowSwapContract.json';
import axios from 'axios';
import SnowSwapLogo from '../../assets/icons/snowswap-snow-logo.svg';

export const SnowSwapStaking = ({ accountAddress }) => {
  const [StakeBalance, setStakeBalance] = useState();
  const [flag, setflag] = useState(false);
  const [USDStakeValue, setUSDStakeValue] = useState();
  const [finalValue, setfinalValue] = useState();
  const [finalClaim, setfinalClaim] = useState();
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
    try {
      var SnowSwapBalaceAmount = await SnowSwapStakingContract.methods
        .balanceOf(accountAddress)
        .call();
    } catch (errr) {
      console.log('calling method error', errr);
    }
    return SnowSwapBalaceAmount;
  }

  async function checkSnowSwapClaimStake() {
    await loadWeb3();
    const web3 = window.web3;
    const SnowSwapStakingContract = new web3.eth.Contract(SnowSwapABI, Addresses.snowSwap);
    try {
      var Claimable = await SnowSwapStakingContract.methods.earned(accountAddress).call();
    } catch (errr) {
      console.log('calling method error', errr);
    }
    return Claimable;
  }
  let balance = 0;
  let claimable = 0;
  useEffect(() => {
    checkSnowSwapStake();
    checkSnowSwapClaimStake();
    async function getBlockchainData() {
      const SnowSwapBalaceAmount = await checkSnowSwapStake(accountAddress);
      const Claimable = await checkSnowSwapClaimStake(accountAddress);
      // console.log('retunred values ---------', SnowSwapBalaceAmount[0]);
      await axios
        .get(
          `https://api.coingecko.com/api/v3/coins/ethereum/contract/0xfe9A29aB92522D14Fc65880d817214261D8479AE`
        )
        .then(async ({ data }) => {
          setUSDStakeValue(data.market_data.current_price.usd);
          console.log('SnowSwapTotalStake', SnowSwapBalaceAmount);
          SnowSwapBalaceAmount !== 0 && setStakeBalance(SnowSwapBalaceAmount);
          balance = USDStakeValue * (SnowSwapBalaceAmount / 10 ** 18);
          claimable = USDStakeValue * (Claimable / 10 ** 18);
          setfinalValue(parseFloat(balance).toFixed(2));
          setfinalClaim(parseFloat(claimable).toFixed(2));
          balance != 0 && setflag(true);
        })
        .catch((err) => {
          console.log('error', err);
        });
    }

    getBlockchainData();
  }, [accountAddress, finalValue, USDStakeValue]);

  return (
    <>
      <h1>SNOW SWAN</h1>
      <div>
        {finalValue && StakeBalance > 0 && flag && (
          <div>
            <div
              style={{
                fontSize: '12px',
                marginLeft: '15px',
              }}>
              SnowSwap Staking --- {finalValue} USD
            </div>
            <div>
              <tr>
                <td>
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
                  </div>
                </td>
                <td style={{ marginTop: '-10px' }}>
                  <div
                    style={{
                      fontSize: '12px',
                      display: 'inline-block',
                      marginLeft: '15px',
                    }}>
                    &nbsp;&nbsp;Snow
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
                    {finalValue} USD
                  </div>
                </td>
              </tr>

              <div
                style={{
                  fontSize: '12px',
                  display: 'inline-block',
                  marginLeft: '70px',
                }}>
                &nbsp;&nbsp; Claimable Snow &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {finalClaim} USD
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
