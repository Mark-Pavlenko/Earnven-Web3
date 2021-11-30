import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import Sidebar from './sidebar/sidebar';
import Header from './header/header';
import './app.css';
import darkTheme from '../../assets/images/darkTheme.jpg';
import lightTheme from '../../assets/images/lightTheme.jpg';
import ThemeConfig from '../../theme/index';
import lightDashboard from '../../assets/images/lightDashboard.jpg';
const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  paddingTop: APP_BAR_MOBILE + 15,
  paddingBottom: theme.spacing(10),
  background: localStorage.getItem('selectedTheme') == 'Day' ? `url(${lightDashboard})` : `#0B0E1D`,
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const [changeTheme, setChangeTheme] = useState(false);
  return (
    <RootStyle>
      <Header
        onOpenSidebar={() => setOpen(true)}
        themeChanger={() => setChangeTheme(!changeTheme)}
      />
      <Sidebar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
        address={localStorage.getItem('selected-account')}
        name={localStorage.getItem('selected-name')}
        global_wallet={localStorage.getItem('wallets')}
        setTheme={changeTheme}
      />
      <MainStyle>
        {/* <Divider variant="middle" /> */}
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
