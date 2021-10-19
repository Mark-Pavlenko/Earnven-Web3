import React, { Component } from "react";
import { StyledHomePageContainer } from "./styles";
import Modal from "../common/modal";
import { ThemeProvider } from "styled-components";
import SelectToken from "./selectToken/index";
import ConfirmSwap from "./confirmSwap/index";
import TransactionSubmitted from "./transactionSubmitted/index";
import { lightTheme, darkTheme, GlobalStyles } from "../theme/themes";
import ERC20 from "../../abi/ERC20.json";
import { ToastContainer } from "react-toastify";
import SecureLS from "secure-ls";
import tokenList from "../../constants/tokenList";
import MultiTokenContainer from "./multiTokenContainer";
import SingleTokenContainer from "./singleTokenContainer";
import TokenAddAndChangeContainer from "./tokenAddAndChangeContainer";
import SwapHeader from "./swapHeader";
import SwapButton from "./swapButton";
import "rc-slider/assets/index.css";

class HomePage extends Component 
{
    constructor(props) 
    {
        super(props)
        this.state = 
        {
            contractAddress: "0xd1a23052ed40f03007eB85E6A87acDcB7a1275af",
            ls: "",
            firstInput: "",
            secondInput: "",
            erc20: "",
            account: "",
            swap: "",
            swapToETH: "",
            dfyn: "",
            sushi: "",
            quick: "",
            chainId: 137,
            tokenUpperDropdownClicked: false,
            tokenDownDropdownClicked: false,
            isUpperClicked: false,
            isDownClicked: false,
            isNukeInvoked: false,
            selectedIndex: 0,
            theme: "dark",
            isSwapLoading: false,
            isSwapMiniLoading: false,
            isTransactionSubmitted: false,
            isMultiToSingleToken: true,
            transactionHash: "",
            defaultToken:
            {
                logoURI: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389",
                symbol: "USDC",
                name: "USD Coin",
                address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
                decimals: 6,
                chainId: 137
            },
            selectedDownToken: 
            { 
                isApprove: false,
                address: "",
                tokenAmount: "",
                symbol: "",
                logoURI: "",
                targetPrice: 0,
                equivalentPrice: 0,
                loading: false,
                decimals: 18,
                balance: 0,
                path: "",
                isEth: false,
                percentage: "",
                name: "",
            },
            tokenBlock: 
            [{
                isApprove: false,
                address: "",
                tokenAmount: "",
                symbol: "",
                logoURI: "",
                targetPrice: 0,
                equivalentPrice: 0,
                loading: false,
                decimals: 18,
                balance: 0,
                path: "",
                isEth: false,
                percentage: "",
                name: "",
            }]
        }

        this.sleep = this.sleep.bind(this);
        this.getPrice = this.getPrice.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleApprove = this.handleApprove.bind(this);
        this.updateBalances = this.updateBalances.bind(this);
        this.handleAddInput = this.handleAddInput.bind(this);
        this.updateAllPrices = this.updateAllPrices.bind(this);
        this.handleSwapToken = this.handleSwapToken.bind(this);
        this.handleTransition = this.handleTransition.bind(this);
        this.handleThemeToggler = this.handleThemeToggler.bind(this);
        this.handleInput1Change = this.handleInput1Change.bind(this);
        this.handleInput2Change = this.handleInput2Change.bind(this);
        this.handleSwapAllTokens = this.handleSwapAllTokens.bind(this);
        this.updateInputBalances = this.updateInputBalances.bind(this);
        this.updateOutputBalance = this.updateOutputBalance.bind(this);
        this.calculateTotalAmount = this.calculateTotalAmount.bind(this);
        this.calculateTotalAmount1 = this.calculateTotalAmount1.bind(this);
        this.calculateTotalAmount2 = this.calculateTotalAmount2.bind(this);
        this.handleDownSelectToken = this.handleDownSelectToken.bind(this);
        this.handleWalletConnected = this.handleWalletConnected.bind(this);
        this.handleUpperSelectToken = this.handleUpperSelectToken.bind(this);
        this.handlePercentageChange = this.handlePercentageChange.bind(this);
        this.handleSingleToMultiTokenSwap = this.handleSingleToMultiTokenSwap.bind(this);
        this.handleMultiToSingleTokenSwap = this.handleMultiToSingleTokenSwap.bind(this);
        this.handleTokenDownDropdownClicked = this.handleTokenDownDropdownClicked.bind(this);
        this.handleTokenUpperDropdownClicked = this.handleTokenUpperDropdownClicked.bind(this);
        this.handleApproveSingleToMultiToken = this.handleApproveSingleToMultiToken.bind(this);
        this.handleApproveMultiToSingleToken = this.handleApproveMultiToSingleToken.bind(this);
    }

    componentDidMount() 
    {
        this.state.ls = new SecureLS({ encryptionSecret: "securelsTrakinvest*$%@&$" });
        if (!this.state.ls.getAllKeys().includes('approvedTokens') || typeof this.state.ls.get('approvedTokens') === 'string') 
        {
            this.state.ls.set('approvedTokens', {});
        }
        if (!this.state.ls.getAllKeys().includes('inputTokens') || typeof this.state.ls.get('inputTokens') === 'string')
        {
            this.state.ls.set('inputTokens', []);
        }
    }

    sleep(ms)
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    handleWalletConnected()
    {
        const { account, contractAddress } = this.state;
        if (!this.state.ls.getAllKeys().includes('outputToken'))
        {
            this.state.ls.set('outputToken', {});
        }
        if (this.state.ls.get('inputTokens').length)
        {
            let approvedTokens = this.state.ls.get('approvedTokens')[account + contractAddress];
            let inputTokens = this.state.ls.get('inputTokens');
            inputTokens.forEach((token) =>
            {
                if (token.symbol === "ETH") 
                {
                    token.isApprove = true;
                    token.isEth = true;
                }
                else if ((approvedTokens && approvedTokens.includes(token.address))) 
                {
                    token.isApprove = true;
                    token.isEth = false;
                }
                else
                {
                    token.isApprove = false;
                    token.isEth = false;
                }
            });
            console.log("value of input tokens::",inputTokens);
            this.setState({tokenBlock: inputTokens});
            this.setState({isUpperClicked: true});
            this.updateBalances();
        }
        if (Object.keys(this.state.ls.get('outputToken')).length)
        {
            this.handleDownSelectToken(this.state.ls.get('outputToken'));
            this.setState({isDownClicked: true});
        }
    }

