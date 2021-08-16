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
import { Box, Typography, Stack, Container, Grid, TextField, Divider, Button, Modal, Tooltip, Avatar, InputAdornment, OutlinedInput } from '@material-ui/core';
// import exchangeIcon from '../../assets/icons/exchange.png'
// import Uniswap from '../../assets/icons/Uniswap.webp';
// import Curve from '../../assets/icons/Curve.webp';
// import SushiSwap from '../../assets/icons/Sushiswap.webp';
// import Bancor from '../../assets/icons/Bancor.webp';
import Balancer from '../../assets/icons/balancer.png';


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

export default function Exchange() {

    const [TokenFrom, setTokenFrom] = useState('');
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
    const [toTokenToId, settoTokenToId] = useState('')
    // const [tokenToDollarValue, settokenToDollarValue] = useState(0)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        async function getData() {
            let fetchedTokens;
            await axios.get(`https://api.0x.org/swap/v1/tokens`, {}, {})
                .then(async (response) => {
                    setAllTokens(response.data.records)
                    fetchedTokens = response.data.records;
                    console.log(response.data.records)
                })
            await axios.get(`https://tokens.coingecko.com/uniswap/all.json`, {}, {})
                .then(async (response) => {
                    let data = response.data.tokens;
                    let tokens = fetchedTokens.map((token) => ({ ...token, logoURI: data.find(x => x.address == token.address) ? data.find(x => x.address == token.address).logoURI : tokenURIs.find(x => x.address == token.address).logoURI }));
                    console.log(tokens.filter((token) => token.logoURI === ""));
                    console.log("all tokens data",tokens)
                    setAllTokens(tokens)
                })
        }
        getData()
    }, [])

    useEffect(() => {
       async function getEthdollarValue(){
           try{
               const ethDollarValue = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
               setethPrice(ethDollarValue.data.ethereum.usd);
           }
           catch{

           }
       }
       getEthdollarValue();
    },[])

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
    async function transact() {
        await loadWeb3()
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts()
        console.log('account selected is :::',accounts[0])
        if (TokenFromAmount !== '' && TokenFrom !== '' && TokenTo !== '') {
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
        }
    }


    const dollarValueOfToken= async (tokenAddress) =>{
        try{
            const response = await axios.get(`https://api.ethplorer.io/getTokenInfo/${tokenAddress}?apiKey=EK-qSPda-W9rX7yJ-UY93y`)
            let data = response.data;
            console.log('response of ethplorere api::',data)
            if(data.price!== undefined){
                console.log("enter inside method")
                // settokenToDollarValue(data.price.rate);
                return data.price.rate;
            }
            else{
                console.log("dollar value of this token is undefined")
            }
        }
        catch{

        }
    }

    const calculateToAmount = async (tokenFromAmount) => {
        // console.log("calculate amount is called")
        if (TokenFromAmount !== '' && TokenFrom !== '' && TokenTo !== '') {
            // alert(TokenFromAmount)
            // console.log("token from amount::",TokenFromAmount)
            // let amount = parseFloat(TokenFromAmount) * Math.pow(10, 18);
            let differentQuoteList=[];
            const protocolsList = ['','Uniswap','Curve','SushiSwap','Bancor','Balancer']
            let amount = parseFloat(tokenFromAmount) * Math.pow(10, 18);

            const tokenToDollarValue = await dollarValueOfToken(TokenTo.address);

            await axios.get(`https://api.0x.org/swap/v1/quote?buyToken=${TokenTo.symbol}&sellToken=${TokenFrom}&sellAmount=${amount}&feeRecipient=0xE609192618aD9aC825B981fFECf3Dfd5E92E3cFB&buyTokenPercentageFee=0.02`, {}, {})
                .then(async (response) => {
                    console.log("value came from ox:::", response)
                    setPrice(response.data.price)
                    setMinPrice(response.data.guaranteedPrice)
                    setTokenToAmount((parseInt(response.data.buyAmount) * Math.pow(10, -TokenTo.decimals)).toFixed(3).toString())
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

            for(let i=0;i<protocolsList.length;i++){
                try{
                    let protocolQuote={};
                    const response = await axios.get(`https://api.0x.org/swap/v1/quote?buyToken=${TokenTo.symbol}&sellToken=${TokenFrom}&sellAmount=${amount}&includedSources=${protocolsList[i]}`)
                    console.log(`response for all ${protocolsList[i]}`,response.data);
                    if( protocolsList[i]===''){
                        protocolQuote.name='0x Exchange'
                    }
                    else{
                        protocolQuote.name = protocolsList[i];
                    }
                    protocolQuote.price = response.data.price;
                    protocolQuote.minPrice = response.data.guaranteedPrice
                    protocolQuote.TokenToAmount = (parseInt(response.data.buyAmount) * Math.pow(10, -18)).toFixed(3).toString()
                    protocolQuote.gas = (((parseInt(response.data.gas)* parseInt(response.data.gasPrice))* Math.pow(10, -18))*ethPrice).toFixed(3);
                    console.log("dollar value of token",tokenToDollarValue);
                    protocolQuote.receivedValueInDollar = ((parseInt(response.data.buyAmount) * Math.pow(10, -TokenTo.decimals))*tokenToDollarValue).toFixed(3);
                    // protocolQuote.image = `../../assets/icons/${protocolsList[i]}.webp`;
                    if(protocolsList[i]==='Bancor'){
                        protocolQuote.image = "https://assets.coingecko.com/coins/images/14053/small/bancorvbnt_32.png?1614048819";
                    }
                    if(protocolsList[i]==='Uniswap'){
                        protocolQuote.image = "https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png?1600306604";
                    }
                    if(protocolsList[i]==='Curve'){
                        protocolQuote.image = "https://assets.coingecko.com/markets/images/538/small/Curve.png?1591605481";
                    }
                    if(protocolsList[i]==='SushiSwap'){
                        protocolQuote.image = "https://assets.coingecko.com/markets/images/576/small/2048x2048_Logo.png?1609208464";
                    }
                    if(protocolsList[i]==='Balancer'){
                        protocolQuote.image = "https://assets.coingecko.com/coins/images/11683/small/Balancer.png?1592792958";
                    }
                    if(protocolsList[i]===''){
                        protocolQuote.image = "https://assets.coingecko.com/markets/images/565/small/0x-protocol.png?1596623034";
                    }
                    
                    differentQuoteList.push(protocolQuote);
                }
                catch{
                    console.log(`error come for ${protocolsList[i]}`);
                }
                
            }    
            setprotocolsRateList(differentQuoteList);
            console.log("different rates we have::",differentQuoteList);
            
        }
    }

    /* return (
            <div className="main-container">
                <div className="outbox">
                    <br/><br/>
                    <div className="main-header">Exchange</div>
                    <div className="box">

                        <div className="firstdiv">
                            <div className="firstdiv1">
                                <div className="swap"> Swap </div>
                                <div>

                                <FormControl variant="outlined" style={{width:'120px'}}>
                                    <InputLabel id="demo-simple-select-outlined-label" >Token</InputLabel>
                                    <Select
                                    style={{height:'50px', color:'white'}}
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={TokenFrom}
                                    onChange={(e)=>{setTokenFrom(e.target.value)}}
                                    label="Token"
                                    >
                                    <MenuItem value="" sx={{backgroundColor:'#141a1e'}}>
                                        <em>None</em>
                                    </MenuItem>
                                    {AllTokens.map((object)=>
                                        <MenuItem value={object.symbol} sx={{backgroundColor:'#141a1e'}}>
                                            <div className="logo-container">
                                                <img src={object.logoURI} className="logo-uri" />
                                            </div>
                                            {object.symbol}
                                        </MenuItem>)}
                                    </Select>
                                </FormControl>

                                </div>
                            </div>

                            <div className="firstdiv2" style={{ marginLeft: "7px" }}>
                                <div className="number"> &nbsp; </div>
                                <div>
                                    <input className="inputfield"
                                        type="text" inputMode="decimal" placeholder="00.00"
                                        minLength="1"
                                        maxLength="79"
                                        spellCheck="false"
                                        value={TokenFromAmount}
                                        onChange={(e)=>{setTokenFromAmount(e.target.value)}}
                                    >
                                    </input>
                                </div>
                            </div>



                            <div className="firstdiv3">
                                <div className="swap"> For </div>
                                <div>
                                <FormControl variant="outlined" style={{width:'120px'}}>
                                    <InputLabel id="demo-simple-select-outlined-label" >Token</InputLabel>
                                    <Select
                                    style={{height:'50px', color:'white'}}
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={TokenTo}
                                    onChange={(e)=>{setTokenTo(e.target.value)}}
                                    label="Token"
                                    >
                                    <MenuItem value="" sx={{backgroundColor:'#141a1e'}}>
                                        <em >None</em>
                                    </MenuItem>
                                    {AllTokens.map((object)=>
                                        <MenuItem value={object.symbol} sx={{backgroundColor:'#141a1e'}}>
                                            <div className="logo-container">
                                                <img src={object.logoURI} className="logo-uri" />
                                            </div>
                                            {object.symbol}
                                        </MenuItem>)}
                                    </Select>
                                </FormControl>
                                </div>
                            </div>

                            <div className="firstdiv4" style={{ marginLeft: "7px" }}>
                                <div className="number"> &nbsp;</div>
                                <div>
                                    <input className="inputfield" inputMode="decimal"
                                        type="text"
                                        pattern="^[0-9]*[.,]?[0-9]*$"
                                        placeholder="00.00"
                                        minLength="1"
                                        maxLength="79"
                                        spellCheck="false"
                                        value={TokenToAmount}
                                        onChange={(e)=>{setTokenToAmount(e.target.value)}}
                                    ></input>
                                </div>
                            </div>

                        </div>
                        
                        <div className="seconddiv">Transaction Settings</div>
                        <font color='white'>
                        {Sources.map((object)=><>{object.name}    :     {(parseFloat(object.proportion)*100).toFixed(2)} %<br/></>)}
                        </font>
                        <div className="thirddiv"> <div className="thirddiv-title"> Slippage </div> <div className="dash"></div> <div className="slippage-input-box"> <input className="slippage-input" value={Slippage} onChange={(e)=>{setSlippage(e.target.value)}} maxLength="3"></input>
                            <div className="Percentage"> <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.406781 2.85C0.406781 2.19133 0.597448 1.67567 0.978781 1.303C1.36878 0.930333 1.86711 0.744 2.47378 0.744C3.08045 0.744 3.57445 0.930333 3.95578 1.303C4.34578 1.67567 4.54078 2.19133 4.54078 2.85C4.54078 3.51733 4.34578 4.03733 3.95578 4.41C3.57445 4.78267 3.08045 4.969 2.47378 4.969C1.86711 4.969 1.36878 4.78267 0.978781 4.41C0.597448 4.03733 0.406781 3.51733 0.406781 2.85ZM8.75278 0.899999L3.64378 10H1.87578L6.97178 0.899999H8.75278ZM2.46078 1.836C1.98411 1.836 1.74578 2.174 1.74578 2.85C1.74578 3.53467 1.98411 3.877 2.46078 3.877C2.69478 3.877 2.87678 3.79467 3.00678 3.63C3.13678 3.45667 3.20178 3.19667 3.20178 2.85C3.20178 2.174 2.95478 1.836 2.46078 1.836ZM6.11378 8.037C6.11378 7.36967 6.30445 6.854 6.68578 6.49C7.07578 6.11733 7.57411 5.931 8.18078 5.931C8.78745 5.931 9.27712 6.11733 9.64978 6.49C10.0311 6.854 10.2218 7.36967 10.2218 8.037C10.2218 8.70433 10.0311 9.22433 9.64978 9.597C9.27712 9.96967 8.78745 10.156 8.18078 10.156C7.56545 10.156 7.06711 9.96967 6.68578 9.597C6.30445 9.22433 6.11378 8.70433 6.11378 8.037ZM8.16778 7.023C7.67378 7.023 7.42678 7.361 7.42678 8.037C7.42678 8.72167 7.67378 9.064 8.16778 9.064C8.65312 9.064 8.89578 8.72167 8.89578 8.037C8.89578 7.361 8.65312 7.023 8.16778 7.023Z" fill="white" />
                            </svg>
                            </div>
                        </div> </div>
                        <div className="fourthdiv"><div className="fourthdiv-title"> Min. output </div> <div className="dash1"> </div> <div className="minimum-op-text">{TokenFromAmount>0? (parseFloat(TokenFromAmount)*parseFloat(minPrice)).toFixed(3):'0'}</div> </div>
                        <div className="fifthdiv"><div className="fifthdiv-title"> Rate </div> <span className="dash2"></span> <div className="rate-text"> 1 {TokenFrom} = {parseFloat(Price).toFixed(3)} {TokenTo}</div> </div>
                    </div>
                    <TransparentButton value='Submit Transaction'
                    onClick={transact}
                    style={{
                        height:'45px',
                        width:'300px',
                        background:'transparent',
                        borderWidth:'1px',
                        borderStyle:'solid',
                        borderColor:'#ac6afc',
                        borderRadius:'5px',
                        color:'white',
                        cursor:'pointer',
                        float:'right'
                    }}></TransparentButton> <br/><br/> &nbsp;
                    /* <div className="end"><div className="submit"> <button onClick={transact} className="submit-btn">Submit</button></div></div> */
    // </div>
    // </div>
    // ) */

    return (
        <Grid container >
            <Grid items xs={12} md={8} sx={{ mt: 5, ml: 5 }}>
                <Container>
                    <Typography variant='h3' sx={{ fontStyle: 'normal' }}>Exchange</Typography>
                    <Container sx={{ border: "1px solid #737373", borderRadius: '7px', boxSizing: 'border-box', mt: 2.5 }}>
                        <Box sx={{ mt: 4, mb: 3 }}>
                            <Stack direction='row' spacing={2}>
                                <Stack spacing={0.5}>
                                    <Typography variant='caption' sx={{ color: '#f5f5f5' }}>Swap</Typography>
                                    <FormControl variant="outlined" style={{ width: '120px' }}>
                                        <Select
                                            style={{ height: '56px', color: 'white' }}
                                            displayEmpty
                                            value={TokenFrom}
                                            onChange={(e) => { setTokenFrom(e.target.value) }}
                                            sx={{ background: (theme) => (theme.palette.gradients.custom) }}
                                        >
                                            <MenuItem value="" sx={{ background: (theme) => (theme.palette.gradients.custom) }}>
                                                <Typography >Select</Typography>
                                                {/*  <div className="logo-container">
                                                    <img src={AllTokens[0].logoURI} className="logo-uri" />
                                                </div>
                                                {AllTokens[0].symbol} */}
                                            </MenuItem>
                                            {AllTokens.map((object) =>
                                                <MenuItem value={object.symbol} sx={{
                                                    backgroundColor: '#141a1e', '&:hover': {
                                                        background: (theme) => (theme.palette.gradients.custom)
                                                    }
                                                }}>
                                                    <div className="logo-container">
                                                        <img src={object.logoURI} className="logo-uri" />
                                                    </div>
                                                    {object.symbol}
                                                </MenuItem>)}
                                        </Select>
                                    </FormControl>

                                </Stack>
                                <Stack spacing={0.5}>
                                    <Typography variant='caption' sx={{ color: '#0E1214' }}>0</Typography>
                                    <TextField variant='outlined'
                                        id="outlined-basic"
                                        placeholder="00.00"
                                        value={TokenFromAmount}
                                        onChange={(e) => {
                                            setTokenFromAmount(e.target.value);
                                            calculateToAmount(e.target.value);
                                        }}>
                                    </TextField>
                                </Stack>

                                <Stack spacing={0.5}>
                                    <Typography variant='caption' sx={{ color: '#f5f5f5' }}>For</Typography>
                                    <FormControl variant="outlined" style={{ width: '130px' }}>
                                        <Select
                                            style={{ height: '56px', color: 'white' }}
                                            displayEmpty
                                            value={TokenTo.symbol}
                                            
                                            onChange={(e) => { 
                                                console.log("value of tokento set::",e.target.value)
                                                setTokenTo(e.target.value) }}
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            sx={{ background: (theme) => (theme.palette.gradients.custom) }}
                                        >
                                            <MenuItem value="" sx={{ background: (theme) => (theme.palette.gradients.custom) }}>
                                                <Typography>Select</Typography>
                                                {/*  <div className="logo-container">
                                                    <img src={AllTokens[4].logoURI} className="logo-uri" />
                                                </div>
                                                {AllTokens[4].symbol} */}
                                            </MenuItem>
                                            {AllTokens.map((object) =>
                                                <MenuItem value={object} sx={{
                                                    backgroundColor: '#141a1e', '&:hover': {
                                                        background: (theme) => (theme.palette.gradients.custom)
                                                    }
                                                }} >
                                                    <div className="logo-container">
                                                        <img src={object.logoURI} className="logo-uri" />
                                                    </div>
                                                    {object.symbol}
                                                </MenuItem>)}
                                        </Select>
                                    </FormControl>

                                </Stack>
                                <Stack spacing={0.5}>
                                    <Typography variant='caption' sx={{ color: '#0E1214' }}>0</Typography>
                                    <TextField variant='outlined'
                                        id="outlined-basic"
                                        placeholder="00.00"
                                        value={TokenToAmount}
                                        onChange={(e) => { setTokenToAmount(e.target.value) }}
                                        disabled>
                                    </TextField>
                                </Stack>

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
                                <Typography variant='body2' sx={{ color: '#f5f5f5' }}>Offered By</Typography>
                                <Divider sx={{ flexGrow: 1, border: "0.5px dashed rgba(255, 255, 255, 0.3)", height: '0px' }} style={{ marginTop: '10px' }} />
                                <Button onClick={handleOpen}>Ox Exchange</Button>
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
                                        {protocolsRateList.map((object)=> (
                                            <Box sx={{ border: '1px solid #737373', borderRadius: '7px', mt: 1, p: 1 }}>
                                            <Stack direction='row' spacing={2}>
                                                <Typography variant='body1' sx={{ color: '#e3e3e3' }}>${object.receivedValueInDollar}</Typography>
                                                <Typography variant='body1' sx={{ color: '#e3e3e3' }}>${object.gas}</Typography>
                                                <Box sx={{ flexGrow: 1 }}></Box>
                                                {/* <Avatar alt="" src={exchangeIcon}></Avatar> */}
                                                <Tooltip title={object.name}>
                                                    {/* <svg width="41" height="20" viewBox="0 0 11 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="sc-LzLrR cfKEdR">
                                                        <path
                                                            d="M8.402 25.28l3.105-3.212-3.86-5.209-4.915-6.954A19.904 19.904 0 0 0 0 20c0 6.1 2.732 11.562 
                                                            7.04 15.23l6.239-4.408a12.796 12.796 0 0 1-4.877-5.541zM14.72 8.402l3.212 3.105 5.209-3.86 6.954-4.915A19.904 
                                                            19.904 0 0 0 20 0C13.9 0 8.438 2.732 4.77 7.04l4.408 6.239a12.795 12.795 0 0 1 5.541-4.877zm13.773 9.53l3.86 5.209
                                                            4.915 6.954A19.904 19.904 0 0 0 40 20c0-6.1-2.732-11.562-7.04-15.23l-6.24 4.408a12.796 12.796 0 0 1 4.877 5.541l-3.105 
                                                            3.213zM35.23 32.96l-4.408-6.239a12.795 12.795 0 0 1-5.541 4.877l-3.213-3.105-5.209 3.86-6.954 4.915A19.904 19.904 0 0 0 
                                                            20 40c6.1 0 11.562-2.732 15.23-7.04z" fill="#e3e3e3">
                                                        </path>
                                                    </svg> */}
                                                     {/* <img alt="" width="21" height="20" src="https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png?1600306604" ></img> */}
                                                     {object.name==='Balancer'?<img alt="" width="21" height="20" src={Balancer} ></img> : <img alt="" width="21" height="20" src={object.image}></img> }
                                                </Tooltip>
                                            </Stack>
                                        </Box>
                                        ))}
                                        
                                        {/* <Box sx={{ border: '1px solid #737373', borderRadius: '7px', mt: 1, p: 1 }}>
                                            <Stack direction='row' spacing={2}>
                                                <Typography variant='body1'>$3,214</Typography>
                                                <Typography variant='body1'>$20.86</Typography>
                                                <Box sx={{ flexGrow: 1 }}></Box>
                                                <Tooltip title='uniswap'>
                                                    <img alt="" width="21" height="20" src="https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png?1600306604" ></img>
                                                </Tooltip>
                                            </Stack>

                                        </Box> */}
                                        <Box sx={{ marginLeft: '30%' }}>
                                            <Button variant='outlined' sx={{ mt: 2 }} >Save for This Trade</Button>
                                        </Box>

                                    </Box>
                                </Modal>
                            </Stack>

                            <Stack direction='row' spacing={1} sx={{ mt: 1.5 }}>
                                <Typography variant='body2' sx={{ color: '#f5f5f5' }}>Min. output</Typography>
                                <Divider sx={{ flexGrow: 1, border: "0.5px dashed rgba(255, 255, 255, 0.3)", height: '0px' }} style={{ marginTop: '10px' }} />
                                <Typography variant='body2'>{(parseFloat(TokenFromAmount) * parseFloat(minPrice)).toFixed(3)} {TokenTo.symbol}</Typography>
                            </Stack>

                            <Stack direction='row' spacing={1} sx={{ mt: 1.5 }}>
                                <Typography variant='body2' sx={{ color: '#f5f5f5' }}>Rate</Typography>
                                <Divider sx={{ flexGrow: 1, border: "0.5px dashed rgba(255, 255, 255, 0.3)", height: '0px' }} style={{ marginTop: '10px' }} />
                                <Typography variant='body2'> 1 {TokenFrom} = {parseFloat(Price).toFixed(3)} {TokenTo.symbol}</Typography>
                            </Stack>

                        </Box>
                    </Container>
                    <TransparentButton value='Submit'
                        onClick={transact}
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
                </Container>
            </Grid>
        </Grid >
    );

}
