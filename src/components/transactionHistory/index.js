import React, { Component } from 'react';
import Web3 from 'web3';
import axios from 'axios';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { MobileView, BrowserView } from 'react-device-detect';
import { Typography, Stack, IconButton } from '@material-ui/core';
import { AvatarGenerator } from 'random-avatar-generator';
import { FaAngleRight, FaExclamationCircle } from 'react-icons/fa';
import Avatar from 'react-avatar';
import { styled } from '@material-ui/core/styles';
import Tooltip, { tooltipClasses } from '@material-ui/core/Tooltip';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdContentCopy } from 'react-icons/md';
import ustIcon from '../../assets/icons/ust.png';
import UserIcon from '../../assets/icons/userIcon.png';
import TradeIcon from '../../assets/icons/trade.svg';
import SendIcon from '../../assets/icons/send.png';
import ReceiveIcon from '../../assets/icons/receive.png';
import DashboardHistoryArrowLeft from '../../assets/icons/DashboardHistoryArrowLeft.svg';
import walletAddressCutter from '../../utils/helpers';
// import AvatarGenerator from 'react-avatar-generator';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  BlockChainImg,
  BlockChainName,
  MainBlock,
  MainTable,
  TableTokenTitle,
  TokenImg,
  TokenInfoNameBlock,
  TokenNameSymbol,
  TokensTableCell,
  TokensTableHeader,
  TokenTableCellBlockChain,
  TokenTableCellValue,
  TokenTableLightContainer,
} from '../RecentlyAddedTokens/styles';
import Pagination from '@material-ui/lab/Pagination';

let contents = '';
let ops = [];
let ops2 = [];
let arr1 = [];
let allHash = [];
let distinctHash = [];

export default class TransactionHistory extends Component {
  async componentWillMount() {
    this.setState({ contents: '' });
    await this.loadBlockchainData();
  }