    handleThemeToggler() 
    {
        this.state.theme === "light" ? this.setState({theme: "dark"}) : this.setState({theme: "light"});
    }

    handleInput1Change(value, i) 
    {
        let tokenInfo = this.state.tokenBlock[i]; 
        tokenInfo.tokenAmount = value.toString().includes('e-') ? 0 : value;
        tokenInfo.equivalentPrice = (tokenInfo.targetPrice * value).toFixed(6);
        this.setState([...this.state.tokenBlock]);
        
        this.calculateTotalAmount();
    }

    calculateTotalAmount(isMultiToSingleToken=this.state.isMultiToSingleToken)
    {
        if (isMultiToSingleToken) 
        {
            this.calculateTotalAmount1();
        }
        else 
        {
            this.calculateTotalAmount2();
        }
    }

    calculateTotalAmount1()
    {
        const tokenPrices = this.state.tokenBlock.map((x) => parseFloat(x.equivalentPrice));
        const totalPrice = tokenPrices.reduce((x, y) => x + y).toFixed(6);
        this.setState({secondInput: totalPrice});
    }

    calculateTotalAmount2()
    {
        const tokenPrices = this.state.tokenBlock.map((x) => parseFloat(!!x.tokenAmount ? x.tokenAmount : 0));
        const totalPrice = tokenPrices.reduce((x, y) => x + y).toFixed(6);
        this.setState({secondInput: totalPrice});
    }

    async handleTransition(isMultiToSingleToken)
    {
        this.setState({isMultiToSingleToken: !isMultiToSingleToken});
        this.calculateTotalAmount(!isMultiToSingleToken);
        this.updateAllPrices(this.state.selectedDownToken, !isMultiToSingleToken);
    }
    
    handlePercentageChange(value, i)
    {
        let tokenInfo = this.state.tokenBlock[i];
        tokenInfo.percentage = value;
        this.setState([...this.state.tokenBlock]);
        if (parseInt(tokenInfo.balance) > 100000) 
        {
            const amount = ((parseInt(tokenInfo.balance)-100000) / 10 ** tokenInfo.decimals) * value / 100;
            this.handleInput1Change(amount, i);
        }
    }

    handleInput2Change(event) 
    {
        const value2 = event.target.value;
        this.setState({secondInput: value2});
        this.setState({firstInput: value2 * 2});
    }

    handleTokenUpperDropdownClicked(i) 
    {
        this.setState({selectedIndex: i});
        this.setState({isUpperClicked: true});
        this.setState({tokenUpperDropdownClicked: true});
    }

    handleTokenDownDropdownClicked(e) 
    {
        this.setState({isDownClicked: true});
        this.setState({tokenDownDropdownClicked: true});
    }

    async handleUpperSelectToken(item, isFlipped=false, index=this.state.selectedIndex, address) 
    {
        let tokenInfo = this.state.tokenBlock[index];
        
        if (!!item)
        {
            this.setState({tokenUpperDropdownClicked: false});
            const { account, contractAddress } = this.state;
            const approvedTokens = this.state.ls.get('approvedTokens');
            const web3 = window.web3;
            
            if (account)
            {
                if (item.address) 
                {
                    const ercContract = await new web3.eth.Contract(ERC20, item.address);
                    await ercContract.methods.balanceOf(account).call().then((balance) =>
                    {
                        tokenInfo.balance = balance;
                        this.setState([...this.state.tokenBlock]);
                    });
                } 
                else 
                {
                    await web3.eth.getBalance(account).then((balance) =>
                    {
                        tokenInfo.balance = balance;
                        this.setState([...this.state.tokenBlock]);
                    });
                }
            }
            
            tokenInfo.symbol = item.symbol;
            tokenInfo.logoURI = item.logoURI;
            tokenInfo.address = item.address;
            tokenInfo.decimals = item.decimals;
            tokenInfo.name = item.name;
            if (item.symbol === "ETH") 
            {
                tokenInfo.isEth = true;
                tokenInfo.isApprove = true;
            }
            else if (Object.keys(approvedTokens).includes(account + contractAddress)) 
            {
                tokenInfo.isEth = false;
                tokenInfo.isApprove = approvedTokens[account + contractAddress].includes(item.address);
            } 
            else 
            {
                tokenInfo.isEth = false;
                tokenInfo.isApprove = false
            }
            
            this.setState([...this.state.tokenBlock]);
            this.state.ls.set('inputTokens', [...this.state.tokenBlock]);
    
            if (!!this.state.selectedDownToken.symbol && !isFlipped) 
            {
                this.updatePrice(tokenInfo, index, this.state.selectedDownToken);
            }
        }
        else
        {
            const initialState = 
            {
                isApprove: false,
                address: "",
                tokenAmount: "",
                symbol: "",
                logoURI: "",
                targetPrice: 0,
                equivalentPrice: 0,
                loading: false,
                decimals: 18,
                balance: 0,
                isEth: false,
                percentage: "",
                name: "",
            };
            let tokenBlock = this.state.tokenBlock;
            for (let i = 0; i < tokenBlock.length; i++) 
            {
                let token = tokenBlock[i];
                if (token.address === address)
                {
                    tokenBlock[i] = initialState;
                }
            }
            this.setState({tokenBlock: tokenBlock});
            this.state.ls.set('inputTokens', tokenBlock);
        }
    }

