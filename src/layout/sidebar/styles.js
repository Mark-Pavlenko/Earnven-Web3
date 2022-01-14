import styled from 'styled-components';
import { Drawer, Button, IconButton } from '@material-ui/core';

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

export const SidebarMobileNetworkButton = styled(Button)`
  width:161px;
  height: 40px;
  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  border: none;
  border-radius: 10px;
  color: ${(props) => (props.isLightTheme ? 'black' : 'white')};
  background-color: ${(props) => (props.isLightTheme ? '#ffffff' : '#10142D')};
  box-shadow: ${(props) =>
    props.isLightTheme
      ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
      : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
}
  :hover {
    background-color: transparent !important;
`;

export const MainSidebarMobilePopoverContent = styled.div`
  background-color: transparent !important;
  //background-color: red;
  height: 540px;
`;

export const SidebarMobilePopoverGasPriceTitle = styled.p`
  margin-top: 20px;
  margin-left: 30px;
  font-family: 'Saira', sans-serif;
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  line-height: 41px;

  color: ${(props) => (props.isLightTheme ? 'black' : 'white')};
`;

export const SidebarMobilePopoverLink = styled.div`
  margin-top: 34px;
  margin-left: 30px;
  font-size: 14px;
  color: #7b7c87;
  a {
    color: #7b7c87;
    text-decoration: none;
  }
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
