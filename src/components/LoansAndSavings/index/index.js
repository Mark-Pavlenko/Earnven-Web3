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
  LoadingSpinner,
  PortocolLoadingBlock,
} from './styledComponents';
import Investment from '../../common/investment/investment';
import { useSelector } from 'react-redux';
import CompoundLogo from '../../../assets/icons/Compound.svg';
import YearnLogo from '../../../assets/icons/yearnLogo.png';
import SushiSwapLogo from '../../../assets/icons/Sushiswap.webp';
import ETHLogo from '../../../assets/icons/eth.png';
import CurveLogo from '../../../assets/icons/curveLogo.png';
import aaveLogo from '../../../assets/icons/aave-logo.svg';
import SnowSwapLogo from '../../../assets/icons/snowswap-snow-logo.svg';
import BalancerLogo from '../../../assets/icons/balancer.png';
import pickleLogo from '../../../assets/icons/pickle_finance_logo.webp';
import uniSwapLogo from '../../../assets/icons/Uniswap.webp';
import { numberWithCommas } from '../../../commonFunctions/commonFunctions';
import CircularProgress from '@mui/material/CircularProgress';

export default function index({ accountAddress }) {
  //save conditions of open/close investment blocks
  const [isPoolsOpen, setIsPoolsOpen] = useState(true);
  const [isStakingOpen, setIsStakingOpen] = useState(true);
  const [isFarmingOpen, setIsFarmingOpen] = useState(true);
  const [isVaultsOpen, setIsVaultsOpen] = useState(true);
  const [isDerivativesOpen, setDerivativesOpen] = useState(true);
  const [uniswapV2lpWithGaps, setUniswapV2lpWithGaps] = useState([]);
  const [uniSwapV2lpTotal, setuniSwapV2lpTotal] = useState(0);

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
  const issushiSwapLpIsLoading = useSelector((state) => state.sushiSwap.sushiSwapLpIsLoading);

  //Sushi Staking
  const sushiStakeData = useSelector((state) => state.sushiStaking.sushiStakeData);
  const sushiStakeTotal = useSelector((state) => state.sushiStaking.sushiStakeTotal);

  //Ethereum 2.0
  const eth2StakeData = useSelector((state) => state.eth2Stake.eth2StakeData);
  const eth2StakeTotal = useSelector((state) => state.eth2Stake.eth2StakeTotal);

  //liquity
  const liquityTokenData = useSelector((state) => state.liquityToken.liquityTokenData); //saga
  const liquityTokenTotal = useSelector((state) => state.liquityToken.liquityTokenTotal); //saga
  const isliquityTokenIsLoading = useSelector((state) => state.liquityToken.liquityTokenIsLoading);
  //if need create svg file on later
  const liquityImageUrl =
    'https://assets.coingecko.com/coins/images/14665/thumb/200-lqty-icon.png?1617631180';
  //Curve
  const CrvStakingTokenData = useSelector((state) => state.curveStaking.curveStakingData);
  const CrvStakingTokenTotal = useSelector((state) => state.curveStaking.curveStakingTotal);
  const curveToken = useSelector((state) => state.curveToken.curveTokenData); //saga
  const curveTokenTotal = useSelector((state) => state.curveToken.curveTokenTotal); //saga

  const curveLpToken = useSelector((state) => state.curveLpToken.curveLpTokenData);
  const curveLpTokenTotal = useSelector((state) => state.curveLpToken.curveLpTokenTotal);
  const iscurveLpTokenIsLoading = useSelector((state) => state.curveLpToken.curveLpTokenIsLoading);

  //AAVE -- Aave protocol not moved to saga so using from useEffect for now
  const AaveStakingData = useSelector((state) => state.AaveStaking.AaveStakingData); //saga
  const AaveStakingTotal = useSelector((state) => state.AaveStaking.AaveStakingTotal); //saga

  //Synthetix
  const snxTokenData = useSelector((state) => state.Synthetix.snxTokenData); //saga
  const snxTokenTotal = useSelector((state) => state.Synthetix.snxTokenTotal); //saga
  const snxCollateralData = useSelector((state) => state.Synthetix.snxCollateralData); //saga
  const snxCollateralTotal = useSelector((state) => state.Synthetix.snxCollateralTotal); //saga
  //can create SVG file later if needed.
  const snxImageUrl = 'https://assets.coingecko.com/coins/images/3406/thumb/SNX.png?1598631139';

  //Convex Staking
  const convexStakeData = useSelector((state) => state.convexStake.convexStakeData);
  const convexStakeTotal = useSelector((state) => state.convexStake.convexStakeTotal);
  //can create SVX file at later if needed.
  const convexImageUrl =
    'https://assets.coingecko.com/coins/images/15585/thumb/convex.png?1621256328';

  //SnowSwap token
  const snowSwapData = useSelector((state) => state.snowSwap.snowSwanData);
  const snowSwapTotal = useSelector((state) => state.snowSwap.snowSwapTotal);
  const issnowSwapIsLoading = useSelector((state) => state.snowSwap.snowSwapIsLoading);

  //CreamIronBank
  const creamIronBankData = useSelector((state) => state.creamIronBank.creamIronBankData);
  const creamIronBankTotal = useSelector((state) => state.creamIronBank.creamIronBankTotal);
  const creamImageUrl =
    'https://assets.coingecko.com/coins/images/11976/thumb/Cream.png?1596593418';

  //balancer V2
  //balancerV2
  const balancerV2lp = useSelector((state) => state.balancerV2lp.balancerV2lp); //saga
  const balancerV2tot = useSelector((state) => state.balancerV2lp.balancerV2tot); //
  const isbalancerProtocolisLoading = useSelector(
    (state) => state.balancerV2lp.balancerProtocolisLoading
  );
  //pickle
  // const pickeStake = useSelector((state) => state.pickeStake.pickeStake); //saga
  // const pickleStakeTotal = useSelector((state) => state.pickeStake.pickleStakeTotal); //saga
  const pickeDill = useSelector((state) => state.pickeDill.pickeDill); //saga
  const pickeDillTotal = useSelector((state) => state.pickeDill.pickeDillTotal); //saga

  //uniswap (need to get total value from the object and put in redux separately)
  const uniswapV2lp = useSelector((state) => state.uniswapV2lp.uniswapV2lp); //saga
  const isuniswapProtocolisLoading = useSelector(
    (state) => state.uniswapV2lp.uniswapProtocolisLoading
  ); //saga boolean

  const uniswapV2stake = useSelector((state) => state.uniswapV2stake.uniswapV2stake);
  const uniswapV2stakeTotal = useSelector((state) => state.uniswapV2stake.uniswapV2stakeTotal);

  //get the total value of uniSwapV2
  useEffect(() => {
    function getUniSwapV2Total() {
      //get the total value of the unuswap tokens
      if (uniswapV2lp.length > 0) {
        let uniSwapv2Total = 0;
        uniswapV2lp.map((object) => {
          uniSwapv2Total += parseFloat(object.value);
          setuniSwapV2lpTotal(uniSwapv2Total);
        });
      }
    }
    getUniSwapV2Total();
  }, [uniswapV2lp]);

  return (
    <InvestmentWrapper>
      {/*=======================Liquidity Pools======================>*/}
      <PoolsBlock //first
        isLightTheme={theme}
        style={{
          display:
            SushiPoolsData.length > 0 ||
            curveLpToken.length > 0 ||
            snowSwapData.length > 0 ||
            liquityTokenData.length > 0 ||
            uniswapV2lp.length > 0 ||
            balancerV2lp.length > 0,
        }}>
        <Header>
          <Title isLightTheme={theme}>{'Liquidity pools'}</Title>
          <ToggleButton onClick={poolsHandler} isOpen={isPoolsOpen} />
        </Header>
        <div style={{ padding: '0 29px 20px 26px', marginBottom: '20px' }}>
          <TotalValueField isLightTheme={theme}>
            <TotalTitle isLightTheme={theme}>{'Total Value'}</TotalTitle>
            <TotalValue isLightTheme={theme}>
              $
              {numberWithCommas(
                parseFloat(
                  parseFloat(SushiV2Total) +
                    parseFloat(curveLpTokenTotal) +
                    parseFloat(balancerV2tot) +
                    parseFloat(liquityTokenTotal) +
                    parseFloat(snowSwapTotal) +
                    parseFloat(uniSwapV2lpTotal)
                ).toFixed(2)
              )}
            </TotalValue>
          </TotalValueField>
        </div>
        {isPoolsOpen && (
          <React.Fragment>
            <>
              {/* Sushiswap Protocol */}
              {issushiSwapLpIsLoading == true ? (
                <PortocolLoadingBlock isLightTheme={theme}>
                  <LoadingSpinner isLightTheme={theme}>
                    <CircularProgress />
                  </LoadingSpinner>
                  <div>Sushiswap </div>
                  <div>Data is fetching</div>
                </PortocolLoadingBlock>
              ) : (
                <>
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
                </>
              )}
              <br />

              {/*curveLpToken/*/}
              {iscurveLpTokenIsLoading == true ? (
                <PortocolLoadingBlock isLightTheme={theme}>
                  <LoadingSpinner>
                    <CircularProgress />
                  </LoadingSpinner>
                  <div>Curve </div>
                  <div>Data is fetching</div>
                </PortocolLoadingBlock>
              ) : (
                <>
                  {curveLpToken.length > 0 ? (
                    <>
                      <img
                        src={CurveLogo}
                        style={{
                          height: '20px',
                          marginTop: '',
                          marginLeft: '15px',
                          display: 'inline-block',
                        }}
                        alt=""
                      />
                      Curve Pool
                      {curveLpToken.map((object) => {
                        return (
                          <Investment
                            protocol={object}
                            protocolName={'Curve Pool'}
                            logoImage={CurveLogo}
                          />
                        );
                      })}
                    </>
                  ) : (
                    ''
                  )}
                </>
              )}
              <br />

              {/* SnowSwap protocol */}
              {issnowSwapIsLoading == true ? (
                <PortocolLoadingBlock isLightTheme={theme}>
                  <LoadingSpinner>
                    <CircularProgress />
                  </LoadingSpinner>
                  <div>SnowSwap </div>
                  <div>Data is fetching</div>
                </PortocolLoadingBlock>
              ) : (
                <>
                  {snowSwapData.length > 0 ? (
                    <React.Fragment>
                      <img
                        src={SnowSwapLogo}
                        style={{
                          height: '20px',
                          marginTop: '',
                          marginLeft: '15px',
                          display: 'inline-block',
                        }}
                        alt=""
                      />
                      SnowSwap
                      {snowSwapData
                        ? snowSwapData.map((object) => {
                            return (
                              <Investment
                                protocol={object}
                                protocolName={'SnowSwap'}
                                logoImage={SnowSwapLogo}
                              />
                            );
                          })
                        : ''}
                    </React.Fragment>
                  ) : (
                    ''
                  )}
                </>
              )}
              <br />

              {/*liquityTokenData/*/}
              {isliquityTokenIsLoading == true ? (
                <PortocolLoadingBlock isLightTheme={theme}>
                  <LoadingSpinner>
                    <CircularProgress />
                  </LoadingSpinner>
                  <div>Liquity </div>
                  <div>Data is fetching</div>
                </PortocolLoadingBlock>
              ) : (
                <>
                  {liquityTokenData.length > 0 ? (
                    <React.Fragment>
                      <img
                        src={liquityImageUrl}
                        style={{
                          height: '20px',
                          marginTop: '',
                          marginLeft: '15px',
                          display: 'inline-block',
                        }}
                        alt=""
                      />
                      Liquity
                      {liquityTokenData
                        ? liquityTokenData.map((object) => {
                            return (
                              <Investment
                                protocol={object}
                                protocolName={'Liquity'}
                                logoImage={object.tokenImage}
                              />
                            );
                          })
                        : ''}
                    </React.Fragment>
                  ) : (
                    ''
                  )}
                </>
              )}
              <br />
              {/* BalancerV2  */}
              {isbalancerProtocolisLoading == true ? (
                <PortocolLoadingBlock isLightTheme={theme}>
                  <LoadingSpinner>
                    <CircularProgress />
                  </LoadingSpinner>
                  <div>Balancer </div>
                  <div>Data is fetching</div>
                </PortocolLoadingBlock>
              ) : (
                <>
                  {balancerV2lp.length > 0 ? (
                    <>
                      <img
                        src={BalancerLogo}
                        style={{
                          height: '20px',
                          marginTop: '',
                          marginLeft: '15px',
                          display: 'inline-block',
                        }}
                        alt=""
                      />
                      Balancer V2
                      {balancerV2lp.map((object) => {
                        return (
                          <Investment
                            protocol={object}
                            protocolName={'BalancerV2'}
                            logoImage={object.imageData}
                          />
                        );
                      })}
                    </>
                  ) : (
                    ''
                  )}
                </>
              )}
              <br />
              {/* UniSwapV2 Protocol */}
              {isuniswapProtocolisLoading == true ? (
                <PortocolLoadingBlock isLightTheme={theme}>
                  <LoadingSpinner>
                    <CircularProgress />
                  </LoadingSpinner>
                  <div>Uniswap </div>
                  <div>Data is fetching</div>
                </PortocolLoadingBlock>
              ) : (
                <>
                  {uniswapV2lp.length > 0 ? (
                    <React.Fragment>
                      <img
                        src={uniSwapLogo}
                        style={{
                          height: '20px',
                          marginTop: '',
                          marginLeft: '15px',
                          display: 'inline-block',
                        }}
                        alt=""
                      />
                      UniswapV2
                      {uniswapV2lp
                        ? uniswapV2lp.map((object) => {
                            return (
                              <React.Fragment>
                                <Investment
                                  protocol={object}
                                  protocolName={'UniswapV2'}
                                  logoImage={object.imageData}
                                />
                              </React.Fragment>
                            );
                          })
                        : ''}
                    </React.Fragment>
                  ) : (
                    ''
                  )}
                </>
              )}
            </>

            {/* ------------end of UniSwapV2--------- */}
          </React.Fragment>
        )}
      </PoolsBlock>
      {/*====================Savings/Loans==============================>*/}
      <PoolsBlock //Savings/Loans
        isLightTheme={theme}
        style={{
          display:
            compTokenDataValue.length > 0 ||
            eth2StakeData.length > 0 ||
            CrvStakingTokenData.length > 0 ||
            AaveStakingData.length > 0 ||
            convexStakeData.length > 0 ||
            creamIronBankData.length > 0 ||
            sushiStakeData.length > 0 ||
            uniswapV2stake.length > 0,
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
              $
              {numberWithCommas(
                parseFloat(
                  parseFloat(AaveStakingTotal) +
                    parseFloat(CrvStakingTokenTotal) +
                    parseFloat(eth2StakeTotal) +
                    parseFloat(compTotalValue) +
                    parseFloat(convexStakeTotal) +
                    parseFloat(creamIronBankTotal) +
                    parseFloat(sushiStakeTotal) +
                    parseFloat(uniswapV2stakeTotal)
                ).toFixed(2)
              )}
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
            {/*Ethereum 2.0 protocol */}
            {eth2StakeData.length > 0 ? (
              <React.Fragment>
                <img
                  src={ETHLogo}
                  style={{
                    height: '20px',
                    marginTop: '',
                    marginLeft: '15px',
                    display: 'inline-block',
                  }}
                  alt=""
                />
                Ethereum 2.0
                {eth2StakeData
                  ? eth2StakeData.map((object) => {
                      return (
                        <Investment
                          protocol={object}
                          protocolName={'Eth2.0'}
                          logoImage={object.tokenImage}
                        />
                      );
                    })
                  : ''}
              </React.Fragment>
            ) : (
              ''
            )}
            {/*Curve Staking/Farming protocol */}
            {CrvStakingTokenData.length > 0 ? (
              <React.Fragment>
                <img
                  src={CurveLogo}
                  style={{
                    height: '20px',
                    marginTop: '',
                    marginLeft: '15px',
                    display: 'inline-block',
                  }}
                  alt=""
                />
                Curve Staking
                {CrvStakingTokenData
                  ? CrvStakingTokenData.map((object) => {
                      return (
                        <Investment
                          protocol={object}
                          protocolName={'Curve Staking'}
                          logoImage={object.tokenImage}
                        />
                      );
                    })
                  : ''}
              </React.Fragment>
            ) : (
              ''
            )}
            {/* Aave Protocol */}
            {AaveStakingData.length > 0 ? (
              <React.Fragment>
                <img
                  src={aaveLogo}
                  style={{
                    height: '20px',
                    marginTop: '',
                    marginLeft: '15px',
                    display: 'inline-block',
                  }}
                  alt=""
                />
                Aave
                {AaveStakingData
                  ? AaveStakingData.map((object) => {
                      return (
                        <Investment
                          protocol={object}
                          protocolName={'Aave'}
                          logoImage={object.tokenImage}
                        />
                      );
                    })
                  : ''}
              </React.Fragment>
            ) : (
              ''
            )}
            {/*pickeStake/*/}
            {/* Pickle Staking
            {pickeStake.map((object) => {
              return (
                <Investment protocol={object} logoImage={pickle} protocolName={'Pickle Finance'} />
              );
            })} */}
            {/*pickeDill/*/}
            {/* Pickle Dill
            {pickeDill.map((object) => {
              return (
                <Investment protocol={object} logoImage={pickle} protocolName={'Pickle Dill'} />
              );
            })} */}
          </React.Fragment>
        )}
        {/* Convex Staking */}
        {convexStakeData.length > 0 ? (
          <React.Fragment>
            <img
              src={convexImageUrl}
              style={{
                height: '20px',
                marginTop: '',
                marginLeft: '15px',
                display: 'inline-block',
              }}
              alt=""
            />
            Convex Staking
            {convexStakeData
              ? convexStakeData.map((object) => {
                  return (
                    <Investment
                      protocol={object}
                      protocolName={'Convex Staking'}
                      logoImage={object.tokenImage}
                    />
                  );
                })
              : ''}
          </React.Fragment>
        ) : (
          ''
        )}
        {/* CreamIronBank Protocol */}
        {creamIronBankData.length > 0 ? (
          <React.Fragment>
            <img
              src={creamImageUrl}
              style={{
                height: '20px',
                marginTop: '',
                marginLeft: '15px',
                display: 'inline-block',
              }}
              alt=""
            />
            CreamIronBank
            {creamIronBankData
              ? creamIronBankData.map((object) => {
                  return (
                    <Investment
                      protocol={object}
                      protocolName={'Cream Iron Bank'}
                      logoImage={object.tokenImage}
                    />
                  );
                })
              : ''}
          </React.Fragment>
        ) : (
          ''
        )}

        {/* Sushi Staking */}
        {sushiStakeData.length > 0 ? (
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
            Sushi Staking
            {sushiStakeData
              ? sushiStakeData.map((object) => {
                  return (
                    <Investment
                      protocol={object}
                      protocolName={'SushiswapStaking'}
                      logoImage={object.imageData}
                    />
                  );
                })
              : ''}
          </React.Fragment>
        ) : (
          ''
        )}
        {/* --------------------End of Sushi Staking----------------- */}
        {/* UniSwapV2 Staking */}
        {uniswapV2stake.length > 0 ? (
          <React.Fragment>
            <img
              src={uniSwapLogo}
              style={{
                height: '20px',
                marginTop: '',
                marginLeft: '15px',
                display: 'inline-block',
              }}
              alt=""
            />
            Uniswap Staking
            {uniswapV2stake
              ? uniswapV2stake.map((object) => {
                  return (
                    <React.Fragment>
                      <Investment protocol={object} protocolName={'UniswapV2 Staking'} />
                    </React.Fragment>
                  );
                })
              : ''}
          </React.Fragment>
        ) : (
          ''
        )}
        {/* ------------end of UniSwapV2--------- */}
      </PoolsBlock>
      {/*==============================Vaults==============================>*/}
      <PoolsBlock //four - Vaults
        isLightTheme={theme}
        style={{
          display:
            olympusStakingData.length > 0 ||
            YearnData.length > 0 ||
            YearnTokenData.length > 0 ||
            curveToken.length > 0 ||
            snxTokenData.length > 0 ||
            snxCollateralData.length > 0 ||
            pickeDill.length > 0,
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
                parseFloat(
                  parseFloat(YearnTotalValue) +
                    parseFloat(YearnTokenTotalValue) +
                    parseFloat(olympusTokenTotal) +
                    parseFloat(curveTokenTotal) +
                    parseFloat(snxTokenTotal) +
                    parseFloat(snxCollateralTotal) +
                    parseFloat(pickeDillTotal > 0 ? pickeDillTotal : 0)
                ).toFixed(2)
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
            {/*curveToken/*/}
            {curveToken.length > 0 ? (
              <>
                <img
                  src={CurveLogo}
                  style={{
                    height: '20px',
                    marginTop: '',
                    marginLeft: '15px',
                    display: 'inline-block',
                  }}
                  alt=""
                />
                Curve
                {curveToken.map((object) => {
                  return <Investment protocol={object} protocolName={'Curve'} />;
                })}
              </>
            ) : (
              ''
            )}
            {/* Sythetix protocol */}
            {snxTokenData.length > 0 || snxCollateralData.length > 0 ? (
              <>
                <img
                  src={snxImageUrl}
                  style={{
                    height: '20px',
                    marginTop: '',
                    marginLeft: '15px',
                    display: 'inline-block',
                  }}
                  alt=""
                />
                Synthetix
                {snxTokenData.map((object) => {
                  return <Investment protocol={object} protocolName={'Synthetix'} />;
                })}
                {snxCollateralData.length > 0 ? (
                  <>
                    &nbsp;Collateral
                    {snxCollateralData.map((object) => {
                      return <Investment protocol={object} protocolName={'Synthetix'} />;
                    })}
                  </>
                ) : (
                  ''
                )}
              </>
            ) : (
              ''
            )}
            {/*Pickle Dill */}
            {pickeDill.length > 0 ? (
              <React.Fragment>
                <img
                  src={pickleLogo}
                  style={{
                    height: '20px',
                    marginTop: '',
                    marginLeft: '15px',
                    display: 'inline-block',
                  }}
                  alt=""
                />
                Pickle Dill
                {pickeDill
                  ? pickeDill.map((object) => {
                      return (
                        <Investment
                          protocol={object}
                          protocolName={'Pickle Dill'}
                          logoImage={pickleLogo}
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
      {/*==================================Yield Farming======================================>*/}
      <PoolsBlock //third
        isLightTheme={theme}
        style={{
          display: snowSwapData.length > 0,
        }}>
        <Header>
          <Title isLightTheme={theme}>{'Yield Farming'}</Title>
          <ToggleButton onClick={farmingHandler} isOpen={isFarmingOpen} />
        </Header>
        <div style={{ padding: '0 29px 20px 26px', marginBottom: '20px' }}>
          <TotalValueField isLightTheme={theme}>
            <TotalTitle isLightTheme={theme}>{'Total Value'}</TotalTitle>
            <TotalValue isLightTheme={theme}>
              {/* $
              {numberWithCommas(
                parseFloat(parseFloat(liquityTokenTotal) + parseFloat(snowSwapTotal)).toFixed(2)
              )} */}
            </TotalValue>
          </TotalValueField>
        </div>
        {isFarmingOpen && <React.Fragment></React.Fragment>}
      </PoolsBlock>
    </InvestmentWrapper>
  );
  //<div>Testing dashboard</div> );
}
