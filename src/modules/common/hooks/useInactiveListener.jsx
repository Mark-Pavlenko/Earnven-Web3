import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

import { injected } from '../../../utils/connectors';

const useInactiveListener = (suppress) => {
  const { active, error, activate } = useWeb3React();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const { ethereum } = window;
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = async () => {
        console.log("Handling 'connect' event");
        await activate(injected);
      };
      const handleChainChanged = async () => {
        console.log("Handling 'chainChanged' event with payload", chainId);
        await activate(injected);
      };
      const handleAccountsChanged = async () => {
        console.log("Handling 'accountsChanged' event with payload", accounts);
        if (accounts.length) {
          await activate(injected);
        }
      };
      const handleNetworkChanged = async () => {
        console.log("Handling 'chainChanged' event with payload", networkId);
        await activate(injected);
      };

      ethereum.on('connect', handleConnect);
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('networkChanged', handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect);
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
          ethereum.removeListener('networkChanged', handleNetworkChanged);
        }
      };
    }
  }, [active, error, suppress, activate]);
};

export default useInactiveListener;
