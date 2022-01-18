import React, { Component } from 'react';
import Web3 from 'web3';
import axios from 'axios';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { BrowserView, MobileView } from 'react-device-detect';
import walletAddressCutter from '../../utils/helpers';
import {
  IconButton,
  Stack,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { AvatarGenerator } from 'random-avatar-generator';
import { FaAngleRight } from 'react-icons/fa';
import Avatar from 'react-avatar';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdContentCopy } from 'react-icons/md';
import TradeIconLight from '../../assets/icons/tradeIconLight.svg';
import TradeIconDark from '../../assets/icons/tradeIconDark.svg';
import SendIcon from '../../assets/icons/send.png';
import ReceiveIcon from '../../assets/icons/receive.png';
import gasPumpIconLight from '../../assets/icons/gasPumpHistoryLight.svg';
import gasPumpIconDark from '../../assets/icons/gasPumpHistoryDark.svg';
import receiveIconLight from '../../assets/icons/receiveIconLight.svg';
import receiveIconDark from '../../assets/icons/receiveIconDark.svg';
import {
  MainBlock,
  TransactionHistoryTableHeader,
  DashboardHistoryContainer,
  TransactionDateTimestamp,
  TransactionsHistoryTable,
  LoadingBlock,
  HistoryTableCell,
  DateLabelsSubBlock,
  TransactionName,
  TransactionTimestamp,
  TransactionIcon,
  TransactionTableRow,
} from './styles';

let contents = '';
let ops = [];
let ops2 = [];
let arr1 = [];
let allHash = [];
let distinctHash = [];
let lightThemeFinal;

export default class index extends Component {
  async componentDidUpdate() {
    lightThemeFinal = this.props.isLightTheme;
    console.log('isLightThemeValue456', lightThemeFinal);
  }

  async componentWillMount() {
    // await this.loadWeb3();
    lightThemeFinal = this.props.isLightTheme;
    this.setState({ contents: '' });
    await this.loadBlockchainData(lightThemeFinal);
  }

