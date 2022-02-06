import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';
import { ThemeProvider } from '@material-ui/styles';

import Mytheme from '../theme';

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    position: 'absolute',
    width: '51.875rem',
    height: '24.375rem',
    borderRadius: '10px',
    boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
    mixBlendMode: 'normal',
    // backgroundColor: 'red',
  },
  dialogTitle: {
    marginTop: '3px',
  },

  //background modal blur style
  outer: {
    // background: '#FFFFFF29',
    boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
    mixBlendMode: 'normal',
    backdropFilter: 'blur(5px)',
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

export default function Popup({ title, children, openPopup, setOpenPopup, isLightTheme }) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={Mytheme}>
      <Dialog
        open={openPopup}
        maxWidth="md"
        classes={{ container: classes.outer, paper: classes.dialogWrapper }}>
        <DialogTitle className={classes.dialogTitle}>
          <div style={{ display: 'flex' }}>
            <Typography
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
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
