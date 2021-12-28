import styled from 'styled-components';
import { Box, AppBar, Toolbar, IconButton } from '@material-ui/core';
import lightDashboard from '../../assets/images/lightDashboard.jpg';
import lightDashboardBig from '../../assets/images/lightDashboardBig.jpg';

export const HeaderLayoutBig = styled.div`
  height: 102px;
  background: ${(props) => (props.isLightTheme ? `url(${lightDashboard})` : `#0B0E1D`)};
  @media (min-width: 2100px) {
    background: ${(props) => (props.isLightTheme ? `url(${lightDashboardBig})` : `#0B0E1D`)};
  }
  @media screen and (min-width: 711px) and (max-width: 1280px) {
    display: grid;
    grid-template-columns: 40% 60%;
    margin-left: 0;
  }
  @media (max-width: 710px) {
    display: none;
  }

  @media (min-width: 1280px) {
    display: grid;
    grid-template-columns: 30% 70%;
    margin-left: 314px;
  }
`;

export const HeaderLayoutMobile = styled.div`
  height: 142px;
  background: ${(props) => (props.isLightTheme ? `url(${lightDashboard})` : `#0B0E1D`)};
  @media (min-width: 2100px) {
    background: ${(props) => (props.isLightTheme ? `url(${lightDashboardBig})` : `#0B0E1D`)};
  }
  @media (min-width: 711px) {
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

  @media (max-width: 711px) {
    margin-top: 30px;
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
  @media screen and (min-width: 710px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

export const BurgerIcon = styled(IconButton)`
  img {
    width: 41px;
    height: 41px;
    @media (min-width: 711px) {
      margin-left: 5px;
    }
  }

  @media (max-width: 710px) {
    margin-left: auto;
  }

  @media (min-width: 1024px) {
    margin-left: 25px;
  }

  @media (min-width: 1280px) {
    display: none;
  }
`;

export const MockUserMobileAvatar = styled.img`
  width: 40px;
  height: 40px;

  @media (max-width: 711px) {
    margin-right: 20px;
    //margin-top: 20px;
    //margin-left: 15px;
  }

  @media (min-width: 711px) {
    display: none;
  }
`;

export const ChangeThemeBtn = styled(IconButton)`
  //'&:hover': {
  //  backgroundColor: 'none !important',
  //  // borderColor: '#0062cc',
  //  boxShadow: 'none',
  //},

  @media (max-width: 711px) {
    //margin-left: auto;
  }
`;
