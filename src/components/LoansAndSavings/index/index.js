import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tooltip from '@material-ui/core/Tooltip';
import YearnLogo from '../../../assets/icons/yearnLogo.png';
import CurveLogo from '../../../assets/icons/curveLogo.png';
import ETHLogo from '../../../assets/icons/eth.png';
import addresses from '../../../contractAddresses';
import UniStaking from '../UniStaking';
import AaveStaking from '../AaveStaking';
import SushiStaking from '../SushiStaking';
import LiquityStaking from '../LiquityStaking';
import CreamIronBank from '../CreamIronBankSavings';
import ConvexStaking from '../ConvexStaking';
import { SnowSwapStaking } from '../SnowSwapStaking';
import CurveLpToken from '../CurveLpToken';
import Cream from '../Cream';
import BancorPools from '../BancorPools';
import Synthetix from '../Synthetix';
import Ethereum2Staking from '../Ethereum2Staking';
import YearnFinance from '../YearnFinance';
import ValueProtocol from '../../common/protocols/valueProtocol/valueProtocol';
import Investment from '../../common/investment/investment';

import StakedProtocols from '../../common/stakedProtocols/stakedProtocols';
import { useSelector } from 'react-redux';
//import CurveToken from './CurveToken';

import PoolsProtocols from '../../common/investment/poolsProtocols/poolsProtocols';
import PickleStake from '../Farming/Pickle';
import PickleDill from '../Vaults/PickleDill';
import CurveFarming from '../CurveFarming';
import MstableSavings from '../Savings/MstableSavings';
import MstableFarm from '../Farming/MstableFarm';
import MstablePools from '../LiqudityPools/MstablePools';
// import UniswapV2 from './LiqudityPools/UniswapV2';
import {
  PoolsBlock,
  Header,
  Title,
  TotalValueField,
  TotalTitle,
  TotalEmptyCell,
  TotalValue,
  ToggleButton,
  InvestmentWrapper,
} from './styledComponents';
import { SynthetixProtocol } from '../../../store/synthetixProtocol/synthetixProtocol';
import { numberWithCommas } from '../../../commonFunctions/commonFunctions';
import UniswapV2 from '../LiqudityPools/UniswapV2';
import CurveToken from '../CurveToken';
import { convexStake } from '../../../store/convexStake/reducer';
import SushiProtocol from '../../common/investment/sushiProtocolComponent/sushiProtocol';
import SushiLPToken from '../SushiLPToken';

