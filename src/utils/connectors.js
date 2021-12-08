import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

export const POLLING_INTERVAL = 12000;
export const DEFAULT_CHAIN_ID = Number(process.env.REACT_APP_DEFAULT_CHAIN_ID);

export const NETWORK_URLS = {
  1: 'https://mainnet.infura.io/v3/63ba253e7f2a47c1a5ec0e0ae14ea833',
  4: 'https://rinkeby.infura.io/v3/63ba253e7f2a47c1a5ec0e0ae14ea833',
};

export const injected = new InjectedConnector({
  supportedChainIds: [1, 4],
});

export const network = new NetworkConnector({
  urls: { 1: NETWORK_URLS[1], 4: NETWORK_URLS[4] },
  // defaultChainId: DEFAULT_CHAIN_ID,
  defaultChainId: 4,
});

export const walletConnect = new WalletConnectConnector({
  rpc: { 1: NETWORK_URLS[1], 4: NETWORK_URLS[4] },
  bridge: 'https://pancakeswap.bridge.walletconnect.org/',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

export const connectorsByName = {
  Injected: injected,
  Network: network,
  WalletConnect: walletConnect,
};
