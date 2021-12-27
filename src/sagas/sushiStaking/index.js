import { put, call, select, takeEvery, putResolve } from 'redux-saga/effects';
import * as API from '../../components/LoansAndSavings/api/api';
import * as actions from './actions';
import actionTypes from '../../constants/actionTypes';

export function* getSushiStakeSagaWatcher() {
  yield takeEvery(actionTypes.GET_SLP_STAKE_DATA, sushiStakeSagaWorker);
}

//below generator function is used to get the sushistaking lp token data points
//call all the list of api calls from the api.js file
function* sushiStakeSagaWorker(sushiStakingObjects) {
  const attributes = sushiStakingObjects.payload;

  const response = yield call(API.getSushiStakedUserData, attributes.accountAddress);

  if (response.data.data) {
    const res = response.data.data;

    const amount = [];
    const poolId = [];
    let sushiStaking = [];
    let slpTokenVolume = 0;
    let slpTokenLiquidity = 0;
    let sushiStakingtTotalValue = 0;
    for (var i = 0; i < res.users.length; i++) {
      let object = {};
      //store this balanceOf amount for each pair in the arrayOf value as object
      amount[i] = response.data.data.users[i].amount;
      poolId[i] = response.data.data.users[i].pool.pair;

      //api created with getSushiPoolData with argument of poolId
      const pairResponse = yield call(API.getSushiPoolData, poolId[i]);
      if (pairResponse) {
        const pairData = pairResponse.data.data.pairs;

        const SLPToken0ImageUrl = yield call(API.getTokenImage, pairData[0].token0.id);
        const SLPToken1ImageUrl = yield call(API.getTokenImage, pairData[0].token1.id);

        //get the volume and liquidity value of the sushi lp token
        //api created with name getSushiLpTokenData three args token0,token1 and epoc time

        let SLPTokenData = yield call(
          API.getSushiLpTokenData,
          pairData[0].token0.id,
          pairData[0].token1.id,
          attributes.epocDate
        );

        //get the value if sushi lp token data is available
        if (SLPTokenData) {
          slpTokenVolume = SLPTokenData.pairDayDatas[0].volumeUSD;
          slpTokenLiquidity = SLPTokenData.pairs[0].reserveUSD;
        }

        const sushiStakeAmount = parseInt(amount[i]) / 10 ** 18;

        const sushiTokenPrice = pairData[0].reserveUSD / pairData[0].totalSupply;

        object.sushiLpTokenSymbol = pairData[0].name;
        object.sushiLpTokenBalance = sushiStakeAmount;
        object.sushiLpTokenPrice = parseFloat(sushiTokenPrice).toFixed(2);
        object.sushiLpTokenValue = parseFloat(
          object.sushiLpTokenBalance * object.sushiLpTokenPrice
        ).toFixed(2);
        object.sushiLpTokenVolume = parseFloat(slpTokenVolume).toFixed(2);
        object.sushiLpTokenLiquidity = parseInt(slpTokenLiquidity).toFixed(2);
        object.sushiLPToken0ImageUrl = SLPToken0ImageUrl.data.image.thumb;
        object.sushiLPToken1ImageUrl = SLPToken1ImageUrl.data.image.thumb;
        object.sushiLpProtocol = 'Ethereum';
        object.sushiLpChain = 'SushiSwap';

        sushiStakingtTotalValue += parseFloat(object.sushiLpTokenValue);
        sushiStaking.push(object);
      }
    } //end of for loop

    yield put(actions.getSushiStakeData(sushiStaking));
    yield put(actions.getSushiStakeTotalValue(sushiStakingtTotalValue));
  }
}
