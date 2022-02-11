import { put, call, select, takeEvery, putResolve } from 'redux-saga/effects';
import * as API from '../../components/LoansAndSavings/api/api';
import * as actions from './actions';
import actionTypes from '../../constants/actionTypes';
import yearnTokensAddress from '../../contractAddress/yearnTokensAddressList';

export function* getYearnFinanceSagaWatcher() {
  yield takeEvery(actionTypes.SET_YFI_TOKEN_DATA, yearnFinanceSagaWorker);
  yield takeEvery(actionTypes.SET_YTOKEN_DATA, yearnFinanceYTokenSagaWorker);
}

//below generator function is used to get the sushistaking lp token data points
//call all the list of api calls from the api.js file
function* yearnFinanceSagaWorker(yearnAccountAddress) {
  const yearnUserAccount = yearnAccountAddress.payload;
  //accountAddress
  console.log('TestPrabhaYToken account from saga', yearnUserAccount.accountAddress);
  //below API call is used to get yVault tokens based on the listed yVault tokens
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
            object.symbol = result.data[j].token.display_name;
            object.tokenImage = result.data[j].token.icon;
            object.tokenDecimal = res[i].vault.shareToken.decimals;
            object.balance =
              parseFloat(res[i].balanceShares).toFixed(2) / 10 ** object.tokenDecimal;
            object.price = parseFloat(result.data[j].tvl.price).toFixed(2);
            object.value = parseFloat(object.balance * object.price).toFixed(2);
            object.liquidity = parseFloat(result.data[j].tvl.tvl).toFixed(2);
            object.apy = result.data[j].apy.net_apy * 100;
            object.chain = 'Ethereum';
            object.protocol = 'Yearn';
            totalValue += parseFloat(object.value);
            yearnDataArray.push(object);
          }
        }
      } //end of fist for loop
    } //enod of 2nd for loop

    yield put(actions.getYearnFinaceTokenData(yearnDataArray));
    yield put(actions.getYearnFinanceTokenTotal(parseFloat(totalValue).toFixed(2)));

    // yield put(
    //   actions.getYearnFinanceTokenTotal(parseFloat(totalValue.toFixed(2)).toLocaleString())
    // );
    //yield put(actions.getYearnFinaceData('Prabha Testing'));
    //yield put(actions.getYearnFinanceTokenTotal(100));
    //console.log('TestPrabhaYToken YearnFinance components data ', yearnDataArray);
  }
  //below API call is used to get yTokens (yUSDC, yUSDT etc..) based on the listed yTokens from the address list
}

//---------------------YToken process--------------------------
//below generator function is used to get the yearn Finance yToken data  points
//call all the list of api calls from the api.js file
function* yearnFinanceYTokenSagaWorker(yearnTokenAttributes) {
  const yTokenUserAccount = yearnTokenAttributes.payload;
  let yearnTokenDataPoint = [];
  //let yearnTokenName;
  let yearnTokenPrice = 0;
  let yearnTokenImageUrl;
  let yearnTokenDataSet = [];
  let yearnTokenTotalValue = 0;
  const response = yield call(API.getUserAccountInfo, yTokenUserAccount.accountAddress);
  const data = response.data;

  if (response.data) {
    for (let i = 0; i < data.tokens.length; i++) {
      const yearnTokenData = data.tokens[i];
      const tokenAddress = yearnTokenData.tokenInfo.address.toLowerCase();
      //console.log('TestYtoken data', tokenAddress);
      if (yearnTokensAddress.indexOf(tokenAddress) != -1) {
        let object = {};

        yearnTokenDataPoint = yield call(
          API.getYearnTokenData,
          yTokenUserAccount.accountAddress,
          tokenAddress,
          yTokenUserAccount.web3
        );

        const yearnTokenDataPrice = yield call(
          API.getYearnTokenPrice,
          yearnTokenDataPoint.yTokenUnderlyingToken
        );

        //console.log('TestYToken yearnTokenDataPrice', yearnTokenDataPrice);
        yearnTokenPrice = yearnTokenDataPrice.data.market_data.current_price.usd;
        yearnTokenImageUrl = yearnTokenDataPrice.data.image.thumb;

        if (yearnTokenDataPoint) {
          object.yTokenBalance = yearnTokenDataPoint.yTokenBalance;
          object.yTokenDecimals = yearnTokenDataPoint.yTokenDecimals;
          let yTokenBalanceValue = object.yTokenBalance / 10 ** object.yTokenDecimals;
          object.balance =
            parseInt(yTokenBalanceValue.toString().split('e-')[1]) > 0 ? 0 : yTokenBalanceValue;
          object.yUnderlyingToken = yearnTokenDataPoint.yTokenUnderlyingToken;
          object.price = yearnTokenPrice;
          object.tokenImage = yearnTokenImageUrl;
          //object.yTokenValue = yTokenValue;
          object.value = parseFloat(object.balance * object.price).toFixed(2);
          object.tokenName = yearnTokenDataPoint.yTokenName;
          object.symbol = yearnTokenDataPoint.yTokenSymbol;
          object.chain = 'Ethereum';
          object.protocol = 'Yearn';

          if (parseFloat(object.value) > 0) {
            yearnTokenTotalValue += parseFloat(object.value);
            yearnTokenDataSet.push(object);
          }
        }
        //}
      }
    } //end of for loop
    // console.log('TestPrabhaYToken yearnTokenPrice', yearnTokenDataSet);
    // console.log('TestPrabhaYToken yearnTokenTotalValue', yearnTokenTotalValue);
    yield put(actions.getYTokenData(yearnTokenDataSet));
    yield put(actions.getYTokenTotal(parseFloat(yearnTokenTotalValue).toFixed(2)));
  }
  //yield put(actions.getYTokenData('Prabha testing YToken Data'));
}
