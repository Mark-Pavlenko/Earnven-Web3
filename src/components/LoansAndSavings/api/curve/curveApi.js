import axios from 'axios';
import CurveTokenContractABI from '../../../../abi/CurveTokenContract.json';
import addresses from '../../../../contractAddresses';
import CrvLiquidityGaugeV2ABI from '../../../../abi/CurveLiquidityGaugeV2.json';
import CrvLiquidityGaugeV3ABI from '../../../../abi/CurveLiquidityGaugeV3.json';
import CrvLiquidityGaugeRewardABI from '../../../../abi/CurveLiquidityGaugeReward.json';
import CrvLiquidityGaugeABI from '../../../../abi/CurveLiquidityGauge.json';
import crvLiquidityGaugeV2TokenList from '../../../../contractAddress/CRVLiquidityGuageV2AddList';
import crvLiquidityGaugeV3TokenList from '../../../../contractAddress/CRVLiquidityGuageV3AddList';
import crvLiquidityGaugeRewards from '../../../../contractAddress/CRVLiquidityGaugeRewardAddList';
import crvLiquidityGauge from '../../../../contractAddress/CRVLiquidityGaugeAddList';

//get yearn finance token price
export const getCurveTokenPriceData = async (contractAddress) => {
  const result = await axios.get(
    `https://api.coingecko.com/api/v3/coins/ethereum/contract/0xD533a949740bb3306d119CC777fa900bA034cd52`,
    {}
  );
  const cvxImageUrl = result.data.image.thumb;
  const cvxTokenPrice = result.data.market_data.current_price.usd;

  return {
    cvxTokenPrice: cvxTokenPrice,
    cvxImageUrl: cvxImageUrl,
  };
};

export const getCurveContractData = async (accountAddress, web3) => {
  const cvxContractInstance = new web3.eth.Contract(
    CurveTokenContractABI,
    addresses.cvxTokenAddress
  );
  const crvTokenBalance = await cvxContractInstance.methods.locked(accountAddress).call();
  const crvTokenDecimals = await cvxContractInstance.methods.decimals().call();
  return {
    crvTokenBalanceValue: crvTokenBalance.amount,
    crvTokenDecimals: crvTokenDecimals,
  };
};

//below process is used for curve staking and claimable data
//subquery for curve staking
export const getCrvFarmingGraphData = async (accountAddress) => {
  const response = await axios.post(
    `https://gateway.thegraph.com/api/${addresses.graph_API}/subgraphs/id/0x2382ab6c2099474cf424560a370ed1b1fdb65253-0`,
    {
      query: `{
              accounts
                  (
                      where:
                      {
                      id:"${accountAddress}"
                      }
                  )
              {
                  id
                  gauges(where : { originalBalance_not : "0"})
                  {
                      id
                      originalBalance
                      gauge
                      {
                          id
                          pool
                          {
                              id
                              virtualPrice
                              lpToken
                              {
                                  id
                                  name
                                  symbol
                                  decimals
                              }
                          }
                      }
                  }
               }
        }`,
    }
  );
  return response;
};

//-------------------------------------Claimable process------------------------------------//
//------source-1 - LiquidityGauge--------//
export const getLiquidityGauge = async (accountAddress, gaugeTokenAddress, web3) => {
  let crvLiquidityGaugeClaimableAmt = 0;
  if (crvLiquidityGauge.indexOf(gaugeTokenAddress) != -1) {
    const crvLiquidityGauge = new web3.eth.Contract(CrvLiquidityGaugeABI, gaugeTokenAddress);

    crvLiquidityGaugeClaimableAmt = await crvLiquidityGauge.methods
      .claimable_tokens(accountAddress)
      .call();
  }
  return { crvLiquidityGaugeClaimableAmt: crvLiquidityGaugeClaimableAmt };
};
//------source-2 - LiquidityGaugeReward--------//
export const getLiquidityGaugeReward = async (accountAddress, gaugeTokenAddress, web3) => {
  let crvLiquidityGaugeRewardAmt = 0;
  if (crvLiquidityGaugeRewards.indexOf(gaugeTokenAddress) != -1) {
    const crvLiquidityGaugeReward = new web3.eth.Contract(
      CrvLiquidityGaugeRewardABI,
      gaugeTokenAddress
    );

    crvLiquidityGaugeRewardAmt = await crvLiquidityGaugeReward.methods
      .claimable_reward(accountAddress)
      .call();
  }
  return { crvLiquidityGaugeRewardAmt: crvLiquidityGaugeRewardAmt };
};