// Below code is for task https://app.clickup.com/t/1je2y9d
// import CompoundData from './Compound';
export default function Index({ accountAddress }) {
  const YearnData = useSelector((state) => state.yearnFinance.yearnFinanceData);
  const yearnYTokenData = useSelector((state) => state.yearnFinance.yearnYTokenData);
  const theme = useSelector((state) => state.themeReducer.isLightTheme);
  const BeaconData = useSelector((state) => state.eth2Stake.eth2StakeData);
  const SLPTokenData = useSelector((state) => state.sushiStaking.sushiStakeData);
  console.log('SLPTokenData', SLPTokenData);
  const uniswapV2array = useSelector((state) => state.uniswapV2stake.uniswapV2stake);
  const curveStakingData = useSelector((state) => state.curveStaking.curveStakingData);
  const liquityStakeAmountUSD = useSelector(
    (state) => state.LiquityStakeReducer.liquityStakeAmountUSD
  );

  const snxCollateralData = useSelector((state) => state.SynthetixProtocol.snxData);
  const snxTokenData = useSelector((state) => state.SynthetixProtocol.snxTokenData);
  const snxTokenTotal = useSelector((state) => state.SynthetixProtocol.snxTokenTotal);
  const Mstablepools = useSelector((state) => state.mStableSavingsPool.mStableSavingsPool);
  const mstableSavings = useSelector((state) => state.mStableSavings.mStableSavings);
  const mstableStake = useSelector((state) => state.mStableSavingsFarm.mStableSavingsFarm);

  const snxCollateralTotal = useSelector((state) => state.SynthetixProtocol.snxTotal);
  const SLPTokenTotalValue = useSelector((state) => state.sushiStaking.sushiStakeTotal);
  const curveToken = useSelector((state) => state.curveToken.curveTokenData);
  const pickeStake = useSelector((state) => state.pickeStake.pickeStake);
  const pickeDill = useSelector((state) => state.pickeDill.pickeDill);
  const uniswapV2lp = useSelector((state) => state.uniswapV2lp.uniswapV2lp);
  const balancerV2lp = useSelector((state) => state.balancerV2lp.balancerV2lp);
  //convexStake
  const convexStakeData = useSelector((state) => state.convexStake.convexStakeData);
  const convexStakeTotal = useSelector((state) => state.convexStake.convexStakeTotal);
  const convexStakeTotalString = parseFloat(convexStakeTotal).toFixed(2);

  //curveLpToken
  const curveLpToken = useSelector((state) => state.curveLpToken.curveLpTokenData);
  const curveLpTokenTotal = useSelector((state) => state.curveLpToken.curveLpTokenTotal);
  const curveLpTokenTotalString = parseFloat(curveLpTokenTotal).toFixed(2);

  //AAVE
  const AaveStakingData = useSelector((state) => state.AaveStaking.AaveStakingData);

  //sushiSwapLP token
  const SushiPoolsData = useSelector((state) => state.sushiSwap.sushiSwapLPData);
  const SushiV2Total = useSelector((state) => state.sushiSwap.sushiSwapLPTotal);

  // Below code is for task https://app.clickup.com/t/1je2y9d
  // const [DisplaySavings, setDisplaySavings] = useState(null);
  //const [TotalCompoundSavings, setTotalCompoundSavings] = useState(0);
  const [IronBankSavings, setIronBankSavings] = useState(''); //(get NaN)
  const [SavingsContent, setSavingsContent] = useState([]); // aave v2
  const [LoansContent, setLoansContent] = useState([]); // aave v2 empty
  const [SavingsData, setSavingsData] = useState([]); // aave v2
  const [LoansData, SetLoansData] = useState([]); // aave v2
  const [AaveLoansTotal, setAaveLoansTotal] = useState([]); // Aave total debt
  const [AaveSavingsTotal, setAaveSavingsTotal] = useState([]); // Aave total Savings

  //UNI v2
  const [PoolsContent, setPoolsContent] = useState([]); // UNI v2
  const [PoolsData, setPoolsData] = useState([]); // UNI v2
  const [UniV2Total, setUniV2Total] = useState([]); // UNI v2 total

  const [CreamDisplay, setCreamDisplay] = useState(false);
  const [CreamTotal, setCreamTotal] = useState(false);

  //Sushi v2
  const [SushiPoolsContent, setSushiPoolsContent] = useState([]); // Sushi v2
  //const [SushiPoolsData, setSushiPoolsData] = useState([]); // Sushi v2
  //const [SushiV2Total, setSushiV2Total] = useState([]); // Sushi v2 total
  //Compound
  const [CompoundSavingsContent, setCompoundSavingsContent] = useState([]); // compound v2
  const [CompoundLoansContent, setCompoundLoansContent] = useState([]); // compound v2 empty
  const [CompoundSavingsData, setCompoundSavingsData] = useState([]); // compound v2
  const [CompoundLoansData, SetCompoundLoansData] = useState([]); // compound v2

  const [CompLoansTotal, setCompLoansTotal] = useState([]); // Comp total debt
  const [CompSavingsTotal, setCompSavingsTotal] = useState([]); // Comp total Savings

  //Balancer
  const [BalancerPoolsData, setBalancerPoolsData] = useState([]); // Balancer
  const [BalancerPoolsContent, setBalancerPoolsContent] = useState([]); // Balancer
  const [BalancerTotal, setBalancerTotal] = useState([]); // Balancer Total

  //Bancor
  const [BancorPoolTotal, setBancorPoolTotal] = useState(0);
  const [DisplayBancor, setDisplayBancor] = useState(false);

  //Curve
  const [CurveStakeData, setCurveStakeData] = useState([]); // Curve
  const [CurveStakeContent, setCurveStakeContent] = useState([]); // Curve
  const [CurveStakeTotal, setCurveStakeTotal] = useState([0]); // Curve Total

  // BalancerV2
  const [BalancerTotalv2, setBalancerTotalv2] = useState(0);
  const [BalancerPoolsDatav2, setBalancerPoolsDatav2] = useState([]);
  const [BalancerPoolsContentv2, setBalancerPoolsContentv2] = useState([]);
  //Curve Lp token
  const [CurveLpdata, setCurveLpData] = useState([]); // get curve lp token data
  //Synthetix data points
  const [SynthetixData, setSynthetixData] = useState([]); // get curve lp token data
  //YearnToken
  const [YearnTokenValue, setYearnTokenValue] = useState([]);
  //save conditions of open/close investment blocks
  const [isPoolsOpen, setIsPoolsOpen] = useState(true);
  const [isOthersOpen, setIsOthersOpen] = useState(true);
  const [isStakedAssetsOpen, setIsStakedAssetsOpen] = useState(true);

  const combinedSnxTokenData = snxTokenData.reduce(
    (acc, el) => ({
      ...acc,
      imageData: [...acc.imageData, el.image],
      tokens: [
        ...acc.tokens,
        { symbol: el.tokenName, balance: el.snxTokenBalance, price: el.price },
      ],
      totalValue: parseFloat(+acc.totalValue + +el.totalValue).toFixed(3),
      totalPrice: acc.totalPrice + el.price,
      protocol: el.protocol,
      chain: el.chain,
    }),
    { imageData: [], tokens: [], totalValue: 0, totalPrice: 0, protocol: '', chain: '' }
  );

  //get the value from the child component of the curve lp token
  const getCurveLpToken = (data) => {
    setCurveLpData(data);
  };

  const poolsHandler = () => {
    setIsPoolsOpen(!isPoolsOpen);
  };

  const othersHandler = () => {
    setIsOthersOpen(!isOthersOpen);
  };

  const stakedHandler = () => {
    setIsStakedAssetsOpen(!isStakedAssetsOpen);
  };

  //get the value from the synthetix child component
  const getSynthetixTokenData = (data) => {
    setSynthetixData(data);
  };

  //get the value from the yearnFinance protocol
  const getYearnTokenValue = (data) => {
    setYearnTokenValue(data);
  };

  const getTotalValueBalancerV2 = (balancerV2Array) => {
    let total = 0;
    balancerV2Array.map((el) => {
      total += el.totalValue;
    });
    setBalancerTotalv2(Math.round(total * 100) / 100);
  };

  useEffect(() => {
    const content = SavingsData.map((object) => (
      <Tooltip
        title={
          <>
            {object.name} <br />
            Token Price : {parseFloat(object.price).toFixed(4)} USD <br />
            Total Tokens : {object.value} ${object.symbol} <br />
            Total Investment : {object.totalInvestment} USD
          </>
        }>
        <div style={{ width: '90%', marginTop: '12px', marginLeft: '30px' }}>
          <div style={{ display: 'inline-block', width: '15%' }}>
            <div
              style={{
                height: '40px',
                padding: '5px',
                borderRadius: '10px',
                backgroundImage:
                  'linear-gradient(to right,  rgba(20,24,30,.1), rgba(173,204,151,.5), rgba(20,24,30,.1))',
              }}>
              <center>
                <img src={object.image} style={{ height: '30px', marginTop: '' }} alt="" />
              </center>
            </div>
          </div>

          <div style={{ display: 'inline-block', width: '10%' }} />

          <div style={{ display: 'inline-block', width: '30%', textAlign: 'left' }}>
            ${object.symbol}
          </div>

          {/* <div style={{display:'inline-block', width:'30%'}}>
                {object.value} ${object.symbol}
            </div> */}

          <div style={{ display: 'inline-block', width: '40%', fontSize: '13px' }}>
            {object.totalInvestment} USD
          </div>

          <br />
        </div>
      </Tooltip>
    ));

    setSavingsContent(content);
  }, [SavingsData]);

  useEffect(() => {
    const content = LoansData.map((object) => (
      <Tooltip
        title={
          <>
            {object.name} <br />
            Token Price : {parseFloat(object.price).toFixed(4)} USD <br />
            Total Tokens : {object.value} ${object.symbol} <br />
            Total Investment : {object.totalInvestment} USD
          </>
        }>
        <div style={{ width: '90%', marginTop: '12px', marginLeft: '30px' }}>
          <div style={{ display: 'inline-block', width: '15%' }}>
            <div
              style={{
                height: '40px',
                padding: '5px',
                borderRadius: '10px',
                backgroundImage:
                  'linear-gradient(to right,  rgba(20,24,30,.1), rgba(173,204,151,.5), rgba(20,24,30,.1))',
              }}>
              <center>
                <img src={object.image} style={{ height: '30px', marginTop: '' }} alt="" />
              </center>
            </div>
          </div>

          <div style={{ display: 'inline-block', width: '10%' }} />

          <div style={{ display: 'inline-block', width: '30%', textAlign: 'left' }}>
            ${object.symbol}
          </div>

          {/* <div style={{display:'inline-block', width:'30%'}}>
    {object.value} ${object.symbol}
</div> */}

          <div style={{ display: 'inline-block', width: '40%', fontSize: '13px' }}>
            {object.totalInvestment} USD
          </div>

          <br />
        </div>
      </Tooltip>
    ));

    setLoansContent(content);
  }, [LoansData]);

  useEffect(() => {
    const content = PoolsData.map((object) => {
      return (
        <Tooltip
          title={
            <>
              Token 0 : {object.token0name} <br />
              Token 1 : {object.token1name} <br />
              Pool Share : {parseFloat((object.tokenBalance / object.tokenSupply) * 100).toFixed(
                2
              )}{' '}
              % <br />
              Pool Liquidity : {parseFloat(object.liquidity).toFixed(2)} <br />
              Total Investment : {object.totalInvestment} USD <br />
              LP Token Balance : {parseFloat(object.tokenBalance).toFixed(2)}
            </>
          }>
          <div style={{ width: '90%', marginTop: '12px', marginLeft: '30px' }}>
            <div
              style={{
                display: 'inline-block',
                width: '45%',
                textAlign: 'left',
                wordBreak: 'break-all',
              }}>
              ${object.token0Symbol}-${object.token1Symbol}
            </div>

            <div style={{ display: 'inline-block', width: '15%' }} />

            <div style={{ display: 'inline-block', width: '40%', fontSize: '13px' }}>
              {object.totalInvestment} USD
            </div>

            <br />
          </div>
        </Tooltip>
      );
    });

    setPoolsContent(content);
  }, [PoolsData]);

  //created seperate component as SushiLPToken.js, so no need here and commented
  // useEffect(() => {
  //   const content = SushiPoolsData.map((object) => (
  //     <Tooltip
  //       title={
  //         <>
  //           Token 0 : {object.token0name} <br />
  //           Token 1 : {object.token1name} <br />
  //           Pool Share : {parseFloat((object.tokenBalance / object.tokenSupply) * 100).toFixed(
  //             2
  //           )} % <br />
  //           Pool Liquidity : {parseFloat(object.liquidity).toFixed(2)} <br />
  //           Total Investment : {object.totalInvestment} USD <br />
  //           LP Token Balance : {parseFloat(object.tokenBalance).toFixed(2)}
  //         </>
  //       }>
  //       <div style={{ width: '90%', marginTop: '12px', marginLeft: '30px' }}>
  //         <div
  //           style={{
  //             display: 'inline-block',
  //             width: '45%',
  //             textAlign: 'left',
  //             wordBreak: 'break-all',
  //           }}>
  //           ${object.token0Symbol}-${object.token1Symbol}
  //         </div>

  //         <div style={{ display: 'inline-block', width: '15%' }} />

  //         <div style={{ display: 'inline-block', width: '40%', fontSize: '13px' }}>
  //           {object.totalInvestment} USD
  //         </div>

  //         <br />
  //       </div>
  //     </Tooltip>
  //   ));

  //   setSushiPoolsContent(content);
  // }, [SushiPoolsData]);

  useEffect(() => {
    const content = CompoundLoansData.map((object) => (
      <Tooltip
        title={
          <>
            {object.name} <br />
            Token Price : {parseFloat(object.price).toFixed(4)} USD <br />
            Total Tokens : {object.value} ${object.symbol} <br />
            Total Investment : {object.totalInvestment} USD
          </>
        }>
        <div style={{ width: '90%', marginTop: '12px', marginLeft: '30px' }}>
          <div style={{ display: 'inline-block', width: '15%' }}>
            <div
              style={{
                height: '40px',
                padding: '5px',
                borderRadius: '10px',
                backgroundImage:
                  'linear-gradient(to right,  rgba(20,24,30,.1), rgba(173,204,151,.5), rgba(20,24,30,.1))',
              }}>
              <center>
                <img src={object.image} style={{ height: '30px', marginTop: '' }} alt="" />
              </center>
            </div>
          </div>

          <div style={{ display: 'inline-block', width: '10%' }} />

          <div style={{ display: 'inline-block', width: '30%', textAlign: 'left' }}>
            ${object.symbol}
          </div>

          {/* <div style={{display:'inline-block', width:'30%'}}>
                {object.value} ${object.symbol}
            </div> */}

          <div style={{ display: 'inline-block', width: '40%', fontSize: '13px' }}>
            {object.totalInvestment} USD
          </div>

          <br />
        </div>
      </Tooltip>
    ));

    setCompoundLoansContent(content);
  }, [CompoundLoansData]);

  useEffect(() => {
    const content = CompoundSavingsData.map((object) => (
      <Tooltip
        title={
          <>
            {object.name} <br />
            Token Price : {parseFloat(object.price).toFixed(4)} USD <br />
            Total Tokens : {object.value} ${object.symbol} <br />
            Total Investment : {object.totalInvestment} USD
          </>
        }>
        <div style={{ width: '90%', marginTop: '12px', marginLeft: '30px' }}>
          <div style={{ display: 'inline-block', width: '15%' }}>
            <div
              style={{
                height: '40px',
                padding: '5px',
                borderRadius: '10px',
                backgroundImage:
                  'linear-gradient(to right,  rgba(20,24,30,.1), rgba(173,204,151,.5), rgba(20,24,30,.1))',
              }}>
              <center>
                <img src={object.image} style={{ height: '30px', marginTop: '' }} alt="" />
              </center>
            </div>
          </div>

          <div style={{ display: 'inline-block', width: '10%' }} />

          <div style={{ display: 'inline-block', width: '30%', textAlign: 'left' }}>
            ${object.symbol}
          </div>

          {/* <div style={{display:'inline-block', width:'30%'}}>
                {object.value} ${object.symbol}
            </div> */}

          <div style={{ display: 'inline-block', width: '40%', fontSize: '13px' }}>
            {object.totalInvestment} USD
          </div>

          <br />
        </div>
      </Tooltip>
    ));

    setCompoundSavingsContent(content);
  }, [CompoundSavingsData]);

  useEffect(() => {
    const content = BalancerPoolsData.map((object) => (
      <Tooltip
        title={
          <>
            <div
              style={{
                display: 'inline-block',
                textAlign: 'left',
                wordBreak: 'break-word',
              }}>
              Tokens in Pool: <br />
              {object.tokens.map((obj) => (
                <>
                  ${obj.symbol}
                  <br />
                </>
              ))}
            </div>
            <br />
            <br />
            Pool Percentage : {parseFloat(object.poolPercentage).toFixed(2)} % <br />
            Pool Liquidity : {parseFloat(object.liquidity).toFixed(2)} USD <br />
            Total Investment : {object.totalInvestment} USD
          </>
        }>
        <div style={{ width: '90%', marginTop: '12px', marginLeft: '20px' }}>
          <br />
          <div
            style={{
              display: 'inline-block',
              width: '60%',
              textAlign: 'left',
              wordBreak: 'break-word',
            }}>
            <div style={{ display: 'flex' }}>
              {object.imageData.map((obj) => (
                <div style={{ display: 'flex', marginLeft: '-10px' }}>
                  <img
                    src={obj}
                    alt="noimage"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                    width="30px"
                    height="30px"></img>
                  {/* <>${obj.symbol}-</> */}
                </div>
              ))}
            </div>
            {object.tokens.map((obj) => (
              <>
                <>{obj.symbol}-</>
              </>
            ))}
            <div style={{ display: 'flex', width: '300px' }}>
              <p>Value</p>
              <>&nbsp;-&nbsp;{parseFloat(object.priceSum).toFixed(2)}&nbsp;USD</>
            </div>
            <div style={{ display: 'flex', width: '300px' }}>
              <p>LP price</p>
              <>&nbsp;-&nbsp;{parseFloat(object.price).toFixed(2)}&nbsp;USD</>
            </div>
            <div style={{ display: 'flex', width: '300px' }}>
              <p>LP balance</p>
              <>&nbsp;-&nbsp;{parseFloat(object.balance).toFixed(3)}&nbsp;</>
            </div>
            <div style={{ display: 'flex', width: '300px' }}>
              <p>Liquidity</p>
              <>&nbsp;-&nbsp;{parseFloat(object.liquidity).toFixed(2)}&nbsp;</>
            </div>
            <div style={{ display: 'flex', width: '300px' }}>
              <p>Chain</p>
              <>&nbsp;-&nbsp;Ethereum&nbsp;</>
            </div>
            <div style={{ display: 'flex', width: '300px' }}>
              <p>Protocol</p>
              <>&nbsp;-&nbsp;Balancer-V1&nbsp;</>
            </div>
            {/* <>
              <>&nbsp;{parseFloat(object.totalInvestment).toFixed(2)}&nbsp;USD</>
            </> */}
          </div>
          {/* <div
            style={{ display: 'inline-block', width: '30%', fontSize: '15px', marginLeft: '20px' }}>
            {parseFloat(object.price).toFixed(2)} USD
          </div> */}
        </div>
      </Tooltip>
    ));

    setBalancerPoolsContent(content);
  }, [BalancerPoolsData]);

  useEffect(() => {
    const content = BalancerPoolsDatav2.map((object) => (
      <>
        {/*<Investment protocol={object} />*/}
        <Tooltip
          title={
            <>
              <div
                style={{
                  display: 'inline-block',
                  textAlign: 'left',
                  wordBreak: 'break-word',
                }}>
                Tokens in Pool: <br />
                {object.tokens.map((obj) => (
                  <>
                    ${obj.symbol}
                    <br />
                  </>
                ))}
              </div>
              <br />
              <br />
              Pool Percentage : {parseFloat(object.poolPercentage).toFixed(2)} % <br />
              Pool Liquidity : {parseFloat(object.liquidity).toFixed(2)} USD <br />
              Total Investment : {object.totalInvestment} USD
            </>
          }>
          <div style={{ width: '90%', marginTop: '12px', marginLeft: '20px' }}>
            <br />
            <div
              style={{
                display: 'inline-block',
                width: '60%',
                textAlign: 'left',
                wordBreak: 'break-word',
              }}>
              {object.tokens.map((obj) => (
                <>
                  <>${obj.symbol}-</>
                </>
              ))}
              <>
                <>&nbsp;{parseFloat(object.balance).toFixed(2)}&nbsp;-</>
              </>
              <>
                <>&nbsp;{parseFloat(object.price).toFixed(2)}&nbsp;USD</>
              </>
            </div>

            {/* <div style={{ display: 'inline-block', width: '10%' }}>
            {object.value} ${object.symbol}
          </div> */}

            <div
              style={{
                display: 'inline-block',
                width: '30%',
                fontSize: '15px',
                marginLeft: '20px',
              }}>
              {object.totalInvestment} USD
            </div>
            {/* <hr style={{ width: '30%' }} /> */}
          </div>
        </Tooltip>
      </>
    ));

    setBalancerPoolsContentv2(content);
  }, [BalancerPoolsDatav2]);

  useEffect(() => {
    const content = CurveStakeData.map((object) => (
      <Tooltip
        title={
          <>
            {object.name} <br />
            Share Price : {parseFloat(object.price).toFixed(4)} USD <br />
            Total Shares : {parseFloat(object.balance).toFixed(2)} ${object.symbol} <br />
            Total Investment : {parseFloat(object.totalInvestment).toFixed(2)} USD <br />
          </>
        }>
        <div style={{ width: '90%', marginTop: '12px', marginLeft: '30px' }}>
          <div style={{ display: 'inline-block', width: '15%' }}>
            <div
              style={{
                height: '40px',
                padding: '5px',
                borderRadius: '10px',
                backgroundImage:
                  'linear-gradient(to right,  rgba(20,24,30,.1), rgba(173,204,151,.5), rgba(20,24,30,.1))',
              }}>
              <center>
                <img
                  src={object.image ? object.image : CurveLogo}
                  style={{ height: '30px', marginTop: '' }}
                  alt=""
                />
              </center>
            </div>
          </div>

          <div style={{ display: 'inline-block', width: '10%' }} />

          <div style={{ display: 'inline-block', width: '40%', textAlign: 'left' }}>
            {object.symbol}
          </div>

          {/* <div style={{display:'inline-block', width:'30%'}}>
              {object.value} ${object.symbol}
          </div> */}

          <div style={{ display: 'inline-block', width: '30%', fontSize: '13px' }}>
            {parseFloat(object.totalInvestment).toFixed(2)} USD
          </div>

          <br />
        </div>
      </Tooltip>
    ));

    setCurveStakeContent(content);
  }, [CurveStakeData]);

  useEffect(() => {
    async function getAaveV2Data() {
      await axios
        .post(`https://api.thegraph.com/subgraphs/name/aave/protocol-v2`, {
          query: `{
                    userReserves(
                      where:{
                        user:"${accountAddress}"
                      }
                    )
                    {
                      reserve{
                        symbol
                        name
                        aToken{
                          underlyingAssetAddress
                          underlyingAssetDecimals
                        }
                      }
                      currentATokenBalance
                      currentVariableDebt
                    }
                  }`,
        })
        .then(async (response) => {
          if (response.data && response.data.data) {
            const savings = [];
            const loans = [];
            let totDebt = 0;
            let totSave = 0;
            let res = response.data.data.userReserves;

            // filtering res data for the user reserves with currentTokenBalance > `0`, where `0` is a string
            // TBD, for now both checks are here for the 0 as a string and 0 as a number.
            // Need to remove one of htem on the basis it is working on the main, staging and the production code.
            res = res.filter((userReserve) => {
              if (userReserve.currentATokenBalance !== '0') {
                return true;
              }
            });

            for (var i = 0; i < res.length; i++) {
              await axios
                .get(
                  `https://api.coingecko.com/api/v3/coins/ethereum/contract/${res[i].reserve.aToken.underlyingAssetAddress}`,
                  {},
                  {}
                )
                .then(async (priceData) => {
                  res[i].image = priceData.data.image.thumb;
                  res[i].price = priceData.data.market_data.current_price.usd;
                })
                .catch((err) => {});

              if (res[i].currentATokenBalance > 0) {
                var object = {};
                object.name = res[i].reserve.name;
                object.symbol = res[i].reserve.symbol;
                object.tokenAddress = res[i].reserve.aToken.underlyingAssetAddress;
                object.value = (
                  parseFloat(res[i].currentATokenBalance) /
                  10 ** parseInt(res[i].reserve.aToken.underlyingAssetDecimals)
                ).toFixed(2);
                object.image = res[i].image;
                object.price = res[i].price;
                object.totalInvestment = (object.value * object.price).toFixed(2);
                totSave += parseFloat(object.totalInvestment);
                savings.push(object);
              }

              if (res[i].currentVariableDebt > 0) {
                const t = {
                  name: res[i].reserve.name,
                  symbol: res[i].reserve.symbol,
                  tokenAddress: res[i].reserve.aToken.underlyingAssetAddress,
                  value: (
                    parseFloat(res[i].currentVariableDebt) /
                    10 ** parseInt(res[i].reserve.aToken.underlyingAssetDecimals)
                  ).toFixed(2),
                  image: res[i].image,
                  price: res[i].price,
                  totalInvestment: (object.value * object.price).toFixed(2),
                };

                totDebt += parseFloat(t.totalInvestment);
                loans.push(t);
              }
            }
            savings.sort((a, b) => parseFloat(b.totalInvestment) - parseFloat(a.totalInvestment));
            loans.sort((a, b) => parseFloat(b.totalInvestment) - parseFloat(a.totalInvestment));
            // savings = SavingsData.concat(savings)
            // loans = LoansData.concat(loans)
            setAaveLoansTotal(totDebt);
            setAaveSavingsTotal(totSave);
            setSavingsData(savings);
            SetLoansData(loans);
          }
        });
    }
    async function getUniV2Data() {
      await axios
        .post(`https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2`, {
          query: `{
                    liquidityPositions(
                      first:1000
                      where:{
                        user:"${accountAddress}"
                        liquidityTokenBalance_gt:0
                      }
                      orderDirection:desc
                    )
                  
                    {
                      pair{
                        totalSupply
                        id
                        reserveUSD
                        token0{
                          name
                          symbol
                        }
                        token1{
                          name
                          symbol
                        }
                      }
                      liquidityTokenBalance
                    }
                    }`,
        })
        .then(async (response) => {
          if (response.data.data) {
            let tot = 0;
            const pools = [];
            const res = response.data.data.liquidityPositions;
            for (let i = 0; i < res.length; i++) {
              const object = {};
              object.id = res[i].pair.id;
              object.tokenBalance = res[i].liquidityTokenBalance;
              object.tokenSupply = res[i].pair.totalSupply;
              object.token0name = res[i].pair.token0.name;
              object.token1name = res[i].pair.token1.name;
              object.token0Symbol = res[i].pair.token0.symbol;
              object.token1Symbol = res[i].pair.token1.symbol;
              object.liquidity = res[i].pair.reserveUSD;
              object.totalInvestment = (
                (res[i].liquidityTokenBalance / res[i].pair.totalSupply) *
                res[i].pair.reserveUSD
              ).toFixed(2);
              if (object.totalInvestment > 0) {
                tot += parseFloat(object.totalInvestment);
                pools.push(object);
              }
            }
            pools.sort((a, b) => parseFloat(b.totalInvestment) - parseFloat(a.totalInvestment));
            setUniV2Total(tot);
            setPoolsData(pools);
          }
        });
    }
    async function getCompoundV2Data() {
      await axios
        .post(`https://api.thegraph.com/subgraphs/name/graphprotocol/compound-v2`, {
          query: `{
                    accountCTokens(
                      where:{
                        account:"${accountAddress}"
                      }
                    ){
                      id
                      market{
                        underlyingAddress
                        underlyingPriceUSD
                        underlyingSymbol
                        underlyingName
                        name
                        symbol
                        supplyRate
                        borrowRate
                      }
                      borrowBalanceUnderlying
                      supplyBalanceUnderlying
                    }
                  }
                  `,
        })
        .then(async (response) => {
          if (response.data && response.data.data) {
            const savings = [];
            const loans = [];
            let totDebt = 0;
            let totSave = 0;
            const res = response.data.data.accountCTokens;
            for (var i = 0; i < res.length; i++) {
              await axios
                .get(
                  `https://api.coingecko.com/api/v3/coins/ethereum/contract/${res[i].market.underlyingAddress}`,
                  {},
                  {}
                )
                .then(async (priceData) => {
                  res[i].image = priceData.data.image.thumb;
                  // res[i].price = priceData.data.market_data.current_price.usd
                })
                .catch((err) => {});

              if (res[i].borrowBalanceUnderlying > 0) {
                const object = {};
                object.value = res[i].borrowBalanceUnderlying;
                object.borrowRate = res[i].market.borrowRate;
                object.name = res[i].market.underlyingName;
                object.symbol = res[i].market.underlyingSymbol;
                object.tokenAddress = res[i].market.underlyingAddress;
                object.price = res[i].market.underlyingPriceUSD;
                object.image = res[i].image;
                object.totalInvestment = parseFloat(
                  res[i].market.underlyingPriceUSD * res[i].supplyBalanceUnderlying
                ).toFixed(2);
                totDebt += parseFloat(object.totalInvestment);
                loans.push(object);
              }
              if (res[i].supplyBalanceUnderlying > 0) {
                const supply = {};
                supply.value = parseFloat(res[i].supplyBalanceUnderlying).toFixed(2);
                supply.borrowRate = parseFloat(res[i].market.supplyRate).toFixed(2);
                supply.name = res[i].market.underlyingName;
                supply.symbol = res[i].market.underlyingSymbol;
                supply.tokenAddress = res[i].market.underlyingAddress;
                supply.price = res[i].market.underlyingPriceUSD;
                supply.image = res[i].image;
                supply.totalInvestment = parseFloat(
                  res[i].market.underlyingPriceUSD * res[i].supplyBalanceUnderlying
                ).toFixed(2);
                totSave += parseFloat(supply.totalInvestment);
                savings.push(supply);
              }
            }
            savings.sort((a, b) => parseFloat(b.totalInvestment) - parseFloat(a.totalInvestment));
            loans.sort((a, b) => parseFloat(b.totalInvestment) - parseFloat(a.totalInvestment));
            setCompLoansTotal(totDebt);
            setCompSavingsTotal(totSave);
            SetCompoundLoansData(loans);
            setCompoundSavingsData(savings);
          }
        });
    }
    async function getBalancerData() {
      await axios
        .post(`https://api.thegraph.com/subgraphs/name/balancer-labs/balancer`, {
          query: `{
                    users
                    (
                      where:{
                        id:"${accountAddress}"
                      }
                    )
                    {
                      id
                      sharesOwned {
                        id
                        balance
                        poolId{
                          symbol
                          tokensList
                          tokens{
                            symbol
                            balance
                          }
                          tokensList
                          totalShares
                          liquidity
                          cap
                          tokensCount
                          totalSwapVolume
                          tx
                        }
                      }
                      
                    }
                  }`,
        })
        .then(async (response) => {
          if (response.data.data.users[0]) {
            const res = response.data.data.users[0].sharesOwned;
            const pools = [];
            let tot = parseInt(0);
            for (let i = 0; i < res.length; i++) {
              const object = {};
              object.balance = res[i].balance;
              object.liquidity = res[i].poolId.liquidity;
              object.tokens = res[i].poolId.tokens;
              object.totalShares = res[i].poolId.totalShares;
              object.poolPercentage = (res[i].balance / res[i].poolId.totalShares) * 100;
              object.totalInvestment = parseFloat(
                (res[i].poolId.liquidity / res[i].poolId.totalShares) * res[i].balance
              ).toFixed(2);
              object.price = object.totalInvestment / res[i].balance;
              object.tokenList = res[i].poolId.tokensList;
              if (object.totalInvestment > 0) {
                pools.push(object);
                let Images = [];
                let CurrentPrice = [];
                let TokenPoolPrice = [];
                let sum = 0;
                for (var k = 0; k < object.tokenList.length; k++) {
                  await axios
                    .get(
                      `https://api.coingecko.com/api/v3/coins/ethereum/contract/${object.tokenList[k]}`
                    )
                    .then(async ({ data }) => {
                      CurrentPrice.push(data.market_data.current_price.usd);
                      CurrentPrice.push(object.tokenList[k]);
                      for (var l = 0; l < object.tokenList.length; l++) {
                        if (data.symbol.toLowerCase() == object.tokens[l].symbol.toLowerCase()) {
                          TokenPoolPrice.push(
                            data.market_data.current_price.usd * object.tokens[l].balance
                          );
                          sum = sum + data.market_data.current_price.usd * object.tokens[l].balance;
                        }
                      }
                      Images.push(data.image.large);
                    })
                    .catch((err) => {
                      console.log('error in fetching', err);
                    });
                }
                object.imageData = Images;
                object.currentPrice = CurrentPrice;
                object.tokenPoolPrice = TokenPoolPrice;
                object.totalValue = sum;
                tot += object.totalValue;
              }
            }
            pools.sort((a, b) => parseFloat(b.totalInvestment) - parseFloat(a.totalInvestment));
            setBalancerTotal(tot);
            setBalancerPoolsData(pools);
          }
        });
    }
    // v2
    async function getBalancerV2Data() {
      await axios
        .post(`https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-v2`, {
          query: `{
            users
            (
              where:{
                id:"${accountAddress}"
              }
            )
            {
              id
              sharesOwned {
                id
                balance
                poolId{
                  symbol
                  tokensList
                  tokens{
                    symbol
                    balance
                  }
                  tokensList
                  totalShares
                  totalLiquidity
                }
              }
            }
          }`,
        })
        .then(async (response) => {
          if (response.data.data.users[0]) {
            const res = response.data.data.users[0].sharesOwned;
            const pools = [];
            let tot = parseInt(0);
            for (let i = 0; i < res.length; i++) {
              const object = {};
              object.balance = res[i].balance;
              object.liquidity = res[i].poolId.totalLiquidity;
              object.tokens = res[i].poolId.tokens;
              object.totalShares = res[i].poolId.totalShares;
              object.poolPercentage = (res[i].balance / res[i].poolId.totalShares) * 100;
              object.totalValue =
                (res[i].poolId.totalLiquidity / res[i].poolId.totalShares) * res[i].balance;
              object.price = object.totalValue / res[i].balance;
              if (object.totalValue > 0) {
                tot += parseFloat(object.totalValue).toFixed(2);
                pools.push(object);
              }
            }
            pools.sort((a, b) => parseFloat(b.totalValue) - parseFloat(a.totalValue));
            getTotalValueBalancerV2(pools);
            setBalancerPoolsDatav2(pools);
          }
        });
    }
    //created a seperate component SushiLPToken.js , so commented this logic here
    // async function getSushiV2Data() {
    //   await axios
    //     .post(
    //       `https://gateway.thegraph.com/api/${addresses.graph_API}/subgraphs/id/0x4bb4c1b0745ef7b4642feeccd0740dec417ca0a0-0`,
    //       {
    //         query: `{
    //                 users(
    //                  where:{
    //                    id:"${accountAddress}"
    //                  }
    //                ){
    //                  liquidityPositions(first:1000
    //                      where:{
    //                      liquidityTokenBalance_gt:0
    //                      }
    //                  ){
    //                    liquidityTokenBalance
    //                    pair{
    //                      id
    //                      totalSupply
    //                      reserveUSD
    //                      token0{
    //                        id
    //                        name
    //                        symbol
    //                      }
    //                      token1{
    //                        id
    //                        name
    //                        symbol
    //                      }
    //                    }
    //                  }
    //                }
    //                }`,
    //       }
    //     )
    //     .then(async (response) => {
    //       if (response.data.data) {
    //         if (response.data.data.users[0]) {
    //           let tot = 0;
    //           const pools = [];
    //           try {
    //             const res = response.data.data.users[0].liquidityPositions;
    //             for (let i = 0; i < res.length; i++) {
    //               const object = {};
    //               object.id = res[i].pair.id;
    //               object.tokenBalance = res[i].liquidityTokenBalance;
    //               object.tokenSupply = res[i].pair.totalSupply;
    //               object.token0name = res[i].pair.token0.name;
    //               object.token1name = res[i].pair.token1.name;
    //               object.token0Symbol = res[i].pair.token0.symbol;
    //               object.token1Symbol = res[i].pair.token1.symbol;
    //               object.liquidity = res[i].pair.reserveUSD;
    //               object.totalInvestment = (
    //                 (res[i].liquidityTokenBalance / res[i].pair.totalSupply) *
    //                 res[i].pair.reserveUSD
    //               ).toFixed(2);
    //               tot += parseFloat(object.totalInvestment);
    //               pools.push(object);
    //             }
    //             pools.sort((a, b) => parseFloat(b.totalInvestment) - parseFloat(a.totalInvestment));
    //             setSushiV2Total(tot);
    //             setSushiPoolsData(pools);
    //           } catch (err) {
    //             console.log(err);
    //           }
    //         }
    //       }
    //     });
    // }

    async function getCurveData() {
      await axios
        .post(
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
                  gauges{
                    originalBalance
                    gauge{
                      pool{
                        lpToken{
                          name
                          symbol
                          decimals
                        }
                        virtualPrice
                      }
                    }
                  }
                }
              }`,
          }
        )
        .then(async (response) => {
          if (response.data.data) {
            if (response.data.data.accounts[0]) {
              const res = response.data.data.accounts[0].gauges;

              const stakings = [];
              let tot = 0;
              try {
                for (let i = 0; i < res.length; i++) {
                  const object = {};
                  object.decimals = res[i].gauge.pool.lpToken.decimals;
                  object.symbol = res[i].gauge.pool.lpToken.symbol;
                  object.name = res[i].gauge.pool.lpToken.name;
                  object.balance = res[i].originalBalance / 10 ** object.decimals;
                  object.tokens = [
                    {
                      balance: res[i].originalBalance / 10 ** object.decimals,
                      symbol: res[i].gauge.pool.lpToken.symbol,
                    },
                  ];
                  object.protocol = 'Curve Staking';
                  object.chain = 'Ethereum';
                  object.price = res[i].gauge.pool.virtualPrice;
                  object.totalValue = parseFloat(object.price * object.balance).toFixed(2);
                  tot += parseFloat(object.totalValue);
                  if (object.totalValue > 0) {
                    stakings.push(object);
                  }
                }

                stakings.sort((a, b) => parseFloat(b.totalValue) - parseFloat(a.totalValue));
              } catch (err) {
                console.log('Err from Curve staking process', err);
              }
              setCurveStakeData(stakings);
              setCurveStakeTotal(tot);
            }
          }
        });
    }

    getCompoundV2Data();
    getAaveV2Data();
    getUniV2Data();
    getBalancerData();
    //getSushiV2Data();
    getCurveData();
    getBalancerV2Data();
  }, [accountAddress]);

  const sumObjectsByKey = (...objs) => {
    return objs.reduce((el, acc) => {
      return el + +acc.totalTokensBalance;
    }, 0);
  };

  const balances = PoolsData.reduce((el, acc) => {
    return el + +acc.totalInvestment;
  }, 0);

  return (
    <InvestmentWrapper>
      {/*=========================================>*/}
      <PoolsBlock //first
        isLightTheme={theme}
        style={{
          display:
            PoolsData.length > 0 ||
            BalancerPoolsData.length > 0 ||
            BalancerPoolsDatav2.length > 0 ||
            CompoundSavingsData.length > 0 ||
            yearnYTokenData.length > 0 ||
            SushiPoolsData.length > 0 ||
            DisplayBancor ||
            Mstablepools.length > 0
              ? ''
              : 'none',
        }}>
        <Header>
          <Title isLightTheme={theme}>{'Liquidity pools'}</Title>
          <ToggleButton onClick={poolsHandler} isOpen={isPoolsOpen} />
        </Header>
        <div style={{ padding: '0 29px 20px 26px', marginBottom: '20px' }}>
          <TotalValueField isLightTheme={theme}>
            <TotalTitle isLightTheme={theme}>{'Total Value'}</TotalTitle>
            <TotalEmptyCell></TotalEmptyCell>
            <TotalValue isLightTheme={theme}>
              $
              {numberWithCommas(
                parseFloat(
                  balances +
                    BalancerTotal +
                    BalancerTotalv2 +
                    BancorPoolTotal +
                    UniV2Total +
                    SushiV2Total +
                    (!isNaN(IronBankSavings) && IronBankSavings)
                  // BalancerTotal
                ).toFixed(2)
              )}
            </TotalValue>
          </TotalValueField>
        </div>
        {isPoolsOpen && (
          <>
            {PoolsData.map((object) => {
              return (
                <ValueProtocol
                  totalInvestment={object.totalInvestment}
                  token0Symbol={object.token0Symbol}
                  token1Symbol={object.token1Symbol}
                  liquidity={object.liquidity}
                  protocol={'Uniswap V2'}
                />
              );
            })}
            {/* {SushiPoolsData.map((object) => {
              return (
                <ValueProtocol
                  totalInvestment={object.value}
                  token0Symbol={object.token0Symbol}
                  token1Symbol={object.token1Symbol}
                  liquidity={object.liquidity}
                  protocol={'SushiSwap V2'}
                />
              );
            })} */}
            <SushiLPToken accountAddress={accountAddress} />
            <BancorPools
              setPoolTotal={setBancorPoolTotal}
              setDisplay={setDisplayBancor}
              accountAddress={accountAddress}
            />
            {BalancerPoolsData.map((object, index) => {
              return (
                <Investment
                  key={index}
                  protocol={object}
                  chain={'Ethereum'}
                  protocolName={'Balancer V1'}
                />
              );
            })}
            {BalancerPoolsDatav2.map((object, index) => {
              return (
                <Investment
                  key={index}
                  protocol={object}
                  chain={'Ethereum'}
                  protocolName={'Balancer V2'}
                />
              );
            })}
            {yearnYTokenData.map((object, index) => {
              return <Investment key={index} protocol={object} />;
            })}
            <UniswapV2 accountAddress={accountAddress} />
            <AaveStaking accountAddress={accountAddress} />
            <Cream
              setTotal={setCreamTotal}
              setDisplay={setCreamDisplay}
              accountAddress={accountAddress}
            />
            {SavingsContent}
            <CreamIronBank
              setIronBankSavings={setIronBankSavings}
              accountAddress={accountAddress}
            />
            {CompoundSavingsContent}
          </>
        )}
        <MstablePools accountAddress={accountAddress} />
      </PoolsBlock>
      {/*=========================================>*/}
      <PoolsBlock //second
        isLightTheme={theme}
        style={{
          display:
            CurveStakeData.length > 0 ||
            convexStakeData.length > 0 ||
            snxCollateralData.length > 0 ||
            BeaconData.length > 0 ||
            uniswapV2lp.length > 0 ||
            curveStakingData.length > 0 ||
            SLPTokenData.length > 0 ||
            curveLpToken.length > 0 ||
            uniswapV2array.length > 0 ||
            liquityStakeAmountUSD > 0 ||
            mstableStake.length > 0 ||
            mstableSavings.length > 0
              ? ''
              : 'none',
        }}>
        <Header>
          <Title isLightTheme={theme}>{'Staked Assets'}</Title>
          <ToggleButton onClick={stakedHandler} isOpen={isStakedAssetsOpen} />
        </Header>
        <div style={{ padding: '0 29px 20px 26px', marginBottom: '20px' }}>
          <TotalValueField isLightTheme={theme}>
            <TotalTitle isLightTheme={theme}>{'Total Value'}</TotalTitle>
            <TotalEmptyCell></TotalEmptyCell>
            <TotalValue isLightTheme={theme}>
              $
              {numberWithCommas(
                parseFloat(
                  +convexStakeTotalString +
                    +curveLpTokenTotalString +
                    snxTokenTotal +
                    CurveStakeTotal
                ).toFixed(2)
              )}
            </TotalValue>
          </TotalValueField>
        </div>
        {isStakedAssetsOpen && (
          <>
            {CurveStakeData.map((object) => {
              return <Investment protocol={object} logoImage={CurveLogo} />;
            })}
            {convexStakeData.map((object) => {
              return <Investment protocol={object} />;
            })}
            {snxCollateralData.map((object) => {
              return <Investment protocol={object} />;
            })}
            {Array.isArray(SLPTokenData) &&
              SLPTokenData.map((object) => {
                return <SushiProtocol protocol={object} protocolName={'Sushi'} />;
              })}
            {Array.isArray(uniswapV2lp) &&
              uniswapV2lp.map((object) => {
                return (
                  <ValueProtocol
                    protocol={object}
                    totalInvestment={object.totalInvestment}
                    token0Symbol={object.token0Symbol}
                    token1Symbol={object.token1Symbol}
                    liquidity={object.liquidity}
                    chain={'Ethereum'}
                    protocolName={'Uniswap-V2'}
                  />
                );
              })}
            {curveStakingData.map((object) => {
              return <Investment protocol={object} />;
            })}
            <Ethereum2Staking accountAddress={accountAddress} />
            <SushiStaking accountAddress={accountAddress} />
            <UniStaking accountAddress={accountAddress} />
            <YearnFinance accountAddress={accountAddress} onYearnTokenValue={getYearnTokenValue} />
            {curveToken.map((object) => {
              return <Investment protocol={object} />;
            })}
            <CurveToken accountAddress={accountAddress} />

            {curveLpToken &&
              curveLpToken.map((object) => {
                return <Investment protocol={object} />;
              })}
            {Array.isArray(BeaconData) &&
              BeaconData.map((object) => {
                return <Investment protocol={object} />;
              })}
            <CurveLpToken accountAddress={accountAddress} onCurveLptoken={getCurveLpToken} />
            <Synthetix
              accountAddress={accountAddress}
              onSynthetixTokenValue={getSynthetixTokenData}
            />
            {snxTokenTotal > 0 &&
              [combinedSnxTokenData].map((object) => {
                return (
                  <Investment tokenName={object.symbol} object={object.image} protocol={object} />
                );
              })}
            <UniStaking accountAddress={accountAddress} />
            <PickleStake accountAddress={accountAddress} />
            <LiquityStaking accountAddress={accountAddress} />
            <ConvexStaking accountAddress={accountAddress} />
            <SnowSwapStaking accountAddress={accountAddress} />
            <MstableSavings accountAddress={accountAddress} />
            <MstableFarm accountAddress={accountAddress} />
          </>
        )}
      </PoolsBlock>
      {/*=======================================>*/}
      <PoolsBlock //third
        isLightTheme={theme}
        style={{
          display: YearnData.length > 0 || snxCollateralData > 0 ? '' : 'none',
        }}>
        <Header>
          <Title isLightTheme={theme}>{'Derivatives'}</Title>
          <ToggleButton onClick={othersHandler} isOpen={isOthersOpen} />
        </Header>
        <div style={{ padding: '0 29px 20px 26px', marginBottom: '20px' }}>
          <TotalValueField isLightTheme={theme}>
            <TotalTitle isLightTheme={theme}>{'Total Value'}</TotalTitle>
            <TotalEmptyCell></TotalEmptyCell>
            <TotalValue isLightTheme={theme}>
              ${numberWithCommas(parseFloat(snxCollateralTotal).toFixed(2))}
            </TotalValue>
          </TotalValueField>
        </div>
        {isOthersOpen && (
          <>
            {snxCollateralData.map((object) => {
              return <Investment protocol={object} />;
            })}
            {YearnData.map((object) => {
              return <Investment protocol={object} />;
            })}
          </>
        )}
      </PoolsBlock>
      {/*=======================================>*/}
      <PoolsBlock //four
        isLightTheme={theme}
        style={{
          display: pickeDill.length > 0 ? '' : 'none',
        }}>
        <Header>
          <Title isLightTheme={theme}>{'Vaults'}</Title>
          <ToggleButton onClick={othersHandler} isOpen={isOthersOpen} />
        </Header>
        <div style={{ padding: '0 29px 20px 26px', marginBottom: '20px' }}>
          <TotalValueField isLightTheme={theme}>
            <TotalTitle isLightTheme={theme}>{'Total Value'}</TotalTitle>
            <TotalEmptyCell></TotalEmptyCell>
            <TotalValue isLightTheme={theme}>
              ${numberWithCommas(parseFloat(snxCollateralTotal).toFixed(2))}
            </TotalValue>
          </TotalValueField>
        </div>
        {isOthersOpen && (
          <>
            {/* <PickleDill accountAddress={accountAddress} /> */}
            {pickeDill.map((object, index) => {
              return <Investment key={index} protocol={object} logoImage={object.icon} />;
            })}
          </>
        )}
      </PoolsBlock>
    </InvestmentWrapper>
  );
}
