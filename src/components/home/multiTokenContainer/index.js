/* eslint-disable */
import React, { Component } from "react";
import { StyledMultiTokenContainer } from "./styles";
import { toast } from "react-toastify";
import Slider from "rc-slider";

class multiTokenContainer extends Component
{
    constructor(props)
    {
        super(props)
        this.state =
        {
            percentageInput: [],
            multiInput: [],
            sliderMarks:
            {
                0: "",
                25: "",
                50: "",
                75: "",
                100: ""
            },
        }
    }

    render()
    {
        return (
            <StyledMultiTokenContainer>
                { this.props.tokenBlock.map((token, i) => 
                    {
                        return (
                            <div
                                key={i}
                                id="swap-currency-input"
                                style={{opacity: !this.props.isMultiToSingleToken || token.isApprove ? "1" : "0.5"}}
                                className="swap-currency-input-class">

                                {/* Delete Button Section */}

                                <svg 
                                    style={{display: this.props.tokenBlock.length > 1 ? "block" : "none"}}
                                    className="remove-token-selection-icon"
                                    onClick={() => this.props.handleRemove(i)}
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="currentColor"
                                    width="12" 
                                    height="12" 
                                    viewBox="0 0 24 24">
                                    <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/>
                                </svg>

                                <div className="elements-container">
                                    <div className="elements-wrapper">

                                        {/* Token Selection Section */}

                                        { this.props.isUpperClicked && this.props.tokenBlock[i]?.symbol?.length > 0 ? 
                                        <button
                                            className="open-currency-select-button"
                                            onClick={() => 
                                                this.props.tokenBlock.every((token) => !token.loading) ? 
                                                this.props.handleTokenUpperDropdownClicked(i) : 
                                                toast.warn('Price fetching on progress...', 
                                                {
                                                    position: "bottom-left",
                                                    autoClose: 5000,
                                                    hideProgressBar: false,
                                                    closeOnClick: true,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                })
                                            }>
                                            <span className="img-text-container">
                                                <div className="img-text-wrapper">
                                                    <img
                                                        src={this.props.tokenBlock[i].logoURI}
                                                        style={{ marginRight: "0.5rem" }}
                                                        className="coin-image"
                                                    />
                                                    <span className="token-symbol-container">
                                                        {this.props.tokenBlock[i].symbol}
                                                    </span>
                                                </div>
                                                <svg
                                                    width="12"
                                                    height="7"
                                                    viewBox="0 0 12 7"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="select-currency-svg">
                                                    <path
                                                        d="M0.97168 1L6.20532 6L11.439 1"
                                                        stroke="#AEAEAE">
                                                    </path>
                                                </svg>
                                            </span>
                                        </button> :
                                        <button
                                            className="select-button-wrapper"
                                            onClick={() => 
                                                this.props.tokenBlock.every((token) => !token.loading) ? 
                                                this.props.handleTokenUpperDropdownClicked(i) : 
                                                toast.warn('Price fetching on progress...', 
                                                {
                                                    position: "bottom-left",
                                                    autoClose: 5000,
                                                    hideProgressBar: false,
                                                    closeOnClick: true,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                })
                                            }>
                                            <span className="select-token-container">
                                                <div className="select-token-wrapper">
                                                    <span className="select-token-text">
                                                        Select a token
                                                    </span>
                                                </div>
                                                
                                                <svg
                                                    width="12"
                                                    height="7"
                                                    viewBox="0 0 12 7"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="bottom-arrow">
                                                    <path
                                                        d="M0.97168 1L6.20532 6L11.439 1"
                                                        stroke="#AEAEAE">
                                                    </path>
                                                </svg>
                                            </span>
                                        </button> }

                                        {/* Input Section */}

                                        <input
                                            ref={(input) => this.state.multiInput[token.address] = input}
                                            className="token-amount-input"
                                            onChange={(event) => event.target.value >= 0 ? this.props.handleInput1Change(event.target.value, i) : ""}
                                            inputMode="decimal"
                                            name="firstinput"
                                            type="number"
                                            pattern="^[0-9]*[.,]?[0-9]*$"
                                            placeholder="0.0"
                                            min={0}
                                            minLength="1"
                                            maxLength="79"
                                            spellCheck="false"
                                            value={this.props.tokenBlock[i].tokenAmount}
                                            autoComplete="off"
                                        />

                                        { !this.props.isMultiToSingleToken &&
                                        <span 
                                            className="single-token-input" 
                                            onClick={() => this.state.multiInput[token.address].focus()}>
                                            &nbsp;{ this.props.selectedDownToken.symbol }
                                        </span> }
                                    </div>
                                        
                                    <div className="row">

                                        {/* Percentage Slider & Balance Section */}

                                        <div className="col-sm-7">
                                            <div className={`price-container ${!this.props.isMultiToSingleToken ?  "forced-no-padding" : ""}`} style={{paddingLeft: '20px'}}>
                                                <div className={this.props.account && token.symbol ? "price-wrapper" : "price-wrapper-hide"}>
                                                    { this.props.isMultiToSingleToken &&
                                                    <div style={{marginBottom: '5px'}}>
                                                        <Slider 
                                                            style={{width: '180px', display: 'inline-block'}} 
                                                            min={0} 
                                                            marks={this.state.sliderMarks}
                                                            value={token.percentage}
                                                            defaultValue={0} 
                                                            onChange={(value) => this.props.handlePercentageChange(value, i)}
                                                            disabled={token.balance <= 0}
                                                        />
                                                        <input 
                                                            ref={(input) => this.state.percentageInput[token.address] = input}
                                                            className="percentage-input"
                                                            value={token.percentage} 
                                                            placeholder="0"
                                                            style={{margin: '0 0 5px 10px', height: '16px', width: '30px'}} 
                                                            onChange={(event) => this.props.handlePercentageChange(event.target.value, i)}
                                                        />
                                                        <span 
                                                            onClick={() => this.state.percentageInput[token.address].focus()}
                                                            className="percentage-text">
                                                            %
                                                        </span>
                                                    </div> }
                                                    <div className="price-type">
                                                        <span className="price">
                                                            Balance: { (parseInt(token.balance) / 10 ** token.decimals)
                                                                .toString().includes('e') || token.balance === 0 ? 0 : (parseInt(token.balance) / 10 ** token.decimals)
                                                                .toString().slice(0, ((parseInt(token.balance) / 10 ** token.decimals)
                                                                .toString().indexOf("."))+7)} { token.symbol }
                                                            { this.props.isMultiToSingleToken &&
                                                            <span
                                                                style={{ color: "#d50066", cursor: "pointer" }} 
                                                                onClick={() => this.props.handleInput1Change((parseInt(token.balance)-100000) / 10 ** token.decimals, i)}>
                                                                &nbsp;(Max)
                                                            </span>}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Token Prices Section */}

                                        <div className="col-sm-5">
                                            <div className="price-container" style={{paddingRight: '18px', paddingBottom: '0', textAlign: 'right'}}>
                                                <div className={token.loading ? "price-wrapper" : "price-wrapper-hide"}>
                                                    <div className="price-type">
                                                        <span className="price">
                                                            Fetching Price...
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className={ !token.loading && token.symbol && this.props.selectedDownToken.symbol ? "price-wrapper" : "price-wrapper-hide" }>
                                                    
                                                    { !this.props.isMultiToSingleToken ?
                                                    <div>
                                                        <div style={{width: '18px', position: 'absolute', top: '-20px', right: '-5px', transform: 'rotate(90deg)', color: '#fff'}}>
                                                            <svg 
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                fill="none" 
                                                                viewBox="0 0 24 24" 
                                                                stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4">
                                                                </path>
                                                            </svg>
                                                        </div>
                                                        <div className="equivalent-price">
                                                            {/*≈*/} { parseFloat(token.tokenAmount * token.targetPrice).toFixed(6) } { token.symbol }
                                                        </div>
                                                    </div> :
                                                    <div className="price-type">
                                                        <span className="price">
                                                            1 { this.props.isMultiToSingleToken ? token.symbol : this.props.selectedDownToken.symbol } ≈ { parseFloat(token.targetPrice).toFixed(6) } { this.props.isMultiToSingleToken ? this.props.selectedDownToken.symbol : token.symbol }
                                                        </span>
                                                    </div> }
                                                </div>
                                            </div>
                                        </div>
                                        { !this.props.isMultiToSingleToken &&
                                        <div className="exchange-rate-container">
                                            <div className="exchange-rate-wrapper">
                                                <div className="row">
                                                    <div className="col-sm-6 u-text-left">
                                                        Exchange Rate
                                                    </div>
                                                    <div className="col-sm-6 u-text-right">
                                                        1 { this.props.isMultiToSingleToken ? token.symbol : this.props.selectedDownToken.symbol } ≈ { parseFloat(token.targetPrice).toFixed(6) } { this.props.isMultiToSingleToken ? this.props.selectedDownToken.symbol : token.symbol }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>  }
                                    </div>
                                </div>
                            </div>
                        )
                    }) 
                }
            </StyledMultiTokenContainer>
        )
    }
}

export default multiTokenContainer;