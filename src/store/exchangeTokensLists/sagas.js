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
import uniswapV2ExchangerIcon from '../../assets/icons/exchangers/uniswapV2ExchangerIcon.svg';
import TOKENDECIMALSABI from '../../abi/TokenDecomals.json';
import Web3 from 'web3';

const initReceiveMultiSwapTokensList = (state) =>
  state.tokensListReducer.initReceiveMultiSwapTokensList;

export function* getSendTokensListSagaWatcher() {
  yield takeLatest(actionTypes.SET_SEND_TOKENS_LIST, getSendTokensListSagaWorker);
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

function* getSendTokensListSagaWorker(accountAddress) {
  loadWeb3();
  const web3 = window.web3;

  const addressInfoData = yield call(API.getAddressInfo, accountAddress.payload);
  console.log('only addressInfoData sagas init data', addressInfoData.data);

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
    // tempObj.USDCurrency = Math.round(addressInfoData.data.ETH.price.rate * 100) / 100;
    tempObj.USDCurrency = 0;
    tempObj.singleTokenUSDCurrencyAmount = Number(addressInfoData.data.ETH.price.rate);
    tempObj.sendTokensListItem = true;
    // tempObj.isExchangeIsAllowed = false;
    //mock exchanger
    tempObj.chosenExchanger = {
      name: 'Uniswap_V2',
      routerAddress: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
      isBestRate: true,
      logoIcon: uniswapV2ExchangerIcon,
      isExchangerSelected: true,
    };
    walletTokensList.push(tempObj);
  }

  let tokens = addressInfoData.data.tokens;

  for (let i = 0; i < tokens.length; i++) {
    const tempObj = {};
    //----

    //----
    if (tokens[i].tokenInfo.price !== false && tokens[i].balance !== 0) {
      tempObj.address = tokens[i].tokenInfo.address;
      tempObj.name = tokens[i].tokenInfo.name;
      tempObj.symbol = tokens[i].tokenInfo.symbol;
      // tempObj.USDCurrency = tokens[i].tokenInfo.price.rate.toFixed(5);
      tempObj.USDCurrency = 0;
      tempObj.balance = tokens[i].balance;
      tempObj.singleTokenUSDCurrencyAmount = Number(tokens[i].tokenInfo.price.rate);
      tempObj.sendTokensListItem = true;
      if (tokens[i].tokenInfo.image !== undefined) {
        tempObj.logoURI = `https://ethplorer.io${tokens[i].tokenInfo.image}`;
      } else {
        tempObj.logoURI = null;
      }
      tempObj.chosenExchanger = {
        name: 'Uniswap_V2',
        routerAddress: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
        isBestRate: true,
        logoIcon: uniswapV2ExchangerIcon,
        isExchangerSelected: true,
      };
      walletTokensList.push(tempObj);
    }
  }

  let filteredZeroBalanceTokensList = [];
  walletTokensList.filter((token) => {
    if (
      Number(token.balance) !== 0 &&
      token.address !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
    ) {
      new web3.eth.Contract(TOKENDECIMALSABI, token.address).methods
        .decimals()
        .call()
        .then((tokenDecimals) => {
          let formattedTokenBalanceValue = (+token.balance / 10 ** tokenDecimals).toString();

          if (formattedTokenBalanceValue.includes('e')) {
            // console.log('only addressInfoData sagas pop split', {
            //   address: token.address,
            //   decimals:
            //     formattedTokenBalanceValue.split('e')[0].slice(0, 7) +
            //     'e' +
            //     formattedTokenBalanceValue.split('e')[1],
            // });

            filteredZeroBalanceTokensList.push({
              ...token,
              balance:
                formattedTokenBalanceValue.split('e')[0].slice(0, 7) +
                'e' +
                formattedTokenBalanceValue.split('e')[1],
            });
          } else {
            filteredZeroBalanceTokensList.push({
              ...token,
              balance: Number(formattedTokenBalanceValue.slice(0, 7)),
            });
          }
        });
    } else if (Number(token.balance) !== 0) {
      filteredZeroBalanceTokensList.push(token);
    }
  });

  console.log(
    'only addressInfoData sagas filteredZeroBalanceTokensList',
    filteredZeroBalanceTokensList
  );

  yield put(actions.getSendTokensList(filteredZeroBalanceTokensList));
  yield put(actions.setInitSendTokenSwap(filteredZeroBalanceTokensList[0]));
  yield put(
    actions.setInitSendTokenMultiSwap([
      { ...walletTokensList[0], amount: 0 },
      // { ...walletTokensList[1], amount: 0 },
    ])
  );

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
    amount: 0,
    isExchangeIsAllowed: false,
    //mock exchanger
    chosenExchanger: {
      name: 'Uniswap_V2',
      routerAddress: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
      isBestRate: true,
      logoIcon: uniswapV2ExchangerIcon,
      isExchangerSelected: true,
    },
  }));

  console.log('sagas filter finalReceiveTokensList', finalList);

  let initReceiveMultiSwapTokensList = [];
  for (let i = 0; i < [finalList[2], finalList[4]].length; i++) {
    initReceiveMultiSwapTokensList.push(
      yield call(API.getTokenUSDAmount, {
        tokenData: [finalList[2], finalList[4]][i],
        amount: 0,
      })
    );
  }

  // console.log('sagas tokenUSDAmount', initReceiveMultiSwapTokensList);
  yield put(actions.getReceiveTokensList(finalList));
  yield put(actions.setInitReceiveFirstTokenSwap(finalList[1]));
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
