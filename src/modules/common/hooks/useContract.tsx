import { Contract } from '@ethersproject/contracts';

import { getContract } from '../../../utils/contracts';
import ERC20_ABI from '../../web3/abi/ERC20.json';
import STAKING_ABI from '../../web3/abi/Staking.json';
import { useWeb3React } from '@web3-react/core';
import { Address, CONTRACTS } from '../../../utils/constants';
import { getAddressByChainId } from '../../../utils';

function useContractByChainId(address: Address, ABI: any, withSignerIfPossible = true): Contract {
  const { library, account, chainId } = useWeb3React();
  return getContract(
    getAddressByChainId(address, chainId),
    ABI,
    library,
    withSignerIfPossible && account ? account : undefined
  );
}

function useContract(address: string, ABI: any, withSignerIfPossible = true): Contract {
  const { library, account } = useWeb3React();
  return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined);
}

export const useTokenContract = (tokenAddress: string, withSignerIfPossible?: boolean): Contract =>
  useContract(tokenAddress, ERC20_ABI, withSignerIfPossible);

export const useStakingContract = (withSignerIfPossible?: boolean): Contract =>
  useContractByChainId(CONTRACTS.Staking.address, STAKING_ABI, withSignerIfPossible);

export default useContract;
