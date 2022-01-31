import styled from 'styled-components';
import { Button } from '@material-ui/core';

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
export const SidebarTabletNetworkButton = styled(Button)`

  width:153px;
  height: 40px;
  font-size: 16px;
  font-weight: ${(props) => (props.isLightTheme ? ' 500' : '600')};
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
