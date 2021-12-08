import { useCallback } from 'react';
import { MaxUint256 } from '@ethersproject/constants';
import { useTokenContract } from './useContract';

export const useApproveStakingToken = (tokenAddress: string, spenderAddress: string) => {
  const { approve } = useTokenContract(tokenAddress);

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(spenderAddress, MaxUint256);
      return tx;
    } catch (e) {
      return false;
    }
  }, [MaxUint256, spenderAddress]);

  return { onApprove: handleApprove };
};
