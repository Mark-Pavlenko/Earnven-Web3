import React from 'react';
import dashboardLogo from '../../assets/icons/trello.svg';
import defiMadeEasyLogo from '../../assets/icons/defimadeeasy.svg';
import tradingLogo from '../../assets/icons/trading.svg';
import bridgeLogo from '../../assets/icons/Bridge.svg';
import safeFarmsLogo from '../../assets/icons/safefarm.svg';
import multiSenderLogo from '../../assets/icons/multisender.svg';
import home from '../../assets/icons/icon-park_home.svg';
import dashboard_menu from '../../assets/icons/dashboard_menu.svg';
import send_menu_icon from '../../assets/icons/send_menu_icon.svg';
import exchange_menu_icon from '../../assets/icons/exchange_menu_icon.svg';
import lp_menu_icon from '../../assets/icons/lp_menu_icon.svg';
import yeild_farm_menu_icon from '../../assets/icons/yeild_farm_menu_icon.svg';
import savings_menu_icon from '../../assets/icons/savings_menu_icon.svg';

const getIcon = (name) => (
  <div style={{ borderWidth: '10px 50px', backgroundColor: 'white', borderRadius: '5px' }}>
    <img src={name} alt="no pic" />
  </div>
);

const sidebarConfig = [
  {
    title: 'home',
    path: '/home',
    icon: getIcon(home),
  },
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: getIcon(dashboard_menu),
  },
  {
    title: 'send',
    path: '/send',
    icon: getIcon(send_menu_icon),
  },
  {
    title: 'exchange',
    path: '/exchange',
    icon: getIcon(exchange_menu_icon),
  },
  {
    title: 'liquidity pools',
    path: '/liquiditypools',
    icon: getIcon(lp_menu_icon),
  },
  {
    title: 'yield farm',
    path: '/yieldfarm',
    icon: getIcon(yeild_farm_menu_icon),
  },
  {
    title: 'savings',
    path: '/savings',
    icon: getIcon(savings_menu_icon),
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
