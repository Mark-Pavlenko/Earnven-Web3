import styled from 'styled-components';
import { Drawer, IconButton } from '@material-ui/core';

export const DrawerLayoutMobile = styled(Drawer)`
  @media (min-width: 1281px) {
    display: none;
  } ;
`;

export const RootStyle = styled.div`
  @media (max-width: 1280px) {
    display: none;
  }
`;

export const SidebarMainLayout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;

  @media (max-width: 1280px) {
    //height: auto;
  }
`;

export const LogoBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin-top: 32px;
  margin-right: 41px;
  margin-left: 124px;
  width: 150px;
  height: 42px;

  @media (max-width: 1280px) {
    margin-top: 20px;
    margin-left: 15px;
    justify-content: start;
  }
`;

export const CloseMobileSidebarIcon = styled.img`
  margin-left: 140px;
  cursor: pointer;
  @media (min-width: 1281px) {
    display: none;
  } ;
`;

export const LogoImg = styled.img`
  margin-right: 10px;
`;

export const SidebarMobileIconsBlock = styled.div`
  @media (min-width: 1281px) {
    display: none;
  }
`;

export const SidebarMobileIconSubBlock = styled.div`
  width: 250px;
  margin-top: 25px;
  margin-left: 38px;
  display: flex;
  flex-direction: row;
  gap: 30px;
  align-items: center;
`;

export const SidebarMobileNetworkButton = styled(IconButton)`
  :hover {
    background-color: transparent !important;
`;

export const MainSidebarMobilePopoverContent = styled.div`
  background-color: transparent !important;
  height: 540px;
  width: 345px;
`;

export const ChangeThemeBtnMobile = styled(IconButton)`
  display: flex;
  margin: 16px 30px 5px;
  margin-right: auto;
`;

export const SidebarMobileDelimiter = styled.div`
  margin-left: 38px;
  width: 264px;
  height: 1px;
  //opacity: 0.05;
  background-color: #dae5f4;
  margin-bottom: 20px;
`;
