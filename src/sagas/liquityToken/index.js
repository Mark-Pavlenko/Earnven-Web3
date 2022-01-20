import { put, call, select, takeEvery, putResolve } from 'redux-saga/effects';
import * as API from '../../components/LoansAndSavings/api/Liquity/LiquityAPI';
import * as actions from './actions';
import actionTypes from '../../constants/actionTypes';

export function* getLiquityTokenSagaWatcher() {
  yield takeEvery(actionTypes.SET_LQTY_TOKEN_DATA, liquityTokenSagaWorker);
}

function* liquityTokenSagaWorker(liquityTokenAttributes) {
  const liquityTokenParams = liquityTokenAttributes.payload;

  let LqtyArrayOfData = [];
  let LqtyTokenTotalValue = 0;
  let object = {};
  //call the liquity contract
  //call the below method to get lqty vault and claimable data value from smart contract
  let lqtyDepositData;
  try {
    lqtyDepositData = yield call(
      API.getLqtyDepositData,
      liquityTokenParams.accountAddress,
      liquityTokenParams.web3
    );
  } catch (err) {
    console.log('Liquity error from contract calling', err.message);
  }
  //call the below function to get liquity staking data from subgraph
  const lqtyStakingData = yield call(API.getLqtyStakingData, liquityTokenParams.accountAddress);
  //console.log('TestLqty staking data', lqtyStakingData);
  //call the below method to get the lqty token price and image url
  const lqtyTokenPriceData = yield call(API.getLqtyTokenPrice);
  //console.log('TestLqty price data', lqtyTokenPriceData);
  //call the below method to get the lusd token price and image url
  const lusdTokenPriceData = yield call(API.getLusdTokenPrice);
  //call the below method to get the eth token price
  const ethTokenPrice = yield call(API.getEthTokenPrice);
  // //-------------------------------Liquity Data fetch-----------------------------------------//
  //get the lqty and lusd price data
  object.lqtyTokenPrice = lqtyTokenPriceData.lqtytokenPrice;
  object.lqtyTokenImageUrl = lqtyTokenPriceData.lqtyImageUrl;
  object.lusdTokenPrice = lusdTokenPriceData.lusdtokenPrice;
  object.lusdTokenImageUrl = lusdTokenPriceData.lusdImageUrl;
  object.ethPrice = ethTokenPrice;

  //Get Vault value
  if (parseFloat(lqtyDepositData.lqtyVaultValue) != 0) {
    object.lqtyVaultBalance = lqtyDepositData.lqtyVaultValue;
    object.lqtyTokenVaultUSD = object.lqtyVaultBalance / 10 ** 18;
    object.lqtyTokenVaultValue = parseFloat(
      object.lqtyTokenVaultUSD * object.lusdTokenPrice
    ).toFixed(2);
  }

  //Get the claimable data for lqty token
  if (parseFloat(lqtyDepositData.lqtyTokenClaimableValue) != 0) {
    object.lqtyTokenClaimBalance = lqtyDepositData.lqtyTokenClaimableValue;
    object.lqtyTokenClaimUSD = object.lqtyTokenClaimBalance / 10 ** 18;
    object.lqtyTokenClaimableValue = parseFloat(
      object.lqtyTokenClaimUSD * object.lqtyTokenPrice
    ).toFixed(2);
  }
  //get the claimable data for lqtyEth token
  if (parseFloat(lqtyDepositData.lqtyTokenEthClaiableValue) > 0.001) {
    object.lqtyEthClaimBalance = lqtyDepositData.lqtyTokenEthClaiableValue;
    object.lqtyEthClaimUSD = object.lqtyEthClaimBalance / 10 ** 18;
    object.lqtyEthClaimableValue = parseFloat(object.lqtyEthClaimUSD * object.ethPrice).toFixed(2);
  }

  //get lqty staking , debt and collateral value if available for the user
  //LQTY token is used to deposit in staking so use LQTY price to get usd value

  if (lqtyStakingData.data.data) {
    try {
      if (
        parseFloat(lqtyStakingData.data.data.users[0].stake.amount) &&
        parseFloat(lqtyStakingData.data.data.users[0].stake.amount) != 0
      ) {
        object.lqtyStakingAmt = lqtyStakingData.data.data.users[0].stake.amount;
        object.lqtyStakingLqtyValue = parseFloat(
          object.lqtyStakingAmt * object.lqtyTokenPrice
        ).toFixed(2);
      }
    } catch (err) {
      console.log('Liquity Protocol not found for staking');
    }
    //use eth price for collateral value
    try {
      if (parseFloat(lqtyStakingData.data.data.users[0].trove.collateral) != 0) {
        object.lqtyCollateralAmt = parseFloat(
          lqtyStakingData.data.data.users[0].trove.collateral
        ).toFixed(2);
        object.lqtyCollateralEthValue = parseFloat(
          object.lqtyCollateralAmt * object.ethPrice
        ).toFixed(2);
      }
    } catch (err) {
      console.log('Liquity protocol not found collateral data');
    }
    //use LUSD price to get the debt amount
    try {
      if (parseFloat(lqtyStakingData.data.data.users[0].trove.debt) != 0) {
        object.lqtyDebtAmt = lqtyStakingData.data.data.users[0].trove.debt;
        object.lqtyDebtLusdValue = parseFloat(object.lqtyDebtAmt * object.lusdTokenPrice).toFixed(
          2
        );
      }
    } catch (err) {
      console.log('Liquity Protocol not found debt data');
    }

    //calculate the LqtyTokenTotal value
    LqtyTokenTotalValue = parseFloat(
      parseFloat(object.lqtyTokenVaultValue > 0 ? parseFloat(object.lqtyTokenVaultValue) : 0) +
        parseFloat(
          object.lqtyTokenClaimableValue > 0 ? parseFloat(object.lqtyTokenClaimableValue) : 0
        ) +
        parseFloat(
          object.lqtyEthClaimableValue > 0 ? parseFloat(object.lqtyEthClaimableValue) : 0
        ) +
        parseFloat(object.lqtyStakingLqtyValue > 0 ? parseFloat(object.lqtyStakingLqtyValue) : 0) +
        parseFloat(
          object.lqtyCollateralEthValue > 0 ? parseFloat(object.lqtyCollateralEthValue) : 0
        )
    );
    //subtract the total value with debt/barrowed value
    if (parseFloat(object.lqtyDebtLusdValue) > 0) {
      LqtyTokenTotalValue -= parseFloat(object.lqtyDebtLusdValue);
    }

    object.lqtyTokenTotalValue = LqtyTokenTotalValue;

    LqtyArrayOfData.push(object);
  }
  yield put(actions.getLiquityTokenData(LqtyArrayOfData));
  yield put(
    actions.getLiquityTokenTotal(parseFloat(LqtyTokenTotalValue.toFixed(2)).toLocaleString())
  );
}
