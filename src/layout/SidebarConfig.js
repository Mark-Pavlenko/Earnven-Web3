import React from 'react';
import dashboardLogo from '../assets/icons/trello.svg';
import defiMadeEasyLogo from '../assets/icons/defimadeeasy.svg';
import tradingLogo from '../assets/icons/trading.svg';
import bridgeLogo from '../assets/icons/Bridge.svg';
import safeFarmsLogo from '../assets/icons/safefarm.svg';
import multiSenderLogo from '../assets/icons/multisender.svg';
import home from '../assets/icons/icon-park_home.svg';
import dashboard_menu from '../assets/icons/dashboard_menu.svg';
import send_menu_icon from '../assets/icons/send_menu_icon.svg';
import exchange_menu_icon from '../assets/icons/exchange_menu_icon.svg';
import lp_menu_icon from '../assets/icons/lp_menu_icon.svg';
import yeild_farm_menu_icon from '../assets/icons/yeild_farm_menu_icon.svg';
import savings_menu_icon from '../assets/icons/savings_menu_icon.svg';
import homeDark from '../assets/icons/homeDark.svg';
import dashboardDark from '../assets/icons/dashboardDark.svg';
import navigationDark from '../assets/icons/navigationDark.svg';
import exchangeDark from '../assets/icons/exchangeDark.svg';
import iconoir_flashDark from '../assets/icons/iconoir_flashDark.svg';
import sketchDark from '../assets/icons/sketchDark.svg';
import cubeDark from '../assets/icons/cubeDark.svg';
import { useSelector } from 'react-redux';

const getIcon = (name) => (
  <div
    style={{
      borderWidth: '10px 50px',
      backgroundColor: localStorage.getItem('selectedTheme') == 'Day' ? 'white' : '#141838',
      borderRadius: '5px',
    }}>
    <img src={name} alt="no pic" />
  </div>
);
let sidebarConfig = [];
export const getRecall = () => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: localStorage.getItem('selectedTheme') == 'Day' ? getIcon(home) : getIcon(homeDark),
    },
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon:
        localStorage.getItem('selectedTheme') == 'Day'
          ? getIcon(dashboard_menu)
          : getIcon(dashboardDark),
    },
    {
      title: 'Send',
      path: '/send',
      icon:
        localStorage.getItem('selectedTheme') == 'Day'
          ? getIcon(send_menu_icon)
          : getIcon(navigationDark),
    },
    {
      title: 'Exchange',
      path: '/exchange',
      icon:
        localStorage.getItem('selectedTheme') == 'Day'
          ? getIcon(exchange_menu_icon)
          : getIcon(exchangeDark),
    },
    {
      title: 'Liquidity pools',
      path: '/liquiditypools',
      icon:
        localStorage.getItem('selectedTheme') == 'Day'
          ? getIcon(lp_menu_icon)
          : getIcon(iconoir_flashDark),
    },
    {
      title: 'yield farms',
      path: '/yieldfarm',
      icon:
        localStorage.getItem('selectedTheme') == 'Day'
          ? getIcon(yeild_farm_menu_icon)
          : getIcon(sketchDark),
    },
    {
      title: 'savings',
      path: '/savings',
      icon:
        localStorage.getItem('selectedTheme') == 'Day'
          ? getIcon(savings_menu_icon)
          : getIcon(cubeDark),
    },
  ];
};
export default sidebarConfig;
