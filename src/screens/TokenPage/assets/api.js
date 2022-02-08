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

export async function fetchWalletData(walletAddress) {
  const url = `https://api.ethplorer.io/getAddressInfo/${walletAddress}?apiKey=EK-qSPda-W9rX7yJ-UY93y`;
  const response = await axios.get(url);
  try {
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw new Error('Error  of fetchWalletData');
  }
}

// axios
//     .get(`https://api.ethplorer.io/getAddressInfo/${address}?apiKey=EK-qSPda-W9rX7yJ-UY93y`, {})
//     .then(async (response) => {
//       console.log('response UsersTokenData', response);
//       await setWalletData(response.data);
//       await setUsersTokenData(
//           tokenId === 'ethereum'
//               ? {
//                 balance: response.data.ETH.balance,
//                 rate: response.data.ETH.price.rate,
//                 decimals: 0,
//                 symbol: 'ETH',
//               }
//               : () => {
//                 const token = response.data.tokens.find((e) => e.tokenInfo.coingecko === tokenId);
//                 return {
//                   balance: token.balance,
//                   rate: token.tokenInfo.price.rate,
//                   decimals: token.tokenInfo.decimals,
//                   symbol: token.tokenInfo.symbol,
//                 };
//               }
//       );
//     });
