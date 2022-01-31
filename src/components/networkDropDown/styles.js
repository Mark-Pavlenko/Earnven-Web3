import styled, { css } from 'styled-components';
import { Button, List } from '@material-ui/core';
import Popover from '@mui/material/Popover';

export const ReactSelectLayout = styled.div`
  height: 40px;
  border-radius: 10px;
  width: 153px;

  //@media (max-width: 709px) {
  //  display: none;
  //}
`;

export const ComingSoonLabel = styled.span`
  margin-left: 28px;
  color: #b3b3b4;
  font-family: Saira, sans-serif;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;

  :hover {
    cursor: pointer;
  }
`;

//actual styles

export const DesktopNetworksListPopover = styled(Popover)``;

export const DesktopNetworkButton = styled(Button)`
  width:153px;
  height: 40px;
  font-size: 16px;
  font-style: normal;
  border: none;
  border-radius: 10px;
  font-weight: ${(props) => (props.isLightTheme ? ' 500' : '600')};
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

export const InactiveDesktopListNetworkButton = styled(Button)`
  width:153px;
  height: 40px;
  font-size: 16px;
  font-style: normal;
  border: none;
  border-radius: 10px;
  font-weight: ${(props) => (props.isLightTheme ? ' 500' : '600')};
  color: ${(props) => (props.isLightTheme ? 'black' : 'white')};
  
  :hover {
    background-color: transparent !important;`;

export const DesktopNetworksListBlock = styled.div`
  width: 155px;
  height: 275px;
  background-color: ${(props) => (props.isLightTheme ? '#ffffff29' : '#1F265C3D')};
  mix-blend-mode: normal;
  box-shadow: ${(props) =>
    props.isLightTheme
      ? 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'
      : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
  backdrop-filter: blur(35px);
  border-radius: 10px;
`;

// UNUSED
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

export const MainSidebarMobilePopoverContent = styled.div`
  background-color: transparent !important;
  //background-color: red;
  height: 540px;
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
