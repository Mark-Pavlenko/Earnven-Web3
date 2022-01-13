import React, { useRef, useState } from 'react';
// material
import { alpha } from '@material-ui/core/styles';
import { Box, MenuItem, ListItemText, IconButton } from '@material-ui/core';
// components
// import globe from '../../generalAssets/icons/globe.svg'
// import languageImg from '../../generalAssets/icons/language.png'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IoIosHelpCircleOutline } from 'react-icons/io';
import MenuPopover from '../../layout/sidebar/account/walletsListOptionsPopover';

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'en',
    label: 'About Earnven',
    // icon: '/static/icons/language.svg'
  },
  {
    value: 'dt',
    label: 'FAQ',
    // icon: '/static/icons/language.svg'
  },
  {
    value: 'fr',
    label: 'Contact',
    // icon: '/static/icons/language.svg'
  },
  {
    value: 'fr',
    label: 'Twitter',
    // icon: '/static/icons/language.svg'
  },
  {
    value: 'fr',
    label: 'Telegram',
    // icon: '/static/icons/language.svg'
  },
];

// ----------------------------------------------------------------------

export default function HelpDropDown() {
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
          width: 50,
          height: 50,
          ...(open && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}>
        {/* <img src={globe} alt=""/><ExpandMoreIcon style={{color:'#fff'}}/> */}

        <IoIosHelpCircleOutline style={{ color: '#fff' }} />
        <ExpandMoreIcon style={{ color: '#fff' }} />
      </IconButton>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current}>
        <Box sx={{ py: 1 }}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === LANGS[0].value}
              onClick={handleClose}
              sx={{ py: 1, px: 2.5 }}>
              {/* <ListItemIcon>
                <Box component="img" alt={option.label} src={languageImg} />
              </ListItemIcon> */}
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
