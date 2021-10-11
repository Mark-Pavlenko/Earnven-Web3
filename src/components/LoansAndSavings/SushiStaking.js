/***********************************************************************************
Purpose : This component is used to get stake token value from Sushi Protocol
Developed by : Prabhakaran.R
procedures/packages/components used in this process
1)Using the graph sushi api materChef to get users staked list of pools
    https://api.thegraph.com/subgraphs/name/sushiswap/master-chef

Version log:
----------------------------------------------------------------------------------
Version           Date                         Description
---------------------------------------------------------------------------------
1.0               8/Sep/2021                   Initial Development

************************************************************************************/
import React, { useEffect, useState } from 'react'
import Addresses from '../../contractAddresses'
import axios from 'axios'
import SushiSwapLogo from '../../assets/icons/Sushiswap.webp'

export default function SushiStaking({ accountAddress }) {
  const [SushiAmountUSD, setSushiAmountUSD] = useState(0)
  //const [sushiUsdPrice, setAaveUsdPrice] = useState()
  //const [sushiBalanceAmt, setAaveBalanceAmt] = useState()

  //const accountAddress = '0xc75a5f6add3763942631e1d41ba7024a36978779'

  useEffect(() => {
    async function getStakeData() {
      //use below query to get user staked list of pools w
      await axios
        .post('https://api.thegraph.com/subgraphs/name/sushiswap/master-chef', {
          query: `
          {
                users (where :{
                            address :"${accountAddress}",
                            pool_not : null
                      })
                {
                    id
                    address
                    amount
                    pool 
                    {
                        id
                        pair
                        balance
                    }
                }
            }`,
        })
        .then(async (response) => {
          if (response.data.data) {
            const res = response.data.data
            //console.log('Sushi response', res)
            //console.log('Sushi data length', res.users.length)
            const amount = []
            const poolId = []
            let sushiStakingValue = 0
            for (var i = 0; i < res.users.length; i++) {
              amount[i] = response.data.data.users[i].amount
              poolId[i] = response.data.data.users[i].pool.pair

              //console.log('start fetching from sushi mainnet token value')

              //console.log('Sushi data', amount[i])
              //user below api / http request to get correspoing pair token mv
              await axios
                .post(
                  `https://gateway.thegraph.com/api/c9596ce7bc47f7544cc808c3881427ed/subgraphs/id/0x4bb4c1b0745ef7b4642feeccd0740dec417ca0a0-0`,
                  {
                    query: `{
                        pairs
                              (where:
                                  { id : "${poolId[i]}"
                               })
                              {
                                  reserveUSD
                                  totalSupply
                              }
                      }`,
                  },
                )
                .then(async (pairResponse) => {
                  let pairData = pairResponse.data.data.pairs
                  //console.log('Sushi pair data', pairData)
                  let sushiStakeAmount = parseInt(amount[i]) / 10 ** 18
                  let sushiTokenValue =
                    parseInt(pairData[0].reserveUSD) /
                    parseInt(pairData[0].totalSupply)
                  sushiStakingValue += sushiStakeAmount * sushiTokenValue
                  //console.log('Sushi Staking value', sushiStakingValue)
                  console.log('Sushi pair data', sushiTokenValue.toFixed(2))
                  console.log('Sushi amount', sushiStakeAmount.toFixed(2))

                  //console.log('Sushi Token Value', sushiTokenValue)
                  //pairResponse = null
                })
                .catch((error) => {
                  console.log('Error message', error)
                })
            }
            const sushiStake = parseFloat(sushiStakingValue).toFixed(2)
            console.log(
              'Sushi Staking value',
              parseFloat(sushiStakingValue).toFixed(2),
            )
            setSushiAmountUSD(parseFloat(sushiStake).toLocaleString())
            // console.log('Sushi amount', amount)
            //console.log('Sushi Pool', poolId)
          }
        })
        .catch((error) => console.log('Error message-', error))
    }
    getStakeData()
  }, [accountAddress])

  return (
    <div>
      {parseInt(SushiAmountUSD) ? (
        <div>
          <div
            style={{
              fontSize: '12px',
              marginLeft: '15px',
            }}
          >
            Sushi Staking --- {SushiAmountUSD} USD
          </div>

          <div>
            <img
              src={SushiSwapLogo}
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
              Sushi &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {SushiAmountUSD} USD
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
