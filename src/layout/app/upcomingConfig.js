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

const upcomingConfig = [
  {
    title: 'yield farms',
    path: '/yieldfarms',
    icon: getIcon(yeild_farm_menu_icon),
  },
  {
    title: 'savings',
    path: '/savings',
    icon: getIcon(savings_menu_icon),
  },
];

export default upcomingConfig;
