import axios from 'axios';

export const getAccountBalance = async (accountAddress) => {
  return await axios.get(
    `https://api.ethplorer.io/getAddressInfo/${accountAddress}?apiKey=EK-qSPda-W9rX7yJ-UY93y`
  );
};
