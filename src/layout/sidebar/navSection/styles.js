import styled, { css } from 'styled-components';
import { experimentalStyled as MUIStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';

const ListItemGeneralStyles = css`
  position: relative;
  margin-left: 36px;
  padding-left: 10px;
  text-transform: capitalize;

  width: 180px;
  //height: 52px;
  //padding-bottom: 0;
  height: 52px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;

  //:hover {
  //  border-radius: 10px;
  //  width: 180px;
  //  box-shadow: 4px 6px 20px -5px rgba(51, 78, 131, 0.17);
  //}
`;

export const ListItemElement = MUIStyles(ListItem)(({ isLightTheme }) => ({
  ListItemGeneralStyles,
  color: isLightTheme ? 'black' : 'white',
  fontWeight: 500,
  '&:hover': {
    borderRadius: '10px',
    width: '180px',
    color: isLightTheme ? '#4453AD' : '#8F86FF',
    backgroundColor: isLightTheme ? '#ffffff' : '#1F265C',
    fontWeight: 'bold',
    boxShadow: isLightTheme
      ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
      : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
  },
}));

export const ListItemElementDisabled = MUIStyles(ListItem)(({ isLightTheme }) => ({
  ListItemGeneralStyles,
  color: isLightTheme ? 'black' : 'white',

  opacity: '0.5',
  textTransform: 'capitalize',

  '&:hover': {
    backgroundColor: 'transparent !important',
  },
}));

export const ItemSubText = MUIStyles(ListItemText)(({ isLightTheme }) => ({}));

export const ItemSubTextDisabled = MUIStyles(ListItemText)(({ isLightTheme }) => ({
  display: 'flex',
  marginTop: '-20px',
  marginLeft: '102px',
  color: isLightTheme ? 'black' : 'white',
  fontSize: '10px',
  opacity: '0.5',
}));

export const ListItemElementIcon = MUIStyles(ListItemIcon)({
  width: 28,
  height: 28,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const ListItemElementDisabledIcon = MUIStyles(ListItemIcon)({
  width: 28,
  height: 28,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '7px 21px 22px -15px rgba(51, 78, 131, 0.17)',
});

export const MainNavLayout = styled.div`
  overflow: hidden;
  //height: 400px;
  // background-color: red;
`;

export const NavList = styled(List)({
  marginTop: 63,
  marginLeft: 61,
  marginBottom: 21,
  // backgroundColor: 'lightBlue',
});
