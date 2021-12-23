/* import React, { useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TransparentButton from '../../components/TransparentButton';
import EthereumIcon from '../../generalAssets/icons/ethereum.svg'
import BinanceIcon from '../../generalAssets/icons/binance.svg'
import Solana from '../../generalAssets/icons/solana.svg'
import Polkadot from '../../generalAssets/icons/polkadot.svg'
import Polygon from '../../generalAssets/icons/polygon.svg'

import {data} from '../../globalStore'


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

  const [network, setNetwork] = useState(EthereumIcon)

  return (
    <div className={classes.root}>
      <Accordion style={{background:'transparent',}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{fill:'white'}}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        
        <img src={network} alt=''></img>
       
          

        </AccordionSummary>
        <AccordionDetails style={{backgroundColor:'transparent', width:'150px'}}>
          <ul style={{listStyleType:'none'}}>
            <li>
              <TransparentButton
              onClick={(e)=>{data.network='ethereum';setNetwork(EthereumIcon)}}
              value={<><img src={EthereumIcon} alt='' height='25px'></img> &nbsp; <span style={{fontSize:'18px'}}>Ethereum</span></>}/> 
            </li>

            <li> 
              <TransparentButton aria-controls="panel1a-content" 
              onClick={(e)=>{data.network='binance';setNetwork(BinanceIcon)}}
              value={<><img src={BinanceIcon} alt='' height='25px'></img> &nbsp; <span style={{fontSize:'18px'}}>Binance Smart Chain</span></>}/>
            </li>
            <li> 
              <TransparentButton 
              onClick={(e)=>{data.network='solana';setNetwork(Solana)}}
              value={<><img src={Solana} alt='' height='25px'></img> &nbsp; <span style={{fontSize:'18px'}}>Solana</span></>}/>
            </li>
            <li> 
              <TransparentButton 
              onClick={(e)=>{data.network='polkadot';setNetwork(Polkadot)}}
              value={<><img src={Polkadot} alt='' height='25px'></img> &nbsp; <span style={{fontSize:'18px'}}>Polkadot</span></>}/>
            </li>
            <li> 
              <TransparentButton 
              onClick={(e)=>{data.network='polygon';setNetwork(Polygon)}}
              value={<><img src={Polygon} alt='' height='25px'></img> &nbsp; <span style={{fontSize:'18px'}}>Polygon</span></>}/>
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
import { Box, MenuItem, ListItemIcon, ListItemText, IconButton } from '@material-ui/core';
// components
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuPopover from '../MenuPopover';
// import globe from '../../generalAssets/icons/globe.svg'
// import languageImg from '../../generalAssets/icons/language.png'
// import { IoIosHelpCircleOutline } from "react-icons/io";

import EthereumIcon from '../../assets/icons/ethereum.svg';
import BinanceIcon from '../../assets/icons/binance.svg';
import Solana from '../../assets/icons/solana.svg';
import Polkadot from '../../assets/icons/polkadot.svg';
import Polygon from '../../assets/icons/polygon.svg';

// import {data} from '../../globalStore'

// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

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
