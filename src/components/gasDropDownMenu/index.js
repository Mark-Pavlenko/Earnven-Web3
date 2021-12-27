import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Box, MenuItem, ListItemIcon, ListItemText, IconButton } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';

import MenuPopover from './MenuPopover';
import languageImg from '../../assets/icons/language.png';
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

export default function GasDropDownMenu({ isLightTheme }) {
  const anchorRef = useRef(null);
  const [open, setopen] = useState(false);
  const [selected, setselected] = useState('Average');
  const [GasPrices, setGasPrices] = useState([]);
  const [GasPricesContent, setGasPricesContent] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=CISZAVU4237H8CFPFCFWEA25HHBI3QKB8W'
        );
        console.log('gas item response', response);
        const { result } = response.data;
        gasType[0].value = result.FastGasPrice;
        gasType[1].value = result.ProposeGasPrice;
        gasType[2].value = result.SafeGasPrice;
        data.gasSelected = result.ProposeGasPrice;
        // setGasPrices([])
        setGasPrices([...gasType]);
        console.log('gasType', gasType);
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
      <div
        // key={option.value}
        selected={option.label === selected}
        onClick={() => {
          handleClose();
          updateGasValue(option.value, option.label);
        }}
        sx={{ py: 1, px: 2.5 }}>
        {/*<ListItemIcon>*/}
        {/*  <Box component="img" alt={option.label} src={languageImg} />*/}
        {/*</ListItemIcon>*/}
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
          console.log('gas click');
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
