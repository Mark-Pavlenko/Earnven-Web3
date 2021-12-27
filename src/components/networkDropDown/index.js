import React, { useRef, useState } from 'react';
// material
import { alpha } from '@material-ui/core/styles';
import { Box, MenuItem, ListItemIcon, ListItemText, IconButton } from '@material-ui/core';
// components
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuPopover from '../MenuPopover';
import EthereumIcon from '../../assets/icons/ethereum.svg';
import BinanceIcon from '../../assets/icons/binance.svg';
import Solana from '../../assets/icons/solana.svg';
import Polkadot from '../../assets/icons/polkadot.svg';
import Polygon from '../../assets/icons/polygon.svg';

const LANGS = [
  {
    value: 'eth',
    label: 'Ethereum',
    icon: EthereumIcon,
  },
  {
    value: 'bsc',
    label: 'Binance Smart Chain',
    icon: BinanceIcon,
  },
  {
    value: 'sol',
    label: 'Solana',
    icon: Solana,
  },
  {
    value: 'pol',
    label: 'Polkadot',
    icon: Polkadot,
  },
  {
    value: 'matic',
    label: 'Polygon',
    icon: Polygon,
  },
];

export default function NetworkDropDown() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}>
        <img src={EthereumIcon} alt="" />
        <ExpandMoreIcon style={{ color: '#fff' }} />

        {/* <IoIosHelpCircleOutline style={{color:'#fff'}}/><ExpandMoreIcon style={{color:'#fff'}}/> */}
      </IconButton>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current}>
        <Box sx={{ py: 1 }}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === LANGS[0].value}
              onClick={handleClose}
              sx={{ py: 1, px: 2.5 }}>
              <ListItemIcon>
                <Box component="img" alt={option.label} src={option.icon} />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: 'body2', color: '#fff' }}>
                {option.label}
              </ListItemText>
            </MenuItem>
          ))}
        </Box>
      </MenuPopover>
    </>
  );
}
