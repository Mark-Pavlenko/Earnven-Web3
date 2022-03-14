// import { experimentalStyled as styled } from '@material-ui/core/styles';
import accountLogo from '../../../assets/icons/accountlogo.png';
import { createStyles } from '@material-ui/styles';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import React, { useState, useRef, useEffect } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import './styles';
import { useNavigate } from 'react-router-dom';
import AccountBalance from '../../../components/accountBalance';
import WalletListPopover from './walletsListOptionsPopover';
import { makeStyles } from '@material-ui/styles';
import Accounts from './walletsList/Accounts';
import actionTypes from '../../../constants/actionTypes';

import useMediaQuery from '@mui/material/useMediaQuery';
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
  EnterAccountSubRow,
  EnterAccountFlexItem,
  ConnectLabel,
  WelcomeSpan,
  NotMetamaskConnectedBlock,
  WalletListSubLayout,
} from './styles';
import { Button } from '@mui/material';

export default function Account({ address, name, global_wallet, setTheme }) {
  console.log('global_wallet', global_wallet);
  const dispatch = useDispatch();
  const themeType = useSelector((state) => state.themeReducer.isLightTheme);
  const selectedAccount = localStorage.getItem('selected-account');
  const currentWallet = JSON.parse(localStorage.getItem('mywallet'));
  console.log('currentWallet', currentWallet);
  // console.log('selectedAccount', selectedAccount);

  // console.log('mobileSize', mobileSize);

  const { flag_menu } = menurender_customhook();

  const classes = useStyles();

  useEffect(() => {
    if (currentWallet) {
      try {
        //   fetchData();
        try {
          dispatch({
            type: actionTypes.SET_ETH_API,
            payload: localStorage.getItem('selected-account'),
          });
        } catch (err) {
          console.log('error in dispatch account eth api', err);
        }
      } catch (error) {
        console.log('error in dispatch account eth api', error);
      }
    }
  }, [selectedAccount]);

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
    // console.log('jsondata', jsondata);

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
    localStorage.setItem('firstConnection', false);
    setaccount(false);
  };

  function walletAddressCutter(address, name) {
    // if (name === 'null' && selectedAccount !== null) {
    //   return address.substring(0, 7) + '..';
    // } else {
    //   return name.substring(0, 8) + '..';
    // }
    return '...' + address.substring(38, 42);
  }

  const mobileSize = useMediaQuery('(max-width:709px)');
  const startTabletSize = useMediaQuery('(min-width:710px)');
  const endTabletSize = useMediaQuery('(max-width:1280px)');
  const laptopSize = useMediaQuery('(min-width:1281px)');
  const bigTabletSize = useMediaQuery('(max-width:1445px)');
  const desktopSize = useMediaQuery('(min-width:1446px)');

  const reduxWalletsList = useSelector((state) => state.initSidebarValuesReducer.walletsList);
  const reduxMyWallet = useSelector((state) => state.initSidebarValuesReducer.myWallet);

  const accountListContent = (
    <>
      {/* my wallet*/}

      {accountList &&
      reduxMyWallet !== undefined &&
      reduxWalletsList !== undefined &&
      (reduxMyWallet !== null || undefined) &&
      reduxMyWallet.length !== 0 ? (
        <>
          <MyWalletsLabel isLightTheme={themeType}>
            <p>My Wallet</p>
          </MyWalletsLabel>
          <WalletsList isMetamaskWallet={true}>
            <WalletsListItem isLightTheme={themeType}>
              <Accounts
                setaccount_menuclose={(w) => setaccount(w)}
                onClick={() => {
                  hideAccountPopover();
                }}
                onReRender={handleReRender}
                address={JSON.parse(global_wallet)[0].address}
                name={JSON.parse(global_wallet)[0].name}
                currentWalletAddress={currentWallet[0].address}
                isMetamaskWallet={true}
              />
            </WalletsListItem>
          </WalletsList>
        </>
      ) : (
        <NotMetamaskConnectedBlock isLightTheme={themeType}>
          <p>Metamask wallet doesn`t connect</p>
        </NotMetamaskConnectedBlock>
      )}

      {/* all wallets */}
      <MyWalletsLabel isLightTheme={themeType} allWalletsListMobile={true}>
        <p>{accountList.length > 0 && 'Watchlist'}</p>
      </MyWalletsLabel>
      <div>
        <WalletsList>
          <WalletListSubLayout isLightTheme={themeType}>
            {reduxWalletsList !== undefined &&
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
                    isMetamaskWallet={false}
                  />
                </WalletsListItem>
              ))}
          </WalletListSubLayout>
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
    </>
  );

  return (
    <>
      {address && (
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

          {/*size till 1280px */}
          {endTabletSize && (
            <WalletListPopover
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              isLightTheme={themeType}
              open={account}
              onClose={hideAccountPopover}
              anchorEl={anchorRef.current}>
              {accountList && reduxMyWallet !== undefined ? (
                <>
                  <MyWalletsLabel isLightTheme={themeType}>
                    <p>My Wallet</p>
                  </MyWalletsLabel>
                  <WalletsList isMetamaskWallet={true}>
                    <WalletsListItem isLightTheme={themeType}>
                      <Accounts
                        setaccount_menuclose={(w) => setaccount(w)}
                        onClick={() => {
                          hideAccountPopover();
                        }}
                        onReRender={handleReRender}
                        address={JSON.parse(global_wallet)[0].address}
                        name={JSON.parse(global_wallet)[0].name}
                        currentWalletAddress={currentWallet[0].address}
                        isMetamaskWallet={true}
                        endTabletSize={true}
                      />
                    </WalletsListItem>
                  </WalletsList>
                </>
              ) : (
                <NotMetamaskConnectedBlock isLightTheme={themeType}>
                  <p>Metamask wallet doesn`t connect</p>
                </NotMetamaskConnectedBlock>
              )}
              {/* all wallets */}
              <MyWalletsLabel isLightTheme={themeType} allWalletsListMobile={true}>
                <p>{accountList.length > 0 && 'Watchlist'}</p>
              </MyWalletsLabel>
              <WalletListSubLayout isLightTheme={themeType}>
                <WalletsList>
                  {accountList &&
                    reduxWalletsList !== undefined &&
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
              </WalletListSubLayout>
            </WalletListPopover>
          )}

          {/* size from 1281 till 1445px */}
          {laptopSize && bigTabletSize && (
            <WalletListPopover
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              isLightTheme={themeType}
              open={account}
              onClose={hideAccountPopover}
              anchorEl={anchorRef.current}>
              {accountListContent}
            </WalletListPopover>
          )}

          {/*size form 1446px*/}
          {desktopSize && (
            <WalletListPopover
              sx={{ ml: -2.2, mt: '3px' }}
              isLightTheme={themeType}
              open={account}
              onClose={hideAccountPopover}
              anchorEl={anchorRef.current}>
              {accountListContent}
            </WalletListPopover>
          )}
        </div>
      )}
    </>
  );
}
