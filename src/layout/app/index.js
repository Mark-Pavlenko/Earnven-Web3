// import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { experimentalStyled as styled } from '@material-ui/core/styles';

import Sidebar from './sidebar/sidebar';
import Header from './header/header';

import './app.css';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
        paddingTop: APP_BAR_DESKTOP + 24,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    }
}));


export default function AppLayout() {

    return (
        <RootStyle>
            <Header />
            <Sidebar />
            <MainStyle>
                <Outlet />
            </MainStyle>
        </RootStyle>

        /*  < div className='flex-container' >
             <div className='sidebar-wrapper'>
                 <Sidebar />
             </div>
             <div className='main-wrapper'>
                 <div className='header-wrapper'>
                     <Header />
                 </div>
                 <hr style={{ position: 'relative', borderTop: '0', borderBottomColor: '#737373', marginTop: '42px', marginLeft: '61px', marginRight: '342px' }}></hr>
 
                 <div className='dashboard-wrapper'>
                     <Outlet />
                 </div>
             </div>
 
         </div > */
    );
}