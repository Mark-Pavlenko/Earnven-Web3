import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NavbarContainer } from "./styles";
import { Spinner, OverlayTrigger, Tooltip, Overlay } from "react-bootstrap";
import Options from "../options/index";
import Swap from "../../abi/SwapWithReverse.json";
// import SwapToETH from "../../abi/AllRouterSwapToEth.json";
import IUniswapV2Router02 from "../../abi/IUniswapV2Router02.json";
import Web3 from "web3";
import SecureLS from "secure-ls";
import nuclearWasteIcon from "../../assets/images/nuclear_waste_icon.jpg";
import { debounce } from "throttle-debounce";

class Navbar extends Component 
{
    constructor(props) 
    {
        super(props)
        this.state = 
        {
            isOptionClicked: false,
            isConnect: false,
            account: "",
            networkType: "",
            ls: "",
            chainId: "",
            show: false
        }
        this.myRef = React.createRef();
        this.handleSwapAllTokens = debounce(5000, true, () =>
        {
            this.props.handleSwapAllTokens();
        });

        this.handleClick = this.handleClick.bind(this);
        this.loadWeb3 = this.loadWeb3.bind(this);
        this.loadBlockchainData = this.loadBlockchainData.bind(this);
        this.connectWallet = this.connectWallet.bind(this);
    }

    componentDidMount() 
    {
        this.state.ls = new SecureLS({ encryptionSecret: "securelsTrakinvest*$%@&$" });
        const isConnected = this.state.ls.get('isConnected');
        if (!this.state.isConnect && isConnected)
        {
            this.connectWallet();
        }
    }

    handleClick() 
    {
        this.setState({ isOptionClicked: !this.state.isOptionClicked });
    }

    async loadWeb3() 
    {
        if (window.ethereum) 
        {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        }
        else if (window.web3) 
        {
            window.web3 = new Web3(window.web3.currentProvider);
        }
        else 
        {
            window.alert("Please Install Metamask...");
            return false;
        }
        return true;
    }

    async loadBlockchainData() 
    {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const network = await web3.eth.net.getNetworkType();
        this.props.getAccount(accounts[0]);
        this.setState({account: accounts[0]});
        this.setState({networkType: network[0].toUpperCase() + network.slice(1)});

        console.log("value of networkId::",networkId);

        // if (networkId === 137) 
        if (networkId === 4) 
        {
            // const swap = new web3.eth.Contract(Swap, "0xd1a23052ed40f03007eB85E6A87acDcB7a1275af");
            const swap = new web3.eth.Contract(Swap, "0xD63a6C43d32fa69d4FdF38Cd4475905E298b4FbD");
            // const swapToETH = new web3.eth.Contract(SwapToETH, "0xece2546292E8569503381C4eAe9457f1115EE639");
            const dfynContract = new web3.eth.Contract(IUniswapV2Router02, "0xA102072A4C07F06EC3B4900FDC4C7B80b6c57429");
            // const sushiContract = new web3.eth.Contract(IUniswapV2Router02, "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506");
            const sushiContract = new web3.eth.Contract(IUniswapV2Router02, "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506");
            // const quickContract = new web3.eth.Contract(IUniswapV2Router02, "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff");
            const uniContract = new web3.eth.Contract(IUniswapV2Router02, "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D");
            this.setState({chainId: networkId});
            this.props.getSwapContract(swap);
            // this.props.getSwapToETHContract(swapToETH);
            this.props.getDfynContract(dfynContract);
            this.props.getSushiContract(sushiContract);
            this.props.getQuickContract(uniContract);
            this.props.getChainId(networkId);
        } 
        else 
        {
            alert("Smart contract not deployed to this network..")
        }
        // const balances = await web3.eth.getBalance(accounts[0]);
    }
  
    async connectWallet() 
    {
        const web3Loaded = await this.loadWeb3();
        if (!web3Loaded) return;
        await this.loadBlockchainData();
        this.state.ls.set('isConnected', true);
        this.setState({isConnect: true});
        this.props.resetSelection();
        this.props.handleWalletConnected();
    }

    // handleSwapAllTokens()
    // {
    //     const debounceFunc = debounce(5000, false, () =>
    //     {
    //         // this.props.handleSwapAllTokens();
    //     });
    //     debounceFunc();
    // }

    // renderTooltip()
    // {
    //     <Tooltip>
    //         Swap All Approved Tokens
    //     </Tooltip>
    // }

