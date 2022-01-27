import { put, call, select, takeEvery, putResolve } from 'redux-saga/effects';
import * as API from '../../components/LoansAndSavings/api/api';
import * as actions from './actions';
import actionTypes from '../../constants/actionTypes';
import yearnTokensAddress from '../../contractAddress/yearnTokensAddressList';
import BigNumber from 'bignumber.js';

export function* getYearnFinanceSagaWatcher() {
  yield takeEvery(actionTypes.SET_YFI_TOKEN_DATA, yearnFinanceSagaWorker);
  yield takeEvery(actionTypes.SET_YTOKEN_DATA, yearnFinanceYTokenSagaWorker);
}

//below generator function is used to get the sushistaking lp token data points
//call all the list of api calls from the api.js file
function* yearnFinanceSagaWorker(yearnAccountAddress) {
  const yearnUserAccount = yearnAccountAddress.payload;
  //accountAddress

  //below API call is used to get yVault tokens based on the listed yVault tokens
  const response = yield call(API.getYearnUserData, yearnUserAccount.accountAddress);

  if (response.data.data) {
    const res = response.data.data.accountVaultPositions;
    const yearnDataArray = [];
    let tot = 0;
    let totalValue = 0;

    const result = yield call(API.getYearnData);

    for (var i = 0; i < res.length; i++) {
      //implement blelow logic to use yearnFinance API call

      //look for the vault address that uaerAccount holds
      for (let j = 0; j < result.data.length; j++) {
        //for (var j = 0; j < res.length; j++) {
        const object = {};

        if (result.data[j].address.toLowerCase() === res[i].vault.shareToken.id.toLowerCase()) {
          if (result.data[j].token.address.toLowerCase() === res[i].vault.token.id.toLowerCase()) {
            object.tokenDecimal = res[i].vault.shareToken.decimals;
            // console.log('balanceShares', res[i].balanceShares);
            //
            // const getExponentValue = (decimals) => {
            //   return new BigNumber(10).pow(decimals);
            // };
            // const getHumanValue = (value, decimals) => {
            //   return new BigNumber(value).div(getExponentValue(decimals));
            // };
            // console.log(
            //   'getHumanValue',
            //   getHumanValue(res[i].balanceShares, object.tokenDecimal).toString()
            // );

            object.tokens = [
              {
                symbol: result.data[j].token.display_name,
                balance: parseFloat(res[i].balanceShares).toFixed(2) / 10 ** object.tokenDecimal,
              },
            ];
            object.imageData = [result.data[j].token.icon];
            object.totalTokensBalance =
              parseFloat(res[i].balanceShares).toFixed(2) / 10 ** object.tokenDecimal;
            object.tokenPrice = result.data[j].tvl.price;
            console.log('xcxcxc', object.totalTokensBalance);
            console.log('xcxcxc', object.tokenPrice);
            object.tokenValue = parseFloat(object.totalTokensBalance * object.tokenPrice).toFixed(
              2
            );
            object.liquidity = parseFloat(result.data[j].tvl.tvl).toFixed(2);
            object.apy = result.data[j].apy.net_apy * 100;
            object.chain = 'Ethereum';
            object.protocol = 'Yearn';
            totalValue += parseFloat(object.totalTokensBalance);
            yearnDataArray.push(object);
          }
        }
      } //end of fist for loop
    } //enod of 2nd for loop

    yield put(actions.getYearnFinaceTokenData(yearnDataArray));
    yield put(actions.getYearnFinanceTokenTotal(totalValue));
  }
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

        yearnTokenPrice = yearnTokenDataPrice.data.market_data.current_price.usd;
        yearnTokenImageUrl = yearnTokenDataPrice.data.image.thumb;

        if (yearnTokenDataPoint) {
          // object.balance = yearnTokenDataPoint.yTokenBalance;
          object.yTokenDecimals = yearnTokenDataPoint.yTokenDecimals;
          let balanceValue = yearnTokenDataPoint.yTokenBalance / 10 ** object.yTokenDecimals;
          object.balanceValue =
            parseInt(balanceValue.toString().split('e-')[1]) > 0 ? 0 : balanceValue;
          object.yUnderlyingToken = yearnTokenDataPoint.yTokenUnderlyingToken;
          object.price = yearnTokenPrice;
          object.imageData = [yearnTokenImageUrl];
          object.totalValue = parseFloat(object.balanceValue * object.price).toFixed(2);
          object.yTokenName = yearnTokenDataPoint.yTokenName;
          object.tokenName = yearnTokenDataPoint.yTokenSymbol;
          object.chain = 'Ethereum';
          object.protocol = 'Yearn';

          if (parseFloat(object.totalValue) > 0) {
            yearnTokenTotalValue += parseFloat(object.totalValue);
            yearnTokenDataSet.push(object);
          }
        }
      }
    } //end of for loop

    yield put(actions.getYTokenData(yearnTokenDataSet));
    yield put(actions.getYTokenTotal(yearnTokenTotalValue));
  }
}
