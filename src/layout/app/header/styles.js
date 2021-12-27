import styled from 'styled-components';
import { Box, AppBar, Toolbar, IconButton } from '@material-ui/core';
import lightDashboard from '../../../assets/images/lightDashboard.jpg';
import lightDashboardBig from '../../../assets/images/lightDashboardBig.jpg';

export const HeaderLayoutBig = styled.div`
  height: 102px;
  background: ${(props) => (props.isLightTheme ? `url(${lightDashboard})` : `#0B0E1D`)};
  @media (min-width: 2100px) {
    background: ${(props) => (props.isLightTheme ? `url(${lightDashboardBig})` : `#0B0E1D`)};
  }
  @media (max-width: 1280px) {
    display: grid;
    grid-template-columns: 30% 70%;
    margin-left: 0;
  }

  @media (min-width: 1280px) {
    display: grid;
    grid-template-columns: 40% 60%;
    margin-left: 314px;
  }
`;

export const HeaderTitleBig = styled.div`
  display: flex;
  align-items: center;
  padding-left: 35px;
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

  @media (max-width: 1279px) {
    margin-left: 50px;
  }

  @media (min-width: 1280px) {
  }
`;

export const HeaderItemsBlockBig = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const BurgerIcon = styled(IconButton)`
  @media (min-width: 1280px) {
    display: none;
  }
`;