    render() 
    {
        return (
            <NavbarContainer>
                <div className="navbar-container">
                    <div className="navbar-wrapper">
                        <div className="logo-container">
                            <div className="navbar-logo">
                                <h3 style={{ color: '#3EE046' }}>MatrixSwap</h3>
                            </div>
                        </div>
                        <div className="navbar-tabs">
                        </div>
                        <div className="navbar-feature-wrapper">
                            { this.state.isConnect ?
                            <div className="btn-container">
                                <div className="swap-all-asset-button" style={{ marginRight: "7px" }}>
                                    <img id="swap-all-asset-icon" 
                                        src={nuclearWasteIcon} 
                                        ref={this.myRef}
                                        onMouseEnter={() => this.setState({show: true})} 
                                        onMouseLeave={() => this.setState({show: false})}
                                        onClick={() => this.handleSwapAllTokens()}
                                    />
                                </div>
                                <Overlay target={this.myRef.current} show={this.state.show} placement="left">
                                    {({ placement, arrowProps, show: _show, popper, ...props }) => (
                                    <div
                                        {...props}
                                        style={{
                                            backgroundColor: '#162f1f',
                                            color: '#3EE046',
                                            padding: '0.5rem',
                                            borderRadius: '8px',
                                            marginRight: '7px',
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            ...props.style,
                                        }}
                                        offset="10px"
                                        className="connect-button"
                                    >
                                        Swap all approved tokens to {this.props.outputToken}
                                    </div>
                                    )}
                                </Overlay>
                                <button className="connect-button" style={{ backgroundColor: "rgba(243, 132, 30, 0.05)", color: "rgb(243, 183, 30)", fontWeight: "500" }}>
                                    { this.state.chainId === 137 ? "Polygon" : this.state.networkType }
                                </button>
                                <button className="connect-button">
                                    { this.state.account.substring(0, 6) + "..." + this.state.account.substring(this.state.account.length-4, this.state.account.length) }
                                    <Spinner animation="border" size="sm" style={{ color: '#bfbfbf', marginLeft: "5px", display: this.props.isSwapLoading ? 'inline' : 'none'}} />
                                </button>
                            </div> : 
                            <div className="btn-container">
                                <button className="connect-button" onClick={this.connectWallet}>
                                    Connect to a wallet
                                </button>
                            </div> }
                            <div className="change-theme-container">
                                <button
                                    onClick={() => this.props.themeToggler()}
                                    className="theme-button">
                                    {this.props.theme === "light" ?
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="5"></circle>
                                        <line x1="12" y1="1" x2="12" y2="3"></line>
                                        <line x1="12" y1="21" x2="12" y2="23"></line>
                                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                        <line x1="1" y1="12" x2="3" y2="12"></line>
                                        <line x1="21" y1="12" x2="23" y2="12"></line>
                                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                                    </svg> :
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlns="http://www.w3.org/1999/xlink"
                                        aria-hidden="true"
                                        focusable="false"
                                        width="0.89em"
                                        height="1em"
                                        preserveAspectRatio="xMidYMid meet"
                                        viewBox="0 0 750 850">
                                        <path
                                            d="M732 392q3-2 7-1t3 5q-4 76-36 142t-84 114t-122 74t-147 23q-71-4-133-33t-109-77t-77-109T1 397q-4-78 23-147t74-122t114-84T354 8q4 0 6 3t-2 7q-31 40-46 90t-8 106q5 45 25 85t51 71t71 51t85 25q56 7 106-8t90-46z"
                                            fill="white"
                                        />
                                    </svg> }
                                </button>
                            </div>
                            <div className="option-container">
                                <button className="navbar-options" onClick={this.handleClick}>
                                    {this.props.theme === "light" ?
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="sc-hMqMXs uhlXa">
                                        <path
                                            d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                                            stroke="black"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round">
                                        </path>
                                        <path
                                            d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                                            stroke="black"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round">
                                        </path>
                                        <path
                                            d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                                            stroke="black"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round">
                                        </path>
                                    </svg> :
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="sc-hMqMXs uhlXa">
                                        <path
                                            d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round">
                                        </path>
                                        <path
                                            d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round">
                                        </path>
                                        <path
                                            d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round">
                                        </path>
                                    </svg> }
                                </button>
                                { this.state.isOptionClicked && <Options /> }
                            </div>
                        </div>
                    </div>
                </div>
            </NavbarContainer>
        );
    }
}

export default Navbar;