  async loadBlockchainData(lightThemeFinal) {
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
        // console.log('all hashes array response:::', distinctHash);
        // console.log('lightThemeFinal', lightThemeFinal);
        await this.update(lightThemeFinal);
      });
  }

  getTransactionFromHash = async (hash) => {
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

  walletAddressCutter(addy) {
    if (addy === '') {
      return addy;
    }
    const l = addy.length;
    const addynew = `${addy[0] + addy[1] + addy[2] + addy[3] + addy[4] + addy[5]}...${addy[l - 4]}${
      addy[l - 3]
    }${addy[l - 2]}${addy[l - 1]}`;
    return addynew;
  }

  etherscanTxLink(link) {
    link = `https://etherscan.io/tx/${link}`;
    return link;
  }

  convertTimestampToDate(epoch) {
    const myDate = new Date(epoch * 1000);
    return myDate.toLocaleDateString();
  }

  convertTimestampToTime(epoch) {
    const myDate = new Date(epoch * 1000);
    return myDate.toLocaleTimeString();
  }

  GetFormattedDate(epoch) {
    const todayTime = new Date(epoch * 1000);
    const month = (todayTime.getMonth() + 1).toString();
    const day = todayTime.getDate().toString();
    const year = todayTime.getFullYear().toString();
    return `${day}-${month}-${year}`;
  }

  update = async (isLightTheme) => {
    // try{

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

      data = await this.getTransactionFromHash(distinctHash[i]);
      if (data !== null) {
        object.txGas = await this.getTransactionGas(distinctHash[i]);
        const dataObject = data.data;
        // console.log("data object value::", dataObject.from)
        object.from = web3.utils.toChecksumAddress(dataObject.from);
        object.to = web3.utils.toChecksumAddress(dataObject.to);
        object.timestamp = dataObject.timestamp;
        object.hash = dataObject.hash;
        const formattedDate = this.GetFormattedDate(object.timestamp);
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
      console.log('object', object);
      arr1.push(object);
    }
    console.log(' transaction history data object::', arr1);
    this.setState({ testArr: arr1 });

    this.setState({ contents, isLightTheme });
  };

  constructor() {
    super();

    this.state = {
      account: '',
      contents: '',
      page: 1,
      isLightTheme: '',
      testArr: [],
    };
  }

  browserComponent = (data) => {
    const generator = new AvatarGenerator();
    return (
      <>
        <Accordion
          style={{
            background: 'orange',
            // width: '90%',
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
            <div style={{ width: '10%', float: 'left' }}>
              <img
                style={{ paddingTop: '10px' }}
                src={
                  data.txType === 'TRADING'
                    ? TradeIconDark
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
                <div style={{ width: '20%', float: 'left', textAlign: 'left' }}>
                  <font color="white">Trade</font>
                  <br />
                  <font style={{ fontSize: '10px', color: 'white' }}>
                    {this.convertTimestampToTime(data.timestamp)}
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
                  <font color="white">
                    {data.txType === 'Approval' ? data.txType : data.status}
                  </font>
                  <br />
                  <font style={{ fontSize: '10px', color: 'white' }}>
                    {this.convertTimestampToTime(data.timestamp)}
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
                    <Typography variant="body2" color="red">
                      {data.status === 'Receive'
                        ? this.walletAddressCutter(data.from)
                        : this.walletAddressCutter(data.to)}
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
                <Typography variant="body2">Fee</Typography>
                <Typography variant="caption">{data.txGas}ETH</Typography>
              </Stack>

              <Stack direction="column">
                <Typography variant="body2">Hash</Typography>
                <Stack direction="row">
                  <Typography href={this.etherscanTxLink(data.hash)} variant="caption">
                    {this.walletAddressCutter(data.hash)}
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
      </>
    );
  };

  render() {
    const generator = new AvatarGenerator();
    const { isLightTheme } = this.props;
    console.log('testArr object', this.state.testArr);
    return (
      <>
        {this.state.testArr.length === 0 ? (
          <LoadingBlock>
            <p>Loading...</p>
          </LoadingBlock>
        ) : (
          <>
            <MainBlock className="boxSize">
              <DashboardHistoryContainer isLightTheme={isLightTheme}>
                <TransactionsHistoryTable>
                  <TableHead>
                    <TableRow>
                      <TransactionHistoryTableHeader
                        isLightTheme={isLightTheme}
                        style={{ paddingLeft: '25px' }}>
                        Date
                      </TransactionHistoryTableHeader>
                      <TransactionHistoryTableHeader isLightTheme={isLightTheme}>
                        From/To
                      </TransactionHistoryTableHeader>
                      <TransactionHistoryTableHeader
                        isLightTheme={isLightTheme}
                        className="price-title">
                        Quantity
                      </TransactionHistoryTableHeader>
                      <TransactionHistoryTableHeader
                        isLightTheme={isLightTheme}
                        style={{ display: 'flex', flexDirection: 'row' }}>
                        {isLightTheme ? (
                          <img src={gasPumpIconLight} alt="gas_icon" />
                        ) : (
                          <img src={gasPumpIconDark} alt="gas_icon" />
                        )}
                        <span style={{ marginLeft: '5px' }}> Gas fee</span>
                      </TransactionHistoryTableHeader>
                      <TransactionHistoryTableHeader isLightTheme={isLightTheme} />
                    </TableRow>
                  </TableHead>
                  <TableBody style={{}}>
                    {this.state.testArr.map((object, i, arr) => (
                      <>
                        {i !== 0 &&
                        this.convertTimestampToDate(object.timestamp) ===
                          this.convertTimestampToDate(arr[i - 1].timestamp) ? null : (
                          <TransactionDateTimestamp isLightTheme={isLightTheme}>
                            {this.convertTimestampToDate(object.timestamp)}
                          </TransactionDateTimestamp>
                        )}
                        {/*<div style={{ marginLeft: '100px', marginRight: '100px' }}>*/}
                        <TransactionTableRow>
                          <HistoryTableCell>
                            <TransactionIcon
                              src={
                                object.txType === 'TRADING'
                                  ? isLightTheme
                                    ? TradeIconLight
                                    : TradeIconDark
                                  : object.status === 'Receive'
                                  ? isLightTheme
                                    ? receiveIconLight
                                    : receiveIconDark
                                  : SendIcon
                              }
                              alt="transaction_img"
                            />
                            <DateLabelsSubBlock>
                              {object.txType === 'TRADING' ? (
                                <TransactionName isLightTheme={isLightTheme}>Trade</TransactionName>
                              ) : (
                                <TransactionName isLightTheme={isLightTheme}>
                                  {object.txType === 'Approval' ? object.txType : object.status}
                                </TransactionName>
                              )}
                              <TransactionTimestamp>
                                {this.convertTimestampToTime(object.timestamp)}
                              </TransactionTimestamp>
                            </DateLabelsSubBlock>
                          </HistoryTableCell>
                        </TransactionTableRow>
                        {/*</div>*/}
                      </>
                    ))}
                  </TableBody>
                </TransactionsHistoryTable>
                <div>
                  <font color="green">
                    {this.state.page > 1 && (
                      <button
                        style={{
                          background: 'transparent',
                          border: 'none',
                          outline: 'none',
                          transform: 'rotate(180deg)',
                          cursor: 'pointer',
                          color: 'green',
                        }}
                        onClick={async (e) => {
                          if (this.state.page !== 1) {
                            await this.setState({ page: this.state.page - 1 });
                            await this.update();
                          }
                        }}>
                        <svg
                          width="22"
                          height="8"
                          viewBox="0 0 22 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M21.3536 4.35355C21.5488 4.15829 21.5488 3.84171 21.3536 3.64645L18.1716 0.464466C17.9763 0.269204 17.6597 0.269204 17.4645 0.464466C17.2692 0.659728 17.2692 0.976311 17.4645 1.17157L20.2929 4L17.4645 6.82843C17.2692 7.02369 17.2692 7.34027 17.4645 7.53553C17.6597 7.7308 17.9763 7.7308 18.1716 7.53553L21.3536 4.35355ZM0 4.5H21V3.5H0V4.5Z"
                            fill="white"
                          />
                        </svg>
                      </button>
                    )}{' '}
                    {this.state.page}
                    <button
                      style={{
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        cursor: 'pointer',
                      }}
                      onClick={async (e) => {
                        await this.setState({ page: this.state.page + 1 });
                        await this.update();
                      }}>
                      <svg
                        width="22"
                        height="8"
                        viewBox="0 0 22 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M21.3536 4.35355C21.5488 4.15829 21.5488 3.84171 21.3536 3.64645L18.1716 0.464466C17.9763 0.269204 17.6597 0.269204 17.4645 0.464466C17.2692 0.659728 17.2692 0.976311 17.4645 1.17157L20.2929 4L17.4645 6.82843C17.2692 7.02369 17.2692 7.34027 17.4645 7.53553C17.6597 7.7308 17.9763 7.7308 18.1716 7.53553L21.3536 4.35355ZM0 4.5H21V3.5H0V4.5Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </font>
                </div>
              </DashboardHistoryContainer>
            </MainBlock>
          </>
        )}
      </>
    );
  }
}
