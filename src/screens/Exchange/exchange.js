import React, { useState, useEffect } from 'react';
import './exchange.css';
// import eth from '../Assets/eth.svg';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import TransparentButton from '../../components/TransparentButton'
import Web3 from 'web3';
import ERC20ABI from '../../abi/ERC20.json'
import tokenURIs from './tokenURIs';
import { Box, Typography, Stack, Container, Grid, TextField, Divider, Button, Modal, Tooltip, InputAdornment, OutlinedInput } from '@material-ui/core';
// import exchangeIcon from '../../assets/icons/exchange.png'
import Uniswap from '../../assets/icons/Uniswap.webp';
// import Curve from '../../assets/icons/Curve.webp';
// import SushiSwap from '../../assets/icons/Sushiswap.webp';
// import Bancor from '../../assets/icons/Bancor.webp';
import Balancer from '../../assets/icons/balancer.png';
import { invert, update } from 'lodash';
import styled from 'styled-components'
import CurrencySearchModal from '../../components/CurrencySearchModal';
import { ethers } from "ethers";
import { parseUnits, formatUnits } from "@ethersproject/units";
import { useParams } from 'react-router-dom';
import Loader from "react-loader-spinner";
import ScrollToTop from '../../components/ScrollToTop';
import Avatar from 'react-avatar';
import ethImage from '../../assets/icons/eth.png'
import { FaAngleRight } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import IUniswapV2Router02 from '../../abi/IUniswapV2Router02.json';
import Swap from '../../abi/SwapWithReverse.json'
import tokenList from './TokenList';

const styles = () => ({
    selected: {
        color: 'red'
    }
})


const style = {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.default',
    // border: '2px solid #000',
    // boxShadow: 24,
    p: 4,
    borderRadius: '10px'
};

const CurrencySelect = styled.button`
  align-items: center;
  height: 42px;
  font-size: 18px;
  font-weight: 600;
  background-color: transparent;
  color: '#737373'
  border-radius: 12px;
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
  padding: 0 0.5rem;
  margin: 0 0.5rem;
  :focus,
  :hover {
    background-color: 'blue'
  }
`



const erc20Abi = [
    "function balanceOf(address owner) view returns (uint256)",
    "function approve(address _spender, uint256 _value) public returns (bool success)",
    "function allowance(address _owner, address _spender) public view returns (uint256 remaining)"
];

// const selectedProvider = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/8b2159b7b0944586b64f0280c927d0a8"))
const selectedProvider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/8b2159b7b0944586b64f0280c927d0a8");


