import axios from 'axios';

export async function fetchTokenData(tokenId) {
  const url = `https://api.coingecko.com/api/v3/coins/${tokenId}`;
  const response = await axios.get(url);
  try {
    return response.data;
  } catch (err) {
    throw new Error('Error of fetchTokenData');
  }
}

export async function fetchTokenTransactions(tokenContractAddress, walletAddress) {
  const url = `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${tokenContractAddress}&address=${walletAddress}&apikey=CISZAVU4237H8CFPFCFWEA25HHBI3QKB8W`;
  const response = await axios.get(url);
  try {
    return response.data.result;
  } catch (err) {
    throw new Error('Error of fetchTokenTransactions');
  }
}

export async function fetchWalletData(walletAddress) {
  const url = `https://api.ethplorer.io/getAddressInfo/${walletAddress}?apiKey=EK-qSPda-W9rX7yJ-UY93y`;
  const response = await axios.get(url);
  try {
    return response.data;
  } catch (err) {
    throw new Error('Error of fetchWalletData');
  }
}

export async function fetchTokenPriceHistory(tokenId) {
  const url = `https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart/range?vs_currency=usd&from=1200000000&to=${new Date().getTime()}`;
  const response = await axios.get(url);
  try {
    return response.data.prices.map((el) => ({
      date: new Date(el[0]).toISOString().split('').splice(0, 10).join(''),
      rate: el[1],
    }));
  } catch (err) {
    throw new Error('Error of fetchTokenPriceHistory');
  }
}
