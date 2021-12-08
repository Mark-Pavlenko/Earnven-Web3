import React, { Component } from 'react';
import Web3 from 'web3';
import axios from 'axios';
import { BrowserView, MobileView } from 'react-device-detect';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';

const CustomStyle = styled('div')(({ theme }) => ({
  height: '50px',
  background: 'transparent',
  cursor: 'pointer',
  lineHeight: '1',
  marginBottom: '5px',
  '&:hover': {
    background: theme.palette.gradients.custom,
  },
}));

let contents = '';
let arr2 = [];
let arr1 = [];
export default class index extends Component {
  async componentWillMount() {
    // await this.loadWeb3();
    await this.loadBlockchainData();
  }

  componentDidUpdate() {
    if (this.state.account !== this.props.address) {
      arr2 = [];
      arr1 = [];
      // this.setState({ hideShowMore: false })
      this.loadBlockchainData();
    }
  }

  loadBlockchainData = async () => {
    // const web3 = window.web3;
    // const accounts = await web3.eth.getAccounts();
    const web3 = new Web3();
    // const accounts = this.props.address;
    const accounts = '0xbfbe5822a880a41c2075dc7e1d92663739cf119e';
    this.setState({ account: accounts });
    try {
      await axios
        .get(
          `https://api2.ethplorer.io/getAddressChartHistory/${accounts}?apiKey=ethplorer.widget`,
          {},
          {}
        )
        .then(async (response) => {
          // console.log(response.data.history.data)
          const res = response.data.history.data;
          // console.log(res[res.length-1].balance)
          this.setState({ totalValue: res[res.length - 1].balance });
        });
    } catch {
      // do smth.
    }

    await axios
      .get(
        `https://api-rinkeby.etherscan.io/api?module=account&action=tokentx&address=${accounts}&startblock=0&endblock=999999999&sort=asc&apikey=JZ5GX21E3KAZ3B826R5ZUYMZ6VXPMEIUYU`,
        {},
        {}
      )
      .then(async (response) => {
        // console.log(response)
        if (response.data.result) {
          const erc20data = {};
          const tx = response.data.result;
          for (let i = 0; i < tx.length; i++) {
            if (!erc20data[tx[i].contractAddress]) {
              erc20data[tx[i].contractAddress] = {};
              erc20data[tx[i].contractAddress].id = tx[i].contractAddress;
              erc20data[tx[i].contractAddress].balance = tx[i].value / 10 ** tx[i].tokenDecimal;
            } else {
              if (tx[i].to.toLowerCase() === accounts.toLowerCase()) {
                erc20data[tx[i].contractAddress].balance += tx[i].value / 10 ** tx[i].tokenDecimal;
              } else if (tx[i].from.toLowerCase() === accounts.toLowerCase()) {
                erc20data[tx[i].contractAddress].balance -= tx[i].value / 10 ** tx[i].tokenDecimal;
              }

              // if(tx[i].contractAddress==='0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'){
              //     console.log(erc20data[tx[i].contractAddress].balance)
              // }
            }
          }

          arr1 = Object.values(erc20data);
          const buffer = [];
          for (let j = 0; j < arr1.length; j++) {
            if (arr1[j].balance >= 1 / 10 ** 6) {
              buffer.push(arr1[j]);
            }
          }
          arr1 = buffer;
          this.update();
          // console.log(erc20data)
          // console.log(response.data.result)
        }
      });
  };

