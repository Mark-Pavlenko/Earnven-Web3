import React from 'react';
import { Provider } from 'react-redux';
import Web3Wrapper from './modules/web3/containers/Web3Wrapper';
import { NftProvider } from 'use-nft';
import { Contract, ethers } from 'ethers';
import Router from './routes';
import ThemeConfig from './theme';
import ScrollToTop from './components/ScrollToTop';

//redux-saga connection
import { store } from './init/init';

const ethersConfig = {
  ethers: { Contract },
  provider: new ethers.providers.InfuraProvider('homestead', '8b2159b7b0944586b64f0280c927d0a8'),
};

function App() {
  return (
    <Web3Wrapper>
      <Provider store={store}>
        <ThemeConfig>
          <ScrollToTop />
          <NftProvider fetcher={['ethers', ethersConfig]}>
            <Router />
          </NftProvider>
        </ThemeConfig>
      </Provider>
    </Web3Wrapper>
  );
}

export default App;
