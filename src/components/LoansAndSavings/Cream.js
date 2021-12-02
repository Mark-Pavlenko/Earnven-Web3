/***********************************************************************************
Purpose : This component is used to get Depopsited token value from CREAM Protocol
Developed by : Lakshya Kumar
Version log:
----------------------------------------------------------------------------------
Version           Date                         Description
---------------------------------------------------------------------------------
1.0               02/Dec/2021                   Initial Development

************************************************************************************/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import addresses from '../../contractAddresses';

export default function Cream({ setTotal, setDisplay, accountAddress }) {
  const [CreamTokens, setCreamTokens] = useState([]);
  const [TotalCream, setTotalCream] = useState(0);

  const numberWithCommas = (x) => {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, '$1,$2');
    return x;
  };

  const getImage = async (token) => {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/ethereum/contract/${token.underlyingAddress}`,
      {},
      {}
    );
    return data.image.thumb;
  };

  useEffect(() => {
    async function getBlockchainData(accountAddress) {
      //get the Liquity token USD price from aave api data pools
      await axios
        .post(
          `https://gateway.thegraph.com/api/${addresses.graph_API}/subgraphs/id/0x197939c1ca20c2b506d6811d8b6cdb3394471074-0`,
          {
            query: `{
              accounts (
                          where:{
                            id:"${accountAddress}"  
                        }
                        ){
                id
                tokens {
                  symbol
                  cTokenBalance
                  totalUnderlyingSupplied
                  totalUnderlyingRedeemed
                  totalUnderlyingBorrowed
                  market {
                    borrowRate
                    exchangeRate
                    name
                    reserves
                    supplyRate
                    totalSupply
                    underlyingPrice
                    underlyingPriceUSD
                    underlyingDecimals
                    underlyingAddress
            }
                }
              }
            }
            `,
          }
        )
        .then(async (response) => {
          if (
            response.status === 200 &&
            response.data.data &&
            response.data.data.accounts.length > 0 &&
            response.data.data.accounts[0].tokens.length > 0
          ) {
            let tokens = response.data.data.accounts[0].tokens.map((item, index) => {
              let address;
              switch (item.symbol) {
                case 'crETH':
                  address = '0xcbc1065255cbc3ab41a6868c22d1f1c573ab89fd';
                  break;
                default:
                  address = item.market.underlyingAddress;
              }
              return {
                symbol: item.symbol,
                cTokenBalance: parseFloat(item.cTokenBalance).toFixed(2),
                name: item.market.name,
                usdPrice: parseFloat(item.market.underlyingPriceUSD).toFixed(2),
                totalSupplied: parseFloat(item.totalUnderlyingBorrowed).toFixed(2),
                totalRedeemed: parseFloat(item.totalUnderlyingRedeemed).toFixed(2),
                totalBorrowed: parseFloat(item.totalUnderlyingSupplied).toFixed(2),
                totalSuppliedvalue: (
                  parseFloat(item.totalUnderlyingSupplied) *
                  parseFloat(item.market.underlyingPriceUSD)
                ).toFixed(2),
                totalRedeemedValue: (
                  parseFloat(item.totalUnderlyingRedeemed) *
                  parseFloat(item.market.underlyingPriceUSD)
                ).toFixed(2),
                totalBorrowedValue: (
                  parseFloat(item.totalUnderlyingBorrowed) *
                  parseFloat(item.market.underlyingPriceUSD)
                ).toFixed(2),
                underlyingAddress: address,
                cTokenValue: (
                  parseFloat(item.cTokenBalance) * parseFloat(item.market.underlyingPriceUSD)
                ).toFixed(2),
                index: index,
                image: '',
              };
            });
            for (let i = 0; i < tokens.length; i++) {
              let image = await getImage(tokens[i]);
              tokens[i].image = image;
            }
            setCreamTokens(tokens);
          }
        });
    }
    getBlockchainData(accountAddress);
  }, [accountAddress]);

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < CreamTokens.length; i++) {
      total = parseFloat(total) + parseFloat(CreamTokens[i].cTokenValue);
    }
    setTotalCream(total);
  }, [CreamTokens]);

  useEffect(() => {
    setTotal(TotalCream);
    if (TotalCream > 0) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  }, [TotalCream]);

  const displayContent = () => {
    return CreamTokens.map((item, index) => {
      if (item.usdPrice == 0.0 || item.cTokenBalance == 0.0) {
        return null;
      }
      return (
        <div key={index}>
          <div>
            <img
              src={item.image}
              style={{
                height: '40px',
                marginTop: '1em',
                display: 'inline-block',
                marginLeft: '30px',
              }}
              alt=""
            />
            <div>
              <div
                style={{
                  fontSize: '13px',
                  display: 'inline-block',
                  marginLeft: '20px',
                }}>
                {item.symbol} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
                {numberWithCommas(item.cTokenValue)} USD
              </div>
              <div
                style={{
                  fontSize: '13px',
                  display: 'inline-block',
                  marginLeft: '20px',
                }}>
                {numberWithCommas(item.cTokenBalance)} &nbsp;Tokens
              </div>
              <div
                style={{
                  fontSize: '13px',
                  display: 'inline-block',
                  marginLeft: '20px',
                }}>
                usdPrice &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {numberWithCommas(item.usdPrice)} USD
              </div>
              <div
                style={{
                  fontSize: '13px',
                  display: 'inline-block',
                  marginLeft: '20px',
                }}>
                borrowed &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
                {numberWithCommas(item.totalBorrowedValue)} USD
              </div>
              <div
                style={{
                  fontSize: '13px',
                  display: 'inline-block',
                  marginLeft: '20px',
                }}>
                redeemed &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
                {numberWithCommas(item.totalRedeemedValue)} USD
              </div>
              <div
                style={{
                  fontSize: '13px',
                  display: 'inline-block',
                  marginLeft: '20px',
                }}>
                Supplied &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
                {numberWithCommas(item.totalSuppliedvalue)} USD
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      {TotalCream > 0 ? (
        <div>
          Cream Protocol ----------- {numberWithCommas(parseFloat(TotalCream).toFixed(2))} USD
        </div>
      ) : (
        ''
      )}
      {displayContent()}
    </div>
  );
}
