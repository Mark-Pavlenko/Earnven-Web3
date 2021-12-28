/* eslint-disable */
import Scrollbar from '../../components/Scrollbar';
import sidebarConfig, { getRecall } from '../SidebarConfig';
// import upcomingConfig from '../upcomingConfig';
import NavSection from '../../components/NavSection';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import PropTypes from 'prop-types';
import { useEffect } from 'react';
import React from 'react';
import { useLocation } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
// import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@material-ui/core';
import { Box, Drawer, Stack } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { MHidden } from '../../components/@material-extend';
import CompanyLogo from '../../assets/icons/logo_menu.svg';
import Earnven from '../../assets/icons/Earnven_menu_text.svg';
import Dark_Earnven_logo from '../../assets/icons/Dark_Earnven_logo.svg';
import Account from './account/account';
import './sidebar.css';
import Links from './social/Links';
import Accounts from './account/Accounts';
import darkTheme from '../../assets/images/darkTheme.jpg';
import lightTheme from '../../assets/images/lightTheme.jpg';
import { useSelector } from 'react-redux';
const DRAWER_WIDTH = 315;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

Index.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
  setTheme: PropTypes.bool,
};

export default function Index({
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
