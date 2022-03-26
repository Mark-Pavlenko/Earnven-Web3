/***********************************************************************************
Purpose : Re-designed UI
Developed by : Sathyakrishna T
Version log:
----------------------------------------------------------------------------------
Version           Date                         Description
---------------------------------------------------------------------------------
1.0               4/nov/2021                   Initial Development
************************************************************************************/

import { experimentalStyled as styled } from '@material-ui/core/styles';
import accountLogo from '../../../../assets/icons/accountlogo.png';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Avatar, Box, List, Popover, Stack, Typography } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import '../styles';
import { useNavigate } from 'react-router-dom';
import AccountBalance from '../../../../components/accountBalance/AccountBalance_Menu';
import MenuPopover from '../walletsListOptionsPopover';
import rename_menu_icon from '../../../../assets/icons/rename_menu_icon.svg';
import copy_menu_icon from '../../../../assets/icons/copy_menu_icon.svg';
import copy_link_menu_icon from '../../../../assets/icons/copy_link_menu_icon.svg';
import disconnect_menu_icon from '../../../../assets/icons/disconnect_menu_icon.svg';
import dots_menu_icon from '../../../../assets/icons/3dots_menu_icon.svg';
import ThemeConfig from '../../../../theme';
import { DisconnectPopup } from '../generalPopupLayout/disconnectPopup';
import RenamePopup from '../generalPopupLayout/renamePopup';
import Popup from '../generalPopupLayout';
import green_got_menu from '../../../../assets/icons/greenDot.svg';
import menurender_customhook from '../menurender_customhook';
import copy_notification_menu from '../../../../assets/icons/copy_notification_menu.svg';
import userMockAvatar from '../../../../assets/icons/userMockAvatar.png';
import { useSelector } from 'react-redux';
import walletAddressCutter from '../../../../utils/helpers';

import {
  WalletsListLayout,
  WalletListItemAccountLogo,
  WalletListItemAccountBalance,
  WalletActionsListItem,
  MyWalletsLabel,
  WalletListItemContent,
  WalletListItemGreenDot,
  DotIconBlock,
  MetamaskLabel,
  WalletActionsList,
  WalletActionsLayout,
  WalletActionsListItemLabel,
  DisconnectWalletActionsListItem,
  WalletListSubLayout,
} from '../styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles = makeStyles(() =>
  createStyles({
    menupopover: {
      marginTop: '-13px',
      marginLeft: '45px',
    },
    icon: {
      marginLeft: '21px',
      marginTop: '12px',
      display: 'flex',
      width: '16px',
      height: '16px',

      ['@media (max-width:1280px)']: { width: '29.2px', height: '22px' },
    },

    text: {
      marginLeft: '25px',
      marginTop: '14px',
      fontSize: '10px',
      display: 'flex',
    },
    copy_notification: {
      width: '306px',
      height: '197px',
    },
    copy_notification_menu: {
      position: 'fixed',
      left: '42%',
      top: '39.6%',
    },
  })
);

import OutsideClickHandler from '../../../../screens/Exchange/outsideClickHandler';

