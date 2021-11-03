/** ***********************************************************************************************
Purpose : This component is used to get stake token value from Aave Protocol
Developed by : Prabhakaran.R
Version log:
--------------------------------------------------------------------------------------------------
Version           Date                         Description                    Developed by
--------------------------------------------------------------------------------------------------
1.0               8/Sep/2021                   Initial Development            Prabhakaran.R
1.1               2/Nov/2021                   To include stkABPT             Prabhakaran.R

**************************************************************************************************/
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import axios from 'axios';
import AaveStakingABI from '../../abi/AaveStakingContract.json';
import Addresses from '../../contractAddresses';
import aaveLogo from '../../assets/icons/aave-logo.png';

export default function AaveStaking({ accountAddress }) {
  const [AaveAmountUSD, setAaveAmountUSD] = useState(0);
  const [AaveUsdPrice, setAaveUsdPrice] = useState();
  const [AaveStkABPTAmountUSD, setAaveStkABPTAmountUSD] = useState(0);

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
  //This function is to get AaveStake value from the Aave Contract
  async function checkAaveStake(accountAddress, contractAddress) {
    await loadWeb3();
    const { web3 } = window;
    const AaveStakingContract = new web3.eth.Contract(AaveStakingABI, contractAddress);
    const AaveBalaceAmount = await AaveStakingContract.methods.balanceOf(accountAddress).call();
    return AaveBalaceAmount;
  }
  //use this hook function to get the Aave staking value for the given user
  useEffect(() => {
    async function getBlockchainData() {
      //Call the contract to get the value for staked Aave
      const AaveBalaceAmount = await checkAaveStake(accountAddress, Addresses.aaveStakingV2);
      //call the contract to get the value from Staked Balancer LP
      const stkABPTBalance = await checkAaveStake(accountAddress, Addresses.aavestkABPT);
      // get the Aave token USD price from aave api data pools
      let statkeUSDValue;
      let stkABPTUSDValue;
      await axios
        .get('https://aave-api-v2.aave.com/data/pools', {})
        .then(async (response) => {
          //To get value for staked Aave
          if (AaveBalaceAmount != 0) {
            if (response.data[0].symbol === 'stkAAVE') {
              const AaveUsdPrice = response.data[0].price.usd;
              const stakeValue = AaveBalaceAmount / 10 ** 18;
              statkeUSDValue = AaveUsdPrice * stakeValue;
            }
          }
          //To get value for  Staked Balancer LP - stkABPT
          if (stkABPTBalance != 0) {
            if (response.data[1].symbol === 'stkABPT') {
              const AaveUsdPrice = response.data[1].price.usd;
              const stakeValue = stkABPTBalance / 10 ** 18;
              stkABPTUSDValue = AaveUsdPrice * stakeValue;
            }
          }
          //store the calc Aave staking value into state variable
          setAaveUsdPrice(parseFloat(AaveUsdPrice).toFixed(3));
          setAaveAmountUSD(statkeUSDValue.toLocaleString());
          setAaveStkABPTAmountUSD(stkABPTUSDValue.toLocaleString());
        })
        .catch((err) => {
          console.log('Error Message message', err);
        });
    }

    getBlockchainData();
  }, [accountAddress]);

  return (
    <div>
      {parseInt(AaveAmountUSD) || parseInt(AaveStkABPTAmountUSD) ? (
        <div>
          <div
            style={{
              fontSize: '12px',
              marginLeft: '15px',
            }}>
            Aave Staking ---{' '}
            {parseFloat(AaveStkABPTAmountUSD) > 0
              ? (parseFloat(AaveStkABPTAmountUSD) + parseFloat(AaveAmountUSD)).toLocaleString()
              : AaveAmountUSD.toLocaleString()}{' '}
            USD
          </div>
          <div>
            <img
              src={aaveLogo}
              style={{
                height: '30px',
                marginTop: '',
                display: 'inline-block',
                marginLeft: '20px',
              }}
              alt=""
            />
            <div
              style={{
                fontSize: '12px',
                display: 'inline-block',
                marginLeft: '15px',
              }}>
              <br />
              AAVE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {AaveAmountUSD} USD
              <br />
              {parseInt(AaveStkABPTAmountUSD) ? (
                <React.Fragment>
                  stkABPT &nbsp;&nbsp;&nbsp;&nbsp; {AaveStkABPTAmountUSD} USD
                </React.Fragment>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
