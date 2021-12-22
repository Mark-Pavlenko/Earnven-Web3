import React, { useRef, useState, useEffect } from 'react';
import { Box, MenuItem, ListItemIcon, ListItemText, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { alpha } from '@material-ui/core/styles';
import axios from 'axios';
import MenuPopover from '../MenuPopover';
import languageImg from '../../assets/icons/language.png';
import gas from '../../assets/icons/gas.svg';
import { data } from '../../globalStore';

const gasType = [
  {
    value: '',
    label: 'Fast',
  },
  {
    value: '',
    label: 'Average',
  },
  {
    value: '',
    label: 'Slow',
  },
];

export default function GasDropDownMenu() {
  const anchorRef = useRef(null);
  const [open, setopen] = useState(false);
  const [selected, setselected] = useState('Average');
  const [GasPrices, setGasPrices] = useState([]);
  const [GasPricesContent, setGasPricesContent] = useState([]);

  useEffect(() => {
    // console.log('Updating Layout....')
    const content = GasPrices.map((option) => (
      <MenuItem
        // key={option.value}
        selected={option.label === selected}
        onClick={() => {
          handleClose();
          updateGasValue(option.value, option.label);
        }}
        sx={{ py: 1, px: 2.5 }}>
        <ListItemIcon>
          <Box component="img" alt={option.label} src={languageImg} />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ variant: 'body2', color: '#fff' }}>
          {`${option.label}-${option.value} Gwei`}
        </ListItemText>
      </MenuItem>
    ));

    setGasPricesContent(content);
  }, [GasPrices]);

  const handleOpen = () => {
    setopen(true);
  };

  const handleClose = () => {
    setopen(false);
  };

  const MINUTE_MS = 10000;

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=CISZAVU4237H8CFPFCFWEA25HHBI3QKB8W'
        );
        // console.log("api response::", response);
        const { result } = response.data;
        gasType[0].value = result.FastGasPrice;
        gasType[1].value = result.ProposeGasPrice;
        gasType[2].value = result.SafeGasPrice;
        data.gasSelected = result.ProposeGasPrice;
        // setGasPrices([])
        setGasPrices([...gasType]);
        // console.log("gasType::",gasType);
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

  const updateGasValue = (val, label) => {
    data.gasSelected = val;
    setselected(label);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={() => {
          console.log('gas click');
          handleOpen();
        }}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}>
        <img src={gas} alt="" />
        <ExpandMoreIcon style={{ color: '#fff' }} />

        {/* <IoIosHelpCircleOutline style={{color:'#fff'}}/><ExpandMoreIcon style={{color:'#fff'}}/> */}
      </IconButton>
      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current}>
        <Box sx={{ py: 1 }}>{GasPricesContent}</Box>
      </MenuPopover>
    </>
  );
}
