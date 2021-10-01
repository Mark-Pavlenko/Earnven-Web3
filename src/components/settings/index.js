import React, { Component } from "react";
import { StyledSettings } from "./styles";
import { Dropdown } from "react-bootstrap";
import SecureLS from "secure-ls";

class Settings extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            transactionPercent: "",
            minutes: "",
            ls: "",
            stableTokens:
            [
                {
                    logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
                    symbol: "DAI",
                    name: "Dai",
                    address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
                    decimals: 18,
                    chainId: 137
                },
                {
                    logoURI: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389",
                    symbol: "USDC",
                    name: "USD Coin",
                    address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
                    decimals: 6,
                    chainId: 137
                },
                {
                    name: "Tether USD",
                    address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
                    symbol: "USDT",
                    decimals: 6,
                    chainId: 137,
                    logoURI: "https://raw.githubusercontent.com/sushiswap/icons/master/token/usdt.jpg"
                },
            ],
            defaultToken:
            {
                logoURI: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389",
                symbol: "USDC",
                name: "USD Coin",
                address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
                decimals: 6,
                chainId: 137
            }
        }

        this.handleTransactionPercent = this.handleTransactionPercent.bind(this);
        this.handleMinuteChange = this.handleMinuteChange.bind(this);
        this.changeDefaultToken = this.changeDefaultToken.bind(this);
        this.secureLsInit = this.secureLsInit.bind(this);
    }

    componentDidMount()
    {
        this.secureLsInit();
    }

    secureLsInit()
    {
        this.state.ls = new SecureLS({ encryptionSecret: "securelsTrakinvest*$%@&$" });

        if (!this.state.ls.getAllKeys().includes('defaultToken') || typeof this.state.ls.get('defaultToken') === 'string') 
        {
            this.state.ls.set('defaultToken', this.state.defaultToken);
        }
        else if (this.state.ls.getAllKeys().includes('defaultToken') && Object.keys(this.state.ls.get('defaultToken')).length)
        {
            this.setState({defaultToken: this.state.ls.get('defaultToken')});
            this.props.changeDefaultToken(this.state.ls.get('defaultToken'));
        }
    }

    handleTransactionPercent(e)
    {
        const value = e.target.value;
        this.setState({transactionPercent: value});
    }

    handleMinuteChange(e)
    {
        const value = e.target.value;
        this.setState({minutes: value});
    }

    changeDefaultToken(token)
    {
        this.setState({defaultToken: token});
        this.props.changeDefaultToken(token);
        this.state.ls.set('defaultToken', token);
    }
    
    render()
    {
        return (
            <StyledSettings>
                <span className="transaction-settings-container">
                    <div className="transaction-settings-wrapper">
                        <div className="transaction-text">Transaction Settings</div>
                        {/* <div className="slippage-and-transaction-container">
                            <div className="slippage-tolerance-container">
                                <div className="slippage-tolerance-wrapper">
                                    <div className="slippage-tolerance-header">
                                        Slippage tolerance
                                        <span>?</span>
                                    </div>
                                </div>
                                <div className="btn-input-wrapper">
                                    <button className="auto-btn">Auto</button>
                                    <button className="input-btn1">
                                        <div className="transaction-percentage">
                                            <input
                                                placeholder="0.10"
                                                className="input-field"
                                                onChange={(e) => this.handleTransactionPercent(e)}
                                                value={this.state.transactionPercent}
                                                type="number"
                                            />
                                            %
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <div className="transaction-deadline-container">
                                <div className="transaction-deadline-wrapper">
                                    <div className="transaction-deadline-header">
                                        Transaction deadline
                                        <span>?</span>
                                    </div>
                                </div>
                                <div className="transaction-deadline-input">
                                    <button className="btn-transaction">
                                        <input
                                            placeholder="30"
                                            className="transaction-input"
                                            onChange={(e) => this.handleMinuteChange(e)}
                                            value={this.state.minutes}
                                            type="number"
                                        />
                                    </button>
                                    <div className="minutes">minutes</div>
                                </div>
                            </div>
                        </div> */}
                        {/* <div className="interface-settings">Interface Settings</div>

                        <div className="expert-multihops-container">
                            <div className="expert-multihops-wrapper">
                                <div className="expert-multihops-header">
                                    Toggle Expert Mode
                                    <span>?</span>
                                </div>
                            </div>
                        </div>
                        <div className="expert-multihops-container">
                            <div className="expert-multihops-wrapper">
                                <div className="expert-multihops-header">
                                    Disable Multihops
                                    <span>?</span>
                                </div>
                            </div>
                        </div> */}
                        <div className="expert-multihops-container">
                            <div className="expert-multihops-wrapper">
                                <div className="expert-multihops-header">
                                    Set Swap All Tokens to
                                    <span>: &nbsp;</span>
                                    <Dropdown className="inline-block">
                                        <Dropdown.Toggle className="no-style">
                                            <button className="open-currency-select-button">
                                                <span className="img-text-container">
                                                    <div className="img-text-wrapper">
                                                        <img
                                                            src={this.state.defaultToken.logoURI}
                                                            style={{ marginRight: "0.5rem" }}
                                                            className="coin-image"
                                                        />
                                                        <span className="token-symbol-container">
                                                            {this.state.defaultToken.symbol}
                                                        </span>
                                                    </div>
                                                    <svg
                                                        width="10"
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
                                            </button>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {this.state.stableTokens.filter((token) => token.address !== this.state.defaultToken.address).map((token) =>
                                                {
                                                    return (
                                                        <Dropdown.Item onClick={() => this.changeDefaultToken(token)}>
                                                            <div className="img-text-wrapper">
                                                                <img
                                                                    src={token.logoURI}
                                                                    style={{ marginRight: "0.4rem" }}
                                                                    className="coin-image"
                                                                />
                                                                <span className="token-symbol-container">
                                                                    {token.symbol}
                                                                </span>
                                                            </div>
                                                        </Dropdown.Item>
                                                    )
                                                })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </span>
            </StyledSettings>
        );
    }
}

export default Settings;
