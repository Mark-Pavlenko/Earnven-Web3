import axios from 'axios';

export async function fetchTokenData(tokenId) {
  const url = `https://api.coingecko.com/api/v3/coins/${tokenId}`;
  const response = await axios.get(url);
  try {
    return response.data;
  } catch (err) {
    throw new Error('Error  of fetchTokenData');
  }
}

export async function fetchTokenTransactions(tokenContractAddress, walletAddress) {
  const url = `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${tokenContractAddress}&address=${walletAddress}&apikey=CISZAVU4237H8CFPFCFWEA25HHBI3QKB8W`;
  const response = await axios.get(url);
  try {
    console.log(response.data.result);
    return response.data.result;
  } catch (err) {
    throw new Error('Error  of fetchTokenTransactions');
  }
}
