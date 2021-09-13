import React, { Component } from "react";
import { StyledConfirmSwap } from "./styles";
import { Spinner } from "react-bootstrap";

class confirmSwap extends Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return (
            <StyledConfirmSwap>
                <div className="swap-loading-container">
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
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </div>
                    <div className="loading-spinner">
                        <Spinner animation="border" style={{ width:'100px', height:'100px' }} variant="primary" />
                    </div>
                    <div className="confirmation-header">
                        Waiting For Confirmation
                    </div>
                    <div className="swapping-content">
                        Swapping tokens for {this.props.value + " " + this.props.targetToken}
                    </div>
                    <div className="wallet-confirm">
                        Confirm this transaction in your wallet
                    </div>
                </div>
            </StyledConfirmSwap>
        );
    }
}

export default confirmSwap;
