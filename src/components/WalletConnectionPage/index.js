import React, { useState, useEffect } from 'react';
import { bool } from 'prop-types';
import Fortmatic from 'fortmatic';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import Portis from '@portis/web3';
import Torus from '@toruslabs/torus-embed';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { makeStyles } from '@material-ui/styles';
import { Stack, Typography, TextField } from '@material-ui/core';
import Header from '../../layout/header';
import Sidebar from '../../layout/sidebar';
import portisWalletLogo from '../../assets/icons/portisLogo.png';
import torusWalletLogo from '../../assets/icons/torus.png';
import fortmaticLogo from '../../assets/icons/fortmatic.png';
import walletConnectLogo from '../../assets/icons/walletconnect-logo.svg';
import coinbaseWalletIcon from '../../assets/icons/coinbaseWalletIcon.svg';
import exodusWalletIcon from '../../assets/icons/exodusWalletIcon.svg';
import atomicWalletIcon from '../../assets/icons/atomicWalletIcon.svg';
import ledgerWalletIcon from '../../assets/icons/ledgerWalletIcon.svg';
import trezorWalletIcon from '../../assets/icons/trezorWalletIcon.svg';
import ArrowRight from '../../assets/icons/arrowRight.svg';
import ArrowRightDark from '../../assets/icons/arrowRightDark.svg';

import metamaskWalletLogo from '../../assets/icons/metamask.svg';

import {
  MainSubLayout,
  MainSubLayoutTitle,
  MetaMaskBtn,
  WalletButtonsLayout,
  WalletBtnConnect,
  ComingSoonItem,
  WalletBtnConnectImg,
  EthereumAddressBlock,
  EthereumAddressField,
  SubmitEthereumAddressBtn,
  WalletBtnName,
  MainStyleFirstConnection,
  RootStyleFirstConnection,
} from './styles';

import {
  RootStyle,
  MainStyle,
  MainStyleParentLayout,
  MainLayoutNotFirstConnection,
} from '../../layout/styledComponents';

//correct web3 connection
import { useWeb3React } from '@web3-react/core';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';

const useStyles = makeStyles((theme) => ({
  noBorder: {
    border: 'none !important',
  },
  input: {
    color: 'red',
  },
}));

