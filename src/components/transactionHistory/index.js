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
import { Typography, Stack } from "@material-ui/core";
import { AvatarGenerator } from 'random-avatar-generator';
import ustIcon from "../../assets/icons/ust.png";
import { FaAngleRight } from "react-icons/fa";
import Avatar from 'react-avatar';

// import AvatarGenerator from 'react-avatar-generator';


var contents = "";
var ops = [];
var ops2 = [];
var arr1 = [];
var allHash = [];
var distinctHash = [];

export default class index extends Component {
  async componentWillMount() {
    // await this.loadWeb3();

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
          marginBottom: "5px",
          width: "90%",
          borderTop: "1px",
          borderBottom: "0px",
          borderLeft: "0px",
          borderRight: "0px",
          borderColor: "white",
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
              <img
                style={{
                  display: 'inline',
                  maxWidth: '25px',
                  verticalAlign: 'top',
                  // marginLeft: "10px",
                  height: "29px",
                  // width: "30px",
                  // marginTop: "15px",
                  margin: '10px',
                  // border: '1px solid',
                  // borderRadius: '50%'
                }}
                alt=""
                src={data.firstToken.image !== null ? `https://ethplorer.io${data.firstToken.image}` : ustIcon}
              />

              {/* <div
                  style={{
                    width: "30%",
                    float: "left",
                    textAlign: "left",
                    marginTop: "8px",
                  }}
                > */}
              <Stack direction='column'>
                <Typography variant='body1' sx={{ paddingTop: '15px' }}>
                  {/* {object.value} {object.symbol} */}
                  {`-${data.firstToken.value} ${data.firstToken.symbol}`}
                </Typography>
                <Typography variant='caption' sx={{ color: '#737373' }}>
                  {`$${data.firstToken.dollarValue} `}
                </Typography>
              </Stack>
              {/* </div> */}
            </Stack>
          </div>

          <FaAngleRight style={{ marginTop: '18px' }}></FaAngleRight>

          <div style={{ width: "41%", float: "left", textAlign: "left", marginLeft: '15px' }}>
            <Stack direction='row'>
              <img
                style={{
                  display: 'inline',
                  maxWidth: '25px',
                  verticalAlign: 'top',
                  // marginLeft: "10px",
                  height: "29px",
                  // width: "30px",
                  // marginTop: "15px",
                  margin: '10px',
                  // border: '1px solid',
                  // borderRadius: '50%'
                }}
                alt=""
                src={data.secondToken.image !== null ? `https://ethplorer.io${data.secondToken.image}` : ustIcon}
              />

              {/* <div
                  style={{
                    width: "30%",
                    float: "left",
                    textAlign: "left",
                    marginTop: "8px",
                  }}
                > */}
              <Stack direction='column'>
                <Typography variant='body1' sx={{ paddingTop: '15px' }}>
                  {/* {object.value} {object.symbol} */}
                  {`+${data.secondToken.value} ${data.secondToken.symbol}`}
                </Typography>
                <Typography variant='caption' sx={{ color: '#737373' }}>
                  {data.secondToken.dollarValue === null ? " " : `$${data.secondToken.dollarValue} `}
                </Typography>
              </Stack>
              {/* </div> */}
            </Stack>
          </div>


        </AccordionSummary>
        <AccordionDetails
          style={{ backgroundColor: "transparent", textAlign: "left" }}
        >
          <ul style={{ listStyleType: "none", color: "white" }}>
            <li>
              Txn Hash &nbsp;&nbsp;&nbsp;:
              <a
                href={this.etherscanTxLink(data.hash)}
                target="_blank"
                rel="noreferrer"
              >
                <font style={{ fontSize: "15px", color: "white" }}>
                  {data.hash}
                </font>
              </a>
            </li>
            {/* <li>
              Rate
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :
              $ {object.rate}
            </li>
            <li>24Hr Diff &nbsp;&nbsp;&nbsp;: {object.diff} %</li> */}
          </ul>
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
          borderColor: "white",
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
            <font color="white">{data.status}</font>
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
                  margin: '16px',
                  // border: '1px solid',
                  // borderRadius: '50%'
                }}
                alt=""
                src={`https://ethplorer.io${data.image}`}
              /> :
                <Avatar name={data.name} round={true} size="30" textSizeRatio={1.75} />
              }


              <Typography variant='body1' sx={{ paddingTop: '15px' }}>
                {/* {object.value} {object.symbol} */}
                {data.status === "Receive" ? `+${data.value} ${data.symbol}` : `-${data.value} ${data.symbol}`}
              </Typography>

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
          style={{ backgroundColor: "transparent", textAlign: "left" }}
        >
          <ul style={{ listStyleType: "none", color: "white" }}>
            <li>
              Txn Hash &nbsp;&nbsp;&nbsp;:
              <a
                href={this.etherscanTxLink(data.hash)}
                target="_blank"
                rel="noreferrer"
              >
                <font style={{ fontSize: "15px", color: "white" }}>
                  {data.hash}
                </font>
              </a>
            </li>
            {/*<li>
              Rate
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :
              $ {object.rate}
            </li>
            <li>24Hr Diff &nbsp;&nbsp;&nbsp;: {object.diff} %</li> */}
          </ul>
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
    // const web3 = window.web3;
    const accounts = this.props.address;
    console.log("account address inside transaction component::", accounts);
    this.setState({ account: accounts });

    /* await axios
      .get(
        `https://api.ethplorer.io/getTokenInfo/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2?apiKey=EK-qSPda-W9rX7yJ-UY93y`,
        {},
        {}
      )
      .then(async (response) => {
        eth.price = response.data.price.rate;
        eth.diff = response.data.price.diff;
      }); */

    await axios
      .get(
        `https://api.ethplorer.io/getAddressHistory/${accounts}?apiKey=EK-qSPda-W9rX7yJ-UY93y&limit=1000`,
        {},
        {}
      )
      .then(async (response) => {
        ops = response.data.operations;
        // for(let i=0;i<temp.length-1;i++){
        // for(let i=0;i<5;i++){
        // console.log("transaction object:::",temp[i+1].transactionHash)
        // if(temp[i].transactionHash===temp[i+1].transactionHash){
        //   temp[i].firstTransaction = temp[i+1];
        //   temp[i].type = 'trading'
        //   ops.push(temp[i])
        //   i++;
        // console.log("trading transaction:::",temp[i].transactionHash)
        // }
        // else{
        //   temp[i].type='tokenTransfer'
        // console.log("new object:::",temp[i])
        //     ops.push(temp[i])
        //   }
        // }
        // console.log("tokens object:::",ops)
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

        let dataObject = data.data;
        console.log("data object value::", dataObject.from)
        object.from = web3.utils.toChecksumAddress(dataObject.from)
        // object.to = web3.utils.toChecksumAddress(dataObject.from)
        object.timestamp = dataObject.timestamp;
        object.hash = dataObject.hash;
        if (dataObject.operations === undefined) {
          console.log("eth transfer")
          object.to = web3.utils.toChecksumAddress(dataObject.to);
          object.txType = "Eth"
          object.from === web3.utils.toChecksumAddress(this.state.account)? object.status='Send' : object.status = 'Receive';
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
            console.log("token transfer")
            object.to = web3.utils.toChecksumAddress(dataObject.to);
            object.txType = "Token"
            object.from === web3.utils.toChecksumAddress(this.state.account) ? object.status = 'Send' : object.status = 'Receive';
            const tokenInfo = dataObject.operations[0].tokenInfo
            object.name = tokenInfo.name
            object.symbol = tokenInfo.symbol
            tokenInfo.image !== undefined ? object.image = tokenInfo.image : object.image=null;
            object.value = parseFloat(web3.utils.fromWei(dataObject.operations[0].value, 'ether')).toFixed(3);
            tokenInfo.price !== false ? object.dollarValue = (object.value * tokenInfo.price.rate).toFixed(3) : object.dollarValue=null;
          }
          if (operationsLength >= 2) {
            console.log("trading transaction object:::", dataObject)
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
              firstToken.dollarValue = ((dataObject.operations[0].usdPrice) * (dataObject.value)).toFixed(3);
            }
            else {
              const firstTokenTemp = dataObject.operations[0];

              firstToken.name = firstTokenTemp.tokenInfo.name;
              firstToken.symbol = firstTokenTemp.tokenInfo.symbol;
              firstTokenTemp.tokenInfo.image !== undefined ? firstToken.image = firstTokenTemp.tokenInfo.image : firstToken.image = null;
              firstToken.image = "/images/eth.png"
              firstToken.value = parseFloat(web3.utils.fromWei(firstTokenTemp.value, 'ether')).toFixed(3);
              firstToken.dollarValue = ((firstToken.value) / firstTokenTemp.usdPrice).toFixed(3);
            }

            const secondTokenTemp = dataObject.operations[operationsLength - 1].tokenInfo
            secondToken.name = secondTokenTemp.name;
            secondToken.symbol = secondTokenTemp.symbol;
            secondTokenTemp.image !== undefined ? secondToken.image = secondTokenTemp.image : secondToken.image = null;
            secondToken.value = parseFloat(web3.utils.fromWei(dataObject.operations[operationsLength - 1].value, 'ether')).toFixed(3);
            secondToken.dollarValue = null;
            if (secondTokenTemp.price !== false) {
              secondToken.dollarValue = (secondTokenTemp.price.rate * secondToken.value).toFixed(3)
            }

            object.firstToken = firstToken;
            object.secondToken = secondToken;

          }
        }


      }
      // }


      /*  object.from = web3.utils.toChecksumAddress(ops[i].from);
       object.to = web3.utils.toChecksumAddress(ops[i].to);
       object.timestamp = ops[i].timestamp;
       if (ops[i].transactionHash !== undefined) {
         object.hash = ops[i].transactionHash;
       } else {
         object.hash = ops[i].hash;
       }
 
       if (ops[i].tokenInfo !== undefined) {
         object.rate = ops[i].tokenInfo.price.rate;
         object.name = ops[i].tokenInfo.name;
         object.symbol = ops[i].tokenInfo.symbol;
         object.tokenAddress = ops[i].tokenInfo.address;
         object.diff = ops[i].tokenInfo.price.diff;
         if (ops[i].tokenInfo.image !== undefined) {
           object.img = ops[i].tokenInfo.image;
         }
         else {
           object.img = null
         }
       } else if (ops[i].hash !== undefined) {
         object.rate = eth.price;
         object.name = "Ethereum";
         object.symbol = "ETH";
         object.tokenAddress = "";
         object.diff = eth.diff;
         object.img = '/images/eth.png';
       }
 
       if (ops[i].type !== undefined) {
         object.type = ops[i].type[0].toUpperCase() + ops[i].type.slice(1);
       } else {
         object.type = "EthTransfer";
       }
 
       if (object.diff === undefined) {
         object.diff = "NA";
       }
       if (object.rate === undefined) {
         object.rate = "NA";
       }
       if (typeof ops[i].value === "string") {
         if (object.symbol === "USDC") {
           object.value = parseFloat(ops[i].value / 10 ** 6).toFixed(2);
           // console.log(ops[i].value)
         } else {
           object.value = parseFloat(
             web3.utils.fromWei(ops[i].value, "ether")
           ).toFixed(2);
           if (ops[i].type === "approve") {
             console.log(object.value);
             if (parseFloat(object.value) > 10 ** 58) {
               object.value = "Unlimited";
             }
           }
         }
       } else {
         object.value = parseFloat(ops[i].value).toFixed(2);
       }
 
       if (object.from === web3.utils.toChecksumAddress(this.state.account)) {
         object.status = "Send";
       } else {
         object.status = "Receive";
       } */
      arr1.push(object);
    }
    console.log("data created in transaction history::", arr1);
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
