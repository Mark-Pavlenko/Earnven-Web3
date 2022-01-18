/**************************************************************************************************
Purpose : This component is used to get stake token value from Aave Protocol
Developed by : Prabhakaran.R
Version log:
---------------------------------------------------------------------------------------------------
Version      Date                Description                                    Developed/Fixed 
----------------------------------------------------------------------------------------------------
1.0          8/Sep/2021          Initial Development                             Prabhakaran.R
1.1         22/Oct/2021          Chanages to split cvx and cvxCRV staking value  Prabhakaran.R 
1.2         03/Nov/2021          Fix to display cvxCRV staking value 
                                 which get filtered while display in UI          Prabhakaran.R 
1.3         10/Dec/2021          Modified to get new additional fields including
                                 with claimable value                             Prabhakaran.R                                 

**************************************************************************************************/
import React, { useEffect, useState } from 'react';
import ConvexContractABI from '../../abi/ConvexCVXContract.json';
import ConvexCvxCRVContractABI from '../../abi/ConvexCvxCRVContract.json';
import Addresses from '../../contractAddresses';
import Web3 from 'web3';
import axios from 'axios';
import ConvexLpTokenList from '../../contractAddress/ConvexTokenAdddressList';
import ConvexStakingContractABI from '../../abi/ConvexStakingContract.json';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import {
  setConvexStakingData,
  setConvexStakingTokenImage,
  setConvexStakingTotal,
} from '../../store/convexStake/actions';

