import styled from 'styled-components';
import { Drawer, List, Button, IconButton } from '@material-ui/core';

export const DrawerLayoutDesktop = styled(Drawer)`
  @media (max-width: 1444px) {
    display: none;
  }
`;

export const DrawerLayoutTablet = styled(Drawer)`
  @media (min-width: 1445px) {
    display: none;
  }
`;

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

export const LogoTitleImg = styled.img`
  width: 75%;
`;

export const LogoBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin-top: 32px;
  margin-right: 20px;
  margin-left: 124px;
  width: auto;
  height: 42px;

  @media (max-width: 1280px) {
    margin-top: 20px;
    margin-left: 15px;
    justify-content: start;
  }

  @media screen and (max-width: 1445px) and (min-width: 1281px) {
    margin-left: 60px;
    //margin-right: 0;
  }

  //background-color: red;
  @media screen and (max-width: 1280px) and (min-width: 710px) {
    justify-content: space-between;
  }

  @media (min-width: 1446px) {
    margin-right: 50px;
  }
`;

export const MobileLogoBlockWalletsList = styled.div`
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

  @media screen and (max-width: 1445px) and (min-width: 1281px) {
    margin-left: 2px;
  }
`;

export const CloseMobileSidebarIcon = styled.img`
  margin-left: 140px;
  cursor: pointer;
  @media (min-width: 1281px) {
    display: none;
  } ;
`;

export const CloseTabletSidebarIcon = styled.img`
  //margin-left: 140px;
  //margin-left: auto;
  cursor: pointer;
  @media (min-width: 1281px) {
    display: none;
  } ;
`;

export const LogoImg = styled.img`
  margin-right: 10px;
  @media screen and (max-width: 1445px) and (min-width: 1281px) {
    margin-right: 5px;
  }
`;

export const MobileLogoTitle = styled.p`
  color: ${(props) => (props.isLightTheme ? `black` : `white`)};
`;

export const SidebarMobileIconsBlock = styled.div`
  @media (min-width: 710px) {
    display: none;
  }
`;

export const SidebarTabletHeaderBtnsLayout = styled.div`
  //background-color: green;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: auto;
  width: 395px;
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

export const SidebarTabletNetworkButton = styled(Button)`
  margin-left: 20px;

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
  @media (max-width: 709px){
    display: none;
  }
  :hover {
    background-color: transparent !important;


`;

export const MainSidebarMobilePopoverContent = styled.div`
  background-color: transparent !important;
  //height: 540px;
`;

export const MobileSidebarNetworksList = styled(List)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-top: 30px;
  margin-left: 53px;

  @media (max-width: 1280px) {
    margin-top: 15px;
  }
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 132px;
    height: 40px;
    margin-bottom: 25px;
    color: ${(props) => (props.isLightTheme ? 'black' : 'white')};
    font-family: 'Saira', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 41px;
    cursor: pointer;

    img {
      margin-left: 10px;
      margin-right: 10px;
    }
  }

  Button {
    width: 132px;
    height: 40px;
    margin-bottom: 18px;
    color: ${(props) => (props.isLightTheme ? 'black' : 'white')};
    font-family: 'Saira', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 41px;
  }
`;

export const EthereumActiveNetwork = styled.div`
  :hover {
    font-weight: 600;
    color: #4453ad;
    background-color: ${(props) => (props.isLightTheme ? '#ffffff' : '#10142D')};
    box-shadow: ${(props) =>
      props.isLightTheme
        ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
        : '  inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
    border-radius: 10px;
  }
`;

export const MobileSidebarComingSoonLabel = styled.span`
  //margin-left: 28px;
  color: #b3b3b4;
  font-family: Saira, sans-serif;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  margin-top: 50px;
  margin-left: -60px;

  :hover {
    cursor: pointer;
  }
`;

export const MobileSidebarNetworksListSubBlock = styled.div`
  display: flex;
  flex-direction: column;
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
  @media screen and (max-width: 1280px) and (min-width: 710px) {
    display: none;
  }
`;

export const ChangeThemeBtnTablet = styled(IconButton)`
  display: none;
  @media screen and (max-width: 1280px) and (min-width: 710px) {
    display: block;
  }
`;

export const SidebarMobileDelimiter = styled.div`
  margin-left: 38px;
  width: 264px;
  height: 1px;
  //opacity: 0.05;
  background-color: #dae5f4;
  margin-bottom: 20px;

  @media screen and (max-width: 780px) and (min-width: 710px) {
    margin-top: 15px;
  }
`;

export const EnterAccountBlockMobileScreens = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  //margin-left: auto;
  margin-left: 45px;
  margin-right: 20px;
  width: 169px;
  height: 38px;

  span {
    color: #4453ad;
    font-family: 'Saira', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 31px;
    letter-spacing: 0;
  }

  p {
    color: ${(props) => (props.isLightTheme ? 'black' : 'white')};
    font-family: 'Saira', sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 19px;
  }

  @media screen and (min-width: 710px) and (max-width: 1280px) {
    margin-left: 100px;
  }

  @media (min-width: 780px) {
    display: none;
  }

  @media (max-width: 709px) {
  }
`;
