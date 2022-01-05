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
import AllAssets from '../../components/allAssets/generalAssets/assets/assets';
import LoansAndSavings from '../../components/LoansAndSavings/index';
import etherScanIcon from '../../assets/icons/etherScan-icon.svg';
import etherScanDark from '../../assets/icons/etherScanDark-icon.svg';
import PortfolioPerf from '../../components/portfolioperf/portfolioperf';
import {
  TokenButtonsBlock,
  SendButton,
  EtherScanButton,
  MainBlocks,
  LeftSideWrapper,
  RightSideWrapper,
} from './styledComponents';

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

  const currentWallet = localStorage.getItem('selected-account');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const connectEtherScan = () => {
    window.open(`https://etherscan.io/address/${currentWallet}`, '_blank');
  };

  return (
    <Box sx={{ width: '100%', mt: 3 }}>
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <DashboardTabs isLightTheme={theme} toggleTabsHandler={handleChange} />
        <TokenButtonsBlock>
          <SendButton isLightTheme={theme} icon={sendIcon} />
          <EtherScanButton
            onClick={connectEtherScan}
            isLightTheme={theme}
            icon={etherScanIcon}
            etherScanDark={etherScanDark}
          />
        </TokenButtonsBlock>
      </Box>
      <TabPanel value={value} index={0}>
        <Page title="Dashboard">
          <Container>
            <Balance address={address} />
            <MainBlocks>
              <LeftSideWrapper>
                <PortfolioPerf address={address} />
                <LoansAndSavings accountAddress={address} />
              </LeftSideWrapper>
              <RightSideWrapper>
                <AllAssets isLightTheme={theme} address={address} />
              </RightSideWrapper>
            </MainBlocks>
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
