import axios from 'axios';
import addresses from '../../../../contractAddresses';
import SnowSwapABI from '../../../../abi/SnowSwapContract.json';

export const checkSnowSwapStake = async (accountAddress, web3) => {
  const SnowSwapStakingContract = new web3.eth.Contract(SnowSwapABI, addresses.snowSwap);
  try {
    var SnowSwapBalaceAmount = await SnowSwapStakingContract.methods
      .balanceOf(accountAddress)
      .call();
  } catch (errr) {
    console.log('calling method error', errr);
  }
  return SnowSwapBalaceAmount;
};

export const checkSnowSwapClaimStake = async (accountAddress, web3) => {
  const SnowSwapStakingContract = new web3.eth.Contract(SnowSwapABI, addresses.snowSwap);
  try {
    var Claimable = await SnowSwapStakingContract.methods.earned(accountAddress).call();
  } catch (errr) {
    console.log('calling method error', errr);
  }
  return Claimable;
};

export const getSnowTokenData = async () => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/ethereum/contract/0xfe9A29aB92522D14Fc65880d817214261D8479AE`
  );

  return response.data;
};
