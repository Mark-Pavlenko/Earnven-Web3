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
import CurveToken from '../CurveToken';
import CurveFarming from '../CurveFarming';
import Liquity from '../Liquity';
import OlympusStaking from '../OlympusStaking';
import SushiLPToken from '../SushiLPToken';
import CompoundFinance from '../CompoundFinance';
import BalancerV2 from '../LiqudityPools/BalancerV2';
import PickleDill from '../Vaults/PickleDill';
import UniswapV2 from '../LiqudityPools/UniswapV2';
import MStableStaking from '../MStableStaking';
import Alchemix from '../Alchemix';

export default function Index({ accountAddress }) {
  //console.log('TestComp load from protocols index');
  return (
    <React.Fragment>
      <Ethereum2Staking accountAddress={accountAddress} />
      <AaveStaking accountAddress={accountAddress} />
      <CurveLpToken accountAddress={accountAddress} />
      <CurveToken accountAddress={accountAddress} />
      <CurveFarming accountAddress={accountAddress} />
      <Liquity accountAddress={accountAddress} />
      <SushiLPToken accountAddress={accountAddress} />
      <CompoundFinance accountAddress={accountAddress} />
      <OlympusStaking accountAddress={accountAddress} />
      <YearnFinance accountAddress={accountAddress} />
      <Synthetix accountAddress={accountAddress} />
      <ConvexStaking accountAddress={accountAddress} />
      <SnowSwapStaking accountAddress={accountAddress} />
      <CreamIronBank accountAddress={accountAddress} getTotal={() => {}} />
      <BalancerV2 accountAddress={accountAddress} />
      <PickleDill accountAddress={accountAddress} />
      <UniswapV2 accountAddress={accountAddress} />
      <SushiStaking accountAddress={accountAddress} />
      <UniStaking accountAddress={accountAddress} />
      <MStableStaking accountAddress={accountAddress} />
      <Alchemix accountAddress={accountAddress} />
    </React.Fragment>
  );
}
