import React, { useEffect, useState } from 'react';

import Header from './header';
import Sidebar from './sidebar';
import { Outlet } from 'react-router-dom';
import { RootStyle, MainStyle } from './styledComponents';
import { useSelector } from 'react-redux';

export default function AppLayout() {
  const themeType = useSelector((state) => state.themeReducer.isLightTheme);
  const title = useSelector((state) => state.headerTitlesReducer.currentRouteTitle);
  // console.log('middle title', title);

  function capitalizeFirstLetter(string) {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  }
  const finalTitle = capitalizeFirstLetter(title);

  const [open, setOpen] = useState(false);
  const [openWalletsListMobile, setOpenWalletsListMobile] = useState(false);

  console.log("localStorage.getItem('selected-account')", localStorage.getItem('selected-account'));
  console.log("localStorage.getItem('selected-name')", localStorage.getItem('selected-name'));
  console.log("localStorage.getItem('wallets')", localStorage.getItem('wallets'));

  // 0x49a2dcc237a65cc1f412ed47e0594602f6141936;
  // null;
  const arr = [
    { address: '0x67319Bdcd070180b9FABE4DFC4e47a9454aC22DE', provider: 'metamask', name: 'null' },
    { address: '0x49a2dcc237a65cc1f412ed47e0594602f6141936', provider: null, name: 'null' },
  ];

  return (
    <RootStyle isLightTheme={themeType}>
      <Header
        onOpenSidebar={() => setOpen(true)}
        onOpenMobileWalletsList={() => setOpenWalletsListMobile(true)}
        themeType={themeType}
        finalTitle={finalTitle}
      />
      <Sidebar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
        isOpenWalletsListMobile={openWalletsListMobile}
        onCloseWalletsListMobile={() => setOpenWalletsListMobile(false)}
        address={localStorage.getItem('selected-account')}
        name={localStorage.getItem('selected-name')}
        global_wallet={localStorage.getItem('wallets')}
        themeType={themeType}
      />
      <MainStyle isLightTheme={themeType} appBarMobile={64} appBarDesktop={92}>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
