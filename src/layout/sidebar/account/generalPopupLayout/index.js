import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';
import { ThemeProvider } from '@material-ui/styles';
import closeWalletModalBtnLight from '../../../../assets/icons/closeWalletModalBtnLight.svg';
import closeWalletModalBtnDark from '../../../../assets/icons/closeWalletModalBtnDark.svg';

import Mytheme from '../theme';
import { IconButton } from '@mui/material';
import { PopupTitle } from './styles';
import { useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles = makeStyles((isLightTheme) => ({
  //background modal - can`t put props of theme to class styles
  outer: {
    background: '#FFFFFF29',
    // background: `url(${require(`../../../../assets/images/lightDashboard.jpg`).default})`,
    boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
    mixBlendMode: 'normal',
    backdropFilter: 'blur(5px)',
  },
}));

export default function Popup({ title, children, openPopup, setOpenPopup }) {
  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);
  const classes = useStyles(isLightTheme);
  const endMobilePopoverSize = useMediaQuery('(max-width:850px)');

  return (
    <Dialog
      open={openPopup}
      maxWidth="md"
      classes={{ container: classes.outer }}
      PaperProps={{
        style: {
          position: 'absolute',
          width: endMobilePopoverSize ? '100vw' : '830px',
          height: endMobilePopoverSize ? '100vh' : '390px',
        },
      }}>
      <DialogContent
        style={{
          background: isLightTheme
            ? `url(${require(`../../../../assets/images/lightDashboardBig.jpg`).default})`
            : '#10142D',
          padding: '17px 32px 0px 32px',
          boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
          mixBlendMode: 'normal',
          backdropFilter: 'blur(35px)',
        }}>
        <DialogTitle style={{ padding: 0 }}>
          <div style={{ display: 'flex' }}>
            <PopupTitle variant="popupTitle" component="div" isLightTheme={isLightTheme}>
              {title}
            </PopupTitle>
            <img
              src={isLightTheme ? closeWalletModalBtnDark : closeWalletModalBtnLight}
              onClick={() => {
                setOpenPopup(false);
              }}
              style={{
                width: '14px',
                height: '14px',
                marginTop: '8px',
                cursor: 'pointer',
                opacity: 0.6,
              }}
              alt="close_modal_btn_icon"
            />
          </div>
        </DialogTitle>
        <>{children}</>
      </DialogContent>
    </Dialog>
  );
}
