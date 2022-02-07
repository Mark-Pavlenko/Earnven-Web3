/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import './exchange.css';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import TransparentButton from '../../components/TransparentButton';
import Web3 from 'web3';
import ERC20ABI from '../../abi/ERC20.json';
import closeModalIcon from '../../assets/icons/close_nft.svg';
import closeModalIconDark from '../../assets/icons/closenftdark.svg';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Modal,
  OutlinedInput,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@material-ui/core';
import Uniswap from '../../assets/icons/Uniswap.webp';
import EthIcon from '../../assets/icons/ethereum.svg';
// import Curve from '../../generalAssets/icons/Curve.webp';
// import SushiSwap from '../../generalAssets/icons/Sushiswap.webp';
// import Bancor from '../../generalAssets/icons/Bancor.webp';
import Balancer from '../../assets/icons/balancer.png';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { useParams } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Avatar from 'react-avatar';
import ethImage from '../../assets/icons/eth.png';
import switchTokensLight from '../../assets/icons/switchTokensLight.svg';
import switchTokensDark from '../../assets/icons/switchTokensDark.svg';
import daiICon from '../../assets/icons/daiIcon.svg';
import paraSwapIcon from '../../assets/icons/paraSwapIcon.svg';
import searchTokensImportModalLight from '../../assets/icons/searchTokensButtonMobileLight.svg';
import searchTokensImportModalDark from '../../assets/icons/searchTokensInputModalDark.svg';

import uniIcon from '../../assets/icons/uniIcon.svg';
import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@material-ui/styles';
import plusIconLight from '../../assets/icons/plusIconLight.svg';
import plusIconDark from '../../assets/icons/plusIconDark.svg';

//-------

import NukeExchange from './nukeExchange';
import MenuItem from '@material-ui/core/MenuItem';
import CurrencySearchModal from '../../components/CurrencySearchModal';
import {
  ChooseBtnTokenBlock,
  ChosenSendTokenValue,
  ChosenTokenLabel,
  ColumnMainSubTitles,
  ColumnMainTitles,
  DownDelimiterLabelsBlock,
  ExchangeMainLayout,
  FirstColumnSwapSubBlock,
  FirstColumnTitleBlock,
  LabelsBlockSubBlock,
  NewMultiSwapButton,
  AdditionalOptionsSwapTokensSubBlock,
  SecondColumnSwapSubBlock,
  SecondColumnTitleBlock,
  SecondColumnTitleHeaderBlock,
  SendBlockLabels,
  SendReceiveSubBlock,
  SendTokensChooseButton,
  SwapTokensMainSubBlock,
  SwapBlockDelimiter,
  SwapFirstColumn,
  SwapSecondColumn,
  SwitchTokensBtn,
  LabelsBlockImportantSpan,
  LabelsBlockSubBlockSpan,
  SwapBlockExchangeLayout,
  MultiSwapChooseBtnTokenBlock,
  MultiSwapSendTokensChooseButton,
  MultiSwapSendValueLabel,
  MultiSwapReceiveTokensBlock,
  AddReceiveTokenMultiSwapBtn,
  FirstColumnTitleHeaderBlock,
  TokensModalSubLayout,
  SearchTokensModal,
  SearchTokensModalTextField,
  SendTokensModalList,
  SendTokenModalListItem,
  SendTokenImg,
  SendTokenLabelsBlock,
  SendTokenName,
  SendTokenConvertedMeasures,
  SendTokenBalance,
} from './styled';
import { useSelector } from 'react-redux';
import pyramidIcon from '../../assets/icons/pyramidIcon.svg';
import chevronDownBlack from '../../assets/icons/chevronDownLightTheme.svg';
import chevronDownLight from '../../assets/icons/chevronDownLight.svg';
import MultiSwapComponent from './multiSwap';
import SelectTokensModalContainer from './selectTokensModal';
import { SelectWrapper } from '../../components/liquidityPoolContents/styledComponents';
import {
  Balance,
  BlockTokenName,
  BlockTokens,
  ButtonsBlock,
  ChangeToken,
  InputBlock,
  LinksContainer,
  ModalInput,
  ModalLink,
  ModalLinkRight,
  SelectTitle,
  SupplyTokenButton,
} from '../../components/liquidityPoolContents/uniV2/StyledComponents';
import { TokenImage, ModalTitle, CloseButton, Header } from './selectTokensModal/styles';
import Autocomplete from '@mui/material/Autocomplete';
import searchIcon from '../../assets/icons/searchIconLight.png';

import SearchIcon from '@mui/icons-material/Search';
import { TokensListTextField } from '../../components/searchTokens/styles';

