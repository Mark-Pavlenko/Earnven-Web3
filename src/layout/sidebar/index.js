/* eslint-disable */
import Scrollbar from '../../components/Scrollbar';
import { getRecall } from '../SidebarConfig';
import NavSection from '../../components/NavSection';
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
const DRAWER_WIDTH = 315;

import { RootStyle } from './styles';

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
        height: '100vh',
        'background-image': () => (!isLightTheme ? `url(${darkTheme})` : `url(${lightTheme})`),
        boxShadow: '0 2px 3px 30px #d2dcf6',
        '& .simplebar-content': { display: 'flex', flexDirection: 'column' },
      }}>
      <Box sx={{ px: '38.91%', pb: 1, mt: '8%', ml: '-20px' }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            position: 'relative',
            bgcolor: 'transparent',
          }}>
          <img src={CompanyLogo} alt="" />
          <img className="Earnven" src={isLightTheme ? Earnven : Dark_Earnven_logo} alt="" />
        </Stack>
      </Box>
      <Box sx={{ px: 8 }}>
        <Account
          address={address}
          name={name}
          setTheme={isLightTheme}
          global_wallet={global_wallet}
        />
      </Box>
      <NavSection
        sx={{ px: 8, color: 'black' }}
        navConfig={newSideBard}
        address={address}
        setTheme={setTheme}
      />
      <Links setTheme={setTheme} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH, overflow: 'auto', height: 'auto' },
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
              width: DRAWER_WIDTH,
              height: 'auto',
              overflow: 'auto',
            },
          }}>
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
