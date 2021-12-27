import styled from 'styled-components';
import { Button, Box, Popover, ListItemText } from '@material-ui/core';

export const GasButton = styled(Button)`
  height: 40px;
  width: 70px;
  border-radius: 10px;
  color: ${(props) => (props.isLightTheme ? 'black' : 'white')};
  background-color: ${(props) => (props.isLightTheme ? 'white' : '#10142D')};
  box-shadow: ${(props) =>
    props.isLightTheme ? 'none' : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
`;

export const GasMenuPopover = styled(Popover)`
  margin-left: 122px;
`;

export const MenuPopoverBox = styled(Box)`
  width: 320px;
  height: 255px;
  border-radius: 10px;
  background-color: ${(props) => (props.isLightTheme ? 'rgba(255, 255, 255, 0.16)' : '#11152D')};
  box-shadow: ${(props) =>
    props.isLightTheme ? 'none' : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
`;

export const MenuPopoverBoxTitle = styled.p`
  margin-top: 20px;
  margin-left: 13px;
  margin-bottom: 17px;
  font-family: 'Saira', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 25px;
  color: ${(props) => (props.isLightTheme ? 'black' : 'white')};
`;

export const MenuPopoverBoxNote = styled.div`
  margin-top: 30px;
  margin-left: 13px;
  color: #7b7c87;
  font-size: 14px;

  a {
    color: #7b7c87;
    text-decoration: none;
  }
`;

export const GasMenuItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  margin-left: 13px;
  margin-right: 13px;
  padding-left: 12px;
  padding-right: 19px;
  color: ${(props) => (props.isLightTheme ? 'black' : 'white')};
  font-family: 'Saira', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;

  img {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }

  :hover {
    cursor: pointer;
    background-color: ${(props) => (props.isLightTheme ? '#ffffff' : '#1F265C')};
    color: ${(props) => (props.isLightTheme ? '#4453AD' : '#8F86FF')};
    font-weight: 600;
  }
`;