const makeCall = async (callName, contract, args, metadata = {}) => {
    if (contract[callName]) {
        let result
        if (args) {
            result = await contract[callName](...args, metadata)
        } else {
            result = await contract[callName]()
        }
        return result
    } else {
        console.log('no call of that name!')
    }
}
export default function Exchange() {

    const { address } = useParams();

    const [TokenFrom, setTokenFrom] = useState([]);
    const [TokenTo, setTokenTo] = useState('');
    const [TokenFromAmount, setTokenFromAmount] = useState();
    const [TokenToAmount, setTokenToAmount] = useState();
    const [Slippage, setSlippage] = useState(2);
    const [Price, setPrice] = useState(0);
    const [minPrice, setMinPrice] = useState(0);
    const [AllTokens, setAllTokens] = useState([]);
    const [Sources, setSources] = useState([]);
    const [open, setOpen] = useState(false)
    const [protocolsRateList, setprotocolsRateList] = useState([])
    const [ethPrice, setethPrice] = useState(0);
    const [toTokenToId, settoTokenToId] = useState('');
    const [selectedRate, setselectedRate] = useState(null)
    const [newSelectedRate, setnewSelectedRate] = useState(null)
    const [txSuccess, settxSuccess] = useState(false)
    const [txFailure, settxFailure] = useState(false)
    const [selectedExchangeName, setselectedExchangeName] = useState('')
    const [currencyModal, setcurrencyModal] = useState(false)
    const [firstcurrencyModal, setfirstcurrencyModal] = useState(false)
    const [secondcurrencyModal, setsecondcurrencyModal] = useState(false)
    const [currencyToModal, setcurrencyToModal] = useState(false)
    const [updateBalance, setupdateBalance] = useState(true)
    const [toTokens, settoTokens] = useState([])
    const [showFirstTab, setshowFirstTab] = useState(false)
    const [showSecondTab, setshowSecondTab] = useState(false)
    const [ContractAddress, setcontractAddress] = useState("0xD23774726DB4d3D03Ba483514d7c8DF9bE729eEa")
    const [Account, setAccount] = useState("")
    const [totalToAmount, settotalToAmount] = useState('')
    // const [tokenToDollarValue, settokenToDollarValue] = useState(0)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        /* async function getData() {
            await axios.get(`https://api.ethplorer.io/getAddressInfo/${address}?apiKey=EK-qSPda-W9rX7yJ-UY93y`, {}, {})
                .then(async (response) => {
                    // console.log(response)
                    const arr1 = [];
                    if (response.data.ETH.balance !== 0) {
                        const tempObj = {}
                        tempObj.address = ''
                        tempObj.name = 'Ethereum';
                        tempObj.symbol = 'ETH';
                        tempObj.balance = ((response.data.ETH.balance).toFixed(3)).toString();
                        tempObj.logoURI = ethImage;
                        tempObj.isApprove = true;
                        arr1.push(tempObj)
                    }
                    var tokens = response.data.tokens;
                    for (let i = 0; i < tokens.length; i++) {
                        const tempObj = {};
                        tempObj.address = tokens[i].tokenInfo.address;
                        tempObj.name = tokens[i].tokenInfo.name;
                        tempObj.symbol = tokens[i].tokenInfo.symbol;
                        tempObj.balance = ((tokens[i].balance * (Math.pow(10, -parseInt(tokens[i].tokenInfo.decimals)))).toFixed(3)).toString();
                        if (tokens[i].tokenInfo.image !== undefined) {
                            tempObj.logoURI = `https://ethplorer.io${tokens[i].tokenInfo.image}`
                        }
                        else {
                            tempObj.logoURI = null;
                        }
                        tempObj.isApprove = false;

                        arr1.push(tempObj);
                    }
                    console.log("new list objects:::", arr1)
                    setAllTokens(arr1);

                })


            await axios.get(`https://cdn.furucombo.app/furucombo.tokenlist.json`, {}, {})
                .then(async (response) => {
                    settoTokens(response.data.tokens)
                })
            

        } */
        // await getData()

        const tokens = tokenList["4"];
        setAllTokens(tokens)
        settoTokens(tokens)
        setLoggedInAccount()
    }, [])

    useEffect(() => {
        async function getEthdollarValue() {
            try {
                const ethDollarValue = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
                setethPrice(ethDollarValue.data.ethereum.usd);
            }
            catch {

            }
        }
        getEthdollarValue();
    }, [])

    /* useEffect(() => {
        // const timeOutId = setTimeout(() => calculateToAmount(TokenFromAmount), 500);
        const timeOutId = setTimeout(() => calculateToAmountNew(TokenFromAmount), 500);
        return () => clearTimeout(timeOutId);
    }, [TokenFromAmount]); */

    useEffect(() => {
        calculateToAmountNew();
        
    }, [TokenTo])


    /* useEffect(() => {
        async function getData() {
            if (TokenFromAmount !== '' && TokenFrom !== '' && TokenTo !== '') {
                // alert(TokenFromAmount)
                let amount = parseFloat(TokenFromAmount) * Math.pow(10, 18).toString()
                await axios.get(`https://ropsten.api.0x.org/swap/v1/quote?buyToken=${TokenTo}&sellToken=${TokenFrom}&sellAmount=${amount}&feeRecipient=0xE609192618aD9aC825B981fFECf3Dfd5E92E3cFB&buyTokenPercentageFee=0.02`, {}, {})
                    .then(async (response) => {
                        console.log(response)
                        setPrice(response.data.price)
                        setMinPrice(response.data.guaranteedPrice)
                        setTokenToAmount(parseFloat(response.data.buyAmount) * Math.pow(10, -18).toString())
                        var sources = response.data.sources
                        sources.sort((a, b) => parseFloat(b.proportion) - parseFloat(a.proportion));
                        var sources2 = []
                        for (var i = 0; i < sources.length; i++) {
                            if (sources[i].proportion > 0) {
                                sources2.push(sources[i])
                            }
                        }
                        setSources(sources2)
                    })
            }
        }
        getData()
    }, [TokenFromAmount, TokenFrom, TokenTo]) */

    async function loadWeb3() {

        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }

    }

    async function setLoggedInAccount() {
        await loadWeb3()
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts()
        setAccount(accounts[0]);
    }
    async function transact() {
        await loadWeb3()
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts()
        console.log('account selected is :::', accounts[0])
        /*  if (TokenFromAmount !== '' && TokenFrom !== '' && TokenTo !== '') {
             // alert(TokenFromAmount)s
             let amount = parseFloat(TokenFromAmount) * Math.pow(10, 18).toString()
             await axios.get(`https://ropsten.api.0x.org/swap/v1/quote?buyToken=${TokenTo.symbol}&sellToken=${TokenFrom}&sellAmount=${amount}&feeRecipient=0xE609192618aD9aC825B981fFECf3Dfd5E92E3cFB&buyTokenPercentageFee=0.02&slippagePercentage=${Slippage / 100}`, {}, {})
                 .then(async (response) => {
                     console.log(response)
                     console.log(Slippage)
                     response.data.gas = parseInt(response.data.gas) + 100000;
                     response.data.from = accounts[0]
                     if (TokenFrom !== 'ETH') {
                         const ERC20contract = new web3.eth.Contract(ERC20ABI, response.data.sellTokenAddress);
                         await ERC20contract.methods.approve(response.data.allowanceTarget, response.data.sellAmount).send({ from: accounts[0] });
                     }
                     await web3.eth.sendTransaction(await response.data);
                 })
         } */
        if (selectedRate !== null) {
            // console.log("exchange selected for transaction::",selectedRate)
            let txObject = selectedRate.transactObject;
            txObject.gas = parseInt(txObject.gas) + 100000
            txObject.from = accounts[0]
            if (TokenFrom !== 'ETH') {
                const ERC20contract = new web3.eth.Contract(ERC20ABI, txObject.sellTokenAddress);
                await ERC20contract.methods.approve(txObject.allowanceTarget, txObject.sellAmount).send({ from: accounts[0] });
            }
            try {
                await web3.eth.sendTransaction(txObject);
                settxSuccess(true);
            }
            catch (error) {
                console.log("tx failed::", error)
                settxFailure(true);
            }


        }
        else {
            alert("Please Fill All fields")
        }
    }


    const dollarValueOfToken = async (tokenAddress) => {
        try {
            if (tokenAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
                return ethPrice;
            }
            else {
                const response = await axios.get(`https://api.ethplorer.io/getTokenInfo/${tokenAddress}?apiKey=EK-qSPda-W9rX7yJ-UY93y`)
                let data = response.data;
                console.log('response of ethplorere api::', data)
                if (data.price !== undefined) {
                    console.log("enter inside method")
                    // settokenToDollarValue(data.price.rate);
                    return data.price.rate;
                }
                else {
                    console.log("dollar value of this token is undefined")
                }
            }
        }
        catch {

        }
    }

    const calculateToAmount = async (tokenFromAmount) => {
        console.log("calculate method called with ammount::", tokenFromAmount)
        console.log("value of Tokenfromamount::", TokenFromAmount)
        console.log("value of tokenfrom::", TokenFrom)
        console.log("value of tokenTo::", TokenTo)
        if (tokenFromAmount > 0) {
            // console.log("calculate amount is called")
            if (TokenFrom !== '' && TokenTo !== '') {
                // alert(TokenFromAmount)
                // console.log("token from amount::",TokenFromAmount)
                // let amount = parseFloat(TokenFromAmount) * Math.pow(10, 18);
                let differentQuoteList = [];
                const protocolsList = ['', 'Uniswap', 'Curve', 'SushiSwap', 'Bancor', 'Balancer']
                let amount = parseFloat(tokenFromAmount) * Math.pow(10, 18);

                const tokenToDollarValue = await dollarValueOfToken(TokenTo.address);
                for (let i = 0; i < protocolsList.length; i++) {
                    try {
                        let protocolQuote = {};
                        const response = await axios.get(`https://api.0x.org/swap/v1/quote?buyToken=${TokenTo.symbol}&sellToken=${TokenFrom}&sellAmount=${amount}&feeRecipient=0xE609192618aD9aC825B981fFECf3Dfd5E92E3cFB&buyTokenPercentageFee=0.02&includedSources=${protocolsList[i]}`)
                        console.log(`response for all ${protocolsList[i]}`, response.data);

                        if (protocolsList[i] === '') {
                            protocolQuote.name = '0x Exchange'
                            var sources = response.data.sources
                            sources.sort((a, b) => parseFloat(b.proportion) - parseFloat(a.proportion));
                            var sources2 = []
                            for (var j = 0; j < sources.length; j++) {
                                if (sources[j].proportion > 0) {
                                    sources2.push(sources[j])
                                }
                            }
                            setSources(sources2)
                        }
                        else {
                            protocolQuote.name = protocolsList[i];
                        }
                        protocolQuote.price = response.data.price;
                        protocolQuote.minPrice = response.data.guaranteedPrice
                        protocolQuote.TokenToAmount = (parseInt(response.data.buyAmount) * Math.pow(10, -TokenTo.decimals)).toFixed(3).toString()
                        protocolQuote.gas = (((parseInt(response.data.gas) * parseInt(response.data.gasPrice)) * Math.pow(10, -18)) * ethPrice).toFixed(3);
                        console.log("dollar value of token", tokenToDollarValue);
                        protocolQuote.receivedValueInDollar = ((parseInt(response.data.buyAmount) * Math.pow(10, -TokenTo.decimals)) * tokenToDollarValue).toFixed(3);
                        protocolQuote.netReceived = parseFloat(protocolQuote.receivedValueInDollar) - parseFloat(protocolQuote.gas);
                        protocolQuote.transactObject = response.data;
                        // protocolQuote.image = `../../assets/icons/${protocolsList[i]}.webp`;
                        if (protocolsList[i] === 'Bancor') {
                            protocolQuote.image = "https://assets.coingecko.com/coins/images/14053/small/bancorvbnt_32.png?1614048819";
                        }
                        if (protocolsList[i] === 'Uniswap') {
                            protocolQuote.image = "https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png?1600306604";
                        }
                        if (protocolsList[i] === 'Curve') {
                            protocolQuote.image = "https://assets.coingecko.com/markets/images/538/small/Curve.png?1591605481";
                        }
                        if (protocolsList[i] === 'SushiSwap') {
                            protocolQuote.image = "https://assets.coingecko.com/markets/images/576/small/2048x2048_Logo.png?1609208464";
                        }
                        if (protocolsList[i] === 'Balancer') {
                            protocolQuote.image = "https://assets.coingecko.com/coins/images/11683/small/Balancer.png?1592792958";
                        }
                        if (protocolsList[i] === '') {
                            protocolQuote.image = "https://assets.coingecko.com/markets/images/565/small/0x-protocol.png?1596623034";
                        }

                        differentQuoteList.push(protocolQuote);
                    }
                    catch {
                        console.log(`error come for ${protocolsList[i]}`);
                    }

                }

                differentQuoteList.sort((a, b) => b.netReceived - a.netReceived);
                setselectedRate(differentQuoteList[0]);
                setselectedExchangeName(differentQuoteList[0].name)
                setprotocolsRateList(differentQuoteList);
                console.log("different rates we have::", differentQuoteList);

            }
        }

    }

    const newRateSelected = (object) => {
        setnewSelectedRate(object);
        setselectedExchangeName(object.name);
    }

    const updateSelectedRate = () => {
        if (newSelectedRate !== null) {
            setselectedRate(newSelectedRate)
            setOpen(false);
        }
    }

    const fromTokenChange = (value) => {
        let temp = TokenFrom;
        temp.push(value)
        setTokenFrom(temp);
        // setTokenTo('');
        setTokenFromAmount(0);
        setTokenToAmount(0);
        setprotocolsRateList([])
        setselectedRate(null);
        setSources([])
    }

    const ToTokenChange = (value) => {
        setTokenTo(value)
        setTokenFromAmount(0);
        setTokenToAmount(0);
        setprotocolsRateList([])
        setselectedRate(null);
        setSources([])
    }

    const test = async () => {
        let tempContractIn = new ethers.Contract("0x6b175474e89094c44da98b954eedeac495271d0f", erc20Abi, selectedProvider);
        let newBalanceIn = await getBalance('DAI', '0x912fD21d7a69678227fE6d08C64222Db41477bA0', tempContractIn)

    }

    const handleDismissSearch = () => {
        setcurrencyModal(false);
        setfirstcurrencyModal(false);
        setsecondcurrencyModal(false);
    }
    const handleCurrencyToDismissSearch = () => {
        setcurrencyToModal(false);
    }

    const getBalance = async (_token, _account, _contract) => {

        let newBalance
        if (_token === 'ETH') {
            newBalance = await selectedProvider.getBalance(_account)
        } else {
            newBalance = await makeCall('balanceOf', _contract, [_account])
        }
        return newBalance
    }



    const calculateToAmountNew = async (tokenFromAmount) => {
        // let TokenFrom=[];
        for (let i = 0; i < TokenFrom.length; i++) {
            let inputTokenAddress, outputTokenAddress, outputTokenDecimals, inputTokenDecimals, inputTokenSymbol, outputTokenSymbol, price, data, initialData;
            await loadWeb3()
            const web3 = window.web3;


            // const swapToETH = new web3.eth.Contract(SwapToETH, "0xece2546292E8569503381C4eAe9457f1115EE639");
            const uni = new web3.eth.Contract(IUniswapV2Router02, "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D");
            const sushi = new web3.eth.Contract(IUniswapV2Router02, "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506");

            const weth2 = "0xc778417e063141139fce010982780140aa0cd5ab";
            const weth = "0xc778417e063141139fce010982780140aa0cd5ab";

            inputTokenAddress = TokenFrom[i].address;
            outputTokenAddress = TokenTo.address;
            outputTokenDecimals = TokenTo.decimals;
            inputTokenDecimals = TokenFrom[i].decimals;
            inputTokenSymbol = TokenFrom[i].symbol;
            outputTokenSymbol = TokenTo.symbol;

            const inputAmount = (1 * 10 ** parseInt(inputTokenDecimals)).toString();

            // TokenFrom.push(TokenFrom[i])
            TokenFrom[i].targetPrice = 0;
            TokenFrom[i].path = "";
            if
                (
                // Condition
                (!inputTokenAddress && inputTokenSymbol === "ETH" && outputTokenAddress === weth2) ||
                (!outputTokenAddress && outputTokenSymbol === "ETH" && inputTokenAddress === weth)
            ) {
                TokenFrom[i].targetPrice = "1";
                TokenFrom[i].path = "1";
            }
            else if
                (
                // Condition
                (!inputTokenAddress && inputTokenSymbol === "ETH" && outputTokenAddress === weth2) ||
                (!outputTokenAddress && outputTokenSymbol === "ETH" && inputTokenAddress === weth2)
            ) {
                TokenFrom[i].targetPrice = "1";
                TokenFrom[i].path = "5";
            }
            else if (!inputTokenAddress && inputTokenSymbol === "ETH") {
                // uni
                data = await getPrice(uni.methods, inputAmount, weth, outputTokenAddress, outputTokenDecimals, "uni");
                if (data.res && parseFloat(TokenFrom[i].targetPrice) < parseFloat(data.price)) {

                    TokenFrom[i].targetPrice = data.price;
                    TokenFrom[i].path = "1";
                }

                // Sushi
                data = await getPrice(sushi.methods, inputAmount, weth2, outputTokenAddress, outputTokenDecimals, "sushi");
                if (data.res && parseFloat(TokenFrom[i].targetPrice) < parseFloat(data.price)) {
                    TokenFrom[i].targetPrice = data.price;
                    TokenFrom[i].path = "5";
                }

            }
            else {
                if (outputTokenAddress !== weth && outputTokenAddress !== weth2) {
                    // uni Initial
                    initialData = await getPrice(uni.methods, inputAmount, inputTokenAddress, weth, outputTokenDecimals, "uni lvl 2");

                    // uni
                    data = await getPrice(uni.methods, initialData.res, weth, outputTokenAddress, outputTokenDecimals, "uni to uni");
                    if (data.res && parseFloat(TokenFrom[i].targetPrice) < parseFloat(data.price)) {
                        TokenFrom[i].targetPrice = data.price;
                        TokenFrom[i].path = "2";
                    }

                    // Sushi
                    data = await getPrice(sushi.methods, initialData.res, weth2, outputTokenAddress, outputTokenDecimals, "uni to sushi");
                    if (data.res && parseFloat(TokenFrom[i].targetPrice) < parseFloat(data.price)) {
                        TokenFrom[i].targetPrice = data.price;
                        TokenFrom[i].path = "3";
                    }

                    initialData = await getPrice(sushi.methods, inputAmount, inputTokenAddress, weth2, outputTokenDecimals, "sushi lvl 2");

                    // uni
                    data = await getPrice(uni.methods, initialData.res, weth, outputTokenAddress, outputTokenDecimals, "sushi to uni");
                    if (data.res && parseFloat(TokenFrom[i].targetPrice) < parseFloat(data.price)) {
                        TokenFrom[i].targetPrice = data.price;
                        TokenFrom[i].path = "7";
                    }

                    // Sushi
                    data = await getPrice(sushi.methods, initialData.res, weth2, outputTokenAddress, outputTokenDecimals, "sushi to sushi");
                    if (data.res && parseFloat(TokenFrom[i].targetPrice) < parseFloat(data.price)) {
                        TokenFrom[i].targetPrice = data.price;
                        TokenFrom[i].path = "6";
                    }

                }
                if (inputTokenAddress === weth) {
                    initialData = await getPrice(uni.methods, inputAmount, weth, weth2, outputTokenDecimals, "uni lvl 2");

                    data = await getPrice(sushi.methods, initialData.res, weth2, outputTokenAddress, outputTokenDecimals, "uni to sushi");
                    if (data.res && parseFloat(TokenFrom[i].targetPrice) < parseFloat(data.price)) {
                        TokenFrom[i].targetPrice = data.price;
                        TokenFrom[i].path = "3";
                    }
                }
                if (inputTokenAddress === weth2) {
                    initialData = await getPrice(sushi.methods, inputAmount, weth2, weth, outputTokenDecimals, "sushi lvl 2");

                    data = await getPrice(uni.methods, initialData.res, weth, outputTokenAddress, outputTokenDecimals, "sushi to uni");
                    if (data.res && parseFloat(TokenFrom[i].targetPrice) < parseFloat(data.price)) {
                        TokenFrom[i].targetPrice = data.price;
                        TokenFrom[i].path = "7";
                    }

                }
                if (outputTokenAddress === weth) {
                    initialData = await getPrice(sushi.methods, inputAmount, inputTokenAddress, weth2, outputTokenDecimals, "sushi lvl 2");

                    data = await getPrice(uni.methods, initialData.res, weth2, weth, outputTokenDecimals, "sushi to uni");
                    if (data.res && parseFloat(TokenFrom[i].targetPrice) < parseFloat(data.price)) {
                        TokenFrom[i].targetPrice = data.price;
                        TokenFrom[i].path = "13";
                    }
                }

                data = await getPrice(uni.methods, inputAmount, inputTokenAddress, outputTokenAddress || weth, outputTokenDecimals, "uni");
                if (data.res && parseFloat(TokenFrom[i].targetPrice) < parseFloat(data.price)) {
                    TokenFrom[i].targetPrice = data.price;
                    TokenFrom[i].path = "1";
                }

                data = await getPrice(sushi.methods, inputAmount, inputTokenAddress, outputTokenAddress || weth2, outputTokenDecimals, "sushi");
                if (data.res && parseFloat(TokenFrom[i].targetPrice) < parseFloat(data.price)) {
                    TokenFrom[i].targetPrice = data.price;
                    TokenFrom[i].path = "5";

                }
                // console.log("value of target price::::", TokenFrom[i].targetPrice);
                // console.log("value of target TokenFrom[i].path::::", TokenFrom[i].path);

            }
        }

        if(TokenTo!==''){
            tokenToTotalValue();
        }

        // setTokenFrom(TokenFrom);
       


    }


    const getPrice = async (router, amount, firstpath, secondpath, decimals, route) => {
        console.log("value of amount", amount);
        console.log("value of first", firstpath);
        console.log("value of secondu", secondpath);
        console.log("value of router", router);
        console.log("value of weth", await router.WETH().call());
        console.log("test",);

        try {
            const res = await router.getAmountsOut(amount, [firstpath, secondpath]).call({ from: "0xD5Cd7dC05279653F960736482aBc7A7B2bF39B5d" });
            // const res = await router.getAmountsOut("1000000000000000000", ["0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa"]).call();
            const price = (parseInt(res[1]) / 10 ** parseInt(decimals)).toString();
            // console.log(`${route}: `, res);
            return { price, res: res[1] };
        }
        catch (error) {
            // console.log(`error in ${route}`);
            console.log("error came while fetching data:::", error);
            return { res: 0 };
        }
    }


    const handleApproveMultiToSingleToken = async () => {
        const web3 = window.web3;
        // const { tokenBlock, account, contractAddress } = this.state;
        const tokenBlock = TokenFrom;
        const contractAddress = ContractAddress;
        const account = Account;

        // if (!account.length) return alert("Please connect your wallet");
        for (let i = 0; i < tokenBlock.length; i++) {
            if (tokenBlock[i].isApprove) continue;

            const ercContract = await new web3.eth.Contract(ERC20ABI, tokenBlock[i].address);
            const totalSupply = await ercContract.methods.totalSupply().call({ from: account });
            await ercContract.methods.approve(contractAddress, totalSupply).send({ from: account }).then(() => {
                tokenBlock[i].isApprove = true;
                // this.setState({ ...this.state });
            })
                .catch((error) => {
                    alert('Transaction Failed');
                })
        }
        setTokenFrom(tokenBlock);
    }


    const handleMultiToSingleTokenSwap = async () => {
        // const { tokenBlock, account, isMultiToSingleToken, selectedDownToken } = this.state;
        const tokenBlock = TokenFrom;
        const account = Account;
        const isValid = tokenBlock.every((token) => token.isApprove);
        const isMultiToSingleToken = true;
        const selectedDownToken = TokenTo;
        const web3 = window.web3;
        const swap = new web3.eth.Contract(Swap, "0xD23774726DB4d3D03Ba483514d7c8DF9bE729eEa");

        if (isValid) {
            const weth2 = "0xc778417e063141139fce010982780140aa0cd5ab";
            const weth = "0xc778417e063141139fce010982780140aa0cd5ab";
            // this.setState({isSwapLoading: true});
            // this.setState({isSwapMiniLoading: true});
            const tokenInputAddress = tokenBlock.map((token) => !!token.address ? token.address : token.path == 1 ? weth : weth2);
            // const tokenInputAddress = ["0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"];
            const tokenInputAmount = tokenBlock.map((token) => (parseFloat(token.tokenAmount) * 10 ** parseInt(token.decimals)).toString());
            // const tokenInputAmount = ["2000", "2000"];
            const swapRoute = tokenBlock.map((token) => token.path);
            const isEth = tokenBlock.map((token) => token.isEth);;
            const targetTokenAddress = TokenTo.address;


            if (TokenTo.symbol === "ETH") {
                await swap.methods.swapToETH(tokenInputAmount, tokenInputAddress, swapRoute).send({ from: account })
                    .once('transactionHash', (txHash) => {
                        // this.setState({ transactionHash: txHash });
                        // this.setState({ isSwapLoading: false });
                        // this.setState({ isTransactionSubmitted: true });
                        alert("swapping is successfully done")
                    })
                    .then(() => {
                        // this.updateBalances();
                        // this.setState({ isSwapMiniLoading: false });
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
            else if (isEth.includes(true)) {
                const matic = tokenBlock.find((token) => token.isEth);


                const maticAmount = (parseFloat(matic.tokenAmount) * 10 ** parseInt(matic.decimals)).toString();

                console.log("value of matic amount::", maticAmount);
                await swap.methods.swap(tokenInputAmount, tokenInputAddress, swapRoute, isEth, targetTokenAddress, isMultiToSingleToken, TokenTo.isEth).send({ from: account, value: maticAmount })
                    .once('transactionHash', (txHash) => {
                        // this.setState({ transactionHash: txHash });
                        // this.setState({ isSwapLoading: false });
                        // this.setState({ isTransactionSubmitted: true });
                        alert("swapping is successfully done")
                    })
                    .then(() => {
                        // this.updateBalances();
                        // this.setState({ isSwapMiniLoading: false });
                    })
                    .catch((error) => {
                        if (error.code === 4001) {
                            // this.setState({ isSwapLoading: false });
                            // this.setState({ isSwapMiniLoading: false });
                        }
                    })
            }
            else {
                console.log("value of tokeninputaddress::", tokenInputAddress);
                console.log("value of targetTokenAddress::", targetTokenAddress);
                console.log("value of amountIN::", tokenInputAmount);
                console.log("value of swapRoute::", swapRoute);
                console.log("value of isMultiToSingleToken::", isMultiToSingleToken);
                console.log("value of selecteddowntoken isEth::", selectedDownToken.isEth);
                console.log("value of isEth::", isEth);
                await swap.methods.swap(tokenInputAmount, tokenInputAddress, swapRoute, isEth, targetTokenAddress, isMultiToSingleToken, TokenTo.isEth).send({ from: account })
                    .once('transactionHash', (txHash) => {
                        // this.setState({ transactionHash: txHash });
                        // this.setState({ isSwapLoading: false });
                        // this.setState({ isTransactionSubmitted: true });
                        alert("swapping is successfully done")
                    })
                    .then(() => {
                        // this.updateBalances();
                        // this.setState({ isSwapMiniLoading: false });
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        }
        else {
            alert("Please approve the token first")
        }
    }

    const setTokenFromAmt = (value,index)=>{
        TokenFrom[index].tokenAmount = value;
    }

    const swapTokens = async()=>{
        await handleApproveMultiToSingleToken();
        await handleMultiToSingleTokenSwap();
    }

    const tokenToTotalValue = async()=>{
        if(TokenFrom.length>0 && TokenTo !==''){
            console.log("value of Tokenfrom::",TokenFrom)
            let totalValue = 0;
            for(let i=0;i<TokenFrom.length;i++){
                totalValue=totalValue+ (parseFloat(TokenFrom[i].tokenAmount)*parseFloat(TokenFrom[i].targetPrice))
            }
            settotalToAmount(totalValue);
        }
        
        else{
            console.log("Please select tokens first")
        }
    }


    return (
        <Grid container >
            <Grid items xs={12} md={8} sx={{ mt: 5, ml: 5 }}>
                <Container>
                    <Typography variant='h3' sx={{ fontStyle: 'normal' }}>Exchange</Typography>
                    <Container sx={{ border: "1px solid #737373", borderRadius: '7px', boxSizing: 'border-box', mt: 2.5 }}>
                        <Box sx={{ mt: 4, mb: 3 }}>
                            <Stack spacing={2}>
                                <Stack spacing={0.5}>
                                    <Typography variant='caption' sx={{ color: '#f5f5f5' }}>Swap</Typography>
                                    <Stack direction='row' spacing={1}>
                                        <FormControl variant="outlined" style={{ width: '120px' }}>

                                            <Button
                                                variant='outlined'
                                                color='primary'
                                                sx={{
                                                    height: '57px', color: '#fff', fontWeight: 500, fontSize: '20px',
                                                    background: (theme) => theme.palette.gradients.custom
                                                }}
                                                onClick={() => {
                                                    setcurrencyModal(true);
                                                }}
                                            >{TokenFrom[0] === undefined ? "select" : TokenFrom[0].symbol}
                                            </Button>
                                        </FormControl>
                                        
                                        {/* {TokenTo!== '' && <Typography>1 {TokenFrom[0].symbol} = {TokenFrom[0].targetPrice}{TokenTo.symbol}</Typography>} */}
                                    </Stack>

                                    <Modal
                                        open={currencyModal}
                                        onClose={handleDismissSearch}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"

                                    >
                                        <Box
                                            sx={{
                                                marginTop: '2%',
                                                maxHeight: '520px',
                                                overflow: 'scroll',
                                                position: 'absolute',
                                                top: '45%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                width: 400,
                                                bgcolor: 'background.default',
                                                // border: '2px solid #000',
                                                // boxShadow: 24,
                                                p: 4,
                                                borderRadius: '15px'
                                            }}>
                                            <Typography variant='h6' align='center' sx={{ color: '#f5f5f5' }}>Token List</Typography>
                                            <Divider variant='fullWidth' sx={{ mt: 3 }}></Divider>
                                            {AllTokens.map((object) =>
                                                <Box >
                                                    <Box
                                                        onClick={() => {
                                                            fromTokenChange(object);
                                                            
                                                            setcurrencyModal(false)
                                                        }
                                                        }
                                                        sx={{
                                                            mt: 1, p: 1, cursor: 'pointer',
                                                            '&:hover': {
                                                                background: (theme) => (theme.palette.gradients.custom)
                                                            }
                                                        }}>
                                                        <Stack direction='row' spacing={2}>
                                                            <Box sx={{ marginTop: '5px' }}>
                                                                {object.logoURI !== null ? <img alt="" width="30" height="30" src={object.logoURI}
                                                                    style={{
                                                                        borderRadius: '50%',
                                                                        backgroundColor: '#e5e5e5'
                                                                    }}>
                                                                </img>
                                                                    :
                                                                    <Avatar style={{
                                                                        display: 'inline',
                                                                        maxWidth: '30px',
                                                                        verticalAlign: 'top',
                                                                        height: "30px",
                                                                        // marginLeft: '11px',

                                                                    }} color={"#737373"} name={object.name} round={true} size="30" textSizeRatio={1} />
                                                                }

                                                            </Box>
                                                            <Stack direction='column' >
                                                                <Typography variant='body1' sx={{ color: '#e3e3e3' }}>{object.symbol}</Typography>
                                                                <Typography variant='caption' sx={{ color: '#e3e3e3', fontSize: '11px' }}>{object.name}</Typography>
                                                            </Stack>

                                                            <Box sx={{ flexGrow: 1 }}></Box>
                                                            {/* <Box sx={{ marginTop: '5px' }}>
                                                                <Typography >
                                                                    {object.balance === undefined ? <Loader type="Rings" color="#BB86FC" height={30} width={30} /> : object.balance}
                                                                </Typography>
                                                            </Box> */}
                                                        </Stack>
                                                    </Box>
                                                    {/* <Divider variant='fullWidth' sx={{  }}></Divider> */}
                                                </Box>
                                            )}
                                        </Box>

                                    </Modal>

                                    <TextField variant='outlined'
                                        id="outlined-basic"
                                        placeholder="00.00"
                                        value={TokenFrom[0] !== undefined ?TokenFrom[0].tokenAmount:null}
                                        onChange={(e) => {
                                            // setTokenFromAmount(e.target.value);
                                            setTokenFromAmt(e.target.value,0)
                                            tokenToTotalValue()
                                            // calculateToAmount(e.target.value);
                                        }}>
                                    </TextField>

                                    <FiPlusCircle style={{ marginLeft: '54px', cursor: 'pointer' }} onClick={() => setshowFirstTab(true)} />
                                    {showFirstTab && 
                                    <Stack direction='row' spacing={1}>
                                    <FormControl variant="outlined" style={{ width: '120px' }}>
                                        <Button
                                            variant='outlined'
                                            color='primary'
                                            sx={{
                                                height: '57px', color: '#fff', fontWeight: 500, fontSize: '20px',
                                                background: (theme) => theme.palette.gradients.custom
                                            }}
                                            onClick={() => {
                                                setfirstcurrencyModal(true);
                                            }}
                                        >{TokenFrom[1] === undefined ? "select" : TokenFrom[1].symbol}
                                        </Button>
                                    </FormControl>
                                    {/* {TokenTo!== '' && <Typography>1 {TokenFrom[1].symbol} = {TokenFrom[1].targetPrice}{TokenTo.symbol}</Typography>} */}
                                    </Stack>}

                                    {showFirstTab && <TextField variant='outlined'
                                        id="outlined-basic"
                                        placeholder="00.00"
                                        value={TokenFrom[1] !== undefined ?TokenFrom[1].tokenAmount:null}
                                        onChange={(e) => {
                                            // setTokenFromAmount(e.target.value);
                                            setTokenFromAmt(e.target.value,1)
                                            tokenToTotalValue()
                                            // calculateToAmount(e.target.value);
                                        }}
                                        style={{ marginTop: '3px' }}
                                    >
                                    </TextField>}
                                    {showFirstTab && <FiPlusCircle style={{ marginLeft: '54px', cursor: 'pointer' }} onClick={() => setshowSecondTab(true)} />}
                                    {showSecondTab && <FormControl variant="outlined" style={{ width: '120px' }}>
                                        <Button
                                            variant='outlined'
                                            color='primary'
                                            sx={{
                                                height: '57px', color: '#fff', fontWeight: 500, fontSize: '20px',
                                                background: (theme) => theme.palette.gradients.custom
                                            }}
                                            onClick={() => {
                                                setsecondcurrencyModal(true);
                                            }}
                                        >{TokenFrom[2] === undefined ? "select" : TokenFrom[2].symbol}
                                        </Button>
                                    </FormControl>}

                                    {showSecondTab && <TextField variant='outlined'
                                        id="outlined-basic"
                                        placeholder="00.00"
                                        value={TokenFrom[2] !== undefined ?TokenFrom[2].tokenAmount:null}
                                        onChange={(e) => {
                                            // setTokenFromAmount(e.target.value);
                                            setTokenFromAmt(e.target.value,2)
                                            tokenToTotalValue()
                                            // calculateToAmount(e.target.value);
                                        }}
                                        style={{ marginTop: '3px' }}
                                    >
                                    </TextField>}

                                </Stack>
                                {/*  <Stack spacing={0.5}>
                                    <Typography variant='caption' sx={{ color: '#0E1214' }}>0</Typography>
                                    

                                    
                                </Stack> */}

                                <Stack spacing={0.5}>
                                    <Typography variant='caption' sx={{ color: '#f5f5f5' }}>For</Typography>
                                    <FormControl variant="outlined" style={{ width: '120px' }}>
                                        <Button
                                            variant='outlined'
                                            color='primary'
                                            sx={{
                                                height: '57px', color: '#fff', fontWeight: 500, fontSize: '20px',
                                                background: (theme) => theme.palette.gradients.custom
                                            }}
                                            onClick={() => {
                                                setcurrencyToModal(true);
                                            }}
                                        >{TokenTo.symbol === undefined ? 'Select' : TokenTo.symbol}
                                        </Button>
                                    </FormControl>
                                    <Modal
                                        open={currencyToModal}
                                        onClose={handleCurrencyToDismissSearch}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box
                                            sx={{
                                                marginTop: '2%',
                                                maxHeight: '520px',
                                                overflow: 'scroll',
                                                position: 'absolute',
                                                top: '45%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                width: 400,
                                                bgcolor: 'background.default',
                                                // border: '2px solid #000',
                                                // boxShadow: 24,
                                                p: 4,
                                                borderRadius: '15px'
                                            }}>
                                            <Typography variant='h6' align='center' sx={{ color: '#f5f5f5' }}>Token List</Typography>
                                            <Divider variant='fullWidth' sx={{ mt: 3 }}></Divider>
                                            {toTokens.map((object) =>
                                                <Box >
                                                    <Box
                                                        onClick={() => {
                                                            ToTokenChange(object);
                                                            
                                                            setcurrencyToModal(false)
                                                        }
                                                        }
                                                        sx={{
                                                            mt: 1, p: 1, cursor: 'pointer',
                                                            '&:hover': {
                                                                background: (theme) => (theme.palette.gradients.custom)
                                                            }
                                                        }}>
                                                        <Stack direction='row' spacing={2}>
                                                            <Box sx={{ marginTop: '5px' }}>
                                                                {object.logoURI !== null ? <img alt="" width="30" height="30" src={object.logoURI}
                                                                >
                                                                </img>
                                                                    :
                                                                    <Avatar style={{
                                                                        display: 'inline',
                                                                        maxWidth: '30px',
                                                                        verticalAlign: 'top',
                                                                        height: "30px",
                                                                        // marginLeft: '11px',

                                                                    }} color={"#737373"} name={object.name} round={true} size="30" textSizeRatio={1} />
                                                                }

                                                            </Box>
                                                            <Stack direction='column' >
                                                                <Typography variant='body1' sx={{ color: '#e3e3e3' }}>{object.symbol}</Typography>
                                                                <Typography variant='caption' sx={{ color: '#e3e3e3', fontSize: '11px' }}>{object.name}</Typography>
                                                            </Stack>
                                                        </Stack>
                                                    </Box>
                                                </Box>
                                            )}
                                        </Box>

                                    </Modal>
                                    <TextField variant='outlined'
                                        id="outlined-basic"
                                        placeholder="00.00"
                                        // value={selectedRate !== null && protocolsRateList.length > 0 ? selectedRate.TokenToAmount : "00.00"}
                                        value={ totalToAmount!== ''? totalToAmount : "00.00"}
                                        onChange={(e) => { setTokenToAmount(e.target.value) }}
                                        disabled>
                                    </TextField>

                                </Stack>
                                {/* <Stack spacing={0.5}>
                                    <Typography variant='caption' sx={{ color: '#0E1214' }}>0</Typography>
                                    
                                </Stack> */}

                            </Stack>
                            {selectedRate !== null && protocolsRateList.length === 0 ? <Typography variant='caption' sx={{ color: '#FFC107' }}>This Exchange is yet not supported</Typography> : <></>}
                            <Stack direction='row' sx={{ mt: 2 }}>
                                {Sources.map((object) =>
                                    <div>
                                        <Button variant='contained' color='primary' disabled size='small' sx={{ fontSize: '10px' }}>
                                            {(parseFloat(object.proportion) * 100).toFixed(2)}% {object.name}
                                        </Button>
                                        <FaAngleRight style={{ paddingTop: '6px', marginLeft: '1px', color: '#737373' }} />
                                    </div>
                                )}
                            </Stack>
                            <Typography variant='body1' sx={{ color: '#737373', mt: 2.5 }}>Transaction Settings</Typography>
                            <Stack direction='row' spacing={1} sx={{ mt: 1.5 }}>
                                <Typography variant='body2' sx={{ color: '#f5f5f5' }}>Slippage</Typography>
                                <Divider sx={{ flexGrow: 1, border: "0.5px dashed rgba(255, 255, 255, 0.3)", height: '0px' }} style={{ marginTop: '10px' }} />
                                {/* <TextField variant='outlined'
                                    required
                                    id="outlined-basic"
                                    size='small'
                                    style={{ marginTop: '-7px', width: '12%' }}
                                    value={Slippage} onChange={(e) => { setSlippage(e.target.value) }}
                                    endAdornment={<InputAdornment position="end" sx={{color:'red'}}>%K</InputAdornment>}>
                                </TextField> */}
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    value={Slippage}
                                    onChange={(e) => { setSlippage(e.target.value) }}
                                    size='small'
                                    style={{ marginTop: '-7px', width: '12%' }}
                                    endAdornment={<InputAdornment position="end">%</InputAdornment>}
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />
                            </Stack>
                            {protocolsRateList.length > 0 &&
                                <Stack direction='row' spacing={1} sx={{ mt: 1.5 }}>
                                    <Typography variant='body2' sx={{ color: '#f5f5f5' }}>Offered By</Typography>
                                    <Divider sx={{ flexGrow: 1, border: "0.5px dashed rgba(255, 255, 255, 0.3)", height: '0px' }} style={{ marginTop: '10px' }} />
                                    <Button onClick={handleOpen} sx={{ height: '20px' }}>{selectedRate.name}</Button>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <Typography variant='h6' align='center' sx={{ color: '#f5f5f5' }}>Offered By</Typography>
                                            <Divider variant='fullWidth' sx={{ mt: 3 }}></Divider>
                                            <Box>
                                                <Stack direction='row' spacing={6} sx={{ mt: 2 }}>
                                                    <Typography variant='caption' sx={{ color: '#737373' }}>Receive</Typography>
                                                    <Typography variant='caption' sx={{ color: '#737373' }}>Network Fee</Typography>
                                                </Stack>
                                            </Box>
                                            {protocolsRateList.map((object) => (
                                                (object.name === selectedExchangeName ?
                                                    <Box onClick={() => newRateSelected(object)} sx={{ border: '1px solid #BB86FC', borderRadius: '7px', mt: 1, p: 1, cursor: 'pointer' }}>
                                                        <Stack direction='row' spacing={2}>
                                                            <Typography variant='body1' sx={{ color: '#e3e3e3' }}>${object.receivedValueInDollar}</Typography>
                                                            <Typography variant='body1' sx={{ color: '#e3e3e3' }}>${object.gas}</Typography>
                                                            <Box sx={{ flexGrow: 1 }}></Box>
                                                            {/* <Avatar alt="" src={exchangeIcon}></Avatar> */}
                                                            <Tooltip title={object.name}>
                                                                {object.name === 'Balancer' ? <img alt="" width="21" height="20" src={Balancer} ></img> : object.name === '0x Exchange' ? <img alt="" width="21" height="20" src={object.image} style={{ filter: 'invert(1)' }} ></img> : <img alt="" width="21" height="20" src={object.image} ></img>}
                                                            </Tooltip>
                                                        </Stack>
                                                    </Box> :
                                                    <Box onClick={() => newRateSelected(object)} sx={{ border: '1px solid #737373', borderRadius: '7px', mt: 1, p: 1, cursor: 'pointer' }}>
                                                        <Stack direction='row' spacing={2}>
                                                            <Typography variant='body1' sx={{ color: '#e3e3e3' }}>${object.receivedValueInDollar}</Typography>
                                                            <Typography variant='body1' sx={{ color: '#e3e3e3' }}>${object.gas}</Typography>
                                                            <Box sx={{ flexGrow: 1 }}></Box>
                                                            {/* <Avatar alt="" src={exchangeIcon}></Avatar> */}
                                                            <Tooltip title={object.name}>
                                                                {object.name === 'Balancer' ? <img alt="" width="21" height="20" src={Balancer} ></img> : object.name === '0x Exchange' ? <img alt="" width="21" height="20" src={object.image} style={{ filter: 'invert(1)' }} ></img> : <img alt="" width="21" height="20" src={object.image} ></img>}
                                                            </Tooltip>
                                                        </Stack>
                                                    </Box>)

                                            ))}

                                            <Box sx={{ marginLeft: '30%' }}>
                                                <Button onClick={updateSelectedRate} variant='outlined' sx={{ mt: 2 }} >Save for This Trade</Button>
                                            </Box>

                                        </Box>
                                    </Modal>
                                </Stack>}


                            <Stack direction='row' spacing={1} sx={{ mt: 1.5 }}>
                                <Typography variant='body2' sx={{ color: '#f5f5f5' }}>Min. output</Typography>
                                <Divider sx={{ flexGrow: 1, border: "0.5px dashed rgba(255, 255, 255, 0.3)", height: '0px' }} style={{ marginTop: '10px' }} />
                                {/* <Typography variant='body2'>{selectedRate !== null && protocolsRateList.length > 0 ? ((parseFloat(TokenFromAmount) * parseFloat(selectedRate.minPrice)).toFixed(3)) : "00.00"}{TokenTo !== '' ? TokenTo.symbol : ''}</Typography> */}
                                <Typography variant='body2'>{totalToAmount !== '' ? totalToAmount : "00.00"}{TokenTo !== '' ? TokenTo.symbol : ''}</Typography>
                            </Stack>

                            <Stack direction='row' spacing={1} sx={{ mt: 1.5 }}>
                                <Typography variant='body2' sx={{ color: '#f5f5f5' }}>Rate</Typography>
                                <Divider sx={{ flexGrow: 1, border: "0.5px dashed rgba(255, 255, 255, 0.3)", height: '0px' }} style={{ marginTop: '10px' }} />
                                {/* <Typography variant='body2'> 1 {TokenFrom} = {selectedRate !== null && protocolsRateList.length > 0 ? parseFloat(selectedRate.price).toFixed(3) : '00.00'} {TokenTo !== '' ? TokenTo.symbol : ''}</Typography> */}
                                <Stack>
                                    <Typography variant='body2'>{TokenFrom[0]!==undefined && TokenTo !==''? `1${TokenFrom[0].symbol}=${TokenFrom[0].targetPrice}${TokenTo.symbol}`:''}</Typography>
                                    <Typography variant='body2'>{TokenFrom[1]!==undefined && TokenTo !==''? `1${TokenFrom[1].symbol}=${TokenFrom[1].targetPrice}${TokenTo.symbol}`:''}</Typography>
                                    <Typography variant='body2'>{TokenFrom[2]!==undefined && TokenTo !==''? `1${TokenFrom[2].symbol}=${TokenFrom[2].targetPrice}${TokenTo.symbol}`:''}</Typography>
                                </Stack>
                            </Stack>

                        </Box>
                    </Container>
                    {txSuccess && <Typography variant='caption' sx={{ color: '#54D62C' }}>Swap is done Successfully</Typography>}
                    {txFailure && <Typography variant='caption' sx={{ color: '#FF4842' }}>Swap is Failed</Typography>}
                    <TransparentButton value='Submit'
                        onClick={swapTokens}
                        style={{
                            height: '45px',
                            width: '200px',
                            background: 'transparent',
                            borderWidth: '2px',
                            borderStyle: 'solid',
                            borderColor: '#3b2959',
                            borderRadius: '5px',
                            color: 'white',
                            cursor: 'pointer',
                            float: 'right',
                            marginTop: '20px'
                        }}></TransparentButton> <br /><br /> &nbsp;

                    {/* <Button onClick={() => { calculateToAmountNew(1) }}>Testing</Button> */}
                </Container>
            </Grid>
            <Modal
                open={firstcurrencyModal}
                onClose={handleDismissSearch}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box
                    sx={{
                        marginTop: '2%',
                        maxHeight: '520px',
                        overflow: 'scroll',
                        position: 'absolute',
                        top: '45%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.default',
                        // border: '2px solid #000',
                        // boxShadow: 24,
                        p: 4,
                        borderRadius: '15px'
                    }}>
                    <Typography variant='h6' align='center' sx={{ color: '#f5f5f5' }}>Token List</Typography>
                    <Divider variant='fullWidth' sx={{ mt: 3 }}></Divider>
                    {AllTokens.map((object) =>
                        <Box >
                            <Box
                                onClick={() => {
                                    fromTokenChange(object);
                                    setfirstcurrencyModal(false)
                                }
                                }
                                sx={{
                                    mt: 1, p: 1, cursor: 'pointer',
                                    '&:hover': {
                                        background: (theme) => (theme.palette.gradients.custom)
                                    }
                                }}>
                                <Stack direction='row' spacing={2}>
                                    <Box sx={{ marginTop: '5px' }}>
                                        {object.logoURI !== null ? <img alt="" width="30" height="30" src={object.logoURI}
                                            style={{
                                                borderRadius: '50%',
                                                backgroundColor: '#e5e5e5'
                                            }}>
                                        </img>
                                            :
                                            <Avatar style={{
                                                display: 'inline',
                                                maxWidth: '30px',
                                                verticalAlign: 'top',
                                                height: "30px",
                                                // marginLeft: '11px',

                                            }} color={"#737373"} name={object.name} round={true} size="30" textSizeRatio={1} />
                                        }

                                    </Box>
                                    <Stack direction='column' >
                                        <Typography variant='body1' sx={{ color: '#e3e3e3' }}>{object.symbol}</Typography>
                                        <Typography variant='caption' sx={{ color: '#e3e3e3', fontSize: '11px' }}>{object.name}</Typography>
                                    </Stack>

                                    <Box sx={{ flexGrow: 1 }}></Box>
                                    {/*  <Box sx={{ marginTop: '5px' }}>
                                        <Typography >
                                            {object.balance === undefined ? <Loader type="Rings" color="#BB86FC" height={30} width={30} /> : object.balance}
                                        </Typography>
                                    </Box> */}
                                </Stack>
                            </Box>
                            {/* <Divider variant='fullWidth' sx={{  }}></Divider> */}
                        </Box>
                    )}
                </Box>

            </Modal>

            <Modal
                open={secondcurrencyModal}
                onClose={handleDismissSearch}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box
                    sx={{
                        marginTop: '2%',
                        maxHeight: '520px',
                        overflow: 'scroll',
                        position: 'absolute',
                        top: '45%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.default',
                        // border: '2px solid #000',
                        // boxShadow: 24,
                        p: 4,
                        borderRadius: '15px'
                    }}>
                    <Typography variant='h6' align='center' sx={{ color: '#f5f5f5' }}>Token List</Typography>
                    <Divider variant='fullWidth' sx={{ mt: 3 }}></Divider>
                    {AllTokens.map((object) =>
                        <Box >
                            <Box
                                onClick={() => {
                                    fromTokenChange(object);
                                    setsecondcurrencyModal(false)
                                }
                                }
                                sx={{
                                    mt: 1, p: 1, cursor: 'pointer',
                                    '&:hover': {
                                        background: (theme) => (theme.palette.gradients.custom)
                                    }
                                }}>
                                <Stack direction='row' spacing={2}>
                                    <Box sx={{ marginTop: '5px' }}>
                                        {object.logoURI !== null ? <img alt="" width="30" height="30" src={object.logoURI}
                                            style={{
                                                borderRadius: '50%',
                                                backgroundColor: '#e5e5e5'
                                            }}>
                                        </img>
                                            :
                                            <Avatar style={{
                                                display: 'inline',
                                                maxWidth: '30px',
                                                verticalAlign: 'top',
                                                height: "30px",
                                                // marginLeft: '11px',

                                            }} color={"#737373"} name={object.name} round={true} size="30" textSizeRatio={1} />
                                        }

                                    </Box>
                                    <Stack direction='column' >
                                        <Typography variant='body1' sx={{ color: '#e3e3e3' }}>{object.symbol}</Typography>
                                        <Typography variant='caption' sx={{ color: '#e3e3e3', fontSize: '11px' }}>{object.name}</Typography>
                                    </Stack>

                                    <Box sx={{ flexGrow: 1 }}></Box>
                                    {/* <Box sx={{ marginTop: '5px' }}>
                                        <Typography >
                                            {object.balance === undefined ? <Loader type="Rings" color="#BB86FC" height={30} width={30} /> : object.balance}
                                        </Typography>
                                    </Box> */}
                                </Stack>
                            </Box>
                            {/* <Divider variant='fullWidth' sx={{  }}></Divider> */}
                        </Box>
                    )}
                </Box>

            </Modal>
            {console.log("value of selected token:::", TokenFrom)}
        </Grid >
    );

}
