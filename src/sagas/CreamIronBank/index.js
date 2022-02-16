import { put, call, select, takeEvery, takeLatest, putResolve } from 'redux-saga/effects';
import * as API from '../../components/LoansAndSavings/api/CreamIronBank/CreamIronBankAPI';
import * as actions from './actions';
import actionTypes from '../../constants/actionTypes';
import CuveLpTokenList from '../../contractAddress/CurveLpTokenAddressList';
import CreamIronBankContract from '../../abi/CreamIronBank.json';
import Addresses from '../../contractAddresses';
import ApiUrl from '../../apiUrls';

export function* getCreamIronTokenSagaWatcher() {
  yield takeEvery(actionTypes.SET_CREAM_IRON_DATA, creamIronTokenSagaWorker);
}

function* creamIronTokenSagaWorker(creamIronAttributes) {
  const creamIronParams = creamIronAttributes.payload;
  let creamTokenData = [];
  let CreamTokenTotal = 0;
  let data = [];
  console.log('TestCream from saga');

  // USDT
  creamTokenData[0] = yield call(
    API.getCreamData,
    creamIronParams.accountAddress,
    CreamIronBankContract,
    Addresses.CreamCRUSDT,
    ApiUrl.USDT,
    creamIronParams.web3
  );
  // DAI
  creamTokenData[1] = yield call(
    API.getCreamData,
    creamIronParams.accountAddress,
    CreamIronBankContract,
    Addresses.CreamCRDAI,
    ApiUrl.DAI,
    creamIronParams.web3
  );
  // USDC
  creamTokenData[2] = yield call(
    API.getCreamData,
    creamIronParams.accountAddress,
    CreamIronBankContract,
    Addresses.CreamCRUSDC,
    ApiUrl.USDC,
    creamIronParams.web3
  );
  // WETH
  creamTokenData[3] = yield call(
    API.getCreamData,
    creamIronParams.accountAddress,
    CreamIronBankContract,
    Addresses.CreamCWETH,
    ApiUrl.ETH,
    creamIronParams.web3
  );
  // LINK
  creamTokenData[4] = yield call(
    API.getCreamData,
    creamIronParams.accountAddress,
    CreamIronBankContract,
    Addresses.CreamCLINK,
    ApiUrl.LINK,
    creamIronParams.web3
  );
  // CRV
  creamTokenData[5] = yield call(
    API.getCreamData,
    creamIronParams.accountAddress,
    CreamIronBankContract,
    Addresses.CreamCCRV,
    ApiUrl.CRV,
    creamIronParams.web3
  );
  // CREAM
  creamTokenData[6] = yield call(
    API.getCreamData,
    creamIronParams.accountAddress,
    CreamIronBankContract,
    Addresses.CreamCCream,
    ApiUrl.CREAM,
    creamIronParams.web3
  );
  // UNI
  creamTokenData[7] = yield call(
    API.getCreamData,
    creamIronParams.accountAddress,
    CreamIronBankContract,
    Addresses.CreamCUNI,
    ApiUrl.UNI,
    creamIronParams.web3
  );
  // SUSHI
  creamTokenData[8] = yield call(
    API.getCreamData,
    creamIronParams.accountAddress,
    CreamIronBankContract,
    Addresses.CreamCSUSHI,
    ApiUrl.SUSHI,
    creamIronParams.web3
  );
  // YFI
  creamTokenData[9] = yield call(
    API.getCreamData,
    creamIronParams.accountAddress,
    CreamIronBankContract,
    Addresses.CreamCYFI,
    ApiUrl.YFI,
    creamIronParams.web3
  );
  // SNX
  creamTokenData[10] = yield call(
    API.getCreamData,
    creamIronParams.accountAddress,
    CreamIronBankContract,
    Addresses.CreamCSNX,
    ApiUrl.SNX,
    creamIronParams.web3
  );
  // WBTC
  creamTokenData[11] = yield call(
    API.getCreamData,
    creamIronParams.accountAddress,
    CreamIronBankContract,
    Addresses.CreamCWBTC,
    ApiUrl.WBTC,
    creamIronParams.web3
  );
  // SUSD
  creamTokenData[12] = yield call(
    API.getCreamData,
    creamIronParams.accountAddress,
    CreamIronBankContract,
    Addresses.CreamCSUSD,
    ApiUrl.SUSD,
    creamIronParams.web3
  );
  // MUSD
  creamTokenData[13] = yield call(
    API.getCreamData,
    creamIronParams.accountAddress,
    CreamIronBankContract,
    Addresses.CreamCMUSD,
    ApiUrl.MUSD,
    creamIronParams.web3
  );
  // EURS
  creamTokenData[14] = yield call(
    API.getCreamData,
    creamIronParams.accountAddress,
    CreamIronBankContract,
    Addresses.CreamCEURS,
    ApiUrl.EURS,
    creamIronParams.web3
  );
  // SEUR
  creamTokenData[15] = yield call(
    API.getCreamData,
    creamIronParams.accountAddress,
    CreamIronBankContract,
    Addresses.CreamCSEUR,
    ApiUrl.SEUR,
    creamIronParams.web3
  );
  // DPI
  creamTokenData[16] = yield call(
    API.getCreamData,
    creamIronParams.accountAddress,
    CreamIronBankContract,
    Addresses.CreamCDPI,
    ApiUrl.DPI,
    creamIronParams.web3
  );
  // AAVE
  creamTokenData[17] = yield call(
    API.getCreamData,
    creamIronParams.accountAddress,
    CreamIronBankContract,
    Addresses.CreamCAAVE,
    ApiUrl.AAVE,
    creamIronParams.web3
  );
  // MIM
  creamTokenData[18] = yield call(
    API.getCreamData,
    creamIronParams.accountAddress,
    CreamIronBankContract,
    Addresses.CreamCMIM,
    ApiUrl.MIM,
    creamIronParams.web3
  );

  if (creamTokenData.length > 0) {
    for (let i = 0; i < creamTokenData.length; i++) {
      if (creamTokenData[i].value > 0) {
        data.push(creamTokenData[i]);

        CreamTokenTotal += parseFloat(
          parseFloat(creamTokenData[i].value ? creamTokenData[i].value : 0)
        );
      }
    } //end of for loop
    yield put(actions.getCreamIronTokenData(data));
    yield put(actions.getCreamIronTokenTotal(CreamTokenTotal));
  }
}
