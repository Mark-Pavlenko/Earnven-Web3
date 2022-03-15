import { put, call, select, takeEvery, takeLatest, putResolve } from 'redux-saga/effects';
import * as API from '../../components/LoansAndSavings/api/curve/curveApi';
import * as actions from './actions';
import actionTypes from '../../constants/actionTypes';
import CuveLpTokenList from '../../contractAddress/CurveLpTokenAddressList';

export function* getCurveLPTokenSagaWatcher() {
  yield takeEvery(actionTypes.SET_CRVLP_TOKEN_DATA, curveLPTokenSagaWorker);
}

function* curveLPTokenSagaWorker(curveLpTokenAttributes) {
  const curveLPTokenParams = curveLpTokenAttributes.payload;

  let curveLpDataPoint = [];
  let cuveLpTokenName;
  let tokenPrice = 0;
  let staking = [];
  let curveLpTokenTotalValue = 0;
  //call the getUserInfo function to get user holds respetive tokens
  let data = yield call(API.getAddressInfo, curveLPTokenParams.accountAddress);
  if (data.tokens != undefined) {
    for (let i = 0; i < data.tokens.length; i++) {
      const curveLpData = data.tokens[i];
      const tokenAddress = curveLpData.tokenInfo.address.toUpperCase();
      if (CuveLpTokenList.indexOf(tokenAddress) != -1) {
        let object = {};
        curveLpDataPoint = yield call(
          API.getCurveLpData,
          curveLPTokenParams.accountAddress,
          tokenAddress,
          curveLPTokenParams.web3
        );
        cuveLpTokenName = curveLpDataPoint.curveLpTokenName.replace('Curve.fi ', '');
        //get the token market usd price from coingecko API
        const tokenData = yield call(API.getCoingeckoAPIData, tokenAddress, cuveLpTokenName);
        if (tokenData) {
          //assign the receiving token price into local variable
          tokenPrice = tokenData.data.market_data.current_price.usd;
        }
        //if tokenPrice is not get from coingecko then use the lptoken virtual price
        if (tokenPrice == 0) {
          tokenPrice = curveLpDataPoint.curveLpTokenPrice;
        }
        object.tokenName = cuveLpTokenName;
        object.balance = curveLpDataPoint.curveLpTokenBalance / 10 ** 18;
        object.value = (curveLpDataPoint.curveLpTokenBalance / 10 ** 18) * tokenPrice;
        object.price = tokenPrice;
        object.chain = 'Ethereum';
        object.protocol = 'Curve';
        object.liquidity = parseFloat(
          (curveLpDataPoint.curveLpTokenLiquidity / 10 ** 18) * tokenPrice
        ).toFixed(2);
        //object.liquidity = (curveLpDataPoint.curveLpTokenLiquidity / 10 ** 18) * tokenPrice;
        object.symbol = curveLpDataPoint.curveLpTokenSymbol;
        curveLpTokenTotalValue += object.value;

        if (object.value > 0.001) {
          staking.push(object);
        }
      }
    } //end of for loop
  }
  // setCurveLpTokenTotal(parseFloat(curveLpTokenTotalValue).toFixed(2));
  // setCurveLpTokenData(staking);
  if (staking.length > 0) {
    yield put(actions.getCurveLPTokenData(staking));
    yield put(actions.getCurveLPTokenTotal(parseFloat(curveLpTokenTotalValue).toFixed(2)));
  }
  yield put(actions.setCurveLPTokenIsLoading(false));
}