    async handleDownSelectToken(item) 
    {
        if (!!item)
        {
            this.setState({tokenDownDropdownClicked: false});
            let selectedToken = item;
            const { account, contractAddress } = this.state;
            const outputToken = this.state.ls.get('outputToken');
            const approvedTokens = this.state.ls.get('approvedTokens');

            if (item.symbol === "MATIC") 
            {
                selectedToken.isEth = true;
                selectedToken.isApprove = true;
            }
            else if (Object.keys(approvedTokens).includes(account + contractAddress)) 
            {
                selectedToken.isEth = false;
                selectedToken.isApprove = approvedTokens[account + contractAddress].includes(item.address);
            } 
            else 
            {
                selectedToken.isEth = false;
                selectedToken.isApprove = false
            }
    
            if (outputToken.symbol !== item.symbol) 
            {
                this.state.ls.set('outputToken', item);
            }
    
            if (account)
            {
                const web3 = window.web3;
                if (selectedToken.address)
                {
                    const ercContract = await new web3.eth.Contract(ERC20, selectedToken.address);
                    ercContract.methods.balanceOf(account).call().then((balance) =>
                    {
                        selectedToken.balance = balance;
                        this.setState({...this.state.selectedDownToken});
                    });
                }
                else
                {
                    web3.eth.getBalance(account).then((balance) =>
                    {
                        selectedToken.balance = balance;
                        this.setState({...this.state.selectedDownToken});
                    });
                }
            }
    
            this.setState({selectedDownToken: selectedToken});
            this.updateAllPrices(item);
        }
        else
        {
            const initialState = {symbol: "", balance: 0};
            this.setState({selectedDownToken: initialState});
            this.state.ls.set('outputToken', initialState);
        }
    }

    updateBalances()
    {
        const { account } = this.state;
        const web3 = window.web3;
        this.updateInputBalances(account, web3);
        this.updateOutputBalance(account, web3);
    }

    async updateInputBalances(account, web3)
    {
        let inputTokens = this.state.tokenBlock;

        for (let i = 0; i < inputTokens.length; i++) 
        {
            let balance;
            while (isNaN(balance))
            {
                await this.sleep(200);
                balance = await this.updateOneInputBalance(inputTokens[i].address, account, web3);
            }
            inputTokens[i].tokenAmount = "";
            inputTokens[i].percentage = 0;
            inputTokens[i].balance = balance;
        }
        
        this.state.ls.set('inputTokens', inputTokens);
        this.setState({tokenBlock: inputTokens});
    }

    async updateOneInputBalance(address, account, web3)
    {
        let balance;
        try 
        {
            if (address) 
            {
                const ercContract = await new web3.eth.Contract(ERC20, address);
                balance = await ercContract.methods.balanceOf(account).call();
            } 
            else 
            {
                balance = await web3.eth.getBalance(account);
            }
        }
        catch (error) 
        {
            if (error.message.includes('-32005'))
            {
                balance = await this.updateOneInputBalance(address, account, web3);
            }
        }
        return balance;
    }

    async updateOutputBalance(account, web3)
    {
        const savedOutputToken = this.state.ls.get('outputToken');
        let outputToken = Object.keys(savedOutputToken).length ? savedOutputToken : this.state.selectedDownToken;

        try 
        {
            if (outputToken.address)
            {
                const ercContract = await new web3.eth.Contract(ERC20, outputToken.address);
                outputToken.balance = await ercContract.methods.balanceOf(account).call();
            }
            else
            {
                outputToken.balance = await web3.eth.getBalance(account);
            }
        } 
        catch (error) 
        {
            if (error.message.includes('-32005'))
            {
                return this.updateOutputBalance(account, web3);
            }
        }
        
        this.handleDownSelectToken(outputToken);
        this.setState({secondInput: ""});
    }

    updateAllPrices(item, isMultiToSingleToken)
    {
        for (let i = 0; i < this.state.tokenBlock.length; i++) 
        {
            const tokenInfo = this.state.tokenBlock[i];
            if (!!tokenInfo.symbol) 
            {
                this.updatePrice(tokenInfo, i, item, isMultiToSingleToken);
            }
        }
    }

