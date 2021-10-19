import React, { Component } from "react";
import { StyledSwapButtonContainer } from "./styles";

class swapButton extends Component
{
    constructor(props)
    {
        super(props)
        this.state =
        {
            
        }
    }

    render()
    {
        return (
            <StyledSwapButtonContainer>
                { this.props.isMultiToSingleToken ?
                <div className="connect-wallet-wrapper">
                    { this.props.tokenBlock.every((token) => token.isApprove && token.tokenAmount > 0) && !!this.props.selectedDownToken.name ? 
                    <button className="connect-wallet-btn" onClick={() => this.props.handleSwapToken()}>
                        Swap
                    </button> : this.props.tokenBlock.every((token) => !!token.symbol) && !!this.props.selectedDownToken.name && !this.props.tokenBlock.every((token) => token.isApprove) ?
                    <button className="connect-wallet-btn" onClick={() => this.props.handleApprove()}>
                        Approve
                    </button> : !this.props.tokenBlock.every((token) => !!token.symbol) || !this.props.selectedDownToken.name ?
                    <button className="connect-wallet-btn">
                        Select a token
                    </button> :
                    <button className="connect-wallet-btn">
                        Enter an amount
                    </button> }
                </div> :
                <div className="connect-wallet-wrapper">
                    { this.props.selectedDownToken.isApprove && this.props.tokenBlock.every((token) => token.tokenAmount > 0) && this.props.tokenBlock.every((token) => !!token.name) ? 
                    <button className="connect-wallet-btn" onClick={() => this.props.handleSwapToken()}>
                        Swap
                    </button> : !!this.props.selectedDownToken.symbol && this.props.tokenBlock.every((token) => !!token.name) && !this.props.selectedDownToken.isApprove ?
                    <button className="connect-wallet-btn" onClick={() => this.props.handleApprove()}>
                        Approve
                    </button> : !this.props.selectedDownToken.symbol || !this.props.tokenBlock.every((token) => !!token.name) ?
                    <button className="connect-wallet-btn">
                        Select a token
                    </button> :
                    <button className="connect-wallet-btn">
                        Enter an amount
                    </button> }
                </div> }
            </StyledSwapButtonContainer>
        )
    }
}

export default swapButton;