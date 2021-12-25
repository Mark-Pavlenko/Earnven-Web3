import axios from 'axios';
import addresses from '../../../contractAddresses';

export const getEth2StakeData = async (stakeUserAccount) => {
  // console.log('attributes', attributes);

  const response = await axios.post(
    `https://gateway.thegraph.com/api/${addresses.graph_API}/subgraphs/id/0x540b14e4bd871cfe59e48d19254328b5ff11d820-0`,
    {
      query: `{
                depositors
                (
                  where:{
                    id:"${stakeUserAccount.accountAddress}"
                  }
                ) {
                  id
                  totalAmountDeposited
                  depositCount
                  deposits {
                    id
                    amount
                  }
                }
              }
              `,
    }
  );
  return response;
};

export const getEthPriceData = async () => {
  const response = await axios.get(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
  );
  return response;
};
