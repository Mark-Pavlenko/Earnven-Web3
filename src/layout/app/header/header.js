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
import EllipseDark from '../../../assets/icons/Ellipse230Dark.svg';
import EllipseLight from '../../../assets/icons/EllipseLight.svg';
import SubtractLight from '../../../assets/icons/SubtractLight.svg';
import SubtractDark from '../../../assets/icons/SubtractDark.svg';
import ThemeConfig from '../../../theme/index.js';
import Sidebar from '../sidebar/sidebar';

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor:
    localStorage.getItem('selectedTheme') == 'Day'
      ? alpha(theme.palette.background.default, 0.72)
      : '#0B0E1D',
  // backgroundColor: theme.palette.gradients.success,
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

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

export default function Header({ onOpenSidebar, themeChanger }) {
  const navigate = useNavigate();
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
  function setDynamicTheme() {
    setTheme(!theme);
    setFlag(true);
    if (theme) {
      localStorage.setItem('selectedTheme', 'Day');
    } else {
      localStorage.setItem('selectedTheme', 'Night');
    }
  }

  return (
    <RootStyle>
      <ToolbarStyle>
        <MHidden width="lgUp">
          <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Icon icon={menu2Fill} />
          </IconButton>
        </MHidden>
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
            }}>
            {!theme ? (
              <div style={{ height: '42px', 'margin-left': '-15px' }}>
                <img
                  style={{ position: 'absolute', 'margin-left': '6px' }}
                  src={SubtractDark}
                  alt=""></img>
                <img src={EllipseLight} alt=""></img>
              </div>
            ) : (
              <div style={{ height: '42px', 'margin-left': '-15px' }}>
                <img
                  style={{
                    position: 'absolute',
                    'margin-left': '15px',
                    'margin-top': '5px',
                    width: '20px',
                  }}
                  src={SubtractLight}
                  alt=""></img>
                <img
                  style={{ 'margin-right': '19px', width: '39px' }}
                  src={EllipseDark}
                  alt=""></img>
              </div>
            )}
          </IconButton>
        </div>
        <div>
          <ThemeConfig themeSelection={theme}></ThemeConfig>
        </div>
      </ToolbarStyle>
    </RootStyle>
  );
}
