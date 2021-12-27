import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import sidebarBurgerLightIcon from '../../../assets/icons/sidebarBurgerLightIcon.png';
import sidebarBurgerDarkIcon from '../../../assets/icons/sidebarBurgerDarkIcon.png';
import userMockAvatar from '../../../assets/icons/userMockAvatar.png';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import IconButton from '@mui/material/IconButton';

import SearchTokensMobile from '../../../components/searchTokensMobile/index';
import NetworkSelect from '../../../components/networkDropDown';

import GasDropdownMenu from '../../../components/gasDropDownMenu';
import LanguageDropDown from '../../../components/languageDropDown';
import HelpDropDown from '../../../components/helpDropDown';

import SearchTokensLight from '../../../components/searchTokens/searchTokensLight';
import SearchTokensDark from '../../../components/searchTokens/searchTokensDark';
import SearchTokens from '../../../components/searchTokens/index';

import darkIcon from '../../../assets/icons/darkIcon.svg';
import lightIcon from '../../../assets/icons/lightIcon.svg';
import { connect, useDispatch, useSelector } from 'react-redux';

import {
  HeaderLayoutBig,
  HeaderLayoutMobile,
  MobileSubLayout,
  HeaderTitle,
  BurgerIcon,
  HeaderItemsBlock,
  HeaderFirstLayout,
  MockUserMobileAvatar,
  ChangeThemeBtn,
} from './styles';

Header.propTypes = {
  onOpenSidebar: PropTypes.func,
  themeChanger: PropTypes.func,
};

function Header({ onOpenSidebar, themeChanger, ChangeTheme, finalTitle }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);

  const { address } = useParams();
  const [Token, setToken] = useState('');
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
    <>
      <HeaderLayoutBig isLightTheme={isLightTheme}>
        <HeaderFirstLayout>
          <BurgerIcon onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            {isLightTheme ? (
              <img src={sidebarBurgerLightIcon} alt="burger_img" />
            ) : (
              <img src={sidebarBurgerDarkIcon} alt="burger_img" />
            )}
          </BurgerIcon>
          <MockUserMobileAvatar src={userMockAvatar} alt="mockAvatar" />
          <HeaderTitle isLightTheme={isLightTheme}>
            <p>{finalTitle}</p>
          </HeaderTitle>
        </HeaderFirstLayout>
        <HeaderItemsBlock>
          {/*<SearchTokens />*/}
          {isLightTheme ? (
            <SearchTokensLight parentCallback={callbackFunction} isLightTheme={isLightTheme} />
          ) : (
            <SearchTokensDark />
          )}
          <SearchTokensMobile isLightTheme={isLightTheme} />
          <NetworkSelect isLightTheme={isLightTheme} />
          <GasDropdownMenu isLightTheme={isLightTheme} />
          <LanguageDropDown />
          {/*<HelpDropDown />*/}
          <ChangeThemeBtn
            onClick={() => {
              setDynamicTheme();
            }}>
            {isLightTheme ? <img src={lightIcon} alt="" /> : <img src={darkIcon} alt="" />}
          </ChangeThemeBtn>
        </HeaderItemsBlock>
      </HeaderLayoutBig>
      <HeaderLayoutMobile isLightTheme={isLightTheme}>
        <MobileSubLayout>
          <MockUserMobileAvatar src={userMockAvatar} alt="mockAvatar" />
          <SearchTokensMobile isLightTheme={isLightTheme} />
          <ChangeThemeBtn
            onClick={() => {
              setDynamicTheme();
            }}>
            {isLightTheme ? <img src={lightIcon} alt="" /> : <img src={darkIcon} alt="" />}
          </ChangeThemeBtn>
          <BurgerIcon onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            {isLightTheme ? (
              <img src={sidebarBurgerLightIcon} alt="burger_img" />
            ) : (
              <img src={sidebarBurgerDarkIcon} alt="burger_img" />
            )}
          </BurgerIcon>
        </MobileSubLayout>
        <HeaderTitle isLightTheme={isLightTheme}>
          <p>{finalTitle}</p>
        </HeaderTitle>
      </HeaderLayoutMobile>
    </>
  );
}

export default connect()(Header);