export default function ConvexStaking({ accountAddress }) {
  const [ConvexCVXAmount, setConvexCVXAmount] = useState(0);
  const [ConvexCVXUsdPrice, setConvexCVXUsdPrice] = useState();
  const [ConvexCVXStakeAmt, setConvexCVXStakeAmt] = useState();
  const [ConvexCVXImage, setConvexCVXImage] = useState();
  const [ConvexCvxCRVAmount, setConvexCvxCRVAmount] = useState();
  const [ConvexCvxCRVUsdPrice, setConvexCvxCRVUsdPrice] = useState();
  const [ConvexCvxCRVStakeAmt, setConvexCvxCRVStakeAmt] = useState();

  //State varaibles added for claimable and for additional fields
  const [convexStakingBalance, setconvexStakingBalance] = useState();
  const [earnedClaimbale, setearnedClaimbale] = useState();
  const [rewardTokenAddress, setrewardTokenAddress] = useState();
  const [stakingTokenAddress, setstakingTokenAddress] = useState();
  const [stakingContent, setstakingContent] = useState([0]);
  const [cvxStakingDataAttributes, setcvxStakingDataAttributes] = useState([]);
  const [cvxStakingTotalAmount, setcvxStakingTotalAmount] = useState(0);
  const [CVXTokenImage, setCVXTokenImage] = useState(0);
  const [CvxTotalSupply, setCvxTotalSupply] = useState();
  console.log('cvxStakingDataAttributes', cvxStakingDataAttributes);

  const dispatch = useDispatch();

  //get useWeb3React hook
  const { account, activate, active, chainId, connector, deactivate, error, provider, setError } =
    useWeb3React();

  let ConvexImageUrl;
  let ConvexCVXprice = 0;

  //logic implementing for web3 provider connection using web3 React hook
  async function getWeb3() {
    const provider = await connector.getProvider();
    const web3 = await new Web3(provider);
    return web3;
  }

  //this function is used to get the stake amount for given contract address by calling
  //the respective contract methods
  async function getConvexStakes(accountAddress, contractAddress) {
    //get the web3 connection provider by calling the web3 react hook
    const web3 = await getWeb3();
    //ConvexCvxStaking contract
    const ConvexCVXStakingContract = new web3.eth.Contract(ConvexContractABI, contractAddress);
    //call the CVX contract to get the balance of CVX token staking value
    let ConvexBalaceAmount = await ConvexCVXStakingContract.methods
      .balanceOf(accountAddress)
      .call();
    let ConvexEarnedBalance = await ConvexCVXStakingContract.methods.earned(accountAddress).call();
    let ConvexRewardTokenAddress = await ConvexCVXStakingContract.methods.rewardToken().call();
    let ConvexStakingTokenAddress = await ConvexCVXStakingContract.methods.stakingToken().call();
    let ConvexTotalSupply = await ConvexCVXStakingContract.methods.totalSupply().call();

    //update the state varaibles
    setconvexStakingBalance(ConvexBalaceAmount); //balanceOf(user)
    setearnedClaimbale(ConvexEarnedBalance); //earned(user) - rewarded/claimable
    setrewardTokenAddress(ConvexRewardTokenAddress); //claimable token Address
    setstakingTokenAddress(ConvexStakingTokenAddress); //staking token address
    setCvxTotalSupply(ConvexTotalSupply);

    //retrun the value as object
    return {
      convexStakingBalance: ConvexBalaceAmount,
      earnedClaimbale: ConvexEarnedBalance,
      rewardTokenAddress: ConvexRewardTokenAddress,
      stakingTokenAddress: ConvexStakingTokenAddress,
      cvxTotalSupply: ConvexTotalSupply,
    };
  }

  //Call the ConvexReward/staking Contract data such as symbol
  //this symbol is used to display in the UI to show the staked token and claimable token
  async function getRewardTokenSymbol(contractAddress) {
    //get the web3 connection provider by calling the web3 react hook
    const web3 = await getWeb3();
    //get the contract instance
    const ConvexStakingContract = new web3.eth.Contract(ConvexStakingContractABI, contractAddress);
    //call the below method to get the symbol of the token
    const symbol = await ConvexStakingContract.methods.symbol().call();
    console.log('Convex staking data symbol', symbol);
    return symbol;
  }

  //get the price of the given token address
  async function getCvxCrvTokenPrice(cvxProtocol, tokenAddress, stakedAddress) {
    let result;
    let tokenPrice = 0;
    try {
      if (
        cvxProtocol == 'cvxCRV' ||
        cvxProtocol == 'cvxankrCRV' ||
        cvxProtocol == 'cvxalETH+ETH-f'
      ) {
        result = await fetch(
          `https://api.ethplorer.io/getAddressInfo/${tokenAddress}?apiKey=EK-qSPda-W9rX7yJ-UY93y`,
          {}
        );
      }
      const data = await result.json();
      if (cvxProtocol == 'cvxCRV') {
        for (let i = 0; i < data.tokens.length; i++) {
          const curveLpData = data.tokens[i];
          const returnAddress = curveLpData.tokenInfo.address.toLowerCase();
          if (stakedAddress.toLowerCase() == returnAddress.toLowerCase()) {
            tokenPrice = curveLpData.tokenInfo.price.rate;
          }
        }
      }
      //get the ether price
      if (cvxProtocol == 'cvxankrCRV' || cvxProtocol == 'cvxalETH+ETH-f') {
        const cvxaEthPrice = data.ETH.price.rate;

        tokenPrice = cvxaEthPrice;
      }
    } catch (err) {
      console.log(err.message);
    }
    return tokenPrice;
  }

  //get the price of the convex token based on the given contract address
  async function getConvexTokenPrice(contractAddress) {
    let result;

    try {
      result = await axios.get(
        `https://api.coingecko.com/api/v3/coins/ethereum/contract/${contractAddress}`
      );

      return result;
    } catch (err) {
      console.log('Error message from Convex staking process', err.message);
    }
  }
  let stakingTokenSymbol;

  //get convex reward/claimable contract data
  useEffect(() => {
    async function fetchCurvePoolData() {
      let convexStakingBalanceValue = 0;
      let convexStakingClaimable = 0;
      let convexTokenPrice = 0;
      let staking = [];
      let totalStaking = 0;
      let CvxTokenImageUrl;
      let cvxCrvTokenPrice = 0;
      let cvxTotalSupplyAmt = 0;
      let response;

      try {
        response = await axios.get(
          `https://api.ethplorer.io/getAddressInfo/${accountAddress}?apiKey=EK-qSPda-W9rX7yJ-UY93y`
        );
        const data = await response.data;

        for (let i = 0; i < data.tokens.length; i++) {
          const curveLpData = data.tokens[i];
          const tokenAddress = curveLpData.tokenInfo.address.toLowerCase();

          if (ConvexLpTokenList.indexOf(tokenAddress) != -1) {
            let object = {};

            //get the convex staking values
            const ConvexStakedData = await getConvexStakes(accountAddress, tokenAddress);

            //get the contract token
            const rewardTokenSymbol = await getRewardTokenSymbol(
              ConvexStakedData.rewardTokenAddress
            );

            //get the contract token
            stakingTokenSymbol = await getRewardTokenSymbol(ConvexStakedData.stakingTokenAddress);

            const convexTokenPriceReturn = await getConvexTokenPrice(
              ConvexStakedData.rewardTokenAddress
            );
            convexTokenPrice = convexTokenPriceReturn.data.market_data.current_price.usd;
            CvxTokenImageUrl = convexTokenPriceReturn.data.image.thumb;

            if (
              (stakingTokenSymbol == 'cvxCRV' ||
                stakingTokenSymbol == 'cvxankrCRV' ||
                stakingTokenSymbol == 'cvxalETH+ETH-f') &&
              cvxCrvTokenPrice == 0
            ) {
              cvxCrvTokenPrice = await getCvxCrvTokenPrice(
                stakingTokenSymbol,
                tokenAddress,
                ConvexStakedData.stakingTokenAddress
              );
            }
            //get price for cvx3Crv, cvxalUSD3CRV-f
            if (
              (stakingTokenSymbol == 'cvx3Crv' || stakingTokenSymbol == 'cvxalUSD3CRV-f') &&
              cvxCrvTokenPrice == 0
            ) {
              const Crv3CrvPoolAddress = '0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490'; //3crvPool
              //console.log('TestFF, looking for staking token', Crv3CrvPoolAddress)
              const cvxCrvTokenPriceData = await getConvexTokenPrice(Crv3CrvPoolAddress);
              cvxCrvTokenPrice = cvxCrvTokenPriceData.data.market_data.current_price.usd;
            }
            //get price for CVX
            if (stakingTokenSymbol == 'CVX' && cvxCrvTokenPrice == 0) {
              const cvxContract = '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b'; //cvx contract
              //console.log('TestFF, looking for staking token', cvxContract)
              const cvxCrvTokenPriceData = await getConvexTokenPrice(cvxContract);
              cvxCrvTokenPrice = cvxCrvTokenPriceData.data.market_data.current_price.usd;
              CvxTokenImageUrl = cvxCrvTokenPriceData.data.image.thumb;
            }

            //get price for 'cvxMIM-UST-f' by checking UST contract
            if (stakingTokenSymbol == 'cvxMIM-UST-f' && cvxCrvTokenPrice == 0) {
              const cvxContract = '0xa47c8bf37f92abed4a126bda807a7b7498661acd'; //ust contract
              //console.log('TestFF, looking for staking token', cvxContract)
              const cvxCrvTokenPriceData = await getConvexTokenPrice(cvxContract);
              cvxCrvTokenPrice = cvxCrvTokenPriceData.data.market_data.current_price.usd;
            }
            //if derived price is null then assign the convextokenprice
            if (cvxCrvTokenPrice == 0) {
              cvxCrvTokenPrice = convexTokenPrice;
            }
            //store all the fetched data
            if (cvxCrvTokenPrice) {
              convexStakingBalanceValue =
                (ConvexStakedData.convexStakingBalance / 10 ** 18) * cvxCrvTokenPrice;
              convexStakingClaimable =
                (ConvexStakedData.earnedClaimbale / 10 ** 18) * cvxCrvTokenPrice;
              cvxTotalSupplyAmt = (ConvexStakedData.cvxTotalSupply / 10 ** 18) * cvxCrvTokenPrice;
              object.stakingAmt = convexStakingBalanceValue;
              object.price = cvxCrvTokenPrice;
              //if token is 'cvxalETH+ETH-f' then claimable price should be crv token price
              if (stakingTokenSymbol == 'cvxalETH+ETH-f' || stakingTokenSymbol == 'cvxankrCRV') {
                const cvxCrvTokenPriceData = await getConvexTokenPrice(
                  '0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490'
                );
                cvxCrvTokenPrice = cvxCrvTokenPriceData.data.market_data.current_price.usd;
              }
              object.stakingClaimable =
                (ConvexStakedData.earnedClaimbale / 10 ** 18) * cvxCrvTokenPrice;

              object.tokens = [
                {
                  symbol: stakingTokenSymbol,
                  balance: ConvexStakedData.convexStakingBalance / 10 ** 18,
                },
              ];
              object.chain = 'Ethereum';
              object.protocol = stakingTokenSymbol;
              object.imageData = [CvxTokenImageUrl];
              object.tokenAddress = tokenAddress;
              object.stakingContractAddress = ConvexStakedData.stakingTokenAddress;
              object.liquidity = cvxTotalSupplyAmt;
              object.totalValue = parseFloat(
                object.stakingAmt + parseFloat(object.stakingClaimable)
              );
              totalStaking += parseFloat(object.stakingAmt + parseFloat(object.stakingClaimable));
              staking.push(object);
            }

            //Reset the variables
            cvxCrvTokenPrice = 0;
            CvxTokenImageUrl = '';
          }
        } //end of for loop
        dispatch(setConvexStakingData(staking));
        setcvxStakingDataAttributes(staking);
        setcvxStakingTotalAmount(parseFloat(totalStaking).toFixed(2));
        dispatch(setConvexStakingTotal(totalStaking));
        setCVXTokenImage(CvxTokenImageUrl);
        //dispatch(setConvexStakingTokenImage(CvxTokenImageUrl));
        staking = [];
      } catch (err) {
        console.log('testcc No curve lp token holding for this user', accountAddress);
        console.log('testcc', err.message);
      }
    } //end of function
    fetchCurvePoolData();
    //for timebeing this log need to check the value from tha main app
    console.log('Staking data from state', cvxStakingDataAttributes);
  }, [accountAddress]);

  //use below function to render in UI after updated the state
  useEffect(() => {
    var content = cvxStakingDataAttributes.map((object) => (
      <React.Fragment>
        <Accordion
          style={{
            background: 'transparent',
            marginRight: '1px',
            color: 'black',
            width: '100%',
            border: '1px',
            borderColor: 'black',
            borderStyle: 'hidden',
          }}>
          <AccordionSummary>
            <React.Fragment>
              {object.token} -- {parseFloat(object.totalValue).toFixed(2)}
            </React.Fragment>
          </AccordionSummary>

          <AccordionDetails>
            <div
              style={{
                fontSize: '12px',
                display: 'inline-block',
                marginLeft: '15px',
              }}>
              <br />
              {object.token} &nbsp;&nbsp;&nbsp;&nbsp; {parseFloat(object.stakingAmt).toFixed(2)} USD
              <br />
              Claimable &nbsp;&nbsp;&nbsp; {parseFloat(object.stakingClaimable).toFixed(2)}
              <br />
              Price &nbsp;&nbsp;&nbsp;&nbsp; {parseFloat(object.price).toFixed(2)}
              <br />
              Balance &nbsp;&nbsp;&nbsp;&nbsp; {parseFloat(object.balance).toFixed(2)}
              <br />
              Liquidity &nbsp;&nbsp;&nbsp; {parseFloat(object.totalSupplyValue).toFixed(2)}
              <br />
              Chain &nbsp;&nbsp;&nbsp;&nbsp; {object.chain}
              <br />
              Protocol &nbsp;&nbsp;&nbsp;&nbsp; {object.protocol}
              <br />
            </div>
          </AccordionDetails>
        </Accordion>
      </React.Fragment>
    ));
    setstakingContent(content);
  }, [cvxStakingDataAttributes]);

  useEffect(() => {
    async function getCvxTokenImageUrl() {
      try {
        //get the cvx image url
        await axios
          .get(
            `https://api.coingecko.com/api/v3/coins/ethereum/contract/0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b`,
            {},
            {}
          )
          .then(async (response) => {
            let ConvexImageUrl = response.data.image.thumb;
            setConvexCVXImage(ConvexImageUrl);
          })
          .catch((error) => console.log('Error message', error));
      } catch (err) {
        console.log(err);
      }
    }

    getCvxTokenImageUrl();
  }, [accountAddress]);

  return (
    <React.Fragment>
      {/*<h1>CONVEX</h1>*/}
      {/*{parseFloat(cvxStakingTotalAmount) > 0 ? (*/}
      {/*  <div>*/}
      {/*    <img*/}
      {/*      src={ConvexCVXImage}*/}
      {/*      style={{*/}
      {/*        height: '20px',*/}
      {/*        display: 'inline-block',*/}
      {/*      }}*/}
      {/*      alt=""*/}
      {/*    />*/}
      {/*    Convex Total -- {parseFloat(cvxStakingTotalAmount).toLocaleString()}*/}
      {/*  </div>*/}
      {/*) : (*/}
      {/*  ''*/}
      {/*)}*/}
      {/*{stakingContent}*/}
    </React.Fragment>
  );
}
