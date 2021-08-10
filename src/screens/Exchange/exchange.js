import React, {useState, useEffect} from 'react';
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


export default function Exchange()  {

    const [TokenFrom, setTokenFrom] = useState('');
    const [TokenTo, setTokenTo] = useState('');
    const [TokenFromAmount, setTokenFromAmount] = useState();
    const [TokenToAmount, setTokenToAmount] = useState();
    const [Slippage, setSlippage] = useState(5);
    const [Price, setPrice] = useState(0);
    const [minPrice, setMinPrice] = useState(0);
    const [AllTokens, setAllTokens] = useState([]);
    const [Sources, setSources] = useState([]);
    

    useEffect(() => {
        async function getData(){
            let fetchedTokens;
            await axios.get(`https://api.0x.org/swap/v1/tokens`,{},{})
                .then(async(response)=>{
                    setAllTokens(response.data.records)
                    fetchedTokens = response.data.records;
                    console.log(response.data.records)
                })
            await axios.get(`https://tokens.coingecko.com/uniswap/all.json`,{},{})
                .then(async(response)=>{
                    let data = response.data.tokens;
                    let tokens = fetchedTokens.map((token) => ({...token, logoURI: data.find(x => x.address == token.address) ? data.find(x => x.address == token.address).logoURI : tokenURIs.find(x => x.address == token.address).logoURI}));
                    console.log(tokens.filter((token) => token.logoURI === ""));
                    setAllTokens(tokens)
                })
        }
        getData()
    }, [])

    useEffect(() => {
        async function getData(){
            if(TokenFromAmount!=='' && TokenFrom!=='' && TokenTo!==''){
                // alert(TokenFromAmount)
                let amount = parseFloat(TokenFromAmount)*Math.pow(10, 18).toString()
                await axios.get(`https://ropsten.api.0x.org/swap/v1/quote?buyToken=${TokenTo}&sellToken=${TokenFrom}&sellAmount=${amount}&feeRecipient=0xE609192618aD9aC825B981fFECf3Dfd5E92E3cFB&buyTokenPercentageFee=0.02`,{},{})
                .then(async(response)=>{
                    console.log(response)
                    setPrice(response.data.price)
                    setMinPrice(response.data.guaranteedPrice)
                    setTokenToAmount(parseFloat(response.data.buyAmount)*Math.pow(10, -18).toString())
                    var sources = response.data.sources 
                    sources.sort((a, b) => parseFloat(b.proportion) - parseFloat(a.proportion));
                    var sources2 = []
                    for (var i= 0; i<sources.length; i++){
                        if(sources[i].proportion>0){
                            sources2.push(sources[i])
                        }
                    }
                    setSources(sources2)
                })
            }
        }
        getData()
    }, [TokenFromAmount, TokenFrom, TokenTo])

    async function loadWeb3(){
    
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
    async function transact(){
        await loadWeb3()
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts()
        if(TokenFromAmount!=='' && TokenFrom!=='' && TokenTo!==''){
            // alert(TokenFromAmount)s
            let amount = parseFloat(TokenFromAmount)*Math.pow(10, 18).toString()
            await axios.get(`https://ropsten.api.0x.org/swap/v1/quote?buyToken=${TokenTo}&sellToken=${TokenFrom}&sellAmount=${amount}&feeRecipient=0xE609192618aD9aC825B981fFECf3Dfd5E92E3cFB&buyTokenPercentageFee=0.02&slippagePercentage=${Slippage/100}`,{},{})
            .then(async(response)=>{
                console.log(response)
                console.log(Slippage)
                response.data.gas = parseInt(response.data.gas) + 100000;
                response.data.from = accounts[0]
                if(TokenFrom!=='ETH'){
                    const ERC20contract = new web3.eth.Contract(ERC20ABI, response.data.sellTokenAddress);
                    await ERC20contract.methods.approve(response.data.allowanceTarget, response.data.sellAmount).send({from: accounts[0]});    
                }
                await web3.eth.sendTransaction(await response.data);
            })
        }
    }
    
    return (
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
                    {/* <div className="end"><div className="submit"> <button onClick={transact} className="submit-btn">Submit</button></div></div> */}
                </div>
            </div>
    )

}
