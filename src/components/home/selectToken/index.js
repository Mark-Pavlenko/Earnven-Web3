import React, { Component } from "react";
import Currency from "./currency";
import ManageToken from "./manageToken"
import { StyledSelectToken } from "./styles";
import { getQuickswapTokens, getDfynTokens, getSushiTokens } from "../../../api/users/userApi";

import ERC20 from "../../../abi/ERC20.json";
import SecureLS from "secure-ls";
import tokenList from "../../../constants/tokenList";

class SelectToken extends Component 
{
    constructor(props) 
    {
        super(props)
        this.state = 
        {
            tokenList: [],
            searchText: "",
            searchedData: {},
            isShowWarning: false,
            isError: false,
            isManage: false,
            isDfynChecked: false,
            isQuickswapChecked: false,
            isSushiChecked: false,
            isTabClicked: false,
            errorMessage: "Please connect your metamask wallet",
            errorTitle: "Wallet Not Connected",
            data: [],
            commonBases: 
            [
                {
                    logoURI: "https://dynamic-assets.coinbase.com/085ce26e1eba2ccb210ea85df739a0ca2ef782747e47d618c64e92b168b94512df469956de1b667d93b2aa05ce77947e7bf1b4e0c7276371aa88ef9406036166/asset_icons/57f28803aad363f419a950a5f5b99acfd4fba8b683c01b9450baab43c9fa97ea.png",
                    symbol: "WMATIC",
                    name: "Wrapped MATIC",
                    address: "0x4c28f48448720e9000907BC2611F73022fdcE1fA",
                    decimals: 18,
                    chainId: 137
                },
                {
                    logoURI: "https://dynamic-assets.coinbase.com/085ce26e1eba2ccb210ea85df739a0ca2ef782747e47d618c64e92b168b94512df469956de1b667d93b2aa05ce77947e7bf1b4e0c7276371aa88ef9406036166/asset_icons/57f28803aad363f419a950a5f5b99acfd4fba8b683c01b9450baab43c9fa97ea.png",
                    symbol: "WMATIC2",
                    name: "Wrapped MATIC",
                    address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
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
                {
                    logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
                    symbol: "DAI",
                    name: "Dai",
                    address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
                    decimals: 18,
                    chainId: 137
                },
                {
                    logoURI: "https://assets.coingecko.com/coins/images/2518/small/weth.png?1547036627",
                    symbol: "WETH",
                    name: "Wrapped Ether",
                    address: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
                    decimals: 18,
                    chainId: 137
                }
            ],
            ls: "",
            allSelectedTokens: [],
            filteredData: [],
            savedTokens: []
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.search = this.search.bind(this);
        this.getSearchedToken = this.getSearchedToken.bind(this);
        this.importToken = this.importToken.bind(this);
        this.handleSelectToken = this.handleSelectToken.bind(this);
        this.tokenCallback = this.tokenCallback.bind(this);
        this.loadDfynTokens = this.loadDfynTokens.bind(this);
        this.loadQuickswapTokens = this.loadQuickswapTokens.bind(this);
        this.loadSushiTokens = this.loadSushiTokens.bind(this);
        this.mounted = this.mounted.bind(this);
        this.loadTokens = this.loadTokens.bind(this);
        this.secureLsInit = this.secureLsInit.bind(this);
        this.removeSavedToken = this.removeSavedToken.bind(this);
        this.removeAllSavedTokens = this.removeAllSavedTokens.bind(this);
    }
  
    async componentDidMount() 
    {
        await this.mounted();
        await this.loadTokens();
    }

    async mounted()
    {
        this.state.data = tokenList[this.props.chainId];
        this.setState([...this.state.data]);
        this.secureLsInit();

        // Add savedTokens to data object if it has saved tokens
        if(typeof this.state.ls.get('savedTokens') === 'object') 
        {
            this.state.data = this.state.ls.get('savedTokens')[this.props.chainId] ? this.state.data.concat(this.state.ls.get('savedTokens')[this.props.chainId]) : this.state.data;
            this.setState([...this.state.data]);
        }

        // Get the list of selected tokens
        this.state.allSelectedTokens = this.state.allSelectedTokens.concat(this.props.selectedTokens);
        this.setState([...this.state.allSelectedTokens]);
        // Add MATIC on the data object if this is the output token and no WMATIC is selected on input tokens

        let data = this.state.data;

        // Add output token to allSelectedTokens
        this.state.allSelectedTokens.push(this.props.targetToken);
        this.setState([...this.state.allSelectedTokens]);
        this.setState({filteredData: data});
    }

    async loadTokens()
    {
        if (this.state.isDfynChecked)
        {
            await getQuickswapTokens({}, this.tokenCallback);
        }
        if (this.state.isQuickswapChecked)
        {
            await getDfynTokens({}, this.tokenCallback);
        }
        if (this.state.isSushiChecked)
        {
            await getSushiTokens({}, this.tokenCallback);
        }
    }

    secureLsInit()
    {
        this.state.ls = new SecureLS({ encryptionSecret: "securelsTrakinvest*$%@&$" });

        if (!this.state.ls.getAllKeys().includes('savedTokens') || typeof this.state.ls.get('savedTokens') === 'string') 
        {
            let obj = {};
            obj[this.props.chainId] = [];
            this.state.ls.set('savedTokens', obj);
        }
        // else if (Object.keys(this.state.ls.get('savedTokens')).includes(this.props.chainId) && )
        if (!this.state.ls.getAllKeys().includes('isDfynChecked') || typeof this.state.ls.get('isDfynChecked') !== 'boolean')
        {
            this.state.ls.set('isDfynChecked', false);
        }
        if (!this.state.ls.getAllKeys().includes('isQuickswapChecked') || typeof this.state.ls.get('isQuickswapChecked') !== 'boolean')
        {
            this.state.ls.set('isQuickswapChecked', false);
        }
        if (!this.state.ls.getAllKeys().includes('isSushiChecked') || typeof this.state.ls.get('isSushiChecked') !== 'boolean')
        {
            this.state.ls.set('isSushiChecked', false);
        }

        const savedTokens = this.state.ls.get('savedTokens')[this.props.chainId];
        // const defaultTokens = this.state.data;
        // defaultTokens.push()

        this.setState({isDfynChecked: this.state.ls.get('isDfynChecked')});
        this.setState({isQuickswapChecked: this.state.ls.get('isQuickswapChecked')});
        this.setState({isSushiChecked: this.state.ls.get('isSushiChecked')});
        this.setState({savedTokens})
        // this.state.ls.removeAll();
    }

    async handleSearch(e) 
    {
        this.setState({searchText: e.target.value});
        let data = this.state.data;
        if (e.target.value.startsWith("0x")) 
        {
            data = data.filter((x) => x.symbol !== "MATIC");
        }
        this.state.filteredData = data.filter(this.search(e.target.value));
        this.setState([...this.state.filteredData]);

        if (!this.state.filteredData.length && e.target.value.length > 30 && e.target.value.startsWith("0x")) 
        {
            this.getSearchedToken(e.target.value);
        }
    }

    search(text) 
    {
        return (searchItem) => 
        {
            if (searchItem.symbol.toLowerCase().includes(text.toLowerCase()) || (text.length > 30 && searchItem.address.toLowerCase().includes(text.toLowerCase())))
            return searchItem;
        }
    }

    async getSearchedToken(address) 
    {
        if (this.state.searchedData.address && this.state.searchedData.address === address) return;
        
        if (!this.props.account.length) 
        {
            this.setState({isError: true});
            return;
        }

        const { web3 } = window;
        const ercContract = await new web3.eth.Contract(ERC20, address);
        await ercContract.methods.symbol().call({from:this.props.account}).then(async (res) =>
        {
            const tokenName = await ercContract.methods.name().call({from: this.props.account});
            const decimals = await ercContract.methods.decimals().call({from: this.props.account});
            const obj = 
            {
                logoURI: "https://cdn.imgbin.com/5/7/6/imgbin-computer-icons-question-mark-symbol-symbol-ENabv6w1xfvGrpWTRw4YrX25q.jpg",
                symbol: res,
                name: tokenName,
                address: address,
                decimals,
                chainId: 137
            };
            this.setState({searchedData: obj});
            return;
        }).catch((error) => 
        {
            this.setState({isError: true});
            this.setState({errorMessage: "The token you are trying to search may not be available in this network. Please check your token address carefully."});
            this.setState({errorTitle: "Token Not Found"});
        });
    }

    importToken(tokenData) 
    {
        let savedTokens = this.state.ls.get('savedTokens');
        if (Object.keys(savedTokens).includes(String(this.props.chainId)) && savedTokens[this.props.chainId].length)
        {
            savedTokens[this.props.chainId].push(tokenData);
        }
        else
        {
            savedTokens[this.props.chainId] = [tokenData];
        }
        this.state.ls.set('savedTokens', savedTokens);
        this.props.handleSelectToken(tokenData);
    }

    removeSavedToken(i) 
    {
        const savedTokens = this.state.savedTokens;
        let lsSavedTokens = {};
        savedTokens.splice(i, 1);
        this.setState({savedTokens});
        lsSavedTokens[this.props.chainId] = savedTokens;
        this.state.ls.set('savedTokens', lsSavedTokens);
    }

    removeAllSavedTokens() 
    {
        let lsSavedTokens = {};
        lsSavedTokens[this.props.chainId] = [];
        this.setState({savedTokens: []});
        this.state.ls.set('savedTokens', lsSavedTokens);
    }

    async handleSelectToken(item) 
    {
        if(!this.state.allSelectedTokens.includes(item.symbol)) 
        {
            this.props.handleSelectToken(item);
        }
        else if ((this.props.isTargetToken && this.props.selectedTokens.includes(item.symbol)))
        {
            await this.props.handleFlipToken(tokenList[this.props.chainId].find((token) => token.symbol === this.props.currentToken), true, undefined, item.address);
            this.props.handleSelectToken(item);
        }
        else if (!this.props.isTargetToken && this.props.targetToken === item.symbol)
        {
            this.props.handleSelectToken(item, true);
            this.props.handleFlipToken(tokenList[this.props.chainId].find((token) => token.symbol === this.props.currentToken));
        }
        // else 
        // {
        //     if(!this.props.isTargetToken) 
        //     {
        //         if(item.symbol === "WMATIC" && this.props.targetToken !== "MATIC" && this.props.targetToken !== "WMATIC" && !this.props.selectedTokens.includes("WMATIC")) 
        //         {
        //             this.props.handleSelectToken(item);
        //         }
        //     }
        //     else if(this.props.isTargetToken) 
        //     {
        //         if(item.symbol === "MATIC" && !this.props.selectedTokens.includes("WMATIC")) 
        //         {
        //             this.props.handleSelectToken(item);
        //         }
        //         else if(item.symbol === "WMATIC" && !this.props.selectedTokens.includes("WMATIC")) 
        //         {
        //             this.props.handleSelectToken(item);
        //         }
        //     }
        // }
    }

    tokenCallback(eventData)
    {
        let { data } = this.state;
        data = data.concat(eventData.tokens);
        const tokens = [];
        const map = new Map();

        for (let i=0; i < data.length; i++)
        {
            const token = data[i];
            if(!!token.address && !map.has(token.address.toLowerCase()) && token.chainId === 137)
            {
                map.set(token.address.toLowerCase(), true);
                tokens.push(token);
            }
            else if (i === 0 && !token.address && token.symbol === "MATIC")
            {
                tokens.push(token);
            }
        }

        this.setState({data: tokens});
        this.setState({filteredData: tokens});
    }

    async loadDfynTokens(checked)
    {
        this.state.ls.set('isDfynChecked', !this.state.isDfynChecked);
        this.setState({isDfynChecked: !this.state.isDfynChecked});
        await this.mounted();
        await this.loadTokens();
    }

    async loadQuickswapTokens(checked)
    {
        this.state.ls.set('isQuickswapChecked', !this.state.isQuickswapChecked);
        this.setState({isQuickswapChecked: !this.state.isQuickswapChecked});
        await this.mounted();
        await this.loadTokens();
    }

    async loadSushiTokens(checked)
    {
        this.state.ls.set('isSushiChecked', !this.state.isSushiChecked);
        this.setState({isSushiChecked: !this.state.isSushiChecked});
        await this.mounted();
        await this.loadTokens();
    }

    render() 
    {
        return (
            <StyledSelectToken>
                {console.log("hello outside modal")}
                {console.log("state value::",this.state.isManage)}
                { !this.state.isShowWarning && !this.state.isError && !this.state.isManage ?
                <div className="token-selector-container">
                    <div className="token-selector-wrapper">
                        <div className="select-token-header">
                            <div className="select-token-text">
                                Select a token
                            </div>
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
                        <div className="search-box-container">
                            <input
                                type="text"
                                onChange={this.handleSearch}
                                id="token-search-input"
                                placeholder="Search name or paste address"
                                autoComplete="off"
                                className="token-input"
                                value={this.state.searchText}
                            />
                        </div>
                        <div className="common-base-container">
                            <div className="common-base-wrapper">
                                <div className="common-base-text">Common bases</div>
                            </div>
                            <div className="common-base-tokenlist-container">
                                {this.state.commonBases.map((token) => 
                                {
                                    return (
                                        <div className="common-base-token-container" onClick={() => this.handleSelectToken(token)}>
                                            <div className="common-base-token-wrapper">
                                                <img
                                                    className="coin-img"
                                                    alt=""
                                                    src={token.logoURI}
                                                />
                                                <div className="coin-name">
                                                    {token.symbol}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="list-container">
                            {console.log("value of filtered token list:::",this.state.filteredData)}
                            { this.state.data.length > 0 && this.state.filteredData.map((item, index) => 
                                {
                                    return (
                                        <div
                                            key={index}
                                            onClick={() => this.handleSelectToken(item)}>
                                            <Currency
                                                src={item.logoURI}
                                                name={item.symbol}
                                                desc={item.name}
                                            />
                                        </div>
                                    );
                                })
                            }
                            { Object.keys(this.state.searchedData).length > 0 &&
                                <div>
                                    <Currency
                                        toggleIsShowWarning={() => this.setState({isShowWarning: true})}
                                        isImported={true}
                                        src={this.state.searchedData.logoURI}
                                        name={this.state.searchedData.symbol}
                                        desc={this.state.searchedData.name}
                                    />
                                </div>
                            }
                        </div>
                        <div className="manage-token-btn-container">
                            <button className="manage-token-btn" onClick={() => this.setState({isManage: true})}>
                                Manage Tokens
                            </button>
                        </div>
                    </div>
                </div> : this.state.isShowWarning && !this.state.isError && !this.state.isManage ?
                <div className="token-selector-container">
                    <div className="token-selector-wrapper">
                        <div className="import-token-header">
                            <div className="select-token-text-center">
                                <div className="row">
                                    <div className="col-sm-2" style={{ textAlign: "left" }}>
                                        <svg
                                            onClick={() => this.setState({isShowWarning: false})}
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
                                            <line x1="12" y1="6" x2="6" y2="12"></line>
                                            <line x1="6" y1="12" x2="12" y2="18"></line>
                                            <line y1="12" x1="6" y2="12" x2="19"></line>
                                        </svg>
                                    </div>
                                    <div className="col-sm-8" style={{ textAlign: "center" }}>
                                        <h5>Import Token</h5>
                                    </div>
                                    <div className="col-sm-2" style={{ textAlign: "right" }}>
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
                                </div>
                            </div>
                            <hr style={{ margin: "10px" }} />
                        </div>
                        <div className="import-warning">
                            This token doesn't appear on the active token list(s). Make sure this is the token that you want to trade.
                        </div>
                        <div className="import-details">
                            <div className="currency-logo">
                                <img src={this.state.searchedData.logoURI} />
                            </div>
                            <div className="token-ticker">
                                {this.state.searchedData.symbol}
                            </div>
                            <div className="token-name">
                                {this.state.searchedData.name}
                            </div>
                            <div className="token-address">
                                {this.state.searchedData.address}
                            </div>
                            <div className="warning-container">
                                <div className="warning">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="10px" 
                                        height="10px" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="#FF4343" 
                                        strokeWidth="2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="8" x2="12" y2="12"></line>
                                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                    </svg>
                                    <span className="warning-unknown">
                                        Unknown Sources
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button className="import-button" onClick={() => this.importToken(this.state.searchedData)}>
                            Import
                        </button>
                    </div>
                </div> : this.state.isManage ?
                <div className="token-selector-container">
                    <div className="token-selector-wrapper">
                        <div className="import-token-header">
                            <div className="select-token-text-center">
                                <div className="row">
                                    <div className="col-sm-2" style={{ textAlign: "left" }}>
                                        <svg
                                            onClick={() => this.setState({isManage: false})}
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
                                            <line x1="12" y1="6" x2="6" y2="12"></line>
                                            <line x1="6" y1="12" x2="12" y2="18"></line>
                                            <line y1="12" x1="6" y2="12" x2="19"></line>
                                        </svg>
                                    </div>
                                    <div className="col-sm-8" style={{ textAlign: "center" }}>
                                        <h5>Manage Tokens</h5>
                                    </div>
                                    <div className="col-sm-2" style={{ textAlign: "right" }}>
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
                                </div>
                            </div>
                            <hr style={{margin: "5px 0 5px"}} />
                        </div>
                        <div className="manage-token-wrapper">
                            <div className="row lists-tokens-tab-header">
                                <div className="col-sm-6 list-tokens-container">
                                    <button
                                        className={`lists-tokens-tab ${!this.state.isTabClicked ? 'active-tab' : 'inactive-tab'}`} 
                                        onClick={() => this.setState({isTabClicked: false})}>
                                        Lists
                                    </button>
                                </div>
                                <div className="col-sm-6 list-tokens-container">
                                    <button
                                        className={`lists-tokens-tab ${this.state.isTabClicked ? 'active-tab' : 'inactive-tab'}`} 
                                        onClick={() => this.setState({isTabClicked: true})}>
                                        Tokens
                                    </button>
                                </div>
                            </div>
                            <div className="lists-tokens-tab-content">
                                {!this.state.isTabClicked ? 
                                <div style={{height: '430px'}}>
                                    <ManageToken
                                        theme={this.props.theme}
                                        checked={this.state.isDfynChecked}
                                        toggleCheck={(checked) => this.loadDfynTokens(checked)}
                                        src="https://s2.coinmarketcap.com/static/img/coins/64x64/9511.png"
                                        name="DFYN Tokens"
                                        desc="74 tokens"
                                        color="#4ab7ec"
                                    />
                                    <ManageToken
                                        theme={this.props.theme}
                                        checked={this.state.isQuickswapChecked}
                                        toggleCheck={(checked) => this.loadQuickswapTokens(checked)}
                                        src="https://assets.coingecko.com/coins/images/13970/small/1_pOU6pBMEmiL-ZJVb0CYRjQ.png?1613386659"
                                        name="Quickswap Tokens"
                                        desc="126 tokens"
                                        color="#0094ec"
                                    />
                                    <ManageToken
                                        theme={this.props.theme}
                                        checked={this.state.isSushiChecked}
                                        toggleCheck={(checked) => this.loadSushiTokens(checked)}
                                        src="https://assets.coingecko.com/coins/images/12271/small/512x512_Logo_no_chop.png?1606986688"
                                        name="SushiSwap Menu"
                                        desc="86 tokens"
                                        color="#e75aa6"
                                    />
                                </div> : 
                                <div>
                                    <div className="custom-token-content-wrapper">
                                        <div className="row custom-token-header">
                                            <div className="col-sm-6">
                                                <div className="custom-token-header-left">
                                                    {`${this.state.savedTokens.length} ${this.state.savedTokens.length > 1 ? "Custom Tokens": "Custom Token"}`}
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div 
                                                    className="custom-token-header-right"
                                                    onClick={() => this.removeAllSavedTokens()}>
                                                    Clear all
                                                </div>
                                            </div>
                                        </div>

                                        {this.state.savedTokens.length > 0 && this.state.savedTokens.map((token, index) => 
                                            {
                                                return (
                                                    <div className="row custom-token-content">
                                                        <div className="col-sm-6">
                                                            <div className="row">
                                                                <div className="col-sm-1">
                                                                    <img src={token.logoURI} />
                                                                </div>
                                                                <div className="col-sm-10">
                                                                    <a className="custom-token-name" target="_blank" href={"https://polygonscan.com/token/" + token.address}>{token.symbol}</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div className="custom-token-actions">
                                                                <svg
                                                                    onClick={() => this.removeSavedToken(index)}
                                                                    xmlns="http://www.w3.org/2000/svg" 
                                                                    width="24" 
                                                                    height="24" 
                                                                    viewBox="0 0 24 24" 
                                                                    fill="none" 
                                                                    stroke="currentColor" 
                                                                    strokeWidth="2" 
                                                                    strokeLinecap="round" 
                                                                    strokeLinejoin="round" 
                                                                    class="sc-1cchcrx-8 kmfzfO">
                                                                    <polyline points="3 6 5 6 21 6"></polyline>
                                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                                </svg>

                                                                <a target="_blank" href={"https://polygonscan.com/token/" + token.address}>
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
                                                                        class="sc-1cchcrx-7 dRUSwL">
                                                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                                        <polyline points="15 3 21 3 21 9"></polyline>
                                                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                                                    </svg>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                    <hr />
                                    <div style={{textAlign: 'center'}}>
                                        Tip: Custom tokens are stored locally in your browser
                                    </div>
                                </div> }
                            </div>
                        </div>
                    </div>
                </div> : 
                <div className="token-selector-container">
                    <div className="token-selector-wrapper">
                        <div className="import-token-header">
                            <div className="select-token-text-center">
                                <div className="row">
                                    <div className="col-sm-2" style={{ textAlign: "left" }}>
                                        &nbsp;
                                    </div>
                                    <div className="col-sm-8" style={{ textAlign: "center" }}>
                                        <h5>{this.state.errorTitle}</h5>
                                    </div>
                                    <div className="col-sm-2" style={{ textAlign: "right" }}>
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
                                </div>
                            </div>
                        </div>
                        <div className="import-warning">
                            <div className="warning-sign">
                                <img src="https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png" />
                            </div>
                            <p style={{fontSize: '18px'}}>
                                { this.state.errorMessage }
                            </p>
                        </div>
                    </div>
                </div> }
            </StyledSelectToken>
        );
    }
}

export default SelectToken;
