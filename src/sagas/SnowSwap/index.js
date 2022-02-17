import { takeEvery, call, put } from 'redux-saga/effects';
import * as API from '../../components/LoansAndSavings/api/SnowSwap/snowSwapAPI';
import * as actions from './actions';
import actionTypes from '../../constants/actionTypes';

export function* getSnowSwapSagaWatcher() {
  try {
    yield takeEvery(actionTypes.SET_SNOW_SWAP_DATA, snowSwapWorker);
  } catch (err) {
    console.log('Dispatch action is not received for Snow swap protocol', err.message);
  }
}

function* snowSwapWorker(snowSwapAttributes) {
  const snowSwapParms = snowSwapAttributes.payload;
  //call the smart contract thru this API to get the user snow token balance
  const SnowSwapBalaceAmount = yield call(
    API.checkSnowSwapStake,
    snowSwapParms.accountAddress,
    snowSwapParms.web3
  );
  //call the smart contract thru this API to get the user claimable balance
  const Claimable = yield call(
    API.checkSnowSwapClaimStake,
    snowSwapParms.accountAddress,
    snowSwapParms.web3
  );
  const protocolData = [];
  let claimable;
  let balance;
  let totalValue = 0;
  //call API to get snowSwap price value
  const data = yield call(API.getSnowTokenData);
  const object = {};
  const USDStakeValue = data.market_data.current_price.usd;
  if (parseInt(SnowSwapBalaceAmount) != 0) {
    balance = SnowSwapBalaceAmount / 10 ** 18;
    if (parseFloat(Claimable) != 0) {
      claimable = USDStakeValue * (Claimable / 10 ** 18);
      object.claimable = claimable;
    }

    object.balance = balance;
    object.price = USDStakeValue;
    object.value = object.balance * object.price;
    object.protocol = 'SnowSwap';
    object.chain = 'Ethereum';
    object.symbol = 'SNOW';
    totalValue += object.value;
    protocolData.push(object);
    yield put(actions.getSnowSwapData(protocolData));
    yield put(actions.getSnowSwapTotal(totalValue));
  }
}
