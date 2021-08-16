
// material
import { Container, Divider } from '@material-ui/core';
// components
import Page from '../../components/Page';
// import AllAssetsMini from '../../components/allAssetsMini';
import AllAssets from '../../components/allAssets/index copy'
// import TotalValueBox from '../../components/totalValueBox';
// import DefiAssets from '../../components/defiAssets';
import PortfolioPerf from '../../components/portfolioperf/portfolioperf';
import Balance from '../../components/Balance';
// import { Link } from 'react-router-dom';
import './dashboard.css';
import { Grid, Button, Stack, Typography, Box, Tab, Tabs } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoansAndSavings from '../../components/LoansAndSavings'
import { useState } from 'react';
import History from '../History';
import NFT from '../NFT'
// import { useNavigate } from 'react-router-dom';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box >
                    {/* <Typography>{children}</Typography> */}
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Dashboard() {
    let { address } = useParams();
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    // const navigate = useNavigate();

    const routeToNft = () => {
        navigate(`/${address}/nftdesign`);
    }
    const routeToHistory = () => {
        navigate(`/${address}/history`)
    };



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        /*  <Page title="Dashboard">
             <Container maxWidth="xl">
                 <Stack direction='row' spacing={1} sx={{ marginTop: "-16px" }}>
                     <Button variant='text' sx={{ fontSize: '20px', color: "#737373", pt: 0 }}>Dashboard</Button>
                     <Button variant='text' sx={{ fontSize: '20px', color: "#737373", pt: 0 }} onClick={routeToNft}>NFT Collection</Button>
                     <Button variant='text' sx={{ fontSize: '20px', color: "#737373", pt: 0 }} onClick={routeToHistory}>History</Button>
                 </Stack>
 
                 <Balance address={address} />
                 <Grid container spacing={6}>
                     <Grid item xs={12} md={8}>
                         <Grid container spacing={1}>
                             <Grid item xs={12} md={12}>
                                 <PortfolioPerf address={address} />
                             </Grid>
                             <Grid item xs={12} md={12}>
                                 <AllAssets address={address} /><br />
                             </Grid>
                         </Grid>
 
                     </Grid>
                     <Grid item xs={12} md={4}>
                         <Grid container spacing={1}>
                             <LoansAndSavings accountAddress={address} />
                         </Grid>
                     </Grid>
                 </Grid>
             </Container>
         </Page> */
        <Box sx={{ width: '100%',mt:3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Dashboard" {...a11yProps(0)} />
                    <Tab label="Nft Collection" {...a11yProps(1)} />
                    <Tab label="History" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Page title="Dashboard">
                    <Container maxWidth="xl">
                       {/*  <Stack direction='row' spacing={1} sx={{ marginTop: "-16px" }}>
                            <Button variant='text' sx={{ fontSize: '20px', color: "#737373", pt: 0 }}>Dashboard</Button>
                            <Button variant='text' sx={{ fontSize: '20px', color: "#737373", pt: 0 }} onClick={routeToNft}>NFT Collection</Button>
                            <Button variant='text' sx={{ fontSize: '20px', color: "#737373", pt: 0 }} onClick={routeToHistory}>History</Button>
                        </Stack> */}

                        <Balance address={address} />
                        <Grid container spacing={6}>
                            <Grid item xs={12} md={8}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={12}>
                                        <PortfolioPerf address={address} />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <AllAssets address={address} /><br />
                                    </Grid>
                                </Grid>

                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Grid container spacing={1}>
                                    <LoansAndSavings accountAddress={address} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </Page>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <NFT />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <History />
            </TabPanel>
        </Box>
    );
}

