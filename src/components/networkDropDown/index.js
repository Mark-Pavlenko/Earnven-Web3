import React, { useState } from 'react';
import {
  DesktopNetworkButton,
  EthereumActiveNetwork,
  DesktopComingSoonLabel,
  DesktopNetworksList,
  DesktopNetworksListBlock,
  InactiveDesktopListNetworkButton,
  DesktopNetworksListItem,
  DesktopNetworksListItemLabelsBlock,
} from './styles';
import chevronUp from '../../assets/icons/chevronUp.svg';
import pyramidIcon from '../../assets/icons/pyramidIcon.svg';
import chevronDownBlack from '../../assets/icons/chevronDownLightTheme.svg';
import chevronDownLight from '../../assets/icons/chevronDownLight.svg';
import { useSelector } from 'react-redux';
import Popover from '@mui/material/Popover';
import ethIcon from '../../assets/icons/ethereum.svg';
import AvalancheIcon from '../../assets/icons/avalancheIcon.svg';
import bscIcon from '../../assets/icons/bscIcon.svg';
import arbitrumIcon from '../../assets/icons/arbitrumIcon.svg';
import fantomIcon from '../../assets/icons/fantomIcon.svg';
import Polygon from '../../assets/icons/polygon.svg';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';

export default function Index() {
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
                  height: '310px',
                  backgroundColor: isLightTheme ? '#ffffff29' : '#10142D',
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
                <DesktopNetworksList isLightTheme={isLightTheme}>
                  <DesktopNetworksListItem>
                    <img src={arbitrumIcon} alt={'network_icon'} />
                    <DesktopNetworksListItemLabelsBlock>
                      <span style={{ color: '#b3b3b4' }}> Arbitrum</span>
                      <DesktopComingSoonLabel>Coming soon</DesktopComingSoonLabel>
                    </DesktopNetworksListItemLabelsBlock>
                  </DesktopNetworksListItem>

                  <EthereumActiveNetwork isLightTheme={isLightTheme} style={{}}>
                    <img src={ethIcon} alt={'network_icon'} />
                    <span>Ethereum</span>
                  </EthereumActiveNetwork>

                  <DesktopNetworksListItem>
                    <img src={AvalancheIcon} alt={'network_icon'} />
                    <DesktopNetworksListItemLabelsBlock>
                      <span style={{ color: '#b3b3b4' }}> Avalanche</span>
                      <DesktopComingSoonLabel>Coming soon</DesktopComingSoonLabel>
                    </DesktopNetworksListItemLabelsBlock>
                  </DesktopNetworksListItem>

                  <DesktopNetworksListItem>
                    <img src={bscIcon} alt={'network_icon'} />
                    <DesktopNetworksListItemLabelsBlock>
                      <span style={{ color: '#b3b3b4' }}>BSC</span>
                      <DesktopComingSoonLabel>Coming soon</DesktopComingSoonLabel>
                    </DesktopNetworksListItemLabelsBlock>
                  </DesktopNetworksListItem>

                  <DesktopNetworksListItem>
                    <img src={fantomIcon} alt={'network_icon'} />
                    <DesktopNetworksListItemLabelsBlock>
                      <span style={{ color: '#b3b3b4' }}> Fantom</span>
                      <DesktopComingSoonLabel>Coming soon</DesktopComingSoonLabel>
                    </DesktopNetworksListItemLabelsBlock>
                  </DesktopNetworksListItem>

                  <DesktopNetworksListItem>
                    <img src={Polygon} alt={'network_icon'} />
                    <DesktopNetworksListItemLabelsBlock>
                      <span style={{ color: '#b3b3b4' }}>Polygon</span>
                      <DesktopComingSoonLabel>Coming soon</DesktopComingSoonLabel>
                    </DesktopNetworksListItemLabelsBlock>
                  </DesktopNetworksListItem>
                </DesktopNetworksList>
              </DesktopNetworksListBlock>
            </Popover>
          </div>
        )}
      </PopupState>
    </>
  );
}
