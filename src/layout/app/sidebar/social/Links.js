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
      color: localStorage.getItem('selectedTheme') == 'Day' ? '#000000' : '#FDFFFF',
      fontWeight: 400,
      fontSize: '14px',
      textDecoration: 'none',
    },
  })
);

const CustomStyle = styled('a')(({ theme }) => ({
  color: localStorage.getItem('selectedTheme') == 'Day' ? '#000000' : '#FDFFFF',
  fontWeight: 400,
  fontSize: '14px',
  textDecoration: 'none',
  '&:hover': {
    color: '#4453AD',
  },
}));

const theme = createTheme();
const Links = ({ setTheme }) => {
  console.log('theme selecteiom', setTheme);
  const preventDefault = (event) => event.preventDefault();
  const classes = useStyles();

  return (
    <div className="links">
      <Box sx={{ pl: '4em', mt: '-2rem' }}>
        <List disablePadding>
          <CustomStyle
            className={classes.root}
            style={{ color: setTheme ? '#FDFFFF' : '#000000' }}
            href="url">
            Suggest protocol
          </CustomStyle>
        </List>
        <List disablePadding>
          <CustomStyle
            className={classes.root}
            style={{ color: setTheme ? '#FDFFFF' : '#000000' }}
            href="url">
            FAQ
          </CustomStyle>
        </List>
        <List disablePadding>
          <CustomStyle
            className={classes.root}
            style={{ color: setTheme ? '#FDFFFF' : '#000000' }}
            href="url">
            About Earven
          </CustomStyle>
        </List>
        <List disablePadding>
          <CustomStyle
            className={classes.root}
            style={{ color: setTheme ? '#FDFFFF' : '#000000' }}
            href="url">
            Supported platforms
          </CustomStyle>
        </List>
      </Box>
      <Social />
    </div>
  );
};

export default Links;
