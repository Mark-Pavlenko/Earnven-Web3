import React, { Component } from "react";
import Web3 from "web3";
import axios from "axios";
import { BrowserView, MobileView } from "react-device-detect";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { experimentalStyled as styled } from '@material-ui/core/styles';

const CustomStyle = styled('div')(({ theme }) => ({
    height: "50px",
    background: "transparent",
    cursor: "pointer",
    lineHeight: '1',
    marginBottom:'5px',
    '&:hover':{
        background: theme.palette.gradients.custom
    }
}));


var contents = "";
var stage1Tokens = []
var arr2 = [];
var arr1 = [];
export default class index extends Component {

    async componentWillMount() {
        // console.log(this.props)
        if (this.state.account !== this.props.address) {
            arr2 = [];
            arr1 = [];
            this.setState({account : this.props.address, hideShowMore:false, page:1})
            await this.loadBlockchainData();
        }
    }

    async componentWillReceiveProps(props) {
        // console.log(props)
        if (this.state.account !== props.address) {
            arr2 = [];
            arr1 = [];
            await this.setState({account : props.address, hideShowMore:false, page:1})
            await this.loadBlockchainData();
        } 
    }

    async loadBlockchainData() {
        // const web3 = window.web3;
        // const accounts = await web3.eth.getAccounts();
        const web3 = new Web3();
        var accounts = this.props.address;
        // const accounts = '0xbfbe5822a880a41c2075dc7e1d92663739cf119e'
        this.setState({ account: accounts });
        arr2 = []
        /* await axios
          .get(
            `https://api.ethplorer.io/getAddressInfo/0x32Be343B94f860124dC4fEe278FDCBD38C102D88?apiKey=EK-qSPda-W9rX7yJ-UY93y`,
            {},
            {}
          ) */
        await axios.get(`https://api.ethplorer.io/getAddressInfo/${accounts}?apiKey=EK-qSPda-W9rX7yJ-UY93y`, {}, {})
            .then(async (response) => {
                // console.log(response)
                arr1 = [];
                var tokens = response.data.tokens;
                if (response.data.ETH.balance === 0 && tokens === undefined) {
                    this.setState({ contents: '' })
                    this.setState({ hideShowMore: true })
                } else {
                    let ethObject = {};
                    let ethTokenInfo = {};
                    let ethPrice = {};
                    ethTokenInfo.coingecko = "ethereum";
                    ethTokenInfo.address = "";
                    ethTokenInfo.name = "Ethereum";
                    ethTokenInfo.decimals = 18;
                    ethPrice.diff = response.data.ETH.price.diff;
                    ethTokenInfo.symbol = "ETH";
                    ethTokenInfo.image = "/images/eth.png";
                    ethPrice.rate = response.data.ETH.price.rate;
                    ethTokenInfo.price = ethPrice;
                    ethObject.tokenInfo = ethTokenInfo;
                    ethObject.rawBalance = response.data.ETH.rawBalance;
                    ethObject.totalInvestment =
                        response.data.ETH.price.rate *
                        web3.utils.fromWei(response.data.ETH.rawBalance, "ether");
                    arr1.push(ethObject);
                    var total =
                        response.data.ETH.price.rate *
                        web3.utils.fromWei(response.data.ETH.rawBalance, "ether");
                    if (tokens !== undefined) {
                        for (var i = 0; i < tokens.length; i++) {
                            if (tokens[i].tokenInfo.price !== false) {
                                total =
                                    total +
                                    tokens[i].tokenInfo.price.rate *
                                    web3.utils.fromWei(tokens[i].rawBalance, "ether");
                            }
                        }
                    }

                    this.setState({ totalValue: total.toFixed(2) });

                    if (tokens !== undefined) {
                        for (i = 0; i < tokens.length; i++) {
                            if (tokens[i].tokenInfo.price !== false) {
                                tokens[i].totalInvestment = tokens[i].rawBalance/(10**tokens[i].tokenInfo.decimals)*tokens[i].tokenInfo.price.rate;
                                arr1.push(tokens[i]);
                                stage1Tokens.push(tokens[i].tokenInfo.address)
                            }
                        }
                    }
                    // console.log(arr1)
                    arr1.sort((a, b) => parseFloat(b.totalInvestment) - parseFloat(a.totalInvestment));

                    // console.log("value of arr1::", arr1)
                    this.update();
                    this.addRemainingTokens()
                }
            });
    }

