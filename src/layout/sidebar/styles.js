import styled from 'styled-components';
import { Drawer } from '@material-ui/core';

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
