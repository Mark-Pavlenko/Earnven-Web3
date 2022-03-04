import { put, call, select, takeEvery, putResolve } from 'redux-saga/effects';
import * as API from '../../components/LoansAndSavings/api/Convex/ConvexAPI';
import * as actions from './actions';
import actionTypes from '../../constants/actionTypes';
import ConvexLpTokenList from '../../contractAddress/ConvexTokenAdddressList';

//to get Convex staking data
export function* getConvexStakingSagaWatcher() {
  try {
    yield takeEvery(actionTypes.SET_CVX_TOKEN_DATA, convexStakingDataSagaWorker);
  } catch (err) {
    console.log(
      'Dispatch action is not received for Convex protocol check the account address',
      err.message
    );
  }
}

//---------------------Convex Staking and claimable process--------------------------
//below generator function is used to get the convex staking and claimable data
//call all the list of api calls from the ConvexApi.js file
function* convexStakingDataSagaWorker(convexStakingAttributes) {
  const convexStakingParams = convexStakingAttributes.payload;

  let convexStakingBalanceValue = 0;
  let convexStakingClaimable = 0;
  let convexTokenPrice = 0;
  let staking = [];
  let totalStaking = 0;
  let totalValue = 0;
  let CvxTokenImageUrl;
  let cvxCrvTokenPrice = 0;
  let cvxTotalSupplyAmt = 0;
  let response;
  let stakingTokenSymbol;
  let ConvexStakedData;
  try {
    const data = yield call(API.getUserInvestInfo, convexStakingParams.accountAddress);
    //check the user data is exist then proceed
    //if(data.length > 0) {
    for (let i = 0; i < data.tokens.length; i++) {
      let object = {};

      //check the curveLpData token address is exist then proceed
      const curveLpData = data.tokens[i];
      const tokenAddress = curveLpData.tokenInfo.address.toLowerCase();

      if (ConvexLpTokenList.indexOf(tokenAddress) != -1) {
        //get the convex staking values
        ConvexStakedData = yield call(
          API.getConvexStakes,
          convexStakingParams.accountAddress,
          tokenAddress,
          convexStakingParams.web3
        );

        //if staking token address is exist then proceed
        if (ConvexStakedData.stakingTokenAddress != null) {
          //get the contract token
          stakingTokenSymbol = yield call(
            API.getRewardTokenSymbol,
            ConvexStakedData.stakingTokenAddress,
            convexStakingParams.web3
          );
          //get Convex/rewarded token price
          const convexTokenPriceReturn = yield call(
            API.getConvexTokenPrice,
            ConvexStakedData.rewardTokenAddress
          );
          convexTokenPrice = convexTokenPriceReturn.data.market_data.current_price.usd;
          CvxTokenImageUrl = convexTokenPriceReturn.data.image.thumb;

          //get price for cvx3Crv,crv, cvxCRV
          if (stakingTokenSymbol == 'cvxCRV' && cvxCrvTokenPrice == 0) {
            cvxCrvTokenPrice = yield call(
              API.getCvxCrvTokenPrice,
              stakingTokenSymbol,
              tokenAddress,
              ConvexStakedData.stakingTokenAddress
            );
          }

          if (stakingTokenSymbol == 'cvx3Crv' && cvxCrvTokenPrice == 0) {
            const Crv3CrvPoolAddress = '0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490'; //3crvPool
            //console.log('TestFF, looking for staking token', Crv3CrvPoolAddress)
            const cvxCrvTokenPriceData = yield call(API.getConvexTokenPrice, Crv3CrvPoolAddress);
            cvxCrvTokenPrice = cvxCrvTokenPriceData.data.market_data.current_price.usd;
          }
          //get price for CVX
          if (stakingTokenSymbol == 'CVX' && cvxCrvTokenPrice == 0) {
            const cvxContract = '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b'; //cvx contract
            //console.log('TestFF, looking for staking token', cvxContract)
            const cvxCrvTokenPriceData = yield call(API.getConvexTokenPrice, cvxContract);
            cvxCrvTokenPrice = cvxCrvTokenPriceData.data.market_data.current_price.usd;
            CvxTokenImageUrl = cvxCrvTokenPriceData.data.image.thumb;
          }

          //if derived price is null then assign the convextokenprice
          if (cvxCrvTokenPrice == 0) {
            cvxCrvTokenPrice = convexTokenPrice;
          }
          //store all the fetched data
          if (cvxCrvTokenPrice) {
            convexStakingBalanceValue =
              (ConvexStakedData.convexStakingBalance / 10 ** 18) * cvxCrvTokenPrice;
            object.claimable = (ConvexStakedData.earnedClaimbale / 10 ** 18) * cvxCrvTokenPrice;
            cvxTotalSupplyAmt = (ConvexStakedData.cvxTotalSupply / 10 ** 18) * cvxCrvTokenPrice;
            object.stakingAmt = convexStakingBalanceValue;
            object.price = cvxCrvTokenPrice;
            object.symbol = stakingTokenSymbol;
            object.imageData = [CvxTokenImageUrl];
            object.balance = ConvexStakedData.convexStakingBalance / 10 ** 18;
            object.chain = 'Ethereum';
            object.protocol = stakingTokenSymbol;
            object.liquidity = cvxTotalSupplyAmt;
            object.value = parseFloat(object.stakingAmt + parseFloat(object.claimable));
            totalValue += object.stakingAmt + parseFloat(object.claimable);

            staking.push(object);
          }
          //Reset the variables
          cvxCrvTokenPrice = 0;
          CvxTokenImageUrl = '';
        }
      }
    } //end of for loop
    //if (ConvexStakedData.convexStakingBalance > 0) {
    yield put(actions.getConvexStakingData(staking));
    yield put(actions.getConvexStakingTotal(totalValue));
    // console.log('TestCVX saga data staking from saga', staking);
    // console.log('TestCVX saga data total from saga', totalValue);
    //}
  } catch (err) {
    //console.log('TestCVX No curve lp token holding for this user', accountAddress);
    console.log('Convex Staking error raised from saga', err.message);
  }
  yield put(actions.setConvexIsLoading(false));
}
