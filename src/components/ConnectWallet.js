import { Box, Button, Grid, Stack, TextField, Typography } from '@material-ui/core';
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import React, { useState } from 'react';
import Portis from '@portis/web3';
import Fortmatic from 'fortmatic';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Torus from '@toruslabs/torus-embed';
import { bool } from 'prop-types';
import portisWalletLogo from '../assets/icons/portisLogo.png';
import torusWalletLogo from '../assets/icons/torus.png';
import coinbaseWalletLogo from '../assets/icons/coinbase-wallet.png';
import fortmaticLogo from '../assets/icons/fortmatic.png';
import walletConnectLogo from '../assets/icons/walletconnect-logo.svg';
import metamask from '../assets/icons/metamask.svg';

export default function ConnectWallet() {
  const navigate = useNavigate();
  const [address, setstate] = useState('');
  const [errorMsg, seterrorMsg] = useState(false);

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

  const loadMetamask = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const accounts = await window.web3.eth.getAccounts();
      routeToDashboard(accounts[0], 'metamask');
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  };

  const routeToDashboard = async (account, provider) => {
    const existingWallet = localStorage.getItem('wallets');
    const parsedExistingWallet = JSON.parse(existingWallet);
    const existingWallet_mywallet = localStorage.getItem('mywallet');
    const parsedWallet_mywallet = JSON.parse(existingWallet_mywallet);

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
    if (result != null && result != []) {
      jsondata = JSON.parse(result);
    } else {
      jsondata = JSON.parse(result_wallets);
    }
    localStorage.setItem('selected-name', 'null');

    jsondata.map((option) => {
      if (
        option.provider == 'metamask' ||
        option.provider == 'walletconnect' ||
        option.provider == 'portis' ||
        option.provider == 'coinbase' ||
        option.provider == 'fortmatic' ||
        option.provider == 'torus'
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
      routeToDashboard(address, null);
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
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}>
      <Grid item>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h3">Connect To Earnven</Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption">Connect Wallet</Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: (theme) => theme.palette.primary.dark }}
              onClick={loadMetamask}
              disableElevation
              fullWidth
              startIcon={<img src={metamask} alt="" style={{ height: '14px', width: '14px' }} />}>
              MetaMask
            </Button>

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button
                onClick={async () => {
                  try {
                    await loadWalletConnect();
                  } catch {
                    // do smth.
                  }
                }}
                variant="outlined"
                startIcon={
                  <img
                    src={walletConnectLogo}
                    alt=""
                    style={{
                      height: '14px',
                      width: '14px',
                    }}
                  />
                }>
                WalletConnect
              </Button>
              <Button
                onClick={loadPortis}
                variant="outlined"
                startIcon={
                  <img src={portisWalletLogo} alt="" style={{ height: '14px', width: '14px' }} />
                }>
                Portis
              </Button>
              <Button
                variant="outlined"
                s
                tartIcon={
                  <img src={coinbaseWalletLogo} alt="" style={{ height: '14px', width: '14px' }} />
                }>
                Coinbase Wallet
              </Button>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button
                onClick={loadFormatic}
                variant="outlined"
                startIcon={
                  <img src={fortmaticLogo} alt="" style={{ height: '14px', width: '14px' }} />
                }>
                Fortmatic
              </Button>
              <Button
                onClick={loadTorus}
                variant="outlined"
                startIcon={
                  <img src={torusWalletLogo} alt="" style={{ height: '14px', width: '14px' }} />
                }>
                Torus Wallet
              </Button>
            </Stack>
            <Box sx={{ mt: 3 }}>
              <Typography variant="caption">Track any address</Typography>
              <Stack direction="row" spacing={1}>
                <TextField
                  fullWidth
                  placeholder="Track any ethereum address"
                  id="fullWidth"
                  onChange={addressUpdate}
                />
                <Button variant="contained" onClick={trackAddress}>
                  <FaArrowRight />
                </Button>
              </Stack>
              <ErrorComponent isWrongAddress={errorMsg} />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
