import React, { useEffect, useState } from 'react';
import './app.css';
import Header from './header';
import Sidebar from './sidebar/sidebar';
import { Outlet } from 'react-router-dom';
import { RootStyle, MainStyle } from './styledComponents';
import lightDashboard from '../../assets/images/lightDashboard.jpg';
import { useSelector } from 'react-redux';

export default function AppLayout({ propChangeTheme }) {
  // const headerTitles = useSelector((state) => state.headerTitlesReducer.headerTitles);
  // console.log('headerTitles', headerTitles);

  const themeType = useSelector((state) => state.themeReducer.isLightTheme);

  const title = useSelector((state) => state.headerTitlesReducer.currentRouteTitle);
  console.log('middle title', title);

  function capitalizeFirstLetter(string) {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  }

  const finalTitle = capitalizeFirstLetter(title);

  const [open, setOpen] = useState(false);
  const [setTheme, setSetTheme] = useState(false);
  const [changeTheme, setChangeTheme] = useState(false);

  useEffect(() => {
    propChangeTheme(setTheme);
  }, [setTheme]);

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
