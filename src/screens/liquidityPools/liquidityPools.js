import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Bancor from '../../components/liquidityPoolContents/Bancor';
import Curve from '../../components/liquidityPoolContents/Curve';
import UniV2 from '../../components/liquidityPoolContents/uniV2/UniV2';
import SushiV2 from '../../components/liquidityPoolContents/SushiV2';
import Balancer from '../../components/liquidityPoolContents/Balancer';
import UniV3 from '../../components/liquidityPoolContents/UniV3';
import UniswapIcon from '../../assets/icons/uniswap-icon.svg';
import SushiswapLogo from '../../assets/icons/Sushiswap.webp';
import UniswapV3Logo from '../../assets/icons/uniswapV3-icon.svg';
import BalancerLogo from '../../assets/icons/balancer-icon.svg';
import BancorLogo from '../../assets/icons/bancor-icon.svg';
import CurveLogo from '../../assets/icons/curve-icon.svg';
import InchLogo from '../../assets/icons/inch-icon.svg';
import SearchIcon from '../../assets/icons/copy-icon.svg';
import SearchIconLight from '../../assets/icons/searchIconLight.svg';

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
} from '../style';
import { useDispatch, useSelector } from 'react-redux';
import { InvestPoolsTable } from '../../components/liquidityPoolContents/liquidityPoolsTable/investPoolsTable/investPoolsTable';
import mockTokenImage from '../../assets/icons/ethereum.svg';
import axios from 'axios';
import tokenURIs from '../Exchange/tokenURIs';
import mkrImage from '../../assets/icons/mkr.svg';
import aaveImage from '../../assets/icons/aave-logo.svg';
import balancerImage from '../../assets/icons/balancer-icon.svg';
import actionTypes from '../../constants/actionTypes';
import UniswapV2 from '../../components/LoansAndSavings/LiqudityPools/UniswapV2';
import { InvestmentWrapper } from '../../components/LoansAndSavings/index/styledComponents';

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
  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);
  const SushiPoolsData = useSelector((state) => state.sushiSwap.sushiSwapLPData);
  const uniswapV2lp = useSelector((state) => state.uniswapV2lp.uniswapV2lp);
  const accountAddress = useSelector((state) => state.initSidebarValuesReducer.selectedAddress);

  const [commonPoolsArray, setCommonPoolsArray] = useState([]);
  console.log('coooooommon', commonPoolsArray);

  useEffect(() => {
    const correctSushiProtocolDataStructure = (protocol) => {
      return protocol.map((el) => {
        return {
          imageData: [el.token0Image, el.token1Image],
          name: `${el.token0Symbol} ${el.token1Symbol}`,
          symbol: `${el.token0Symbol} ${el.token1Symbol}`,
          balance: el.balance,
          liquidity: el.liquidity,
          price: el.price,
          value: el.value,
          volume: el.volume,
          token0Id: el.token0Id,
          token1Id: el.token1Id,
        };
      });
    };
    const myPoolsData = correctSushiProtocolDataStructure(SushiPoolsData);
    const commonPoolsArray = [...myPoolsData, ...uniswapV2lp];
    setCommonPoolsArray(commonPoolsArray);
  }, [SushiPoolsData, uniswapV2lp]);

  const [value, setValue] = React.useState(0);
  const [inputValue, setInputValue] = React.useState('');
  const [AllTokens, setAllTokens] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    const getSushiSwapLPData = async () => {
      const sushiSwapObjects = { accountAddress: accountAddress };
      try {
        dispatch({
          type: actionTypes.SET_SUSHILP_DATA,
          payload: sushiSwapObjects,
        });
      } catch (err) {
        console.log('Dispatch error in sushu=iswapLP process', err.message);
      }
    };
    getSushiSwapLPData();
  }, [accountAddress]);

  useEffect(() => {
    async function getData() {
      let fetchedTokens;
      await axios.get(`https://api.0x.org/swap/v1/tokens`, {}, {}).then(async (response) => {
        setAllTokens(response.data.records);
        fetchedTokens = response.data.records;
      });
      await axios
        .get(`https://tokens.coingecko.com/uniswap/all.json`, {}, {})
        .then(async (response) => {
          let data = response.data.tokens;
          let tokens = fetchedTokens.map((token) => ({
            ...token,
            logoURI: data.find((x) => x.address === token.address)
              ? data.find((x) => x.address === token.address).logoURI
              : tokenURIs.find((x) => x.address === token.address).logoURI,
          }));
          setAllTokens(tokens);
        })
        .catch((res) => {
          console.log('liquidity pools Sushiswap-V2 returns error', res);
        });
    }
    getData();
  }, []);

  const inputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <UniswapV2 accountAddress={accountAddress} />
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
        {/*===============>  MY POOLS*/}
        <PoolsTitle isLightTheme={isLightTheme}>{'My pools'}</PoolsTitle>
        <InvestPoolsTable
          //data={Data}
          data={commonPoolsArray}
          type={'sushiswap'}
          AllTokens={AllTokens}
          // addLiquidity={addLiquidity}
          // addLiquidityNormal={addLiquidityNormal}
        />
        {/*===============>  MY POOLS*/}
        <PoolsTitle isLightTheme={isLightTheme}>{'Available pools'}</PoolsTitle>
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
        <UniV2 inputValue={inputValue} AllTokens={AllTokens} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SushiV2 inputValue={inputValue} AllTokens={AllTokens} />
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
