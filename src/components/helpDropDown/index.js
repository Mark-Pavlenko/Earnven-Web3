/* import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TransparentButton from '../../components/TransparentButton'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100px',
    background:'transparent'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    background:'transparent'
  },
}));

export default function SimpleAccordion() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion style={{background:'transparent',}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{fill:'white'}}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <div style={{
          borderColor:'white',
          borderWidth:'1px',
          borderStyle:'solid',
          padding:'2px',
          height:'20px',
          width:'20px',
          borderRadius:'20px'
        }}>
          <font color='white'><b>&#x3f;</b></font>
        </div>

        </AccordionSummary>
        <AccordionDetails style={{backgroundColor:'transparent', width:'300px'}}>
          <ul style={{listStyleType:'none'}}>
            <li>
              <TransparentButton value='About zPYLON'/>
            </li>

            <li> 
              <TransparentButton value='FAQ'/>
            </li>
            <li> 
              <TransparentButton value='Contact'/>
            </li>
            <li> 
              <hr></hr>
            </li>
            <li> 
              <TransparentButton value='Twitter'/>
            </li>
            <li> 
              <TransparentButton value='Telegram'/>
            </li>
          </ul>
        </AccordionDetails>
      </Accordion>
      

    </div>
  );
}
 */

import React, { useRef, useState } from 'react';
// material
import { alpha } from '@material-ui/core/styles';
import { Box, MenuItem, ListItemText, IconButton } from '@material-ui/core';
// components
// import globe from '../../assets/icons/globe.svg'
// import languageImg from '../../assets/icons/language.png'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IoIosHelpCircleOutline } from 'react-icons/io';
import MenuPopover from '../MenuPopover';

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
