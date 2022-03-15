import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import * as API from '../../api/api';
import actionTypes from '../../constants/actionTypes';
import * as actions from './actions';
import {
  getInitTokenWithUSDCurrencyAmount,
  setInitReceiveMultiSwapTokensListLoading,
  setInitSendMultiSwapTokensListLoading,
} from './actions';
import ethImage from '../../assets/icons/eth.png';
import CoinGeckoMockTokensList from './CoinGecko.json';

const initReceiveMultiSwapTokensList = (state) =>
  state.tokensListReducer.initReceiveMultiSwapTokensList;

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
    tempObj.USDCurrency = 0;
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
      tempObj.USDCurrency = 0;
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
        amount: 0,
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

// unused - redux doesn`t return object by the first time
// export function* getInitUSDCurrencyAmountSagaWatcher() {
//   yield takeEvery(
//     actionTypes.GET_INIT_USD_CURRENCY_TOKEN_AMOUNT,
//     getInitUSDCurrencyAmountSagaWorker
//   );
// }
//
// function* getInitUSDCurrencyAmountSagaWorker(data) {
//   console.log('data.payload', data.payload);
//
//   let receiveTokenUSDCurrencyObject = yield call(API.getTokenUSDAmount, data.payload);
//   console.log('USDCurrencyAmountTokensData tokenUSDCurrency', receiveTokenUSDCurrencyObject);
//
//   yield put(actions.getInitTokenWithUSDCurrencyAmount(receiveTokenUSDCurrencyObject));
//   // let receiveTokensListCopy = [...(yield select(initReceiveMultiSwapTokensList))];
//   // console.log('receiveTokensListCopy sagas', receiveTokensListCopy);
//   //
//   // const needIndex = receiveTokensListCopy.findIndex(
//   //   (token) => token.address === receiveTokenUSDCurrencyObject.address
//   // );
//
//   // if (needIndex !== -1) {
//   //   receiveTokensListCopy[needIndex].USDCurrency = receiveTokenUSDCurrencyObject.USDCurrency;
//   // }
//   //
//   // console.log('receiveTokensListCopy sagas total', receiveTokensListCopy);
//   // yield put(actions.setInitReceiveMultiSwapTokensList(receiveTokensListCopy));
//   // yield put('data');
// }
