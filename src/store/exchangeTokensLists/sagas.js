import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as API from '../../api/api';
import actionTypes from '../../constants/actionTypes';
import * as actions from './actions';
import {
  setInitReceiveMultiSwapTokensListLoading,
  setInitSendMultiSwapTokensListLoading,
} from './actions';
import ethImage from '../../assets/icons/eth.png';
import CoinGeckoMockTokensList from './CoinGecko.json';
import Web3 from 'web3';
import TOKENDECIMALSABI from '../../abi/TokenDecomals.json';
import ROUTERABI from '../../abi/UniRouterV2.json';
import { getTokenUSDAmount } from '../../api/api';

export function* getSendTokensListSagaWatcher() {
  yield takeLatest(actionTypes.SET_SEND_TOKENS_LIST, getSendTokensListSagaWorker);
}

function* getSendTokensListSagaWorker(accountAddress) {
  const addressInfoData = yield call(API.getAddressInfo, accountAddress.payload);
  // console.log('only addressInfoData sagas', addressInfoData.data);

  const zeroAPISwapTokensList = yield call(API.getZeroAPITokensList);
  // console.log('sagas zeroAPITokensList', zeroAPISwapTokensList);

  const walletTokensList = [];
  if (addressInfoData.data.ETH.balance !== 0) {
    const tempObj = {};
    tempObj.address = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
    tempObj.name = 'Ethereum';
    tempObj.symbol = 'ETH';
    tempObj.balance = parseFloat(addressInfoData.data.ETH.balance.toFixed(3));
    tempObj.logoURI = ethImage;
    tempObj.USDCurrency = addressInfoData.data.ETH.price.rate;
    tempObj.sendTokensListItem = true;

    walletTokensList.push(tempObj);
  }
  let tokens = addressInfoData.data.tokens;

  for (let i = 0; i < tokens.length; i++) {
    const tempObj = {};

    if (tokens[i].tokenInfo.price !== false && tokens[i].balance !== 0) {
      tempObj.address = tokens[i].tokenInfo.address;
      tempObj.name = tokens[i].tokenInfo.name;
      tempObj.symbol = tokens[i].tokenInfo.symbol;
      tempObj.USDCurrency = tokens[i].tokenInfo.price.rate;
      tempObj.balance = parseFloat(
        (tokens[i].balance * Math.pow(10, -parseInt(tokens[i].tokenInfo.decimals))).toFixed(3)
      );
      tempObj.sendTokensListItem = true;

      if (tokens[i].tokenInfo.image !== undefined) {
        tempObj.logoURI = `https://ethplorer.io${tokens[i].tokenInfo.image}`;
      } else {
        tempObj.logoURI = null;
      }
      walletTokensList.push(tempObj);
    }
  }

  // let finalWalletTokensList;
  // if (walletTokensList.length > 1) {
  //   finalWalletTokensList = walletTokensList.filter(
  //     (token) => token.symbol !== walletTokensList[0].symbol
  //   );
  // } else {
  //   finalWalletTokensList = walletTokensList;
  // }

  console.log('sagas exchange walletTokensList', walletTokensList);
  // console.log('sagas exchange finalWalletTokensList', finalWalletTokensList);

  yield put(actions.getSendTokensList(walletTokensList));
  yield put(actions.setInitSendTokenSwap(walletTokensList[0]));
  yield put(actions.setInitSendTokenMultiSwap([walletTokensList[0]]));

  yield put(setInitSendMultiSwapTokensListLoading(false));
}

export function* getReceiveTokensListSagaWatcher() {
  yield takeLatest(actionTypes.SET_RECEIVE_TOKENS_LIST, getReceiveTokensListSagaWorker);
}

function* getReceiveTokensListSagaWorker() {
  const zeroAPISwapTokensList = yield call(API.getZeroAPITokensList);
  console.log('sagas zeroAPITokensList', zeroAPISwapTokensList);

  const uniswapFullCoinsList = yield call(API.getUniswapFullCoinsList);
  // console.log('uniswapFullCoinsList sagas', uniswapFullCoinsList);

  // return 429
  // const coinGeckoFullTokensList = yield call(API.getCoinGeckoFullTokensList);
  // console.log('coinGeckoFullTokensList sagas', coinGeckoFullTokensList);

  // const uniswapFullCoinsList = UniSwapTokensList;
  const coinGeckoFullTokensList = CoinGeckoMockTokensList;

  let filteredCoinGeckoTokensList = coinGeckoFullTokensList.filter((walletToken) =>
    zeroAPISwapTokensList.find(
      (zeroToken) =>
        walletToken.symbol === zeroToken.symbol.toLowerCase() &&
        walletToken.name.indexOf('(Wormhole)') === -1
    )
  );

  let finalList = zeroAPISwapTokensList.map((token) => ({
    ...token,
    receiveTokensListItem: true,
    logoURI: uniswapFullCoinsList.tokens.find((x) => x.address === token.address)
      ? uniswapFullCoinsList.tokens.find((x) => x.address === token.address).logoURI
      : null,
    id: filteredCoinGeckoTokensList.find((x) => x.symbol === token.symbol.toLowerCase())
      ? filteredCoinGeckoTokensList.find((x) => x.symbol === token.symbol.toLowerCase()).id
      : null,
    USDCurrency: 0,
  }));

  console.log('sagas filter finalReceiveTokensList', finalList);

  let initReceiveMultiSwapTokensList = [];
  for (let i = 0; i < [finalList[2], finalList[4]].length; i++) {
    initReceiveMultiSwapTokensList.push(
      yield call(API.getTokenUSDAmount, {
        amount: 1,
        tokenData: [finalList[2], finalList[4]][i],
      })
    );
  }

  // console.log('sagas tokenUSDAmount', initReceiveMultiSwapTokensList);
  yield put(actions.getReceiveTokensList(finalList));
  yield put(actions.setInitReceiveFirstTokenSwap(finalList[0]));
  yield put(actions.setInitReceiveMultiSwapTokensList(initReceiveMultiSwapTokensList));
  yield put(setInitReceiveMultiSwapTokensListLoading(false));
}

