import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';
import { ThemeProvider } from '@material-ui/styles';
import closeWalletModalBtnLight from '../../../../assets/icons/closeWalletModalBtnLight.svg';
import closeWalletModalBtnDark from '../../../../assets/icons/closeWalletModalBtnDark.svg';

import Mytheme from '../theme';
import { IconButton } from '@mui/material';

const useStyles = makeStyles((isLightTheme) => ({
  //background modal blur style
  outer: {
    // background: 'rgba(223, 235, 255, 0.4)',
    boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
    mixBlendMode: 'normal',
    backdropFilter: 'blur(5px)',
  },
}));

export default function Popup({ title, children, openPopup, setOpenPopup, isLightTheme }) {
  const classes = useStyles(isLightTheme);

  return (
    <ThemeProvider theme={Mytheme}>
      <Dialog
        open={openPopup}
        maxWidth="md"
        classes={{ container: classes.outer }}
        PaperProps={{
          style: {
            position: 'absolute',
            width: '51.875rem',
            height: '24.375rem',
            borderRadius: '10px',
            boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
            mixBlendMode: 'normal',
            backgroundColor: isLightTheme ? '#FFFFFF' : '#4453AD1A',
            backdropFilter: 'blur(35px)',
          },
        }}>
        <DialogTitle style={{ marginTop: '3px' }}>
          <div style={{ display: 'flex' }}>
            <Typography
              variant="popupTitle"
              component="div"
              style={{
                flexGrow: 1,
                fontFamily: 'Saira, sans-serif',
                color: isLightTheme ? '#1E1E20' : '#FFFFFF',
                lineHeight: '41px',
                fontSize: '26px',
              }}>
              {title}
            </Typography>
            <img
              src={closeWalletModalBtnDark}
              onClick={() => {
                setOpenPopup(false);
              }}
              style={{
                width: '14px',
                height: '14px',
                marginTop: '13px',
                cursor: 'pointer',
                opacity: 0.6,
              }}
              alt="close_modal_btn_icon"
            />
          </div>
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
