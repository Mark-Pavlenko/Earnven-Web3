import React, { useEffect, useState } from 'react';
import './app.css';
import Header from './header';
import Sidebar from './sidebar';
import { Outlet } from 'react-router-dom';
import { RootStyle, MainStyle } from './styledComponents';
import { useSelector } from 'react-redux';

export default function AppLayout() {
  const themeType = useSelector((state) => state.themeReducer.isLightTheme);
  const title = useSelector((state) => state.headerTitlesReducer.currentRouteTitle);
  // console.log('middle title', title);

  function capitalizeFirstLetter(string) {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  }
  const finalTitle = capitalizeFirstLetter(title);

  const [open, setOpen] = useState(false);

  return (
    <RootStyle>
      <Header onOpenSidebar={() => setOpen(true)} themeType={themeType} finalTitle={finalTitle} />
      <Sidebar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
        address={localStorage.getItem('selected-account')}
        name={localStorage.getItem('selected-name')}
        global_wallet={localStorage.getItem('wallets')}
        themeType={themeType}
      />
      <MainStyle isLightTheme={themeType} appBarMobile={64} appBarDesktop={92}>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