    addRemainingTokens = async() => {
        const accounts = this.props.address
        await axios.get(`https://api.etherscan.io/api?module=account&action=tokentx&address=${accounts}&startblock=0&endblock=999999999&sort=asc&apikey=CISZAVU4237H8CFPFCFWEA25HHBI3QKB8W`,{},{})
        .then(async(response)=>{
            // console.log(response)
            if(response.data.result){
                var erc20data = {}
                var tx = response.data.result
                // console.log(stage1Tokens)
                for (var i = 0; i<tx.length; i++){
                    
                    if(!erc20data[tx[i].contractAddress]){
                        var index
                        index = stage1Tokens.indexOf(tx[i].contractAddress)
                        if(index===-1){
                            erc20data[tx[i].contractAddress] = {}
                            erc20data[tx[i].contractAddress].id = tx[i].contractAddress
                            erc20data[tx[i].contractAddress].balance = tx[i].value / (10**tx[i].tokenDecimal)
                            erc20data[tx[i].contractAddress].decimals = tx[i].tokenDecimal;
                        }
                        
                    }
                    else{
                        if(tx[i].to.toLowerCase()===accounts.toLowerCase()){
                            erc20data[tx[i].contractAddress].balance += tx[i].value / (10**tx[i].tokenDecimal)
                        }
                        else if(tx[i].from.toLowerCase()===accounts.toLowerCase()){
                            erc20data[tx[i].contractAddress].balance -= tx[i].value / (10**tx[i].tokenDecimal)
                        }

                        // if(tx[i].contractAddress==='0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'){
                        //     console.log(erc20data[tx[i].contractAddress].balance)
                        // }
                    }
                }   
                
                
                var buffer = Object.values(erc20data)
                // console.log(buffer) 
                for (var i = 0; i<buffer.length; i++){
                    if(buffer[i].balance >= 1/(10**6)){
                        await axios.get(`https://api.coingecko.com/api/v3/coins/ethereum/contract/${buffer[i].id}`,{},{})
                        .then(async(response2)=>{
                            
                            // console.log(response2.data);

                            if(response2.data && response2.data.symbol!=='WETH' && response2.data.symbol!=='weth'){

                                var object = {}

                                object.tokenInfo ={}
                                object.tokenInfo.price = {}
                                object.tokenInfo.coingecko = response2.data.id
                                object.tokenInfo.address = buffer[i].id
                                object.tokenInfo.name = response2.data.name
                                object.tokenInfo.decimals = buffer[i].decimals
                                if(response2.data.market_data){
                                    object.tokenInfo.price.diff = response2.data.market_data.price_change_percentage_24h;
                                    object.tokenInfo.price.rate = parseFloat(response2.data.market_data.current_price.usd).toFixed(2)
                                    object.totalInvestment = parseFloat(buffer[i].balance*response2.data.market_data.current_price.usd).toFixed(2)
                                    this.setState({total: this.state.total + parseFloat(object.totalInvestment)})
                                }
                                else{
                                    object.tokenInfo.price.diff = '-'
                                    object.tokenInfo.price.rate= '-'
                                    object.totalInvestment = 0
                                }
                                
                                object.tokenInfo.symbol = response2.data.symbol
                                object.tokenInfo.image =  response2.data.image.thumb
                                object.rawBalance = buffer[i].balance*(10**buffer[i].decimals)
                                // console.log(object)
                                arr1.push(object)

                                arr1.sort((a, b) => parseFloat(b.totalInvestment) - parseFloat(a.totalInvestment));
                                this.update();
                                // console.log(arr1)
                            }
                        })
                        .catch(async(err)=>{

                            await axios.get(`https://api.ethplorer.io/getTokenInfo/${buffer[i].id}?apiKey=EK-qSPda-W9rX7yJ-UY93y`,{},{})
                        .then(async(response2)=>{
                            // console.log('response  :', buffer[i])
                            if(response2.data && response2.data.symbol!=='WETH'){
                                // console.log(response2.data)

                                var object = {}
                                object.tokenInfo ={}
                                object.tokenInfo.price = {}
                                object.tokenInfo.coingecko = response2.data.address
                                object.tokenInfo.address = buffer[i].id
                                object.tokenInfo.name = response2.data.name
                                object.tokenInfo.decimals = response2.data.decimals
                                if(response2.data.price){
                                    object.tokenInfo.price.diff = response2.data.price.diff
                                    object.tokenInfo.price.rate = parseFloat(response2.data.price.rate).toFixed(2)
                                    object.totalInvestment = parseFloat(buffer[i].balance*response2.data.price.rate).toFixed(2)
                                    this.setState({total: this.state.total + parseFloat(object.totalInvestment)})
                                }
                                else{
                                    object.tokenInfo.price.diff = '-'
                                    object.tokenInfo.price.rate= '-'
                                    object.totalInvestment = 0
                                }
                                
                                object.tokenInfo.symbol = response2.data.symbol
                                object.tokenInfo.image =  response2.data.image
                                object.rawBalance = buffer[i].balance*(10**response2.data.decimals)
                                // object.rawBalance = '10000000'
                                // console.log(object)
                                arr1.push(object)
                                arr1.sort((a, b) => parseFloat(b.totalInvestment) - parseFloat(a.totalInvestment));
                                this.update();
                                // console.log(response.data)
                            }
                        })
                        .catch((err)=>{console.log(err)})

                        })
                    }

                }

                // this.update();
            }
        })
    }

