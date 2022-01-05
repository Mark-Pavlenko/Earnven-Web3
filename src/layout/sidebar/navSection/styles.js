import styled, { css } from 'styled-components';
import { experimentalStyled as MUIStyles } from '@material-ui/core/styles';
import { ListItem, ListItemIcon } from '@material-ui/core';

const ListItemGeneralStyles = css`
  position: relative;
  margin-left: 36px;
  padding-left: 10px;
  text-transform: capitalize;
  font-weight: bold;
  color: red;
  :hover {
    border-radius: 10px;
    width: 180px;
    box-shadow: 4px 6px 20px -5px rgba(51, 78, 131, 0.17);
    color: green;
  }
`;

export const ListItemElement = MUIStyles(ListItem)({
  ListItemGeneralStyles,
  fontWeight: 'fontWeightBold',
  borderRadius: '7px',
  width: '180px',
  '&:hover': {
    borderRadius: '10px',
    width: '180px',
  },
  color: (theme) => (localStorage.getItem('selectedTheme') == 'Day' ? 'black' : 'white'),
});

export const ListItemElementDisabled = MUIStyles(ListItem)({
  position: 'relative',
  marginLeft: '36px',
  paddingLeft: '10px',
  height: '52px',
  textTransform: 'capitalize',
  '&:hover': {
    borderRadius: '10px',
    width: '209px',
    background: 'none',
  },
});

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
  opacity: 0.5,
});
