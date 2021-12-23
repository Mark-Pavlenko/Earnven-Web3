import React, { useState } from 'react';
import './dashboard.css';
import NFT from '../NFT';
import History from '../History';
import DashboardTabs from './tabs/tabs';
import Page from '../../components/Page';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Balance from '../../components/Balance';
import sendIcon from '../../assets/icons/send-icon.svg';
import { Box, Container, Grid } from '@material-ui/core';
import AllAssets from '../../components/allAssets/generalAssets/assets';
import LoansAndSavings from '../../components/LoansAndSavings';
import etherScanIcon from '../../assets/icons/etherScan-icon.svg';
import etherScanDark from '../../assets/icons/etherScanDark-icon.svg';
import PortfolioPerf from '../../components/portfolioperf/portfolioperf';
import { TokenButtonsBlock, SendButton, EtherScanButton } from './styledComponents';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export default function Dashboard({ test, changeTheme }) {
  const theme = useSelector((state) => state.themeReducer.isLightTheme);
  const { address } = useParams();
  const [value, setValue] = useState(0);

  const ownWallet = '0x49a2dcc237a65cc1f412ed47e0594602f6141936';
  const currentWallet = localStorage.getItem('selected-account');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', mt: 3 }}>
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <DashboardTabs isLightTheme={theme} toggleTabsHandler={handleChange} />
        <TokenButtonsBlock>
          {currentWallet === ownWallet && <SendButton isLightTheme={theme} icon={sendIcon} />}
          <EtherScanButton
            isLightTheme={theme}
            icon={etherScanIcon}
            etherScanDark={etherScanDark}
          />
        </TokenButtonsBlock>
      </Box>
      <TabPanel value={value} index={0}>
        <Page title="Dashboard">
          <Container maxWidth="xl">
            <Balance address={address} />
            <Grid container spacing={6}>
              <Grid item xs={12} md={8}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={12}>
                    <PortfolioPerf address={address} />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <AllAssets address={address} />
                    <br />
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
        <NFT changeTheme={changeTheme} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <History />
      </TabPanel>
    </Box>
  );
}
