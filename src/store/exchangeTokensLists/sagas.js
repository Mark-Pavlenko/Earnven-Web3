import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import * as API from '../../api/api';
import actionTypes from '../../constants/actionTypes';
import * as actions from './actions';
import ethImage from '../../assets/icons/eth.png';
import CoinGeckoMockTokensList from './CoinGecko.json';
import { setInitialSendTokenSingleSwap, setInitReceiveFirstTokenSwap } from './actions';

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

    // console.log('sagas tempObj', tempObj);

    walletTokensList.push(tempObj);
  }
  let tokens = addressInfoData.data.tokens;
  // console.log('raw tokens arr of objects sagas', tokens);

  for (let i = 0; i < tokens.length; i++) {
    const tempObj = {};

    if (tokens[i].tokenInfo.price !== false && tokens[i].balance !== 0) {
      // console.log('tokens sagas', tokens[i]);

      tempObj.address = tokens[i].tokenInfo.address;
      tempObj.name = tokens[i].tokenInfo.name;
      tempObj.symbol = tokens[i].tokenInfo.symbol;
      tempObj.USDCurrency = tokens[i].tokenInfo.price.rate;
      // tempObj.balance = parseFloat(tokens[i].balance.toFixed(3));
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

  // console.log('sagas walletTokensList', walletTokensList);

  // const sendTokensList = walletTokensList.filter((walletToken) =>
  //   zeroAPISwapTokensList.find((zeroToken) => walletToken.symbol === zeroToken.symbol)
  // );
  //
  // console.log('sagas sendTokensList', sendTokensList);

  yield put(actions.getSendTokensList(walletTokensList));
  yield put(actions.setInitSendTokenSwap(walletTokensList[17]));
  // yield put(actions.getSendTokensList(walletTokensList));
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
  const coinGeckoFullTokensList = yield call(API.getCoinGeckoFullTokensList);
  console.log('coinGeckoFullTokensList sagas', coinGeckoFullTokensList);

  let filteredCoinGeckoTokensList = coinGeckoFullTokensList.filter((walletToken) =>
    zeroAPISwapTokensList.find(
      (zeroToken) =>
        walletToken.symbol === zeroToken.symbol.toLowerCase() &&
        walletToken.name.indexOf('(Wormhole)') === -1
    )
  );

  console.log('sagas filteredCoinGeckoTokensList', filteredCoinGeckoTokensList);

  let finalList = zeroAPISwapTokensList.map((token) => ({
    ...token,
    receiveTokensListItem: true,
    logoURI: uniswapFullCoinsList.tokens.find((x) => x.address === token.address)
      ? uniswapFullCoinsList.tokens.find((x) => x.address === token.address).logoURI
      : null,
    id: filteredCoinGeckoTokensList.find((x) => x.symbol === token.symbol.toLowerCase())
      ? filteredCoinGeckoTokensList.find((x) => x.symbol === token.symbol.toLowerCase()).id
      : null,
  }));

  // console.log('finalList sagas', finalList);

  // const getCoinGeckoTokenUSDCurrency = yield call(API.getCoinGeckoTokenUSDCurrency);
  // console.log('getCoinGeckoTokenUSDCurrency sagas', getCoinGeckoTokenUSDCurrency);

  yield put(actions.getReceiveTokensList(finalList));
  yield put(actions.setInitReceiveFirstTokenSwap(finalList[4]));
}
