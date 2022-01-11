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
import accountLogo from '../../../assets/icons/accountlogo.png';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Avatar, Box, List, Stack, Typography } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import './styles';
import { useNavigate } from 'react-router-dom';
import AccountBalance from '../../../components/accountBalance/AccountBalance_Menu';
import MenuPopover from './walletsListPopover';
import rename_menu_icon from '../../../assets/icons/rename_menu_icon.svg';
import copy_menu_icon from '../../../assets/icons/copy_menu_icon.svg';
import copy_link_menu_icon from '../../../assets/icons/copy_link_menu_icon.svg';
import disconnect_menu_icon from '../../../assets/icons/disconnect_menu_icon.svg';
import dots_menu_icon from '../../../assets/icons/3dots_menu_icon.svg';
import ThemeConfig from '../../../theme';
import { Disconnection } from './Disconnection';
import Rename from './Rename';
import Popup from './popup';
import green_got_menu from '../../../assets/icons/green_got_menu.svg';
import menurender_customhook from './menurender_customhook';
import copy_notification_menu from '../../../assets/icons/copy_notification_menu.svg';
import { useSelector } from 'react-redux';

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
} from './styles';

const useStyles = makeStyles(() =>
  createStyles({
    menupopover: { marginLeft: '132px', marginTop: '-25px', width: '338px' },
    icon: {
      marginLeft: '21px',
      marginTop: '12px',
      display: 'flex',
      width: '16px',
      height: '16px',
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

// const CustomStyle = styled('a')(({ theme }) => ({
//   color: 'black',
//   fontWeight: 400,
//   fontSize: '14px',
//   textDecoration: 'none',
//   '&:hover': {
//     color: '#4453AD',
//   },
// }));

export default function Accounts(
  {
    address,
    name,
    setaccount_menuclose,
    globalWalletsList,
    currentWalletAddress,
    isMetamaskWallet,
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
  console.log('selectedAccountAddress', selectedAccountAddress);
  console.log('current Metamask wallet address', currentWalletAddress);
  console.log('globalWalletsList', JSON.parse(globalWalletsList));

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
      let walletAddressCutter =
        name.length >= 4 ? `${name[0] + name[1] + name[2] + name[3] + name[4] + name[5]}...` : name;
      localStorage.setItem('selected-name', name);
    }
  };

  const routeToDashboard = () => {
    const address = localStorage.getItem('selected-account');
    navigate(`/${address}/dashboard`, { replace: true });
  };

  function walletAddressCutter(addy, name) {
    if (addy === '') {
      return addy;
    }
    if (addy) {
      if (name === 'null') {
        const l = addy.length;
        return `${
          addy[0] + addy[1] + addy[2] + addy[3] + addy[4] + addy[5] + addy[6] + addy[7] + addy[8]
        }...${addy[l - 7]}${addy[l - 6]}${addy[l - 5]}${addy[l - 4]}${addy[l - 3]}${addy[l - 2]}${
          addy[l - 1]
        }`;
      } else {
        return name;
      }
    }
  }

  return (
    <>
      <WalletsListLayout ref={anchorRef}>
        <WalletListItemAccountLogo src={accountLogo} alt="photoURL" />
        <WalletListItemContent
          onClick={() => {
            hideAccountPopover();
            updateSelectedAccount(address);
            routeToDashboard();
          }}
          direction="row">
          <WalletListItemAccountBalance
            variant="WaltchList_font_address"
            isLightTheme={isLightTheme}
            sx={{ marginLeft: '-2px', marginTop: '-1.21rem' }}>
            {walletAddressCutter(address, name)}
            {selectedAccountAddress === address && (
              <WalletListItemGreenDot src={green_got_menu} style={{}} alt="no pic" />
            )}
          </WalletListItemAccountBalance>
        </WalletListItemContent>
        <DotIconBlock onClick={showAccountPopover}>
          <img src={dots_menu_icon} alt="no pic" />
        </DotIconBlock>
        {/* Current Account balance value*/}
        <WalletListItemAccountBalance
          onClick={() => {
            hideAccountPopover();
            updateSelectedAccount(address, name);
            routeToDashboard();
          }}>
          {!isMetamaskWallet ? (
            <AccountBalance address={address} isLightTheme={isLightTheme} />
          ) : (
            <MetamaskLabel>Metamask</MetamaskLabel>
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
                  style={{ marginTop: '20px' }}>
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
