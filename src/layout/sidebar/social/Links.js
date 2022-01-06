import React from 'react';
import { Link } from 'react-router-dom';
import './Links.css';
import { Box, Collapse, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Social from './Social';
import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/styles';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      color: 'black',
      fontWeight: 400,
      fontSize: '14px',
      textDecoration: 'none',
    },
  })
);

const CustomStyle = styled('a')(({ isLightTheme }) => ({
  color: isLightTheme ? 'black !important' : 'white !important',
  fontWeight: 400,
  fontSize: '14px',
  textDecoration: 'none',
  '&:hover': {
    color: '#4453AD !important',
    fontWeight: 500,
  },
}));

const Links = () => {
  const classes = useStyles();
  const themeType = useSelector((state) => state.themeReducer.isLightTheme);
  return (
    <>
      <div className="links">
        <List disablePadding style={{ marginBottom: '20px' }}>
          <CustomStyle isLightTheme={themeType} className={classes.root} href="url">
            Suggest protocol
          </CustomStyle>
        </List>
        <List className="List" disablePadding style={{ marginBottom: '20px' }}>
          <CustomStyle isLightTheme={themeType} className={classes.root} href="url">
            FAQ
          </CustomStyle>
        </List>
        <List className="List" disablePadding style={{ marginBottom: '20px' }}>
          <CustomStyle isLightTheme={themeType} className={classes.root} href="url">
            About Earven
          </CustomStyle>
        </List>
        <List className="List" disablePadding style={{ marginBottom: '20px' }}>
          <CustomStyle isLightTheme={themeType} className={classes.root} href="url">
            Supported platforms
          </CustomStyle>
        </List>
      </div>

      <Social />
    </>
  );
};

export default Links;
