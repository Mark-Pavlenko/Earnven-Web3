import { put, call, select, takeEvery, putResolve } from 'redux-saga/effects';
import * as API from '../../components/LoansAndSavings/api/api';
import * as actions from './actions';
import actionTypes from '../../constants/actionTypes';

export function* getYearnFinanceSagaWatcher() {
  yield takeEvery(actionTypes.SET_YFI_TOKEN_DATA, yearnFinanceSagaWorker);
}

//below generator function is used to get the sushistaking lp token data points
//call all the list of api calls from the api.js file
function* yearnFinanceSagaWorker(yearnAccountAddress) {
  const yearnUserAccount = yearnAccountAddress.payload;
  //accountAddress
  console.log('TestYearn account from saga', yearnUserAccount.accountAddress);

  const response = yield call(API.getYearnUserData, yearnUserAccount.accountAddress);

  if (response.data.data) {
    const res = response.data.data.accountVaultPositions;
    const yearnDataArray = [];
    let tot = 0;
    let totalValue = 0;
    //console.log('TestYearn getyearndUsersData', res);
    const result = yield call(API.getYearnData);
    //console.log('TestYearn getYearnData', result);

    for (var i = 0; i < res.length; i++) {
      //implement blelow logic to use yearnFinance API call
      //console.log('TestYearn full api data', response.data);
      //look for the vault address that uaerAccount holds
      for (let j = 0; j < result.data.length; j++) {
        //for (var j = 0; j < res.length; j++) {
        const object = {};
        // console.log('TestYearn Vault address', result.data[j].address);
        // console.log('TestYearn incoming user vault address', res[i].vault.shareToken.id);
        if (result.data[j].address.toLowerCase() === res[i].vault.shareToken.id.toLowerCase()) {
          // console.log('TestYearn Valut address for the user', result.data[j].address);
          if (result.data[j].token.address.toLowerCase() === res[i].vault.token.id.toLowerCase()) {
            // console.log(
            //   'TestYearn underlying token information',
            //   result.data[j].token.address
            // );
            //console.log('TestYearn underlying token data attibutes', result.data[j].token);
            object.tokenName = result.data[j].token.display_name;
            object.tokenImageUrl = result.data[j].token.icon;
            object.tokenDecimal = res[i].vault.shareToken.decimals;
            object.tokenBalance =
              parseFloat(res[i].balanceShares).toFixed(2) / 10 ** object.tokenDecimal;
            object.tokenPrice = parseFloat(result.data[j].tvl.price).toFixed(2);
            object.tokenValue = parseFloat(object.tokenBalance * object.tokenPrice).toFixed(2);
            object.liquidity = parseFloat(result.data[j].tvl.tvl).toFixed(2);
            object.apy = result.data[j].apy.net_apy * 100;
            object.chain = 'Ethereum';
            object.protocol = 'Yearn';
            totalValue += parseFloat(object.tokenValue);
            yearnDataArray.push(object);
          }
        }
      } //end of fist for loop
    } //enod of 2nd for loop

    yield put(actions.getYearnFinaceTokenData(yearnDataArray));
    yield put(
      actions.getYearnFinanceTokenTotal(parseFloat(totalValue.toFixed(2)).toLocaleString())
    );
    //yield put(actions.getYearnFinaceData('Prabha Testing'));
    //yield put(actions.getYearnFinanceTokenTotal(100));
    console.log('TestYearn YearnFinance components data ', yearnDataArray);
  }
  // yield put(actions.getYearnFinaceTokenData('Prabha Testing'));
  // yield put(actions.getYearnFinanceTokenTotal(100));
}
