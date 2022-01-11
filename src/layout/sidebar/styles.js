import styled from 'styled-components';
import { Drawer } from '@material-ui/core';

export const DrawerLayoutMobile = styled(Drawer)``;

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
  //background-color: red;
`;

export const LogoImg = styled.img`
  margin-right: 10px;
`;
