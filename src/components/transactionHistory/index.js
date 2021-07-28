import React, { Component } from "react";
import Web3 from "web3";
import axios from "axios";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReceiveIcon from "../../assets/icons/receive.png";
import SendIcon from "../../assets/icons/send.png";
import UserIcon from "../../assets/icons/userIcon.png";
import { MobileView, BrowserView } from "react-device-detect";

var contents = "";
var ops = [];
var ops2 = [];
var arr1 = [];
var eth = {};

export default class index extends Component {
  async componentWillMount() {
    // await this.loadWeb3();
    await this.loadBlockchainData();
  }

  // async loadWeb3() {
  //     if (window.ethereum) {
  //       window.web3 = new Web3(window.ethereum)
  //       await window.ethereum.enable()
  //     }
  //     else if (window.web3) {
  //       window.web3 = new Web3(window.web3.currentProvider)
  //     }
  //     else {
  //       window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  //     }
  // }

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
    return myDate.toLocaleString();
  }

  change = (arr) => {
    contents = arr.map((object) => (
      <div>
        <BrowserView>
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
                  src={object.status === "Receive" ? ReceiveIcon : SendIcon}
                  alt=""
                />
              </div>

              <div style={{ width: "20%", float: "left", textAlign: "left" }}>
                <font color="white">{object.status}</font>
                <br />
                <font style={{ fontSize: "10px", color: "white" }}>
                  {this.convertTimestamp(object.timestamp)}
                </font>
              </div>

              <div style={{ width: "5%", float: "left" }}>
                <img
                  width="25px"
                  alt=""
                  style={{ marginTop: "5px" }}
                  src={UserIcon}
                />
              </div>

              <div style={{ width: "30%", float: "left", textAlign: "left" }}>
                <font color="white">From</font>
                <br />
                <a
                  href={this.etherscanLink(object.from)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <font style={{ fontSize: "15px", color: "white" }}>
                    {this.shortaddress(object.from)}
                  </font>
                </a>
              </div>

              <div
                style={{
                  width: "30%",
                  float: "left",
                  textAlign: "left",
                  marginTop: "8px",
                }}
              >
                <font style={{ fontSize: "20px", color: "white" }}>
                  {object.value} {object.symbol}
                </font>
              </div>

              <div style={{ width: "15%", float: "left", textAlign: "left" }}>
                <font color="white">TYPE</font>
                <br />
                <font style={{ fontSize: "13px", color: "white" }}>
                  {object.type}
                </font>
              </div>
            </AccordionSummary>
            <AccordionDetails
              style={{ backgroundColor: "transparent", textAlign: "left" }}
            >
              <ul style={{ listStyleType: "none", color: "white" }}>
                <li>
                  Txn Hash &nbsp;&nbsp;&nbsp;:
                  <a
                    href={this.etherscanTxLink(object.hash)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <font style={{ fontSize: "15px", color: "white" }}>
                      {object.hash}
                    </font>
                  </a>
                </li>
                <li>
                  Rate
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :
                  $ {object.rate}
                </li>
                <li>24Hr Diff &nbsp;&nbsp;&nbsp;: {object.diff} %</li>
              </ul>
            </AccordionDetails>
          </Accordion>
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

    await axios
      .get(
        `https://api.ethplorer.io/getTokenInfo/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2?apiKey=EK-qSPda-W9rX7yJ-UY93y`,
        {},
        {}
      )
      .then(async (response) => {
        eth.price = response.data.price.rate;
        eth.diff = response.data.price.diff;
      });

    await axios
      .get(
        `https://api.ethplorer.io/getAddressHistory/0xbfbe5822a880a41c2075dc7e1d92663739cf119e?apiKey=EK-qSPda-W9rX7yJ-UY93y&limit=1000`,
        {},
        {}
      )
      .then(async (response) => {
        ops = response.data.operations;
        // console.log(ops)
      });

    await axios
      .get(
        `https://api.ethplorer.io/getAddressTransactions/0xbfbe5822a880a41c2075dc7e1d92663739cf119e?apiKey=EK-qSPda-W9rX7yJ-UY93y&limit=1000`,
        {},
        {}
      )
      .then(async (response) => {
        ops2 = response.data;
        // console.log(ops2)
        for (var i = 0; i < ops2.length; i++) {
          ops.push(ops2[i]);
        }
        ops.sort((a, b) => parseFloat(b.timestamp) - parseFloat(a.timestamp));

        // console.log(ops)
        this.update();
      });
  }

  update = () => {
    // try{

    const web3 = new Web3();
    arr1 = [];
    var start = (this.state.page - 1) * 10;
    var end = this.state.page * 10;
    // var end2;
    if (end > ops.length) {
      end = ops.length;
    }
    for (var i = start; i < end; i++) {
      var object = {};
      object.from = web3.utils.toChecksumAddress(ops[i].from);
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
      } else if (ops[i].hash !== undefined) {
        object.rate = eth.price;
        object.name = "Ethereum";
        object.symbol = "ETH";
        object.tokenAddress = "";
        object.diff = eth.diff;
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

      if (object.from === this.state.account) {
        object.status = "Send";
      } else {
        object.status = "Receive";
      }
      arr1.push(object);
    }
    console.log(arr1);
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
          // border:'1px',
          //   borderStyle: "solid",
          //   borderColor: "white",
          borderRadius: "20px",
        }}
      >
        <center>
          <div
            style={{
              marginTop: "30px",
              fontSize: "20px",
              marginBottom: "10px",
            }}
          >
            <font color="white"> All Transactions </font>
          </div>

          {/* <br /> */}
          {/* <font color="white">
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
          </font> */}
          {/* <br /> */}
          <br />

          {!this.state.contents ? <div>Loading...</div> : this.state.contents}

          <br />
          {this.state.contents && (
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
          )}
          <br />
          <br />
        </center>
      </div>
    );
  }
}
