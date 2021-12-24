import React, { Component } from 'react';
import Web3 from 'web3';
import axios from 'axios';
import { BrowserView, MobileView } from 'react-device-detect';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Avatar from 'react-avatar';
import ethImage from '../../../assets/icons/eth.png';
import {
  Header,
  TotalValueField,
  TotalTitle,
  TotalValue,
  Main,
  Title,
  EthereumTokenImage,
  TokenImage,
  TokenName,
  NameWrapper,
  APYPercent,
  APYWrapper,
} from './styledComponents';
import { ToggleButton } from '../../styled/styledComponents';

const CustomStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  height: '50px',
  background: 'transparent',
  cursor: 'pointer',
  lineHeight: '1',
  marginBottom: '5px',
  '&:hover': {
    background: '#FFFFFF',
    boxShadow: 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)',
    borderRadius: '10px',
  },
}));

let contents = '';
const stage1Tokens = [];
let arr2 = [];
let arr1 = [];

export default class Assets extends Component {
  async componentWillMount() {
    // console.log(this.props)
    if (this.state.account !== this.props.address) {
      arr2 = [];
      arr1 = [];
      this.setState({ account: this.props.address, hideShowMore: false, page: 1 });
      await this.loadBlockchainData();
    }
  }

  async componentWillReceiveProps(props) {
    // console.log(props)
    if (this.state.account !== props.address) {
      arr2 = [];
      arr1 = [];
      await this.setState({ account: props.address, hideShowMore: false, page: 1 });
      await this.loadBlockchainData();
    }
  }

  loadBlockchainData = async () => {
    const web3 = new Web3();
    const accounts = this.props.address;
    // const accounts = '0xbfbe5822a880a41c2075dc7e1d92663739cf119e'
    this.setState({ account: accounts });
    arr2 = [];

    await axios
      .get(
        `https://api.ethplorer.io/getAddressInfo/${accounts}?apiKey=EK-qSPda-W9rX7yJ-UY93y`,
        {},
        {}
      )
      .then(async (response) => {
        // console.log(response)
        arr1 = [];
        const { tokens } = response.data;
        if (response.data.ETH.balance === 0 && tokens === undefined) {
          this.setState({ contents: '' });
          this.setState({ hideShowMore: true });
        } else {
          const ethObject = {};
          const ethTokenInfo = {};
          const ethPrice = {};
          ethTokenInfo.coingecko = 'ethereum';
          ethTokenInfo.address = '';
          ethTokenInfo.name = 'Ethereum';
          ethTokenInfo.decimals = 18;
          ethPrice.diff = response.data.ETH.price.diff;
          ethTokenInfo.symbol = 'ETH';
          ethTokenInfo.image = '/images/eth.png';
          ethPrice.rate = response.data.ETH.price.rate;
          ethTokenInfo.price = ethPrice;
          ethObject.tokenInfo = ethTokenInfo;
          ethObject.rawBalance = response.data.ETH.rawBalance;
          ethObject.totalInvestment =
            response.data.ETH.price.rate *
            web3.utils.fromWei(response.data.ETH.rawBalance, 'ether');
          arr1.push(ethObject);
          let total =
            response.data.ETH.price.rate *
            web3.utils.fromWei(response.data.ETH.rawBalance, 'ether');
          if (tokens !== undefined) {
            for (var i = 0; i < tokens.length; i++) {
              if (tokens[i].tokenInfo.price !== false) {
                total +=
                  tokens[i].tokenInfo.price.rate *
                  web3.utils.fromWei(tokens[i].rawBalance, 'ether');
              }
            }
          }

          this.setState({ totalValue: total.toFixed(2) });

          if (tokens !== undefined) {
            for (i = 0; i < tokens.length; i++) {
              if (tokens[i].tokenInfo.price !== false) {
                tokens[i].totalInvestment =
                  (tokens[i].rawBalance / 10 ** tokens[i].tokenInfo.decimals) *
                  tokens[i].tokenInfo.price.rate;
                arr1.push(tokens[i]);
                stage1Tokens.push(tokens[i].tokenInfo.address);
              }
            }
          }
          // console.log(arr1)
          arr1.sort((a, b) => parseFloat(b.totalInvestment) - parseFloat(a.totalInvestment));

          // console.log("value of arr1::", arr1)
          this.update();
          this.addRemainingTokens();
        }
      });
  };

