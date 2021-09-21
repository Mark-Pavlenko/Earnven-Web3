import Scrollbar from '../../../components/Scrollbar';
import sidebarConfig from '../SidebarConfig';
import NavSection from '../../../components/NavSection';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import PropTypes from 'prop-types';
import { useEffect } from 'react';
import {  useLocation } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
// import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@material-ui/core';
import { Box, Drawer, Stack } from '@material-ui/core';

import { useNavigate } from 'react-router-dom';

import {MHidden} from '../../../components/@material-extend';

import CompanyLogo from '../../../assets/icons/Subtract.svg';
import Earnven from '../../../assets/icons/Earnven.svg';
import Account from './account/account';


const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));



Sidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};


export default function Sidebar({ isOpenSidebar, onCloseSidebar,address }){
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function mouseOver(e){
    e.target.style.background = '#242321'
  }

  function mouseOut(e){
      e.target.style.background = 'transparent'
  }

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        backgroundColor:'#000',
        '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
      }}
    >
      {/* <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
          <Logo />
        </Box>
      </Box> */}

      <Box sx={{ mb: 0, mx: 4, mt:3 }}>
          <Account address={address}/>
      </Box>

      <NavSection  navConfig={sidebarConfig} address={address}/>
      
      <center>
      <Accordion style={{width:'60%', background:'transparent'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          Tools
        </AccordionSummary>
        <AccordionDetails>
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
        </AccordionDetails>
      </Accordion>
      </center>
      {/* <Box sx={{ flexGrow: 1 }} /> */}

      <Box sx={{ px: 2.5, pb: 3, mt: 5 }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            p: 2.5,
            pt: 10,
            position: 'relative',
            bgcolor: 'black'
          }}
        >
         <img src={CompanyLogo} alt=""></img>
         <img src={Earnven} alt=""></img>
        </Stack>
        </Box>
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
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
              bgcolor: 'background.default'
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );

}
