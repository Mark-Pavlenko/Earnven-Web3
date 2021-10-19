import {Box, Container, Grid, Tab, Tabs} from '@material-ui/core';
import Page from '../../components/Page';
import AllAssets from '../../components/allAssets/index copy'
import PortfolioPerf from '../../components/portfolioperf/portfolioperf';
import Balance from '../../components/Balance';
import './dashboard.css';
import {useParams} from 'react-router-dom';
import LoansAndSavings from '../../components/LoansAndSavings'
import React, {useState} from 'react';
import History from '../History';
import NFT from '../NFT'

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
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
    let {address} = useParams();
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <Box sx={{width: '100%', mt: 3}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Dashboard" {...a11yProps(0)} />
                    <Tab label="Nft Collection" {...a11yProps(1)} />
                    <Tab label="History" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Page title="Dashboard">
                    <Container maxWidth="xl">
                        <Balance address={address}/>
                        <Grid container spacing={6}>
                            <Grid item xs={12} md={8}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={12}>
                                        <PortfolioPerf address={address}/>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <AllAssets address={address}/><br/>
                                    </Grid>
                                </Grid>

                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Grid container spacing={1}>
                                    <LoansAndSavings accountAddress={address}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </Page>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <NFT/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <History/>
            </TabPanel>
        </Box>
    );
}

