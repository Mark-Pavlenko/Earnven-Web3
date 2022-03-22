import React, { useEffect, useState } from 'react';

import Header from './header';
import Sidebar from './sidebar';
import { Outlet } from 'react-router';
import { RootStyle, MainStyle, MainStyleParentLayout } from './styledComponents';
import { useSelector } from 'react-redux';

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const [openWalletsListMobile, setOpenWalletsListMobile] = useState(false);

  const themeType = useSelector((state) => state.themeReducer.isLightTheme);
  const title = useSelector((state) => state.headerTitlesReducer.currentRouteTitle);

  const isFirstConnection = localStorage.getItem('firstConnection');

  function capitalizeFirstLetter(string) {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  }
  const finalTitle = capitalizeFirstLetter(title);

  return (
    <>
      <RootStyle isLightTheme={themeType} isFirstConnection={isFirstConnection}>
        <MainStyleParentLayout>
          <MainStyle isLightTheme={themeType}>
            <Header
              onOpenSidebar={() => setOpen(true)}
              onOpenMobileWalletsList={() => setOpenWalletsListMobile(true)}
              themeType={themeType}
              finalTitle={finalTitle}
            />
            <Outlet />
          </MainStyle>
        </MainStyleParentLayout>
        <div>
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
        </div>
      </RootStyle>
    </>
  );
}
