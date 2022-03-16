import React, { useEffect, useState } from 'react';
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
  Mobile,
  DashboardTabsLayout,
  PortocolLoadingBlock,
  LoadingSpinner,
} from './styledComponents';
import axios from 'axios';
import Protocols from '../../components/LoansAndSavings/Protocols/index';
import CircularProgress from '@mui/material/CircularProgress';

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
  const [isLoading, setisLoading] = useState(true);
  const timer = React.useRef();

  const [totalValue, settotalValue] = useState('00.00');
  console.log('totalValue', totalValue);

  function CommaFormatted(amount) {
    const delimiter = ','; // replace comma if desired
    const ab = amount.split('.', 2);
    const d = ab[1];
    let i = parseInt(ab[0]);
    if (isNaN(i)) {
      return '';
    }
    let minus = '';
    if (i < 0) {
      minus = '-';
    }
    i = Math.abs(i);
    let n = i.toString();
    const a = [];
    while (n.length > 3) {
      const nn = n.substr(n.length - 3);
      a.unshift(nn);
      n = n.substr(0, n.length - 3);
    }
    if (n.length > 0) {
      a.unshift(n);
    }
    n = a.join(delimiter);
    if (d.length < 1) {
      amount = n;
    } else {
      amount = `${n}.${d}`;
    }
    amount = minus + amount;
    return amount;
  }

  useEffect(() => {
    const accountAddress = address;

    async function getBalance() {
      try {
        await axios
          .get(
            `https://api2.ethplorer.io/getAddressChartHistory/${accountAddress}?apiKey=ethplorer.widget`,
            {},
            {}
          )
          .then(async (response) => {
            // console.log(response.data.history.data)
            const res = response.data.history.data;
            // console.log(res[res.length-1].balance)
            settotalValue(CommaFormatted(parseFloat(res[res.length - 1].balance).toFixed(2)));
          });
      } catch {
        // do smth.
      }
    }
    getBalance();
  }, [totalValue, address]);

  const currentWallet = localStorage.getItem('selected-account');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const connectEtherScan = () => {
    window.open(`https://etherscan.io/address/${currentWallet}`, '_blank');
  };

  useEffect(() => {
    timer.current = setTimeout(() => {
      setisLoading(false);
    }, 10000);
  }, [address]);

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Protocols accountAddress={address} />
      <DashboardTabsLayout>
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
      </DashboardTabsLayout>
      <TabPanel value={value} index={0}>
        <Page title="Dashboard">
          <Container>
            <MainBlocks>
              <LeftSideWrapper>
                <PortfolioPerf address={address} totalValue={`$${totalValue}`} theme={theme} />
                <Mobile>
                  <AllAssets isLightTheme={theme} address={address} />
                </Mobile>
                <br />
                {isLoading == true ? (
                  <PortocolLoadingBlock isLightTheme={theme}>
                    <LoadingSpinner>
                      <CircularProgress size={22} />
                    </LoadingSpinner>
                    &nbsp;&nbsp;<div>Please wait while protocol data is fetching</div>
                    <div></div>
                  </PortocolLoadingBlock>
                ) : (
                  <LoansAndSavings accountAddress={address} />
                )}

                {/* <LoansAndSavings accountAddress={address} /> */}
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
