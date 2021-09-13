import { Component } from "react";
import { StyledSingleTokenContainer } from "./styles";
import { toast } from "react-toastify";

class singleTokenContainer extends Component
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
            <StyledSingleTokenContainer>
                <div id="swap-currency-output" className="swap-currency-input-class" style={{opacity: this.props.isMultiToSingleToken || this.props.selectedDownToken.isApprove ? "1" : "0.5"}}>
                    <div className="elements-container">
                        <div className="elements-wrapper">
                            {this.props.isDownClicked && this.props.selectedDownToken?.symbol?.length > 0 ? 
                            <button
                                className="open-currency-select-button"
                                onClick={() =>
                                    this.props.isAllTokenLoaded ? 
                                    this.props.handleTokenDownDropdownClicked() : 
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
                                            src={this.props.selectedDownToken.logoURI}
                                            style={{ marginRight: "0.5rem" }}
                                            className="coin-image"
                                        />
                                        <span className="token-symbol-container">
                                            { this.props.selectedDownToken.symbol }
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
                                    this.props.isAllTokenLoaded ? 
                                    this.props.handleTokenDownDropdownClicked() :
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
                            <input
                                readOnly={true}
                                className="token-amount-input"
                                onChange={() => this.props.handleInput2Change()}
                                name="secondinput"
                                value={this.props.secondInput}
                                inputMode="decimal"
                                type="text"
                                pattern="^[0-9]*[.,]?[0-9]*$"
                                placeholder="0.0"
                                minLength="1"
                                maxLength="79"
                                spellCheck="false"
                                style={{cursor: 'unset'}}
                            />
                        </div>

                        <div className="price-container" style={{paddingLeft: '20px'}}>
                            <div className={this.props.account && this.props.selectedDownToken.symbol.length ? "price-wrapper" : "price-wrapper-hide"}>
                                <div className="price-type">
                                    <span className="price">
                                        Balance: { (parseInt(this.props.selectedDownToken.balance) / 10 ** this.props.selectedDownToken.decimals)
                                        .toString().includes('e') || this.props.selectedDownToken.balance === 0 ? 0 : (parseInt(this.props.selectedDownToken.balance) / 10 ** this.props.selectedDownToken.decimals)
                                        .toString().slice(0, ((parseInt(this.props.selectedDownToken.balance) / 10 ** this.props.selectedDownToken.decimals)
                                        .toString().indexOf("."))+7)} { this.props.selectedDownToken.symbol }
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </StyledSingleTokenContainer>
        )
    }
}

export default singleTokenContainer;