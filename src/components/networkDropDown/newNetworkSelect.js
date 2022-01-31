import React from 'react';
import { SidebarTabletNetworkButton } from './style';
import pyramidIcon from '../../assets/icons/pyramidIcon.svg';
import chevronDownBlack from '../../assets/icons/chevronDownLightTheme.svg';
import chevronDownLight from '../../assets/icons/chevronDownLight.svg';
import { useSelector } from 'react-redux';

export default function NewNetworkSelect() {
  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);
  return (
    <>
      <SidebarTabletNetworkButton
        isLightTheme={isLightTheme}
        startIcon={<img src={pyramidIcon} alt="pyramide_icon" />}
        endIcon={
          <img src={isLightTheme ? chevronDownBlack : chevronDownLight} alt="chevron_icon" />
        }>
        Network
      </SidebarTabletNetworkButton>
    </>
  );
}