    async updatePrice(tokenInfo, index, outputTokenInfo, isMultiToSingleToken=this.state.isMultiToSingleToken) 
    {
        let inputTokenAddress, outputTokenAddress, outputTokenDecimals, inputTokenDecimals, inputTokenSymbol, outputTokenSymbol, price, data, initialData;
        const { dfyn, sushi, quick, account } = this.state;
        const wmatic2 = "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270";
        const wmatic = "0x4c28f48448720e9000907BC2611F73022fdcE1fA";
        tokenInfo.loading = true;
        tokenInfo.targetPrice = 0;
        if (isMultiToSingleToken)
        {
            inputTokenAddress = tokenInfo.address;
            outputTokenAddress = outputTokenInfo.address;
            outputTokenDecimals = outputTokenInfo.decimals;
            inputTokenDecimals = tokenInfo.decimals;
            inputTokenSymbol = tokenInfo.symbol;
            outputTokenSymbol = outputTokenInfo.symbol;
        }
        else
        {
            outputTokenAddress = tokenInfo.address;
            inputTokenAddress = outputTokenInfo.address;
            outputTokenDecimals = tokenInfo.decimals;
            inputTokenDecimals = outputTokenInfo.decimals;
            inputTokenSymbol = outputTokenInfo.symbol;
            outputTokenSymbol = tokenInfo.symbol;
        }
        const inputAmount = (1 * 10 ** parseInt(inputTokenDecimals)).toString();
        this.setState([...this.state.tokenBlock]);
        if 
        (
            // Condition
            (!inputTokenAddress && inputTokenSymbol === "ETH" && outputTokenAddress === wmatic) ||
            (!outputTokenAddress && outputTokenSymbol === "ETH" && inputTokenAddress === wmatic)
        )
        {
            tokenInfo.targetPrice = "1";
            tokenInfo.path = "1";
        }
        else if 
        (
            // Condition
            (!inputTokenAddress && inputTokenSymbol === "ETH" && outputTokenAddress === wmatic2) ||
            (!outputTokenAddress && outputTokenSymbol === "ETH" && inputTokenAddress === wmatic2)
        )
        {
            tokenInfo.targetPrice = "1";
            tokenInfo.path = "5";
        }
        else if (!inputTokenAddress && inputTokenSymbol === "ETH")
        {
            // Dfyn
            data = await this.getPrice(dfyn.methods, inputAmount, wmatic, outputTokenAddress, outputTokenDecimals, "dfyn");
            if (data.res && parseFloat(tokenInfo.targetPrice) < parseFloat(data.price))
            {
                tokenInfo.targetPrice = data.price;
                tokenInfo.path = "1";
            }

            // Sushi
            data = await this.getPrice(sushi.methods, inputAmount, wmatic2, outputTokenAddress, outputTokenDecimals, "sushi");
            if (data.res && parseFloat(tokenInfo.targetPrice) < parseFloat(data.price))
            {
                tokenInfo.targetPrice = data.price;
                tokenInfo.path = "5";
            }

            // Quick
            data = await this.getPrice(quick.methods, inputAmount, wmatic2, outputTokenAddress, outputTokenDecimals, "quick");
            if (data.res && parseFloat(tokenInfo.targetPrice) < parseFloat(data.price))
            {
                tokenInfo.targetPrice = data.price;
                tokenInfo.path = "9";
            }
        }
        else
        {
            if (outputTokenAddress !== wmatic && outputTokenAddress !== wmatic2)
            {
                // Dfyn Initial
                initialData = await this.getPrice(dfyn.methods, inputAmount, inputTokenAddress, wmatic, outputTokenDecimals, "dfyn lvl 2");

                // Dfyn
                data = await this.getPrice(dfyn.methods, initialData.res, wmatic, outputTokenAddress, outputTokenDecimals, "dfyn to dfyn");
                if (data.res && parseFloat(tokenInfo.targetPrice) < parseFloat(data.price))
                {
                    tokenInfo.targetPrice = data.price;
                    tokenInfo.path = "2";
                }

                // Sushi
                data = await this.getPrice(sushi.methods, initialData.res, wmatic2, outputTokenAddress, outputTokenDecimals, "dfyn to sushi");
                if (data.res && parseFloat(tokenInfo.targetPrice) < parseFloat(data.price))
                {
                    tokenInfo.targetPrice = data.price;
                    tokenInfo.path = "3";
                }

                // Quick
                data = await this.getPrice(quick.methods, initialData.res, wmatic2, outputTokenAddress, outputTokenDecimals, "dfyn to quick");
                if (data.res && parseFloat(tokenInfo.targetPrice) < parseFloat(data.price))
                {
                    tokenInfo.targetPrice = data.price;
                    tokenInfo.path = "4";
                }
    
                // Sushi Initial
                initialData = await this.getPrice(sushi.methods, inputAmount, inputTokenAddress, wmatic2, outputTokenDecimals, "sushi lvl 2");
                
                // Dfyn
                data = await this.getPrice(dfyn.methods, initialData.res, wmatic, outputTokenAddress, outputTokenDecimals, "sushi to dfyn");
                if (data.res && parseFloat(tokenInfo.targetPrice) < parseFloat(data.price))
                {
                    tokenInfo.targetPrice = data.price;
                    tokenInfo.path = "7";
                }

                // Sushi
                data = await this.getPrice(sushi.methods, initialData.res, wmatic2, outputTokenAddress, outputTokenDecimals, "sushi to sushi");
                if (data.res && parseFloat(tokenInfo.targetPrice) < parseFloat(data.price))
                {
                    tokenInfo.targetPrice = data.price;
                    tokenInfo.path = "6";
                }

                // Quick
                data = await this.getPrice(quick.methods, initialData.res, wmatic2, outputTokenAddress, outputTokenDecimals, "sushi to quick");
                if (data.res && parseFloat(tokenInfo.targetPrice) < parseFloat(data.price))
                {
                    tokenInfo.targetPrice = data.price;
                    tokenInfo.path = "8";
                }
    
                // Quick Initial
                initialData = await this.getPrice(quick.methods, inputAmount, inputTokenAddress, wmatic2, outputTokenDecimals, "quick lvl 2");

                // Dfyn
                data = await this.getPrice(dfyn.methods, initialData.res, wmatic, outputTokenAddress, outputTokenDecimals, "quick to dfyn");
                if (data.res && parseFloat(tokenInfo.targetPrice) < parseFloat(data.price))
                {
                    tokenInfo.targetPrice = data.price;
                    tokenInfo.path = "11";
                }

                // Sushi
                data = await this.getPrice(sushi.methods, initialData.res, wmatic2, outputTokenAddress, outputTokenDecimals, "quick to sushi");
                if (data.res && parseFloat(tokenInfo.targetPrice) < parseFloat(data.price))
                {
                    tokenInfo.targetPrice = data.price;
                    tokenInfo.path = "12";
                }

                // Quick
                data = await this.getPrice(quick.methods, initialData.res, wmatic2, outputTokenAddress, outputTokenDecimals, "quick to quick");
                if (data.res && parseFloat(tokenInfo.targetPrice) < parseFloat(data.price))
                {
                    tokenInfo.targetPrice = data.price;
                    tokenInfo.path = "10";
                }
            }
            if (inputTokenAddress === wmatic) 
            {
                // Dfyn Initial
                initialData = await this.getPrice(dfyn.methods, inputAmount, wmatic, wmatic2, outputTokenDecimals, "dfyn lvl 2");

                // Sushi
                data = await this.getPrice(sushi.methods, initialData.res, wmatic2, outputTokenAddress, outputTokenDecimals, "dfyn to sushi");
                if (data.res && parseFloat(tokenInfo.targetPrice) < parseFloat(data.price))
                {
                    tokenInfo.targetPrice = data.price;
                    tokenInfo.path = "3";
                }

                // Quick
                data = await this.getPrice(quick.methods, initialData.res, wmatic2, outputTokenAddress, outputTokenDecimals, "dfyn to quick");
                if (data.res && parseFloat(tokenInfo.targetPrice) < parseFloat(data.price))
                {
                    tokenInfo.targetPrice = data.price;
                    tokenInfo.path = "4";
                }
            }
            if (inputTokenAddress === wmatic2) 
            {
                // Sushi Initial
                initialData = await this.getPrice(sushi.methods, inputAmount, wmatic2, wmatic, outputTokenDecimals, "sushi lvl 2");
                
                // Dfyn
                data = await this.getPrice(dfyn.methods, initialData.res, wmatic, outputTokenAddress, outputTokenDecimals, "sushi to dfyn");
                if (data.res && parseFloat(tokenInfo.targetPrice) < parseFloat(data.price))
                {
                    tokenInfo.targetPrice = data.price;
                    tokenInfo.path = "7";
                }
    
                // Quick Initial
                initialData = await this.getPrice(quick.methods, inputAmount, wmatic2, wmatic, outputTokenDecimals, "quick lvl 2");

                // Dfyn
                data = await this.getPrice(dfyn.methods, initialData.res, wmatic, outputTokenAddress, outputTokenDecimals, "quick to dfyn");
                if (data.res && parseFloat(tokenInfo.targetPrice) < parseFloat(data.price))
                {
                    tokenInfo.targetPrice = data.price;
                    tokenInfo.path = "11";
                }
            }
            if (outputTokenAddress === wmatic)
            {
                // Sushi Initial
                initialData = await this.getPrice(sushi.methods, inputAmount, inputTokenAddress, wmatic2, outputTokenDecimals, "sushi lvl 2");
                
                // Dfyn
                data = await this.getPrice(dfyn.methods, initialData.res, wmatic2, wmatic, outputTokenDecimals, "sushi to dfyn");
                if (data.res && parseFloat(tokenInfo.targetPrice) < parseFloat(data.price))
                {
                    tokenInfo.targetPrice = data.price;
                    tokenInfo.path = "13";
                }
    
                // Quick Initial
                initialData = await this.getPrice(quick.methods, inputAmount, inputTokenAddress, wmatic2, outputTokenDecimals, "quick lvl 2");

                // Dfyn
                data = await this.getPrice(dfyn.methods, initialData.res, wmatic2, wmatic, outputTokenDecimals, "quick to dfyn");
                if (data.res && parseFloat(tokenInfo.targetPrice) < parseFloat(data.price))
                {
                    tokenInfo.targetPrice = data.price;
                    tokenInfo.path = "14";
                }
            }
            
            // Dfyn
            data = await this.getPrice(dfyn.methods, inputAmount, inputTokenAddress, outputTokenAddress || wmatic, outputTokenDecimals, "dfyn");
            if (data.res && parseFloat(tokenInfo.targetPrice) < parseFloat(data.price))
            {
                tokenInfo.targetPrice = data.price;
                tokenInfo.path = "1";
            }

            // Sushi
            data = await this.getPrice(sushi.methods, inputAmount, inputTokenAddress, outputTokenAddress || wmatic2, outputTokenDecimals, "sushi");
            if (data.res && parseFloat(tokenInfo.targetPrice) < parseFloat(data.price))
            {
                tokenInfo.targetPrice = data.price;
                tokenInfo.path = "5";
            }

            // Quick
            data = await this.getPrice(quick.methods, inputAmount, inputTokenAddress, outputTokenAddress || wmatic2, outputTokenDecimals, "quick");
            if (data.res && parseFloat(tokenInfo.targetPrice) < parseFloat(data.price))
            {
                tokenInfo.targetPrice = data.price;
                tokenInfo.path = "9";
            }
        }

        tokenInfo.loading = false;
        this.setState([...this.state.tokenBlock]);
        this.handleInput1Change(this.state.tokenBlock[index].tokenAmount, index);
    }

