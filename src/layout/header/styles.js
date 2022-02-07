import styled from 'styled-components';
import { IconButton } from '@material-ui/core';

export const HeaderLayoutBig = styled.div`
  height: 102px;

  background: ${(props) => (props.isLightTheme ? `transparent` : `#0B0E1D`)};

  @media (min-width: 2100px) {
    background: ${(props) => (props.isLightTheme ? `transparent` : `#0B0E1D`)};
  }

  @media screen and (min-width: 711px) and (max-width: 1280px) {
    display: grid;
    grid-template-columns: 40% 60%;
    margin-left: 0;
  }

  @media (max-width: 780px) {
    display: none;
  }

  @media (min-width: 1280px) {
    display: grid;
    grid-template-columns: 40% 60%;
  }

  @media screen and (max-width: 1445px) and (min-width: 1281px) {
    margin-left: 150px;
    max-width: 1770px;
  }

  @media (min-width: 1446px) {
    margin-left: 314px;
    max-width: 1605px;
  }
`;

export const HeaderLayoutMobile = styled.div`
  height: 142px;

  background: ${(props) => (props.isLightTheme ? `transparent` : `#0B0E1D`)};
  @media (min-width: 2100px) {
    background: ${(props) => (props.isLightTheme ? `transparent` : `#0B0E1D`)};
  }
  @media (min-width: 781px) {
    display: none;
  }
`;

export const MobileSubLayout = styled.div`
  display: flex;
  align-items: center;
  padding-top: 20px;
  margin-left: 15px;
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

  @media (max-width: 780px) {
    margin-top: 23px;
    margin-left: 15px;
  }

  @media screen and (min-width: 800px) and (max-width: 1279px) {
    margin-left: 20px;
  }

  @media (min-width: 1280px) {
    margin-top: 30px;
    margin-left: 35px;
  }
`;

export const HeaderItemsBlock = styled.div`
  @media screen and (min-width: 710px) and (max-width: 1280px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  @media screen and (min-width: 1281px) and (max-width: 1444px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  @media (min-width: 1445px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const BurgerSidebarIconButton = styled(IconButton)`
  :hover {
    background-color: transparent !important;
    //border-radius: 10px;
  }

  img {
    width: 41px;
    height: 41px;
    @media (min-width: 711px) {
      margin-left: 5px;
    }
  }

  @media (max-width: 780px) {
    margin-left: auto;
  }

  @media (min-width: 1024px) {
    margin-left: 25px;
  }

  @media (min-width: 1280px) {
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

  @media screen and (min-width: 1445px) and (max-width: 1920px) {
    //margin-right: 25px;
  }
`;
