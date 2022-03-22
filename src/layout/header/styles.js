import styled from 'styled-components';
import { IconButton } from '@material-ui/core';

export const HeaderLayoutBig = styled.div`
  height: 102px;
  padding-top: 35px;
  background: ${(props) => (props.isLightTheme ? `transparent` : `#0B0E1D`)};

  @media (min-width: 2100px) {
    background: ${(props) => (props.isLightTheme ? `transparent` : `#0B0E1D`)};
  }

  @media (max-width: 1280px) {
    display: none;
  }

  @media (min-width: 1281px) {
    display: grid;
    grid-template-columns: 40% 60%;
  }

  @media screen and (max-width: 1445px) and (min-width: 1281px) {
    //margin-left: 150px;
    max-width: 1770px;
  }

  @media (min-width: 1446px) {
    //margin-left: 350px;
  }
`;

export const HeaderLayoutMobile = styled.div`
  height: 142px;

  background: ${(props) => (props.isLightTheme ? `transparent` : `#0B0E1D`)};
  @media (min-width: 2100px) {
    background: ${(props) => (props.isLightTheme ? `transparent` : `#0B0E1D`)};
  }
  @media (min-width: 1281px) {
    display: none;
  }
`;

export const MobileSubLayout = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  margin-left: 7px;
  //

  @media (min-width: 1023px) {
    margin-left: -10px;
  }
`;

export const HeaderFirstLayout = styled.div`
  @media screen and (min-width: 710px) and (max-width: 1279px) {
    display: flex;
  }
`;

export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Saira', sans-serif;
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  line-height: 41px;
  text-align: left;
  color: ${(props) => (props.isLightTheme ? '#1e1e20' : '#ffffff')};
  //background-color: green;

  p {
    font-weight: 1000;
  }

  @media (max-width: 1280px) {
    margin-top: 23px;
    margin-left: 15px;
  }

  @media screen and (min-width: 1023px) {
    margin-left: 0;
  }

  @media (min-width: 1280px) {
    margin-top: 13px;
  }
`;

export const HeaderItemsBlock = styled.div`
  @media (max-width: 1280px) {
    display: none;
  }

  @media (min-width: 1281px) {
    display: flex;
    justify-content: end;
    gap: 30px;
    align-items: center;
  }
`;

export const BurgerSidebarIconButton = styled(IconButton)`
  @media (min-width: 1023px) {
    margin-right: -10px;
  }

  :hover {
    background-color: transparent !important;
  }

  img {
    width: 41px;
    height: 41px;
    @media (min-width: 711px) {
      margin-left: 5px;
    }
  }

  @media (max-width: 1280px) {
    margin-left: auto;
  }

  @media (min-width: 1281px) {
    display: none;
  }
`;

export const UserAvatarIconButton = styled(IconButton)`
  :hover {
    background-color: transparent;
  }

  img {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 780px) {
    //margin-right: 20px;
    margin-right: 4px;
    //margin-top: 20px;
    //margin-left: 15px;
  }

  @media (min-width: 711px) {
    //display: none;
  }
`;

export const ChangeThemeBtnHeader = styled(IconButton)`
  @media (max-width: 1280px) {
    display: none;
  }

  @media screen and (min-width: 821px) and (max-width: 1920px) {
    margin-left: -8px;
    margin-right: -8px;
  }
`;