    async getPrice(router, amount, firstPath, secondPath, decimals, route)
    {
        try
        {
            const res = await router.getAmountsOut(amount, [firstPath, secondPath]).call({ from: this.state.account });
            const price = (parseInt(res[1]) / 10 ** parseInt(decimals)).toString();
            // console.log(`${route}: `, res);
            return { price, res: res[1] };
        } 
        catch (error)
        {
            // console.log(`error in ${route}`);
            return { res: 0 };
        }
    }

    handleAddInput() 
    {
        this.state.tokenBlock.push({
            isApprove: false,
            address: "",
            tokenAmount: "",
            symbol: "",
            logoURI: "",
            targetPrice: 0,
            equivalentPrice: 0,
            loading: false,
            decimals: 18,
            balance: 0,
            isEth: false,
            percentage: "",
            name: "",
        })
        this.setState({...this.state})
    }

    handleDelete() 
    {
        const tokenList = this.state.tokenBlock;
        tokenList.splice(0, tokenList.length);
        this.setState({...this.state});
    }

    handleRemove(i) 
    {
        const tokenList = this.state.tokenBlock;
        tokenList.splice(i, 1);
        this.setState({...this.state});
        this.state.ls.set('inputTokens', [...this.state.tokenBlock]);
        this.calculateTotalAmount();
    }

    async handleApprove()
    {
        if (this.state.isMultiToSingleToken)
        {
            this.handleApproveMultiToSingleToken();
        }
        else
        {
            this.handleApproveSingleToMultiToken();
        }
    }

    async handleApproveMultiToSingleToken()
    {
        const web3 = window.web3;
        const { tokenBlock, account, contractAddress } = this.state;
        if(!account.length) return alert("Please connect your wallet");
        for(let i = 0; i < tokenBlock.length; i++)
        {
            if(tokenBlock[i].isApprove) continue;

            const ercContract = await new web3.eth.Contract(ERC20, tokenBlock[i].address);
            const totalSupply = await ercContract.methods.totalSupply().call({ from: account });
            await ercContract.methods.approve(contractAddress, totalSupply).send({ from: account }).then(() =>
            {
                tokenBlock[i].isApprove = true;
                this.setState({...this.state});
                let approvedTokens = this.state.ls.get('approvedTokens');
                if(Object.keys(approvedTokens).includes(account + contractAddress)) 
                {
                    approvedTokens[account + contractAddress].push(tokenBlock[i].address);
                }
                else 
                {
                    approvedTokens[account + contractAddress] = [tokenBlock[i].address];
                }
                this.state.ls.set('approvedTokens', approvedTokens);
            })
            .catch((error) => 
            {
                alert('Transaction Failed');
            })
        }
    }