    update = () => {
        const web3 = new Web3();
        // await arr1.sort((a, b) => parseFloat(b.totalInvestment) - parseFloat(a.totalInvestment));
        // console.log(this.state.page)
        // var start = (this.state.page - 1) * 10;
        var end;
        if (this.state.page === 1) {
            arr2 = []
            end = 5
        }
        else {
            end = this.state.page * 10;
        }
        // if (this.state.page === 2) {
        //     start = 6
        // }
        if (end > arr1.length) {
            end = arr1.length;
            this.setState({ hideShowMore: true })
        }
        else{
            this.setState({ hideShowMore: false })
        }
        arr2 = []
        for (var i = 0; i < end; i++) {
            if (arr1[i]) {
                var object = {};
                object.coingecko = arr1[i].tokenInfo.coingecko;
                object.address = arr1[i].tokenInfo.address;
                object.name = arr1[i].tokenInfo.name;
                object.profit = arr1[i].tokenInfo.price.diff;
                object.symbol = arr1[i].tokenInfo.symbol;
                object.image = arr1[i].tokenInfo.image;
                object.decimals = arr1[i].tokenInfo.decimals;
                // console.log(arr1[i].rawBalance)
                object.balance = parseFloat(arr1[i].rawBalance / (10**arr1[i].tokenInfo.decimals)).toFixed(2)
                if(arr1[i].tokenInfo.price.rate!=='-'){
                    object.rate = parseFloat(arr1[i].tokenInfo.price.rate).toFixed(2);
                    object.totalInvestment = parseFloat(object.balance*arr1[i].tokenInfo.price.rate).toFixed(2);
                }
                else{
                    object.rate = '-'
                    object.totalInvestment = '-'
                }
                
                // if(arr1.indexOf(object)===-1){
                //     arr1.push(object);
                //     console.log(arr2)
                //     console.log(object)
                // }
                arr2.push(object);
            }
        }
        // console.log(arr2)

        this.change(arr2);
        this.setState({ contents });
    };

