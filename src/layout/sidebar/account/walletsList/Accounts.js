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
import { Avatar, Box, List, Stack, Typography } from '@material-ui/core';
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
import { Disconnection } from '../Disconnection';
import Rename from '../Rename';
import Popup from '../popup';
import green_got_menu from '../../../../assets/icons/green_got_menu.svg';
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
} from '../styles';

const useStyles = makeStyles(() =>
  createStyles({
    menupopover: {
      marginLeft: '132px',
      marginTop: '-25px',
      width: '338px',
      ['@media (max-width:1280px)']: {
        marginLeft: '-3px',
      },
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

  const selectedAccountAddress = localStorage.getItem('selected-account');
  // console.log('selectedAccountAddress', selectedAccountAddress);
  // console.log('current Metamask wallet address', currentWalletAddress);
  // console.log('globalWalletsList', JSON.parse(globalWalletsList));

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
          <WalletListItemAccountLogo
            src={userMockAvatar}
            alt="photoURL"
            isMetamaskWallet={isMetamaskWallet}
            isMobileWalletsList={isMobileWalletsList}
          />
        ) : (
          <WalletListItemAccountLogo src={accountLogo} alt="photoURL" />
        )}

        {/* mobile metamask wallet list content*/}
        <WalletListItemContent
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
            isMobileWalletsList={isMobileWalletsList}>
            <span>{walletAddressCutter(address, name)}</span>
            {selectedAccountAddress === address && (
              <WalletListItemGreenDot src={green_got_menu} alt="no pic" />
            )}
          </WalletListItemAccountBalance>
        </WalletListItemContent>

        <DotIconBlock onClick={showAccountPopover}>
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
          }}>
          {!isMetamaskWallet ? (
            <AccountBalance address={address} isLightTheme={isLightTheme} />
          ) : (
            <MetamaskLabel
              isMobileWalletsList={isMobileWalletsList}
              isMetamaskWallet={isMetamaskWallet}>
              Metamask
            </MetamaskLabel>
          )}
        </WalletListItemAccountBalance>
      </WalletsListLayout>
      {/* popover menu with options for wallet*/}
      <MenuPopover
        className={classes.menupopover}
        sx={{
          backgroundColor: isLightTheme ? '#FFFFFF29' : '#1F265C3D',
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
                  onClick={onReRender}
                  style={{}}
                  isDisconnectLabel={true}>
                  Disconnect
                </WalletActionsListItemLabel>
              </DisconnectWalletActionsListItem>
            </WalletActionsList>
          </WalletActionsLayout>
        )}
      </MenuPopover>
      <ThemeConfig>
        <Popup title="Disconnect" openPopup={openPopup} setOpenPopup={setOpenPopup}>
          <Disconnection setOpenPopup={(w) => setOpenPopup(w)} address={address} name={name} />
        </Popup>
        <Popup
          title="Rename Wallet"
          openPopup={openPopup_rename}
          setOpenPopup={setOpenPopup_rename}>
          <Rename setOpenPopup={(w) => setOpenPopup_rename(w)} address={address} name={name} />
        </Popup>
      </ThemeConfig>
    </>
  );
}
