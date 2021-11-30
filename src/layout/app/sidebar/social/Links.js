/***********************************************************************************
Purpose : Re-designed UI
Developed by : Sathyakrishna T
Version log:
----------------------------------------------------------------------------------
Version           Date                         Description
---------------------------------------------------------------------------------
1.0               4/nov/2021                   Initial Development
************************************************************************************/

import React from 'react';
import { Link } from 'react-router-dom';
import './Links.css';
import { Box, Collapse, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Social from './Social';
import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/styles';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@material-ui/core/styles';
import { experimentalStyled as styled } from '@material-ui/core/styles';
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      color: 'black',
      fontWeight: 400,
      fontSize: '14px',
      textDecoration: 'none',
      paddingBottom: '2px',
    },
  })
);

const CustomStyle = styled('a')(({ theme }) => ({
  color: 'green',
  fontWeight: 400,
  fontSize: '14px',
  textDecoration: 'none',
  '&:hover': {
    color: '#4453AD',
  },
}));

const theme = createTheme();
const Links = () => {
  const preventDefault = (event) => event.preventDefault();
  const classes = useStyles();

  return (
    <>
      <div className="links">
        <Box sx={{ ml: '4em' }}>
          <List disablePadding>
            <CustomStyle className={classes.root} href="url">
              Suggest protocol
            </CustomStyle>
          </List>
          <List disablePadding>
            <CustomStyle className={classes.root} href="url">
              FAQ
            </CustomStyle>
          </List>
          <List disablePadding>
            <CustomStyle className={classes.root} href="url">
              About Earven
            </CustomStyle>
          </List>
          <List disablePadding>
            <CustomStyle className={classes.root} href="url">
              Supported platforms
            </CustomStyle>
          </List>
        </Box>
      </div>
      <Social />
    </>
  );
};

export default Links;
