import React, { useState, useEffect } from 'react';
import './exchange.css';
import FormControl from '@material-ui/core/FormControl';
import TransparentButton from '../../components/TransparentButton'
import Web3 from 'web3';
import ERC20ABI from '../../abi/ERC20.json'
import { Box, Typography, Stack, Container, Grid, TextField, Divider, Button, Modal, Tooltip, InputAdornment, OutlinedInput } from '@material-ui/core';
import styled from 'styled-components'
import { ethers } from "ethers";
import { useParams } from 'react-router-dom';
import Avatar from 'react-avatar';
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import IUniswapV2Router02 from '../../abi/IUniswapV2Router02.json';
import Swap from '../../abi/SwapWithReverse.json'
import tokenList from './TokenList';
import useForceUpdate from 'use-force-update';

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
    const [AllTokens, setAllTokens] = useState([]);
    const [txSuccess, settxSuccess] = useState(false)
    const [txFailure, settxFailure] = useState(false)
    const [currencyModal, setcurrencyModal] = useState(false)
    const [currencyToModal, setcurrencyToModal] = useState(false)
    const [toTokens, settoTokens] = useState([])
    const [ContractAddress, setcontractAddress] = useState("0xD23774726DB4d3D03Ba483514d7c8DF9bE729eEa")
    const [Account, setAccount] = useState("")
    const [totalToAmount, settotalToAmount] = useState('')
    const [fromTokenCount, setfromTokenCount] = useState([0])

    const forceUpdate = useForceUpdate();

    useEffect(() => {
        const tokens = tokenList["4"];
        setAllTokens(tokens)
        settoTokens(tokens)
        setLoggedInAccount()
    }, [])

    useEffect(() => {
        calculateToAmountNew();

    }, [TokenTo])

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

    

    const fromTokenChange = (value) => {
        let temp = TokenFrom;
        temp.push(value)
        setTokenFrom(temp);
    }

    const ToTokenChange = (value) => {
        setTokenTo(value)
        setTokenFromAmount(0);
        setTokenToAmount(0);
    }

    const handleDismissSearch = () => {
        setcurrencyModal(false);
        //    setfirstcurrencyModal (false);
        //     setsecondcurrencyModal(false);
    }
    const handleCurrencyToDismissSearch = () => {
        setcurrencyToModal(false);
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

        if (TokenTo !== '') {
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

    const setTokenFromAmt = (value, index) => {
        TokenFrom[index].tokenAmount = value;
    }

    const swapTokens = async () => {
        await handleApproveMultiToSingleToken();
        await handleMultiToSingleTokenSwap();
    }

    const tokenToTotalValue = async () => {
        if (TokenFrom.length > 0 && TokenTo !== '') {
            console.log("value of Tokenfrom::", TokenFrom)
            let totalValue = 0;
            for (let i = 0; i < TokenFrom.length; i++) {
                totalValue = totalValue + (parseFloat(TokenFrom[i].tokenAmount) * parseFloat(TokenFrom[i].targetPrice))
            }
            settotalToAmount(totalValue);
        }

        else {
            console.log("Please select tokens first")
        }
    }

    const addFromTab = async () => {
        let fromTabCount = fromTokenCount.at(-1);
        fromTabCount = fromTabCount + 1;
        let temp = fromTokenCount;
        temp.push(fromTabCount);
        setfromTokenCount(temp);
        forceUpdate();
    }



    const removeFromTab = async (index) => {
        let temp = fromTokenCount;
        temp.pop();
        setfromTokenCount(temp);

        let fromTokenTemp = TokenFrom;
        fromTokenTemp.splice(index,1);
        setTokenFrom(fromTokenTemp);
        tokenToTotalValue();
        forceUpdate();
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
                                    {fromTokenCount.map((i) =>
                                        <>
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
                                                    >{TokenFrom[i] === undefined ? "select" : TokenFrom[i].symbol}
                                                    </Button>
                                                </FormControl>
                                                {i !== 0 && <FiMinusCircle style={{ marginLeft: '34px', marginTop: '20px', cursor: 'pointer' }} onClick={() => removeFromTab(i)} />}
                                            </Stack>

                                            {/* {TokenTo!== '' && <Typography>1 {TokenFrom[0].symbol} = {TokenFrom[0].targetPrice}{TokenTo.symbol}</Typography>} */}


                                            <TextField variant='outlined'
                                                id="outlined-basic"
                                                placeholder="00.00"
                                                value={TokenFrom[i] !== undefined ? TokenFrom[i].tokenAmount : null}
                                                onChange={(e) => {
                                                    // setTokenFromAmount(e.target.value);
                                                    setTokenFromAmt(e.target.value, i)
                                                    tokenToTotalValue()
                                                    // calculateToAmount(e.target.value);
                                                }}>
                                            </TextField>
                                        </>
                                    )}
                                    <FiPlusCircle style={{ marginLeft: '54px', cursor: 'pointer' }} onClick={() => addFromTab()} />
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
                                        value={totalToAmount !== '' ? totalToAmount : "00.00"}
                                        onChange={(e) => { setTokenToAmount(e.target.value) }}
                                        disabled>
                                    </TextField>

                                </Stack>
                                {/* <Stack spacing={0.5}>
                                    <Typography variant='caption' sx={{ color: '#0E1214' }}>0</Typography>
                                    
                                </Stack> */}

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
                                    {TokenFrom.map((token)=>
                                    <Typography variant='body2'>{token.targetPrice!==undefined && TokenTo !== '' ? `1${token.symbol}=${token.targetPrice}${TokenTo.symbol}` : ''}</Typography>
                                    )}
                                    
                                    
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

            {/* Token list modal */}
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

            
        </Grid >
    );

}