    async handleApproveSingleToMultiToken()
    {
        const web3 = window.web3;
        const { selectedDownToken, account, contractAddress } = this.state;
        if(!account.length) return alert("Please connect your wallet");
        
        const ercContract = await new web3.eth.Contract(ERC20, selectedDownToken.address);
        const totalSupply = await ercContract.methods.totalSupply().call({ from: account });
        await ercContract.methods.approve(contractAddress, totalSupply).send({ from: account }).then(() =>
        {
            selectedDownToken.isApprove = true;
            this.setState({...this.state});
            let approvedTokens = this.state.ls.get('approvedTokens');
            if(Object.keys(approvedTokens).includes(account + contractAddress)) 
            {
                approvedTokens[account + contractAddress].push(selectedDownToken.address);
            }
            else 
            {
                approvedTokens[account + contractAddress] = [selectedDownToken.address];
            }
            this.state.ls.set('approvedTokens', approvedTokens);
        })
        .catch((error) => 
        {
            alert('Transaction Failed');
        })
    }

    handleSwapToken()
    {
        const { tokenBlock } = this.state;
        if (tokenBlock.some((token) => token.loading))
        {
            console.log('loading...');
            return;
        }
        if (tokenBlock.some((token) => parseFloat(token.tokenAmount) * 10 ** parseInt(token.decimals) > parseInt(token.balance)))
        {
            console.log('Insufficient balance');
            return;
        }

        if (this.state.isMultiToSingleToken)
        {
            this.handleMultiToSingleTokenSwap();
        }
        else
        {
            this.handleSingleToMultiTokenSwap();
        }
    }

    async handleMultiToSingleTokenSwap()
    {
        const { tokenBlock, account, isMultiToSingleToken, selectedDownToken } = this.state;
        const isValid = tokenBlock.every((token) => token.isApprove);

        if (isValid)
        {
            const wmatic2 = "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270";
            const wmatic = "0x4c28f48448720e9000907BC2611F73022fdcE1fA";
            this.setState({isSwapLoading: true});
            this.setState({isSwapMiniLoading: true});
            const tokenInputAddress = tokenBlock.map((token) => !!token.address ? token.address : token.path == 1 ? wmatic : wmatic2);
            const tokenInputAmount = tokenBlock.map((token) => (parseFloat(token.tokenAmount) * 10 ** parseInt(token.decimals)).toString());
            const swapRoute = tokenBlock.map((token) => token.path);
            const isEth = tokenBlock.map((token) => token.isEth);
            const targetTokenAddress = selectedDownToken.address;

            console.log("value of token input address::",tokenInputAddress);
            console.log("value of token input amount :::",)

            if(selectedDownToken.symbol === "MATIC")
            {
                await this.state.swap.methods.swapToETH(tokenInputAmount, tokenInputAddress, swapRoute).send({ from: account })
                .once('transactionHash', (txHash) =>
                {
                    this.setState({transactionHash: txHash});
                    this.setState({isSwapLoading: false});
                    this.setState({isTransactionSubmitted: true});
                })
                .then(() => 
                {
                    this.updateBalances();
                    this.setState({isSwapMiniLoading: false});
                })
                .catch((error) => 
                {
                    console.log(error)
                })
            }
            else if(isEth.includes(true))
            {
                const matic = tokenBlock.find((token) => token.isEth);
                const maticAmount = (parseFloat(matic.tokenAmount) * 10 ** parseInt(matic.decimals)).toString();
                await this.state.swap.methods.swap(tokenInputAmount, tokenInputAddress, swapRoute, isEth, targetTokenAddress, isMultiToSingleToken, selectedDownToken.isEth).send({ from: account, value: maticAmount })
                .once('transactionHash', (txHash) =>
                {
                    this.setState({transactionHash: txHash});
                    this.setState({isSwapLoading: false});
                    this.setState({isTransactionSubmitted: true});
                })
                .then(() => 
                {
                    this.updateBalances();
                    this.setState({isSwapMiniLoading: false});
                })
                .catch((error) => 
                {
                    if (error.code === 4001)
                    {
                        this.setState({isSwapLoading: false});
                        this.setState({isSwapMiniLoading: false});
                    }
                })
            }
            else
            {
                await this.state.swap.methods.swap(tokenInputAmount, tokenInputAddress, swapRoute, isEth, targetTokenAddress, isMultiToSingleToken, selectedDownToken.isEth).send({ from: account })
                .once('transactionHash', (txHash) =>
                {
                    this.setState({transactionHash: txHash});
                    this.setState({isSwapLoading: false});
                    this.setState({isTransactionSubmitted: true});
                })
                .then(() => 
                {
                    this.updateBalances();
                    this.setState({isSwapMiniLoading: false});
                })
                .catch((error) => 
                {
                    console.log(error)
                })
            }
        }
        else
        {
            alert("Please approve the token first")
        }
    }

    async handleSingleToMultiTokenSwap()
    {
        const { tokenBlock, account, selectedDownToken, isMultiToSingleToken } = this.state;
        const isValid = this.state.selectedDownToken.isApprove;

        if (isValid)
        {
            const wmatic2 = "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270";
            const wmatic = "0x4c28f48448720e9000907BC2611F73022fdcE1fA";
            this.setState({isSwapLoading: true});
            this.setState({isSwapMiniLoading: true});
            const tokenInputAddress = tokenBlock.map((token) => !!token.address ? token.address : token.path == 1 ? wmatic : wmatic2);
            const tokenInputAmount = tokenBlock.map((token) => (parseFloat(token.tokenAmount) * 10 ** parseInt(selectedDownToken.decimals)).toString());
            const swapRoute = tokenBlock.map((token) => token.path);
            let isEth = tokenBlock.map((token) => token.isEth);
            const targetTokenAddress = selectedDownToken.address;

            if (selectedDownToken.symbol === "MATIC")
            {
                const maticAmount = (parseFloat(this.state.secondInput) * 10 ** parseInt(selectedDownToken.decimals)).toString();
                await this.state.swap.methods.swap(tokenInputAmount, tokenInputAddress, swapRoute, isEth, wmatic2, isMultiToSingleToken, selectedDownToken.isEth).send({ from: account, value: maticAmount })
                .once('transactionHash', (txHash) =>
                {
                    this.setState({transactionHash: txHash});
                    this.setState({isSwapLoading: false});
                    this.setState({isTransactionSubmitted: true});
                })
                .then(() => 
                {
                    this.updateBalances();
                    this.setState({isSwapMiniLoading: false});
                })
                .catch((error) => 
                {
                    if (error.code === 4001)
                    {
                        this.setState({isSwapLoading: false});
                        this.setState({isSwapMiniLoading: false});
                    }
                })
            }
            else
            {
                await this.state.swap.methods.swap(tokenInputAmount, tokenInputAddress, swapRoute, isEth, targetTokenAddress, isMultiToSingleToken, selectedDownToken.isEth).send({ from: account })
                .once('transactionHash', (txHash) =>
                {
                    this.setState({transactionHash: txHash});
                    this.setState({isSwapLoading: false});
                    this.setState({isTransactionSubmitted: true});
                })
                .then(() => 
                {
                    this.updateBalances();
                    this.setState({isSwapMiniLoading: false});
                })
                .catch((error) => 
                {
                    console.log(error)
                })
            }
        }
        else 
        {
            alert("Please approve the token first")
        }
    }

