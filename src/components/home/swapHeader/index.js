import React, { Component } from 'react';
import { StyledSwapHeaderContainer } from './styles';
import Settings from '../../settings';

class swapHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSettingsClicked: false,
    };

    this.handleSettingsClick = this.handleSettingsClick.bind(this);
  }

  handleSettingsClick() {
    this.setState({ isSettingsClicked: !this.state.isSettingsClicked });
  }

  render() {
    return (
      <StyledSwapHeaderContainer>
        <div className="swap-header-container">
          <div className="swap-header-wrapper">
            {this.props.isMultiToSingleToken ? (
              <div className="swap-wrapper">
                <div style={{ marginRight: '8px' }} className="swap-text">
                  {this.props.tokenBlock.every((token) => token.isApprove) ? (
                    <div className="text-success">Ready to Swap!</div>
                  ) : (
                    <div className="text-danger">
                      Approved (
                      {this.props.tokenBlock.map((x) => x.isApprove).filter(Boolean).length}/
                      {this.props.tokenBlock.length})
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="swap-wrapper">
                <div style={{ marginRight: '8px' }} className="swap-text">
                  {this.props.selectedDownToken.isApprove ? (
                    <div className="text-success">Ready to Swap!</div>
                  ) : (
                    <div className="text-danger">Not Approved</div>
                  )}
                </div>
              </div>
            )}
            <div className="settings-wrapper">
              <div className="settings">
                <button
                  id="open-settings-dialog-button"
                  className="settings-btn"
                  onClick={() => this.handleSettingsClick()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sc-hXRMBi fcGDGN">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </button>
                {this.state.isSettingsClicked && (
                  <Settings changeDefaultToken={(token) => this.props.changeDefaultToken(token)} />
                )}
              </div>
            </div>
          </div>
        </div>
      </StyledSwapHeaderContainer>
    );
  }
}

export default swapHeader;
