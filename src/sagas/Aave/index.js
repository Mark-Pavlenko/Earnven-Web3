import { put, call, select, takeEvery, putResolve } from 'redux-saga/effects';
import * as API from '../../components/LoansAndSavings/api/Aave/AaveAPI';
import * as actions from './actions';
import actionTypes from '../../constants/actionTypes';
import Addresses from '../../contractAddresses';
import aaveLogo from '../../assets/icons/aave-logo.png';

export function* getAaveStakeSagaWatcher() {
  yield takeEvery(actionTypes.SET_AAVE_TOKEN_DATA, aaveStakeSagaWorker);
}

function* aaveStakeSagaWorker(aaveStakeAttributes) {
  const aaveStakeParams = aaveStakeAttributes.payload;

  let AaveV2Balance;
  let AaveV2ClaimableValue = 0;
  let AaveV2USDValue = 0;
  let AaveV2UsdPrice = 0;
  //stkABPT - staked balacer LP
  let stkABPTBalance;
  let stkABPTClaimableValue = 0;
  let stkABPTUSDValue = 0;
  let stkABPTUsdPrice = 0;
  //Total staking aave value
  let totalAaveV2Staking = 0;
  let totalstkABPTStaking = 0;
  let AaveStakingTotalValue;
  //total liqudity
  let AaveTotlLiqudityBalance = 0;

  //use below function to get the Aave smart contract value

  //get the image url for stkABPT
  const getUrl = yield call(API.getStakeBalancerImage, Addresses.aavestkABPT);
  const stkABPTImageUrl = getUrl.data.image.thumb;

  //Call the contract to get the value for staked Aave
  const AaveV2Data = yield call(
    API.checkAaveStake,
    aaveStakeParams.accountAddress,
    Addresses.aaveStakingV2,
    aaveStakeParams.web3
  );

  //call the contract to get the value from Staked Balancer LP
  const stkABPTData = yield call(
    API.checkAaveStake,
    aaveStakeParams.accountAddress,
    Addresses.aavestkABPT,
    aaveStakeParams.web3
  );

  //get the Aave token USD price and do calc to get the Aave staking and cliambale value
  //from aave api data pools

  const response = yield call(API.getAavePrice);
  console.log('TestAave Aave get price data', response);
  if (response) {
    //get the price for Staked Aave V2
    if (response.data[0].symbol === 'stkAAVE') {
      AaveV2UsdPrice = response.data[0].price.usd;
      if (AaveV2UsdPrice != 0) {
        if (AaveV2Data.AaveBalaceAmount != 0) {
          AaveV2Balance = AaveV2Data.AaveBalaceAmount / 10 ** 18;
          AaveV2USDValue = AaveV2UsdPrice * AaveV2Balance;
        }
        //get Aave V2 cliamable amount
        if (AaveV2Data.AaveV2ClaimableAmt != 0) {
          const AaveV2Claimable = AaveV2Data.AaveV2ClaimableAmt / 10 ** 18;
          AaveV2ClaimableValue = AaveV2UsdPrice * AaveV2Claimable;
        }
        //get the aave total liquidity in ethereum protocol
        if (AaveV2Data.AaveTotlLiqudityEth != 0) {
          const totalLiqEth = AaveV2Data.AaveTotlLiqudityEth / 10 ** 18;
          AaveTotlLiqudityBalance = totalLiqEth * AaveV2UsdPrice;
        }
      }
    }
    //get the price for Staked Balancer Aave stkABPT
    //To get value for  Staked Balancer LP - stkABPT
    if (response.data[1].symbol === 'stkABPT') {
      stkABPTUsdPrice = response.data[1].price.usd;
      if (stkABPTUsdPrice != 0) {
        if (stkABPTData.AaveBalaceAmount != 0) {
          stkABPTBalance = stkABPTData.AaveBalaceAmount / 10 ** 18;
          stkABPTUSDValue = stkABPTUsdPrice * stkABPTBalance;
        }

        //get staked Balancer LP cliambale amount
        if (stkABPTData.AaveV2ClaimableAmt != 0) {
          const stkABPRClaimable = stkABPTData.AaveV2ClaimableAmt / 10 ** 18;
          stkABPTClaimableValue = stkABPTUsdPrice * stkABPRClaimable;
        }
      }
    }

    //get total value of Aave V2 staking by usdvalue and claimable
    totalAaveV2Staking = parseFloat(AaveV2USDValue) + parseFloat(AaveV2ClaimableValue);
    //get total value of stkABPT staking balancer LP by its usdvalue and claimable
    totalstkABPTStaking = parseFloat(stkABPTUSDValue) + parseFloat(stkABPTClaimableValue);

    //sum the total
    AaveStakingTotalValue = (
      parseFloat(totalAaveV2Staking) + parseFloat(totalstkABPTStaking)
    ).toFixed(2);

    const AaveTokensData = [
      {
        totalValue: AaveStakingTotalValue,
        liquidity: parseFloat(AaveTotlLiqudityBalance.toFixed(2)).toLocaleString(),
        protocol: 'Aave',
        chain: 'Ethereum',
        tokens: [
          {
            symbol: 'AAVE',
            balance: AaveV2Balance,
            value: parseFloat(AaveV2USDValue.toFixed(2)).toLocaleString(),
            claimable: AaveV2ClaimableValue.toFixed(2),
            price: parseFloat(AaveV2UsdPrice).toFixed(2),
          },
          {
            symbol: 'stkABPT',
            balance: stkABPTBalance,
            value: stkABPTUSDValue.toLocaleString(),
            claimable: stkABPTClaimableValue.toFixed(2),
            price: parseFloat(stkABPTUsdPrice).toFixed(2),
          },
        ],
        imageData: [stkABPTImageUrl, aaveLogo],
      },
    ];

    yield put(actions.getAaveStakeData(AaveTokensData));
    yield put(actions.getAaveStakeTotalValue(AaveStakingTotalValue));
  }
}
