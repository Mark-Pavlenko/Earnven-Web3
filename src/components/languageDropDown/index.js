import React, { useRef, useState } from 'react';
// material
import { alpha } from '@material-ui/core/styles';
import { Box, IconButton, ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
// components
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuPopover from '../MenuPopover';
import globe from '../../assets/icons/globe.svg';
import languageImg from '../../assets/icons/language.png';

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'en',
    label: 'EN',
    icon: '/static/icons/language.svg',
  },
  {
    value: 'dt',
    label: 'DT',
    icon: '/static/icons/language.svg',
  },
  {
    value: 'fr',
    label: 'FR',
    icon: '/static/icons/language.svg',
  },
];

import { LanguageButton } from './styles';

// ----------------------------------------------------------------------

export default function LanguagePopover() {
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
      <LanguageButton
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
        <img src={globe} alt="" />
        <ExpandMoreIcon style={{ color: '#fff' }} />
      </LanguageButton>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current}>
        <Box sx={{ py: 1 }}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === LANGS[0].value}
              onClick={handleClose}
              sx={{ py: 1, px: 2.5 }}>
              <ListItemIcon>
                <Box component="img" alt={option.label} src={languageImg} />
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
