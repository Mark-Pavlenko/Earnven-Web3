import { experimentalStyled as styled } from '@material-ui/core/styles';
import accountLogo from '../../../assets/icons/accountlogo.png';
import { createStyles } from '@material-ui/styles';
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
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { RiSettings5Line } from 'react-icons/ri';
import { VscAdd } from 'react-icons/vsc';
import './account.css';
import { useNavigate } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdContentCopy } from 'react-icons/md';
import AccountBalance from '../../../components/accountBalance';
import MenuPopover from '../../../components/MenuPopover';
import { makeStyles } from '@material-ui/styles';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@material-ui/core/styles';
import { fontSize, fontStyle, fontWeight } from '@material-ui/system';
import Accounts from './Accounts';
import Acc from './Acc';
import theme1 from '../../../theme/palette';
import menurender_customhook from './menurender_customhook';

import { useSelector } from 'react-redux';

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 2.5),
  borderRadius: '10px',
  paddingBottom: 0,
  cursor: 'pointer',
  width: '186px',
  height: '74px',
  backgroundColor:
    localStorage.getItem('selectedTheme') == 'Day'
      ? localStorage.getItem('PopUp_Menu') == true
        ? 'green'
        : theme.palette.menu.backgorundColor_wallet_secondary
      : '#141838',
  fontWeight: 500,
  marginLeft: '26px',
  marginTop: '20px',
  boxShadow: '4px 6px 20px -5px rgba(51, 78, 131, 0.17)',
}));

const useStyles = makeStyles(() =>
  createStyles({
    accountlLogo: {
      width: '1.675rem',
      height: '1.675rem',
      marginTop: '-3.125rem',
      marginRight: '-0.063rem',
    },
    accountBalance: {
      marginLeft: '-3rem',
      textAlign: 'center',
    },
    accountAddress: {
      marginLeft: '0.02rem',
      marginTop: '-18px',
      fontSize: '14px',
    },
    myWallet: {
      marginLeft: '1.5625rem',
      marginTop: '0.3rem',
    },
    watchlist: {
      marginLeft: '1.5625rem',
      marginTop: '0.3rem',
      color: '#1E1E20',
      opacity: 0.5,
    },
    hoverMenu: {
      '&:hover': {
        background: 'white',
        color: 'black',
        height: '56px',
      },
    },
    hoverMenu11: {
      '&:hover': {
        background: 'white',
        color: 'blue',
        height: '46px',
        fontWeight: '900',
      },
    },
  })
);

