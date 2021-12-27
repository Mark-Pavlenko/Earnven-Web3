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

// import NetworkDropDown from '../../../components/networkDropDown';
import TestSelect from '../../../components/networkDropDown';

import MenuListComposition from '../../../components/gasDropDownMenu';
import LanguageDropDown from '../../../components/languageDropDown';
import HelpDropDown from '../../../components/helpDropDown';

import SearchTokensLight from '../../../components/searchTokens/searchTokensLight';
import SearchTokensDark from '../../../components/searchTokens/searchTokensDark';
import SearchTokens from '../../../components/searchTokens/index';

import darkIcon from '../../../assets/icons/darkIcon.svg';
import lightIcon from '../../../assets/icons/lightIcon.svg';
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

  // console.log('finalTitle', finalTitle);

  const { address } = useParams();
  const [Token, setToken] = useState('');
  const [flag, setFlag] = useState(false);
  const [theme, setTheme] = useState(false);
  function callbackFunction(childData) {
    setToken(childData);
    navigate(`/${address}/token/${childData}`);
  }

  function setDynamicTheme() {
    if (!isLightTheme) {
      localStorage.setItem('selectedTheme', 'Day');
      dispatch({ type: 'GET_THEME', isLightTheme: true });
    } else {
      localStorage.setItem('selectedTheme', 'Night');
      dispatch({ type: 'GET_THEME', isLightTheme: false });
    }
  }

  console.log('isLightTheme', isLightTheme);
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
      <HeaderItemsBlock>
        {/*<SearchTokens />*/}

        {isLightTheme ? (
          <SearchTokensLight parentCallback={callbackFunction} isLightTheme={isLightTheme} />
        ) : (
          <SearchTokensDark />
        )}

        {/*<NetworkDropDown />*/}
        <TestSelect isLightTheme={isLightTheme} />
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
