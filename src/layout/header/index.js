import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import sidebarBurgerLightIcon from '../../assets/icons/sidebarBurgerLightIcon.png';
import sidebarBurgerDarkIcon from '../../assets/icons/sidebarBurgerDarkIcon.png';
import userMockAvatar from '../../assets/icons/userMockAvatar.png';
import DesktopNetworkSelect from '../../components/networkDropDown/newNetworkSelect';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import IconButton from '@mui/material/IconButton';

import SearchTokensMobile from '../../components/searchTokensMobile';
import NetworkSelectHeader from '../../components/networkDropDown';
import GasDropdownMenu from '../../components/gasDropDownMenu/index';

import LanguageDropDown from '../../components/languageDropDown';
import HelpDropDown from '../../components/helpDropDown';

import TestSearchInput from '../../components/searchTokens/testInput';
import SearchTokensLight from '../../components/searchTokens';
import SearchTokensDark from '../../components/searchTokens/searchTokensDark';
import SearchTokens from '../../components/searchTokens';

import darkIcon from '../../assets/icons/darkIcon.svg';
import lightIcon from '../../assets/icons/lightIcon.svg';
import { useDispatch, useSelector } from 'react-redux';

import {
  HeaderLayoutBig,
  HeaderLayoutMobile,
  MobileSubLayout,
  HeaderTitle,
  BurgerSidebarIconButton,
  HeaderItemsBlock,
  HeaderFirstLayout,
  UserAvatarIconButton,
  ChangeThemeBtnHeader,
} from './styles';

Header.propTypes = {
  onOpenSidebar: PropTypes.func,
  onOpenMobileWalletsList: PropTypes.func,
  themeChanger: PropTypes.func,
};

function Header({ onOpenSidebar, onOpenMobileWalletsList, finalTitle }) {
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

  // console.log('isLightTheme', isLightTheme);
  // console.log('token header', Token);

  const reduxWalletsList = useSelector((state) => state.initSidebarValuesReducer.walletsList);
  const reduxMyWallet = useSelector((state) => state.initSidebarValuesReducer.myWallet);

  return (
    <>
      <HeaderLayoutBig isLightTheme={isLightTheme}>
        <HeaderFirstLayout>
          <BurgerSidebarIconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            {isLightTheme ? (
              <img src={sidebarBurgerLightIcon} alt="burger_img" />
            ) : (
              <img src={sidebarBurgerDarkIcon} alt="burger_img" />
            )}
          </BurgerSidebarIconButton>
          <HeaderTitle isLightTheme={isLightTheme}>
            <p>{finalTitle}</p>
          </HeaderTitle>
        </HeaderFirstLayout>
        <HeaderItemsBlock>
          {/*<SearchTokens />*/}

          <SearchTokensLight parentCallback={callbackFunction} isLightTheme={isLightTheme} />
          <TestSearchInput parentCallback={callbackFunction} isLightTheme={isLightTheme} />

          {/*search tokens mobile version*/}
          {/*<SearchTokensMobile isLightTheme={isLightTheme} />*/}

          {/*Old network select*/}
          {/*<NetworkSelectHeader isLightTheme={isLightTheme} />*/}

          {/*Actual network select*/}
          <DesktopNetworkSelect />

          <GasDropdownMenu isLightTheme={isLightTheme} />
          {/*<LanguageDropDown />*/}
          {/*<HelpDropDown />*/}

          <ChangeThemeBtnHeader
            onClick={() => {
              setDynamicTheme();
            }}>
            {isLightTheme ? <img src={lightIcon} alt="" /> : <img src={darkIcon} alt="" />}
          </ChangeThemeBtnHeader>
        </HeaderItemsBlock>
      </HeaderLayoutBig>
      <HeaderLayoutMobile isLightTheme={isLightTheme}>
        <MobileSubLayout>
          {reduxWalletsList.length !== 0 && (
            <UserAvatarIconButton onClick={onOpenMobileWalletsList}>
              <img src={userMockAvatar} alt="mockAvatar" />
            </UserAvatarIconButton>
          )}
          <SearchTokensMobile isLightTheme={isLightTheme} />
          <ChangeThemeBtnHeader
            onClick={() => {
              setDynamicTheme();
            }}>
            {isLightTheme ? <img src={lightIcon} alt="" /> : <img src={darkIcon} alt="" />}
          </ChangeThemeBtnHeader>
          <BurgerSidebarIconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            {isLightTheme ? (
              <img src={sidebarBurgerLightIcon} alt="burger_img" />
            ) : (
              <img src={sidebarBurgerDarkIcon} alt="burger_img" />
            )}
          </BurgerSidebarIconButton>
        </MobileSubLayout>
        <HeaderTitle isLightTheme={isLightTheme}>
          <p>{finalTitle}</p>
        </HeaderTitle>
      </HeaderLayoutMobile>
    </>
  );
}

export default Header;
