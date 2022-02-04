import styled, { css } from 'styled-components';
import { experimentalStyled as MUIStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';

const ListItemGeneralStyles = css`
  position: relative;
  margin-left: 36px;
  padding-left: 10px;
  text-transform: capitalize;

  width: 180px;
  height: 52px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;

  @media (max-width: 1280px) {
    margin-left: 15px;
    width: 330px;
    height: 47px;
  }

  @media screen and (max-width: 1445px) and (min-width: 1281px) {
    margin-left: 0;
    padding-left: 0;
    width: auto;
  }
`;

export const ListItemElement = styled(ListItem)`
  ${ListItemGeneralStyles};
  color: ${(props) => (props.isLightTheme ? 'black' : 'white')};
  font-weight: 500;
  :hover {
    border-radius: 10px;
    width: 180px;
    color: ${(props) => (props.isLightTheme ? '#4453AD' : '#8F86FF')};
    background-color: ${(props) => (props.isLightTheme ? '#ffffff' : '#1F265C')};
    font-weight: bold;
    box-shadow: ${(props) =>
      props.isLightTheme
        ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
        : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};

    @media screen and (max-width: 1445px) and (min-width: 1281px) {
      margin-left: 0;
      padding-left: 0;
      width: auto;
    }
  }

  @media (max-width: 1280px) {
    font-size: 16px;
    :hover {
      width: 330px;
    }
  }
`;

export const ListItemElementDisabledLayout = styled.div`
  margin-bottom: 0;
`;

export const ListItemElementDisabled = styled(ListItem)`
  ${ListItemGeneralStyles};
  color: ${(props) => (props.isLightTheme ? 'black' : 'white')};
  opacity: 0.5;
  text-transform: capitalize;

  :hover {
    background-color: transparent !important;
  }

  @media (max-width: 1280px) {
    font-size: 16px;
    height: 52px;
  }
`;

export const ItemSubText = MUIStyles(ListItemText)(({ isLightTheme }) => ({}));

export const ItemSubTextDisabled = styled(ListItemText)`
  display: flex;
  margin-top: -20px;
  margin-left: 102px;
  color: ${(props) => (props.isLightTheme ? 'black' : 'white')};
  font-size: 10px;
  opacity: 0.5;

  @media (max-width: 1280px) {
    margin-left: 82px;
  }

  @media screen and (max-width: 1445px) and (min-width: 1281px) {
    margin-left: 55px;
  }
`;

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
  //overflow: hidden;
  @media (max-width: 1280px) {
    //overflow: auto;
  }
  //height: 400px;
  // background-color: red;
`;

export const NavList = styled(List)`
  margin-top: 43px;
  margin-left: 61px;
  margin-bottom: 21px;

  @media (max-width: 1445px) {
    margin-top: 15px;
  }

  @media screen and (max-width: 1445px) and (min-width: 1281px) {
    margin-left: 0;
  }

  @media (max-width: 709px) {
    margin-left: 0;
  }

  @media screen and (min-width: 1445px) and (max-height: 880px) {
    margin-top: 10px;
  }
`;
