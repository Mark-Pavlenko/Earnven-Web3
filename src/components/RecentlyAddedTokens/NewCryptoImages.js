/** ****************************************************************************************************
Purpose : This component is used to get logos/images of newly added tokens from Coin Market Cap(CMC) using API
Developed by : Prabhakaran.R
Version log:
-------------------------------------------------------------------------------------------------------
Version           Date                         Description                    Developed by
--------------------------------------------------------------------------------------------------
1.0               11/Nov/2021                   Initial Development            Prabhakaran.R

******************************************************************************************************/

const rp = require('request-promise');

const NewCryptoImages = async (symbol) => {
  console.log('Inside the logo fetch process');
  let newImageList;
  //get list of new tokens in the array
  try {
    newImageList = {
      method: 'GET',
      uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info',
      qs: {
        //pass symbol is an argument to the image url
        symbol: symbol,
        //get list of fields from the API
        aux: 'urls,logo,description,tags,platform,date_added,notice,status',
      },
      headers: {
        'X-CMC_PRO_API_KEY': 'a49aa677-514a-4e14-8fe3-8a872b3dc2fa',
      },
      json: true,
      gzip: true,
    };
  } catch (err) {
    console.log('Error Message from CMC API fetch process', err.message);
  }

  //get the new token symbol since its coming as dynamic object value
  let newSymbol = symbol;
  let data;
  let tokenSybmol = {
    newSymbol: 'newSymbol',
  };
  console.log('looking for new crpto image for symbol', symbol);
  try {
    await rp(newImageList).then((response) => {
      data = response.data;
      console.log('New token image', data[newSymbol].logo);
    });
  } catch (err) {
    console.log('No record found and null data array', err.message);
  }
  return data[newSymbol].logo;
}; //end of main function

export default NewCryptoImages;
