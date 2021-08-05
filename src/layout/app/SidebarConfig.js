
// import dashboardLogo from '../../assets/icons/dashboardlogo.png';
import dashboardLogo from '../../assets/icons/trello.svg';
import historyLogo from '../../assets/icons/history.svg';
import defiMadeEasyLogo from '../../assets/icons/defimadeeasy.svg';
import tradingLogo from '../../assets/icons/trading.svg';
import bridgeLogo from '../../assets/icons/Bridge.svg';

import safeFarmsLogo from '../../assets/icons/safefarm.svg'
import multiSenderLogo from '../../assets/icons/multisender.svg';

// import pylonProductsLogo from '../../../assets/icons/pylonproducts.png';

// ----------------------------------------------------------------------

const getIcon = (name) => <img src={name} alt="" width={22} height={22} />;


const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: getIcon(dashboardLogo)
  },
  {
    title: 'history',
    path: '/history',
    icon: getIcon(historyLogo)
  },
  {
    title: 'defi made easy',
    path: '/defimadeasy',
    icon: getIcon(defiMadeEasyLogo)
  },
  {
    title: 'bridge',
    path: '/bridge',
    icon: getIcon(tradingLogo)
  },
  {
    title: 'multisender',
    path: '/multisender',
    icon: getIcon(bridgeLogo)
  },
  {
    title: 'safefarm',
    path: '/safefarm',
    icon: getIcon(safeFarmsLogo)
  },
  {
    title: 'trading',
    path: '/trading',
    icon: getIcon(multiSenderLogo)
  },
  {
    title: 'nft',
    path: '/nftdesign',
    icon: getIcon(tradingLogo)
  }
];

export default sidebarConfig;