  addRemainingTokens = async () => {
    const accounts = this.props.address;
    await axios
      .get(
        `https://api.etherscan.io/api?module=account&action=tokentx&address=${accounts}&startblock=0&endblock=999999999&sort=asc&apikey=CISZAVU4237H8CFPFCFWEA25HHBI3QKB8W`,
        {},
        {}
      )
      .then(async (response) => {
        // console.log(response)
        if (response.data.result) {
          const erc20data = {};
          const tx = response.data.result;
          // console.log(stage1Tokens)
          for (let j = 0; j < tx.length; j++) {
            if (!erc20data[tx[j].contractAddress]) {
              var index;
              index = stage1Tokens.indexOf(tx[j].contractAddress);
              if (index === -1) {
                erc20data[tx[j].contractAddress] = {};
                erc20data[tx[j].contractAddress].id = tx[j].contractAddress;
                erc20data[tx[j].contractAddress].balance = tx[j].value / 10 ** tx[j].tokenDecimal;
                erc20data[tx[j].contractAddress].decimals = tx[j].tokenDecimal;
              }
            } else {
              if (tx[j].to.toLowerCase() === accounts.toLowerCase()) {
                erc20data[tx[j].contractAddress].balance += tx[j].value / 10 ** tx[j].tokenDecimal;
              } else if (tx[j].from.toLowerCase() === accounts.toLowerCase()) {
                erc20data[tx[j].contractAddress].balance -= tx[j].value / 10 ** tx[j].tokenDecimal;
              }
            }
          }

          const buffer = Object.values(erc20data);
          // console.log(buffer)
          for (var i = 0; i < buffer.length; i++) {
            if (buffer[i].balance >= 1 / 10 ** 6) {
              await axios
                .get(
                  `https://api.coingecko.com/api/v3/coins/ethereum/contract/${buffer[i].id}`,
                  {},
                  {}
                )
                .then(async (response2) => {
                  // console.log(response2.data);

                  if (
                    response2.data &&
                    response2.data.symbol !== 'WETH' &&
                    response2.data.symbol !== 'weth'
                  ) {
                    const object = {};

                    object.tokenInfo = {};
                    object.tokenInfo.price = {};
                    object.tokenInfo.coingecko = response2.data.id;
                    object.tokenInfo.address = buffer[i].id;
                    object.tokenInfo.name = response2.data.name;
                    object.tokenInfo.decimals = buffer[i].decimals;
                    if (response2.data.market_data) {
                      object.tokenInfo.price.diff =
                        response2.data.market_data.price_change_percentage_24h;
                      object.tokenInfo.price.rate = parseFloat(
                        response2.data.market_data.current_price.usd
                      ).toFixed(2);
                      object.totalInvestment = parseFloat(
                        buffer[i].balance * response2.data.market_data.current_price.usd
                      ).toFixed(2);
                      this.setState({
                        total: this.state.total + parseFloat(object.totalInvestment),
                      });
                    } else {
                      object.tokenInfo.price.diff = '-';
                      object.tokenInfo.price.rate = '-';
                      object.totalInvestment = 0;
                    }

                    object.tokenInfo.symbol = response2.data.symbol;
                    object.tokenInfo.image = response2.data.image.thumb;
                    object.rawBalance = buffer[i].balance * 10 ** buffer[i].decimals;
                    // console.log(object)
                    arr1.push(object);

                    arr1.sort(
                      (a, b) => parseFloat(b.totalInvestment) - parseFloat(a.totalInvestment)
                    );
                    this.update();
                    // console.log(arr1)
                  }
                })
                .catch(async (err) => {
                  await axios
                    .get(
                      `https://api.ethplorer.io/getTokenInfo/${buffer[i].id}?apiKey=EK-qSPda-W9rX7yJ-UY93y`,
                      {},
                      {}
                    )
                    .then(async (response2) => {
                      // console.log('response  :', buffer[j])
                      if (response2.data && response2.data.symbol !== 'WETH') {
                        // console.log(response2.data)

                        const object = {};
                        object.tokenInfo = {};
                        object.tokenInfo.price = {};
                        object.tokenInfo.coingecko = response2.data.address;
                        object.tokenInfo.address = buffer[i].id;
                        object.tokenInfo.name = response2.data.name;
                        object.tokenInfo.decimals = response2.data.decimals;
                        if (response2.data.price) {
                          object.tokenInfo.price.diff = response2.data.price.diff;
                          object.tokenInfo.price.rate = parseFloat(
                            response2.data.price.rate
                          ).toFixed(2);
                          object.totalInvestment = parseFloat(
                            buffer[i].balance * response2.data.price.rate
                          ).toFixed(2);
                          this.setState({
                            total: this.state.total + parseFloat(object.totalInvestment),
                          });
                        } else {
                          object.tokenInfo.price.diff = '-';
                          object.tokenInfo.price.rate = '-';
                          object.totalInvestment = 0;
                        }

                        object.tokenInfo.symbol = response2.data.symbol;
                        object.tokenInfo.image = response2.data.image;
                        object.rawBalance = buffer[i].balance * 10 ** response2.data.decimals;
                        // object.rawBalance = '10000000'
                        // console.log(object)
                        arr1.push(object);
                        arr1.sort(
                          (a, b) => parseFloat(b.totalInvestment) - parseFloat(a.totalInvestment)
                        );
                        this.update();
                        // console.log(response.data)
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                });
            }
          }
        }
      });
  };

  update = () => {
    let end;
    if (this.state.page === 1) {
      arr2 = [];
      end = 5;
    } else {
      end = this.state.page * 10;
    }

    if (end > arr1.length) {
      end = arr1.length;
      this.setState({ hideShowMore: true });
    } else {
      this.setState({ hideShowMore: false });
    }
    arr2 = [];
    for (let i = 0; i < end; i++) {
      if (arr1[i]) {
        const object = {};
        object.coingecko = arr1[i].tokenInfo.coingecko;
        object.address = arr1[i].tokenInfo.address;
        object.name = arr1[i].tokenInfo.name;
        object.profit = arr1[i].tokenInfo.price.diff;
        object.symbol = arr1[i].tokenInfo.symbol;
        object.image = arr1[i].tokenInfo.image;
        object.decimals = arr1[i].tokenInfo.decimals;
        // console.log(arr1[i].rawBalance)
        object.balance = parseFloat(arr1[i].rawBalance / 10 ** arr1[i].tokenInfo.decimals).toFixed(
          2
        );
        if (arr1[i].tokenInfo.price.rate !== '-') {
          object.rate = parseFloat(arr1[i].tokenInfo.price.rate).toFixed(2);
          object.totalInvestment = parseFloat(
            object.balance * arr1[i].tokenInfo.price.rate
          ).toFixed(2);
        } else {
          object.rate = '-';
          object.totalInvestment = '-';
        }

        arr2.push(object);
      }
    }
    this.change(arr2);
    this.setState({ contents });
  };

  change = (arr) => {
    contents = arr.map((object) => (
      <div>
        <BrowserView>
          <Link to={`/${this.state.account}/token/${object.coingecko}`}>
            <CustomStyle>
              <div
                style={{
                  display: 'flex',
                  width: '7%',
                  height: '50px',
                  float: 'left',
                  paddingLeft: '13px',
                }}>
                {object.image ? (
                  object.name === 'Ethereum' ? (
                    <EthereumTokenImage alt="" src={ethImage} />
                  ) : (
                    <TokenImage
                      alt=""
                      src={
                        object.image
                          ? object.image[0] === '/'
                            ? `https://ethplorer.io${object.image}`
                            : `${object.image}`
                          : ''
                      }
                    />
                  )
                ) : (
                  <div style={{ marginLeft: '14px', marginTop: '-5px' }}>
                    <Avatar
                      style={{
                        display: 'inline',
                        maxWidth: '20px',
                        verticalAlign: 'top',
                        height: '20px',
                        marginLeft: '11px',
                      }}
                      color="#737373"
                      name={object.name}
                      round
                      size="25"
                      textSizeRatio={1}
                    />
                  </div>
                )}
                <NameWrapper>
                  <TokenName>{object.name}</TokenName>
                </NameWrapper>
              </div>

              <APYWrapper>
                <APYPercent>
                  {((object.totalInvestment / this.state.totalValue) * 100).toFixed(2)} %
                </APYPercent>
              </APYWrapper>

              {/*<div*/}
              {/*  style={{*/}
              {/*    width: '30%',*/}
              {/*    height: '50px',*/}
              {/*    float: 'left',*/}
              {/*    textAlign: 'initial',*/}
              {/*    paddingLeft: '40px',*/}
              {/*  }}>*/}
              {/*  <font color="#737373" style={{ fontSize: '13px' }}>*/}
              {/*    {' '}*/}
              {/*    <br /> {object.balance} {object.symbol} - ${object.rate}{' '}*/}
              {/*  </font>*/}
              {/*</div>*/}

              <div style={{ width: '25%', height: '50px', float: 'left' }}>
                <font color="black" style={{ fontSize: '14px' }}>
                  <br /> ${object.totalInvestment}{' '}
                </font>
                <font
                  color={parseFloat(object.profit) > 0 ? '#03DAC6' : '#ff1f1f'}
                  style={{ fontSize: '10px' }}>
                  {' '}
                  <br />
                  {object.profit} %
                </font>
              </div>
            </CustomStyle>
          </Link>
        </BrowserView>
        <MobileView>
          <Link to={`/app/token/${object.coingecko}`}>
            <div
              style={{
                background: 'transparent',
                cursor: 'pointer',
              }}>
              <div style={{ height: '50px' }}>
                <img
                  style={{
                    marginLeft: '10px',
                    height: '30px',
                    width: '30px',
                    marginTop: '15px',
                    display: 'inline-block',
                  }}
                  alt=""
                  src={`https://ethplorer.io${object.image}`}
                />
                &nbsp;&nbsp;<font color="white">{object.name}</font>
              </div>

              <div style={{ height: '50px' }}>
                <font color="white">
                  {' '}
                  <br />
                  {object.profit} %
                </font>
              </div>

              <div style={{ height: '50px' }}>
                <font color="white">
                  {' '}
                  <br /> {object.balance} {object.symbol} | ${object.rate}{' '}
                </font>
              </div>

              <div style={{ height: '50px' }}>
                <font color="white">
                  <br /> ${object.totalInvestment}{' '}
                </font>
              </div>

              <br />
            </div>
          </Link>
        </MobileView>
      </div>
    ));
  };

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      contents: '',
      page: 1,
      totalValue: '00.00',
      hideShowMore: false,
      isOpen: false,
    };
  }

  render() {
    this.change(arr2);
    return (
      <Main>
        <Header>
          <Title>{'Ethereum Assets'}</Title>
          <ToggleButton
            onClick={() => {
              this.setState({ isOpen: !this.state.isOpen });
            }}
            isOpen={this.state.isOpen}
          />
        </Header>
        <TotalValueField>
          <TotalTitle>{'Total Value'}</TotalTitle>
          <TotalValue>{`$${this.state.totalValue}`}</TotalValue>
        </TotalValueField>

        {this.state.isOpen && (
          <center style={{ marginTop: '5px' }}>
            {this.state.contents}
            {!this.state.hideShowMore && (
              <div>
                <Typography
                  variant="caption"
                  align="right"
                  style={{ cursor: 'pointer' }}
                  onClick={async (e) => {
                    await this.setState({ page: this.state.page + 1 });
                    this.update();
                  }}>
                  <button
                    style={{
                      height: '25px',
                      width: '100px',
                      background: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#4453AD',
                      borderRadius: '10px',
                      fontSize: '14px',
                      lineHeight: '22px',
                      boxShadow: '7px 21px 22px -15px rgba(51, 78, 131, 0.17)',
                    }}>
                    Show More
                  </button>
                </Typography>
              </div>
            )}
          </center>
        )}
      </Main>
    );
  }
}
