import React, { Component } from "react";
import Web3 from "web3";
import axios from "axios";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReceiveIcon from "../../assets/icons/receive.png";
import SendIcon from "../../assets/icons/send.png";
import TradeIcon from "../../assets/icons/trade.svg"
import UserIcon from "../../assets/icons/userIcon.png";
import { MobileView, BrowserView } from "react-device-detect";
import { Typography, Stack, IconButton } from "@material-ui/core";
import { AvatarGenerator } from 'random-avatar-generator';
import ustIcon from "../../assets/icons/ust.png";
import { FaAngleRight, FaExclamationCircle } from "react-icons/fa";
import Avatar from 'react-avatar';
import { styled } from '@material-ui/core/styles';
import Tooltip, { tooltipClasses } from '@material-ui/core/Tooltip';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdContentCopy } from "react-icons/md";

// import AvatarGenerator from 'react-avatar-generator';

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

var contents = "";
var ops = [];
var ops2 = [];
var arr1 = [];
var allHash = [];
var distinctHash = [];

export default class index extends Component {
  async componentWillMount() {
    // await this.loadWeb3();
    this.setState({ contents: "" })
    await this.loadBlockchainData();
  }

  shortaddress(addy) {
    if (addy === "") {
      return addy;
    }
    var l = addy.length;
    var addynew =
      addy[0] +
      addy[1] +
      addy[2] +
      addy[3] +
      addy[4] +
      addy[5] +
      "..." +
      addy[l - 4] +
      addy[l - 3] +
      addy[l - 2] +
      addy[l - 1];
    return addynew;
  }

  etherscanLink(link) {
    link = "https://etherscan.io/address/" + link;
    return link;
  }

  etherscanTxLink(link) {
    link = "https://etherscan.io/tx/" + link;
    return link;
  }

  convertTimestamp(epoch) {
    var myDate = new Date(epoch * 1000);
    // return myDate.toLocaleString();
    return myDate.toLocaleDateString();
  }

  convertTimestampToTime(epoch) {
    var myDate = new Date(epoch * 1000)
    return myDate.toLocaleTimeString();
  }

