import styled from 'styled-components';
import { Box, AppBar, Toolbar, IconButton } from '@material-ui/core';
import lightDashboard from '../../../assets/images/lightDashboard.jpg';
import lightDashboardBig from '../../../assets/images/lightDashboardBig.jpg';

export const AppBarLayout = styled(AppBar)`
  box-shadow: none;
  backdrop-filter: blur(6px);
  background-color: red;
  display: flex;
  flex-direction: row;

  // webkit-backdrop-filter: blur(10px); // Fix on Mobile
  // background: ${(props) => (props.isLightTheme ? `url(${lightDashboard})` : `#0B0E1D`)};
  // @media (min-width: 1880px) {
  //   background: ${(props) => (props.isLightTheme ? `url(${lightDashboardBig})` : `#0B0E1D`)};
  // }
`;

export const HeaderLayout = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  margin-left: 315px;
  height: 102px;
  //display: flex;
  //flex-direction: row;
  //justify-content: space-between;
  //justify-items: center;
`;

export const HeaderTitle = styled.div`
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
  background-color: green;
`;

export const HeaderItemsBlock = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-right: 35px;
  background-color: red;
`;