    change = (arr) => {
        contents = arr.map((object) => (
            <div>
                <BrowserView>
                    <Link to={`/${this.state.account}/token/${object.coingecko}`}>
                        <CustomStyle>
                            <div style={{ width: "7%", height: "50px", float: "left", paddingLeft: '13px' }}>
                                <img
                                    style={{
                                        display: 'inline',
                                        maxWidth: '20px',
                                        verticalAlign: 'top',
                                        // marginLeft: "10px",
                                        height: "20px",
                                        // width: "30px",
                                        // marginTop: "15px",
                                        margin: '16px'
                                    }}
                                    alt=""
                                    src={object.image? object.image[0]==='/'? `https://ethplorer.io${object.image}`:`${object.image}` : ''}
                                />
                            </div>

                            <div style={{ width: "23%", height: "50px", float: "left" }}>
                                <font color="white" style={{ fontSize: "17px" }}>
                                    {" "}
                                    <br />
                                    {object.name}
                                </font>
                            </div>

                            <div style={{ width: "15%", height: "50px", float: "left" }}>
                                <font color="white" style={{ fontSize: "15px" }}>
                                    {" "}
                                    <br />
                                    {(
                                        (object.totalInvestment / this.state.totalValue) *
                                        100
                                    ).toFixed(2)}{" "}
                                    %
                                </font>
                            </div>

                            <div style={{ width: "30%", height: "50px", float: "left" }}>
                                <font color="white" style={{ fontSize: "14px" }}>
                                    {" "}
                                    <br /> {object.balance} {object.symbol} - ${object.rate}{" "}
                                </font>
                            </div>

                            <div style={{ width: "25%", height: "50px", float: "left" }}>
                                <font color="white" style={{ fontSize: "15px" }}>
                                    <br /> ${object.totalInvestment}{" "}
                                </font>
                                <font color={parseFloat(object.profit)>0? '#03DAC6':'#ff1f1f'} style={{ fontSize: "10px" }}>
                                    {" "} 
                                    <br />
                                     {object.profit} %
                                </font>
                            </div>

                        </CustomStyle>
                        {/* <center>
                            <Stack direction='row' spacing={10}>
                                <Avatar alt='token-img' src={`https://ethplorer.io${object.image}`}></Avatar>
                                <Typography variant="body1">Uniswap</Typography>
                                <Typography variant="body1">10.18%</Typography>
                                <Typography variant="body1">1000UNI-$12.45</Typography>
                                <Stack direction='column'>
                                    <Typography variant="body1">$1234</Typography>
                                    <Typography variant="body1">+7.6</Typography>
                                </Stack>
                            </Stack>
                        </center> */}
                    </Link>
                </BrowserView>
                <MobileView>
                    <Link to={`/app/token/${object.coingecko}`}>
                        <div
                            style={{
                                // height:'75px',
                                // width:'678px',
                                background: "transparent",
                                cursor: "pointer",
                            }}
                        >
                            <div style={{ height: "50px" }}>
                                <img
                                    style={{
                                        marginLeft: "10px",
                                        height: "30px",
                                        width: "30px",
                                        marginTop: "15px",
                                        display: "inline-block",
                                    }}
                                    alt=""
                                    src={`https://ethplorer.io${object.image}`}
                                />
                                &nbsp;&nbsp;<font color="white">{object.name}</font>
                            </div>

                            <div style={{ height: "50px" }}>
                                <font color="white">
                                    {" "}
                                    <br />
                                    {object.profit} %
                                </font>
                            </div>

                            <div style={{ height: "50px" }}>
                                <font color="white">
                                    {" "}
                                    <br /> {object.balance} {object.symbol} | ${object.rate}{" "}
                                </font>
                            </div>

                            <div style={{ height: "50px" }}>
                                <font color="white">
                                    <br /> ${object.totalInvestment}{" "}
                                </font>
                            </div>

                            <br />

                            {/* <hr></hr> */}
                        </div>
                    </Link>
                </MobileView>
            </div>
        ));
        // console.log(contents)
    };

    constructor(props) {
        super(props);
        this.state = {
            account: "",
            contents: "",
            page: 1,
            totalValue: "00.00",
            hideShowMore: false,
        };
    }

    lol = (e) => {
        console.log("haha");
    };

    mouseOver = (e) => {
        e.target.style.background = "#BB86FC";
    };

    mouseOut = (e) => {
        e.target.style.background = "transparent";
    };

    render() {

        this.change(arr2);
        return (
            <div>
                <div
                    style={{
                        // width:'800px',
                        // height:'720px',
                        background: "transparent",
                        border: '1px solid #737373',
                        borderRadius: '10px'
                    }}
                >
                    <Typography align='justify' variant='subtitle1' style={{ marginTop: '15px', marginLeft: '27px' }}>All Assets</Typography>

                    <center style={{ marginTop: '5px' }}>
                        {/* <div
            style={{
              marginTop: "30px",
              marginRight: "80%",
              fontSize: "16px",
              marginBottom: "10px",
            }}
          >
            <font color="white"> All Assets </font>
          </div> */}

                        {/* <br /><font color='white'>
                        <button
                            onClick={async (e) => { if (this.state.page !== 1) { await this.setState({ page: this.state.page - 1 }); this.update() } }}
                        > &lt; </button> &nbsp;&nbsp;&nbsp;

                        {this.state.page} &nbsp;&nbsp;&nbsp;

                        <button
                            onClick={async (e) => { await this.setState({ page: this.state.page + 1 }); this.update() }}
                        > &gt; </button>

                    </font><br /><br /> */}

                        {/* <hr /> */}

                        {this.state.contents}
                    </center>
                </div> <br/>
                {!this.state.hideShowMore && <div style={{ float: 'right', marginRight: '5px' }}>
                    <Typography variant='caption'
                        align='right'
                        style={{ cursor: 'pointer' }}
                        onClick={async (e) => {
                            await this.setState({ page: this.state.page + 1 });
                            this.update();
                        }}
                    >
                    <button style={{
                        height:'25px',
                        width:'100px',
                        background:'transparent',
                        border:'1px solid #ac6afc',
                        cursor:'pointer',
                        color:'white',
                        borderRadius:'10px'
                    }}>Show More</button>
                    </Typography>
                </div>}

            </div>
        );
    }
}
