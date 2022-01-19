import axios from 'axios';
import LiquityContractABI from '../../../../abi/LiquityContract.json';
import addresses from '../../../../contractAddresses';

//get Lqty Vault value and claimable value from the smart contract
export const getLqtyDepositData = async (accountAddress, web3) => {
  //get the contract instance
  const LqtyContract = new web3.eth.Contract(LiquityContractABI, addresses.LqtyTokenAddress);

  //get the Vault value deposiged in LUSD in Lqty protoccol
  let LqtyVaultBalance = await LqtyContract.methods.getCompoundedLUSDDeposit(accountAddress).call();
  //get the LQTY - LQTY claimable balance amount
  let LqtyClaimableAmt = await LqtyContract.methods.getDepositorLQTYGain(accountAddress).call();
  //get the LQTY ETH claimable balance amount
  let LqtyETHClaimableAmt = await LqtyContract.methods.getDepositorETHGain(accountAddress).call();

  //assign the value into the array by all the corresponding value
  return {
    lqtyVaultValue: LqtyVaultBalance,
    lqtyTokenClaimableValue: LqtyClaimableAmt,
    lqtyTokenEthClaiableValue: LqtyETHClaimableAmt,
  };
};

//use the liquity subgraph to get liquity staking, debt and collateral value
export const getLqtyStakingData = async (accountAddress) => {
  const response = await axios.post(
    `https://gateway.thegraph.com/api/${addresses.graph_API}/subgraphs/id/0x147676a5e327080386bcc227e103a73dd2979049-0`,

    {
      query: `{
          users(where :{id :"${accountAddress}"}) 
          {
              id
              trove {
                id
                collateral
                debt
            }
              stake {
                amount
              }
              
          }
        }`,
    }
  );
  return response;
};

//Liquity Protocol has two tokens
//LQTY and LUSD so need to fetch both token's price and image url
//get the price logic for the Lqty Token and Lusd token
//LQTY token data
export const getLqtyTokenPrice = async () => {
  const lqtyResult = await axios.get(
    `https://api.coingecko.com/api/v3/coins/ethereum/contract/0x6dea81c8171d0ba574754ef6f8b412f2ed88c54d`,
    {}
  );
  const lqtytokenPrice = lqtyResult.data.market_data.current_price.usd;
  const lqtyImageUrl = lqtyResult.data.image.thumb;

  return {
    lqtytokenPrice: lqtytokenPrice,
    lqtyImageUrl: lqtyImageUrl,
  };
};
//LUSD token  data
export const getLusdTokenPrice = async () => {
  const lusdResult = await axios.get(
    `https://api.coingecko.com/api/v3/coins/ethereum/contract/0x5f98805a4e8be255a32880fdec7f6728c6568ba0`,
    {}
  );
  const lusdtokenPrice = lusdResult.data.market_data.current_price.usd;
  const lusdImageUrl = lusdResult.data.image.thumb;

  return {
    lusdtokenPrice: lusdtokenPrice,
    lusdImageUrl: lusdImageUrl,
  };
};
//Get ETH market price
export const getEthTokenPrice = async () => {
  const ethResult = await axios.get(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
  );
  return ethResult.data.ethereum.usd;
};
