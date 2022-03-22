import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { alpha } from '@material-ui/core/styles';
import MenuPopover from './MenuPopover';
import gasIcon from '../../assets/icons/gasIcon.svg';
import { data } from '../../globalStore';
import SlowGweiGasIcon from '../../assets/icons/slowGweiGasIcon.png';
import MiddleGweiGasIcon from '../../assets/icons/middleGweiGasIcon.png';
import FastGweiGasIcon from '../../assets/icons/fastGweiGasIcon.png';

import {
  GasButton,
  GasMenuItem,
  MenuPopoverBox,
  MenuPopoverBoxTitle,
  MenuPopoverBoxNote,
} from './styles';
import { useSelector } from 'react-redux';
import { addIconsGasPrices } from '../../commonFunctions/commonFunctions';

export default function GasDropdownMenuHeader({ isLightTheme }) {
  const GasPrices = useSelector((state) => state.gesData.gasPriceData);
  const addIconsGasPricesWithIcons = addIconsGasPrices(
    GasPrices,
    FastGweiGasIcon,
    MiddleGweiGasIcon,
    SlowGweiGasIcon,
    FastGweiGasIcon,
    MiddleGweiGasIcon,
    SlowGweiGasIcon,
    isLightTheme
  );
  const anchorRef = useRef(null);
  const [open, setopen] = useState(false);
  const [selected, setselected] = useState('Average');
  const [GasPricesContent, setGasPricesContent] = useState([]);

  useEffect(() => {
    const updateGasValue = (val, label) => {
      data.gasSelected = val;
      setselected(label);
    };

    // console.log('Updating Layout....')
    const content = addIconsGasPricesWithIcons.map((option) => (
      <div
        onClick={() => {
          handleClose();
          updateGasValue(option.value, option.label);
        }}>
        <GasMenuItem isLightTheme={isLightTheme}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <img src={option.icon} alt="" />
            <span>{`${option.label} `}</span>
          </div>
          <div>
            <span>{`${option.value} Gwei`}</span>
          </div>
        </GasMenuItem>
      </div>
    ));

    setGasPricesContent(content);

    console.log('addIconsGasPricesWithIcons', addIconsGasPricesWithIcons);
    console.log('GasPricesContent', GasPricesContent);
  }, [GasPrices]);

  const handleOpen = () => {
    setopen(true);
  };

  const handleClose = () => {
    setopen(false);
  };

  return (
    <>
      <GasButton
        isLightTheme={isLightTheme}
        startIcon={<img src={gasIcon} alt="" />}
        ref={anchorRef}
        onClick={() => {
          handleOpen();
        }}
        sx={{
          ...(open && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}>
        39
      </GasButton>
      <MenuPopover
        isLightTheme={isLightTheme}
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}>
        <MenuPopoverBox isLightTheme={isLightTheme} sx={{ py: 1 }}>
          <MenuPopoverBoxTitle isLightTheme={isLightTheme}>Realtime Gas Prices</MenuPopoverBoxTitle>
          {GasPricesContent}
          <MenuPopoverBoxNote>
            Provided by
            <a href={'https://etherscan.io/'} target="_blank">
              {' '}
              etherscan.io
            </a>
          </MenuPopoverBoxNote>
        </MenuPopoverBox>
      </MenuPopover>
    </>
  );
}
