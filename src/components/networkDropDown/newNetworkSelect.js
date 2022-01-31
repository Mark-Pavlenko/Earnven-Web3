import React, { useState } from 'react';
import {
  DesktopNetworkButton,
  EthereumActiveNetwork,
  MainSidebarMobilePopoverContent,
  MobileSidebarComingSoonLabel,
  MobileSidebarNetworksList,
  DesktopNetworksListBlock,
  InactiveDesktopListNetworkButton,
} from './styles';
import chevronUp from '../../assets/icons/chevronUp.svg';
import pyramidIcon from '../../assets/icons/pyramidIcon.svg';
import chevronDownBlack from '../../assets/icons/chevronDownLightTheme.svg';
import chevronDownLight from '../../assets/icons/chevronDownLight.svg';
import { useSelector } from 'react-redux';
import Popover from '@mui/material/Popover';
import sx from '@mui/system/sx';
import ethIcon from '../../assets/icons/ethereum.svg';
import AvalancheIcon from '../../assets/icons/avalancheIcon.svg';
import bscIcon from '../../assets/icons/bscIcon.svg';
import arbitrumIcon from '../../assets/icons/arbitrumIcon.svg';
import fantomIcon from '../../assets/icons/fantomIcon.svg';
import Polygon from '../../assets/icons/polygon.svg';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import { Button, Typography } from '@material-ui/core';

export default function NewNetworkSelect() {
  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);

  return (
    <>
      <PopupState variant="popover" popupId="demo-popup-popover">
        {(popupState) => (
          <div>
            <DesktopNetworkButton
              isLightTheme={isLightTheme}
              startIcon={<img src={pyramidIcon} alt="pyramide_icon" />}
              endIcon={
                <img src={isLightTheme ? chevronDownBlack : chevronDownLight} alt="chevron_icon" />
              }
              {...bindTrigger(popupState)}>
              Network
            </DesktopNetworkButton>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              PaperProps={{
                sx: {
                  marginTop: '15px',
                  width: '155px',
                  height: '275px',
                  backgroundColor: isLightTheme ? '#ffffff29' : '#1F265C3D',
                  boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(35px)',
                  mixBlendMode: 'normal',
                  borderRadius: '10px',
                },
              }}>
              <DesktopNetworksListBlock isLightTheme={isLightTheme}>
                <InactiveDesktopListNetworkButton
                  isLightTheme={isLightTheme}
                  startIcon={<img src={pyramidIcon} alt="pyramide_icon" />}
                  endIcon={<img src={chevronUp} alt="chevron_icon" />}>
                  Network
                </InactiveDesktopListNetworkButton>
              </DesktopNetworksListBlock>
            </Popover>
          </div>
        )}
      </PopupState>
    </>
  );
}
