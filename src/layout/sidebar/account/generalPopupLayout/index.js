import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import closeWalletModalBtnLight from '../../../../assets/icons/closeWalletModalBtnLight.svg';
import closeWalletModalBtnDark from '../../../../assets/icons/closeWalletModalBtnDark.svg';
import { MobileLogoBlockSubLayout, PopupTitle } from './generalPopupStyles';
import { useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CloseMobileSidebarIcon, LogoImg, MobileLogoBlockWalletsList } from './generalPopupStyles';
import CompanyLogo from '../../../../assets/icons/logo_menu.svg';
import Earnven from '../../../../assets/icons/Earnven_menu_text.svg';
import Dark_Earnven_logo from '../../../../assets/icons/Dark_Earnven_logo.svg';
import CloseMobileSidebarLight from '../../../../assets/images/closeMobileSidebarLight.svg';
import CloseMobileSidebarDark from '../../../../assets/images/closeMobileSidebarDark.svg';

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
  const mobilePopoverSize = useMediaQuery('(max-width:850px)');
  const endMobileBackground = useMediaQuery('(max-width:450px)');

  return (
    <Dialog
      open={openPopup}
      maxWidth="md"
      classes={{ container: classes.outer }}
      PaperProps={{
        style: {
          position: 'absolute',
          width: mobilePopoverSize ? '100%' : '830px',
          height: mobilePopoverSize ? '100%' : '390px',
        },
      }}>
      <DialogContent
        // bgMobile_375x3201.jpg
        style={{
          background: isLightTheme
            ? endMobileBackground
              ? `url(${require(`../../../../assets/images/bgMobile_375x3201.jpg`).default})`
              : `url(${require(`../../../../assets/images/lightDashboardBig.jpg`).default})`
            : '#10142D',
          padding: mobilePopoverSize ? '20px 15px 0 15px' : '17px 32px 0px 32px',
          boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
          mixBlendMode: 'normal',
          backdropFilter: 'blur(35px)',
        }}>
        <DialogTitle style={{ padding: 0 }}>
          {mobilePopoverSize ? (
            <>
              <MobileLogoBlockWalletsList>
                <MobileLogoBlockSubLayout>
                  <LogoImg src={CompanyLogo} alt="" />
                  <img
                    className="Earnven"
                    src={isLightTheme ? Earnven : Dark_Earnven_logo}
                    alt=""
                    style={{ width: '93px', height: '19px' }}
                  />
                </MobileLogoBlockSubLayout>

                <CloseMobileSidebarIcon
                  src={isLightTheme ? CloseMobileSidebarLight : CloseMobileSidebarDark}
                  alt=""
                  onClick={() => setOpenPopup(false)}
                />
              </MobileLogoBlockWalletsList>
              <PopupTitle variant="popupTitle" component="div" isLightTheme={isLightTheme}>
                {title}
              </PopupTitle>
            </>
          ) : (
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
          )}
        </DialogTitle>
        <>{children}</>
      </DialogContent>
    </Dialog>
  );
}
