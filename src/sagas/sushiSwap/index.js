import { put, call, select, takeEvery, putResolve } from 'redux-saga/effects';
import * as API from '../../components/LoansAndSavings/api/SushiSwap/sushiSwapAPI';
import * as actions from './actions';
import actionTypes from '../../constants/actionTypes';

export function* getSushiSwapLPSagaWatcher() {
  yield takeEvery(actionTypes.SET_SUSHILP_DATA, sushiSwapLPSagaWorker);
}

//below generator function is used to get the sushistaking lp token data points
//call all the list of api calls from the api.js file
function* sushiSwapLPSagaWorker(sushiSwapObjects) {
  const attributes = sushiSwapObjects.payload;

  const response = yield call(API.getSushiV2SubgraphData, attributes.accountAddress);
  if (response.data.data) {
    if (response.data.data.users[0]) {
      let totalValue = 0;
      const pools = [];
      let token0Data;
      let token1Data;
      try {
        const res = response.data.data.users[0].liquidityPositions;
        for (let i = 0; i < res.length; i++) {
          const object = {};
          //call the below function to get the sushi token image url
          token0Data = yield call(API.getSushiLpTokenImage, res[i].pair.token0.id);
          token1Data = yield call(API.getSushiLpTokenImage, res[i].pair.token1.id);
          //get list of data attributes into the object
          object.token0Image = token0Data.tokenImage;
          object.token0Symbol = res[i].pair.token0.symbol;
          object.token1Image = token1Data.tokenImage;
          object.token1Symbol = res[i].pair.token1.symbol;
          //other attributes
          object.volume = parseFloat(res[i].pair.volumeUSD).toFixed(2);
          object.balance = parseFloat(res[i].liquidityTokenBalance).toFixed(4);
          //object.tokenSupply = parseFloat(res[i].pair.totalSupply).toFixed(2);
          object.value = parseFloat(
            (res[i].liquidityTokenBalance / res[i].pair.totalSupply) * res[i].pair.reserveUSD
          ).toFixed(2);
          object.price = parseFloat(object.value / res[i].liquidityTokenBalance).toFixed(4);
          object.liquidity = parseFloat(res[i].pair.reserveUSD).toFixed(2);
          object.chain = 'Ethereum';
          object.protocol = 'Sushiswap';
          totalValue += parseFloat(object.value);
          //push the value only when value is not zeros (ex:0.00000000..)
          if (parseFloat(object.value) > 0.001) {
            pools.push(object);
          }
        }
        pools.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
        yield put(actions.getSushiSwapLPData(pools));
        yield put(actions.getSushiSwapLPTotalValue(parseFloat(totalValue).toFixed(2)));
      } catch (err) {
        console.log(err);
      }
    }
  }
}
