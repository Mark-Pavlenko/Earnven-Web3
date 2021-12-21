/* import React,{Component} from 'react';
import SearchInput from '../../../components/searchInput';
import NetworkDropDown from '../../../components/networkDropDown';
import MenuListComposition from '../../../components/gasDropDownMenu';
import LanguageDropDown from '../../../components/languageDropDown';
import HelpDropDown from '../../../components/helpDropDown';
import './header.css'
export default class Header extends Component{
    render(){
        return(
            <div className='header'>
                <div className='search-bar'>
                     <SearchInput placeholder='Search Tokens...'/>
                </div>
                <div className='network-dropdown'>
                    <NetworkDropDown />
                </div>
                <div className='gas-dropdown'>
                    <MenuListComposition/>
                </div>
                <div className='language-dropdown'>
                    <LanguageDropDown />
                </div>
                <div className='help-dropdown'>
                    <HelpDropDown />
                </div>


            </div>
        )
    }
} */

import React, { useState } from 'react';
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
import SearchTokens from '../../../components/searchTokens';
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

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)`
  box-shadow: none;
  backdrop-filter: blur(6px);
  webkit-backdrop-filter: blur(10px); // Fix on Mobile
  background: ${localStorage.getItem('selectedTheme') === 'Day'
    ? `url(${lightDashboard})`
    : `#0B0E1D`};
  @media (min-width: 1880px) {
    background-image: ${localStorage.getItem('selectedTheme') === 'Day'
      ? `url(${lightDashboardBig})`
      : `#0B0E1D`};
  }
`;

// [theme.breakpoints.up('lg')]: {
//   width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
// },

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
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

function Header({ onOpenSidebar, themeChanger, ChangeTheme }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { address } = useParams();
  const [open, setOpen] = useState(false);
  const [Token, setToken] = useState('');
  const [flag, setFlag] = useState(false);
  const [theme, setTheme] = useState(false);
  const icon = !theme ? <Brightness3Icon /> : <Brightness7Icon />;
  function callbackFunction(childData) {
    setToken(childData);
    navigate(`/${address}/token/${childData}`);
  }

  // const setEvent = payload => ({ type: timelineCalenderConstants.SET_EVENT, payload });

  function setDynamicTheme() {
    setTheme(!theme);
    // setFlag(true);
    if (theme) {
      localStorage.setItem('selectedTheme', 'Day');
      setFlag(false);
    } else {
      localStorage.setItem('selectedTheme', 'Night');
      setFlag(true);
    }
    dispatch({ type: 'GET_THEME', isLightTheme: flag });
  }

  return (
    <RootStyle>
      <ToolbarStyle>
        <MHidden width="lgUp">
          <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Icon icon={menu2Fill} />
          </IconButton>
        </MHidden>
        <h2 style={{ marginRight: '-106px', color: !theme ? 'black' : 'white' }}>Dashboard</h2>
        <div>
          <span style={{ visibility: 'hidden' }}>{Token}</span>
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
      </ToolbarStyle>
    </RootStyle>
  );
}

export default connect()(Header);
