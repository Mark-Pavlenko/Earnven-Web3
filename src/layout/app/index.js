import React, { useEffect, useState } from 'react';
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
import { useSelector } from 'react-redux';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

export const ThemeChangeContext = React.createContext();

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

export default function AppLayout({ propChangeTheme }) {
  const headerTitles = useSelector((state) => state.headerTitlesReducer.headerTitles);
  console.log('headerTitles', headerTitles);

  const title = useSelector((state) => state.headerTitlesReducer.currentRouteTitle);
  console.log('middle title', title);

  function capitalizeFirstLetter(string) {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  }

  const finalTitle = capitalizeFirstLetter(title);

  const [open, setOpen] = useState(false);
  const [changeTheme, setChangeTheme] = useState(false);
  const [setTheme, setsetTheme] = useState(false);
  useEffect(() => {
    console.log('testforthemesathya', setTheme);
    propChangeTheme(setTheme);
  }, [setTheme]);
  return (
    <RootStyle>
      <Header
        onOpenSidebar={() => setOpen(true)}
        themeChanger={() => setChangeTheme(!changeTheme)}
        ChangeTheme={(w) => setsetTheme(w)}
        finalTitle={finalTitle}
      />
      <Sidebar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
        address={localStorage.getItem('selected-account')}
        name={localStorage.getItem('selected-name')}
        global_wallet={localStorage.getItem('wallets')}
        setTheme={changeTheme}
      />
      <MainStyle setTheme={changeTheme}>
        {/* <Divider variant="middle" /> */}
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
