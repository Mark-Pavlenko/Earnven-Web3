/***********************************************************************************
Purpose : This component is used to get stake token value from Liquity Protocol
Developed by : Lakshya Kumar
Version log:
----------------------------------------------------------------------------------
Version           Date                         Description
---------------------------------------------------------------------------------
1.0               19/oct/2021                   Initial Development

************************************************************************************/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import addresses from '../../contractAddresses';

export default function LiquityStaking({ accountAddress }) {
  const [LiquityStakeAmountUSD, setLiquityStakeAmountUSD] = useState(0);
  const [LiquityLogo, setLiquityLogo] = useState('');
  const [LiquityStake, setLiquityStake] = useState(0);
  const [LiquitySymbol, setLiquitySymbol] = useState(null);

  async function getLiquityData(accountAddress) {
    await axios
      .post(
        `https://gateway.thegraph.com/api/${addresses.graph_API}/subgraphs/id/0x147676a5e327080386bcc227e103a73dd2979049-0`,
        {
          query: `{
            lqtyStakes (
              where:{
                id:"${accountAddress}"  
            }
            ){
              id
              amount
            }
          }`,
        }
      )
      .then(async (response) => {
        if (
          response.status === 200 &&
          response.data.data &&
          response.data.data.lqtyStakes.length > 0
        ) {
          console.log('Liquity staked amount: ', response.data.data.lqtyStakes[0].amount);
          setLiquityStake(response.data.data.lqtyStakes[0].amount);
        }
      });
  }

  useEffect(() => {
    async function getBlockchainData(accountAddress) {
      //get the Liquity token USD price from aave api data pools

      await axios
        .post(
          `https://gateway.thegraph.com/api/${addresses.graph_API}/subgraphs/id/0x147676a5e327080386bcc227e103a73dd2979049-0`,
          {
            query: `{
            lqtyStakes (
              where:{
                id:"${accountAddress}"  
            }
            ){
              id
              amount
            }
          }`,
          }
        )
        .then(async (response) => {
          if (
            response.status === 200 &&
            response.data.data &&
            response.data.data.lqtyStakes.length > 0
          ) {
            console.log('Liquity staked amount: ', response.data.data.lqtyStakes[0].amount);
            setLiquityStake(response.data.data.lqtyStakes[0].amount);
            await axios
              .get(
                `https://api.coingecko.com/api/v3/coins/ethereum/contract/0x6dea81c8171d0ba574754ef6f8b412f2ed88c54d`,
                {}
              )
              .then(async ({ data }) => {
                const LiquityUsdPrice = data.market_data.current_price.usd;
                console.log('Liquity USD price: ', LiquityUsdPrice);
                const stakeUSDValue = LiquityUsdPrice * response.data.data.lqtyStakes[0].amount;
                console.log('Liquity Staking Value in USD', stakeUSDValue);
                setLiquityStakeAmountUSD(stakeUSDValue.toLocaleString());
                setLiquityLogo(data.image.thumb);
              })
              .catch((err) => {
                console.log('Error Message message', err);
              });
          }
        });
    }
    getBlockchainData(accountAddress);
  }, [accountAddress, LiquityStakeAmountUSD]);

  return (
    <div>
      <h1>LIQUITY</h1>
      {parseInt(LiquityStakeAmountUSD) ? (
        <div>
          <div
            style={{
              fontSize: '12px',
              marginLeft: '15px',
            }}>
            Liquity Staking --- {LiquityStakeAmountUSD} USD
          </div>
          <div>
            <img
              src={LiquityLogo}
              style={{
                height: '40px',
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
                marginLeft: '20px',
              }}>
              LQTY &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {LiquityStakeAmountUSD} USD
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
