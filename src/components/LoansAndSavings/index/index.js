import React, { useEffect, useState } from 'react';
import { ToggleButton } from '../../styled/styledComponents';
import {
  PoolsBlock,
  Header,
  Title,
  TotalValueField,
  TotalTitle,
  TotalValue,
  InvestmentWrapper,
} from './styledComponents';
import Investment from '../../common/investment/investment';
import { useSelector } from 'react-redux';
import CompoundLogo from '../../../assets/icons/Compound.svg';
import YearnLogo from '../../../assets/icons/yearnLogo.png';
import SushiSwapLogo from '../../../assets/icons/Sushiswap.webp';
import { numberWithCommas } from '../../../commonFunctions/commonFunctions';
//import UniswapV2 from '../LiqudityPools/UniswapV2';

export default function index({ accountAddress }) {
  //save conditions of open/close investment blocks
  const [isPoolsOpen, setIsPoolsOpen] = useState(true);
  const [isStakingOpen, setIsStakingOpen] = useState(true);
  const [isFarmingOpen, setIsFarmingOpen] = useState(true);
  const [isVaultsOpen, setIsVaultsOpen] = useState(true);
  const [isDerivativesOpen, setDerivativesOpen] = useState(true);
  const [uniswapV2lpWithGaps, setUniswapV2lpWithGaps] = useState([]);

  //general
  const theme = useSelector((state) => state.themeReducer.isLightTheme);
  const poolsHandler = () => {
    setIsPoolsOpen(!isPoolsOpen);
  };
  const stakingHandler = () => {
    setIsStakingOpen(!isStakingOpen);
  };
  const farmingHandler = () => {
    setIsFarmingOpen(!isFarmingOpen);
  };
  const vaultsHandler = () => {
    setIsVaultsOpen(!isVaultsOpen);
  };
  const derivativesHandler = () => {
    setDerivativesOpen(!isDerivativesOpen);
  };

  //get the value from the synthetix child component
  const getSynthetixTokenData = (data) => {
    setSynthetixData(data);
  };

  //saga data block section
  //Compound protocol
  let compTokenDataValue = useSelector((state) => state.compoundFinance.compTokenData);
  let compTotalValue = useSelector((state) => state.compoundFinance.compTokenTotal);
  let compTokenClaim = useSelector((state) => state.compoundFinance.compClaimValue);

  //olympus data
  const olympusStakingData = useSelector((state) => state.olympusStaking.olympusTokenData);
  const olympusTokenTotal = useSelector((state) => state.olympusStaking.olympusTokenTotal);
  // //can generate SVG file in later point for olympus token
  const olympusUrl =
    'https://assets.coingecko.com/coins/images/14483/thumb/token_OHM_%281%29.png?1628311611';

  // //------Yearn.Finanace yVault data process-----------------//
  const YearnData = useSelector((state) => state.yearnFinance.yearnFinanceData);
  const YearnTotalValue = useSelector((state) => state.yearnFinance.yearnFinanceTotal);
  const YearnTokenData = useSelector((state) => state.yearnFinance.yearnYTokenData);
  const YearnTokenTotalValue = useSelector((state) => state.yearnFinance.yearnYTokenTotal);

  //sushiSwapLP token
  const SushiPoolsData = useSelector((state) => state.sushiSwap.sushiSwapLPData);
  const SushiV2Total = useSelector((state) => state.sushiSwap.sushiSwapLPTotal);

  //uniswap (need to get total value from the object and put in redux separately)
  // const uniswapV2array = useSelector((state) => state.uniswapV2stake.uniswapV2stake); //saga (incorrect data structure. Work over appropriate look)
  // const uniswapV2StakeTotal = useSelector((state) => state.uniswapV2stake.uniswapV2stakeTotal); //saga (incorrect data structure. Work over appropriate look)
  // const uniswapV2lp = useSelector((state) => state.uniswapV2lp.uniswapV2lp); //saga
  // useEffect(() => {
  //   const stringWithGaps = uniswapV2lp.map((el) => {
  //     if (el.token1Symbol === 'yDAI+yUSDC+yUSDT+yTUSD') {
  //       return {
  //         ...el,
  //         token1Symbol: el.token1Symbol.replace(/[+]/g, ' '),
  //       };
  //     } else {
  //       return { ...el };
  //     }
  //   });

  //   setUniswapV2lpWithGaps(stringWithGaps);
  // }, [uniswapV2lp]);

  return (
    <InvestmentWrapper>
      {/*=======================Liquidity Pools======================>*/}
      <PoolsBlock //first
        isLightTheme={theme}
        style={{
          display: SushiPoolsData.length > 0, //balancerV2tot
        }}>
        <Header>
          <Title isLightTheme={theme}>{'Liquidity pools'}</Title>
          <ToggleButton onClick={poolsHandler} isOpen={isPoolsOpen} />
        </Header>
        <div style={{ padding: '0 29px 20px 26px', marginBottom: '20px' }}>
          <TotalValueField isLightTheme={theme}>
            <TotalTitle isLightTheme={theme}>{'Total Value'}</TotalTitle>
            <TotalValue isLightTheme={theme}>
              ${numberWithCommas(parseFloat(SushiV2Total).toFixed(2))}
            </TotalValue>
          </TotalValueField>
        </div>
        {isPoolsOpen && (
          <React.Fragment>
            {/* Sushiswap Protocol */}
            {SushiPoolsData.length > 0 ? (
              <React.Fragment>
                <img
                  src={SushiSwapLogo}
                  style={{
                    height: '20px',
                    marginTop: '',
                    marginLeft: '15px',
                    display: 'inline-block',
                  }}
                  alt=""
                />
                Sushiswap
                {SushiPoolsData
                  ? SushiPoolsData.map((object) => {
                      return (
                        <React.Fragment>
                          <Investment
                            protocol={object}
                            protocolName={'Sushiswap'}
                            logoImage={SushiSwapLogo}
                          />
                        </React.Fragment>
                      );
                    })
                  : ''}
              </React.Fragment>
            ) : (
              ''
            )}
          </React.Fragment>
        )}
      </PoolsBlock>
      {/*====================Savings/Loans==============================>*/}
      <PoolsBlock //Savings/Loans
        isLightTheme={theme}
        style={{
          display: compTokenDataValue.length > 0,
        }}>
        <Header>
          <Title isLightTheme={theme}>{'Saving/Loans'}</Title>
          <ToggleButton onClick={stakingHandler} isOpen={isStakingOpen} />
        </Header>
        <div style={{ padding: '0 29px 20px 26px', marginBottom: '20px' }}>
          <TotalValueField isLightTheme={theme}>
            <TotalTitle isLightTheme={theme}>{'Total Value'}</TotalTitle>
            {/*<TotalEmptyCell></TotalEmptyCell>*/}
            <TotalValue isLightTheme={theme}>
              ${numberWithCommas(parseFloat(compTotalValue).toFixed(2))}
            </TotalValue>
          </TotalValueField>
        </div>
        {isStakingOpen && (
          <React.Fragment>
            {/* //Compound protocol */}
            {compTokenDataValue.length > 0 ? (
              <React.Fragment>
                <img
                  src={CompoundLogo}
                  style={{
                    height: '20px',
                    marginTop: '',
                    marginLeft: '15px',
                    display: 'inline-block',
                  }}
                  alt=""
                />
                Compound
                {compTokenDataValue
                  ? compTokenDataValue.map((object) => {
                      return (
                        <Investment
                          protocol={object}
                          protocolName={'Compound'}
                          logoImage={object.tokenImage}
                        />
                      );
                    })
                  : ''}
              </React.Fragment>
            ) : (
              ''
            )}
          </React.Fragment>
        )}
      </PoolsBlock>
      {/*==============================Vaults==============================>*/}
      <PoolsBlock //four - Vaults
        isLightTheme={theme}
        style={{
          display:
            olympusStakingData.length > 0 || YearnData.length > 0 || YearnTokenData.length > 0,
        }}>
        <Header>
          <Title isLightTheme={theme}>{'Vaults'}</Title>
          <ToggleButton onClick={vaultsHandler} isOpen={isVaultsOpen} />
        </Header>
        <div style={{ padding: '0 29px 20px 26px', marginBottom: '20px' }}>
          <TotalValueField isLightTheme={theme}>
            <TotalTitle isLightTheme={theme}>{'Total Value'}</TotalTitle>
            {/*<TotalEmptyCell></TotalEmptyCell>*/}
            <TotalValue isLightTheme={theme}>
              $
              {numberWithCommas(
                parseFloat(olympusTokenTotal + YearnTotalValue + YearnTokenTotalValue).toFixed(2)
              )}
            </TotalValue>
          </TotalValueField>
        </div>
        {isVaultsOpen && (
          <React.Fragment>
            {/* //Olympus protocol */}
            {olympusStakingData.length > 0 ? (
              <React.Fragment>
                <img
                  src={olympusUrl}
                  style={{
                    height: '20px',
                    marginTop: '',
                    marginLeft: '15px',
                    display: 'inline-block',
                  }}
                  alt=""
                />
                Olympus
                {olympusStakingData
                  ? olympusStakingData.map((object) => {
                      return (
                        <Investment
                          protocol={object}
                          protocolName={'Olympus'}
                          logoImage={object.tokenImage}
                        />
                      );
                    })
                  : ''}
              </React.Fragment>
            ) : (
              ''
            )}
            {/* Yearn Finance protocol*/}
            {YearnData.length > 0 || YearnTokenData.length > 0 ? (
              <React.Fragment>
                <img
                  src={YearnLogo}
                  style={{
                    height: '20px',
                    marginTop: '',
                    marginLeft: '15px',
                    display: 'inline-block',
                  }}
                  alt=""
                />
                Yearn
                {YearnData
                  ? YearnData.map((object) => {
                      return (
                        <Investment
                          protocol={object}
                          protocolName={'yearnFinance'}
                          logoImage={object.tokenImage}
                        />
                      );
                    })
                  : ''}
                {YearnTokenData
                  ? YearnTokenData.map((object) => {
                      return (
                        <Investment
                          protocol={object}
                          protocolName={'yearnFinance'}
                          logoImage={object.tokenImage}
                        />
                      );
                    })
                  : ''}
              </React.Fragment>
            ) : (
              ''
            )}
          </React.Fragment>
        )}
      </PoolsBlock>
    </InvestmentWrapper>
  );
  //<div>Testing dashboard</div> );
}