const useStyles = makeStyles((theme) => ({
  addIcon: {
    '& svg': {
      fontSize: 14,
    },
  },
  noBorder: {
    border: 'none !important',
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const styles = () => ({
  selected: {
    color: 'red',
  },
});
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
  borderRadius: '10px',
};
const CurrencySelect = styled.button`
  align-items: center;
  height: 42px;
  font-size: 18px;
  font-weight: 600;
  background-color: transparent;
  color: #737373;
  border-radius: 12px;
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
  padding: 0 0.5rem;
  margin: 0 0.5rem;
  :focus,
  :hover {
    background-color: blue;
  }
`;
const erc20Abi = [
  'function balanceOf(address owner) view returns (uint256)',
  'function approve(address _spender, uint256 _value) public returns (bool success)',
  'function allowance(address _owner, address _spender) public view returns (uint256 remaining)',
];
// const selectedProvider = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/8b2159b7b0944586b64f0280c927d0a8"))
const selectedProvider = new ethers.providers.JsonRpcProvider(
  'https://mainnet.infura.io/v3/8b2159b7b0944586b64f0280c927d0a8'
);
const makeCall = async (callName, contract, args, metadata = {}) => {
  if (contract[callName]) {
    let result;
    if (args) {
      result = await contract[callName](...args, metadata);
    } else {
      result = await contract[callName]();
    }
    return result;
  } else {
    console.log('no call of that name!');
  }
};

export default function SwapComponent() {
  const classes = useStyles();
  const { address } = useParams();
  const [value, setValue] = useState(0);
  const [TokenFrom, setTokenFrom] = useState('ETH');
  const [TokenTo, setTokenTo] = useState('');
  const [TokenFromAmount, setTokenFromAmount] = useState();
  const [TokenToAmount, setTokenToAmount] = useState();
  const [Slippage, setSlippage] = useState(2);
  const [allTokens, setAllTokens] = useState([]);
  const [Sources, setSources] = useState([]);
  const [open, setOpen] = useState(false);
  const [protocolsRateList, setprotocolsRateList] = useState([]);
  const [ethPrice, setethPrice] = useState(0);
  const [selectedRate, setselectedRate] = useState(null);
  const [newSelectedRate, setnewSelectedRate] = useState(null);
  const [txSuccess, settxSuccess] = useState(false);
  const [txFailure, settxFailure] = useState(false);
  const [selectedExchangeName, setselectedExchangeName] = useState('');
  const [currencyModal, setcurrencyModal] = useState(false);
  const [currencyToModal, setcurrencyToModal] = useState(false);
  const [toTokens, settoTokens] = useState([]);

  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedModal, setSelectedModal] = useState('');

  const ref = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isModalVisible && ref.current && !ref.current.contains(e.target)) {
        setIsModalVisible(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isModalVisible]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const ETHAddressInfoData = useSelector((state) => state.ethExplorerApi.ethExplorerApi);
  // console.log('ETHAddressInfoData', ETHAddressInfoData);

  useEffect(async () => {
    await axios
      .get(`https://api.ethplorer.io/getAddressInfo/${address}?apiKey=EK-qSPda-W9rX7yJ-UY93y`)
      .then(async (response) => {
        const arr1 = [];
        if (response.data.ETH.balance !== 0) {
          const tempObj = {};
          tempObj.address = '';
          tempObj.name = 'Ethereum';
          tempObj.symbol = 'ETH';
          tempObj.balance = response.data.ETH.balance.toFixed(3).toString();
          tempObj.logoURI = ethImage;
          arr1.push(tempObj);
        }
        let tokens = response.data.tokens;
        for (let i = 0; i < tokens.length; i++) {
          const tempObj = {};
          tempObj.address = tokens[i].tokenInfo.address;
          tempObj.name = tokens[i].tokenInfo.name;
          tempObj.symbol = tokens[i].tokenInfo.symbol;
          tempObj.balance = (
            tokens[i].balance * Math.pow(10, -parseInt(tokens[i].tokenInfo.decimals))
          )
            .toFixed(3)
            .toString();
          if (tokens[i].tokenInfo.image !== undefined) {
            tempObj.logoURI = `https://ethplorer.io${tokens[i].tokenInfo.image}`;
          } else {
            tempObj.logoURI = null;
          }
          arr1.push(tempObj);
        }
        console.log('final wallet`s tokens list arr', arr1);
        setAllTokens(arr1);
      });
  }, []);

  useEffect(async () => {
    await axios.get(`https://cdn.furucombo.app/furucombo.tokenlist.json`).then(async (response) => {
      console.log('receive tokens arr ', response.data.tokens);
      settoTokens(response.data.tokens);
    });
  }, []);

  useEffect(async () => {
    try {
      const ethDollarValue = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
      );
      setethPrice(ethDollarValue.data.ethereum.usd);
    } catch (err) {
      console.log('getEthDollarValue err', err);
    }
  }, []);

  useEffect(() => {
    const timeOutId = setTimeout(() => calculateToAmount(TokenFromAmount), 500);
    return () => clearTimeout(timeOutId);
  }, [TokenFromAmount]);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  async function transact() {
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log('account selected is :::', accounts[0]);

    if (selectedRate !== null) {
      let txObject = selectedRate.transactObject;
      txObject.gas = parseInt(txObject.gas) + 100000;
      txObject.from = accounts[0];
      if (TokenFrom !== 'ETH') {
        const ERC20contract = new web3.eth.Contract(ERC20ABI, txObject.sellTokenAddress);
        await ERC20contract.methods
          .approve(txObject.allowanceTarget, txObject.sellAmount)
          .send({ from: accounts[0] });
      }
      try {
        await web3.eth.sendTransaction(txObject);
        settxSuccess(true);
      } catch (error) {
        console.log('tx failed::', error);
        settxFailure(true);
      }
    } else {
      alert('Please Fill All fields');
    }
  }

  const dollarValueOfToken = async (tokenAddress) => {
    try {
      if (tokenAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
        return ethPrice;
      } else {
        const response = await axios.get(
          `https://api.ethplorer.io/getTokenInfo/${tokenAddress}?apiKey=EK-qSPda-W9rX7yJ-UY93y`
        );
        let data = response.data;
        console.log('response of ethplorere api::', data);
        if (data.price !== undefined) {
          console.log('enter inside method');
          // settokenToDollarValue(data.price.rate);
          return data.price.rate;
        } else {
          console.log('dollar value of this token is undefined');
        }
      }
    } catch {}
  };

  const calculateToAmount = async (tokenFromAmount) => {
    console.log('calculate method called with ammount::', tokenFromAmount);
    console.log('value of Tokenfromamount::', TokenFromAmount);
    console.log('value of tokenfrom::', TokenFrom);
    console.log('value of tokenTo::', TokenTo);
    if (tokenFromAmount > 0) {
      // console.log("calculate amount is called")
      if (TokenFrom !== '' && TokenTo !== '') {
        let differentQuoteList = [];
        const protocolsList = ['', 'Uniswap', 'Curve', 'SushiSwap', 'Bancor', 'Balancer'];
        let amount = parseFloat(tokenFromAmount) * Math.pow(10, 18);
        const tokenToDollarValue = await dollarValueOfToken(TokenTo.address);

        for (let i = 0; i < protocolsList.length; i++) {
          try {
            let protocolQuote = {};
            const response = await axios.get(
              `https://ropsten.api.0x.org/swap/v1/quote?buyToken=${TokenTo.symbol}&sellToken=${TokenFrom}&sellAmount=${amount}&feeRecipient=0xE609192618aD9aC825B981fFECf3Dfd5E92E3cFB&buyTokenPercentageFee=0.02&includedSources=${protocolsList[i]}`
            );
            console.log(`response for all ${protocolsList[i]}`, response.data);

            if (protocolsList[i] === '') {
              protocolQuote.name = '0x Index';
              var sources = response.data.sources;
              sources.sort((a, b) => parseFloat(b.proportion) - parseFloat(a.proportion));
              var sources2 = [];
              for (var j = 0; j < sources.length; j++) {
                if (sources[j].proportion > 0) {
                  sources2.push(sources[j]);
                }
              }
              setSources(sources2);
            } else {
              protocolQuote.name = protocolsList[i];
            }
            protocolQuote.price = response.data.price;
            protocolQuote.minPrice = response.data.guaranteedPrice;
            protocolQuote.TokenToAmount = (
              parseInt(response.data.buyAmount) * Math.pow(10, -TokenTo.decimals)
            )
              .toFixed(3)
              .toString();
            protocolQuote.gas = (
              parseInt(response.data.gas) *
              parseInt(response.data.gasPrice) *
              Math.pow(10, -18) *
              ethPrice
            ).toFixed(3);
            console.log('dollar value of token', tokenToDollarValue);
            protocolQuote.receivedValueInDollar = (
              parseInt(response.data.buyAmount) *
              Math.pow(10, -TokenTo.decimals) *
              tokenToDollarValue
            ).toFixed(3);
            protocolQuote.netReceived =
              parseFloat(protocolQuote.receivedValueInDollar) - parseFloat(protocolQuote.gas);
            protocolQuote.transactObject = response.data;
            // protocolQuote.image = `../../generalAssets/icons/${protocolsList[i]}.webp`;
            if (protocolsList[i] === 'Bancor') {
              protocolQuote.image =
                'https://assets.coingecko.com/coins/images/14053/small/bancorvbnt_32.png?1614048819';
            }
            if (protocolsList[i] === 'Uniswap') {
              protocolQuote.image =
                'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png?1600306604';
            }
            if (protocolsList[i] === 'Curve') {
              protocolQuote.image =
                'https://assets.coingecko.com/markets/images/538/small/Curve.png?1591605481';
            }
            if (protocolsList[i] === 'SushiSwap') {
              protocolQuote.image =
                'https://assets.coingecko.com/markets/images/576/small/2048x2048_Logo.png?1609208464';
            }
            if (protocolsList[i] === 'Balancer') {
              protocolQuote.image =
                'https://assets.coingecko.com/coins/images/11683/small/Balancer.png?1592792958';
            }
            if (protocolsList[i] === '') {
              protocolQuote.image =
                'https://assets.coingecko.com/markets/images/565/small/0x-protocol.png?1596623034';
            }
            differentQuoteList.push(protocolQuote);
          } catch (err) {
            console.log(`error come for ${protocolsList[i]}`, err);
          }
        }
        differentQuoteList.sort((a, b) => b.netReceived - a.netReceived);
        setselectedRate(differentQuoteList[0]);
        console.log('differentQuoteList[0].name', differentQuoteList);
        setselectedExchangeName(differentQuoteList[0].name);
        setprotocolsRateList(differentQuoteList);
        console.log('different rates we have::', differentQuoteList);
      }
    }
  };

  const fromTokenChange = (value) => {
    setTokenFrom(value);
    // setTokenTo('');
    setTokenFromAmount(0);
    setTokenToAmount(0);
    setprotocolsRateList([]);
    setselectedRate(null);
    setSources([]);
  };

  const ToTokenChange = (value) => {
    setTokenTo(value);
    setTokenFromAmount(0);
    setTokenToAmount(0);
    setprotocolsRateList([]);
    setselectedRate(null);
    setSources([]);
  };

  const handleDismissSearch = () => {
    setcurrencyModal(false);
  };
  const handleCurrencyToDismissSearch = () => {
    setcurrencyToModal(false);
  };

  const switchModal = (e) => {
    setSelectedModal(e.target.id);
    setIsModalVisible(true);
  };

  return (
    <>
      <ExchangeMainLayout>
        <SwapFirstColumn>
          <FirstColumnSwapSubBlock>
            <FirstColumnTitleHeaderBlock>
              <ColumnMainTitles isLightTheme={isLightTheme}>Swap</ColumnMainTitles>
              <ColumnMainSubTitles isLightTheme={isLightTheme}>
                Trade any token or LP share in a single transaction
              </ColumnMainSubTitles>
            </FirstColumnTitleHeaderBlock>
            <SwapTokensMainSubBlock isLightTheme={isLightTheme}>
              {/*send block */}
              <SendReceiveSubBlock>
                <SendBlockLabels isLightTheme={isLightTheme}>
                  <span>Send</span>
                  <span>$3 510,03</span>
                </SendBlockLabels>

                {/* Open modal with tokens list*/}
                {/*<div >*/}
                <SendTokensChooseButton isLightTheme={isLightTheme} onClick={switchModal}>
                  <ChooseBtnTokenBlock>
                    <img src={EthIcon} alt="eth_icon" style={{ marginRight: '10px' }} />
                    <ChosenTokenLabel isLightTheme={isLightTheme}>ETH</ChosenTokenLabel>
                    <img
                      src={isLightTheme ? chevronDownBlack : chevronDownLight}
                      alt="chevron_icon"
                    />
                  </ChooseBtnTokenBlock>
                  <ChosenSendTokenValue isLightTheme={isLightTheme}>10</ChosenSendTokenValue>
                </SendTokensChooseButton>
                {/* modal with tokens list*/}

                {isModalVisible && (
                  <SelectTokensModalContainer
                    theme={isLightTheme}
                    title="Select token"
                    isOpen={isModalVisible}
                    onClose={() => {
                      setIsModalVisible(false);
                    }}>
                    <TokensModalSubLayout isLightTheme={isLightTheme} ref={ref}>
                      <Header>
                        <ModalTitle isLightTheme={isLightTheme}>Select token</ModalTitle>
                        <CloseButton
                          onClick={() => setIsModalVisible(false)}
                          isLightTheme={isLightTheme}>
                          <img
                            src={isLightTheme ? closeModalIcon : closeModalIconDark}
                            alt="close_modal_btn"
                          />
                        </CloseButton>
                      </Header>

                      <SearchTokensModalTextField
                        InputProps={{
                          endAdornment: (
                            <img
                              src={
                                isLightTheme
                                  ? searchTokensImportModalDark
                                  : searchTokensImportModalLight
                              }
                              alt="search_icon"
                            />
                          ),
                          classes: { notchedOutline: classes.noBorder },
                          sx: {
                            color: isLightTheme ? '#1E1E20' : '#FFFFFF',
                            paddingRight: '20px',
                            fontSize: 14,
                          },
                        }}
                        id="filled-search"
                        // onChange={this.searchTokens}
                        variant="outlined"
                        label="Search tokens..."
                        InputLabelProps={{
                          style: {
                            color: isLightTheme ? 'black' : 'white',
                            fontSize: 14,
                            fontWeight: 400,
                            opacity: 0.5,
                            lineHeight: '22px',
                          },
                        }}
                        style={{
                          width: 435,
                          height: 40,
                          marginTop: '20px',
                          backgroundColor: isLightTheme ? '#FFFFFF' : '#1F265C3D',
                          boxShadow: isLightTheme
                            ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
                            : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
                          mixBlendMode: isLightTheme ? 'normal' : 'normal',
                          backdropFilter: isLightTheme ? 'none' : 'blur(35px)',
                          borderRadius: '10px',
                        }}
                        size="small"
                      />

                      {/* Tokens list for send*/}
                      <SendTokensModalList isLightTheme={isLightTheme}>
                        {allTokens.map((object) => (
                          <SendTokenModalListItem
                            onClick={() => {
                              fromTokenChange(object.symbol);
                              setcurrencyModal(false);
                            }}>
                            <SendTokenLabelsBlock>
                              {object.logoURI !== null ? (
                                <SendTokenImg alt="token_img" src={object.logoURI} />
                              ) : (
                                <Avatar
                                  style={{
                                    marginLeft: '4px',
                                    marginRight: '12px',
                                    marginTop: '2px',
                                  }}
                                  name={object.name}
                                  round={true}
                                  size="21"
                                  textSizeRatio={1}
                                />
                              )}
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <SendTokenName isLightTheme={isLightTheme}>
                                  {object.name}
                                </SendTokenName>
                                <SendTokenConvertedMeasures isLightTheme={isLightTheme}>
                                  409,333 UNI · $19,18
                                </SendTokenConvertedMeasures>
                              </div>
                            </SendTokenLabelsBlock>
                            <SendTokenBalance isLightTheme={isLightTheme}>
                              {object.balance === undefined ? (
                                <Loader type="Rings" color="#BB86FC" height={30} width={30} />
                              ) : (
                                <span>${object.balance}</span>
                              )}
                            </SendTokenBalance>
                          </SendTokenModalListItem>
                        ))}
                      </SendTokensModalList>
                    </TokensModalSubLayout>
                  </SelectTokensModalContainer>
                )}
                {/*</div>*/}

                <SwitchTokensBtn
                  src={isLightTheme ? switchTokensLight : switchTokensDark}
                  alt="switch_tokens_btn"
                />
              </SendReceiveSubBlock>

              {/*receive block*/}
              <SendReceiveSubBlock style={{ marginTop: '-9px' }}>
                <SendBlockLabels isLightTheme={isLightTheme}>
                  <span>Receive</span>
                  <span>$30,510.03</span>
                </SendBlockLabels>
                <SendTokensChooseButton isLightTheme={isLightTheme}>
                  <ChooseBtnTokenBlock>
                    <img src={daiICon} alt="daiICon" style={{ marginRight: '10px' }} />
                    <ChosenTokenLabel isLightTheme={isLightTheme}>DAI</ChosenTokenLabel>
                    <img
                      src={isLightTheme ? chevronDownBlack : chevronDownLight}
                      alt="chevron_icon"
                    />
                  </ChooseBtnTokenBlock>
                  <ChosenSendTokenValue isLightTheme={isLightTheme}>22508.05</ChosenSendTokenValue>
                </SendTokensChooseButton>
              </SendReceiveSubBlock>

              <SwapBlockDelimiter isLightTheme={isLightTheme} />

              {/* Labels block*/}
              <DownDelimiterLabelsBlock isLightTheme={isLightTheme}>
                <LabelsBlockSubBlock isLightTheme={isLightTheme}>
                  <LabelsBlockSubBlockSpan isLightTheme={isLightTheme}>
                    Min.Received
                  </LabelsBlockSubBlockSpan>
                  <LabelsBlockSubBlockSpan isLightTheme={isLightTheme}>
                    2829.673262 DA
                  </LabelsBlockSubBlockSpan>
                </LabelsBlockSubBlock>

                <LabelsBlockSubBlock isLightTheme={isLightTheme}>
                  <LabelsBlockSubBlockSpan isLightTheme={isLightTheme}>
                    Rate
                  </LabelsBlockSubBlockSpan>
                  <LabelsBlockSubBlockSpan isLightTheme={isLightTheme}>
                    1 ETH = 2,858.255 DAI
                  </LabelsBlockSubBlockSpan>
                </LabelsBlockSubBlock>

                <LabelsBlockSubBlock isLightTheme={isLightTheme}>
                  <LabelsBlockSubBlockSpan isLightTheme={isLightTheme}>
                    Offered by
                  </LabelsBlockSubBlockSpan>
                  <AdditionalOptionsSwapTokensSubBlock isLightTheme={isLightTheme}>
                    <img src={paraSwapIcon} alt="paraSwapIcon" />
                    <span>ParaSwap</span>
                  </AdditionalOptionsSwapTokensSubBlock>
                </LabelsBlockSubBlock>

                <LabelsBlockSubBlock isLightTheme={isLightTheme}>
                  <LabelsBlockImportantSpan isLightTheme={isLightTheme}>
                    Slippage Tolerance
                  </LabelsBlockImportantSpan>
                  <AdditionalOptionsSwapTokensSubBlock isLightTheme={isLightTheme}>
                    <span>1%</span>
                  </AdditionalOptionsSwapTokensSubBlock>
                </LabelsBlockSubBlock>

                <LabelsBlockSubBlock isLightTheme={isLightTheme}>
                  <LabelsBlockImportantSpan isLightTheme={isLightTheme}>
                    Transaction speed
                  </LabelsBlockImportantSpan>
                  <AdditionalOptionsSwapTokensSubBlock isLightTheme={isLightTheme}>
                    <span>$20 ^ Average</span>
                  </AdditionalOptionsSwapTokensSubBlock>
                </LabelsBlockSubBlock>
              </DownDelimiterLabelsBlock>

              <SwapBlockExchangeLayout isLightTheme={isLightTheme}>
                <Button>Exchange</Button>
              </SwapBlockExchangeLayout>
            </SwapTokensMainSubBlock>
          </FirstColumnSwapSubBlock>
        </SwapFirstColumn>
        <SwapSecondColumn>
          <MultiSwapComponent />
        </SwapSecondColumn>
      </ExchangeMainLayout>

      {/*{object.logoURI !== null ? (*/}
      {/*  <img*/}
      {/*    alt=""*/}
      {/*    width="30"*/}
      {/*    height="30"*/}
      {/*    src={object.logoURI}*/}
      {/*    style={{*/}
      {/*      borderRadius: '50%',*/}
      {/*      backgroundColor: '#e5e5e5',*/}
      {/*    }}*/}
      {/*  />*/}
      {/*) : (*/}
      {/*  <Avatar*/}
      {/*    style={{*/}
      {/*      display: 'inline',*/}
      {/*      maxWidth: '30px',*/}
      {/*      verticalAlign: 'top',*/}
      {/*      height: '30px',*/}
      {/*      // marginLeft: '11px',*/}
      {/*    }}*/}
      {/*    color={'#737373'}*/}
      {/*    name={object.name}*/}
      {/*    round={true}*/}
      {/*    size="30"*/}
      {/*    textSizeRatio={1}*/}
      {/*  />*/}
      {/*)}*/}

      {/* Old code*/}
      {/*<Box sx={{ width: '100%', mt: 3 }}>*/}
      {/*  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>*/}
      {/*    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">*/}
      {/*      <Tab label="Index" {...a11yProps(0)} />*/}
      {/*      <Tab label="Nuke" {...a11yProps(1)} />*/}
      {/*    </Tabs>*/}
      {/*  </Box>*/}
      {/*  <TabPanel value={value} index={0}>*/}
      {/*    <Grid container>*/}
      {/*      <Grid items xs={12} md={8} sx={{ mt: 5, ml: 5 }}>*/}
      {/*        <Container>*/}
      {/*          <Typography variant="h3" sx={{ fontStyle: 'normal' }}>*/}
      {/*            Index*/}
      {/*          </Typography>*/}
      {/*          <Container*/}
      {/*            sx={{*/}
      {/*              border: '1px solid #737373',*/}
      {/*              borderRadius: '7px',*/}
      {/*              boxSizing: 'border-box',*/}
      {/*              mt: 2.5,*/}
      {/*            }}>*/}
      {/*            <Box sx={{ mt: 4, mb: 3 }}>*/}
      {/*              <Stack direction="row" spacing={2}>*/}
      {/*                <Stack spacing={0.5}>*/}
      {/*                  <Typography variant="caption" sx={{ color: '#f5f5f5' }}>*/}
      {/*                    Swap*/}
      {/*                  </Typography>*/}
      {/*                  <FormControl variant="outlined" style={{ width: '120px' }}>*/}
      {/*                    /!* inactual *!/*/}

      {/*                    <Button*/}
      {/*                      variant="outlined"*/}
      {/*                      color="primary"*/}
      {/*                      sx={{*/}
      {/*                        height: '57px',*/}
      {/*                        color: '#fff',*/}
      {/*                        fontWeight: 500,*/}
      {/*                        fontSize: '20px',*/}
      {/*                        // background: (theme) => theme.palette.gradients.custom*/}
      {/*                      }}*/}
      {/*                      onClick={() => {*/}
      {/*                        setcurrencyModal(true);*/}
      {/*                      }}>*/}
      {/*                      {TokenFrom}*/}
      {/*                    </Button>*/}
      {/*                  </FormControl>*/}

      {/*                  <Modal*/}
      {/*                    open={currencyModal}*/}
      {/*                    onClose={handleDismissSearch}*/}
      {/*                    aria-labelledby="modal-modal-title"*/}
      {/*                    aria-describedby="modal-modal-description">*/}
      {/*                    <Box*/}
      {/*                      sx={{*/}
      {/*                        marginTop: '2%',*/}
      {/*                        maxHeight: '520px',*/}
      {/*                        overflow: 'scroll',*/}
      {/*                        position: 'absolute',*/}
      {/*                        top: '45%',*/}
      {/*                        left: '50%',*/}
      {/*                        transform: 'translate(-50%, -50%)',*/}
      {/*                        width: 400,*/}
      {/*                        bgcolor: 'background.default',*/}
      {/*                        p: 4,*/}
      {/*                        borderRadius: '15px',*/}
      {/*                      }}>*/}
      {/*                      <Typography variant="h6" align="center" sx={{ color: '#f5f5f5' }}>*/}
      {/*                        Token List*/}
      {/*                      </Typography>*/}
      {/*                      <Divider variant="fullWidth" sx={{ mt: 3 }} />*/}
      {/*                      {allTokens.map((object) => (*/}
      {/*                        <Box>*/}
      {/*                          <Box*/}
      {/*                            onClick={() => {*/}
      {/*                              fromTokenChange(object.symbol);*/}
      {/*                              setcurrencyModal(false);*/}
      {/*                            }}*/}
      {/*                            sx={{*/}
      {/*                              mt: 1,*/}
      {/*                              p: 1,*/}
      {/*                              cursor: 'pointer',*/}
      {/*                              '&:hover': {*/}
      {/*                                // background: (theme) => (theme.palette.gradients.custom)*/}
      {/*                              },*/}
      {/*                            }}>*/}
      {/*                            <Stack direction="row" spacing={2}>*/}
      {/*                              <Box sx={{ marginTop: '5px' }}>*/}
      {/*                                {object.logoURI !== null ? (*/}
      {/*                                  <img*/}
      {/*                                    alt=""*/}
      {/*                                    width="30"*/}
      {/*                                    height="30"*/}
      {/*                                    src={object.logoURI}*/}
      {/*                                    style={{*/}
      {/*                                      borderRadius: '50%',*/}
      {/*                                      backgroundColor: '#e5e5e5',*/}
      {/*                                    }}*/}
      {/*                                  />*/}
      {/*                                ) : (*/}
      {/*                                  <Avatar*/}
      {/*                                    style={{*/}
      {/*                                      display: 'inline',*/}
      {/*                                      maxWidth: '30px',*/}
      {/*                                      verticalAlign: 'top',*/}
      {/*                                      height: '30px',*/}
      {/*                                      // marginLeft: '11px',*/}
      {/*                                    }}*/}
      {/*                                    color={'#737373'}*/}
      {/*                                    name={object.name}*/}
      {/*                                    round={true}*/}
      {/*                                    size="30"*/}
      {/*                                    textSizeRatio={1}*/}
      {/*                                  />*/}
      {/*                                )}*/}
      {/*                              </Box>*/}
      {/*                              <Stack direction="column">*/}
      {/*                                <Typography variant="body1" sx={{ color: '#e3e3e3' }}>*/}
      {/*                                  {object.symbol}*/}
      {/*                                </Typography>*/}
      {/*                                <Typography*/}
      {/*                                  variant="caption"*/}
      {/*                                  sx={{*/}
      {/*                                    color: '#e3e3e3',*/}
      {/*                                    fontSize: '11px',*/}
      {/*                                  }}>*/}
      {/*                                  {object.name}*/}
      {/*                                </Typography>*/}
      {/*                              </Stack>*/}
      {/*                              <Box sx={{ flexGrow: 1 }}></Box>*/}
      {/*                              <Box sx={{ marginTop: '5px' }}>*/}
      {/*                                <Typography>*/}
      {/*                                  {object.balance === undefined ? (*/}
      {/*                                    <Loader*/}
      {/*                                      type="Rings"*/}
      {/*                                      color="#BB86FC"*/}
      {/*                                      height={30}*/}
      {/*                                      width={30}*/}
      {/*                                    />*/}
      {/*                                  ) : (*/}
      {/*                                    object.balance*/}
      {/*                                  )}*/}
      {/*                                </Typography>*/}
      {/*                              </Box>*/}
      {/*                            </Stack>*/}
      {/*                          </Box>*/}
      {/*                          /!* <Divider variant='fullWidth' sx={{  }}></Divider> *!/*/}
      {/*                        </Box>*/}
      {/*                      ))}*/}
      {/*                    </Box>*/}
      {/*                  </Modal>*/}
      {/*                </Stack>*/}
      {/*                <Stack spacing={0.5}>*/}
      {/*                  <Typography variant="caption" sx={{ color: '#0E1214' }}>*/}
      {/*                    0*/}
      {/*                  </Typography>*/}
      {/*                  <TextField*/}
      {/*                    variant="outlined"*/}
      {/*                    id="outlined-basic"*/}
      {/*                    placeholder="00.00"*/}
      {/*                    value={TokenFromAmount}*/}
      {/*                    onChange={(e) => {*/}
      {/*                      setTokenFromAmount(e.target.value);*/}
      {/*                      // calculateToAmount(e.target.value);*/}
      {/*                    }}*/}
      {/*                  />*/}
      {/*                </Stack>*/}
      {/*                <Stack spacing={0.5}>*/}
      {/*                  <Typography variant="caption" sx={{ color: '#f5f5f5' }}>*/}
      {/*                    For*/}
      {/*                  </Typography>*/}
      {/*                  <FormControl variant="outlined" style={{ width: '120px' }}>*/}
      {/*                    <Button*/}
      {/*                      variant="outlined"*/}
      {/*                      color="primary"*/}
      {/*                      sx={{*/}
      {/*                        height: '57px',*/}
      {/*                        color: '#fff',*/}
      {/*                        fontWeight: 500,*/}
      {/*                        fontSize: '20px',*/}
      {/*                        // background: (theme) => theme.palette.gradients.custom*/}
      {/*                      }}*/}
      {/*                      onClick={() => {*/}
      {/*                        setcurrencyToModal(true);*/}
      {/*                      }}>*/}
      {/*                      {TokenTo.symbol === undefined ? 'Select' : TokenTo.symbol}*/}
      {/*                    </Button>*/}
      {/*                  </FormControl>*/}
      {/*                  <Modal*/}
      {/*                    open={currencyToModal}*/}
      {/*                    onClose={handleCurrencyToDismissSearch}*/}
      {/*                    aria-labelledby="modal-modal-title"*/}
      {/*                    aria-describedby="modal-modal-description">*/}
      {/*                    <Box*/}
      {/*                      sx={{*/}
      {/*                        marginTop: '2%',*/}
      {/*                        maxHeight: '520px',*/}
      {/*                        overflow: 'scroll',*/}
      {/*                        position: 'absolute',*/}
      {/*                        top: '45%',*/}
      {/*                        left: '50%',*/}
      {/*                        transform: 'translate(-50%, -50%)',*/}
      {/*                        width: 400,*/}
      {/*                        bgcolor: 'background.default',*/}
      {/*                        // border: '2px solid #000',*/}
      {/*                        // boxShadow: 24,*/}
      {/*                        p: 4,*/}
      {/*                        borderRadius: '15px',*/}
      {/*                      }}>*/}
      {/*                      <Typography variant="h6" align="center" sx={{ color: '#f5f5f5' }}>*/}
      {/*                        Token List*/}
      {/*                      </Typography>*/}
      {/*                      <Divider variant="fullWidth" sx={{ mt: 3 }} />*/}
      {/*                      {toTokens.map((object) => (*/}
      {/*                        <Box>*/}
      {/*                          <Box*/}
      {/*                            onClick={() => {*/}
      {/*                              ToTokenChange(object);*/}
      {/*                              setcurrencyToModal(false);*/}
      {/*                            }}*/}
      {/*                            sx={{*/}
      {/*                              mt: 1,*/}
      {/*                              p: 1,*/}
      {/*                              cursor: 'pointer',*/}
      {/*                              '&:hover': {*/}
      {/*                                // background: (theme) => (theme.palette.gradients.custom)*/}
      {/*                              },*/}
      {/*                            }}>*/}
      {/*                            <Stack direction="row" spacing={2}>*/}
      {/*                              <Box sx={{ marginTop: '5px' }}>*/}
      {/*                                {object.logoURI !== null ? (*/}
      {/*                                  <img*/}
      {/*                                    alt=""*/}
      {/*                                    width="30"*/}
      {/*                                    height="30"*/}
      {/*                                    src={object.logoURI}></img>*/}
      {/*                                ) : (*/}
      {/*                                  <Avatar*/}
      {/*                                    style={{*/}
      {/*                                      display: 'inline',*/}
      {/*                                      maxWidth: '30px',*/}
      {/*                                      verticalAlign: 'top',*/}
      {/*                                      height: '30px',*/}
      {/*                                      // marginLeft: '11px',*/}
      {/*                                    }}*/}
      {/*                                    color={'#737373'}*/}
      {/*                                    name={object.name}*/}
      {/*                                    round={true}*/}
      {/*                                    size="30"*/}
      {/*                                    textSizeRatio={1}*/}
      {/*                                  />*/}
      {/*                                )}*/}
      {/*                              </Box>*/}
      {/*                              <Stack direction="column">*/}
      {/*                                <Typography variant="body1" sx={{ color: '#e3e3e3' }}>*/}
      {/*                                  {object.symbol}*/}
      {/*                                </Typography>*/}
      {/*                                <Typography*/}
      {/*                                  variant="caption"*/}
      {/*                                  sx={{*/}
      {/*                                    color: '#e3e3e3',*/}
      {/*                                    fontSize: '11px',*/}
      {/*                                  }}>*/}
      {/*                                  {object.name}*/}
      {/*                                </Typography>*/}
      {/*                              </Stack>*/}
      {/*                            </Stack>*/}
      {/*                          </Box>*/}
      {/*                        </Box>*/}
      {/*                      ))}*/}
      {/*                    </Box>*/}
      {/*                  </Modal>*/}
      {/*                </Stack>*/}
      {/*                <Stack spacing={0.5}>*/}
      {/*                  <Typography variant="caption" sx={{ color: '#0E1214' }}>*/}
      {/*                    0*/}
      {/*                  </Typography>*/}
      {/*                  <TextField*/}
      {/*                    variant="outlined"*/}
      {/*                    id="outlined-basic"*/}
      {/*                    placeholder="00.00"*/}
      {/*                    value={*/}
      {/*                      selectedRate !== null && protocolsRateList.length > 0*/}
      {/*                        ? selectedRate.TokenToAmount*/}
      {/*                        : '00.00'*/}
      {/*                    }*/}
      {/*                    onChange={(e) => {*/}
      {/*                      setTokenToAmount(e.target.value);*/}
      {/*                    }}*/}
      {/*                    disabled></TextField>*/}
      {/*                </Stack>*/}
      {/*              </Stack>*/}
      {/*              {selectedRate !== null && protocolsRateList.length === 0 ? (*/}
      {/*                <Typography variant="caption" sx={{ color: '#FFC107' }}>*/}
      {/*                  This Index is yet not supported*/}
      {/*                </Typography>*/}
      {/*              ) : (*/}
      {/*                <></>*/}
      {/*              )}*/}
      {/*              /!* <Stack direction='row' sx={{ mt: 2 }}>*/}
      {/*                          {Sources.map((object) =>*/}
      {/*                              <div>*/}
      {/*                                  <Button variant='contained' color='primary' disabled size='small' sx={{fontSize:'10px'}}>*/}
      {/*                                      {(parseFloat(object.proportion) * 100).toFixed(2)}% {object.name}*/}
      {/*                                  </Button>*/}
      {/*                                  <FaAngleRight style={{ paddingTop: '6px', marginLeft: '1px', color: '#737373' }} />*/}
      {/*                              </div>*/}
      {/*                          )}*/}
      {/*                      </Stack> *!/*/}
      {/*              <Typography variant="body1" sx={{ color: '#737373', mt: 2.5 }}>*/}
      {/*                Transaction Settings*/}
      {/*              </Typography>*/}
      {/*              <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>*/}
      {/*                <Typography variant="body2" sx={{ color: '#f5f5f5' }}>*/}
      {/*                  Slippage*/}
      {/*                </Typography>*/}
      {/*                <Divider*/}
      {/*                  sx={{*/}
      {/*                    flexGrow: 1,*/}
      {/*                    border: '0.5px dashed rgba(255, 255, 255, 0.3)',*/}
      {/*                    height: '0px',*/}
      {/*                  }}*/}
      {/*                  style={{ marginTop: '10px' }}*/}
      {/*                />*/}
      {/*                /!* <TextField variant='outlined'*/}
      {/*                              required*/}
      {/*                              id="outlined-basic"*/}
      {/*                              size='small'*/}
      {/*                              style={{ marginTop: '-7px', width: '12%' }}*/}
      {/*                              value={Slippage} onChange={(e) => { setSlippage(e.target.value) }}*/}
      {/*                              endAdornment={<InputAdornment position="end" sx={{color:'red'}}>%K</InputAdornment>}>*/}
      {/*                          </TextField> *!/*/}
      {/*                <OutlinedInput*/}
      {/*                  id="outlined-adornment-weight"*/}
      {/*                  value={Slippage}*/}
      {/*                  onChange={(e) => {*/}
      {/*                    setSlippage(e.target.value);*/}
      {/*                  }}*/}
      {/*                  size="small"*/}
      {/*                  style={{ marginTop: '-7px', width: '12%' }}*/}
      {/*                  endAdornment={<InputAdornment position="end">%</InputAdornment>}*/}
      {/*                  aria-describedby="outlined-weight-helper-text"*/}
      {/*                  inputProps={{*/}
      {/*                    'aria-label': 'weight',*/}
      {/*                  }}*/}
      {/*                />*/}
      {/*              </Stack>*/}
      {/*              /!* {protocolsRateList.length > 0 &&*/}
      {/*                          <Stack direction='row' spacing={1} sx={{ mt: 1.5 }}>*/}
      {/*                              <Typography variant='body2' sx={{ color: '#f5f5f5' }}>Offered By</Typography>*/}
      {/*                              <Divider sx={{ flexGrow: 1, border: "0.5px dashed rgba(255, 255, 255, 0.3)", height: '0px' }} style={{ marginTop: '10px' }} />*/}
      {/*                              <Button onClick={handleOpen} sx={{ height: '20px' }}>{selectedRate.name}</Button>*/}
      {/*                              <Modal*/}
      {/*                                  open={open}*/}
      {/*                                  onClose={handleClose}*/}
      {/*                                  aria-labelledby="modal-modal-title"*/}
      {/*                                  aria-describedby="modal-modal-description"*/}
      {/*                              >*/}
      {/*                                  <Box sx={style}>*/}
      {/*                                      <Typography variant='h6' align='center' sx={{ color: '#f5f5f5' }}>Offered By</Typography>*/}
      {/*                                      <Divider variant='fullWidth' sx={{ mt: 3 }}></Divider>*/}
      {/*                                      <Box>*/}
      {/*                                          <Stack direction='row' spacing={6} sx={{ mt: 2 }}>*/}
      {/*                                              <Typography variant='caption' sx={{ color: '#737373' }}>Receive</Typography>*/}
      {/*                                              <Typography variant='caption' sx={{ color: '#737373' }}>Network Fee</Typography>*/}
      {/*                                          </Stack>*/}
      {/*                                      </Box>*/}
      {/*                                      {protocolsRateList.map((object) => (*/}
      {/*                                          (object.name === selectedExchangeName ?*/}
      {/*                                              <Box onClick={() => newRateSelected(object)} sx={{ border: '1px solid #BB86FC', borderRadius: '7px', mt: 1, p: 1, cursor: 'pointer' }}>*/}
      {/*                                                  <Stack direction='row' spacing={2}>*/}
      {/*                                                      <Typography variant='body1' sx={{ color: '#e3e3e3' }}>${object.receivedValueInDollar}</Typography>*/}
      {/*                                                      <Typography variant='body1' sx={{ color: '#e3e3e3' }}>${object.gas}</Typography>*/}
      {/*                                                      <Box sx={{ flexGrow: 1 }}></Box>*/}

      {/*                                                      <Tooltip title={object.name}>*/}
      {/*                                                          {object.name === 'Balancer' ? <img alt="" width="21" height="20" src={Balancer} ></img> : object.name === '0x Index' ? <img alt="" width="21" height="20" src={object.image} style={{ filter: 'invert(1)' }} ></img> : <img alt="" width="21" height="20" src={object.image} ></img>}*/}
      {/*                                                      </Tooltip>*/}
      {/*                                                  </Stack>*/}
      {/*                                              </Box> :*/}
      {/*                                              <Box onClick={() => newRateSelected(object)} sx={{ border: '1px solid #737373', borderRadius: '7px', mt: 1, p: 1, cursor: 'pointer' }}>*/}
      {/*                                                  <Stack direction='row' spacing={2}>*/}
      {/*                                                      <Typography variant='body1' sx={{ color: '#e3e3e3' }}>${object.receivedValueInDollar}</Typography>*/}
      {/*                                                      <Typography variant='body1' sx={{ color: '#e3e3e3' }}>${object.gas}</Typography>*/}
      {/*                                                      <Box sx={{ flexGrow: 1 }}></Box>*/}

      {/*                                                      <Tooltip title={object.name}>*/}
      {/*                                                          {object.name === 'Balancer' ? <img alt="" width="21" height="20" src={Balancer} ></img> : object.name === '0x Index' ? <img alt="" width="21" height="20" src={object.image} style={{ filter: 'invert(1)' }} ></img> : <img alt="" width="21" height="20" src={object.image} ></img>}*/}
      {/*                                                      </Tooltip>*/}
      {/*                                                  </Stack>*/}
      {/*                                              </Box>)*/}
      {/*                                      ))}*/}
      {/*                                      <Box sx={{ marginLeft: '30%' }}>*/}
      {/*                                          <Button onClick={updateSelectedRate} variant='outlined' sx={{ mt: 2 }} >Save for This Trade</Button>*/}
      {/*                                      </Box>*/}
      {/*                                  </Box>*/}
      {/*                              </Modal>*/}
      {/*                                          </Stack>} *!/*/}
      {/*              <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>*/}
      {/*                <Typography variant="body2" sx={{ color: '#f5f5f5' }}>*/}
      {/*                  Min. output*/}
      {/*                </Typography>*/}
      {/*                <Divider*/}
      {/*                  sx={{*/}
      {/*                    flexGrow: 1,*/}
      {/*                    border: '0.5px dashed rgba(255, 255, 255, 0.3)',*/}
      {/*                    height: '0px',*/}
      {/*                  }}*/}
      {/*                  style={{ marginTop: '10px' }}*/}
      {/*                />*/}
      {/*                <Typography variant="body2">*/}
      {/*                  {selectedRate !== null && protocolsRateList.length > 0*/}
      {/*                    ? (*/}
      {/*                        parseFloat(TokenFromAmount) * parseFloat(selectedRate.minPrice)*/}
      {/*                      ).toFixed(3)*/}
      {/*                    : '00.00'}*/}
      {/*                  {TokenTo !== '' ? TokenTo.symbol : ''}*/}
      {/*                </Typography>*/}
      {/*              </Stack>*/}
      {/*              <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>*/}
      {/*                <Typography variant="body2" sx={{ color: '#f5f5f5' }}>*/}
      {/*                  Rate*/}
      {/*                </Typography>*/}
      {/*                <Divider*/}
      {/*                  sx={{*/}
      {/*                    flexGrow: 1,*/}
      {/*                    border: '0.5px dashed rgba(255, 255, 255, 0.3)',*/}
      {/*                    height: '0px',*/}
      {/*                  }}*/}
      {/*                  style={{ marginTop: '10px' }}*/}
      {/*                />*/}
      {/*                <Typography variant="body2">*/}
      {/*                  {' '}*/}
      {/*                  1 {TokenFrom} ={' '}*/}
      {/*                  {selectedRate !== null && protocolsRateList.length > 0*/}
      {/*                    ? parseFloat(selectedRate.price).toFixed(3)*/}
      {/*                    : '00.00'}{' '}*/}
      {/*                  {TokenTo !== '' ? TokenTo.symbol : ''}*/}
      {/*                </Typography>*/}
      {/*              </Stack>*/}
      {/*            </Box>*/}
      {/*          </Container>*/}
      {/*          {txSuccess && (*/}
      {/*            <Typography variant="caption" sx={{ color: '#54D62C' }}>*/}
      {/*              Swap is done Successfully*/}
      {/*            </Typography>*/}
      {/*          )}*/}
      {/*          {txFailure && (*/}
      {/*            <Typography variant="caption" sx={{ color: '#FF4842' }}>*/}
      {/*              Swap is Failed*/}
      {/*            </Typography>*/}
      {/*          )}*/}
      {/*          <TransparentButton*/}
      {/*            value="Submit"*/}
      {/*            onClick={transact}*/}
      {/*            style={{*/}
      {/*              height: '45px',*/}
      {/*              width: '200px',*/}
      {/*              background: 'transparent',*/}
      {/*              borderWidth: '2px',*/}
      {/*              borderStyle: 'solid',*/}
      {/*              borderColor: '#3b2959',*/}
      {/*              borderRadius: '5px',*/}
      {/*              color: 'white',*/}
      {/*              cursor: 'pointer',*/}
      {/*              float: 'right',*/}
      {/*              marginTop: '20px',*/}
      {/*            }}></TransparentButton>{' '}*/}
      {/*          <br />*/}
      {/*          <br /> &nbsp;*/}
      {/*        </Container>*/}
      {/*      </Grid>*/}
      {/*    </Grid>*/}
      {/*  </TabPanel>*/}
      {/*  <TabPanel value={value} index={1}>*/}
      {/*    <NukeExchange />*/}
      {/*  </TabPanel>*/}
      {/*</Box>*/}
    </>
  );
}