  update = async () => {
    const web3 = new Web3();
    // arr2 = []
    // console.log(this.state.page)
    const start = (this.state.page - 1) * 10;
    let end;
    if (this.state.page === 1) {
      end = 4;
    } else {
      end = this.state.page * 10;
    }
    if (end > arr1.length) {
      end = arr1.length;
      this.setState({ hideShowMore: true });
    }
    if (this.state.page === 1) {
      await axios
        .get(
          `https://api.ethplorer.io/getAddressInfo/${this.state.account}?apiKey=EK-qSPda-W9rX7yJ-UY93y`,
          {},
          {}
        )
        .then(async (response) => {
          // console.log(response.data.ETH)
          const ethObject = {};
          ethObject.coingecko = 'ethereum';
          ethObject.address = '';
          ethObject.name = 'Ethereum';
          ethObject.profit = response.data.ETH.price.diff;
          ethObject.symbol = 'ETH';
          ethObject.image = 'https://ethplorer.io/images/eth.png';
          ethObject.rate = parseFloat(response.data.ETH.price.rate).toFixed(2);
          // ethTokenInfo.price = ethPrice;
          // ethObject.tokenInfo = ethTokenInfo;
          ethObject.rawBalance = response.data.ETH.rawBalance;
          ethObject.totalInvestment = (
            response.data.ETH.price.rate * web3.utils.fromWei(response.data.ETH.rawBalance, 'ether')
          ).toFixed(2);
          // console.log(ethObject)
          this.setState({ total: parseFloat(ethObject.totalInvestment) });
          arr2.push(ethObject);
        });
    }

    for (var i = start; i < end; i++) {
      await axios
        .get(
          `https://api.ethplorer.io/getTokenInfo/${arr1[i].id}?apiKey=EK-qSPda-W9rX7yJ-UY93y`,
          {},
          {}
        )
        .then(async (response) => {
          // console.log(response)
          if (response.data && response.data.symbol !== 'WETH') {
            const object = {};
            object.coingecko = response.data.address;
            object.address = arr1[i].id;
            object.name = response.data.name;
            if (response.data.price) {
              object.profit = response.data.price.diff;
              object.rate = parseFloat(response.data.price.rate).toFixed(2);
              object.totalInvestment = parseFloat(
                arr1[i].balance * response.data.price.rate
              ).toFixed(2);
              this.setState({ total: this.state.total + parseFloat(object.totalInvestment) });
            } else {
              object.profit = '-';
              object.rate = '-';
              object.totalInvestment = '-';
            }

            object.symbol = response.data.symbol;
            object.image = `https://ethplorer.io/${response.data.image}`;
            object.balance = parseFloat(arr1[i].balance).toFixed(2);

            arr2.push(object);
            // console.log(response.data)
          }
        })
        .catch((err) => {});
    }

    // console.log(arr2)

    // if (arr1[i]) {
    //     var object = {};
    //     object.coingecko = arr1[i].tokenInfo.coingecko;
    //     object.address = arr1[i].tokenInfo.address;
    //     object.name = arr1[i].tokenInfo.name;
    //     object.profit = arr1[i].tokenInfo.price.diff;
    //     object.symbol = arr1[i].tokenInfo.symbol;
    //     object.image = arr1[i].tokenInfo.image;
    //     object.balance = parseFloat(
    //         web3.utils.fromWei(arr1[i].rawBalance, "ether")
    //     ).toFixed(4);
    //     object.rate = parseFloat(arr1[i].tokenInfo.price.rate).toFixed(2);
    //     object.totalInvestment = parseFloat(arr1[i].totalInvestment).toFixed(2);
    //     arr2.push(object);
    // }
    // }
    // console.log(arr2)
    console.log(this.state.total);
    this.change(arr2);
    this.setState({ contents });
  };

  change = (arr) => {
    contents = arr.map((object) => (
      <div>
        <BrowserView>
          <Link to={`/${this.state.account}/token/${object.coingecko}`}>
            <CustomStyle>
              <div style={{ width: '7%', height: '50px', float: 'left', paddingLeft: '13px' }}>
                <img
                  style={{
                    display: 'inline',
                    maxWidth: '20px',
                    verticalAlign: 'top',
                    // marginLeft: "10px",
                    height: '20px',
                    // width: "30px",
                    // marginTop: "15px",
                    margin: '16px',
                  }}
                  alt=""
                  src={object.image}
                />
              </div>

              <div style={{ width: '23%', height: '50px', float: 'left' }}>
                <font color="white" style={{ fontSize: '17px' }}>
                  {' '}
                  <br />
                  {object.name}
                </font>
              </div>

              <div style={{ width: '15%', height: '50px', float: 'left' }}>
                <font color="white" style={{ fontSize: '15px' }}>
                  {' '}
                  <br />
                  {((object.totalInvestment / this.state.totalValue) * 100).toFixed(2)} %
                </font>
              </div>

              <div style={{ width: '30%', height: '50px', float: 'left' }}>
                <font color="white" style={{ fontSize: '14px' }}>
                  {' '}
                  <br /> {object.balance} {object.symbol} - ${object.rate}{' '}
                </font>
              </div>

              <div style={{ width: '25%', height: '50px', float: 'left' }}>
                <font color="white" style={{ fontSize: '15px' }}>
                  <br /> ${object.totalInvestment}{' '}
                </font>
                <font color="#03DAC6" style={{ fontSize: '10px' }}>
                  {' '}
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

              {/* <hr></hr> */}
            </div>
          </Link>
        </MobileView>
      </div>
    ));
    // console.log(contents)
  };

  constructor() {
    super();
    this.state = {
      account: '',
      contents: '',
      page: 1,
      totalValue: '00.00',
      total: 0,
      hideShowMore: false,
    };
  }

  lol = (e) => {
    console.log('haha');
  };

  mouseOver = (e) => {
    e.target.style.background = '#BB86FC';
  };

  mouseOut = (e) => {
    e.target.style.background = 'transparent';
  };

  render() {
    this.change(arr2);
    return (
      <div>
        <div
          style={{
            // width:'800px',
            // height:'720px',
            background: 'transparent',
            border: '1px solid #737373',
            borderRadius: '10px',
          }}>
          <Typography
            align="justify"
            variant="subtitle1"
            style={{ marginTop: '15px', marginLeft: '27px' }}>
            All Assets
          </Typography>

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
        </div>
        {!this.state.hideShowMore && (
          <div style={{ float: 'right', marginRight: '5px' }}>
            <Typography
              variant="caption"
              align="right"
              style={{ cursor: 'pointer' }}
              onClick={async (e) => {
                await this.setState({ page: this.state.page + 1 });
                this.update();
              }}>
              <u>Show More</u>
            </Typography>
          </div>
        )}
      </div>
    );
  }
}
