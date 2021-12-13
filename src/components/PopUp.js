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

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;
  const [Theme_NFT, setTheme_NFT] = useState(localStorage.getItem('selectedTheme'));
  const useStyles = makeStyles((theme) => ({
    dialogWrapper:
      localStorage.getItem('selectedTheme') == 'Day'
        ? {
            background:
              localStorage.getItem('selectedTheme') == 'Day'
                ? theme.palette.nft_light.NFT_popup_background
                : theme.palette.nft_dark.NFT_popup_background,
            // background: 'rgba(255, 255, 255, 0.9)',
            minWidth: '1110px',
            minHeight: '595px',
            mixBlendMode: 'normal',
            // backdropFilter: 'blur(20px)',
            boxShadow: '7px 21px 22px -15px rgba(51, 78, 131, 0.17)',
            borderRadius: '10px',
            overflow: 'visible',
            opacity: 0.9,
          }
        : {
            background: '#0B0E1D',
            minWidth: '1110px',
            minHeight: '595px',
            mixBlendMode: 'normal',
            // backdropFilter: 'blur(20px)',
            boxShadow: '7px 21px 22px -15px rgba(51, 78, 131, 0.17)',
            borderRadius: '10px',
            overflow: 'visible',
            opacity: 0.8,
          },
    dialogTitle: {
      marginTop: '3px',
    },
    outer: {
      background: 'rgba(68, 83, 173, 0.1)',
      mixBlendMode: 'normal',
      backdropFilter: 'blur(4px)',
      boxShadow: '7px 21px 22px -15px rgba(51, 78, 131, 0.17)',
      borderRadius: '10px',
    },
    close: {
      border: '0px',
      marginRight: '10px',
      marginTop: '5px',
      cursor: 'pointer',
      width: '14px',
      height: '14px',
    },
  }));

  const classes = useStyles();

  return (
    <Dialog
      open={openPopup}
      maxWidth="md"
      sx={{}}
      classes={{ container: classes.outer, paper: classes.dialogWrapper }}>
      {/* <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: 'flex' }}>
          <Typography
            className={classes.title}
            variant="popupTitle"
            component="div"
            style={{ flexGrow: 1, fontFamily: 'Saira, sans-serif' }}>
            {title}
          </Typography>
          <button
            className={classes.close}
            classes={{ container: classes.outer, paper: classes.close }}
            onClick={() => {
              setOpenPopup(false);
            }}>
            <CloseIcon />
          </button>
        </div>
      </DialogTitle> */}
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
