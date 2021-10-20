import React, { Component } from 'react';
import metamaskLogo from '../../../assets/images/metamask.png';
import { StyledTransactionSubmitted } from './styles';

class transactionSubmitted extends Component {
  constructor(props) {
    super(props);
  }

  handleAddToMetamask() {
    window.ethereum
      .request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: this.props.targetToken.address,
            symbol: this.props.targetToken.symbol,
            decimals: this.props.targetToken.decimals,
            image: this.props.targetToken.logoURI,
          },
        },
      })
      .then((success) => {
        if (success) {
          console.log(`${this.props.targetToken.symbol} successfully added to wallet!`);
        } else {
          throw new Error('Something went wrong.');
        }
      })
      .catch(console.error);
  }

  render() {
    return (
      <StyledTransactionSubmitted>
        <div className="transaction-submitted-container">
          <div className="close-button">
            <svg
              onClick={this.props.closeModal}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="svg-token">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <div className="arrow-up-logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="90px"
              height="90px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgb(243, 183, 30)"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="16 12 12 8 8 12" />
              <line x1="12" y1="16" x2="12" y2="8" />
            </svg>
          </div>
          <div className="confirmation-header">Transaction Submitted</div>
          <div className="explorer-view">
            <a
              target="_blank"
              href={
                (this.props.chainId === 137
                  ? 'https://polygonscan.com/tx/'
                  : 'https://etherscan.io/tx/') + this.props.transactionHash
              }>
              View on Explorer
            </a>
          </div>
          <div className="metamask-add" onClick={() => this.handleAddToMetamask()}>
            Add {this.props.targetToken.symbol} to Metamask{' '}
            <img src={metamaskLogo} style={{ width: '16px' }} />
          </div>
          <div>
            <button className="bottom-close-buton" onClick={this.props.closeModal}>
              Close
            </button>
          </div>
        </div>
      </StyledTransactionSubmitted>
    );
  }
}

export default transactionSubmitted;
