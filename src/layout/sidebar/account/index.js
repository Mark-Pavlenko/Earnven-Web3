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
  List,
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
import WalletListPopover from './walletsListPopover';
import { makeStyles } from '@material-ui/styles';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@material-ui/core/styles';
import { fontSize, fontStyle, fontWeight } from '@material-ui/system';
import Accounts from './Accounts';

import menurender_customhook from './menurender_customhook';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles(() =>
  createStyles({
    myWallet: { marginLeft: '1.5625rem', marginTop: '0.3rem' },
    watchlist: {},
    hoverMenu: {
      // '&:hover': {
      // },
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
  MyWalletsLabel,
  WalletsList,
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
  const [myWallet, setMyWallet] = useState([]);
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
    setMyWallet(JSON.parse(myWallet));
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

  // console.log('if wallet block is clicked', arrowicon);
  return (
    <>
      {address ? (
        <>
          <AccountStyle ref={anchorRef} onClick={showAccountPopover} isLightTheme={themeType}>
            <WalletsListBlock isLightTheme={themeType} isBlockActivated={arrowicon}>
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
          <WalletListPopover
            sx={{ ml: -2.2, mt: '3px' }}
            isLightTheme={themeType}
            open={account}
            onClose={hideAccountPopover}
            anchorEl={anchorRef.current}>
            {/* my wallet*/}
            <MyWalletsLabel isLightTheme={themeType}>
              <p isLightTheme={themeType}>{accountList.length > 0 && 'My wallet'}</p>
            </MyWalletsLabel>
            <p style={{ color: 'red' }}>{selectedAccount}</p>

            {/* all wallets */}
            <MyWalletsLabel isLightTheme={themeType}>
              <p isLightTheme={themeType}>{accountList.length > 0 && 'Watchlist'}</p>
            </MyWalletsLabel>
            <div>
              {accountList &&
                accountList.map((option) => (
                  <ListItem>
                    <WalletsList>
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
                    </WalletsList>
                  </ListItem>
                ))}

              {/* add new item element */}
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
            </div>
          </WalletListPopover>
        </>
      ) : (
        <EnterAccountBlock isLightTheme={themeType}>
          <p>Connect an Ethereum wallet to manage your portfolio</p>
        </EnterAccountBlock>
      )}
    </>
  );
}