//----source-3 - LiquidityGaugeV2 ----//
export const getLiquidityGaugeV2 = async (accountAddress, gaugeTokenAddress, web3) => {
  let crvGaugeV2ClaimableValue = 0;
  let crvGaugeV2RewardTotalValue = 0;
  if (crvLiquidityGaugeV2TokenList.indexOf(gaugeTokenAddress) != -1) {
    const crvLiquidityGaugeV2 = new web3.eth.Contract(CrvLiquidityGaugeV2ABI, gaugeTokenAddress);
    crvGaugeV2ClaimableValue = await crvLiquidityGaugeV2.methods
      .claimable_tokens(accountAddress)
      .call();
    //get the name/symbol of the token
    const crvGaugeV2ClaimableTokenName = await crvLiquidityGaugeV2.methods.name().call();

    //get the reward token address
    //max it can hold 8 address
    for (let i = 0; i < 7; i++) {
      const crvGaugeV2RewardToken = await crvLiquidityGaugeV2.methods.reward_tokens(i).call();
      if (crvGaugeV2RewardToken == '0x0000000000000000000000000000000000000000') {
        break;
      }
      //get the reward tokens only if it available
      if (crvGaugeV2RewardToken != '0x0000000000000000000000000000000000000000') {
        //note reward_tokens address is received from the LiquidityGaugeV2 contract
        const crvGaugeV2RewardedValue = await crvLiquidityGaugeV2.methods
          .claimable_reward(accountAddress, crvGaugeV2RewardToken)
          .call();

        crvGaugeV2RewardTotalValue += crvGaugeV2RewardedValue;
      } //end if
    } // end of for loop
  }
  return {
    crvGaugeV2ClaimableValue: crvGaugeV2ClaimableValue,
    crvGaugeV2RewardTotalValue: crvGaugeV2RewardTotalValue,
  };
};
//------source-4 - LiquidityGaugeV3--------//
export const getLiquidityGaugeV3 = async (accountAddress, gaugeTokenAddress, web3) => {
  let crvGaugeV3ClaimableValue = 0;
  let crvGaugeV3RewardTotalValue = 0;
  if (crvLiquidityGaugeV3TokenList.indexOf(gaugeTokenAddress) != -1) {
    const crvLiquidityGaugeV3 = new web3.eth.Contract(CrvLiquidityGaugeV3ABI, gaugeTokenAddress);
    //get the claimable token by calling the respecive smart contract function
    crvGaugeV3ClaimableValue = await crvLiquidityGaugeV3.methods
      .claimable_tokens(accountAddress)
      .call();

    //get the reward token address
    //the max it can check for up to 8 address
    for (let i = 0; i < 7; i++) {
      const crvGaugeV3RewardToken = await crvLiquidityGaugeV3.methods.reward_tokens(i).call();
      if (crvGaugeV3RewardToken == '0x0000000000000000000000000000000000000000') {
        break;
      }
      //get the reward tokens only if it available
      if (crvGaugeV3RewardToken != '0x0000000000000000000000000000000000000000') {
        //note reward_tokens address is received from the LiquidityGaugeV3 contract
        const crvGaugeV3RewardedValue = await crvLiquidityGaugeV3.methods
          .claimable_reward(accountAddress, crvGaugeV3RewardToken)
          .call();

        crvGaugeV3RewardTotalValue += crvGaugeV3RewardedValue;
      }
    } //end for loop
  } //end if
  return {
    crvGaugeV3ClaimableValue: crvGaugeV3ClaimableValue,
    crvGaugeV3RewardTotalValue: crvGaugeV3RewardTotalValue,
  };
};
//end of curve staking and claimable process
