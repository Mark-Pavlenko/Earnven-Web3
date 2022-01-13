// import { experimentalStyled as styled } from '@material-ui/core/styles';
import styled from 'styled-components';
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
  WalletsListItem,
  AddNewWalletListItem,
  AddWalletIcon,
} from './styles';

export default function Account({ address, name, global_wallet, setTheme }) {
  const dispatch = useDispatch();
  const themeType = useSelector((state) => state.themeReducer.isLightTheme);
  const selectedAccount = localStorage.getItem('selected-account');
  const currentWallet = JSON.parse(localStorage.getItem('mywallet'));

  // console.log('selectedAccount', selectedAccount);

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
    console.log('jsondata', jsondata);

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

  return (
    <>
      {address ? (
        <div>
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
              {/* account balance*/}
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
              <p isLightTheme={themeType}>{accountList.length > 0 && 'My Wallet'}</p>
            </MyWalletsLabel>
            <WalletsList>
              {accountList && (
                <WalletsListItem isLightTheme={themeType}>
                  <Accounts
                    setaccount_menuclose={(w) => setaccount(w)}
                    onClick={() => {
                      hideAccountPopover();
                    }}
                    onReRender={handleReRender}
                    address={JSON.parse(global_wallet)[0].address}
                    name={JSON.parse(global_wallet)[0].name}
                    globalWalletsList={JSON.stringify(JSON.parse(global_wallet)[0])}
                    currentWalletAddress={currentWallet[0].address}
                    isMetamaskWallet={true}
                  />
                </WalletsListItem>
              )}
            </WalletsList>

            {/* all wallets */}
            <MyWalletsLabel isLightTheme={themeType}>
              <p isLightTheme={themeType}>{accountList.length > 0 && 'Watchlist'}</p>
            </MyWalletsLabel>
            <div>
              <WalletsList>
                {accountList &&
                  accountList.map((option) => (
                    <WalletsListItem isLightTheme={themeType}>
                      <Accounts
                        setaccount_menuclose={(w) => setaccount(w)}
                        onClick={() => {
                          hideAccountPopover();
                        }}
                        onReRender={handleReRender}
                        address={option.address}
                        name={option.name}
                        globalWalletsList={global_wallet}
                        currentWalletAddress={currentWallet[0].address}
                        isMetamaskWallet={false}
                      />
                    </WalletsListItem>
                  ))}
                <AddNewWalletListItem isLightTheme={themeType} onClick={routeToConnectWallet}>
                  <ListItemIcon sx={{ mr: 1, minWidth: '17px' }}>
                    <AddWalletIcon isLightTheme={themeType} />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'watchlist_font_balance',
                    }}
                    sx={{ opacity: 0.5, marginTop: '2px' }}>
                    New Wallet
                  </ListItemText>
                </AddNewWalletListItem>
              </WalletsList>
              {/* add new item element */}
            </div>
          </WalletListPopover>
        </div>
      ) : (
        <EnterAccountBlock isLightTheme={themeType}>
          <p>Connect an Ethereum wallet to manage your portfolio</p>
        </EnterAccountBlock>
      )}
    </>
  );
}
