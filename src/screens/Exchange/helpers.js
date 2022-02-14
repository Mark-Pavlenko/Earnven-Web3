import axios from 'axios';

export default async function convertSendTokenToUSDCurrency(tokenData) {
  console.log('multiswap tokenData', tokenData);

  if (tokenData.amount === '') {
    tokenData.amount = '0';
  }

  if (tokenData.symbol === 'ETH') {
    const ethDollarValue = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
    );
    return `$${(ethDollarValue.data.ethereum.usd * parseInt(tokenData.amount)).toFixed(2)}`;
  } else {
    if (tokenData.USDCurrency !== undefined) {
      return `$${(tokenData.USDCurrency * parseInt(tokenData.amount)).toFixed(2)}`;
    } else {
      return 'Price not available';
    }
  }
}
