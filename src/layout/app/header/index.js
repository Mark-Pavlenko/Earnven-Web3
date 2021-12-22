import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, AppBar, Toolbar, IconButton } from '@material-ui/core';
// components
import { MHidden } from '../../../components/@material-extend';
// import SearchInput from '../../../components/searchInput';
import NetworkDropDown from '../../../components/networkDropDown';
import MenuListComposition from '../../../components/gasDropDownMenu';
import LanguageDropDown from '../../../components/languageDropDown';
import HelpDropDown from '../../../components/helpDropDown';
// import TransparentButton from '../../../components/TransparentButton'
import SearchTokens from '../../../components/searchTokens/searchTokens';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import darkIcon from '../../../assets/icons/darkIcon.svg';
import lightIcon from '../../../assets/icons/lightIcon.svg';
import ThemeConfig from '../../../theme/index.js';
import Sidebar from '../sidebar/sidebar';
import lightDashboard from '../../../assets/images/lightDashboard.jpg';
import lightDashboardBig from '../../../assets/images/lightDashboardBig.jpg';
import { getThemeTask } from '../../../store/themeChanger/reducer';
import { connect, useDispatch } from 'react-redux';

import { AppBarLayout, HeaderTitle } from './styles';

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const ToolbarLayout = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

Header.propTypes = {
  onOpenSidebar: PropTypes.func,
  themeChanger: PropTypes.func,
};

function Header({ onOpenSidebar, themeChanger, ChangeTheme, finalTitle, themeType }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log('finalTitle', finalTitle);
  console.log('isLightTheme', themeType);
  const isLightTheme = themeType;

  const { address } = useParams();
  const [Token, setToken] = useState('');
  const [flag, setFlag] = useState(false);
  const [theme, setTheme] = useState(false);
  function callbackFunction(childData) {
    setToken(childData);
    navigate(`/${address}/token/${childData}`);
  }

  function setDynamicTheme() {
    setTheme(!theme);
    if (theme) {
      localStorage.setItem('selectedTheme', 'Day');
      setFlag(false);
    } else {
      localStorage.setItem('selectedTheme', 'Night');
      setFlag(true);
    }
    dispatch({ type: 'GET_THEME', isLightTheme: flag });
  }

  console.log('token header', Token);

  return (
    <AppBarLayout isLightTheme={isLightTheme}>
      <ToolbarLayout>
        <MHidden width="lgUp">
          <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Icon icon={menu2Fill} />
          </IconButton>
        </MHidden>
        <HeaderTitle isLightTheme={isLightTheme}> {finalTitle}</HeaderTitle>
        <div>
          <SearchTokens parentCallback={callbackFunction} />
        </div>

        <Box sx={{ flexGrow: 1 }} />

        {/* <Stack direction="row" spacing={{ xs: 1.5, sm: 3.5 }}> */}
        <div style={{ marginRight: '20px' }}>
          <NetworkDropDown />
        </div>
        <div style={{ marginRight: '20px' }}>
          <MenuListComposition />
        </div>
        <div style={{ marginRight: '20px' }}>
          <LanguageDropDown />
        </div>
        <div style={{ marginRight: '20px' }}>
          <HelpDropDown />
        </div>
        <div style={{ marginRight: '20px' }}>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="mode"
            onClick={() => {
              setDynamicTheme();
              themeChanger();
              ChangeTheme(theme);
            }}>
            {!theme ? (
              <img
                style={{ 'margin-bottom': '-24px', 'margin-right': '1px' }}
                src={lightIcon}
                alt=""
              />
            ) : (
              <img style={{ 'margin-right': '15px' }} src={darkIcon} alt="" />
            )}
          </IconButton>
        </div>
        <div>
          <ThemeConfig themeSelection={theme} />
        </div>
      </ToolbarLayout>
    </AppBarLayout>
  );
}

export default connect()(Header);
