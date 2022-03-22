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
  font-weight: normal !important;
  font-size: 16px;
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

export const InactiveDesktopListNetworkButton = styled(Button)`
  width: 130px;
  height: 40px;
  margin-bottom: 5px;
  margin-left:16px;
  font-size: 16px;
  font-style: normal;
  border: none;
  border-radius: 10px;
  font-weight: 500;
  color: ${(props) => (props.isLightTheme ? 'black' : 'white')};
  
  :hover {
    background-color: transparent !important;`;

export const DesktopNetworksListBlock = styled.div`
  width: 155px;
  height: 310px;
  background-color: ${(props) => (props.isLightTheme ? '#ffffff29' : '#10142D')};
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
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 132px;
  height: 30px;
  margin-bottom: 10px;
  margin-left: 9px;
  color: ${(props) => (props.isLightTheme ? 'black' : 'white')};

  img {
    margin-right: 8px;
    margin-left: 10px;
  }

  :hover {
    font-weight: 600;
    color: #4453ad;
    background-color: ${(props) => (props.isLightTheme ? '#ffffff' : '#10142D')};
    box-shadow: ${(props) =>
      props.isLightTheme
        ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
        : '  inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
    border-radius: 10px;
    cursor: pointer;
  }
`;

export const MainSidebarMobilePopoverContent = styled.div`
  background-color: transparent !important;
  //background-color: red;
  height: 540px;
`;

export const DesktopComingSoonLabel = styled.span`
  margin-top: -10px;
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

export const DesktopNetworksList = styled(List)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 140px;
  padding-top: 0;
`;

export const DesktopNetworksListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90px;
  height: 33px;
  margin-left: 19px;
  margin-bottom: 10px;
  color: ${(props) => (props.isLightTheme ? 'black' : 'white')};
  font-family: 'Saira', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 41px;
  cursor: pointer;

  img {
    margin-right: 10px;
    opacity: 0.6;
  }
`;

export const DesktopNetworksListItemLabelsBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 60px;
  height: 38px;
  margin-top: -18px;
  margin-left: -2px;
`;
