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
import { createStyles } from '@material-ui/styles';
import { Collapse, List } from '@material-ui/core';
import {
  Box,
  Typography,
  Avatar,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Divider,
  ListItem,
  IconButton,
} from '@material-ui/core';
import React, { useState, useRef, useEffect } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { RiSettings5Line } from 'react-icons/ri';
import { VscAdd } from 'react-icons/vsc';
import './account.css';
import { useNavigate } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdContentCopy } from 'react-icons/md';
import AccountBalance from '../../../components/accountBalance/AccountBalance_Menu';
import MenuPopover from '../../../components/MenuPopover';
import { makeStyles } from '@material-ui/styles';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@material-ui/core/styles';
import { fontSize, fontStyle, fontWeight } from '@material-ui/system';
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

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  // borderRadius: theme.shape.borderRadiusSm,
  paddingBottom: 0,
  cursor: 'pointer',
  // background: 'rgba(255, 255, 255, 0.16)',
  // mixBlendMode: 'normal',
  // boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
  // backdropFilter: 'blur(35px)',
}));

const List_Menu_Pop_UP = styled('div')(({ theme }) => ({
  width: '276px',
  height: '40px',
  display: 'flex',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    color: 'orange',
    fontWeight: 600,
  },
  marginLeft: '12px',
  borderRadius: '10px',
  cursor: 'pointer',
}));

const useStyles = makeStyles(() =>
  createStyles({
    accountlLogo: {
      width: '1.3125rem',
      height: '1.3125rem',
      marginTop: '-3rem',
      marginRight: '-0.063rem',
    },
    accountBalance: {
      marginLeft: '-26.4px',
      textAlign: 'left',
      marginTop: '-3px',
    },
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

const CustomStyle = styled('a')(({ theme }) => ({
  color: 'black',
  fontWeight: 400,
  fontSize: '14px',
  textDecoration: 'none',
  '&:hover': {
    color: '#4453AD',
  },
}));

export default function Accounts({ address, name, setaccount_menuclose, global_wallet }, props) {
  const { onReRender } = props;
  const { flag_menu, change_flag } = menurender_customhook();
  const classes = useStyles();
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const [account, setaccount] = useState(false);
  const [accountList, setaccountList] = useState([]);
  const [flag, setflag] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup_rename, setOpenPopup_rename] = useState(false);

  useEffect(() => {
    const result = localStorage.getItem('wallets');
    setaccountList(JSON.parse(result));
  }, [account, name, address, global_wallet]);

  const showAccountPopover = () => {
    setaccount(true);
  };
  const hideAccountPopover = () => {
    setaccount(false);
  };

  const routeToConnectWallet = () => {
    navigate('/app/connect-wallet');
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
      let shortAddress =
        name.length >= 4 ? `${name[0] + name[1] + name[2] + name[3] + name[4] + name[5]}...` : name;
      localStorage.setItem('selected-name', name);
    }
  };

  const routeToDashboard = () => {
    const address = localStorage.getItem('selected-account');
    navigate(`/${address}/dashboard/`, { replace: true });
  };

  function shortaddress(addy, name) {
    if (addy === '') {
      return addy;
    }
    if (addy) {
      if (name == 'null') {
        const l = addy.length;
        const addynew = `${
          addy[0] + addy[1] + addy[2] + addy[3] + addy[4] + addy[5] + addy[6] + addy[7] + addy[8]
        }...${addy[l - 7]}${addy[l - 6]}${addy[l - 5]}${addy[l - 4]}${addy[l - 3]}${addy[l - 2]}${
          addy[l - 1]
        }`;

        const shortAddress = `${
          addy[0] + addy[1] + addy[2] + addy[3] + addy[4] + addy[5] + addy[6] + addy[7] + addy[8]
        }...`;
        return addynew;
      } else {
        return name;
      }
    }
  }

  function MenuClose() {
    change_flag();
  }

  function shortaddress1(addy) {
    if (addy === '') {
      return addy;
    }
    const l = addy.length;
    const addynew = `${
      addy[0] + addy[1] + addy[2] + addy[3] + addy[4] + addy[5] + addy[6] + addy[7] + addy[8]
    }...${addy[l - 8]}${addy[l - 7]}${addy[l - 6]}${addy[l - 5]}${addy[l - 4]}${addy[l - 3]}${
      addy[l - 2]
    }${addy[l - 1]}`;
    return addynew;
  }

  return (
    <>
      <AccountStyle ref={anchorRef}>
        <Avatar className={classes.accountlLogo} src={accountLogo} alt="photoURL" />
        <Box sx={{ ml: 1 }}>
          <Stack
            onClick={() => {
              hideAccountPopover();
              updateSelectedAccount(address);
              routeToDashboard();
            }}
            direction="row">
            <Typography
              variant="WaltchList_font_address"
              sx={{
                color: (theme) => 'orange',
              }}
              className={classes.accountAddress}>
              {shortaddress(address, name)}{' '}
              {localStorage.getItem('selected-account') == address ? (
                <img
                  style={{
                    display: 'flex',
                    float: 'right',
                    marginTop: '2.09px',
                    marginLeft: '10px',
                  }}
                  src={green_got_menu}
                  alt="no pic"
                />
              ) : (
                ''
              )}
            </Typography>
          </Stack>
          <div className={classes.icon1} onClick={showAccountPopover}>
            <img src={dots_menu_icon} alt="no pic" />
          </div>
          <Typography
            onClick={() => {
              hideAccountPopover();
              updateSelectedAccount(address, name);
              routeToDashboard();
            }}
            className={classes.accountBalance}>
            <AccountBalance address={address} />
          </Typography>
        </Box>
      </AccountStyle>
      <MenuPopover
        className={classes.menupopover}
        open={account}
        onClose={hideAccountPopover}
        anchorEl={anchorRef.current}>
        {flag == true ? (
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
                MenuClose();
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

// secondaryAction={
//   <IconButton edge="end" aria-label="copy">
//     <CopyToClipboard text={option.address}>
//       <MdContentCopy style={{ color: 'green', px: '1px' }} />
//     </CopyToClipboard>
//   </IconButton>
// }