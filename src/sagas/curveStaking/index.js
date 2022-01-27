import { put, call, select, takeEvery, putResolve } from 'redux-saga/effects';
import * as API from '../../components/LoansAndSavings/api/curve/curveApi';
import * as actions from './actions';
import actionTypes from '../../constants/actionTypes';

export function* getCurveStakingSagaWatcher() {
  yield takeEvery(actionTypes.SET_CRV_STKCLM_DATA, curveStakingClaimDataSagaWorker);
}

//---------------------Curve Staking and claimable process--------------------------
//below generator function is used to get the yearn Finance yToken data  points
//call all the list of api calls from the api.js file
function* curveStakingClaimDataSagaWorker(curveStakingAttributes) {
  const curveStakingParams = curveStakingAttributes.payload;
  //call the subgraph query to get curve staking data from this call
  const curveFarmingData = yield call(
    API.getCrvFarmingGraphData,
    curveStakingParams.accountAddress
  );

  if (curveFarmingData.data.data.accounts[0]) {
    let crvStakingArrayOfData = [];
    let crvStakingTotalValue = 0;
    let crvStakeTokenName;
    for (let i = 0; i < curveFarmingData.data.data.accounts[0].gauges.length; i++) {
      const object = {};
      const crvStakeTokenData = curveFarmingData.data.data.accounts[0].gauges[i];
      //-----------------------CrvFarming-----------//

      //call the smart contract source to get the claimable token value
      const crvLiquidityGauge = yield call(
        API.getLiquidityGauge,
        curveStakingParams.accountAddress,
        crvStakeTokenData.gauge.id,
        curveStakingParams.web3
      );
      const crvLiquidityGaugeReward = yield call(
        API.getLiquidityGaugeReward,
        curveStakingParams.accountAddress,
        crvStakeTokenData.gauge.id,
        curveStakingParams.web3
      );

      const crvLiquidityGaugeV2 = yield call(
        API.getLiquidityGaugeV2,
        curveStakingParams.accountAddress,
        crvStakeTokenData.gauge.id,
        curveStakingParams.web3
      );

      const crvLiquidityGaugeV3 = yield call(
        API.getLiquidityGaugeV3,
        curveStakingParams.accountAddress,
        crvStakeTokenData.gauge.id,
        curveStakingParams.web3
      );
      //if claimable availble from liquidityGauge source
      if (parseFloat(crvLiquidityGauge.crvLiquidityGaugeClaimableAmt).toFixed(2) > 0.0001) {
        object.crvLiquidityGaugeClaimable = parseFloat(
          crvLiquidityGauge.crvLiquidityGaugeClaimableAmt / 10 ** 18
        ).toFixed(2);
      }

      //if claimable availble from crvLiquidityGaugeReward source
      if (parseFloat(crvLiquidityGaugeReward.crvLiquidityGaugeRewardAmt).toFixed(2) > 0.0001) {
        object.crvLiquidityGaugeRewardClaimable = parseFloat(
          crvLiquidityGaugeReward.crvLiquidityGaugeRewardAmt / 10 ** 18
        ).toFixed(2);
      }

      //if claimable availble from crvLiquidityGaugeReward source
      if (crvLiquidityGaugeV2) {
        if (parseFloat(crvLiquidityGaugeV2.crvGaugeV2ClaimableValue).toFixed(2) > 0.0001) {
          object.Claimable = parseFloat(
            crvLiquidityGaugeV2.crvGaugeV2ClaimableValue / 10 ** 18
          ).toFixed(2);
        }
        if (parseFloat(crvLiquidityGaugeV2.crvGaugeV2RewardTotalValue).toFixed(3) > 0.0001) {
          object.Liquidity = parseFloat(
            crvLiquidityGaugeV2.crvGaugeV2RewardTotalValue / 10 ** 18
          ).toFixed(2);
        }
      }
      //-----------------------end of CrvFarming-----------//
      //if claimable availble from crvLiquidityGaugeReward source
      if (crvLiquidityGaugeV3) {
        if (parseFloat(crvLiquidityGaugeV3.crvGaugeV3ClaimableValue).toFixed(2) > 0.0001) {
          object.crvLiquidityGaugeV3Claimable = parseFloat(
            crvLiquidityGaugeV3.crvGaugeV3ClaimableValue / 10 ** 18
          ).toFixed(2);
        }
        if (parseFloat(crvLiquidityGaugeV3.crvGaugeV3RewardTotalValue).toFixed(2) > 0.0001) {
          object.crvLiquidityGaugeV3RewardClaim = parseFloat(
            crvLiquidityGaugeV3.crvGaugeV3RewardTotalValue / 10 ** 18
          ).toFixed(2);
        }
      }
      crvStakeTokenName = crvStakeTokenData.gauge.pool.lpToken.name.replace('Curve.fi ', '');
      if (crvStakeTokenName == 'Factory USD Metapool: Frax') {
        object.tokenName = 'FRAX/3CRV'; // change to meaning full name to get the token image
      } else {
        object.tokenName = crvStakeTokenName;
      }
      object.symbol = crvStakeTokenData.gauge.pool.lpToken.symbol;
      //object.balance = crvStakeTokenData.originalBalance;
      object.balanceUSD = crvStakeTokenData.originalBalance / 10 ** 18;
      object.price = parseFloat(crvStakeTokenData.gauge.pool.virtualPrice).toFixed(2);
      object.totalValue = object.balanceUSD * object.price;
      crvStakingTotalValue += object.totalValue;
      crvStakingArrayOfData.push(object);
    } // end of for loop

    yield put(actions.getCurveStakingData(crvStakingArrayOfData));
    yield put(actions.getCurveStakingTotal(crvStakingTotalValue));
    crvStakingArrayOfData = [];
    crvStakingTotalValue = 0;
  }
}

// crvLiquidityGaugeClaimable: "4685.99"
// crvStakeTokenBalance: "410987583746823477949189"
// crvStakeTokenBalanceUSD: 410987.5837468235
// crvStakeTokenName: "USDN/3Crv"
// crvStakeTokenPrice: "1.05"
// crvStakeTokenSymbol: "usdn3CRV"
// crvStakeTokenValue: 431536.9629341647