export default function WalletPageConnection() {
  const themeType = useSelector((state) => state.themeReducer.isLightTheme);
  const classes = useStyles(themeType);
  const [open, setOpen] = useState(false);

  //correct web3 connection
  // const { active, account, library, connector, activate, deactivate } = useWeb3React();
  const {
    active: networkActive,
    error: networkError,
    activate: activateNetwork,
    account,
  } = useWeb3React();
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();
  const [address, setstate] = useState('');
  const [errorMsg, seterrorMsg] = useState(false);
  const isFirstConnection = useSelector((state) => state.themeReducer.isFirstConnection);

  // console.log('is metamask wallet connect', active);
  //metamask web3-react connection
  const connectMetamask = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const accounts = await window.web3.eth.getAccounts();
      localStorage.setItem('firstConnection', false);
      routeToDashboard(accounts[0], 'metamask');
      // if (localStorage.getItem('mywallet') === null || undefined) {
      window.location.reload();
      // }
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  };

  const disconnectMetamask = () => {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  };

  const loadWalletConnect = async () => {
    const provider = new WalletConnectProvider({
      infuraId: 'e6669739aaca42608ef4c5d8a9de0d4d',
    });

    await provider.enable();
    window.web3 = new Web3(provider);
    const accounts = await window.web3.eth.getAccounts();
    routeToDashboard(accounts[0], 'metamask');
  };

  const loadTorus = async () => {
    const torus = new Torus();
    await torus.init();
    await torus.login(); // await torus.ethereum.enable()
    window.web3 = new Web3(torus.provider);
    const accounts = await window.web3.eth.getAccounts();
    routeToDashboard(accounts[0], 'metamask');
  };

  const loadPortis = async () => {
    const portis = new Portis('a48d17a8-f418-407e-951c-23ed15677980', 'mainnet');
    window.web3 = new Web3(portis.provider);
    const accounts = await window.web3.eth.getAccounts();
    routeToDashboard(accounts[0], 'metamask');
  };

  const loadFormatic = async () => {
    const fm = new Fortmatic('pk_live_9F53EBC750F34391');
    window.web3 = new Web3(fm.getProvider());
    const accounts = await window.web3.eth.getAccounts();
    routeToDashboard(accounts[0], 'metamask');
  };

  const routeToDashboard = async (account, provider) => {
    const existingWallet = localStorage.getItem('wallets');
    const parsedExistingWallet = JSON.parse(existingWallet);
    const existingWallet_mywallet = localStorage.getItem('mywallet');

    const newWallet = {
      address: account,
      provider,
      name: 'null',
    };
    let newDetails = [];
    if (existingWallet === null) {
      newDetails.push(newWallet);
    } else {
      const isAddressPresent = parsedExistingWallet.findIndex(
        (element) => element.address === account
      );
      if (isAddressPresent === -1) {
        newDetails.push(newWallet);
        newDetails = [...parsedExistingWallet, newWallet];
      } else {
        newDetails = [...parsedExistingWallet];
      }
    }
    localStorage.setItem('wallets', JSON.stringify(newDetails));
    var jsonData = [];
    var jsondata = [];
    const result = localStorage.getItem('mywallet');
    const result_wallets = localStorage.getItem('wallets');
    if (result != null && result !== []) {
      jsondata = JSON.parse(result);
    } else {
      jsondata = JSON.parse(result_wallets);
    }
    localStorage.setItem('selected-name', 'null');

    jsondata.map((option) => {
      if (
        option.provider === 'metamask' ||
        option.provider === 'walletconnect' ||
        option.provider === 'portis' ||
        option.provider === 'coinbase' ||
        option.provider === 'fortmatic' ||
        option.provider === 'torus'
      ) {
        jsonData.push({
          address: option.address,
          provider: option.provider,
          name: option.name,
        });
      }
      localStorage.setItem('mywallet', JSON.stringify(jsonData));
    });
    let selectedacc = '';
    let mywallet = localStorage.getItem('mywallet');
    mywallet = JSON.parse(mywallet);
    mywallet &&
      mywallet.map((option) => {
        if (option.address == account) {
          if (option.name == null) {
            selectedacc = account;
            localStorage.setItem('selected-name', option.name);
          } else {
            selectedacc = option.address;
            localStorage.setItem('selected-name', option.name);
          }
        }
      });
    localStorage.setItem('selected-account', account);
    // localStorage.setItem('selected-name', 'null');
    localStorage.setItem('setnavigation', '/dashboard');
    navigate(`/${account}/dashboard`);
  };

  const addressUpdate = (e) => {
    setstate(e.target.value);
  };

  const trackAddress = () => {
    const validAddress = Web3.utils.isAddress(address);
    if (validAddress) {
      localStorage.setItem('firstConnection', false);
      routeToDashboard(address, null);
      window.location.reload();
      seterrorMsg(false);
    } else {
      seterrorMsg(true);
    }
  };

  const ErrorComponent = (props) => {
    const { isWrongAddress } = props;
    if (isWrongAddress) {
      return (
        <Typography variant="caption" sx={{ color: (theme) => theme.palette.error.light }}>
          Invalid Ethereum address
        </Typography>
      );
    }
    return null;
  };

  ErrorComponent.propTypes = {
    isWrongAddress: bool,
  };

  return (
    <>
      {isFirstConnection === true ? (
        <RootStyle isLightTheme={themeType} isFirstConnection={isFirstConnection}>
          <MainStyleParentLayout>
            <MainStyle isLightTheme={themeType}>
              <Header
                onOpenSidebar={() => setOpen(true)}
                themeType={themeType}
                finalTitle={'Connect to Earnven'}
              />
              <MainSubLayout>
                <MainSubLayoutTitle isLightTheme={themeType}>Connect a wallet</MainSubLayoutTitle>
                <MetaMaskBtn
                  isLightTheme={themeType}
                  onClick={connectMetamask}
                  disableElevation
                  fullWidth
                  startIcon={<img src={metamaskWalletLogo} alt="" />}>
                  Metamask
                </MetaMaskBtn>

                <WalletButtonsLayout>
                  <WalletBtnConnect
                    onClick={async () => await loadWalletConnect()}
                    variant="outlined"
                    isLightTheme={themeType}
                    disabled
                    startIcon={<WalletBtnConnectImg src={walletConnectLogo} alt="" />}>
                    <div>
                      <WalletBtnName>WalletConnect</WalletBtnName>
                      <ComingSoonItem>Coming soon</ComingSoonItem>
                    </div>
                  </WalletBtnConnect>

                  <WalletBtnConnect
                    onClick={loadPortis}
                    variant="outlined"
                    isLightTheme={themeType}
                    disabled
                    startIcon={<WalletBtnConnectImg src={portisWalletLogo} alt="" />}>
                    <div>
                      <WalletBtnName>Portis</WalletBtnName>
                      <ComingSoonItem>Coming soon</ComingSoonItem>
                    </div>
                  </WalletBtnConnect>

                  <WalletBtnConnect
                    variant="outlined"
                    isLightTheme={themeType}
                    disabled
                    startIcon={<WalletBtnConnectImg src={coinbaseWalletIcon} alt="" />}>
                    <div>
                      <WalletBtnName> Coinbase Wallet</WalletBtnName>
                      <ComingSoonItem>Coming soon</ComingSoonItem>
                    </div>
                  </WalletBtnConnect>

                  <WalletBtnConnect
                    onClick={loadFormatic}
                    variant="outlined"
                    isLightTheme={themeType}
                    disabled
                    startIcon={<WalletBtnConnectImg src={fortmaticLogo} alt="" />}>
                    <div>
                      <WalletBtnName> Fortmatic</WalletBtnName>
                      <ComingSoonItem>Coming soon</ComingSoonItem>
                    </div>
                  </WalletBtnConnect>

                  <WalletBtnConnect
                    onClick={loadTorus}
                    variant="outlined"
                    isLightTheme={themeType}
                    disabled
                    startIcon={<WalletBtnConnectImg src={torusWalletLogo} alt="" />}>
                    <div>
                      <WalletBtnName> Torus Wallet</WalletBtnName>
                      <ComingSoonItem>Coming soon</ComingSoonItem>
                    </div>
                  </WalletBtnConnect>

                  <WalletBtnConnect
                    variant="outlined"
                    isLightTheme={themeType}
                    disabled
                    startIcon={<WalletBtnConnectImg src={exodusWalletIcon} alt="" />}>
                    <div>
                      <WalletBtnName> Exodus</WalletBtnName>
                      <ComingSoonItem>Coming soon</ComingSoonItem>
                    </div>
                  </WalletBtnConnect>

                  <WalletBtnConnect
                    variant="outlined"
                    isLightTheme={themeType}
                    disabled
                    startIcon={<WalletBtnConnectImg src={atomicWalletIcon} alt="" />}>
                    <div>
                      <WalletBtnName> Atomic</WalletBtnName>
                      <ComingSoonItem>Coming soon</ComingSoonItem>
                    </div>
                  </WalletBtnConnect>

                  <WalletBtnConnect
                    variant="outlined"
                    isLightTheme={themeType}
                    disabled
                    startIcon={<WalletBtnConnectImg src={ledgerWalletIcon} alt="" />}>
                    <div>
                      <WalletBtnName>Ledger</WalletBtnName>
                      <ComingSoonItem>Coming soon</ComingSoonItem>
                    </div>
                  </WalletBtnConnect>

                  <WalletBtnConnect
                    variant="outlined"
                    isLightTheme={themeType}
                    disabled
                    startIcon={<WalletBtnConnectImg src={trezorWalletIcon} alt="" />}>
                    <div>
                      <WalletBtnName> Trezor</WalletBtnName>
                      <ComingSoonItem>Coming soon</ComingSoonItem>
                    </div>
                  </WalletBtnConnect>
                </WalletButtonsLayout>

                <EthereumAddressBlock>
                  <MainSubLayoutTitle isLightTheme={themeType}>
                    Track any address
                  </MainSubLayoutTitle>
                  <Stack direction="row" justifyContent="space-between">
                    <EthereumAddressField
                      isLightTheme={themeType}
                      label="Track any ethereum address"
                      onChange={addressUpdate}
                      InputProps={{
                        classes: { notchedOutline: classes.noBorder },
                        sx: {
                          color: themeType ? 'black' : 'white',
                          paddingRight: '0px !important',
                        },
                      }}
                      InputLabelProps={{
                        style: {
                          fontSize: 16,
                          color: themeType ? '#8F8F8F' : '#878995',
                        },
                      }}
                      style={{
                        height: '60px',
                      }}
                    />
                    <SubmitEthereumAddressBtn onClick={trackAddress} isLightTheme={themeType}>
                      {themeType ? (
                        <img src={ArrowRight} alt="arrow" />
                      ) : (
                        <img src={ArrowRightDark} alt="arrow" />
                      )}
                    </SubmitEthereumAddressBtn>
                  </Stack>
                  <ErrorComponent isWrongAddress={errorMsg} />
                </EthereumAddressBlock>
              </MainSubLayout>
            </MainStyle>
          </MainStyleParentLayout>
          <div>
            <Sidebar
              isOpenSidebar={open}
              onCloseSidebar={() => setOpen(false)}
              address={localStorage.getItem('selected-account')}
              name={localStorage.getItem('selected-name')}
              global_wallet={localStorage.getItem('wallets')}
              themeType={themeType}
            />
          </div>
        </RootStyle>
      ) : (
        <MainStyleParentLayout>
          <MainLayoutNotFirstConnection isLightTheme={themeType}>
            <MainSubLayout>
              <MainSubLayoutTitle isLightTheme={themeType}>Connect a wallet</MainSubLayoutTitle>
              <MetaMaskBtn
                isLightTheme={themeType}
                onClick={connectMetamask}
                disableElevation
                fullWidth
                startIcon={<img src={metamaskWalletLogo} alt="" />}>
                Metamask
              </MetaMaskBtn>

              <WalletButtonsLayout>
                <WalletBtnConnect
                  onClick={async () => await loadWalletConnect()}
                  variant="outlined"
                  isLightTheme={themeType}
                  disabled
                  startIcon={<WalletBtnConnectImg src={walletConnectLogo} alt="" />}>
                  <div>
                    <WalletBtnName>WalletConnect</WalletBtnName>
                    <ComingSoonItem>Coming soon</ComingSoonItem>
                  </div>
                </WalletBtnConnect>

                <WalletBtnConnect
                  onClick={loadPortis}
                  variant="outlined"
                  isLightTheme={themeType}
                  disabled
                  startIcon={<WalletBtnConnectImg src={portisWalletLogo} alt="" />}>
                  <div>
                    <WalletBtnName>Portis</WalletBtnName>
                    <ComingSoonItem>Coming soon</ComingSoonItem>
                  </div>
                </WalletBtnConnect>

                <WalletBtnConnect
                  variant="outlined"
                  isLightTheme={themeType}
                  disabled
                  startIcon={<WalletBtnConnectImg src={coinbaseWalletIcon} alt="" />}>
                  <div>
                    <WalletBtnName> Coinbase Wallet</WalletBtnName>
                    <ComingSoonItem>Coming soon</ComingSoonItem>
                  </div>
                </WalletBtnConnect>

                <WalletBtnConnect
                  onClick={loadFormatic}
                  variant="outlined"
                  isLightTheme={themeType}
                  disabled
                  startIcon={<WalletBtnConnectImg src={fortmaticLogo} alt="" />}>
                  <div>
                    <WalletBtnName> Fortmatic</WalletBtnName>
                    <ComingSoonItem>Coming soon</ComingSoonItem>
                  </div>
                </WalletBtnConnect>

                <WalletBtnConnect
                  onClick={loadTorus}
                  variant="outlined"
                  isLightTheme={themeType}
                  disabled
                  startIcon={<WalletBtnConnectImg src={torusWalletLogo} alt="" />}>
                  <div>
                    <WalletBtnName> Torus Wallet</WalletBtnName>
                    <ComingSoonItem>Coming soon</ComingSoonItem>
                  </div>
                </WalletBtnConnect>

                <WalletBtnConnect
                  variant="outlined"
                  isLightTheme={themeType}
                  disabled
                  startIcon={<WalletBtnConnectImg src={exodusWalletIcon} alt="" />}>
                  <div>
                    <WalletBtnName> Exodus</WalletBtnName>
                    <ComingSoonItem>Coming soon</ComingSoonItem>
                  </div>
                </WalletBtnConnect>

                <WalletBtnConnect
                  variant="outlined"
                  isLightTheme={themeType}
                  disabled
                  startIcon={<WalletBtnConnectImg src={atomicWalletIcon} alt="" />}>
                  <div>
                    <WalletBtnName> Atomic</WalletBtnName>
                    <ComingSoonItem>Coming soon</ComingSoonItem>
                  </div>
                </WalletBtnConnect>

                <WalletBtnConnect
                  variant="outlined"
                  isLightTheme={themeType}
                  disabled
                  startIcon={<WalletBtnConnectImg src={ledgerWalletIcon} alt="" />}>
                  <div>
                    <WalletBtnName>Ledger</WalletBtnName>
                    <ComingSoonItem>Coming soon</ComingSoonItem>
                  </div>
                </WalletBtnConnect>

                <WalletBtnConnect
                  variant="outlined"
                  isLightTheme={themeType}
                  disabled
                  startIcon={<WalletBtnConnectImg src={trezorWalletIcon} alt="" />}>
                  <div>
                    <WalletBtnName> Trezor</WalletBtnName>
                    <ComingSoonItem>Coming soon</ComingSoonItem>
                  </div>
                </WalletBtnConnect>
              </WalletButtonsLayout>

              <EthereumAddressBlock>
                <MainSubLayoutTitle isLightTheme={themeType}>Track any address</MainSubLayoutTitle>
                <Stack direction="row" justifyContent="space-between">
                  <EthereumAddressField
                    isLightTheme={themeType}
                    label="Track any ethereum address"
                    onChange={addressUpdate}
                    InputProps={{
                      classes: { notchedOutline: classes.noBorder },
                      sx: {
                        color: themeType ? 'black' : 'white',
                        paddingRight: '0px !important',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: 16,
                        color: themeType ? '#8F8F8F' : '#878995',
                      },
                    }}
                    style={{
                      height: '60px',
                    }}
                  />
                  <SubmitEthereumAddressBtn onClick={trackAddress} isLightTheme={themeType}>
                    {themeType ? (
                      <img src={ArrowRight} alt="arrow" />
                    ) : (
                      <img src={ArrowRightDark} alt="arrow" />
                    )}
                  </SubmitEthereumAddressBtn>
                </Stack>
                <ErrorComponent isWrongAddress={errorMsg} />
              </EthereumAddressBlock>
            </MainSubLayout>
          </MainLayoutNotFirstConnection>
        </MainStyleParentLayout>
      )}
    </>
  );
}
