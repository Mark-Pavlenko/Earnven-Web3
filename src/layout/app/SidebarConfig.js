import React from 'react';
import dashboardLogo from '../../assets/icons/trello.svg';
import defiMadeEasyLogo from '../../assets/icons/defimadeeasy.svg';
import tradingLogo from '../../assets/icons/trading.svg';
import bridgeLogo from '../../assets/icons/Bridge.svg';
import safeFarmsLogo from '../../assets/icons/safefarm.svg';
import multiSenderLogo from '../../assets/icons/multisender.svg';

const getIcon = (name) => <img src={name} alt="" width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'home',
    path: '/home',
    icon: getIcon(defiMadeEasyLogo),
  },
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: getIcon(dashboardLogo),
  },
  {
    title: 'exchange',
    path: '/exchange',
    icon: getIcon(multiSenderLogo),
  },
  {
    title: 'liquidity pools',
    path: '/liquiditypools',
    icon: getIcon(tradingLogo),
  },
  {
    title: 'yield farm',
    path: '/yieldfarm',
    icon: getIcon(bridgeLogo),
  },
  {
    title: 'savings',
    path: '/savings',
    icon: getIcon(safeFarmsLogo),
  },
  // {
  //   title: 'history',
  //   path: '/history',
  //   icon: getIcon(historyLogo)
  // },
  // {
  //   title: 'defi made easy',
  //   path: '/defimadeasy',
  //   icon: getIcon(defiMadeEasyLogo)
  // },
  // {
  //   title: 'bridge',
  //   path: '/bridge',
  //   icon: getIcon(tradingLogo)
  // },
  // {
  //   title: 'multisender',
  //   path: '/multisender',
  //   icon: getIcon(bridgeLogo)
  // },
  // {
  //   title: 'safefarm',
  //   path: '/safefarm',
  //   icon: getIcon(safeFarmsLogo)
  // },

  // {
  //   title: 'nft',
  //   path: '/nftdesign',
  //   icon: getIcon(tradingLogo)
  // }
];

export default sidebarConfig;