  update = async () => {
    const web3 = new Web3();
    arr1 = [];
    const start = (this.state.page - 1) * 10;
    let end = this.state.page * 10;
    let data;
    // var end2;
    if (end > distinctHash.length) {
      end = distinctHash.length;
    }
    for (let i = start; i < end; i++) {
      const object = {};
      // if(ops[i].transactionHash !== undefined){

      data = await this.getTransactionfromHash(distinctHash[i]);
      if (data !== null) {
        object.txGas = await this.getTransactionGas(distinctHash[i]);
        const dataObject = data.data;
        console.log('data object value::', dataObject);
        object.from = web3.utils.toChecksumAddress(dataObject.from);
        object.to = web3.utils.toChecksumAddress(dataObject.to);
        object.timestamp = dataObject.timestamp;
        object.hash = dataObject.hash;
        const formattedDate = this.getFormattedDate(object.timestamp);
        let hisotricalEtherPrice;
        if (dataObject.value !== 0) {
          hisotricalEtherPrice = await this.getEtherHistoricalPrice(formattedDate);
        }
        if (dataObject.operations === undefined) {
          // console.log("eth transfer")
          // object.to = web3.utils.toChecksumAddress(dataObject.to);
          object.txType = 'Eth';
          object.from === web3.utils.toChecksumAddress(this.state.account)
            ? (object.status = 'Send')
            : (object.status = 'Receive');
          object.name = 'Ethereum';
          object.symbol = 'ETH';
          object.image = '/images/eth.png';
          object.value = dataObject.value.toFixed(3);
          object.dollarValue = (object.value * hisotricalEtherPrice).toFixed(3);
        } else {
          const operationsLength = dataObject.operations.length;
          if (operationsLength === 1) {
            // console.log("token transfer")
            // object.to = web3.utils.toChecksumAddress(dataObject.to);
            if (dataObject.operations[0].type === 'approve') {
              object.txType = 'Approval';
            } else {
              object.txType = 'Token';
            }

            object.from === web3.utils.toChecksumAddress(this.state.account)
              ? (object.status = 'Send')
              : (object.status = 'Receive');
            const { tokenInfo } = dataObject.operations[0];
            object.name = tokenInfo.name;
            object.symbol = tokenInfo.symbol;
            tokenInfo.image !== undefined
              ? (object.image = tokenInfo.image)
              : (object.image = null);
            tokenInfo.decimals === '18'
              ? (object.value = parseFloat(
                  web3.utils.fromWei(dataObject.operations[0].value, 'ether')
                ).toFixed(3))
              : (object.value = (
                  dataObject.operations[0].intValue / Math.pow(10, parseInt(tokenInfo.decimals))
                ).toFixed(3));
            // object.value = parseFloat(web3.utils.fromWei(dataObject.operations[0].value, 'ether')).toFixed(3);
            tokenInfo.price !== false
              ? (object.dollarValue = (object.value * tokenInfo.price.rate).toFixed(3))
              : (object.dollarValue = null);
          }
          if (operationsLength >= 2) {
            // console.log("trading transaction object:::", dataObject)
            object.txType = 'TRADING';
            // object.name="trading"
            // object.symbol="decide"
            const firstToken = {};
            const secondToken = {};
            if (dataObject.value !== 0) {
              firstToken.name = 'Ethereum';
              firstToken.symbol = 'ETH';
              firstToken.image = '/images/eth.png';
              firstToken.value = dataObject.value;
              // const tempArr = dataObject.operations.filter((tempObject) => {
              //   return (tempObject.from === dataObject.to);
              // })
              firstToken.dollarValue = (hisotricalEtherPrice * dataObject.value).toFixed(3);
              // firstToken.dollarValue = ((dataObject.operations[0].usdPrice) * (dataObject.value)).toFixed(3);
            } else {
              const firstTokenTemp = dataObject.operations[0];

              firstToken.name = firstTokenTemp.tokenInfo.name;
              firstToken.symbol = firstTokenTemp.tokenInfo.symbol;
              firstTokenTemp.tokenInfo.image !== undefined
                ? (firstToken.image = firstTokenTemp.tokenInfo.image)
                : (firstToken.image = null);
              firstToken.value = parseFloat(
                web3.utils.fromWei(firstTokenTemp.value, 'ether')
              ).toFixed(3);
              firstToken.dollarValue = (firstToken.value / firstTokenTemp.usdPrice).toFixed(3);
            }
            const tempArr1 = dataObject.operations.filter((tempObject) => {
              return tempObject.to === dataObject.from;
            });
            /* const secondTokenTemp = dataObject.operations[operationsLength - 1].tokenInfo
            secondToken.name = secondTokenTemp.name;
            secondToken.symbol = secondTokenTemp.symbol;
            secondTokenTemp.image !== undefined ? secondToken.image = secondTokenTemp.image : secondToken.image = null;
            secondToken.value = parseFloat(web3.utils.fromWei(dataObject.operations[operationsLength - 1].value, 'ether')).toFixed(3);
            secondToken.dollarValue = null;
            if (secondTokenTemp.price !== false) {
              secondToken.dollarValue = (secondTokenTemp.price.rate * secondToken.value).toFixed(3)
            } */

            if (tempArr1[0]) {
              const secondTokenTemp = tempArr1[0].tokenInfo;
              secondToken.name = secondTokenTemp.name;
              secondToken.symbol = secondTokenTemp.symbol;
              secondTokenTemp.image !== undefined
                ? (secondToken.image = secondTokenTemp.image)
                : (secondToken.image = null);
              secondToken.value = parseFloat(
                web3.utils.fromWei(tempArr1[0].value, 'ether')
              ).toFixed(3);
              secondToken.dollarValue = null;
              if (secondTokenTemp.price !== false) {
                secondToken.dollarValue = (secondTokenTemp.price.rate * secondToken.value).toFixed(
                  3
                );
              }
            }

            object.firstToken = firstToken;
            object.secondToken = secondToken;
          }
        }
      }
      arr1.push(object);
    }
    console.log('transaction history object data', arr1);
    this.renderContent(arr1);
    this.setState({ contents });
  };

