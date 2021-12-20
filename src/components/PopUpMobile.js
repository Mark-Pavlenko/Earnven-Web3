import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
// import Disconnect from './Disconnect';
import { makeStyles } from '@material-ui/styles';
import { ThemeProvider } from '@material-ui/styles';
// import MuiThemeProvider from '@material-ui/styles/MuiThemeProvider';
import { Button } from '@material-ui/core';

// const Address = styled('div')(({ theme }) => ({
//   color: 'blue',
//   background: theme.palette.menu.backgorundColor_wallet_secondary,
// }));

export default function PopupMobile(props) {
  const { title, children, openPopup, setOpenPopup } = props;
  const [Theme_NFT, setTheme_NFT] = useState(localStorage.getItem('selectedTheme'));
  const useStyles = makeStyles((theme) => ({
    dialogWrapper:
      localStorage.getItem('selectedTheme') == 'Day'
        ? {
            background: localStorage.getItem('selectedTheme') == 'Day' ? '#FFFFFF' : '#FFFFFF',
            // background: 'rgba(255, 255, 255, 0.9)',
            mixBlendMode: 'normal',
            minWidth: '78%',
            // backdropFilter: 'blur(20px)',
            boxShadow: '7px 21px 22px -15px rgba(51, 78, 131, 0.17)',
            borderRadius: '10px',
            overflow: 'visible',
            opacity: 0.8,
            ['@media (max-width:500px)']: {
              position: 'absolute',
              bottom: '-2.3rem',
              borderRadius: '15px',
              fill: 'white',
              stroke: 'green',
              strokeWidth: 1,
              minWidth: '100%',
            },
          }
        : {
            background: '#0B0E1D',
            mixBlendMode: 'normal',
            // backdropFilter: 'blur(20px)',
            boxShadow: '7px 21px 22px -15px rgba(51, 78, 131, 0.17)',
            borderRadius: '10px',
            overflow: 'visible',
            minWidth: '78%',
            opacity: 0.8,
            ['@media (max-width:500px)']: {
              position: 'absolute',
              bottom: '-2.3rem',
              borderRadius: '15px',
              fill: 'white',
              stroke: 'green',
              strokeWidth: 1,
              minWidth: '100%',
            },
          },
    dialogTitle: {
      marginTop: '3px',
    },
    close: {
      border: '0px',
      marginRight: '10px',
      marginTop: '5px',
      cursor: 'pointer',
      width: '14px',
      height: '14px',
    },
    outer: {
      background: 'rgba(68, 83, 173, 0.1)',
      mixBlendMode: 'normal',
      backdropFilter: 'blur(8px)',
      boxShadow: '7px 21px 22px -15px rgba(51, 78, 131, 0.17)',
      borderRadius: '10px',
    },
  }));

  const classes = useStyles();
  function handleClose() {
    setOpenPopup(false);
  }
  return (
    <Dialog
      modal={true}
      contentStyle={{
        width: window.innerHeight,
        maxWidth: 'none',
      }}
      open={openPopup}
      onClose={handleClose}
      classes={{ paper: classes.dialogWrapper, container: classes.outer }}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
