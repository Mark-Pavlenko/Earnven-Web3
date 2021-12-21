import React, { useEffect, useState } from 'react';
import './app.css';
import Header from './header/header';
import Sidebar from './sidebar/sidebar';
import { Outlet } from 'react-router-dom';
import { RootStyle, MainStyle } from './styledComponents';
import lightDashboard from '../../assets/images/lightDashboard.jpg';

export default function AppLayout({ propChangeTheme }) {
  const [open, setOpen] = useState(false);
  const [setTheme, setSetTheme] = useState(false);
  const [changeTheme, setChangeTheme] = useState(false);

  const theme = localStorage.getItem('selectedTheme');

  useEffect(() => {
    propChangeTheme(setTheme);
  }, [setTheme]);

  return (
    <RootStyle>
      <Header
        ChangeTheme={(w) => setSetTheme(w)}
        onOpenSidebar={() => setOpen(true)}
        themeChanger={() => setChangeTheme(!changeTheme)}
      />
      <Sidebar
        isOpenSidebar={open}
        setTheme={changeTheme}
        onCloseSidebar={() => setOpen(false)}
        name={localStorage.getItem('selected-name')}
        global_wallet={localStorage.getItem('wallets')}
        address={localStorage.getItem('selected-account')}
      />
      <MainStyle
        setTheme={changeTheme}
        appBarMobile={64}
        appBarDesktop={92}
        themeBG={theme}
        lightDashboard={lightDashboard}>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
