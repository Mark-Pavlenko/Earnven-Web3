/***********************************************************************************
Purpose : This component is used to get pools data value from Bancor Protocol
Developed by : Lakshya Kumar
Version log:
----------------------------------------------------------------------------------
Version           Date                         Description
---------------------------------------------------------------------------------
1.0               29/dec/2021                   Initial Development

************************************************************************************/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tooltip from '@material-ui/core/Tooltip';

export default function BancorPools({ setPoolTotal, accountAddress, setDisplay }) {
  const [BancorPoolsData, setBancorPoolsData] = useState([]); // bancor
  const [BancorPoolsContent, setBancorPoolsContent] = useState([]); // bancor
  const [BancorTotal, setBancorTotal] = useState(0); // Bancor Total

  const numberWithCommas = (x) => {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, '$1,$2');
    return x;
  };

  async function getBancorData() {
    setBancorPoolsData([]);
    await axios
      .post(`https://api.thegraph.com/subgraphs/name/blocklytics/bancor`, {
        query: `{
                  users
                  (
                    where:{
                      id:"${accountAddress}"
                    }
                  )
                  {
                    id
                    smartTokenBalances{
                      smartToken{
                        id
                        name
                        symbol
                        decimals
                      }
                      balance
                    }
                  }
                }`,
      })
      .then(async (response) => {
        if (response.data.data.users[0]) {
          const res = response.data.data.users[0].smartTokenBalances;
          const pools = [];
          for (var i = 0; i < res.length; i++) {
            await axios
              .get(
                `https://api.coingecko.com/api/v3/coins/ethereum/contract/${res[i].smartToken.id}`,
                {},
                {}
              )
              .then(async ({ data }) => {
                res[i].image = data.image.thumb;
              })
              .catch((err) => {
                console.log(err);
              });

            await axios
              .get(`https://api-v2.bancor.network/pools`)
              .then(async ({ data }) => {
                let pool = data.data.filter((item) => {
                  return item.symbol === res[i].smartToken.symbol;
                });
                res[i].type = 'Token';
                if (pool.length > 0) {
                  res[i].type = 'USD';
                  res[i].usdPrice = parseFloat(pool[0].liquidity.usd) / parseFloat(pool[0].supply);
                  res[i].liquidity = pool[0].liquidity.usd;
                  res[i].supply = pool[0].supply;
                  res[i].dlt = pool[0].dlt_type;
                  res[i].token1 = pool[0].reserves[0].symbol;
                  res[i].token2 = pool[0].reserves[1].symbol;
                }
              })
              .catch((err) => {});

            const object = {};
            object.name = res[i].smartToken.name;
            object.value = !res[i].usdPrice
              ? parseFloat(res[i].balance / 10 ** res[i].smartToken.decimals).toFixed(2)
              : parseFloat(
                  parseFloat(res[i].balance / 10 ** res[i].smartToken.decimals) * res[i].usdPrice
                ).toFixed(2);
            object.symbol = res[i].smartToken.symbol;
            object.image = res[i].image;
            object.valueType = res[i].type;
            object.price = res[i].usdPrice;
            object.liquidity = res[i].liquidity;
            object.supply = res[i].supply;
            object.dlt = res[i].dlt;
            object.token1 = res[i].token1;
            object.token2 = res[i].token2;
            if (parseFloat(object.value) > 0) {
              pools.push(object);
            }
          }
          setBancorPoolsData(pools);
        }
      });
  }

  useEffect(() => {
    setPoolTotal(BancorTotal);
    if (BancorPoolsData.length > 0) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
    setPoolTotal(BancorTotal);
  }, [BancorTotal, BancorPoolsData, accountAddress]);

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < BancorPoolsData.length; i++) {
      if (parseFloat(BancorPoolsData[i].value) > 0 && BancorPoolsData[i].valueType === 'USD') {
        total = parseFloat(total) + parseFloat(BancorPoolsData[i].value);
      }
    }
    setBancorTotal(total);
    setPoolTotal(total);
  }, [BancorPoolsData, accountAddress]);

  useEffect(() => {
    const content = BancorPoolsData.map((object) => (
      // ******************************************** To be removed in the future tasks, font color is changed just to make the font visible in the dark background *************************************
      <div style={{ color: 'grey' }}>
        <Tooltip
          title={
            <>
              {object.name} <br />
              {/* Token Price : {parseFloat(object.price).toFixed(4)} USD <br/>
              Total Tokens : {object.value} ${object.symbol} <br/>
              Total Investment : {object.totalInvestment} USD */}
            </>
          }>
          <div style={{ width: '90%', marginTop: '12px', marginLeft: '30px' }}>
            <div style={{ display: 'inline-block', width: '15%' }}>
              <div
                style={{
                  height: '40px',
                  padding: '5px',
                  borderRadius: '10px',
                  backgroundImage:
                    'linear-gradient(to right,  rgba(20,24,30,.1), rgba(173,204,151,.5), rgba(20,24,30,.1))',
                }}>
                <center>
                  <img src={object.image} style={{ height: '30px', marginTop: '' }} alt="" />
                </center>
              </div>
            </div>

            <div style={{ display: 'inline-block', width: '10%' }} />

            <div style={{ display: 'inline-block', width: '40%', textAlign: 'left' }}>
              ${object.symbol}
            </div>

            {/* <div style={{display:'inline-block', width:'30%'}}>
                {object.value} ${object.symbol}
            </div> */}

            <div style={{ display: 'inline-block', width: '30%', fontSize: '13px' }}>
              {numberWithCommas(object.value)} {object.valueType}
            </div>

            <br />
          </div>
        </Tooltip>
        <div
          style={{
            marginLeft: '10px',
            padding: '5px',
          }}>
          {object.price && (
            <div>
              <span> USD price : </span> {numberWithCommas(object.price.toFixed(2))}
            </div>
          )}
          {object.liquidity && (
            <div>
              <span> liquidity : </span> {numberWithCommas(parseFloat(object.liquidity).toFixed(2))}
            </div>
          )}
          {object.supply && (
            <div>
              <span> Supply : </span> {numberWithCommas(parseFloat(object.supply).toFixed(2))}
            </div>
          )}
          {object.dlt && (
            <div>
              <span> chain : </span> {object.dlt}
            </div>
          )}
          {object.token1 && (
            <div>
              <span> Token symbol: </span> {object.token1}
            </div>
          )}
          {object.token2 && (
            <div>
              <span> Token symbol : </span> {object.token2}
            </div>
          )}
        </div>
      </div>
    ));

    setBancorPoolsContent(content);
  }, [BancorPoolsData, accountAddress]);

  useEffect(() => {
    getBancorData();
  }, [accountAddress]);
  return (
    <div>
      <h1>BANCOR</h1>
      <div
        style={{
          fontSize: '12px',
          marginLeft: '15px',
          display: BancorPoolsData.length > 0 ? '' : 'none',
          // ******************************* To be removed in the future tasks, font color is changed just to make the font visible in the dark background ********************************
          color: 'grey',
        }}>
        {BancorTotal ? <span>Bancor --- {numberWithCommas(BancorTotal)} USD</span> : ''}
      </div>
      {BancorPoolsContent}
      <br />
    </div>
  );
}
