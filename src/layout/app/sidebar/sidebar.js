/* eslint-disable */
import Scrollbar from '../../../components/Scrollbar';
import sidebarConfig, { getRecall } from '../SidebarConfig';
// import upcomingConfig from '../upcomingConfig';
import NavSection from '../../../components/NavSection';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import PropTypes from 'prop-types';
import { useEffect } from 'react';
import React from 'react';
import { useLocation } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
// import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@material-ui/core';
import { Box, Drawer, Stack } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import {MHidden} from '../../../components/@material-extend';
import CompanyLogo from '../../../assets/icons/logo_menu.svg';
import Earnven from '../../../assets/icons/Earnven_menu_text.svg';
import Dark_Earnven_logo from '../../../assets/icons/Dark_Earnven_logo.svg';
import Account from './account/account';
import './sidebar.css'
import Links from './social/Links';
import Accounts from './account/Accounts';
import darkTheme from '../../../assets/images/darkTheme.jpg';
import lightTheme from '../../../assets/images/lightTheme.jpg';
const DRAWER_WIDTH = 315;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));



Sidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
  setTheme: PropTypes.bool,
};


export default function Sidebar({ isOpenSidebar, onCloseSidebar, address, name,  setTheme, global_wallet }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  let newSideBard = [];
  if (!setTheme || setTheme) {
    newSideBard = getRecall();
  }
  function mouseOver(e) {
    e.target.style.background = '#242321';
 }

  function mouseOut(e){
      e.target.style.background = 'transparent'
  }

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname,address, name, global_wallet]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100vh',
        // backdropFilter: 'saturate(180%) blur(160px)',
        // WebkitBackdropFilter: 'blur(100px)',
        'background-image': (theme) => (setTheme ? `url(${darkTheme})` : `url(${lightTheme})`),
       boxShadow: '0 2px 3px 30px #d2dcf6',
        '& .simplebar-content': { display: 'flex', flexDirection: 'column' }
      }}
    >
      {/* <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
          <Logo />
        </Box>
      </Box> */}
  <Box sx={{ px: '38.91%', pb: 1, mt: '8%', ml: '-20px' }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            position: 'relative',
            bgcolor: 'transparent',
          }}>
          <img src={CompanyLogo} alt=""></img>
          <img className="Earnven" src={setTheme ? Dark_Earnven_logo : Earnven} alt=""></img>
         </Stack>
        </Box>
 
       

      <Box sx={{ px: 8}}>
          <Account address={address} name={name} setTheme={setTheme} global_wallet={global_wallet}/>
      </Box>

      <NavSection
        sx={{ px: 8, color: 'black' }}
        navConfig={newSideBard}
        address={address}
        setTheme={setTheme}
      />

     <center>
      {/* <Accordion style={{width:'60%', background:'transparent'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        > */}
          {/* Tools */}
        {/* </AccordionSummary> */}
        {/* <AccordionDetails>
          <div
          onMouseOver={(e)=>{mouseOver(e)}}
          onMouseOut={(e)=>{mouseOut(e)}}
          onClick={(e)=>{navigate(`/${address}/airdrop`)}}
          style={{
            background : 'transparent',
            border:'none',
            height : '50px',
            color:'white',
            cursor:'pointer',
            paddingTop: '15px'
          }}>
              Mass AirDropper
          </div>
          <div
          onMouseOver={(e)=>{mouseOver(e)}}
          onMouseOut={(e)=>{mouseOut(e)}}
          onClick={(e)=>{navigate(`/${address}/create-token`)}}
          style={{
            background : 'transparent',
            border:'none',
            height : '50px',
            color:'white',
            cursor:'pointer',
            paddingTop: '15px'
          }}>
              Token Creator
          </div>
        </AccordionDetails> */}
      {/* </Accordion> */}
      </center>
      {/* <Box sx={{ flexGrow: 1 }} /> */}
      <Links setTheme={setTheme} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp" >
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH, overflow: 'auto', height: 'auto' }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              height: 'auto',
              overflow: 'auto',
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
