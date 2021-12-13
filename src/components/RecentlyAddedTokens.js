/** ****************************************************************************************************
Purpose : This component is used to get list of newly added tokens from Coin Market Cap(CMC) using API
Developed by : Prabhakaran.R
Version log:
-------------------------------------------------------------------------------------------------------
Version           Date                         Description                    Developed by
--------------------------------------------------------------------------------------------------
1.0               8/Nov/2021                   Initial Development            Prabhakaran.R

******************************************************************************************************/
import React from 'react';
import rp from 'request-promise';

export default async function RecentAddedTokens() {
  let newTokensList;
  try {
    newTokensList = {
      method: 'GET',

      ////this uri is used to get recently added tokens
      //use this url just for testing with domain-name/endpoints
      //'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest ',
      uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest ',
      qs: {
        start: '1',
        limit: '5',

        sort: 'date_added',
        sort_dir: 'desc',
      },
      headers: {
        'X-CMC_PRO_API_KEY': 'cb24b7c2-395b-43f2-955c-b392650c61d4',
        'Access-Control-Allow-Origin': '*',
        //'X-CMC_PRO_API_KEY': 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c', //test key/sample data from API
      },
      json: true,
      // gzip: true,
    };
    console.log('url request using keys', newTokensList);
  } catch (err) {
    console.log('Error Message from CMC API fetch process', err.message);
  }

  const recentTokenData = [];
  try {
    const response = await rp(newTokensList);
    try {
      console.log(response.data.length);
      if (response.data.length >= 0) {
        for (let i = 0; i < response.data.length; i++) {
          const object = {};
          const data = response.data[i];
          object.name = data.name;
          object.symbol = data.symbol;
          object.price = data.quote.USD.price;
          object.change_1hr = data.quote.USD.percent_change_1h;
          object.change_24hr = data.quote.USD.percent_change_24h;
          object.fully_diluted_market_cap = data.quote.USD.fully_diluted_market_cap;
          object.volume = data.quote.USD.volume_24h;
          object.platform = data.platform ? data.platform.name : null;
          object.added = data.date_added;

          recentTokenData.push(object);
        } //end of for loop
      } //end of if loop
    } catch (err) {
      console.log('No record found and null data array', err.message);
    }

    console.log('Recent tokens data', recentTokenData);
  } catch (err) {
    console.log('Error message from getting Recent token fetch', err.message);
  }

  return <div>Testing recent tokens</div>;
} //end of main function
