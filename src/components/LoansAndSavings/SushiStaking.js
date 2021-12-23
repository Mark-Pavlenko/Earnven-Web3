/** *********************************************************************************
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

*********************************************************************************** */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Addresses from '../../contractAddresses';
import SushiSwapLogo from '../../assets/icons/Sushiswap.webp';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function SushiStaking({ accountAddress }) {
  const [SLPTokenData, setSLPTokenData] = useState([]);
  const [SLPTokenTotalValue, setSLPTokenTotalValue] = useState(0);
  const [SLPTokenDataContent, setSLPTokenDataContent] = useState([]);

  const getEpoch = () => {
    const d = new Date();
    const day = d.getUTCDate();
    const month = d.getUTCMonth();
    const year = d.getUTCFullYear();
    const offset = new Date(year, month, day).getTimezoneOffset() * 60;
    const epoch = new Date(year, month, day).getTime() / 1000 - offset;
    return epoch;
  };

  const getSushiLpTokenImage = async (SLPContractAddress) => {
    const result = await axios.get(
      `https://api.coingecko.com/api/v3/coins/ethereum/contract/${SLPContractAddress}`,
      {}
    );
    const SLPImageUrl = result.data.image.thumb;
    return {
      SLPImageUrl: SLPImageUrl,
    };
  };

  //use the below function to get given SLP token volume and liquidity
  const getSushiLpTokenData = async (token0, token1) => {
    const epochDate = await getEpoch();

    try {
      const result = await axios.post(
        `https://gateway.thegraph.com/api/c9596ce7bc47f7544cc808c3881427ed/subgraphs/id/0x4bb4c1b0745ef7b4642feeccd0740dec417ca0a0-0`,
        {
          query: `{
                   pairDayDatas  (where:
                        {
                          token0 : "${token0}",
                          token1 : "${token1}",
                          date : ${epochDate}
                        } 
                        orderBy : date , 
                        orderDirection: desc
                      ) 
                      {
                        volumeUSD
                      }
                      pairs  
                        (where:
                        { token0 : "${token0}",
                          token1 : "${token1}"
                        } 
                        )  
                      {
                        
                        reserveUSD
                      }
                  }`,
        }
      );

      return result.data.data;
    } catch (err) {
      console.log('No data found for the give paired token');
    }
  };

  useEffect(() => {
    let sushiStakingtTotalValue = 0;
    async function getStakeData() {
      // use below query to get user staked list of pools w
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
            const res = response.data.data;

            const amount = [];
            const poolId = [];
            let sushiStaking = [];
            let slpTokenVolume = 0;
            let slpTokenLiquidity = 0;
            for (var i = 0; i < res.users.length; i++) {
              let object = {};
              //store this balanceOf amount for each pair in the arrayOf value as object
              amount[i] = response.data.data.users[i].amount;

              poolId[i] = response.data.data.users[i].pool.pair;

              // user below api / http request to get correspoing pair token mv
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
                                name
                                reserveUSD
                                totalSupply
                                volumeUSD
                                token0 {
                                  id
                                  name
                                  symbol
                                }
                                token1 {
                                  id
                                  name
                                  symbol
                                }
                              }
                      }`,
                  }
                )
                .then(async (pairResponse) => {
                  const pairData = pairResponse.data.data.pairs;

                  const SLPToken0ImageUrl = await getSushiLpTokenImage(pairData[0].token0.id);
                  const SLPToken1ImageUrl = await getSushiLpTokenImage(pairData[0].token1.id);
                  //get the volume and liquidity value of the sushi lp token
                  let SLPTokenData = await getSushiLpTokenData(
                    pairData[0].token0.id,
                    pairData[0].token1.id
                  );
                  //get the value if sushi lp token data is available
                  if (SLPTokenData) {
                    slpTokenVolume = SLPTokenData.pairDayDatas[0].volumeUSD;
                    slpTokenLiquidity = SLPTokenData.pairs[0].reserveUSD;
                  }

                  const sushiStakeAmount = parseInt(amount[i]) / 10 ** 18;
                  const sushiTokenPrice =
                    parseInt(pairData[0].reserveUSD) / parseInt(pairData[0].totalSupply);

                  object.sushiLpTokenSymbol = pairData[0].name;
                  object.sushiLpTokenBalance = parseFloat(sushiStakeAmount).toFixed(2);
                  object.sushiLpTokenPrice = parseFloat(sushiTokenPrice).toFixed(2);
                  object.sushiLpTokenValue = parseFloat(
                    object.sushiLpTokenBalance * object.sushiLpTokenPrice
                  ).toFixed(2);
                  object.sushiLpTokenVolume = parseFloat(slpTokenVolume).toFixed(2);
                  object.sushiLpTokenLiquidity = parseInt(slpTokenLiquidity).toFixed(2);
                  object.sushiLPToken0ImageUrl = SLPToken0ImageUrl;
                  object.sushiLPToken1ImageUrl = SLPToken1ImageUrl;
                  object.sushiLpProtocol = 'Ethereum';
                  object.sushiLpChain = 'SushiSwap';
                  sushiStakingtTotalValue += parseFloat(object.sushiLpTokenValue);
                  sushiStaking.push(object);
                })
                .catch((error) => {
                  console.log('Sushi staking process Error message', error);
                });
            } //end of for loop

            setSLPTokenData(sushiStaking);
            setSLPTokenTotalValue(sushiStakingtTotalValue);
            sushiStaking = [];

            slpTokenVolume = 0;
            slpTokenLiquidity = 0;
            sushiStakingtTotalValue = 0;
          }
        })
        .catch((error) => console.log('Error message-', error));
    }
    getStakeData();
  }, [accountAddress]);

  //use below process to fetch slp token data to intergrate in UI
  useEffect(() => {
    if (SLPTokenData.length > 0) {
      try {
        var content = SLPTokenData.map((object) => (
          <Accordion
            style={{
              background: 'transparent',
              marginRight: '1px',
              color: 'black',
              width: '100%',
              border: '1px',
              borderColor: 'black',
              borderStyle: 'hidden', //solid
            }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <React.Fragment
                style={{
                  display: 'inline-block',
                  width: '100%',
                  //textAlign: 'left',
                  wordBreak: 'break-all',
                }}>
                <React.Fragment>
                  <img
                    style={{
                      height: '20px',
                      width: '20px',
                      display: 'inline-block',
                    }}
                    src={object.sushiLPToken0ImageUrl.SLPImageUrl}
                    alt=""
                  />
                  <img
                    style={{
                      height: '20px',
                      width: '20px',
                      display: 'inline-block',
                    }}
                    src={object.sushiLPToken1ImageUrl.SLPImageUrl}
                    alt=""
                  />
                </React.Fragment>
                {object.sushiLpTokenSymbol}&nbsp;
                {parseFloat(object.sushiLpTokenValue).toLocaleString()} USD
              </React.Fragment>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ display: 'inline-block', width: '70%', fontSize: '12px' }}>
                Staked token &nbsp;&nbsp; {object.sushiLpTokenSymbol}
                <br />
                Balance &nbsp; {object.sushiLpTokenBalance}
                <br />
                Price &nbsp;&nbsp;&nbsp;&nbsp;${object.sushiLpTokenPrice}
                <br />
                Value &nbsp;&nbsp;&nbsp;&nbsp;$
                {parseFloat(object.sushiLpTokenValue).toLocaleString()}
                <br />
                Volume &nbsp;&nbsp;&nbsp;&nbsp;$
                {parseFloat(object.sushiLpTokenVolume).toLocaleString()}
                <br />
                Liquidity &nbsp;&nbsp;&nbsp;&nbsp;$
                {parseFloat(object.sushiLpTokenLiquidity).toLocaleString()}
                <br />
                Chain &nbsp;&nbsp;&nbsp;&nbsp; {object.sushiLpProtocol}
                <br />
                Protocol &nbsp;&nbsp; {object.sushiLpChain}
              </div>
            </AccordionDetails>
          </Accordion>
        ));
      } catch (err) {
        console.log('No Curve LP token data found');
      }
    }
    setSLPTokenDataContent(content);
  }, [SLPTokenData]);

  return (
    <React.Fragment>
      <div
        style={{
          fontSize: '15px',
          marginRight: '15px',
          display: SLPTokenData.length > 0 ? '' : 'none',
        }}>
        <img
          src={SushiSwapLogo}
          style={{
            height: '30px',
            marginTop: '',
            marginLeft: '15px',
            display: 'inline-block',
          }}
          alt=""
        />
        Sushi staking -- {SLPTokenTotalValue.toLocaleString()} USD
        {SLPTokenDataContent}
      </div>
      <br />
    </React.Fragment>
  );
}
