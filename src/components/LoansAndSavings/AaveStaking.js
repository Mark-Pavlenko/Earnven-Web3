/***********************************************************************************
Purpose : This component is used to get stake token value from Aave Protocol
Developed by : Prabhakaran.R
Version log:
----------------------------------------------------------------------------------
Version           Date                         Description
---------------------------------------------------------------------------------
1.0               8/Sep/2021                   Initial Development

************************************************************************************/
import React, { useEffect, useState } from 'react'
import AaveStakingABI from '../../abi/AaveStakingContract.json'
import Addresses from '../../contractAddresses'
import Web3 from 'web3'
import axios from 'axios'
import aaveLogo from '../../assets/icons/aave-logo.png'

export default function AaveStaking({ accountAddress }) {
  const [AaveAmountUSD, setAaveAmountUSD] = useState(0)
  const [AaveUsdPrice, setAaveUsdPrice] = useState()
  const [AaveBalanceAmt, setAaveBalanceAmt] = useState()

  //const accountAddress = '0xc75a5f6add3763942631e1d41ba7024a36978779'

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!',
      )
    }
  }

  async function checkAaveStake(accountAddress) {
    await loadWeb3()
    const web3 = window.web3
    const AaveStakingContract = new web3.eth.Contract(
      AaveStakingABI,
      Addresses.aaveStakingV2,
    )
    var AaveBalaceAmount = await AaveStakingContract.methods
      .balanceOf(accountAddress)
      .call()
    //console.log('AaveStakingContract-', AaveStakingContract)

    return AaveBalaceAmount
  }

  useEffect(() => {
    async function getBlockchainData() {
      const AaveBalaceAmount = await checkAaveStake(accountAddress)
      console.log('AaveTotalStake', AaveBalaceAmount)
      setAaveBalanceAmt(AaveBalaceAmount)

      //get the Aave token USD price from aave api data pools
      await axios
        .get('https://aave-api-v2.aave.com/data/pools', {})
        .then(async (response) => {
          const AaveUsdPrice = response.data[0].price.usd
          const stakeValue = AaveBalaceAmount / 10 ** 18

          const statkeUSDValue = AaveUsdPrice * stakeValue
          console.log('Aave USD Price', AaveUsdPrice.toFixed(3))
          console.log('Aave Staking Value in USD', statkeUSDValue)
          setAaveUsdPrice(parseFloat(AaveUsdPrice).toFixed(3))
          setAaveAmountUSD(statkeUSDValue.toLocaleString())
        })
        .catch((err) => {
          console.log('Error Message message', err)
        })
    }

    getBlockchainData()
  }, [accountAddress])

  return (
    <div>
      <div
        style={{
          fontSize: '12px',
          marginLeft: '15px',
        }}
      >
        Aave Staking --- {AaveAmountUSD} USD
      </div>

      <div>
        <img
          src={aaveLogo}
          style={{
            height: '30px',
            marginTop: '',
            display: 'inline-block',
            marginLeft: '15px',
          }}
          alt=""
        />
        <div
          style={{
            fontSize: '12px',
            display: 'inline-block',
            marginLeft: '15px',
          }}
        >
          $stkAAVE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {AaveAmountUSD} USD
        </div>
      </div>
      {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$1Aave &nbsp;&nbsp; {AaveUsdPrice}{' '}
        USD */}
    </div>
  )
}
