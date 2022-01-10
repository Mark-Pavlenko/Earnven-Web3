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
  List_Menu_Pop_UP,
} from './styles';

const useStyles = makeStyles(() =>
  createStyles({
    accountBalance: {},
    accountAddress: {
      marginLeft: '0.02rem',
      marginTop: '-1.21rem',
    },
    myWallet: {
      marginLeft: '25px',
      marginTop: '25px',
    },
    list: {
      color: 'black',
      fontWeight: 400,
      fontSize: '14px',
      textDecoration: 'none',
    },
    menupopover: {
      marginLeft: '15rem',
      marginTop: '-2.2rem',
    },
    menu: {
      width: '306px',
      height: '197px',
    },
    icon: {
      marginLeft: '19px',
      marginTop: '12px',
      display: 'flex',
      width: '16px',
      height: '16px',
    },
    icon1: {
      marginLeft: '200px',
      marginTop: '-12px',
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
    menupopUp_list: {
      padding: '5px',
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
  { address, name, setaccount_menuclose, globalWalletsList, currentWalletAddress },
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
        <Box sx={{ ml: 1 }}>
          <Stack
            onClick={() => {
              hideAccountPopover();
              updateSelectedAccount(address);
              routeToDashboard();
            }}
            direction="row">
            <WalletListItemAccountBalance
              variant="WaltchList_font_address"
              isLightTheme={isLightTheme}
              className={classes.accountAddress}>
              {walletAddressCutter(address, name)}
              {selectedAccountAddress === address ? (
                <img
                  src={green_got_menu}
                  style={{
                    display: 'flex',
                    float: 'right',
                    marginTop: '2.09px',
                    marginLeft: '10px',
                  }}
                  alt="no pic"
                />
              ) : (
                ''
              )}
            </WalletListItemAccountBalance>
          </Stack>
          <div className={classes.icon1} onClick={showAccountPopover}>
            <img src={dots_menu_icon} alt="no pic" />
          </div>
          {/* Current Account balance value*/}
          <WalletListItemAccountBalance
            onClick={() => {
              hideAccountPopover();
              updateSelectedAccount(address, name);
              routeToDashboard();
            }}>
            <AccountBalance address={address} />
          </WalletListItemAccountBalance>
        </Box>
      </WalletsListLayout>
      <MenuPopover
        className={classes.menupopover}
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
          <Box className={classes.menu}>
            <List
              onClick={() => {
                setOpenPopup_rename(true);
                hideAccountPopover();
              }}
              className={classes.menupopUp_list}
              disablePadding>
              <List_Menu_Pop_UP>
                <div className={classes.icon}>
                  <img src={rename_menu_icon} alt="no pic" />
                </div>
                <div
                  onClick={() => {
                    Rename1(address);
                  }}
                  className={classes.text}>
                  Rename Wallet
                </div>
              </List_Menu_Pop_UP>
            </List>
            <List
              onClick={() => {
                navigator.clipboard.writeText(address);
                copy_notification();
                close_copy_notification();
              }}
              className={classes.menupopUp_list}
              disablePadding>
              <List_Menu_Pop_UP>
                <div className={classes.icon}>
                  <img src={copy_menu_icon} alt="no pic" />
                </div>
                <div className={classes.text}>Copy Address</div>
              </List_Menu_Pop_UP>
            </List>
            <List
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                copy_notification();
                close_copy_notification();
              }}
              className={classes.menupopUp_list}
              disablePadding>
              <List_Menu_Pop_UP>
                <div className={classes.icon}>
                  <img src={copy_link_menu_icon} alt="no pic" />
                </div>
                <div className={classes.text}>Copy Link</div>
              </List_Menu_Pop_UP>
            </List>
            <List
              onClick={() => {
                change_flag();
                setOpenPopup(true);
                setaccount(true);
                setaccount_menuclose(true);
                hideAccountPopover();
              }}
              className={classes.menupopUp_list}
              disablePadding>
              <List_Menu_Pop_UP>
                <div className={classes.icon}>
                  <img src={disconnect_menu_icon} alt="no pic" />
                </div>
                <div onClick={onReRender} className={classes.text}>
                  Disconnect
                </div>
              </List_Menu_Pop_UP>
            </List>
          </Box>
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
