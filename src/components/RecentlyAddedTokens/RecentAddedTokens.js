/** ****************************************************************************************************
Purpose : This component is used to get list of newly added tokens from Coin Market Cap(CMC) using API
Developed by : Prabhakaran.R
Version log:
-------------------------------------------------------------------------------------------------------
Version           Date                         Description                    Developed by
--------------------------------------------------------------------------------------------------
1.0               8/Nov/2021                   Initial Development            Prabhakaran.R

******************************************************************************************************/
import rp from 'request-promise';
import NewCryptoImages from './NewCryptoImages';

const RecentAddedTokens = async () => {
  let newTokensList;
  try {
    newTokensList = {
      method: 'GET',
      uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
      qs: {
        start: '1',
        limit: '18',

        sort: 'date_added',
        sort_dir: 'desc',
      },
      headers: {
        'X-CMC_PRO_API_KEY': 'a49aa677-514a-4e14-8fe3-8a872b3dc2fa', //tpj
        //'X-CMC_PRO_API_KEY': 'a6efe5bb-bf2b-4420-9b4b-694003a0980f', //ocp
        //'X-CMC_PRO_API_KEY': 'cb24b7c2-395b-43f2-955c-b392650c61d4', //office
      },
      json: true,
      gzip: true,
    };
  } catch (err) {
    console.log('Error Message from CMC API fetch process', err.message);
  }

  const recentTokenData = [];
  let checkPlatformSymbol = 'X';
  let blockChainLogoUrl;
  try {
    const response = await rp(newTokensList);
    try {
      if (response.data.length >= 0) {
        for (let i = 0; i < response.data.length; i++) {
          const object = {};
          let bcPlatform;
          //get UTC hours
          const UTCHrs = new Date().getUTCHours();
          console.log('UTC Hrs', UTCHrs);

          const data = response.data[i];
          //set the platform name based on the coming full name
          let platformData = data.platform ? data.platform.name : '';
          //replace if exist with fullname
          bcPlatform = platformData.replaceAll('Binance Smart Chain (BEP20)', 'Binance Coin');

          //get Token added timestamp in hours after checking with UTC date
          const tokenInUTCHrs = new Date(data.date_added).getUTCHours();
          const tokenAddeddate = UTCHrs - tokenInUTCHrs;

          //call the NewCryptoImage process to get the relevant image for each new crptos
          const logoUrl = await NewCryptoImages(data.symbol);

          //use below logic to get price decimals dynamically
          let tokenPrice = parseFloat(data.quote.USD.price).toFixed(2);
          if (tokenPrice == 0) {
            for (let i = 1; i < 12; i++) {
              if (tokenPrice != 0) {
                break;
              } else if (tokenPrice == 0) {
                tokenPrice = parseFloat(data.quote.USD.price).toFixed(2 + i);
              }
            }
          }

          //call the NewCyptoImage process to get the relevant image for each platform/blockchian cryptos
          if (checkPlatformSymbol != data.platform.symbol) {
            blockChainLogoUrl = await NewCryptoImages(data.platform.symbol);
          }

          //create the object with data set
          object.no = i + 1;
          object.name = data.name;
          object.symbol = data.symbol;
          object.price = tokenPrice;
          object.change_1hr = data.quote.USD.percent_change_1h;
          object.change_24hr = data.quote.USD.percent_change_24h;
          object.fully_diluted_market_cap = data.quote.USD.fully_diluted_market_cap;
          object.volume = data.quote.USD.volume_24h;
          object.platform = bcPlatform;
          object.added = tokenAddeddate;
          object.logoUrl = logoUrl;
          object.blockchainLogoUrl = blockChainLogoUrl;

          //push the data set into the arracy
          recentTokenData.push(object);
          //assign the value for further check
          checkPlatformSymbol = data.platform.symbol;
        } //end of for loop
      } //end of if loop
    } catch (err) {
      console.log('No record found and null data array', err.message);
    }
    return recentTokenData;
  } catch (err) {
    console.log('Error message from getting Recent token fetch', err.message);
  }
}; //end of main function

export default RecentAddedTokens;
