/* eslint-disable */
import Scrollbar from '../../components/Scrollbar';
import { getRecall } from '../SidebarConfig';
import NavSection from './navSection';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
// material
import Popover from '@mui/material/Popover';
import { Drawer, ListItemIcon, List, ListItem, Button } from '@material-ui/core';
import { MHidden } from '../../components/@material-extend';
import CompanyLogo from '../../assets/icons/logo_menu.svg';
import Earnven from '../../assets/icons/Earnven_menu_text.svg';
import Dark_Earnven_logo from '../../assets/icons/Dark_Earnven_logo.svg';
import Account from './account';
import Links from './social/Links';
import lightTheme from '../../assets/images/lightDashboard.jpg';
import lightThemeBig from '../../assets/images/lightDashboardBig.jpg';
import CloseMobileSidebarLight from '../../assets/images/closeMobileSidebarLight.svg';
import CloseMobileSidebarDark from '../../assets/images/closeMobileSidebarDark.svg';
import testMobileNetworkButton from '../../assets/icons/testMobileNetworkButton.svg';
import { useDispatch, useSelector } from 'react-redux';

import {
  RootStyle,
  LogoBlock,
  LogoImg,
  SidebarMainLayout,
  CloseMobileSidebarIcon,
  DrawerLayoutMobile,
  SidebarMobileIconsBlock,
  ChangeThemeBtnMobile,
  SidebarMobileIconSubBlock,
  SidebarMobileDelimiter,
  MainSidebarMobilePopoverContent,
  SidebarMobileNetworkButton,
  SidebarMobilePopoverGasPriceTitle,
  SidebarMobilePopoverLink,
  MobileSidebarNetworksList,
  MobileSidebarComingSoonLabel,
  MobileSidebarNetworksListSubBlock,
  EthereumActiveNetwork,
  DrawerLayoutDesktop,
  DrawerLayoutTablet,
  LogoTitleImg,
  MobileLogoBlockWalletsList,
  CloseTabletSidebarIcon,
  ChangeThemeBtnTablet,
  SidebarTabletNetworkButton,
  SidebarTabletHeaderBtnsLayout,
  MobileLogoTitle,
  EnterAccountBlockMobileScreens,
} from './styles';
import lightIcon from '../../assets/icons/lightIcon.svg';
import darkIcon from '../../assets/icons/darkIcon.svg';
import GasDropdownMenu from '../../components/gasDropDownMenu';
import {
  AccountWalletBalance,
  AddNewWalletListItem,
  AddWalletIcon,
  ConnectLabel,
  EnterAccountBlock,
  EnterAccountFlexItem,
  EnterAccountSubRow,
  ManageWalletsListItem,
  MyWalletsLabel,
  NewWalletLabel,
  NotMetamaskConnectedBlock,
  WalletsList,
  WalletsListItem,
  WelcomeSpan,
} from './account/styles';
import Accounts from './account/walletsList/Accounts';
import Box from '@material-ui/core/Box';
import sx from '@mui/system/sx';
import axios from 'axios';
import { data } from '../../globalStore';
import {
  GasButton,
  GasMenuItem,
  MobileSidebarGasGweiLabel,
  MobileSidebarSpeedValueParameter,
  SidebarMobileGasItemsBlock,
} from '../../components/gasDropDownMenu/styles';
import FastGweiGasIcon from '../../assets/icons/fastGweiGasIcon.png';
import MiddleGweiGasIcon from '../../assets/icons/middleGweiGasIcon.png';
import SlowGweiGasIcon from '../../assets/icons/slowGweiGasIcon.png';
import gasIcon from '../../assets/icons/gasIcon.svg';
import { alpha } from '@material-ui/core/styles';
import pyramidIcon from '../../assets/icons/pyramidIcon.svg';
import chevronDown from '../../assets/icons/chevronDownLightTheme.svg';
import chevronDownDark from '../../assets/icons/chevronDownDarkTheme.svg';
import ethIcon from '../../assets/icons/ethereum.svg';
import AvalancheIcon from '../../assets/icons/avalancheIcon.svg';
import bscIcon from '../../assets/icons/bscIcon.svg';
import arbitrumIcon from '../../assets/icons/arbitrumIcon.svg';
import fantomIcon from '../../assets/icons/fantomIcon.svg';
import Polygon from '../../assets/icons/polygon.svg';

Sidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
  isOpenWalletsListMobile: PropTypes.bool,
  onCloseWalletsListMobile: PropTypes.func,
  setTheme: PropTypes.bool,
};

const gasType = [
  {
    value: '',
    label: 'Fast',
    icon: FastGweiGasIcon,
  },
  {
    value: '',
    label: 'Average',
    icon: MiddleGweiGasIcon,
  },
  {
    value: '',
    label: 'Slow',
    icon: SlowGweiGasIcon,
  },
];

const MINUTE_MS = 10000;

import PersonAdd from '@material-ui/icons/PersonAdd';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Sidebar({
  isOpenSidebar,
  onCloseSidebar,
  isOpenWalletsListMobile,
  onCloseWalletsListMobile,
  address,
  name,
  setTheme,
  global_wallet,
}) {
  const [accountList, setaccountList] = useState([]);
  const [account, setaccount] = useState(false);
  const [myWallet, setMyWallet] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileNetworksListEl, setMobileNetworksListEl] = useState(null);

  const [selected, setselected] = useState('Average');
  const [GasPrices, setGasPrices] = useState([]);
  const [GasPricesContent, setGasPricesContent] = useState([]);

  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);
  const dispatch = useDispatch();

  const reduxWalletsList = useSelector((state) => state.initSidebarValuesReducer.walletsList);
  const reduxMyWallet = useSelector((state) => state.initSidebarValuesReducer.myWallet);

  const handleMobileGasItemClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileNetworksListClick = (event) => {
    setMobileNetworksListEl(event.currentTarget);
  };

  const handleGasItemListClose = () => {
    setAnchorEl(null);
  };

  const handleNetworksListClose = () => {
    setMobileNetworksListEl(null);
  };

  const openGasPricesMobilePopover = Boolean(anchorEl);
  const openNetworksListMobilePopover = Boolean(mobileNetworksListEl);
  const navigate = useNavigate();
  const id = openGasPricesMobilePopover ? 'simple-popover' : undefined;
  const networksListId = openNetworksListMobilePopover ? 'simple-popover' : undefined;

  const currentWallet = JSON.parse(localStorage.getItem('mywallet'));

  //------
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

  const routeToInitialConnectPage = () => {
    navigate('/');
    localStorage.removeItem('setnavigation');
  };

  //------

  useEffect(() => {
    const result = localStorage.getItem('wallets');
    var jsonData = [];
    var jsondata = JSON.parse(result);
    // console.log('jsondata', jsondata);

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
  }, [account, name, global_wallet]);

  const { pathname } = useLocation();
  let newSideBard = [];
  if (!setTheme || setTheme) {
    newSideBard = getRecall();
  }

  function setDynamicTheme() {
    if (!isLightTheme) {
      localStorage.setItem('selectedTheme', 'Day');
      dispatch({ type: 'GET_THEME', isLightTheme: true });
    } else {
      localStorage.setItem('selectedTheme', 'Night');
      dispatch({ type: 'GET_THEME', isLightTheme: false });
    }
  }

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    if (isOpenWalletsListMobile) {
      onCloseWalletsListMobile();
    }
  }, [pathname, address, name, global_wallet]);

  //gas items content
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=CISZAVU4237H8CFPFCFWEA25HHBI3QKB8W'
        );
        // console.log('gas item response', response);
        const { result } = response.data;
        gasType[0].value = result.FastGasPrice;
        gasType[1].value = result.ProposeGasPrice;
        gasType[2].value = result.SafeGasPrice;
        data.gasSelected = result.ProposeGasPrice;
        // setGasPrices([])
        setGasPrices([...gasType]);
        // console.log('gasType', gasType);
      } catch (error) {
        console.log(error);
      }
    }

    getData();

    const interval = setInterval(() => {
      // console.log('Logs every 10 secs');
      getData();
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateGasValue = (val, label) => {
      data.gasSelected = val;
      setselected(label);
    };

    // console.log('Updating Layout....')
    const content = GasPrices.map((option) => (
      <Box
        // key={option.value}
        selected={option.label === selected}
        onClick={() => {
          handleGasItemListClose();
          updateGasValue(option.value, option.label);
        }}
        sx={{ py: 1, px: 2.5 }}>
        <GasMenuItem isLightTheme={isLightTheme}>
          <MobileSidebarSpeedValueParameter>
            <img src={option.icon} alt="" />
            <span>{`${option.label} `}</span>
          </MobileSidebarSpeedValueParameter>
          <MobileSidebarGasGweiLabel>
            <span>{`${option.value} Gwei`}</span>
          </MobileSidebarGasGweiLabel>
        </GasMenuItem>
      </Box>
    ));

    setGasPricesContent(content);
  }, [GasPrices]);

  const isPhoneScreen = useMediaQuery('(max-width:709px)');
  const startOfTabletScreen = useMediaQuery('(min-width:710px)');
  const displayAccountsMobile = useMediaQuery('(min-width:780px)');
  const laptopScreen = useMediaQuery('(min-width:1280px)');

  // main sidebar content
  const desktopSidebarLayoutContent = (
    <Scrollbar
      sx={{
        height: '100vh',
        // in order to get correct background for QHD & 4K Screens
        background: () => (isLightTheme ? `url(${lightTheme})` : `#0F152C`),
        backdropFilter: 'blur(35px)',
        boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
        '& .simplebar-content': { display: 'flex', flexDirection: 'column' },
      }}>
      <SidebarMainLayout isLightTheme={isLightTheme}>
        <LogoBlock>
          {startOfTabletScreen ? (
            <>
              <LogoImg src={CompanyLogo} alt="" />
              {/*<MobileLogoTitle isLightTheme={isLightTheme}>Earnven</MobileLogoTitle>*/}
              <img className="Earnven" src={isLightTheme ? Earnven : Dark_Earnven_logo} alt="" />
            </>
          ) : (
            <>
              <LogoImg src={CompanyLogo} alt="" />
              {/*<MobileLogoTitle isLightTheme={isLightTheme}>Earnven</MobileLogoTitle>*/}
              <img className="Earnven" src={isLightTheme ? Earnven : Dark_Earnven_logo} alt="" />
            </>
          )}

          {startOfTabletScreen && !laptopScreen && (
            <SidebarTabletHeaderBtnsLayout>
              {isLightTheme ? (
                <SidebarTabletNetworkButton
                  isLightTheme={isLightTheme}
                  startIcon={<img src={pyramidIcon} alt="pyramide_icon" />}
                  endIcon={<img src={chevronDown} alt="chevron_icon" />}
                  onClick={handleMobileNetworksListClick}>
                  Network
                </SidebarTabletNetworkButton>
              ) : (
                <SidebarTabletNetworkButton
                  isLightTheme={isLightTheme}
                  startIcon={<img src={pyramidIcon} alt="pyramide_icon" />}
                  endIcon={<img src={chevronDownDark} alt="chevron_icon" />}
                  onClick={handleMobileNetworksListClick}>
                  Network
                </SidebarTabletNetworkButton>
              )}

              <GasButton
                isLightTheme={isLightTheme}
                startIcon={<img src={gasIcon} alt="" />}
                onClick={handleMobileGasItemClick}
                sx={{
                  ...(open && {
                    bgcolor: (theme) =>
                      alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
                  }),
                }}>
                39
              </GasButton>
              <ChangeThemeBtnTablet
                onClick={() => {
                  setDynamicTheme();
                }}>
                {isLightTheme ? <img src={lightIcon} alt="" /> : <img src={darkIcon} alt="" />}
              </ChangeThemeBtnTablet>
              {isLightTheme ? (
                <CloseTabletSidebarIcon
                  src={CloseMobileSidebarLight}
                  alt=""
                  onClick={() => onCloseSidebar()}
                />
              ) : (
                <CloseTabletSidebarIcon
                  src={CloseMobileSidebarDark}
                  alt=""
                  onClick={() => onCloseSidebar()}
                />
              )}
            </SidebarTabletHeaderBtnsLayout>
          )}
        </LogoBlock>
        {/* Account block for mobile devices*/}

        {displayAccountsMobile && (
          // <p>Here will account content</p>
          <Account
            address={address}
            name={name}
            setTheme={isLightTheme}
            global_wallet={global_wallet}
          />
          // localStorage.getItem('selected-account')
        )}
        {reduxWalletsList.length === 0 &&
          localStorage.getItem('setnavigation') !== null &&
          localStorage.getItem('wallets') === null && (
            <EnterAccountBlock isLightTheme={isLightTheme}>
              <EnterAccountSubRow>
                <EnterAccountFlexItem style={{ marginBottom: '5px' }}>
                  <WelcomeSpan>Welcome</WelcomeSpan>
                </EnterAccountFlexItem>
                <EnterAccountFlexItem>
                  <ConnectLabel isLightTheme={isLightTheme}>
                    Connect an Ethereum wallet to manage your portfolio
                  </ConnectLabel>
                </EnterAccountFlexItem>
                <EnterAccountFlexItem>
                  <Button onClick={routeToInitialConnectPage}>Connect Wallet</Button>
                </EnterAccountFlexItem>
              </EnterAccountSubRow>
            </EnterAccountBlock>
          )}

        <NavSection sx={{ px: 8, color: 'black' }} navConfig={newSideBard} address={address} />
        <SidebarMobileIconsBlock>
          <SidebarMobileIconSubBlock>
            {isLightTheme ? (
              <SidebarMobileNetworkButton
                isLightTheme={isLightTheme}
                startIcon={<img src={pyramidIcon} alt="pyramide_icon" />}
                endIcon={<img src={chevronDown} alt="chevron_icon" />}
                onClick={handleMobileNetworksListClick}>
                Network
              </SidebarMobileNetworkButton>
            ) : (
              <SidebarMobileNetworkButton
                isLightTheme={isLightTheme}
                startIcon={<img src={pyramidIcon} alt="pyramide_icon" />}
                endIcon={<img src={chevronDownDark} alt="chevron_icon" />}
                onClick={handleMobileNetworksListClick}>
                Network
              </SidebarMobileNetworkButton>
            )}

            {/* Network popover for mobiles */}
            {isPhoneScreen && (
              <Popover
                id={networksListId}
                open={openNetworksListMobilePopover}
                anchorEl={anchorEl}
                onClose={handleNetworksListClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 110, left: 10 }}
                PaperProps={{
                  sx: {
                    mt: 7,
                    ml: 2.2,

                    width: '345px',
                    height: '540px',
                    overflow: 'inherit',
                    borderRadius: '10px',
                    // background: (theme) => '#E5E5E5',
                    mixBlendMode: 'normal',
                    boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(15px)',
                    ...sx,
                  },
                  style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                  },
                }}>
                <MainSidebarMobilePopoverContent>
                  <MobileSidebarNetworksList isLightTheme={isLightTheme}>
                    <EthereumActiveNetwork
                      isLightTheme={isLightTheme}
                      style={{ marginBottom: '10px' }}>
                      <img src={ethIcon} alt={'network_icon'} />
                      <span>Ethereum</span>
                    </EthereumActiveNetwork>
                    <div>
                      <img src={AvalancheIcon} alt={'network_icon'} style={{ marginTop: '22px' }} />
                      {/*<MobileSidebarNetworksListSubBlock>*/}
                      <span style={{ color: '#b3b3b4' }}> Avalanche</span>
                      <MobileSidebarComingSoonLabel style={{ marginLeft: '-76px' }}>
                        Coming soon
                      </MobileSidebarComingSoonLabel>
                      {/*</MobileSidebarNetworksListSubBlock>*/}
                    </div>
                    <div>
                      <img src={bscIcon} alt={'network_icon'} style={{ marginTop: '22px' }} />
                      {/*<MobileSidebarNetworksListSubBlock>*/}
                      <span style={{ color: '#b3b3b4' }}>BSC</span>
                      <MobileSidebarComingSoonLabel style={{ marginLeft: '-30px' }}>
                        Coming soon
                      </MobileSidebarComingSoonLabel>
                      {/*</MobileSidebarNetworksListSubBlock>*/}
                    </div>
                    <div>
                      <img src={arbitrumIcon} alt={'network_icon'} style={{ marginTop: '22px' }} />
                      {/*<MobileSidebarNetworksListSubBlock>*/}
                      <span style={{ color: '#b3b3b4' }}> Arbitrum</span>
                      <MobileSidebarComingSoonLabel style={{ marginLeft: '-65px' }}>
                        Coming soon
                      </MobileSidebarComingSoonLabel>
                      {/*</MobileSidebarNetworksListSubBlock>*/}
                    </div>
                    {/*<Button startIcon={<img src={bscIcon} alt={'network_icon'} />}>BSC</Button>*/}
                    <div>
                      <img src={fantomIcon} alt={'network_icon'} style={{ marginTop: '22px' }} />
                      {/*<MobileSidebarNetworksListSubBlock>*/}
                      <span style={{ color: '#b3b3b4' }}> Fantom</span>
                      <MobileSidebarComingSoonLabel style={{ marginLeft: '-55px' }}>
                        Coming soon
                      </MobileSidebarComingSoonLabel>
                      {/*</MobileSidebarNetworksListSubBlock>*/}
                    </div>
                    <div>
                      <img src={Polygon} alt={'network_icon'} style={{ marginTop: '22px' }} />
                      {/*<MobileSidebarNetworksListSubBlock>*/}
                      <span style={{ color: '#b3b3b4' }}>Polygon</span>
                      <MobileSidebarComingSoonLabel style={{ marginLeft: '-60px' }}>
                        Coming soon
                      </MobileSidebarComingSoonLabel>
                      {/*</MobileSidebarNetworksListSubBlock>*/}
                    </div>
                  </MobileSidebarNetworksList>
                </MainSidebarMobilePopoverContent>
              </Popover>
            )}

            {/* Network popover for tablets*/}
            {startOfTabletScreen && !laptopScreen && (
              <Popover
                id={networksListId}
                open={openNetworksListMobilePopover}
                anchorEl={anchorEl}
                onClose={handleNetworksListClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                PaperProps={{
                  sx: {
                    mt: 6,
                    ml: -10,

                    width: '345px',
                    height: '540px',
                    overflow: 'inherit',
                    borderRadius: '10px',
                    // background: (theme) => '#E5E5E5',
                    mixBlendMode: 'normal',
                    boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(15px)',
                    ...sx,
                  },
                  style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                  },
                }}>
                <MainSidebarMobilePopoverContent>
                  <MobileSidebarNetworksList isLightTheme={isLightTheme}>
                    <EthereumActiveNetwork
                      isLightTheme={isLightTheme}
                      style={{ marginBottom: '10px' }}>
                      <img src={ethIcon} alt={'network_icon'} />
                      <span>Ethereum</span>
                    </EthereumActiveNetwork>
                    <div>
                      <img src={AvalancheIcon} alt={'network_icon'} style={{ marginTop: '22px' }} />
                      {/*<MobileSidebarNetworksListSubBlock>*/}
                      <span style={{ color: '#b3b3b4' }}> Avalanche</span>
                      <MobileSidebarComingSoonLabel style={{ marginLeft: '-76px' }}>
                        Coming soon
                      </MobileSidebarComingSoonLabel>
                      {/*</MobileSidebarNetworksListSubBlock>*/}
                    </div>
                    <div>
                      <img src={bscIcon} alt={'network_icon'} style={{ marginTop: '22px' }} />
                      {/*<MobileSidebarNetworksListSubBlock>*/}
                      <span style={{ color: '#b3b3b4' }}>BSC</span>
                      <MobileSidebarComingSoonLabel style={{ marginLeft: '-30px' }}>
                        Coming soon
                      </MobileSidebarComingSoonLabel>
                      {/*</MobileSidebarNetworksListSubBlock>*/}
                    </div>
                    <div>
                      <img src={arbitrumIcon} alt={'network_icon'} style={{ marginTop: '22px' }} />
                      {/*<MobileSidebarNetworksListSubBlock>*/}
                      <span style={{ color: '#b3b3b4' }}> Arbitrum</span>
                      <MobileSidebarComingSoonLabel style={{ marginLeft: '-65px' }}>
                        Coming soon
                      </MobileSidebarComingSoonLabel>
                      {/*</MobileSidebarNetworksListSubBlock>*/}
                    </div>
                    {/*<Button startIcon={<img src={bscIcon} alt={'network_icon'} />}>BSC</Button>*/}
                    <div>
                      <img src={fantomIcon} alt={'network_icon'} style={{ marginTop: '22px' }} />
                      {/*<MobileSidebarNetworksListSubBlock>*/}
                      <span style={{ color: '#b3b3b4' }}> Fantom</span>
                      <MobileSidebarComingSoonLabel style={{ marginLeft: '-55px' }}>
                        Coming soon
                      </MobileSidebarComingSoonLabel>
                      {/*</MobileSidebarNetworksListSubBlock>*/}
                    </div>
                    <div>
                      <img src={Polygon} alt={'network_icon'} style={{ marginTop: '22px' }} />
                      {/*<MobileSidebarNetworksListSubBlock>*/}
                      <span style={{ color: '#b3b3b4' }}>Polygon</span>
                      <MobileSidebarComingSoonLabel style={{ marginLeft: '-60px' }}>
                        Coming soon
                      </MobileSidebarComingSoonLabel>
                      {/*</MobileSidebarNetworksListSubBlock>*/}
                    </div>
                  </MobileSidebarNetworksList>
                </MainSidebarMobilePopoverContent>
              </Popover>
            )}

            {/* Gas button */}
            <GasButton
              isLightTheme={isLightTheme}
              startIcon={<img src={gasIcon} alt="" />}
              onClick={handleMobileGasItemClick}
              sx={{
                ...(open && {
                  bgcolor: (theme) =>
                    alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
                }),
              }}>
              39
            </GasButton>

            {/*Gas Items Price*/}
            {isPhoneScreen && (
              <Popover
                id={id}
                open={openGasPricesMobilePopover}
                anchorEl={anchorEl}
                onClose={handleGasItemListClose}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 100, left: 10 }}
                transformOrigin={{
                  vertical: 'center',
                  horizontal: 'left',
                }}
                PaperProps={{
                  sx: {
                    mt: 7,
                    ml: 2.2,

                    width: '345px',
                    height: '540px',
                    overflow: 'inherit',
                    borderRadius: '10px',
                    // backgroundColor: 'red',
                    mixBlendMode: 'normal',
                    boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(15px)',
                    ...sx,
                  },
                  style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                  },
                }}>
                <MainSidebarMobilePopoverContent>
                  <SidebarMobilePopoverGasPriceTitle isLightTheme={isLightTheme}>
                    Realtime Gas Prices 123
                  </SidebarMobilePopoverGasPriceTitle>
                  <SidebarMobileGasItemsBlock>{GasPricesContent}</SidebarMobileGasItemsBlock>
                  <SidebarMobilePopoverLink>
                    Provided by{' '}
                    <a href={'https://etherscan.io/'} target="_blank">
                      etherscan.io
                    </a>
                  </SidebarMobilePopoverLink>
                </MainSidebarMobilePopoverContent>
              </Popover>
            )}

            {startOfTabletScreen && !laptopScreen && (
              // Gas prices for tablets
              <Popover
                id={id}
                open={openGasPricesMobilePopover}
                anchorEl={anchorEl}
                onClose={handleGasItemListClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                PaperProps={{
                  sx: {
                    mt: 1,
                    ml: 2.2,

                    width: '345px',
                    height: '540px',
                    overflow: 'inherit',
                    borderRadius: '10px',
                    // backgroundColor: 'red',
                    mixBlendMode: 'normal',
                    boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(15px)',
                    ...sx,
                  },
                  style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                  },
                }}>
                <MainSidebarMobilePopoverContent>
                  <SidebarMobilePopoverGasPriceTitle isLightTheme={isLightTheme}>
                    Realtime Gas Prices 456
                  </SidebarMobilePopoverGasPriceTitle>
                  <SidebarMobileGasItemsBlock>{GasPricesContent}</SidebarMobileGasItemsBlock>
                  <SidebarMobilePopoverLink>
                    Provided by{' '}
                    <a href={'https://etherscan.io/'} target="_blank">
                      etherscan.io
                    </a>
                  </SidebarMobilePopoverLink>
                </MainSidebarMobilePopoverContent>
              </Popover>
            )}
          </SidebarMobileIconSubBlock>
          <ChangeThemeBtnMobile
            onClick={() => {
              setDynamicTheme();
            }}>
            {isLightTheme ? <img src={lightIcon} alt="" /> : <img src={darkIcon} alt="" />}
          </ChangeThemeBtnMobile>
          <SidebarMobileDelimiter isLightTheme={isLightTheme} />
        </SidebarMobileIconsBlock>
        <Links setTheme={isLightTheme} />
      </SidebarMainLayout>
    </Scrollbar>
  );

  // main sidebar wallet content (mobiles only)
  const mainSidebarWalletsListContent = (
    <Scrollbar
      sx={{
        height: '100vh',
        // in order to get correct background for QHD & 4K Screens
        background: () => (isLightTheme ? `url(${lightTheme})` : `#0F152C`),
        backdropFilter: 'blur(35px)',
        boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
        '& .simplebar-content': { display: 'flex', flexDirection: 'column' },
      }}>
      <SidebarMainLayout isLightTheme={isLightTheme}>
        {/*content for wallets list*/}
        {
          <MobileLogoBlockWalletsList>
            <LogoImg src={CompanyLogo} alt="" />
            <img className="Earnven" src={isLightTheme ? Earnven : Dark_Earnven_logo} alt="" />
            {isLightTheme ? (
              <CloseMobileSidebarIcon
                src={CloseMobileSidebarLight}
                alt=""
                onClick={() => onCloseWalletsListMobile()}
              />
            ) : (
              <CloseMobileSidebarIcon
                src={CloseMobileSidebarDark}
                alt=""
                onClick={() => onCloseWalletsListMobile()}
              />
            )}
          </MobileLogoBlockWalletsList>
        }

        {accountList &&
        reduxMyWallet !== undefined &&
        (reduxMyWallet !== null || undefined) &&
        reduxMyWallet.length !== 0 ? (
          <>
            <MyWalletsLabel isLightTheme={isLightTheme}>
              <p>My Wallet</p>
            </MyWalletsLabel>
            <WalletsList isMetamaskWallet={true}>
              <WalletsListItem isLightTheme={isLightTheme}>
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
          <NotMetamaskConnectedBlock isLightTheme={isLightTheme}>
            <p>Metamask wallet doesn`t connect</p>
          </NotMetamaskConnectedBlock>
        )}

        {/* all wallets */}
        <MyWalletsLabel isLightTheme={isLightTheme} allWalletsListMobile={true}>
          <p>{accountList.length > 0 && 'Watchlist'}</p>
        </MyWalletsLabel>
        <div>
          <WalletsList>
            {accountList &&
              reduxWalletsList !== undefined &&
              accountList.map((option) => (
                <WalletsListItem isLightTheme={isLightTheme}>
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
            <AddNewWalletListItem isLightTheme={isLightTheme} onClick={routeToConnectWallet}>
              <ListItemIcon sx={{ mr: 1, minWidth: '17px' }}>
                <AddWalletIcon isLightTheme={isLightTheme} />
              </ListItemIcon>
              <NewWalletLabel
                isMobileWalletsList={true}
                primaryTypographyProps={{
                  variant: 'watchlist_font_balance',
                }}>
                New Wallet
              </NewWalletLabel>
            </AddNewWalletListItem>

            <ManageWalletsListItem isLightTheme={isLightTheme} onClick={routeToConnectWallet}>
              <ListItemIcon sx={{ mr: 1, minWidth: '17px' }}>
                <AccountWalletBalance isLightTheme={isLightTheme} />
              </ListItemIcon>
              <NewWalletLabel
                isMobileWalletsList={true}
                primaryTypographyProps={{
                  variant: 'watchlist_font_balance',
                }}>
                Manage Wallets
              </NewWalletLabel>
            </ManageWalletsListItem>
          </WalletsList>
          {/* add new item element */}
        </div>
      </SidebarMainLayout>
    </Scrollbar>
  );

  return (
    <RootStyle>
      {/* sidebar for desktop versions */}
      <MHidden width="lgDown">
        <DrawerLayoutDesktop
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: '315px',
              height: 'auto',
              overflow: 'auto',
              backgroundColor: 'transparent !important',
              border: 'none',
            },
          }}>
          {desktopSidebarLayoutContent}
        </DrawerLayoutDesktop>

        <DrawerLayoutTablet
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: '155px',
              height: 'auto',
              overflow: 'auto',
              backgroundColor: 'transparent !important',
              border: 'none',
            },
          }}>
          {desktopSidebarLayoutContent}
        </DrawerLayoutTablet>
      </MHidden>

      {/* sidebar for mobiles versions */}
      <MHidden width="lgUp">
        {/*Default sidebar with main content*/}
        <DrawerLayoutMobile
          open={isOpenSidebar}
          anchor={'right'}
          onClose={onCloseSidebar}
          // BackdropProps={{ invisible: true }}
          PaperProps={{
            sx: {
              width: '97%',
              overflow: 'auto',
              height: 'auto',
              backgroundColor: 'transparent',
              backdropFilter: 'blur(15px)',
            },
          }}>
          {desktopSidebarLayoutContent}
        </DrawerLayoutMobile>

        {/* Sidebar with wallets list */}
        <DrawerLayoutMobile
          open={isOpenWalletsListMobile}
          anchor={'left'}
          onClose={onCloseWalletsListMobile}
          // BackdropProps={{ invisible: true }}
          PaperProps={{
            sx: {
              width: '360px',
              overflow: 'auto',
              height: 'auto',
              backgroundColor: 'transparent',
            },
          }}>
          {/*{reduxWalletsList !== undefined ? (*/}
          <>{mainSidebarWalletsListContent}</>
          {/*) : (*/}
          {/*  <div>Content test</div>*/}
          {/*)}*/}
        </DrawerLayoutMobile>
      </MHidden>
    </RootStyle>
  );
}
