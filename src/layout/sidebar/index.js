/* eslint-disable */
import Scrollbar from '../../components/Scrollbar';
import { getRecall } from '../SidebarConfig';
import NavSection from './navSection';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import React from 'react';
import { useLocation } from 'react-router-dom';
// material
import { Drawer } from '@material-ui/core';
import { MHidden } from '../../components/@material-extend';
import CompanyLogo from '../../assets/icons/logo_menu.svg';
import Earnven from '../../assets/icons/Earnven_menu_text.svg';
import Dark_Earnven_logo from '../../assets/icons/Dark_Earnven_logo.svg';
import Account from './account';
import Links from './social/Links';
import darkTheme from '../../assets/images/darkTheme.jpg';
import lightTheme from '../../assets/images/lightTheme.jpg';
import lightThemeBig from '../../assets/images/lightDashboardBig.jpg';
import CloseMobileSidebarLight from '../../assets/images/closeMobileSidebarLight.svg';
import CloseMobileSidebarDark from '../../assets/images/closeMobileSidebarDark.svg';
import { useSelector } from 'react-redux';

import {
  RootStyle,
  LogoBlock,
  LogoImg,
  SidebarMainLayout,
  CloseMobileSidebarIcon,
  DrawerLayoutMobile,
} from './styles';

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
  const [open, setOpen] = useState(false);
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
        // in order to get correct background for QHD & 4K Screens
        background: () => (isLightTheme ? `url(${lightThemeBig})` : `#0F152C`),
        // backgroundColor: 'red',
        // borderRadius: '10px',
        backdropFilter: 'blur(35px)',
        boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
        '& .simplebar-content': { display: 'flex', flexDirection: 'column' },
      }}>
      <SidebarMainLayout isLightTheme={isLightTheme}>
        <LogoBlock>
          <LogoImg src={CompanyLogo} alt="" />
          <img className="Earnven" src={isLightTheme ? Earnven : Dark_Earnven_logo} alt="" />
          {isLightTheme ? (
            <CloseMobileSidebarIcon
              src={CloseMobileSidebarLight}
              alt=""
              onClick={() => onCloseSidebar()}
            />
          ) : (
            <CloseMobileSidebarIcon
              src={CloseMobileSidebarDark}
              alt=""
              onClick={() => onCloseSidebar()}
            />
          )}
        </LogoBlock>
        <Account
          address={address}
          name={name}
          setTheme={isLightTheme}
          global_wallet={global_wallet}
        />
        <NavSection sx={{ px: 8, color: 'black' }} navConfig={newSideBard} address={address} />
        <Links setTheme={isLightTheme} />
      </SidebarMainLayout>
    </Scrollbar>
  );

  return (
    <RootStyle>
      {/* sidebar for desktop versions */}
      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: '315px',
              height: 'auto',
              overflow: 'auto',
              backgroundColor: 'transparent !important',
              border: 'none',
            },
          }}>
          {renderContent}
        </Drawer>
      </MHidden>

      {/* sidebar for mobiles versions */}
      <MHidden width="lgUp">
        <DrawerLayoutMobile
          open={isOpenSidebar}
          anchor={'right'}
          onClose={onCloseSidebar}
          // BackdropProps={{ invisible: true }}
          PaperProps={{
            sx: {
              width: '360px',
              overflow: 'auto',
              height: 'auto',
              backgroundColor: 'transparent',
            },
          }}>
          {renderContent}
        </DrawerLayoutMobile>
      </MHidden>
    </RootStyle>
  );
}