export default function Account({ address, name, global_wallet, setTheme }) {
  const { flag_menu } = menurender_customhook();

  const classes = useStyles();
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const [account, setaccount] = useState(false);
  const [accountList, setaccountList] = useState([]);
  const [mywallet, setmywallet] = useState([]);
  var mywallet_text = 'My Wallet';
  const [arrowicon, setarrowicon] = useState(false);
  const [reRender, setReRender] = useState(false);

  function setdropDown() {
    setarrowicon(true);
  }

  function dropdown() {
    setarrowicon(false);
  }

  useEffect(() => {
    const result = localStorage.getItem('wallets');
    var jsonData = [];
    var jsondata = JSON.parse(result);
    if (flag_menu == true) {
      setaccount(false);
    }
    jsondata &&
      jsondata.map((option) => {
        if (
          option.provider != 'metamask' &&
          option.provider != 'walletconnect' &&
          option.provider != 'portis' &&
          option.provider != 'coinbase' &&
          option.provider != 'fortmatic' &&
          option.provider != 'torus'
        ) {
          jsonData.push({ address: option.address, provider: option.provider, name: option.name });
        }
      });
    setaccountList(jsonData);
    const myWallet = localStorage.getItem('mywallet');
    setmywallet(JSON.parse(myWallet));
    // setmywallet(myWallet);
  }, [account, flag_menu, name, global_wallet]);

  const showAccountPopover = () => {
    setaccount(true);
    setarrowicon(true);
    localStorage.setItem('PopUp_Menu', false);
  };

  const handleReRender = () => {
    setReRender(!reRender); // state change will re-render parent
  };

  const hideAccountPopover = () => {
    setaccount(false);
    setarrowicon(false);
    localStorage.setItem('PopUp_Menu', true);
  };

  const routeToConnectWallet = () => {
    navigate('/app/connect-wallet');
    setaccount(false);
  };

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
    navigate(`/${address}/dashboard/`, { replace: true });
  };

  function test1(address, name) {
    if (name === 'null') {
      return address.substring(0, 5) + '...';
    }
    // else {
    //   return name.substring(0, 6) + '...';
    // }
  }

  function shortAddress(addy, name) {
    if (addy === '') {
      return addy;
    } else {
      let rename = '';
      let wallets = localStorage.getItem('wallets');
      wallets = JSON.parse(wallets);
      wallets &&
        wallets.map((option) => {
          if (option.address == address && option.name != 'null') {
            let shortAddress1 =
              option.name.length >= 4
                ? `${
                    option.name[0] +
                    option.name[1] +
                    option.name[2] +
                    option.name[3] +
                    option.name[4] +
                    option.name[5]
                  }...`
                : option.name;
            rename = shortAddress1;
            rename == 'undefiend' ? localStorage.setItem('selected-name', rename) : '';
            // rename = option.name;
          } else {
            // rename = addy;
            let shortAddress =
              addy.length >= 4
                ? `${addy[0] + addy[1] + addy[2] + addy[3] + addy[4] + addy[5]}...`
                : addy;
            rename = shortAddress;
            // rename = shortAddress;
          }
        });
      return localStorage.getItem('selected-name') == 'null'
        ? rename
        : localStorage.getItem('selected-name');
    }
  }

  function shortaddress1(addy) {
    if (addy === '') {
      return addy;
    }
    let mywallet = localStorage.getItem('mywallet');
    mywallet = JSON.parse(mywallet);
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
      <AccountStyle ref={anchorRef} onClick={showAccountPopover}>
        {address ? (
          <>
            {' '}
            <Avatar className={classes.accountlLogo} src={accountLogo} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Stack direction="row">
                <Typography
                  variant="primaryFont"
                  sx={{
                    color: (theme) =>
                      setTheme ? theme.palette.menu.myWallet_font_light : '#141838',
                  }}
                  className={classes.accountAddress}>
                  {test1(address, name)}
                </Typography>
                {arrowicon === true ? (
                  <ExpandLessIcon sx={{ ml: 4, mt: -2.1, color: '#4453AD' }} />
                ) : (
                  <ExpandMoreIcon sx={{ ml: 4, mt: -2.1, color: '#4453AD' }} />
                )}
              </Stack>
              <Typography className={classes.accountBalance}>
                <AccountBalance address={address} />
              </Typography>
            </Box>
          </>
        ) : (
          <div style={{ color: 'red' }}>Enter the account </div>
        )}
      </AccountStyle>
      <MenuPopover
        sx={{ ml: 9, mt: '0.2rem', width: '336px' }}
        open={account}
        onClose={hideAccountPopover}
        anchorEl={anchorRef.current}>
        <Box className={classes.myWallet}>
          <Typography variant="myWallet_font_watchlist">
            <p>{mywallet && mywallet.length > 0 && mywallet_text}</p>
          </Typography>
        </Box>
        <Box sx={{ py: 1 }}>
          {mywallet &&
            mywallet.map((option) => (
              <ListItem className={classes.hoverMenu}>
                <Box>
                  <Acc
                    address={option.address}
                    provider={option.provider}
                    global_wallet={global_wallet}
                    name={option.name}
                  />
                </Box>
              </ListItem>
            ))}
        </Box>
        <Box className={classes.watchlist}>
          <Typography variant="myWallet_font_watchlist">
            <p>{accountList.length > 0 && 'Watchlist'}</p>
          </Typography>
        </Box>
        <Box sx={{ py: 1, mt: 1 }}>
          {accountList &&
            accountList.map((option) => (
              <ListItem className={classes.hoverMenu}>
                <Box>
                  <Accounts
                    setaccount_menuclose={(w) => setaccount(w)}
                    onClick={() => {
                      hideAccountPopover();
                    }}
                    onReRender={handleReRender}
                    address={option.address}
                    name={option.name}
                    global_wallet={global_wallet}
                  />
                </Box>
              </ListItem>
            ))}

          <Divider variant="middle" />
          <MenuItem
            onClick={routeToConnectWallet}
            sx={{
              py: 1,
              px: 1,
              mx: 1,
              my: 1,
              ml: 2,
              height: '50px',
              borderRadius: '8px',
            }}
            className={classes.hoverMenu11}>
            <ListItemIcon sx={{ mr: 1, minWidth: '17px', opacity: 0.5 }}>
              <VscAdd style={{ color: (theme) => theme.palette.menu.account_font, opacity: 0.5 }} />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                variant: 'watchlist_font_balance',
                color: (theme) => theme.palette.menu.account_font,
              }}
              sx={{ opacity: 0.5 }}>
              New Wallet
            </ListItemText>
          </MenuItem>
        </Box>
      </MenuPopover>
    </>
  );
}
