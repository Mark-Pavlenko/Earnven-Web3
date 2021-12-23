import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, AppBar, Toolbar } from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
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
import { connect, useDispatch, useSelector } from 'react-redux';

import { HeaderLayout, HeaderTitle, HeaderItemsBlock } from './styles';

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

const CustomIconBtn = styled(IconButton)({
  '&:hover': {
    backgroundColor: 'none !important',
    // borderColor: '#0062cc',
    boxShadow: 'none',
  },
});

Header.propTypes = {
  onOpenSidebar: PropTypes.func,
  themeChanger: PropTypes.func,
};

function Header({ onOpenSidebar, themeChanger, ChangeTheme, finalTitle }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);
  console.log('true lightTheme', isLightTheme);

  console.log('finalTitle', finalTitle);

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
    <HeaderLayout isLightTheme={isLightTheme}>
      <MHidden width="lgUp">
        <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
          <Icon icon={menu2Fill} />
        </IconButton>
      </MHidden>
      <HeaderTitle isLightTheme={isLightTheme}>
        <p>{finalTitle}</p>
      </HeaderTitle>
      {/*<Box sx={{ flexGrow: 1 }} />*/}
      {/* <Stack direction="row" spacing={{ xs: 1.5, sm: 3.5 }}> */}
      <HeaderItemsBlock>
        <SearchTokens parentCallback={callbackFunction} isLightTheme={isLightTheme} />
        <NetworkDropDown />
        <MenuListComposition />
        <LanguageDropDown />
        <HelpDropDown />
        <CustomIconBtn
          onClick={() => {
            setDynamicTheme();
          }}>
          {isLightTheme ? <img src={lightIcon} alt="" /> : <img src={darkIcon} alt="" />}
        </CustomIconBtn>
      </HeaderItemsBlock>
    </HeaderLayout>
  );
}

export default connect()(Header);
