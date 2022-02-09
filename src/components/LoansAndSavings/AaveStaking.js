/** ***********************************************************************************************
Purpose : This component is used to get stake token value from Aave Protocol
Developed by : Prabhakaran.R
Version log:
--------------------------------------------------------------------------------------------------
Version           Date                         Description                    Developed by
--------------------------------------------------------------------------------------------------
1.0               8/Sep/2021                   Initial Development            Prabhakaran.R
1.1               2/Nov/2021                   To include stkABPT             Prabhakaran.R
1.2               8/Dec/2021                   To include additional fields   Prabhakaran.R  

**************************************************************************************************/
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import axios from 'axios';
import AaveStakingABI from '../../abi/AaveStakingContract.json';
import Addresses from '../../contractAddresses';
import aaveLogo from '../../assets/icons/aave-logo.png';
import CuveLpTokenList from '../../contractAddress/CurveLpTokenAddressList';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

export default function AaveStaking({ accountAddress }) {
  //varaible for AaveV2
  const [AaveV2BalanceAmt, setAaveV2BalanceAmt] = useState();
  const [AaveV2UsdPrice, setAaveV2UsdPrice] = useState();
  const [AaveAmountUSD, setAaveAmountUSD] = useState(0);
  const [AaveV2ClaimableAmt, setAaveV2ClaimableAmt] = useState(0);
  const [AaveV2ClaimableValue, setAaveV2ClaimableValue] = useState(0);

  //variable for stkABPT - balancer LP
  const [AaveStkABPTBalanceAmt, setAaveStkABPTBalanceAmt] = useState();
  const [AaveStkABPTPrice, setAaveStkABPTPrice] = useState();
  const [AaveStkABPTAmountUSD, setAaveStkABPTAmountUSD] = useState(0);
  const [AaveStkABPTClaimableAmt, setAaveStkABPTClaimableAmt] = useState(0);
  const [AaveStkABPTClaimableValue, setAaveStkABPTClaimableValue] = useState(0);

  //to get the total staking value Aave v2 + stkABPT + claimable
  const [AaveStakingTotal, setAaveStakingTotal] = useState();
  const [AaveLiquidityEth, setAaveLiquidityEth] = useState();
  const [AaveStkABPTImage, setAaveStkABPTImage] = useState();

  //get useWeb3React hook
  const { account, activate, active, chainId, connector, deactivate, error, provider, setError } =
    useWeb3React();

  //logic implementing for web3 provider connection using web3 React hook
  async function getWeb3() {
    const provider = active ? await connector.getProvider() : ethers.getDefaultProvider();
    const web3 = await new Web3(provider);
    return web3;
  }

  //get the Aave Contract instance
  async function getAaveContractInstance(contractAddress) {
    //get the web3 provider instance
    const web3 = await getWeb3();
    const AaveStakingContract = new web3.eth.Contract(AaveStakingABI, contractAddress);
    return AaveStakingContract;
  }

  //this function is used to interact with aave deployed contract to get balanceOf amount for given account
  async function checkAaveStake(accountAddress, contractAddress) {
    const AaveStakingContract = await getAaveContractInstance(contractAddress); //new web3.eth.Contract(AaveStakingABI, contractAddress);
    const AaveBalaceAmount = await AaveStakingContract.methods.balanceOf(accountAddress).call();
    return AaveBalaceAmount;
  }

  //this function is used to get the total liquidity of Aave in Ethereum protocol
  async function getTotalLiquidityEth(contractAddress) {
    const AaveV2StakingContract = await getAaveContractInstance(contractAddress);
    const AaveV2TotalSupply = await AaveV2StakingContract.methods.totalSupply().call();
    return AaveV2TotalSupply;
  }

  //this function is used to get climable amount of the given user by calling the deployed contract
  async function getClaimableRewards(accountAddress, contractAddress) {
    const AaveV2Contract = await getAaveContractInstance(contractAddress);
    const AaveClaimableAmount = await AaveV2Contract.methods
      .getTotalRewardsBalance(accountAddress)
      .call();
    return AaveClaimableAmount;
  }

  //get the stkABPT image
  async function getStakeBalancerImage(contractAddress) {
    const result = await axios.get(
      `https://api.coingecko.com/api/v3/coins/ethereum/contract/${contractAddress}`,
      {}
    );
    return result;
  }

  useEffect(() => {
    //Aave V2
    let AaveV2ClaimableValue = 0;
    let AaveV2USDValue = 0;
    let AaveV2UsdPrice = 0;
    //stkABPT - staked balacer LP
    let stkABPRClaimableValue = 0;
    let stkABPTUSDValue = 0;
    let stkABPTUsdPrice = 0;
    //Total staking aave value
    let totalAaveV2Staking = 0;
    let totalstkABPTStaking = 0;
    let AaveStakingTotalValue;
    //total liqudity
    let AaveTotlLiqudityBalance = 0;

    //use below function to get the Aave smart contract value
    async function getBlockchainData() {
      //get the image url for stkABPT
      const getUrl = await getStakeBalancerImage(Addresses.aavestkABPT);
      const stkABPTImageUrl = getUrl.data.image.thumb;
      setAaveStkABPTImage(stkABPTImageUrl);

      //Call the contract to get the value for staked Aave
      const AaveBalaceAmount = await checkAaveStake(accountAddress, Addresses.aaveStakingV2);
      //call the contract to get the value from Staked Balancer LP
      const stkABPTBalance = await checkAaveStake(accountAddress, Addresses.aavestkABPT);
      //call the below function to get the aaveV2 Cliambale amount
      const AaveV2ClaimableAmt = await getClaimableRewards(accountAddress, Addresses.aaveStakingV2);
      //call the below function to get the stkABPT Cliambale amount
      const stkABPTClaimableAmt = await getClaimableRewards(accountAddress, Addresses.aavestkABPT);
      //call the below function to get total liquidity in ethereum protocol
      const AaveTotlLiqudityEth = await getTotalLiquidityEth(Addresses.aaveStakingV2);

      //get the Aave token USD price and do calc to get the Aave staking and cliambale value
      //from aave api data pools
      await axios
        .get('https://aave-api-v2.aave.com/data/pools', {})
        .then(async (response) => {
          //get the price for Staked Aave V2
          if (response.data[0].symbol === 'stkAAVE') {
            AaveV2UsdPrice = response.data[0].price.usd;
          }
          //get the price for Staked Balance Aave stkABPT
          if (response.data[1].symbol === 'stkABPT') {
            stkABPTUsdPrice = response.data[1].price.usd;
          }
          //To get value for staked Aave V2
          if (AaveBalaceAmount != 0 && AaveV2UsdPrice != 0) {
            const stakeValue = AaveBalaceAmount / 10 ** 18;
            AaveV2USDValue = AaveV2UsdPrice * stakeValue;
          }
          //get Aave V2 cliamable amount
          if (AaveV2ClaimableAmt != 0 && AaveV2UsdPrice != 0) {
            const AaveV2Claimable = AaveV2ClaimableAmt / 10 ** 18;
            AaveV2ClaimableValue = AaveV2UsdPrice * AaveV2Claimable;
          }

          //stkABPT - Staked Balancer LP
          //To get value for  Staked Balancer LP - stkABPT
          if (stkABPTBalance != 0 && stkABPTUsdPrice != 0) {
            const stakeValue = stkABPTBalance / 10 ** 18;
            stkABPTUSDValue = stkABPTUsdPrice * stakeValue;
          }

          //get staked Balancer LP cliambale amount
          if (stkABPTClaimableAmt != 0 && stkABPTUsdPrice != 0) {
            const stkABPRClaimable = stkABPTClaimableAmt / 10 ** 18;
            stkABPRClaimableValue = stkABPTUsdPrice * stkABPRClaimable;
          }

          //get the aave total liquidity in ethereum protocol
          if (AaveTotlLiqudityEth != 0 && AaveV2UsdPrice != 0) {
            const totalLiqEth = AaveTotlLiqudityEth / 10 ** 18;
            AaveTotlLiqudityBalance = totalLiqEth * AaveV2UsdPrice;
          }

          //set state value for the Aave V2
          setAaveV2BalanceAmt(parseFloat(AaveBalaceAmount / 10 ** 18)); //need to add in the new fields section convert 10**18
          setAaveV2ClaimableAmt(AaveV2ClaimableAmt); //need to add in the new fields section convert 10**18
          setAaveV2UsdPrice(parseFloat(AaveV2UsdPrice).toFixed(2));
          setAaveAmountUSD(parseFloat(AaveV2USDValue.toFixed(2)).toLocaleString());
          setAaveV2ClaimableValue(AaveV2ClaimableValue.toFixed(2));

          //for stkaABPT - staked balancer LP
          setAaveStkABPTBalanceAmt(stkABPTBalance); //need to add in the new fields section convert 10**18
          setAaveStkABPTClaimableAmt(stkABPTClaimableAmt); //need to add in the new fields section convert 10**18
          setAaveStkABPTPrice(parseFloat(stkABPTUsdPrice).toFixed(2));
          setAaveStkABPTAmountUSD(stkABPTUSDValue.toLocaleString());
          setAaveStkABPTClaimableValue(stkABPRClaimableValue.toFixed(2));

          //get total value of Aave V2 staking by usdvalue and claimable
          totalAaveV2Staking = parseFloat(AaveV2USDValue) + parseFloat(AaveV2ClaimableValue);
          //get total value of stkABPT staking balancer LP by its usdvalue and claimable
          totalstkABPTStaking = parseFloat(stkABPTUSDValue) + parseFloat(AaveStkABPTClaimableValue);
          //sum the total
          AaveStakingTotalValue = (
            parseFloat(totalAaveV2Staking) + parseFloat(totalstkABPTStaking)
          ).toFixed(2);

          setAaveStakingTotal(AaveStakingTotalValue.toLocaleString());
          setAaveLiquidityEth(parseFloat(AaveTotlLiqudityBalance.toFixed(2)).toLocaleString());
          //reset the value
          AaveV2ClaimableValue = 0;
          AaveV2USDValue = 0;
          AaveV2UsdPrice = 0;
          stkABPRClaimableValue = 0;
          stkABPTUSDValue = 0;
          stkABPTUsdPrice = 0;
          AaveTotlLiqudityBalance = 0;
          totalAaveV2Staking = 0;
        })
        .catch((err) => {
          console.log('Error Message message', err);
        });
    }

    getBlockchainData();
  }, [accountAddress]);

  return (
    <div>
      {parseInt(AaveAmountUSD) || parseInt(AaveStkABPTAmountUSD) ? (
        <div>
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
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <img
                src={aaveLogo}
                style={{
                  height: '20px',
                  display: 'inline-block',
                }}
                alt=""
              />
              &nbsp;
              <React.Fragment
                style={{
                  display: 'inline-block',
                  width: '100%',
                }}></React.Fragment>
              Aave Staking &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; $
              {parseFloat(AaveStakingTotal) > 0 ? AaveStakingTotal.toLocaleString() : ''}
            </AccordionSummary>
            <AccordionDetails>
              <div
                style={{
                  fontSize: '15px',
                  display: 'inline-block',
                  marginLeft: '15px',
                }}>
                <br />
                <img
                  src={aaveLogo}
                  style={{
                    height: '15px',
                    marginTop: '',
                    display: 'inline-block',
                  }}
                  alt=""
                />
                &nbsp;AAVE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {AaveAmountUSD} USD
                <br />
                Claimable &nbsp;&nbsp;&nbsp; {AaveV2ClaimableValue}
                <br />
                Price &nbsp;&nbsp;&nbsp;&nbsp; {AaveV2UsdPrice}
                <br />
                Balance &nbsp;&nbsp;&nbsp;&nbsp; {AaveV2BalanceAmt.toFixed(2)}
                <br />
                Liquidity &nbsp;&nbsp;&nbsp; {AaveLiquidityEth}
                <br />
                Protocol &nbsp;&nbsp;&nbsp;&nbsp; Aave
                <br />
                Chain &nbsp;&nbsp;&nbsp;&nbsp; Ethereum
                <br />
                {parseInt(AaveStkABPTAmountUSD) ? (
                  <React.Fragment>
                    <br />
                    <img
                      src={AaveStkABPTImage}
                      style={{
                        height: '20px',
                        marginTop: '',
                        display: 'inline-block',
                      }}
                      alt=""
                    />
                    &nbsp;stkABPT &nbsp;&nbsp;&nbsp;&nbsp; {AaveStkABPTAmountUSD} USD
                    <br />
                    Claimable &nbsp;&nbsp;&nbsp;&nbsp; {AaveStkABPTClaimableValue}
                  </React.Fragment>
                ) : (
                  ''
                )}
                <br />
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
