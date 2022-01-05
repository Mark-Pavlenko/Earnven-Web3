/* eslint-disable */
import Scrollbar from '../../components/Scrollbar';
import { getRecall } from '../SidebarConfig';
import NavSection from './navSection';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import React from 'react';
import { useLocation } from 'react-router-dom';
// material
import { Box, Drawer, Stack } from '@material-ui/core';
import { MHidden } from '../../components/@material-extend';
import CompanyLogo from '../../assets/icons/logo_menu.svg';
import Earnven from '../../assets/icons/Earnven_menu_text.svg';
import Dark_Earnven_logo from '../../assets/icons/Dark_Earnven_logo.svg';
import Account from './account/account';
import Links from './social/Links';
import darkTheme from '../../assets/images/darkTheme.jpg';
import lightTheme from '../../assets/images/lightTheme.jpg';
import { useSelector } from 'react-redux';

import { RootStyle, LogoBlock, LogoImg, SidebarMainLayout } from './styles';

Sidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
  setTheme: PropTypes.bool,
};

export default function Sidebar({
  isOpenSidebar,
  onCloseSidebar,
  address,
  name,
  setTheme,
  global_wallet,
}) {
  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);
  // console.log('light theme type in sidebar', isLightTheme);

  const { pathname } = useLocation();
  let newSideBard = [];
  if (!setTheme || setTheme) {
    newSideBard = getRecall();
  }

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname, address, name, global_wallet]);

  const renderContent = (
    <Scrollbar
      sx={{
        // height: '100vh',
        // url(${darkTheme})
        'background-image': () => (isLightTheme ? `url(${lightTheme})` : `#1f265c`),
        // backgroundColor: 'red',

        '& .simplebar-content': { display: 'flex', flexDirection: 'column' },
      }}>
      <SidebarMainLayout isLightTheme={isLightTheme}>
        <LogoBlock>
          <LogoImg src={CompanyLogo} alt="" />
          <img className="Earnven" src={isLightTheme ? Earnven : Dark_Earnven_logo} alt="" />
        </LogoBlock>
        <Account
          address={address}
          name={name}
          setTheme={isLightTheme}
          global_wallet={global_wallet}
        />
        <NavSection
          sx={{ px: 8, color: 'black' }}
          navConfig={newSideBard}
          address={address}
          setTheme={setTheme}
        />
        <Links setTheme={setTheme} />
      </SidebarMainLayout>
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: {
              width: '315px',
              overflow: 'auto',
              height: 'auto',
              backgroundColor: 'transparent',
            },
          }}>
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: '315px',
              height: 'auto',
              overflow: 'auto',
              // backgroundColor: 'red',
              backgroundColor: 'transparent !important',
              // boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
              // backdropFilter: 'blur(35px)',
              border: 'none',
            },
          }}>
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
