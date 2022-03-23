import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import tokenURIs from '../Exchange/tokenURIs';
import Typography from '@material-ui/core/Typography';
import actionTypes from '../../constants/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import CurveLogo from '../../assets/icons/curve-icon.svg';
import SearchIcon from '../../assets/icons/copy-icon.svg';
import BancorLogo from '../../assets/icons/bancor-icon.svg';
import SushiswapLogo from '../../assets/icons/Sushiswap.webp';
import UniswapIcon from '../../assets/icons/uniswap-icon.svg';
import BalancerLogo from '../../assets/icons/balancer-icon.svg';
import Curve from '../../components/liquidityPoolContents/Curve';
import UniV3 from '../../components/liquidityPoolContents/UniV3';
import UniswapV3Logo from '../../assets/icons/uniswapV3-icon.svg';
import Bancor from '../../components/liquidityPoolContents/Bancor';
import SushiV2 from '../../components/liquidityPoolContents/SushiV2';
import SearchIconLight from '../../assets/icons/searchIconLight.svg';
import UniV2 from '../../components/liquidityPoolContents/uniV2/UniV2';
import Balancer from '../../components/liquidityPoolContents/Balancer';
import {
  addLiquidity,
  removeLiquidity,
  addLiquidityNormal,
  removeLiquidityNormal,
} from './helpers';

import {
  Input,
  AllTabs,
  Wrapper,
  LabelTab,
  PanelTab,
  LabelIcon,
  SearchImg,
  InputBlock,
  PoolsTitle,
  ComingBlock,
  Description,
} from '../style';
import axios from 'axios';
import UniswapV2 from '../../components/LoansAndSavings/LiqudityPools/UniswapV2';
import { InvestPoolsTable } from '../../components/liquidityPoolContents/liquidityPoolsTable/investPoolsTable/investPoolsTable';
import { AddNewGroupButton } from '../../components/liquidityPoolContents/uniV2/StyledComponents';

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
  const uniswapV2lp = useSelector((state) => state.uniswapV2lp.uniswapV2lp);
  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);
  const SushiPoolsData = useSelector((state) => state.sushiSwap.sushiSwapLPData);
  const accountAddress = useSelector((state) => state.initSidebarValuesReducer.selectedAddress);
  console.log('fvbdgfdvfd1', SushiPoolsData);
  console.log('fvbdgfdvfd', uniswapV2lp);
  const dispatch = useDispatch();

  const [page, setPage] = useState(5);
  const [Loading, setLoading] = useState(false);
  const [commonPoolsArray, setCommonPoolsArray] = useState([]);

  useEffect(() => {
    const correctSushiProtocolDataStructure = (protocol) => {
      setLoading(true);
      return protocol.map((el) => {
        return {
          imageData: [el.token0Image, el.token1Image],
          symbol: `${el.token0Symbol} ${el.token1Symbol}`,
          name: `${el.token0Symbol} ${el.token1Symbol}`,
          poolDetails: {
            token0Address: el.token0Id,
            token1Address: el.token1Id,
          },
          balance: el.balance,
          liquidity: el.liquidity,
          price: el.price,
          value: el.value,
          volume: el.volume,
          token0Symbol: el.token0Symbol,
          token1Symbol: el.token1Symbol,
          protocol: el.protocol,
        };
      });
    };
    const myPoolsData = correctSushiProtocolDataStructure(SushiPoolsData);
    console.log('fvbdgfdvfd2', myPoolsData);
    const commonPoolsArray = [...myPoolsData, ...uniswapV2lp];
    setCommonPoolsArray(commonPoolsArray);
    setLoading(false);
  }, [SushiPoolsData, uniswapV2lp]);

  const [value, setValue] = React.useState(0);
  const [inputValue, setInputValue] = React.useState('');
  const [AllTokens, setAllTokens] = useState([]);

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
    dispatch({ type: actionTypes.SET_RECEIVE_TOKENS_LIST });
  }, []);

  const addNewPoolsPortion = (array, elementAmount) => {
    return array.filter((el, index) => {
      return index <= elementAmount - 1;
    });
  };
  const poolsLimitedAmount = addNewPoolsPortion(commonPoolsArray, page);

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
        {poolsLimitedAmount.length > 0 && (
          <>
            <PoolsTitle isLightTheme={isLightTheme}>{'My pools'}</PoolsTitle>
            <InvestPoolsTable
              data={poolsLimitedAmount}
              addLiquidity={addLiquidity}
              removeLiquidity={removeLiquidity}
              addLiquidityNormal={addLiquidityNormal}
              removeLiquidityNormal={removeLiquidityNormal}
            />
            {page < commonPoolsArray.length && (
              <center>
                <AddNewGroupButton
                  isLightTheme={isLightTheme}
                  onClick={(e) => {
                    setPage(page + 5);
                  }}>
                  {Loading ? 'Loading...' : 'More Pools'}
                </AddNewGroupButton>
              </center>
            )}
          </>
        )}
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