export default function Accounts(
  {
    address,
    name,
    setaccount_menuclose,
    globalWalletsList,
    currentWalletAddress,
    isMetamaskWallet,
    isMobileWalletsList,
  },
  props
) {
  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);
  const { onReRender } = props;
  const { flag_menu, change_flag } = menurender_customhook();
  const classes = useStyles();
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const [account, setaccount] = useState(false);
  const [flag, setflag] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup_rename, setOpenPopup_rename] = useState(false);
  const [isModalHelperVisible, setIsModalHelperVisible] = useState(false);
  const selectedAccountAddress = localStorage.getItem('selected-account');
  const endTabletSize = useMediaQuery('(max-width:1280px)');

  const showAccountPopover = () => {
    setaccount(true);
  };
  const hideAccountPopover = () => {
    setaccount(false);
  };

  const disconnect = (address) => {
    let result = localStorage.getItem('wallets');
    result = JSON.parse(result);
    let output = result.filter((option) => {
      return option.address !== address;
    });
    localStorage.setItem('wallets', JSON.stringify(output));
  };

  function copy_notification() {
    setflag(true);
  }

  function close_copy_notification() {
    setTimeout(() => setflag(false), 1000);
  }

  const Rename1 = (address) => {
    let result = localStorage.getItem('wallets');
    result = JSON.parse(result);
    localStorage.setItem('wallets', JSON.stringify(result));
  };

  const [copySuccess, setCopySuccess] = useState('');

  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus();
    setCopySuccess('Copied!');
  }

  const updateSelectedAccount = (address, name) => {
    localStorage.setItem('selected-account', address);
    if (name == null) {
      localStorage.setItem('selected-account', address);
    } else {
      localStorage.setItem('selected-account', address);
      localStorage.setItem('selected-name', name);
    }
  };

  const routeToDashboard = () => {
    const address = localStorage.getItem('selected-account');
    navigate(`/${address}/dashboard`, { replace: true });
  };

  return (
    <>
      <WalletsListLayout ref={anchorRef} isMetamaskWallet={isMetamaskWallet}>
        {isMetamaskWallet ? (
          <Avatar
            src={userMockAvatar}
            alt="photoURL"
            isMetamaskWallet={isMetamaskWallet}
            isMobileWalletsList={isMobileWalletsList}
            endTabletSize={endTabletSize}
            style={{
              width: endTabletSize ? '46px' : '21px',
              height: endTabletSize ? '46px' : '21px',
              marginTop: endTabletSize && '-5px',
              marginLeft: endTabletSize && '-10px',
            }}
          />
        ) : (
          <WalletListItemAccountLogo src={accountLogo} alt="photoURL" />
        )}

        {/* mobile metamask wallet list content*/}
        <WalletListItemContent
          endTabletSize={endTabletSize}
          isMetamaskWallet={isMetamaskWallet}
          isMobileWalletsList={isMobileWalletsList}
          onClick={() => {
            hideAccountPopover();
            updateSelectedAccount(address);
            routeToDashboard();
          }}
          direction="row">
          <WalletListItemAccountBalance
            variant="WaltchList_font_address"
            isLightTheme={isLightTheme}
            isMetamaskWallet={isMetamaskWallet}
            isMobileWalletsList={isMobileWalletsList}
            style={{
              marginLeft: endTabletSize && isMetamaskWallet && '20px',
              marginTop: endTabletSize && isMetamaskWallet && '-40px',
            }}>
            <span>{walletAddressCutter(address, name)}</span>
            {selectedAccountAddress === address && (
              <WalletListItemGreenDot src={green_got_menu} alt="no pic" />
            )}
          </WalletListItemAccountBalance>
        </WalletListItemContent>

        <DotIconBlock
          onClick={showAccountPopover}
          style={{ marginTop: endTabletSize && isMetamaskWallet && '-21px' }}>
          <img src={dots_menu_icon} alt="no pic" />
        </DotIconBlock>
        {/* Current Account balance value*/}
        <WalletListItemAccountBalance
          isMetamaskWallet={false}
          isMobileWalletsList={false}
          onClick={() => {
            hideAccountPopover();
            updateSelectedAccount(address, name);
            routeToDashboard();
          }}
          style={{ marginTop: endTabletSize && isMetamaskWallet && '-2px' }}>
          {!isMetamaskWallet ? (
            <AccountBalance address={address} isLightTheme={isLightTheme} />
          ) : (
            <MetamaskLabel
              isMobileWalletsList={isMobileWalletsList}
              isMetamaskWallet={isMetamaskWallet}
              style={{
                marginLeft: endTabletSize && isMetamaskWallet && '48px',
                marginTop: endTabletSize && isMetamaskWallet && '-10px',
              }}>
              Metamask
            </MetamaskLabel>
          )}
        </WalletListItemAccountBalance>
      </WalletsListLayout>
      {/* popover menu with options for wallet*/}
      <Popover
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        className={classes.menupopover}
        PaperProps={{
          sx: {
            width: '336px',
            overflow: 'inherit',
            boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            background: isLightTheme ? '#FFFFFF29' : '#1F265C3D',
            mixBlendMode: 'normal',
            backdropFilter: 'blur(35px)',
          },
        }}
        sx={{
          width: '336px',
        }}
        open={account}
        onClose={hideAccountPopover}
        anchorEl={anchorRef.current}>
        {flag === true ? (
          <Box className={classes.copy_notification}>
            <img
              className={classes.copy_notification_menu}
              width="40px"
              height="40px"
              style={{ margin: 'auto' }}
              src={copy_notification_menu}
              alt="no pic"
            />
          </Box>
        ) : (
          <WalletActionsLayout sx={{ width: '306px' }} isLightTheme={isLightTheme}>
            <WalletActionsList isLightTheme={isLightTheme} disablePadding>
              <WalletActionsListItem
                isLightTheme={isLightTheme}
                onClick={() => {
                  setOpenPopup_rename(true);
                  hideAccountPopover();
                }}>
                <div className={classes.icon}>
                  <img src={rename_menu_icon} alt="no pic" />
                </div>
                <WalletActionsListItemLabel
                  isLightTheme={isLightTheme}
                  onClick={() => {
                    Rename1(address);
                  }}>
                  Rename Wallet
                </WalletActionsListItemLabel>
              </WalletActionsListItem>
              <WalletActionsListItem
                isLightTheme={isLightTheme}
                onClick={() => {
                  navigator.clipboard.writeText(address);
                  copy_notification();
                  close_copy_notification();
                }}>
                <div className={classes.icon}>
                  <img src={copy_menu_icon} alt="no pic" />
                </div>
                <WalletActionsListItemLabel isLightTheme={isLightTheme}>
                  Copy Address
                </WalletActionsListItemLabel>
              </WalletActionsListItem>
              <WalletActionsListItem
                isLightTheme={isLightTheme}
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  copy_notification();
                  close_copy_notification();
                }}>
                <div className={classes.icon}>
                  <img src={copy_link_menu_icon} alt="no pic" />
                </div>
                <WalletActionsListItemLabel isLightTheme={isLightTheme}>
                  Copy Link
                </WalletActionsListItemLabel>
              </WalletActionsListItem>
              <DisconnectWalletActionsListItem
                isLightTheme={isLightTheme}
                onClick={() => {
                  change_flag();
                  setOpenPopup(true);
                  setaccount(true);
                  setaccount_menuclose(true);
                  hideAccountPopover();
                }}>
                <div className={classes.icon} style={{ marginLeft: '34px', marginTop: '20px' }}>
                  <img src={disconnect_menu_icon} alt="no pic" />
                </div>
                <WalletActionsListItemLabel
                  isLightTheme={isLightTheme}
                  onClick={() => {
                    // onReRender();
                    setIsModalHelperVisible(true);
                    // console.log('clicked');
                  }}
                  isDisconnectLabel={true}>
                  Disconnect
                </WalletActionsListItemLabel>
              </DisconnectWalletActionsListItem>
            </WalletActionsList>
          </WalletActionsLayout>
        )}
      </Popover>
      <ThemeConfig>
        {/*{isModalHelperVisible === true && (*/}
        <Popup
          title="Disconnect"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          isLightTheme={isLightTheme}>
          <OutsideClickHandler
            onOutsideClick={() => {
              setIsModalHelperVisible(false);
            }}>
            <DisconnectPopup
              setOpenPopup={(w) => setOpenPopup(w)}
              address={address}
              name={name}
              isLightTheme={isLightTheme}
            />
          </OutsideClickHandler>
        </Popup>
        {/*)}*/}

        <Popup
          title="Rename Wallet"
          openPopup={openPopup_rename}
          setOpenPopup={setOpenPopup_rename}
          isLightTheme={isLightTheme}>
          <RenamePopup
            setOpenPopup={(w) => setOpenPopup_rename(w)}
            address={address}
            name={name}
            isLightTheme={isLightTheme}
          />
        </Popup>
      </ThemeConfig>
    </>
  );
}
