import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Web3 from 'web3';
import Portis from '@portis/web3';
import Fortmatic from 'fortmatic';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Torus from '@toruslabs/torus-embed';
import TransparentButton from '../TransparentButton';
import { data } from '../../globalStore';

class App extends Component {
  async componentWillMount() {
    if (window.web3.eth) {
      this.loadBlockchainData();
    }
  }

  async loadWalletConnect() {
    const provider = new WalletConnectProvider({
      infuraId: 'e6669739aaca42608ef4c5d8a9de0d4d',
    });

    await provider.enable();
    const web3 = new Web3(provider);
    window.web3 = web3;
  }

  async loadTorus() {
    const torus = new Torus();
    await torus.init();
    await torus.login(); // await torus.ethereum.enable()
    const web3 = new Web3(torus.provider);
    window.web3 = web3;
  }

  async loadPortis() {
    const portis = new Portis('a48d17a8-f418-407e-951c-23ed15677980', 'mainnet');
    const web3 = new Web3(portis.provider);
    window.web3 = web3;
  }

  async loadFormatic() {
    const fm = new Fortmatic('pk_live_9F53EBC750F34391');
    const web3 = new Web3(fm.getProvider());
    window.web3 = web3;
  }

  async connectMetamask() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  async loadBlockchainData() {
    const { web3 } = window;
    const accounts = await web3.eth.getAccounts();
    data.account = accounts[0];
    this.setState({ account: accounts[0], connected: true });
    localStorage.setItem('selected-account', accounts[0]);
  }

  constructor() {
    super();

    this.state = {
      isOpen: false,
      connected: false,
      account: '',
    };
  }

  openModal = () => this.setState({ isOpen: true });

  closeModal = () => this.setState({ isOpen: false });

  render() {
    return (
      <>
        Current Address : {this.state.connected ? this.state.account : '0x0'} <br />
        <div
          className="d-flex align-items-center justify-content-center"
          //   style={{ height: "100vh" }}
        >
          <Button variant="primary" onClick={this.openModal}>
            {this.state.connected ? 'Change Wallet' : 'Connect Wallet'}
          </Button>
        </div>
        <Modal show={this.state.isOpen} onHide={this.closeModal}>
          <Modal.Header style={{ background: '#141A1E', color: 'white' }} closeButton>
            <Modal.Title>Connect Wallet</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: '#141A1E' }}>
            <center>
              <br />
              <br />

              <TransparentButton
                onClick={async (e) => {
                  await this.connectMetamask();
                  await this.loadBlockchainData();
                  this.closeModal();
                }}
                value="Metamask"
              />

              <br />
              <br />

              <TransparentButton
                onClick={async (e) => {
                  await this.loadPortis();
                  await this.loadBlockchainData();
                  this.closeModal();
                }}
                value="Portis"
              />

              <br />
              <br />

              <TransparentButton
                onClick={async (e) => {
                  await this.loadFormatic();
                  await this.loadBlockchainData();
                  this.closeModal();
                }}
                value="Formatic"
              />

              <br />
              <br />

              <TransparentButton
                onClick={async (e) => {
                  try {
                    await this.loadWalletConnect();
                    await this.loadBlockchainData();
                    this.closeModal();
                  } catch {
                    // empty.
                  }
                }}
                value="Wallet Connect"
              />

              <br />
              <br />

              <TransparentButton
                onClick={async (e) => {
                  await this.loadTorus();
                  await this.loadBlockchainData();
                  this.closeModal();
                }}
                value="Torus Wallet"
              />

              <br />
              <br />
            </center>
          </Modal.Body>
          <Modal.Footer style={{ background: '#141A1E' }}>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default App;
