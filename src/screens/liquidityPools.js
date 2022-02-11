import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Bancor from '../components/liquidityPoolContents/Bancor';
import Curve from '../components/liquidityPoolContents/Curve';
import UniV2 from '../components/liquidityPoolContents/uniV2/UniV2';
import SushiV2 from '../components/liquidityPoolContents/SushiV2';
import Balancer from '../components/liquidityPoolContents/Balancer';
import UniV3 from '../components/liquidityPoolContents/UniV3';
import UniswapIcon from '../assets/icons/uniswap-icon.svg';
import SushiswapLogo from '../assets/icons/Sushiswap.webp';
import UniswapV3Logo from '../assets/icons/uniswapV3-icon.svg';
import BalancerLogo from '../assets/icons/balancer-icon.svg';
import BancorLogo from '../assets/icons/bancor-icon.svg';
import CurveLogo from '../assets/icons/curve-icon.svg';
import InchLogo from '../assets/icons/inch-icon.svg';
import SearchIcon from '../assets/icons/copy-icon.svg';
import SearchIconLight from '../assets/icons/searchIconLight.svg';

import {
  AllTabs,
  ComingBlock,
  Description,
  Input,
  InputBlock,
  LabelIcon,
  LabelTab,
  PanelTab,
  PoolsTitle,
  SearchImg,
  Wrapper,
} from './style';
import { useSelector } from 'react-redux';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <PanelTab
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </PanelTab>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function LiquidityPools() {
  const [value, setValue] = React.useState(0);
  const [inputValue, setInputValue] = React.useState('');
  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);

  const inputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Wrapper>
        <Description isLightTheme={isLightTheme}>
          Liquidity providers earn a 0.3% fee on all trades proportional to their share of the pool.
          <br />
          Fees are added to the pool, accrue in real-time, and can be claimed by withdrawing your
          liquidity.
        </Description>
        <InputBlock>
          <Input
            onChange={inputChange}
            isLightTheme={isLightTheme}
            placeholder="Search by pool or token..."
            type="text"
          />
          <SearchImg src={isLightTheme ? SearchIcon : SearchIconLight} alt="" />
        </InputBlock>
        <PoolsTitle isLightTheme={isLightTheme}>Available pools</PoolsTitle>
      </Wrapper>

      <Box>
        <AllTabs
          isLightTheme={isLightTheme}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example">
          <Tab
            label={
              <LabelTab>
                <div>
                  <LabelIcon src={UniswapIcon} alt="" />
                </div>
                <div>Uniswap V2</div>
              </LabelTab>
            }
            {...a11yProps(0)}
          />
          <Tab
            label={
              <LabelTab>
                <div>
                  <LabelIcon src={SushiswapLogo} alt="" />
                </div>
                <div>Sushiswap V2</div>
              </LabelTab>
            }
            {...a11yProps(1)}
          />
          <Tab
            label={
              <div>
                <LabelTab>
                  <div>
                    <LabelIcon src={UniswapV3Logo} alt="" />
                  </div>
                  <div>Uniswap V3</div>
                </LabelTab>
                <ComingBlock isLightTheme={isLightTheme}>Coming soon</ComingBlock>
              </div>
            }
            {...a11yProps(2)}
            disabled
          />
          <Tab
            label={
              <div>
                <LabelTab>
                  <div>
                    <LabelIcon src={BalancerLogo} alt="" />
                  </div>
                  <div>Balancer</div>
                </LabelTab>
                <ComingBlock isLightTheme={isLightTheme}>Coming soon</ComingBlock>
              </div>
            }
            {...a11yProps(3)}
            disabled
          />
          <Tab
            label={
              <div>
                <LabelTab>
                  <div>
                    <LabelIcon src={BancorLogo} alt="" />
                  </div>
                  <div>Bancor</div>
                </LabelTab>
                <ComingBlock isLightTheme={isLightTheme}>Coming soon</ComingBlock>
              </div>
            }
            {...a11yProps(4)}
            disabled
          />
          <Tab
            label={
              <div>
                <LabelTab>
                  <div>
                    <LabelIcon src={CurveLogo} alt="" />
                  </div>
                  <div>Curve</div>
                </LabelTab>
                <ComingBlock isLightTheme={isLightTheme}>Coming soon</ComingBlock>
              </div>
            }
            {...a11yProps(5)}
            disabled
          />
        </AllTabs>
      </Box>
      <TabPanel value={value} index={0}>
        <UniV2 inputValue={inputValue} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SushiV2 inputValue={inputValue} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Balancer />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <UniV3 />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Bancor />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Curve />
      </TabPanel>
    </Box>
  );
}