  tradincomponent = (data) => {
    return (
      <Accordion
        style={{
          background: "transparent",
          // marginBottom: "5px",
          width: "90%",
          borderTop: "1px",
          borderBottom: "0px",
          borderLeft: "0px",
          borderRight: "0px",
          borderColor: "#737373",
          borderStyle: "solid",
          borderRadius: "0px",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ fill: "white" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div style={{ width: "10%", float: "left" }}>
            <img
              style={{ paddingTop: '10px' }}
              src={TradeIcon}
              alt=""
            />
          </div>

          <div style={{ width: "20%", float: "left", textAlign: "left" }}>
            <font color="white">Trade</font>
            <br />
            <font style={{ fontSize: "10px", color: "white" }}>
              {this.convertTimestampToTime(data.timestamp)}
            </font>
          </div>

          <div style={{ width: "18%", float: "left", textAlign: "left" }}>
            <Stack direction='row'>
              {data.firstToken.image !== null ? <img
                style={{
                  display: 'inline',
                  maxWidth: '25px',
                  verticalAlign: 'top',
                  // marginLeft: "10px",
                  height: "25px",
                  // width: "30px",
                  // marginTop: "15px",
                  margin: '16px',
                  // border: '1px solid',
                  // borderRadius: '50%'
                }}
                alt=""
                src={`https://ethplorer.io${data.firstToken.image}`}
              /> :
                <Avatar style={{
                  display: 'inline',
                  maxWidth: '25px',
                  verticalAlign: 'top',
                  // marginLeft: "10px",
                  height: "25px",
                  // width: "30px",
                  // marginTop: "15px",
                  margin: '16px',
                  // border: '1px solid',
                  // borderRadius: '50%'
                }} color={"#737373"} name={data.firstToken.symbol} round={true} size="30" textSizeRatio={1.75} />
              }

              {/* <div
                  style={{
                    width: "30%",
                    float: "left",
                    textAlign: "left",
                    marginTop: "8px",
                  }}
                > */}
              <Stack direction='column'>
                <Typography variant='body2' sx={{ paddingTop: '4px' }}>
                  {/* {object.value} {object.symbol} */}
                  {`-${data.firstToken.value} ${data.firstToken.symbol}`}
                </Typography>
                {data.firstToken.dollarValue === null ?
                  <Typography variant='caption' sx={{ color: '#737373' }}>N/A
                    {/* <Tooltip title='The Price is not avialable at time of transaction'><FaExclamationCircle /></Tooltip> */}</Typography> :
                  <Typography variant='caption' sx={{ color: '#737373' }}>
                    {`$${data.firstToken.dollarValue} `}
                  </Typography>}

              </Stack>
              {/* </div> */}
            </Stack>
          </div>

          <FaAngleRight style={{ marginTop: '18px' }}></FaAngleRight>

          <div style={{ width: "41%", float: "left", textAlign: "left", marginLeft: '15px' }}>
            <Stack direction='row'>
              {data.secondToken.image !== null ? <img
                style={{
                  display: 'inline',
                  maxWidth: '25px',
                  verticalAlign: 'top',
                  // marginLeft: "10px",
                  height: "25px",
                  // width: "30px",
                  // marginTop: "15px",
                  margin: '16px',
                  // border: '1px solid',
                  // borderRadius: '50%'
                }}
                alt=""
                src={`https://ethplorer.io${data.secondToken.image}`}
              /> :
                <Avatar style={{
                  display: 'inline',
                  maxWidth: '25px',
                  verticalAlign: 'top',
                  // marginLeft: "10px",
                  height: "25px",
                  // width: "30px",
                  // marginTop: "15px",
                  margin: '16px',
                  // border: '1px solid',
                  // borderRadius: '50%'
                }} color={"#737373"} name={data.secondToken.symbol} round={true} size="30" textSizeRatio={1.75} />
              }

              {/* <div
                  style={{
                    width: "30%",
                    float: "left",
                    textAlign: "left",
                    marginTop: "8px",
                  }}
                > */}
              <Stack direction='column'>
                <Typography variant='body2' sx={{ paddingTop: '4px' }}>
                  {/* {object.value} {object.symbol} */}
                  {`+${data.secondToken.value} ${data.secondToken.symbol}`}
                </Typography>
                {data.secondToken.dollarValue === null ?
                  <Typography variant='caption' sx={{ color: '#737373', ml: 1 }}>N/A
                  </Typography> :
                  <Typography variant='caption' sx={{ color: '#737373' }}>
                    {`$${data.secondToken.dollarValue} `}
                  </Typography>}
              </Stack>
              {/* </div> */}
            </Stack>
          </div>


        </AccordionSummary>
        <AccordionDetails
          style={{
            backgroundColor: "transparent", textAlign: "left", borderTop: "1px",
            borderBottom: "0px",
            borderLeft: "0px",
            borderRight: "0px",
            borderColor: "#737373",
            borderStyle: "solid",
            borderRadius: "0px",
            marginLeft: '10px',
            marginRight: '10px'
          }}
        >
          <Stack direction='row' spacing={20}>
            <Stack direction="column">
              <Typography variant="body2">Fee</Typography>
              <Typography variant='caption'>{data.txGas}ETH</Typography>
            </Stack>

            <Stack direction='column'>
              <Typography variant="body2">Hash</Typography>
              <Stack direction='row'>
                <Typography href={this.etherscanTxLink(data.hash)}
                  variant='caption'>{this.shortaddress(data.hash)}
                </Typography>
                <IconButton edge="end" aria-label="copy" style={{ padding: '0px' }}>
                  <CopyToClipboard text={data.hash} >
                    <MdContentCopy style={{ color: '#929292', padding: '0px', height: '13px' }} />
                  </CopyToClipboard>
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>
    );
  }

  normalTokenTransferComponent = (data) => {
    const generator = new AvatarGenerator();
    return (
      <Accordion
        style={{
          background: "transparent",
          marginBottom: "5px",
          width: "90%",
          borderTop: "1px",
          borderBottom: "0px",
          borderLeft: "0px",
          borderRight: "0px",
          borderColor: "#737373",
          borderStyle: "solid",
          borderRadius: "0px",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ fill: "white" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div style={{ width: "10%", float: "left" }}>
            <img
              style={{ paddingTop: '10px' }}
              src={data.status === "Receive" ? ReceiveIcon : SendIcon}
              alt=""
            />
          </div>

          <div style={{ width: "30%", float: "left", textAlign: "left" }}>
            <font color="white">{data.txType === 'Approval' ? data.txType : data.status}</font>
            <br />
            <font style={{ fontSize: "10px", color: "white" }}>
              {this.convertTimestampToTime(data.timestamp)}
            </font>
          </div>

          <div style={{ width: "41%", float: "left", textAlign: "left" }}>
            <Stack direction='row'>
              {data.image !== null ? <img
                style={{
                  display: 'inline',
                  maxWidth: '25px',
                  verticalAlign: 'top',
                  // marginLeft: "10px",
                  height: "25px",
                  // width: "30px",
                  // marginTop: "15px",
                  margin: '9px',
                  // border: '1px solid',
                  // borderRadius: '50%'
                }}
                alt=""
                src={`https://ethplorer.io${data.image}`}
              /> :
                <Avatar style={{
                  display: 'inline',
                  maxWidth: '25px',
                  verticalAlign: 'top',
                  // marginLeft: "10px",
                  height: "25px",
                  // width: "30px",
                  // marginTop: "15px",
                  margin: '9px',
                  // border: '1px solid',
                  // borderRadius: '50%'
                }} color={"#737373"} name={data.symbol} round={true} size="30" textSizeRatio={1.75} />
              }

              <Stack direction='column'>
                {data.txType === "Approval" ? 
                <div>
                  <Typography variant='body2' sx={{ paddingTop: '4px' }}>{data.name}</Typography>
                  <Typography variant='caption' sx={{ color: '#737373' }}>{data.symbol}</Typography>
                </div> :
                  <div>
                    <Typography variant='body2' sx={{ paddingTop: '4px' }}>
                      {data.status === "Receive" ? `+${data.value} ${data.symbol}` : `-${data.value} ${data.symbol}`}
                    </Typography>
                    {data.dollarValue === null ?
                      <Typography variant='caption' sx={{ color: '#737373', ml: 1 }}>N/A
                      </Typography> :
                      <Typography variant='caption' sx={{ color: '#737373' }}>
                        {`$${data.dollarValue} `}
                      </Typography>}
                  </div>}

              </Stack>

              {/* </div> */}
            </Stack>
          </div>

          <div style={{ width: "15%", float: "left", textAlign: "left" }}>
            <Typography variant='body1' color="white">{data.status === "Receive" ? "From" : "To"}</Typography>
            <Stack direction='row' spacing={1}>
              <img
                width="17px"
                alt=""
                // style={{ marginTop: "5px" }}
                src={generator.generateRandomAvatar(data.from)}
              />
              <Typography variant='body2'>

                {data.status === "Receive" ? this.shortaddress(data.from) : this.shortaddress(data.to)}
              </Typography>
            </Stack>
          </div>
        </AccordionSummary>
        <AccordionDetails
          style={{
            backgroundColor: "transparent", textAlign: "left", borderTop: "1px",
            borderBottom: "0px",
            borderLeft: "0px",
            borderRight: "0px",
            borderColor: "#737373",
            borderStyle: "solid",
            borderRadius: "0px",
            marginLeft: '10px',
            marginRight: '10px'
          }}
        >
          <Stack direction='row' spacing={20}>
            <Stack direction="column">
              <Typography variant="body2">Fee</Typography>
              <Typography variant='caption'>{data.txGas}ETH</Typography>
            </Stack>

            <Stack direction='column'>
              <Typography variant="body2">Hash</Typography>
              <Stack direction='row'>
                <Typography href={this.etherscanTxLink(data.hash)}
                  variant='caption'>{this.shortaddress(data.hash)}
                </Typography>
                <IconButton edge="end" aria-label="copy" style={{ padding: '0px' }}>
                  <CopyToClipboard text={data.hash} >
                    <MdContentCopy style={{ color: '#929292', padding: '0px', height: '13px' }} />
                  </CopyToClipboard>
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>
    )
  }

  change = (arr) => {
    const generator = new AvatarGenerator();
    contents = arr.map((object, i, arr) => (
      <div>
        <BrowserView>
          {(i !== 0 && this.convertTimestamp(object.timestamp) === this.convertTimestamp(arr[i - 1].timestamp)) ? null : <Typography>{this.convertTimestamp(object.timestamp)}</Typography>}
          {object.txType === 'TRADING' ? this.tradincomponent(object) :
            this.normalTokenTransferComponent(object)}
        </BrowserView>
        <MobileView>
          <Accordion
            style={{
              background: "transparent",
              marginBottom: "5px",
              width: "90%",
              borderTop: "1px",
              borderBottom: "0px",
              borderLeft: "0px",
              borderRight: "0px",
              borderColor: "white",
              borderStyle: "solid",
              borderRadius: "10px",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{ fill: "white" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div style={{ width: "100%" }}>
                <div style={{ display: "inline-block", float: "left" }}>
                  <img
                    src={object.status === "Receive" ? ReceiveIcon : SendIcon}
                    alt=""
                  />
                </div>
                <div
                  style={{
                    textAlign: "left",
                    display: "inline-block",
                    float: "left",
                  }}
                >
                  <font color="white">&nbsp;&nbsp;&nbsp;{object.status}</font>
                  <br />
                  <font style={{ fontSize: "10px", color: "white" }}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;11:31 AM
                  </font>
                </div>
                <br />
                <br />
                <br />
                <div style={{ display: "inline-block", float: "left" }}>
                  <img
                    width="25px"
                    alt=""
                    style={{ marginTop: "5px" }}
                    src={UserIcon}
                  />
                </div>
                <div
                  style={{
                    textAlign: "left",
                    display: "inline-block",
                    float: "left",
                  }}
                >
                  <font color="white">&nbsp;&nbsp;&nbsp;From</font>
                  <br />
                  &nbsp;&nbsp;&nbsp;
                  <a
                    href={this.etherscanLink(object.from)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <font style={{ fontSize: "15px", color: "white" }}>
                      {this.shortaddress(object.from)}
                    </font>
                  </a>
                </div>{" "}
                <br />
                <br />
                <br />
                <div style={{ marginTop: "8px", textAlign: "left" }}>
                  <font style={{ fontSize: "20px", color: "white" }}>
                    {parseFloat(object.value).toFixed(2)} {object.symbol}
                  </font>
                </div>
                <div style={{ width: "15%", float: "left", textAlign: "left" }}>
                  <font color="white">TYPE&nbsp;&nbsp;&nbsp;</font>
                  <font style={{ fontSize: "13px", color: "white" }}>
                    {object.type}
                  </font>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails
              style={{ backgroundColor: "transparent", textAlign: "left" }}
            >
              <ul style={{ listStyleType: "none", color: "white" }}>
                <li>
                  Txn Hash &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;
                  <a
                    href={this.etherscanTxLink(object.hash)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <font style={{ fontSize: "15px", color: "white" }}>
                      {this.shortaddress(object.hash)}
                    </font>
                  </a>
                </li>
                <li>
                  Rate
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :
                  &nbsp;&nbsp; $ {parseFloat(object.rate).toFixed(4)}
                </li>
                <li>
                  24Hr Diff &nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;{object.diff}{" "}
                  %
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
        </MobileView>
      </div>
    ));
    // console.log(contents)
  };

  async loadBlockchainData() {
    // const web3 = window.

    const accounts = this.props.address;
    var tokenid = this.props.tokenid;
    var tokenAddress;
    console.log(tokenid)

    await axios.get(`https://api.coingecko.com/api/v3/coins/${tokenid}`, {}, {})
      .then(async (response) => {
        if(response.data){
          console.log(response.data)
          tokenAddress = response.data.contract_address
        }
      })
    
    console.log(tokenAddress)

    console.log("account address inside transaction component::", accounts);
    this.setState({ account: accounts });
    allHash = [];
    distinctHash = [];
    await axios
      .get(
        `https://api.ethplorer.io/getAddressHistory/${accounts}?apiKey=EK-qSPda-W9rX7yJ-UY93y&limit=1000`,
        {},
        {}
      )
      .then(async (response) => {
        var res = response.data.operations;
        console.log(res)
        ops = []
        for(let i = 0; i < res.length; i++){
          if(res[i].tokenInfo.address===tokenAddress){
            ops.push(res[i]);
          }
        }
      });

    await axios
      .get(
        `https://api.ethplorer.io/getAddressTransactions/${accounts}?apiKey=EK-qSPda-W9rX7yJ-UY93y&limit=1000`,
        {},
        {}
      )
      .then(async (response) => {
        ops2 = response.data;
        // console.log(ops2)
        for (var i = 0; i < ops2.length; i++) {
          ops2[i].type = 'ethTransfer'
          ops.push(ops2[i]);
        }
        ops.sort((a, b) => parseFloat(b.timestamp) - parseFloat(a.timestamp));
        for (let i = 0; i < ops.length; i++) {
          if (ops[i].transactionHash !== undefined) {
            allHash.push(ops[i].transactionHash)
          }
          else {
            allHash.push(ops[i].hash);
          }
        }
        distinctHash = [...new Set(allHash)];
        // console.log("final object response:::", distinctHash)
        this.update();
      });
  }

  getTransactionfromHash = async (hash) => {
    let result;
    try {
      result = await axios.get(`https://api.ethplorer.io/getTxInfo/${hash}?apiKey=EK-qSPda-W9rX7yJ-UY93y&limit=1000`);
    }
    catch (error) {
      result = null;
    }
    return result;
  }

  getTransactionGas = async (hash) => {
    const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/8b2159b7b0944586b64f0280c927d0a8"))
    const tx = await web3.eth.getTransaction(hash)
    const gasValueInWei = parseInt(tx.gasPrice) * tx.gas
    return web3.utils.fromWei(gasValueInWei.toString(), 'ether');
  }

  update = async () => {
    // try{

    const web3 = new Web3();
    arr1 = [];
    var start = (this.state.page - 1) * 10;
    var end = this.state.page * 10;
    let data;
    // var end2;
    if (end > distinctHash.length) {
      end = distinctHash.length;
    }
    for (var i = start; i < end; i++) {
      var object = {};
      // if(ops[i].transactionHash !== undefined){

      data = await this.getTransactionfromHash(distinctHash[i]);
      if (data !== null) {
        object.txGas = await this.getTransactionGas(distinctHash[i]);
        let dataObject = data.data;
        // console.log("data object value::", dataObject.from)
        object.from = web3.utils.toChecksumAddress(dataObject.from)
        object.to = web3.utils.toChecksumAddress(dataObject.to)
        object.timestamp = dataObject.timestamp;
        object.hash = dataObject.hash;
        if (dataObject.operations === undefined) {
          // console.log("eth transfer")
          // object.to = web3.utils.toChecksumAddress(dataObject.to);
          object.txType = "Eth"
          object.from === web3.utils.toChecksumAddress(this.state.account) ? object.status = 'Send' : object.status = 'Receive';
          object.name = 'Ethereum'
          object.symbol = "ETH"
          object.image = '/images/eth.png';
          object.value = (dataObject.value).toFixed(3);
          //TODO find eth rate at time of transaction
          object.dollarValue = null
        }
        else {
          const operationsLength = dataObject.operations.length;
          if (operationsLength === 1) {
            // console.log("token transfer")
            // object.to = web3.utils.toChecksumAddress(dataObject.to);
            if (dataObject.operations[0].type === "approve") {
              object.txType = "Approval"
            }
            else {
              object.txType = "Token"
            }

            object.from === web3.utils.toChecksumAddress(this.state.account) ? object.status = 'Send' : object.status = 'Receive';
            const tokenInfo = dataObject.operations[0].tokenInfo
            object.name = tokenInfo.name
            object.symbol = tokenInfo.symbol
            tokenInfo.image !== undefined ? object.image = tokenInfo.image : object.image = null;
            object.value = parseFloat(web3.utils.fromWei(dataObject.operations[0].value, 'ether')).toFixed(3);
            tokenInfo.price !== false ? object.dollarValue = (object.value * tokenInfo.price.rate).toFixed(3) : object.dollarValue = null;
          }
          if (operationsLength >= 2) {
            // console.log("trading transaction object:::", dataObject)
            object.txType = "TRADING"
            // object.name="trading"
            // object.symbol="decide"
            let firstToken = {}
            let secondToken = {}
            if (dataObject.value !== 0) {
              firstToken.name = "Ethereum"
              firstToken.symbol = "ETH"
              firstToken.image = "/images/eth.png"
              firstToken.value = dataObject.value;
              const tempArr = dataObject.operations.filter((tempObject) => {
                return (tempObject.from === dataObject.to);
              })
              firstToken.dollarValue = ((tempArr[0].usdPrice) * (dataObject.value)).toFixed(3)
              // firstToken.dollarValue = ((dataObject.operations[0].usdPrice) * (dataObject.value)).toFixed(3);
            }
            else {
              const firstTokenTemp = dataObject.operations[0];

              firstToken.name = firstTokenTemp.tokenInfo.name;
              firstToken.symbol = firstTokenTemp.tokenInfo.symbol;
              firstTokenTemp.tokenInfo.image !== undefined ? firstToken.image = firstTokenTemp.tokenInfo.image : firstToken.image = null;
              firstToken.value = parseFloat(web3.utils.fromWei(firstTokenTemp.value, 'ether')).toFixed(3);
              firstToken.dollarValue = ((firstToken.value) / firstTokenTemp.usdPrice).toFixed(3);
            }
            const tempArr1 = dataObject.operations.filter((tempObject) => {
              return (tempObject.to === dataObject.from)
            })
            /* const secondTokenTemp = dataObject.operations[operationsLength - 1].tokenInfo
            secondToken.name = secondTokenTemp.name;
            secondToken.symbol = secondTokenTemp.symbol;
            secondTokenTemp.image !== undefined ? secondToken.image = secondTokenTemp.image : secondToken.image = null;
            secondToken.value = parseFloat(web3.utils.fromWei(dataObject.operations[operationsLength - 1].value, 'ether')).toFixed(3);
            secondToken.dollarValue = null;
            if (secondTokenTemp.price !== false) {
              secondToken.dollarValue = (secondTokenTemp.price.rate * secondToken.value).toFixed(3)
            } */

            if(tempArr1[0]){
              const secondTokenTemp = tempArr1[0].tokenInfo
            secondToken.name = secondTokenTemp.name;
            secondToken.symbol = secondTokenTemp.symbol;
            secondTokenTemp.image !== undefined ? secondToken.image = secondTokenTemp.image : secondToken.image = null;
            secondToken.value = parseFloat(web3.utils.fromWei(tempArr1[0].value, 'ether')).toFixed(3);
            secondToken.dollarValue = null;
            if (secondTokenTemp.price !== false) {
              secondToken.dollarValue = (secondTokenTemp.price.rate * secondToken.value).toFixed(3)
            }
        }


            object.firstToken = firstToken;
            object.secondToken = secondToken;

          }
        }


      }
      arr1.push(object);
    }
    // console.log("data created in transaction history::", arr1);
    this.change(arr1);
    this.setState({ contents });

    // }
    // catch{
    //     this.setState({page:this.state.page-1})
    // }
  };

  constructor() {
    super();

    this.state = {
      account: "",
      contents: "",
      page: 1,
    };
  }

  render() {
    return (
      <div
        style={{
          width: "95%",
          height: "auto",
          paddingBottom: "30px",
          background: "transparent",
          borderRadius: "20px",
          // marginRight: '20px'
        }}
      >
        {/*  <center> */}
        <Typography variant='h3' align='left' sx={{ marginTop: '10px' }} color="white"> History </Typography>

        <br />

        {!this.state.contents ? <Typography variant='h3' sx={{ marginTop: '130px' }} align='center'>Loading...</Typography> : this.state.contents}

        <br />
        {this.state.contents && (
          <center>
            <font color="white">
              {this.state.page > 1 && (
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    transform: "rotate(180deg)",
                    cursor: "pointer",
                  }}
                  onClick={async (e) => {
                    if (this.state.page !== 1) {
                      await this.setState({ page: this.state.page - 1 });
                      this.update();
                    }
                  }}
                >
                  {" "}
                  {/* &lt;{" "} */}
                  <svg
                    width="22"
                    height="8"
                    viewBox="0 0 22 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.3536 4.35355C21.5488 4.15829 21.5488 3.84171 21.3536 3.64645L18.1716 0.464466C17.9763 0.269204 17.6597 0.269204 17.4645 0.464466C17.2692 0.659728 17.2692 0.976311 17.4645 1.17157L20.2929 4L17.4645 6.82843C17.2692 7.02369 17.2692 7.34027 17.4645 7.53553C17.6597 7.7308 17.9763 7.7308 18.1716 7.53553L21.3536 4.35355ZM0 4.5H21V3.5H0V4.5Z"
                      fill="white"
                    />
                  </svg>
                </button>
              )}{" "}
              &nbsp;&nbsp;&nbsp;
              {this.state.page} &nbsp;&nbsp;&nbsp;
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                }}
                onClick={async (e) => {
                  await this.setState({ page: this.state.page + 1 });
                  this.update();
                }}
              >
                {" "}
                {/* &gt;{" "} */}
                <svg
                  width="22"
                  height="8"
                  viewBox="0 0 22 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.3536 4.35355C21.5488 4.15829 21.5488 3.84171 21.3536 3.64645L18.1716 0.464466C17.9763 0.269204 17.6597 0.269204 17.4645 0.464466C17.2692 0.659728 17.2692 0.976311 17.4645 1.17157L20.2929 4L17.4645 6.82843C17.2692 7.02369 17.2692 7.34027 17.4645 7.53553C17.6597 7.7308 17.9763 7.7308 18.1716 7.53553L21.3536 4.35355ZM0 4.5H21V3.5H0V4.5Z"
                    fill="white"
                  />
                </svg>
              </button>
            </font>
          </center>
        )}
        <br />
        <br />
        {/* </center> */}
      </div>
    );
  }
}
