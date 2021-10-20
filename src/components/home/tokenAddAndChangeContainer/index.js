import React, { Component } from 'react';
import { StyledTokenAddAndChangeContainer } from './styles';

class tokenAddAndChangeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <StyledTokenAddAndChangeContainer>
        <div className="swap-svg-container">
          {this.props.componentType === 'add & change' && (
            <div className="row change-add-combined">
              <div
                onClick={() => this.props.handleAddInput()}
                className="col-sm-6"
                style={{ padding: '0' }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6E727D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line y1="12" x1="5" y2="12" x2="19" />
                </svg>
              </div>
              <div
                onClick={() => this.props.toggleMultiToSingleToken()}
                className="col-sm-6 u-rotate"
                style={{ padding: '0' }}>
                {/* <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#6E727D"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <polyline points="19 12 12 19 5 12"></polyline>
                                </svg> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="5 1 6 24"
                  stroke="#6E727D">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </div>
            </div>
          )}
          {this.props.componentType === 'add' && (
            <div onClick={() => this.props.handleAddInput()} className="col-sm-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6E727D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line y1="12" x1="5" y2="12" x2="19" />
              </svg>
            </div>
          )}
          {this.props.componentType === 'change' && (
            <div
              onClick={() => this.props.toggleMultiToSingleToken()}
              className="col-sm-6 u-rotate">
              {/* <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#6E727D"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <polyline points="19 12 12 19 5 12"></polyline>
                            </svg> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width="16"
                height="16"
                viewBox="8 0 14 24"
                stroke="#6E727D">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </div>
          )}
        </div>
      </StyledTokenAddAndChangeContainer>
    );
  }
}

export default tokenAddAndChangeContainer;
