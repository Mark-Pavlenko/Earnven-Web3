import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { Contract, ContractFunction } from '@ethersproject/contracts';
import { isAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';
import { BigNumber as BigNumberETH } from '@ethersproject/bignumber';

import { calculateGasMargin } from './index';

export const getSigner = (library: Web3Provider, account: string): JsonRpcSigner =>
  library.getSigner(account).connectUnchecked();

export const getProviderOrSigner = (
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner => (account ? getSigner(library, account) : library);

export const getContract = (
  address: string,
  ABI: any,
  library: Web3Provider | undefined,
  account?: string
): Contract => {
  if (!isAddress(address)) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, library && (getProviderOrSigner(library, account) as any));
};

export const buildQuery = async <T>(
  method: ContractFunction,
  args: any[] = [],
  estimateGas?: ContractFunction,
  options: any = {}
): Promise<T> => {
  try {
    let tx;
    if (estimateGas) {
      const gasLimit = await estimateGas(...args, options);
      tx = await method(...args, {
        gasLimit: calculateGasMargin(gasLimit as BigNumberETH),
        ...options,
      });
    } else {
      tx = await method(...args, options);
    }
    if (tx?.wait) {
      return tx.wait(1);
    }
    return tx;
  } catch (err: any) {
    if (estimateGas) {
      console.log(`Method error: ${args}`);
      throw new Error(err.error?.message || err.message || err);
    }
    console.log(`Method error: ${args}`);
    throw new Error(err.error?.message || err.message || err);
  }
};
// export enum ContractsNames {
//   ETH = 'ETH',
//   USDT = 'USDT',
//   USDC = 'USDC',
//   CLOUDTokensale = 'CLOUDTokensale',
//   CLOUD = 'CLOUD',
// }
//
// export const contracts: { [contracts in ContractsNames]: string } = {
//   [ContractsNames.ETH]: AddressZero,
//   [ContractsNames.USDT]: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
//   [ContractsNames.USDC]: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
//   [ContractsNames.CLOUD]: '0x55d398326f99059ff775485246999027b3197955',
//   [ContractsNames.CLOUDTokensale]: '0x06383178F7F8A8a0066d367A3020a2007dE6C522',
// };