  async loadBlockchainData() {
    // const web3 = window.

    const accounts = this.props.address;
    console.log('account address inside transaction component::', accounts);
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
        ops = response.data.operations;
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
        for (let i = 0; i < ops2.length; i++) {
          ops2[i].type = 'ethTransfer';
          ops.push(ops2[i]);
        }
        ops.sort((a, b) => parseFloat(b.timestamp) - parseFloat(a.timestamp));
        for (let i = 0; i < ops.length; i++) {
          if (ops[i].transactionHash !== undefined) {
            allHash.push(ops[i].transactionHash);
          } else {
            allHash.push(ops[i].hash);
          }
        }
        distinctHash = [...new Set(allHash)];
        console.log('final object response:::', distinctHash);
        this.update();
      });
  }

  getTransactionfromHash = async (hash) => {
    let result;
    try {
      result = await axios.get(
        `https://api.ethplorer.io/getTxInfo/${hash}?apiKey=EK-qSPda-W9rX7yJ-UY93y&limit=1000`
      );
    } catch (error) {
      result = null;
    }
    return result;
  };

  getTransactionGas = async (hash) => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        'https://mainnet.infura.io/v3/8b2159b7b0944586b64f0280c927d0a8'
      )
    );
    const tx = await web3.eth.getTransaction(hash);
    const gasValueInWei = parseInt(tx.gasPrice) * tx.gas;
    console.log('transaction gas value', web3.utils.fromWei(gasValueInWei.toString(), 'ether'));
    return web3.utils.fromWei(gasValueInWei.toString(), 'ether');
  };

  getEtherHistoricalPrice = async (date) => {
    let result;
    try {
      const temp = await axios.get(
        `https://api.coingecko.com/api/v3/coins/ethereum/history?date=${date}&localization=false`
      );
      result = temp.data.market_data.current_price.usd;
    } catch {
      result = null;
    }
    return result;
  };

  etherscanTxLink(link) {
    link = `https://etherscan.io/tx/${link}`;
    return link;
  }

  convertTimestamp(epoch) {
    const myDate = new Date(epoch * 1000);
    return myDate.toLocaleDateString();
  }

  getFormattedDate(epoch) {
    const todayTime = new Date(epoch * 1000);
    const month = (todayTime.getMonth() + 1).toString();
    const day = todayTime.getDate().toString();
    const year = todayTime.getFullYear().toString();
    return `${day}-${month}-${year}`;
  }

  renderContent = (arr) => {
    contents = arr.map((object, i, arr) => (
      <div>
        <BrowserView style={{ backgroundColor: 'red' }}>
          {i !== 0 &&
          this.convertTimestamp(object.timestamp) ===
            this.convertTimestamp(arr[i - 1].timestamp) ? null : (
            <Typography>{this.convertTimestamp(object.timestamp)}</Typography>
          )}
          {this.browserComponent(object)}
        </BrowserView>
        <MobileView>
          {/* each element will be parsed in the jsx if we`ve got mobile device*/}
          {this.mobileComponent(object)}
          {/*<p>Some mobile content</p>*/}
        </MobileView>
      </div>
    ));
  };

  // print desktop component
  browserComponent = (data) => {
    const generator = new AvatarGenerator();
    return (
      <Accordion
        style={{
          background: 'transparent',
          // width: '90%',
          borderTop: '1px',
          borderBottom: '0px',
          borderLeft: '0px',
          borderRight: '0px',
          borderColor: 'orange',
          borderStyle: 'solid',
          borderRadius: '0px',
        }}>
        {/*Accordion arrow*/}
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ fill: 'green' }} />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <div style={{ width: '10%', float: 'left' }}>
            <img
              style={{ paddingTop: '10px' }}
              src={
                data.txType === 'TRADING'
                  ? TradeIcon
                  : data.status === 'Receive'
                  ? ReceiveIcon
                  : SendIcon
              }
              alt="trading_img"
            />
          </div>
          {data.txType === 'TRADING' ? (
            // design for trading type of tx
            <>
              <div style={{ width: '20%', float: 'left', textAlign: 'left' }}>
                <font color="red">Trade</font>
                <br />
                <font style={{ fontSize: '10px', color: 'blue' }}>
                  {this.convertTimestamp(data.timestamp)}
                </font>
              </div>
              <div style={{ width: '18%', float: 'left', textAlign: 'left' }}>
                <Stack direction="row">
                  {data.firstToken.image !== null ? (
                    <img
                      style={{
                        display: 'inline',
                        maxWidth: '25px',
                        verticalAlign: 'top',
                        height: '25px',
                        margin: '16px',
                      }}
                      alt=""
                      src={`https://ethplorer.io${data.firstToken.image}`}
                    />
                  ) : (
                    <Avatar
                      style={{
                        display: 'inline',
                        maxWidth: '25px',
                        verticalAlign: 'top',
                        height: '25px',
                        margin: '16px',
                      }}
                      color="#737373"
                      name={data.firstToken.symbol}
                      round
                      size="30"
                      textSizeRatio={1.75}
                    />
                  )}
                  <Stack direction="column">
                    <Typography variant="body2" sx={{ paddingTop: '4px' }}>
                      {`-${data.firstToken.value} ${data.firstToken.symbol}`}
                    </Typography>
                    {data.firstToken.dollarValue === null ? (
                      <Typography variant="caption" sx={{ color: '#737373' }}>
                        N/A
                      </Typography>
                    ) : (
                      <Typography variant="caption" sx={{ color: '#737373' }}>
                        {`$${data.firstToken.dollarValue} `}
                      </Typography>
                    )}
                  </Stack>
                </Stack>
              </div>

              <FaAngleRight style={{ marginTop: '18px' }} />

              <div style={{ width: '41%', float: 'left', textAlign: 'left', marginLeft: '15px' }}>
                <Stack direction="row">
                  {data.secondToken.image !== null ? (
                    <img
                      style={{
                        display: 'inline',
                        maxWidth: '25px',
                        verticalAlign: 'top',
                        height: '25px',
                        margin: '16px',
                      }}
                      alt=""
                      src={`https://ethplorer.io${data.secondToken.image}`}
                    />
                  ) : (
                    <Avatar
                      style={{
                        display: 'inline',
                        maxWidth: '25px',
                        verticalAlign: 'top',
                        height: '25px',
                        margin: '16px',
                      }}
                      color="#737373"
                      name={data.secondToken.symbol}
                      round
                      size="30"
                      textSizeRatio={1.75}
                    />
                  )}
                  <Stack direction="column">
                    <Typography variant="body2" sx={{ paddingTop: '4px' }}>
                      {`+${data.secondToken.value} ${data.secondToken.symbol}`}
                    </Typography>
                    {data.secondToken.dollarValue === null ? (
                      <Typography variant="caption" sx={{ color: '#737373', ml: 1 }}>
                        N/A
                      </Typography>
                    ) : (
                      <Typography variant="caption" sx={{ color: '#737373' }}>
                        {`$${data.secondToken.dollarValue} `}
                      </Typography>
                    )}
                  </Stack>
                </Stack>
              </div>
            </>
          ) : (
            // desing for normal and token transfer
            <>
              <div style={{ width: '30%', float: 'left', textAlign: 'left' }}>
                <font color="white">{data.txType === 'Approval' ? data.txType : data.status}</font>
                <br />
                <font style={{ fontSize: '10px', color: 'white' }}>
                  {this.convertTimestamp(data.timestamp)}
                </font>
              </div>
              <div style={{ width: '41%', float: 'left', textAlign: 'left' }}>
                <Stack direction="row">
                  {data.image !== null ? (
                    <img
                      style={{
                        display: 'inline',
                        maxWidth: '25px',
                        verticalAlign: 'top',
                        height: '25px',
                        margin: '9px',
                      }}
                      alt=""
                      src={`https://ethplorer.io${data.image}`}
                    />
                  ) : (
                    <Avatar
                      style={{
                        display: 'inline',
                        maxWidth: '25px',
                        verticalAlign: 'top',
                        height: '25px',
                        margin: '9px',
                      }}
                      color="#737373"
                      name={data.symbol}
                      round
                      size="30"
                      textSizeRatio={1.75}
                    />
                  )}

                  <Stack direction="column">
                    {data.txType === 'Approval' ? (
                      <div>
                        <Typography variant="body2" sx={{ paddingTop: '4px' }}>
                          {data.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#737373' }}>
                          {data.symbol}
                        </Typography>
                      </div>
                    ) : (
                      <div>
                        <Typography variant="body2" sx={{ paddingTop: '4px' }}>
                          {data.status === 'Receive'
                            ? `+${data.value} ${data.symbol}`
                            : `-${data.value} ${data.symbol}`}
                        </Typography>
                        {data.dollarValue === null ? (
                          <Typography variant="caption" sx={{ color: '#737373', ml: 1 }}>
                            N/A
                          </Typography>
                        ) : (
                          <Typography variant="caption" sx={{ color: '#737373' }}>
                            {`$${data.dollarValue} `}
                          </Typography>
                        )}
                      </div>
                    )}
                  </Stack>

                  {/* </div> */}
                </Stack>
              </div>

              <div style={{ width: '15%', float: 'left', textAlign: 'left' }}>
                <Typography variant="body1" color="white">
                  {data.status === 'Receive' ? 'From' : 'To'}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <img
                    width="17px"
                    alt=""
                    // style={{ marginTop: "5px" }}
                    src={generator.generateRandomAvatar(data.from)}
                  />
                  <Typography variant="body2">
                    {data.status === 'Receive'
                      ? walletAddressCutter(data.from)
                      : walletAddressCutter(data.to)}
                  </Typography>
                </Stack>
              </div>
            </>
          )}
        </AccordionSummary>
        <AccordionDetails
          style={{
            backgroundColor: 'transparent',
            textAlign: 'left',
            borderTop: '1px',
            borderBottom: '0px',
            borderLeft: '0px',
            borderRight: '0px',
            borderColor: '#737373',
            borderStyle: 'solid',
            borderRadius: '0px',
            marginLeft: '10px',
            marginRight: '10px',
          }}>
          <Stack direction="row" spacing={20}>
            <Stack direction="column">
              <p style={{ color: 'orange' }}>Fee</p>
              <Typography variant="caption">{data.txGas}ETH</Typography>
            </Stack>

            <Stack direction="column">
              <Typography variant="body2">Hash</Typography>
              <Stack direction="row">
                <Typography href={this.etherscanTxLink(data.hash)} variant="caption">
                  {walletAddressCutter(data.hash)}
                </Typography>
                <IconButton edge="end" aria-label="copy" style={{ padding: '0px' }}>
                  <CopyToClipboard text={data.hash}>
                    <MdContentCopy style={{ color: '#929292', padding: '0px', height: '13px' }} />
                  </CopyToClipboard>
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>
    );
  };

  // mobile component
  mobileComponent = (data) => {
    const generator = new AvatarGenerator();
    return (
      <Accordion
        style={{
          background: 'transparent',
          width: '90%',
          borderTop: '1px',
          borderBottom: '0px',
          borderLeft: '0px',
          borderRight: '0px',
          borderColor: '#737373',
          borderStyle: 'solid',
          borderRadius: '0px',
        }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ fill: 'white' }} />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <div style={{ width: '5%', float: 'left' }}>
            <img
              style={{ paddingTop: '10px' }}
              src={
                data.txType === 'TRADING'
                  ? TradeIcon
                  : data.status === 'Receive'
                  ? ReceiveIcon
                  : SendIcon
              }
              alt=""
            />
          </div>
          {data.txType === 'TRADING' ? (
            // design for trading type of tx
            <>
              <div style={{ width: '15%', float: 'left', textAlign: 'left' }}>
                <font style={{ fontSize: '10px' }} color="white">
                  Trade
                </font>
                <br />
                <font style={{ fontSize: '7px', color: 'white' }}>
                  {this.convertTimestamp(data.timestamp)}
                </font>
              </div>
              <div style={{ width: '27%', float: 'left', textAlign: 'left' }}>
                <Stack direction="row">
                  {data.firstToken.image !== null ? (
                    <img
                      style={{
                        display: 'inline',
                        maxWidth: '25px',
                        verticalAlign: 'top',
                        height: '15px',
                        margin: '6px',
                      }}
                      alt=""
                      src={`https://ethplorer.io${data.firstToken.image}`}
                    />
                  ) : (
                    <Avatar
                      style={{
                        display: 'inline',
                        maxWidth: '25px',
                        verticalAlign: 'top',
                        height: '15px',
                        margin: '6px',
                      }}
                      color="#737373"
                      name={data.firstToken.symbol}
                      round
                      size="30"
                      textSizeRatio={1.75}
                    />
                  )}
                  <Stack direction="column">
                    <Typography variant="caption" sx={{ paddingTop: '4px' }}>
                      {`-${data.firstToken.value} ${data.firstToken.symbol}`}
                    </Typography>
                    {data.firstToken.dollarValue === null ? (
                      <Typography variant="caption" sx={{ color: '#737373', fontSize: '8px' }}>
                        N/A
                      </Typography>
                    ) : (
                      <Typography variant="caption" sx={{ color: '#737373', fontSize: '8px' }}>
                        {`$${data.firstToken.dollarValue} `}
                      </Typography>
                    )}
                  </Stack>
                </Stack>
              </div>

              <FaAngleRight style={{ marginTop: '18px', marginLeft: '15px' }} />

              <div style={{ width: '35%', float: 'left', textAlign: 'left' }}>
                <Stack direction="row">
                  {data.secondToken.image !== null ? (
                    <img
                      style={{
                        display: 'inline',
                        maxWidth: '25px',
                        verticalAlign: 'top',
                        height: '15px',
                        margin: '6px',
                      }}
                      alt=""
                      src={`https://ethplorer.io${data.secondToken.image}`}
                    />
                  ) : (
                    <Avatar
                      style={{
                        display: 'inline',
                        maxWidth: '25px',
                        verticalAlign: 'top',
                        height: '15px',
                        margin: '6px',
                      }}
                      color="#737373"
                      name={data.secondToken.symbol}
                      round
                      size="30"
                      textSizeRatio={1.75}
                    />
                  )}
                  <Stack direction="column">
                    <Typography variant="caption" sx={{ paddingTop: '4px' }}>
                      {`+${data.secondToken.value} ${data.secondToken.symbol}`}
                    </Typography>
                    {data.secondToken.dollarValue === null ? (
                      <Typography
                        variant="caption"
                        sx={{ color: '#737373', ml: 1, fontSize: '8px' }}>
                        N/A
                      </Typography>
                    ) : (
                      <Typography variant="caption" sx={{ color: '#737373', fontSize: '8px' }}>
                        {`$${data.secondToken.dollarValue} `}
                      </Typography>
                    )}
                  </Stack>
                </Stack>
              </div>
            </>
          ) : (
            // desing for normal and token transfer
            <>
              <div style={{ width: '22%', float: 'left', textAlign: 'left' }}>
                <font style={{ fontSize: '10px' }} color="white">
                  {data.txType === 'Approval' ? data.txType : data.status}
                </font>
                <br />
                <font style={{ fontSize: '7px', color: 'white' }}>
                  {this.convertTimestamp(data.timestamp)}
                </font>
              </div>
              <div style={{ width: '40%', float: 'left', textAlign: 'left' }}>
                <Stack direction="row">
                  {data.image !== null ? (
                    <img
                      style={{
                        display: 'inline',
                        maxWidth: '25px',
                        verticalAlign: 'top',
                        height: '15px',
                        margin: '9px',
                      }}
                      alt=""
                      src={`https://ethplorer.io${data.image}`}
                    />
                  ) : (
                    <Avatar
                      style={{
                        display: 'inline',
                        maxWidth: '25px',
                        verticalAlign: 'top',
                        height: '15px',
                        margin: '9px',
                      }}
                      color="#737373"
                      name={data.symbol}
                      round
                      size="30"
                      textSizeRatio={1.75}
                    />
                  )}

                  <Stack direction="column">
                    {data.txType === 'Approval' ? (
                      <div>
                        <Typography variant="caption" sx={{ paddingTop: '4px' }}>
                          {data.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#737373', fontSize: '8px' }}>
                          {data.symbol}
                        </Typography>
                      </div>
                    ) : (
                      <div>
                        <Typography variant="caption" sx={{ paddingTop: '4px' }}>
                          {data.status === 'Receive'
                            ? `+${data.value} ${data.symbol}`
                            : `-${data.value} ${data.symbol}`}
                        </Typography>
                        {data.dollarValue === null ? (
                          <Typography
                            variant="caption"
                            sx={{ color: '#737373', ml: 1, fontSize: '8px' }}>
                            N/A
                          </Typography>
                        ) : (
                          <Typography variant="caption" sx={{ color: '#737373', fontSize: '8px' }}>
                            {`$${data.dollarValue} `}
                          </Typography>
                        )}
                      </div>
                    )}
                  </Stack>

                  {/* </div> */}
                </Stack>
              </div>

              <div style={{ width: '15%', float: 'left', textAlign: 'left' }}>
                <Typography variant="caption" color="red">
                  {data.status === 'Receive' ? 'From' : 'To'}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <img
                    width="7px"
                    alt=""
                    // style={{ marginTop: "5px" }}
                    src={generator.generateRandomAvatar(data.from)}
                  />
                  <h1 style={{ color: 'red' }}>TTTTTTTT</h1>
                  <Typography variant="caption">
                    {data.status === 'Receive'
                      ? walletAddressCutter(data.from)
                      : walletAddressCutter(data.to)}
                  </Typography>
                </Stack>
              </div>
            </>
          )}
        </AccordionSummary>
        <AccordionDetails
          style={{
            backgroundColor: 'transparent',
            textAlign: 'left',
            borderTop: '1px',
            borderBottom: '0px',
            borderLeft: '0px',
            borderRight: '0px',
            borderColor: '#737373',
            borderStyle: 'solid',
            borderRadius: '0px',
            marginLeft: '10px',
            marginRight: '10px',
          }}>
          <Stack direction="row" spacing={5}>
            <Stack direction="column">
              <Typography variant="caption">Fee</Typography>
              <Typography variant="caption" sx={{ fontSize: '8px' }}>
                {data.txGas}ETH
              </Typography>
            </Stack>

            <Stack direction="column">
              <Typography variant="caption">Hash</Typography>
              <Stack direction="row">
                <Typography
                  href={this.etherscanTxLink(data.hash)}
                  variant="caption"
                  sx={{ fontSize: '8px' }}>
                  {walletAddressCutter(data.hash)}
                </Typography>
                <IconButton edge="end" aria-label="copy" style={{ padding: '0px' }}>
                  <CopyToClipboard text={data.hash}>
                    <MdContentCopy style={{ color: '#929292', padding: '0px', height: '13px' }} />
                  </CopyToClipboard>
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>
    );
  };

  constructor() {
    super();

    this.state = {
      account: '',
      contents: '',
      page: 1,
    };
  }

  render() {
    const { isLightTheme } = this.props;

    return (
      <div
        style={{
          background: 'transparent',
          borderRadius: '20px',
          // backgroundColor: 'red',
        }}>
        {!this.state.contents ? (
          <Typography variant="h3" align="center">
            Loading...
          </Typography>
        ) : (
          this.state.contents
          // <MainBlock className="boxSize">
          //   <TokenTableLightContainer isLightTheme={isLightTheme}>
          //     <TableTokenTitle isLightTheme={isLightTheme}>Recently added tokens</TableTokenTitle>
          //     <MainTable>
          //       <TableHead>
          //         <TableRow>
          //           <TokensTableHeader isLightTheme={isLightTheme}>№</TokensTableHeader>
          //           <TokensTableHeader isLightTheme={isLightTheme}>Name</TokensTableHeader>
          //           <TokensTableHeader isLightTheme={isLightTheme} className="price-title">
          //             Price
          //           </TokensTableHeader>
          //           <TokensTableHeader isLightTheme={isLightTheme}>1H</TokensTableHeader>
          //           <TokensTableHeader isLightTheme={isLightTheme}>24H</TokensTableHeader>
          //           <TokensTableHeader isLightTheme={isLightTheme}>
          //             Fully Diluted Market Cap
          //           </TokensTableHeader>
          //           <TokensTableHeader isLightTheme={isLightTheme}>Volume</TokensTableHeader>
          //           <TokensTableHeader isLightTheme={isLightTheme}>Blockchain</TokensTableHeader>
          //           <TokensTableHeader isLightTheme={isLightTheme}>Added</TokensTableHeader>
          //         </TableRow>
          //       </TableHead>
          //
          //       <TableBody></TableBody>
          //     </MainTable>
          //   </TokenTableLightContainer>
          // </MainBlock>
        )}

        <br />
        {this.state.contents && (
          <center>
            <font color="white">
              {this.state.page > 1 && (
                <button
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    transform: 'rotate(180deg)',
                    cursor: 'pointer',
                  }}
                  onClick={async (e) => {
                    if (this.state.page !== 1) {
                      await this.setState({ page: this.state.page - 1 });
                      this.update();
                    }
                  }}>
                  <img src={DashboardHistoryArrowLeft} alt="arrow_right" />
                </button>
              )}{' '}
              &nbsp;&nbsp;&nbsp;
              {this.state.page} &nbsp;&nbsp;&nbsp;
              <button
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                }}
                onClick={async (e) => {
                  await this.setState({ page: this.state.page + 1 });
                  this.update();
                }}>
                <img src={DashboardHistoryArrowLeft} alt="arrow_left" />
              </button>
            </font>
          </center>
        )}
      </div>
    );
  }
}
