import { experimentalStyled as styled } from '@material-ui/core/styles';
import accountLogo from '../../../../assets/icons/accountlogo.png';
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
import AccountBalance from '../../../../components/AccountBalance';
import MenuPopover from '../../../../components/MenuPopover';
import { makeStyles } from '@material-ui/styles';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@material-ui/core/styles';
import { fontSize, fontStyle, fontWeight } from '@material-ui/system';
import Accounts from './Accounts';
import Acc from './Acc';
import theme1 from '../../../../../src/theme/palette';

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 2.5),
  borderRadius: '10px',
  paddingBottom: 0,
  cursor: 'pointer',
  width: '186px',
  height: '74px',
  backgroundColor: theme.palette.menu.backgorundColor_wallet_secondary,
  fontWeight: 500,
  marginLeft: '26px',
  marginTop: '12px',
  boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 2px 2px rgba(0,0,0,0.16)',
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
        color: 'green',
        height: '39px',
        fontWeight: '900',
      },
    },
  })
);

export default function Account({ address, name }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const [account, setaccount] = useState(false);
  const [accountList, setaccountList] = useState([]);
  const [mywallet, setmywallet] = useState([]);
  var mywallet_text = 'My Wallet';
  const [arrowicon, setarrowicon] = useState(false);

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
  }, [account]);

  const showAccountPopover = () => {
    setaccount(true);
    setarrowicon(true);
  };
  const hideAccountPopover = () => {
    setaccount(false);
    setarrowicon(false);
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
    if (name == 'null') {
      return address.substring(0, 5) + '...';
    } else {
      return name.substring(0, 6) + '...';
    }
  }

  function shortaddress(addy, name) {
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

    // if (addy !== '' && name == 'null') {
    //   const l = addy.length;
    //   const addynew = `${addy[0] + addy[1] + addy[2] + addy[3] + addy[4] + addy[5]}...${
    //     addy[l - 4]
    //   }${addy[l - 3]}${addy[l - 2]}${addy[l - 1]}`;

    //   const shortAddress = `${addy[0] + addy[1] + addy[2] + addy[3] + addy[4] + addy[5]}...`;
    //   return shortAddress;
    // } else {
    //   let rename = '';
    //   let wallets = localStorage.getItem('wallets');
    //   wallets = JSON.parse(result);
    //   wallets.map((option) => {
    //     if (option.address == address && option.name != 'null') {
    //       rename = option.name;
    //     }
    //   });
    // }
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
        <Avatar className={classes.accountlLogo} src={accountLogo} alt="photoURL" />
        <Box sx={{ ml: 2 }}>
          <Stack direction="row">
            <Typography
              variant="primaryFont"
              sx={{
                color: (theme) => theme.palette.menu.myWallet_font_light,
              }}
              className={classes.accountAddress}>
              {test1(address, name)}
            </Typography>
            {arrowicon == true ? (
              <ExpandLessIcon sx={{ ml: 4, mt: -2.1, color: '#4453AD' }} />
            ) : (
              <ExpandMoreIcon sx={{ ml: 4, mt: -2.1, color: '#4453AD' }} />
            )}
          </Stack>
          <Typography className={classes.accountBalance}>
            <AccountBalance address={address} />
          </Typography>
        </Box>
      </AccountStyle>
      <MenuPopover
        sx={{ ml: 9, mt: '0.2rem', width: '336px' }}
        open={account}
        onClose={hideAccountPopover}
        anchorEl={anchorRef.current}>
        <Box className={classes.myWallet}>
          <Typography variant="myWallet_font">
            <p>{mywallet.length > 0 && mywallet_text}</p>
          </Typography>
        </Box>
        <Box sx={{ py: 1 }}>
          {mywallet &&
            mywallet.map((option) => (
              <ListItem className={classes.hoverMenu}>
                {/* <ListItemText
                onClick={() => {
                  hideAccountPopover();
                  updateSelectedAccount(option.address);
                  routeToDashboard();
                }}
                primaryTypographyProps={{ variant: 'body2', color: 'green' }}
                sx={{ px: 0.5, cursor: 'pointer' }}>
                {shortaddress1(option.address)}
              </ListItemText> */}
                <Box>
                  <Acc address={option.address} provider={option.provider} name={option.name} />
                </Box>
              </ListItem>
            ))}
        </Box>
        <Box className={classes.myWallet}>
          <Typography variant="myWallet_font">
            <p>{accountList.length > 0 && 'Watchlist'}</p>
          </Typography>
        </Box>
        <Box sx={{ py: 1 }}>
          {accountList &&
            accountList.map((option) => (
              <ListItem className={classes.hoverMenu}>
                {/* <ListItemText
                onClick={() => {
                  hideAccountPopover();
                  updateSelectedAccount(option.address);
                  routeToDashboard();
                }}
                primaryTypographyProps={{ variant: 'body2', color: 'green' }}
                sx={{ px: 0.5, cursor: 'pointer' }}>
                {shortaddress1(option.address)}
              </ListItemText> */}
                <Box>
                  <Accounts address={option.address} name={option.name} />
                </Box>
              </ListItem>
            ))}

          <Divider variant="middle" />
          <MenuItem
            onClick={routeToConnectWallet}
            sx={{
              py: 1,
              px: 1,
              mx: 2,
              my: 1,
              borderRadius: '8px',
            }}
            className={classes.hoverMenu11}>
            <ListItemIcon sx={{ mr: 1, minWidth: '17px' }}>
              <VscAdd style={{ color: 'black' }} />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ variant: 'body2', color: '#202020' }}>
              {' '}
              New Wallet
            </ListItemText>
          </MenuItem>
          {/* <MenuItem
            onClick={hideAccountPopover}
            sx={{
              py: 1,
              px: 1,
              mx: 2,
              borderRadius: '8px',
              background: (theme) => theme.palette.gradients.custom,
            }}>
            <ListItemIcon sx={{ mr: 1, minWidth: '17px' }}>
              <RiSettings5Line style={{ color: 'fff' }} />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ variant: 'body2', color: '#fff' }}>
              Manage account
            </ListItemText>
          </MenuItem> */}
        </Box>
      </MenuPopover>
    </>
  );
}
