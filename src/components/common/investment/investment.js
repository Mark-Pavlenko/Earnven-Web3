import React, { useState } from 'react';
import {
  Main,
  TokenName,
  TokenImage,
  TotalValue,
  ToggleButton,
  ImagesWrapper,
  MockTokenImage,
  ContentWrapper,
  ContentRightWrapper,
  ProtocolTitle,
  Title,
} from './styledComponents';
import { useSelector } from 'react-redux';
import { numberWithCommas } from '../../../commonFunctions/commonFunctions';
import CurveLpImage from '../../LoansAndSavings/CurveLpImage';
import SushiSwapLogo from '../../../assets/icons/Sushiswap.webp';

const Investment = ({
  protocol,
  protocolName,
  logoImage,
  chain,
  stakedToken,
  isStaked,
  isCurveStaking,
}) => {
  const theme = useSelector((state) => state.themeReducer.isLightTheme);
  const [isOpen, setIsOpen] = useState(false);

  const {
    imageData,
    tokens,
    totalInvestment,
    mainTokenSymbol,
    totalTokensBalance,
    ethPrice,
    totalDeposit,
    totalValue,
    tokenName,
    totalStaked,
    claimable,
    apy,
    token0Image,
    token1Image,
  } = protocol;

  function isNumber(char) {
    return /\d/.test(char);
  }

  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };
  const gap = '-';

  //variable declaration
  let _symbol;
  //setup value based on the protocols
  let protocolLogo;

  // if (protocolName === 'Sushiswap') {
  //   protocol.symbol = protocol.token0Symbol + '/' + protocol.token1Symbol;
  //   protocolLogo = SushiSwapLogo;
  // }

  if (protocolName === 'Curve Staking' || protocolName === 'UniswapV2 Staking') {
    protocol.symbol = protocol.tokenName;
  }

  if (
    protocolName === 'Curve Pool' ||
    protocolName === 'SnowSwap' ||
    protocolName === 'Pickle Dill' ||
    protocolName === 'Convex Staking' ||
    protocolName === 'Eth2.0'
  ) {
    protocol.tokenImage = logoImage;
  }

  if (protocolName === 'Aave' || protocolName === 'BalancerV2') {
    let symbolArray = [];
    tokens.map((token) => {
      symbolArray.push(token.symbol);
    });
    if (symbolArray.length == 3) {
      protocol.symbol = symbolArray[0] + ' / ' + symbolArray[1] + ' / ' + symbolArray[2];
    }
    if (symbolArray.length == 2) {
      protocol.symbol = symbolArray[0] + ' / ' + symbolArray[1];
    }
    if (symbolArray.length == 1) {
      protocol.symbol = symbolArray[0];
    }
  }

  return (
    <Main isOpen={isOpen} isLightTheme={theme}>
      <TotalValue isOpen={isOpen}>
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex' }}>
            <ImagesWrapper>
              {imageData ? (
                imageData.map((name, index) => <TokenImage firstElement={index} src={name} />)
              ) : (
                <React.Fragment>
                  {protocolName === 'Sushiswap' ? (
                    <React.Fragment>
                      <TokenImage src={protocol.token0Image} />
                      <TokenImage src={protocol.token1Image} />
                    </React.Fragment>
                  ) : (
                    <>
                      {protocolName === 'Curve Staking' || protocolName === 'UniswapV2 Staking' ? (
                        <>
                          <CurveLpImage lpToken={protocol.tokenName} />
                        </>
                      ) : (
                        <TokenImage src={protocol.tokenImage} />
                      )}
                    </>
                  )}
                </React.Fragment>
              )}
            </ImagesWrapper>
            <React.Fragment style={{ display: 'flex' }}>
              <TokenName isLightTheme={theme}>{`${protocol.symbol}`}</TokenName>
            </React.Fragment>
          </div>

          {/* <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}>
            {tokens ? (
              tokens.map((name, index) => (
                <>
                  {index !== 0 && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>{gap}</div>
                  )}
                  <TokenName isLightTheme={theme}>{`${name.symbol}`}</TokenName>
                </>
              ))
            ) : (
              <TokenName isLightTheme={theme}>{`${tokenName}`}</TokenName>
            )}
          </div> */}
        </div>
        <ContentRightWrapper isLightTheme={theme}>
          {protocolName === 'Aave' || protocolName === 'mStable' ? (
            <>
              $
              {numberWithCommas(
                parseFloat(protocol.totalValue ? protocol.totalValue : '').toFixed(2)
              )}
            </>
          ) : (
            <>${numberWithCommas(parseFloat(protocol.value ? protocol.value : '').toFixed(2))}</>
          )}

          <ToggleButton isLightTheme={theme} isOpen={isOpen} onClick={toggleHandler} />
        </ContentRightWrapper>
      </TotalValue>
      {isOpen && (
        <>
          {tokens &&
            tokens.map((token) => {
              return (
                <>
                  {token.symbol == 'Aave' ? (
                    <>
                      {parseFloat(token.balance) > 0 ? (
                        <>
                          <ProtocolTitle isLightTheme={theme}>
                            <img
                              src={token.tokenImage}
                              style={{
                                height: '20px',
                                marginTop: '',
                                marginLeft: '15px',
                                display: 'inline-block',
                              }}
                              alt=""
                            />
                            Aave
                          </ProtocolTitle>
                          {parseFloat(token.balance) > 0 && (
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontWeight: '600',
                                padding: '0 32px 11px 26px',
                              }}>
                              <div style={{ fontSize: '10px' }}>balance</div>
                              <div style={{ fontSize: '10px' }}>
                                {numberWithCommas(parseFloat(token.balance).toFixed(4))}
                              </div>
                            </div>
                          )}
                          {parseFloat(token.price) > 0 && (
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontWeight: '600',
                                padding: '0 32px 11px 26px',
                              }}>
                              <div style={{ fontSize: '10px' }}>price</div>
                              <div style={{ fontSize: '10px' }}>
                                {`$${numberWithCommas(parseFloat(token.price).toFixed(2))}`}
                              </div>
                            </div>
                          )}
                          {parseFloat(token.value) > 0 && (
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontWeight: '600',
                                padding: '0 32px 11px 26px',
                              }}>
                              <div style={{ fontSize: '10px' }}>value</div>
                              <div style={{ fontSize: '10px' }}>
                                {`$${numberWithCommas(parseFloat(token.value).toFixed(2))}`}
                              </div>
                            </div>
                          )}
                          {parseFloat(token.claimable) > 0 && (
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontWeight: '600',
                                padding: '0 32px 11px 26px',
                              }}>
                              <div style={{ fontSize: '10px' }}>claimable </div>
                              <div style={{ fontSize: '10px' }}>
                                {`$${numberWithCommas(parseFloat(token.claimable).toFixed(2))}`}
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        ''
                      )}{' '}
                    </>
                  ) : (
                    ''
                  )}

                  {/* for stkABPT aave token */}
                  {token.symbol == 'stkABPT' ? (
                    <>
                      {parseFloat(token.balance) > 0 ? (
                        <>
                          <ProtocolTitle isLightTheme={theme}>
                            <img
                              src={token.tokenImage}
                              style={{
                                height: '20px',
                                marginTop: '',
                                marginLeft: '15px',
                                display: 'inline-block',
                              }}
                              alt=""
                            />
                            stkABPT
                          </ProtocolTitle>
                          {parseFloat(token.balance) > 0 && (
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontWeight: '600',
                                padding: '0 32px 11px 26px',
                              }}>
                              <div style={{ fontSize: '10px' }}>balance</div>
                              <div style={{ fontSize: '10px' }}>
                                {numberWithCommas(parseFloat(token.balance).toFixed(4))}
                              </div>
                            </div>
                          )}
                          {parseFloat(token.price) > 0 && (
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontWeight: '600',
                                padding: '0 32px 11px 26px',
                              }}>
                              <div style={{ fontSize: '10px' }}>price</div>
                              <div style={{ fontSize: '10px' }}>
                                {`$${numberWithCommas(parseFloat(token.price).toFixed(2))}`}
                              </div>
                            </div>
                          )}
                          {parseFloat(token.value) > 0 && (
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontWeight: '600',
                                padding: '0 32px 11px 26px',
                              }}>
                              <div style={{ fontSize: '10px' }}>value</div>
                              <div style={{ fontSize: '10px' }}>
                                {`$${numberWithCommas(parseFloat(token.value).toFixed(2))}`}
                              </div>
                            </div>
                          )}
                          {parseFloat(token.claimable) > 0 && (
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontWeight: '600',
                                padding: '0 32px 11px 26px',
                              }}>
                              <div style={{ fontSize: '10px' }}>claimable </div>
                              <div style={{ fontSize: '10px' }}>
                                {`$${numberWithCommas(parseFloat(token.claimable).toFixed(2))}`}
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        ''
                      )}
                    </>
                  ) : (
                    ''
                  )}
                </>
              );
            })}
          {/* Liquity Protocol */}
          {protocolName == 'Liquity' ? (
            <>
              {parseFloat(protocol.lqtyTokenVaultValue) > 0 && (
                <>
                  <Title isLightTheme={theme}>Vault</Title>
                  <ContentWrapper isLightTheme={theme}>
                    <div>value</div>
                    <div>
                      ${numberWithCommas(parseFloat(protocol.lqtyTokenVaultValue).toFixed(4))}
                    </div>
                  </ContentWrapper>
                  <ContentWrapper isLightTheme={theme}>
                    <div>balance</div>
                    <div>{numberWithCommas(parseFloat(protocol.lqtyTokenVaultUSD).toFixed(4))}</div>
                  </ContentWrapper>
                  <ContentWrapper isLightTheme={theme}>
                    <div>LUSD price</div>
                    <div>${numberWithCommas(parseFloat(protocol.LUSDPrice).toFixed(4))}</div>
                  </ContentWrapper>
                </>
              )}
              {parseFloat(protocol.lqtyDebtLusdValue) > 0 && (
                <>
                  <Title isLightTheme={theme}>Debt</Title>
                  <ContentWrapper isLightTheme={theme}>
                    <div>value</div>
                    <div>
                      {`$${numberWithCommas(parseFloat(protocol.lqtyDebtLusdValue).toFixed(2))}`}
                    </div>
                  </ContentWrapper>
                  <ContentWrapper isLightTheme={theme}>
                    <div>balance</div>
                    <div>{`${numberWithCommas(parseFloat(protocol.lqtyDebtAmt).toFixed(2))}`}</div>
                  </ContentWrapper>
                  <ContentWrapper isLightTheme={theme}>
                    <div>LUSD Price</div>
                    <div>{`$${numberWithCommas(parseFloat(protocol.LUSDPrice).toFixed(2))}`}</div>
                  </ContentWrapper>
                </>
              )}
              {parseFloat(protocol.lqtyCollateralEthValue) > 0 && (
                <>
                  <Title isLightTheme={theme}>Collateral</Title>
                  <ContentWrapper isLightTheme={theme}>
                    <div>value</div>
                    <div>
                      {`$${numberWithCommas(
                        parseFloat(protocol.lqtyCollateralEthValue).toFixed(2)
                      )}`}
                    </div>
                  </ContentWrapper>
                  <ContentWrapper isLightTheme={theme}>
                    <div>balance</div>
                    <div>
                      {`${numberWithCommas(parseFloat(protocol.lqtyCollateralAmt).toFixed(2))}`}
                    </div>
                  </ContentWrapper>
                  <ContentWrapper isLightTheme={theme}>
                    <div>ETH Price</div>
                    <div>{`$${numberWithCommas(parseFloat(protocol.ethPrice).toFixed(2))}`}</div>
                  </ContentWrapper>
                </>
              )}
              {parseFloat(protocol.lqtyStakingLqtyValue) > 0 && (
                <>
                  <Title isLightTheme={theme}>Staking</Title>
                  <ContentWrapper isLightTheme={theme}>
                    <div style={{ fontSize: '10px' }}>value</div>
                    <div style={{ fontSize: '10px' }}>
                      {`$${numberWithCommas(parseFloat(protocol.lqtyStakingLqtyValue).toFixed(2))}`}
                    </div>
                  </ContentWrapper>
                  <ContentWrapper isLightTheme={theme}>
                    <div>balance</div>
                    <div>
                      {`${numberWithCommas(parseFloat(protocol.lqtyStakingAmt).toFixed(2))}`}
                    </div>
                  </ContentWrapper>
                  <ContentWrapper isLightTheme={theme}>
                    <div>LQTY Price</div>
                    <div>{`$${numberWithCommas(parseFloat(protocol.LQTYPrice).toFixed(2))}`}</div>
                  </ContentWrapper>
                </>
              )}
              {parseFloat(protocol.lqtyTokenClaimableValue) > 0 && (
                <>
                  <Title isLightTheme={theme}>Claimable</Title>
                  <ContentWrapper isLightTheme={theme}>
                    <div>lqty value</div>
                    <div>
                      {`$${numberWithCommas(
                        parseFloat(protocol.lqtyTokenClaimableValue).toFixed(2)
                      )}`}
                    </div>
                  </ContentWrapper>
                  {protocol.lqtyEthClaimableValue > 0 ? (
                    <>
                      <ContentWrapper isLightTheme={theme}>
                        <div>eth value</div>
                        <div>
                          {`$${numberWithCommas(
                            parseFloat(protocol.lqtyEthClaimableValue).toFixed(2)
                          )}`}
                        </div>
                      </ContentWrapper>{' '}
                    </>
                  ) : (
                    ''
                  )}
                </>
              )}
              <ContentWrapper isLightTheme={theme}>
                <div>chain</div>
                <div>{protocol.chain}</div>
              </ContentWrapper>
              <ContentWrapper isLightTheme={theme}>
                <div>protocol</div>
                <div>{protocol.protocol}</div>
              </ContentWrapper>
            </>
          ) : (
            ''
          )}
          {protocolName != 'Liquity' ? (
            <>
              {Object.keys(protocol)
                .filter(
                  (item) =>
                    item !== 'imageData' &&
                    item !== 'id' &&
                    item !== 'tokenName' &&
                    item !== 'symbol' &&
                    item !== 'tokens' &&
                    item !== 'tokenList' &&
                    item !== 'currentPrice' &&
                    item !== 'tokenImage' &&
                    item !== 'index' &&
                    item !== 'underlyingAddress' &&
                    item !== 'icon' &&
                    item !== 'stakingContractAddress' &&
                    item !== 'tokenAddress' &&
                    item !== 'contractAddress' &&
                    item !== 'tokenDecimal' &&
                    //item !== 'protocol' &&
                    item !== 'yTokenDecimals' &&
                    item !== 'image' &&
                    item != 'token0Image' &&
                    item != 'token1Image' &&
                    item != 'totalValue' &&
                    item != 'poolDetails'
                )
                .map((el) => {
                  return (
                    <div>
                      <ContentWrapper isLightTheme={theme}>
                        <div>{el}</div>
                        <div>
                          {isNumber(protocol[el]) &&
                            el !== 'balance' &&
                            el !== 'poolPercentage' &&
                            el !== 'totalTokensBalance' &&
                            el !== 'APY' &&
                            el !== 'cTokenBalance' && <span>$</span>}
                          {el === 'poolPercentage' && <span>%</span>}
                          {el === 'APY' && <span>%</span>}
                          <span>
                            {isNumber(protocol[el])
                              ? numberWithCommas(parseFloat(protocol[el]).toFixed(2))
                              : protocol[el]}
                          </span>
                        </div>
                      </ContentWrapper>
                    </div>
                  );
                })}{' '}
            </>
          ) : (
            ''
          )}
        </>
      )}
    </Main>
  );
};

export default Investment;
