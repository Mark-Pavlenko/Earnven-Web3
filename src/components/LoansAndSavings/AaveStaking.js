/*
Purpose : This component is used to get stake token value from Aave Protocol
Version -----------Developed by 
 */
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
      console.log('AaveBalaceAmount', AaveBalaceAmount)
      setAaveBalanceAmt(AaveBalaceAmount)

      //get the Aave token USD price from aave api data pools
      await axios
        .get('https://aave-api-v2.aave.com/data/pools', {})
        .then(async (response) => {
          const AaveUsdPrice = response.data[0].price.usd
          const StakeCalcValue =
            parseInt(AaveUsdPrice) * parseFloat(AaveBalaceAmount)
          const statkeUSDValue = (StakeCalcValue / 10 ** 18).toLocaleString()
          console.log('Aave USD amount', AaveUsdPrice)
          console.log('Aave data', statkeUSDValue)
          setAaveUsdPrice(parseFloat(AaveUsdPrice).toFixed(3))
          setAaveAmountUSD(statkeUSDValue)
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
          display: AaveAmountUSD.length > 0 ? '' : 'none',
        }}
      >
        Aave Staking --- {AaveAmountUSD} USD
        <br /> <br />
        &nbsp;&nbsp;
        <img
          src={aaveLogo}
          style={{
            height: '30px',
            marginTop: '',
            display: 'inline-block',
            marginLeft: '5%',
          }}
          alt=""
        />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$1Aave &nbsp;&nbsp; {AaveUsdPrice}{' '}
        USD
        <br />
      </div>
    </div>
  )
}