    async handleSwapAllTokens()
    {
        this.setState({isNukeInvoked: true});
        this.handleTransition(false);
        await this.sleep(500);
        const { account, ls, chainId, contractAddress } = this.state;
        const approvedTokens = ls.get('approvedTokens')[account + contractAddress];
        const approvedTokenList = tokenList[chainId].filter((token) => (approvedTokens.includes(token.address) && token.address !== this.state.defaultToken.address) || (token.symbol === "MATIC" && !token.address));
        const outputToken = tokenList[chainId].find((token) => token.address === this.state.defaultToken.address);
        this.handleDownSelectToken(outputToken);

        let invalidCount = 0;
        for (let i = 0; i < approvedTokenList.length; i++) 
        {
            if (i === 0) 
            {
                this.handleDelete();
            }
            this.handleAddInput();
            await this.handleUpperSelectToken(approvedTokenList[i], false, i-invalidCount);
            const token = this.state.tokenBlock[i-invalidCount];
            if (token.balance <= 0 || (token.symbol === "MATIC" && parseInt(token.balance) <= 1e18))
            {
                this.handleRemove(i);
                await this.sleep(500);
                invalidCount++;
            }
            else if (token.symbol === "MATIC" && parseInt(token.balance) > 1e18)
            {
                this.handleInput1Change((parseInt(token.balance)-1e18) / 10 ** token.decimals, i-invalidCount);
            } 
            else
            {
                this.handleInput1Change((parseInt(token.balance)-100000) / 10 ** token.decimals, i-invalidCount);
            }
        }
        while (!this.state.tokenBlock.every((token) => token.equivalentPrice > 0))
        {
            await this.sleep(1000);
        }
        this.handleSwapToken();
        this.setState({isNukeInvoked: false});
    }

    handleResetSelection() 
    {
        this.state.selectedDownToken = { symbol: "" }
        this.state.tokenBlock = 
        [{
            isApprove: false,
            address: "",
            tokenAmount: "",
            symbol: "",
            logoURI: "",
            targetPrice: 0,
            equivalentPrice: 0,
            loading: false,
            decimals: 18,
            percentage: "",
            name: "",
        }];
        this.state.secondInput = "";
        this.setState({...this.state});
    }

