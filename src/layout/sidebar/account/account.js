// import { experimentalStyled as styled } from '@material-ui/core/styles';
import styled from 'styled-components';
import accountLogo from '../../../assets/icons/accountlogo.png';
import arrowIcon from './ArrowRotate.svg';
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
import './styles';
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
import menurender_customhook from './menurender_customhook';

import { useSelector, useDispatch } from 'react-redux';

// box-shadow: ${(props) =>
//props.isLightTheme ? 'null' : '4px 6px 20px -5px rgba(51, 78, 131, 0.17)'};

const useStyles = makeStyles(() =>
  createStyles({
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

import {
  AccountLayout,
  AccountStyle,
  EnterAccountBlock,
  WalletsListBlock,
  FirstWalletsListBlock,
  UserAvatar,
  WalletAddress,
  WalletArrow,
} from './styles';

export default function Account({ address, name, global_wallet, setTheme }) {
  const dispatch = useDispatch();
  const themeType = useSelector((state) => state.themeReducer.isLightTheme);
  const selectedAccount = localStorage.getItem('selected-account');
  console.log('selectedAccount', selectedAccount);

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

  useEffect(() => {
    const result = localStorage.getItem('wallets');
    var jsonData = [];
    var jsondata = JSON.parse(result);
    if (flag_menu === true) {
      setaccount(false);
    }
    jsondata &&
      jsondata.map((option) => {
        if (
          option.provider !== 'metamask' &&
          option.provider !== 'walletconnect' &&
          option.provider !== 'portis' &&
          option.provider !== 'coinbase' &&
          option.provider !== 'fortmatic' &&
          option.provider !== 'torus'
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

  function walletAddressCutter(address, name) {
    if (name === 'null' && selectedAccount !== null) {
      return address.substring(0, 7) + '..';
    } else {
      return name.substring(0, 8) + '..';
    }
  }

  return (
    <>
      {address ? (
        <>
          <AccountStyle ref={anchorRef} onClick={showAccountPopover} isLightTheme={themeType}>
            <WalletsListBlock isLightTheme={themeType}>
              <FirstWalletsListBlock>
                <UserAvatar src={accountLogo} alt="photoURL" />
                <WalletAddress isLightTheme={themeType}>
                  {walletAddressCutter(address, name)}
                </WalletAddress>
                <WalletArrow>
                  {arrowicon === true ? (
                    <ExpandLessIcon style={{ fontSize: 25, color: '#4453AD' }} />
                  ) : (
                    <ExpandMoreIcon style={{ fontSize: 25, color: '#4453AD' }} />
                  )}
                </WalletArrow>
              </FirstWalletsListBlock>
              <AccountBalance address={address} />
            </WalletsListBlock>
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
                  <VscAdd style={{ color: (theme) => 'blue', opacity: 0.5 }} />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    variant: 'watchlist_font_balance',
                    color: (theme) => 'bluw',
                  }}
                  sx={{ opacity: 0.5 }}>
                  New Wallet
                </ListItemText>
              </MenuItem>
            </Box>
          </MenuPopover>
        </>
      ) : (
        <EnterAccountBlock isLightTheme={themeType}>
          <p>Connect an Ethereum wallet to manage your portfolio</p>
        </EnterAccountBlock>
      )}
    </>
  );
}