// old sagas - to count tokens amount convertation (det pending err - left in front-end code)
export function* getInitConvertedExchangeTokensCourseSagaWatcher() {
  yield takeEvery(
    actionTypes.GET_INIT_CONVERTED_EXCHANGE_TOKENS_COURSE,
    getInitConvertedExchangeTokensCourseSagaWorker
  );
}

const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
};

function* getInitConvertedExchangeTokensCourseSagaWorker(data) {
  let convertTokensData = data.payload;

  console.log('convertTokensData data sagas', convertTokensData);

  loadWeb3();
  const web3 = window.web3;

  const tokenDecimal = new web3.eth.Contract(
    TOKENDECIMALSABI,
    convertTokensData.sendTokenForExchangeAddress
  ).methods
    .decimals()
    .call()
    .then((res) => {
      return res;
    });

  console.log('data sagas tokenDecimal', tokenDecimal());

  // const tokenDecimal1 = async () => {
  //   let a = await tokenDecimalsHelper(convertTokensData.sendTokenForExchangeAddress);
  //   return a;
  // };
  // const tokenDecimal2 = async () => {
  //   return await tokenDecimalsHelper(convertTokensData.sendTokenForExchangeAddress);
  // };
  //
  // console.log('data sagas tokenDecimal1', tokenDecimal1());
  // console.log('data sagas tokenDecimal2', tokenDecimal2());

  const NewContract = new web3.eth.Contract(
    ROUTERABI,
    //Sushiswap contract address - should be changed dynamically
    convertTokensData.routerAddress
  );

  console.log('NewContract data sagas', NewContract);

  if (convertTokensData.inputId === 'firstPageLoad') {
    let convertedValue = NewContract.methods
      .getAmountsOut((convertTokensData.tokenAmount * 10 ** tokenDecimal1).toString(), [
        convertTokensData.sendTokenForExchangeAddress,
        convertTokensData.receiveTokenForExchangeAddress,
      ])
      .call();

    let countedTokenAmount = +convertedValue[1] / 10 ** tokenDecimal2;
    console.log('countedTokenAmount data sagas', countedTokenAmount);

    // convertReceiveTokenToUSDCurrency({
    //   amount: countedTokenAmount,
    //   address: convertTokensData.receiveTokenForExchangeAddress,
    // });
  }
  // else if (convertTokensData.inputId === 'chooseSendToken') {
  //   let convertedValue =  NewContract.methods
  //     .getAmountsOut((convertTokensData.tokenAmount * 10 ** tokenDecimal1).toString(), [
  //       convertTokensData.sendTokenForExchangeAddress,
  //       convertTokensData.receiveTokenForExchangeAddress,
  //     ])
  //     .call();
  //
  //   let countedTokenAmount = +convertedValue[1] / 10 ** tokenDecimal2;
  //
  //   setInitConvertReceiveTokenAmount(countedTokenAmount.toFixed(3));
  // }
  //
  // //
  // else if (convertTokensData.inputId === 'sendInput') {
  //   let convertedValue =  NewContract.methods
  //     .getAmountsOut((convertTokensData.tokenAmount * 10 ** tokenDecimal1).toString(), [
  //       convertTokensData.sendTokenForExchangeAddress,
  //       convertTokensData.receiveTokenForExchangeAddress,
  //     ])
  //     .call();
  //
  //   let countedTokenAmount = +convertedValue[1] / 10 ** tokenDecimal2;
  //
  //   setReceiveTokenForExchangeAmount(countedTokenAmount);
  //
  //   convertReceiveTokenToUSDCurrency({
  //     amount: countedTokenAmount,
  //     address: convertTokensData.receiveTokenForExchangeAddress,
  //   });
  // } else if (convertTokensData.inputId === 'receiveInput') {
  //   let convertedValue =  NewContract.methods
  //     .getAmountsOut((convertTokensData.tokenAmount * 10 ** tokenDecimal1).toString(), [
  //       convertTokensData.receiveTokenForExchangeAddress,
  //       convertTokensData.sendTokenForExchangeAddress,
  //     ])
  //     .call();
  //
  //   let countedTokenAmount = +convertedValue[1] / 10 ** tokenDecimal2;
  //
  //   // // console.log('single swap 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', countedTokenAmount);
  //
  //   setSendTokenForExchangeAmount(countedTokenAmount);
  //
  //   convertSendTokenToUSDCurrency({
  //     amount: countedTokenAmount,
  //     address: convertTokensData.receiveTokenForExchangeAddress,
  //     USDCurrency: initSendTokenSwap.USDCurrency,
  //   });
  // }

  yield put('data');
}