    render() 
    {
        return (
            <ThemeProvider theme={this.state.theme === "light" ? lightTheme : darkTheme}>
                <GlobalStyles />
                <StyledHomePageContainer>
                    { this.state.isNukeInvoked && <div className="top-layer"></div> }
                   {/*  <Navbar 
                        theme={this.state.theme}
                        themeToggler={this.handleThemeToggler}
                        isSwapLoading={this.state.isSwapMiniLoading}
                        outputToken={this.state.defaultToken.symbol}
                        getAccount={(e) => this.setState({account: e})}
                        getSwapContract={(e) => this.setState({swap: e})}
                        getDfynContract={(e) => this.setState({dfyn: e})}
                        getSushiContract={(e) => this.setState({sushi: e})}
                        getQuickContract={(e) => this.setState({quick: e})}
                        getChainId={(e) => this.setState({chainId: e})}
                        resetSelection={() => this.handleResetSelection()}
                        handleWalletConnected={() => this.handleWalletConnected()}
                        handleSwapAllTokens={() => this.handleSwapAllTokens()}
                    /> */}
                    <div className="main-container">
                        <div className="swap-container">
                            {/* Swap Header Section */}
                            <SwapHeader 
                                tokenBlock={this.state.tokenBlock}
                                selectedDownToken={this.state.selectedDownToken}
                                isMultiToSingleToken={this.state.isMultiToSingleToken}
                                changeDefaultToken={(token) => this.setState({defaultToken: token})}
                            />
                            <div id="swap-page" className="swap-page-container">
                                <div className="swap-page-wrapper">
                                    <div>
                                        {/* Input-Output Section */}
                                        {console.log("value of token block:::",this.state.tokenBlock)}
                                        { this.state.isMultiToSingleToken ? 
                                            <div>
                                                <MultiTokenContainer 
                                                    account={this.state.account}
                                                    tokenBlock={this.state.tokenBlock}
                                                    // tokenBlock={[{balance: "6784494637852670931",
                                                    // decimals: 18,
                                                    // equivalentPrice: "0.000000",
                                                    // isApprove: true,
                                                    // isEth: true,
                                                    // loading: false,
                                                    // logoURI: "https://files.kyberswap.com/DesignAssets/tokens/iOS/eth.png",
                                                    // name: "Ethereum",
                                                    // percentage: 0,
                                                    // symbol: "ETH",
                                                    // targetPrice: 0,
                                                    // tokenAmount: ""}]}
                                                    isUpperClicked={this.state.isUpperClicked}
                                                    selectedDownToken={this.state.selectedDownToken}
                                                    isMultiToSingleToken={this.state.isMultiToSingleToken}
                                                    handleRemove={(i) => this.handleRemove(i)}
                                                    handleInput1Change={(value, i) => this.handleInput1Change(value, i)}
                                                    handlePercentageChange={(value, i) => this.handlePercentageChange(value, i)}
                                                    handleTokenUpperDropdownClicked={(i) => this.handleTokenUpperDropdownClicked(i)}
                                                />
                                                <TokenAddAndChangeContainer 
                                                    componentType="add & change"
                                                    handleAddInput={() => this.handleAddInput()}
                                                    toggleMultiToSingleToken={() => this.handleTransition(this.state.isMultiToSingleToken)}
                                                />
                                                <SingleTokenContainer 
                                                    account={this.state.account}
                                                    secondInput={this.state.secondInput}
                                                    isDownClicked={this.state.isDownClicked}
                                                    selectedDownToken={this.state.selectedDownToken}
                                                    isMultiToSingleToken={this.state.isMultiToSingleToken}
                                                    isAllTokenLoaded={this.state.tokenBlock.every((token) => !token.loading)}
                                                    handleInput2Change={() => this.handleInput2Change()}
                                                    handleTokenDownDropdownClicked={() => this.handleTokenDownDropdownClicked()}
                                                />
                                            </div> :
                                            <div>
                                                <SingleTokenContainer 
                                                    account={this.state.account}
                                                    secondInput={this.state.secondInput}
                                                    isDownClicked={this.state.isDownClicked}
                                                    selectedDownToken={this.state.selectedDownToken}
                                                    isMultiToSingleToken={this.state.isMultiToSingleToken}
                                                    isAllTokenLoaded={this.state.tokenBlock.every((token) => !token.loading)}
                                                    handleInput2Change={() => this.handleInput2Change()}
                                                    handleTokenDownDropdownClicked={() => this.handleTokenDownDropdownClicked()}
                                                />
                                                <TokenAddAndChangeContainer 
                                                    componentType="change"
                                                    handleAddInput={() => this.handleAddInput()}
                                                    toggleMultiToSingleToken={() => this.handleTransition(this.state.isMultiToSingleToken)}
                                                />
                                                <MultiTokenContainer 
                                                    account={this.state.account}
                                                    tokenBlock={this.state.tokenBlock}
                                                    isUpperClicked={this.state.isUpperClicked}
                                                    selectedDownToken={this.state.selectedDownToken}
                                                    isMultiToSingleToken={this.state.isMultiToSingleToken}
                                                    handleRemove={(i) => this.handleRemove(i)}
                                                    handleInput1Change={(value, i) => this.handleInput1Change(value, i)}
                                                    handlePercentageChange={(value, i) => this.handlePercentageChange(value, i)}
                                                    handleTokenUpperDropdownClicked={(i) => this.handleTokenUpperDropdownClicked(i)}
                                                />
                                                <TokenAddAndChangeContainer 
                                                    componentType="add"
                                                    handleAddInput={() => this.handleAddInput()}
                                                    toggleMultiToSingleToken={() => this.setState({isMultiToSingleToken: !this.state.isMultiToSingleToken})}
                                                />
                                            </div>
                                        }
                                    </div>
                                    {/* Swap Button Section */}
                                    <SwapButton 
                                        tokenBlock={this.state.tokenBlock}
                                        selectedDownToken={this.state.selectedDownToken}
                                        isMultiToSingleToken={this.state.isMultiToSingleToken}
                                        handleApprove={() => this.handleApprove()}
                                        handleSwapToken={() => this.handleSwapToken()}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>   
                    {/* Modals Section */}
                    <Modal toggle={() => this.setState({tokenUpperDropdownClicked: false})} open={this.state.tokenUpperDropdownClicked}>
                        <SelectToken
                            theme={this.state.theme}
                            closeModal={() => this.setState({tokenUpperDropdownClicked: false})}
                            handleSelectToken={this.handleUpperSelectToken}
                            handleFlipToken={this.handleDownSelectToken}
                            toggle={this.state.tokenUpperDropdownClicked}
                            isTargetToken={false}
                            currentToken={this.state.tokenBlock.length > this.state.selectedIndex ? this.state.tokenBlock[this.state.selectedIndex].symbol : undefined}
                            targetToken={this.state.selectedDownToken.symbol}
                            selectedTokens={this.state.tokenBlock.map(x => x.symbol)}
                            account={this.state.account}
                            chainId={this.state.chainId}
                        />
                    </Modal>
                    <Modal toggle={() => this.setState({tokenDownDropdownClicked: false})} open={this.state.tokenDownDropdownClicked}>
                        <SelectToken
                            theme={this.state.theme}
                            closeModal={() => this.setState({tokenDownDropdownClicked: false})}
                            handleSelectToken={this.handleDownSelectToken}
                            handleFlipToken={this.handleUpperSelectToken}
                            toggle={this.state.tokenDownDropdownClicked}
                            isTargetToken={true}
                            currentToken={this.state.selectedDownToken.symbol}
                            targetToken={this.state.selectedDownToken.symbol}
                            selectedTokens={this.state.tokenBlock.map(x => x.symbol)}
                            account={this.state.account}
                            chainId={this.state.chainId}
                        />
                    </Modal>
                    <Modal open={this.state.isSwapLoading} toggle={() => this.setState({isSwapLoading: false})}>
                        <ConfirmSwap
                            theme={this.state.theme}
                            closeModal={() => this.setState({isSwapLoading: false})}
                            targetToken={this.state.selectedDownToken.symbol}
                            value={this.state.secondInput}
                        />
                    </Modal>
                    <Modal open={this.state.isTransactionSubmitted} toggle={() => this.setState({isTransactionSubmitted: false})}>
                        <TransactionSubmitted
                            theme={this.state.theme}
                            closeModal={() => this.setState({isTransactionSubmitted: false})}
                            transactionHash={this.state.transactionHash}
                            chainId={this.state.chainId}
                            targetToken={this.state.selectedDownToken}
                        />
                    </Modal>
                </StyledHomePageContainer>

                <ToastContainer
                    position="bottom-left"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />
                <ToastContainer />
            </ThemeProvider>
        );
    }
}

export default HomePage;
