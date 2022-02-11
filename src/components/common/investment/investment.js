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

  if (protocolName === 'Sushiswap') {
    protocol.symbol = protocol.token0Symbol + '-' + protocol.token1Symbol;
    protocolLogo = SushiSwapLogo;
  }

  if (protocolName === 'Curve Staking') {
    protocol.symbol = protocol.tokenName;
  }

  if (protocolName === 'Curve Pool') {
    protocol.tokenImage = logoImage;
  }

  if (protocolName === 'Aave') {
    let symbolArray = [];
    tokens.map((token) => {
      symbolArray.push(token.symbol);
    });
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
                      <MockTokenImage src={protocol.token0Image} />
                      <MockTokenImage src={protocol.token1Image} />
                    </React.Fragment>
                  ) : (
                    <>
                      {protocolName === 'Curve Staking' ? (
                        <>
                          <CurveLpImage lpToken={protocol.tokenName} />
                        </>
                      ) : (
                        <MockTokenImage src={protocol.tokenImage} />
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
          {protocolName === 'Aave' ? (
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
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontWeight: '600',
                      padding: '0 32px 11px 26px',
                    }}>
                    <div style={{ fontSize: '10px' }}>balance {token.symbol}</div>
                    <div style={{ fontSize: '10px' }}>
                      {numberWithCommas(parseFloat(token.balance).toFixed(2))}
                    </div>
                  </div>
                  {token.price && (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontWeight: '600',
                        padding: '0 32px 11px 26px',
                      }}>
                      <div style={{ fontSize: '10px' }}>price {token.symbol}</div>
                      <div style={{ fontSize: '10px' }}>
                        {`$${numberWithCommas(parseFloat(token.price).toFixed(2))}`}
                      </div>
                    </div>
                  )}
                  {token.value && (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontWeight: '600',
                        padding: '0 32px 11px 26px',
                      }}>
                      <div style={{ fontSize: '10px' }}>value {token.symbol}</div>
                      <div style={{ fontSize: '10px' }}>
                        {`$${numberWithCommas(parseFloat(token.value).toFixed(2))}`}
                      </div>
                    </div>
                  )}
                  {token.claimable && (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontWeight: '600',
                        padding: '0 32px 11px 26px',
                      }}>
                      <div style={{ fontSize: '10px' }}>claimable {token.symbol}</div>
                      <div style={{ fontSize: '10px' }}>
                        {`$${numberWithCommas(parseFloat(token.claimable).toFixed(2))}`}
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          {/*{stakedToken && (*/}
          {/*  <ContentWrapper isLightTheme={theme}>*/}
          {/*    <div>Staked Token</div>*/}
          {/*    <div>{stakedToken}</div>*/}
          {/*  </ContentWrapper>*/}
          {/*)}*/}
          {/*{ethPrice && (*/}
          {/*  <ContentWrapper isLightTheme={theme}>*/}
          {/*    <div>Price</div>*/}
          {/*    <div>{numberWithCommas(ethPrice)}</div>*/}
          {/*  </ContentWrapper>*/}
          {/*)}*/}
          {/*{protocol.balance > 0 && (*/}
          {/*  <ContentWrapper isLightTheme={theme}>*/}
          {/*    <div>Balance</div>*/}
          {/*    <div>{numberWithCommas(parseFloat(protocol.balance).toFixed(2))}</div>*/}
          {/*  </ContentWrapper>*/}
          {/*)}*/}
          {/*{!stakedToken && protocol.price && (*/}
          {/*  <ContentWrapper isLightTheme={theme}>*/}
          {/*    <div>Price</div>*/}
          {/*    <div>{`$${numberWithCommas(parseFloat(protocol.price).toFixed(2))}`}</div>*/}
          {/*  </ContentWrapper>*/}
          {/*)}*/}
          {/*{protocol.stakingClaimable && (*/}
          {/*  <ContentWrapper isLightTheme={theme}>*/}
          {/*    <div>Claimable</div>*/}
          {/*    <div>{`$${numberWithCommas(parseFloat(protocol.stakingClaimable).toFixed(2))}`}</div>*/}
          {/*  </ContentWrapper>*/}
          {/*)}*/}
          {/*{protocol.liquidity && (*/}
          {/*  <ContentWrapper isLightTheme={theme}>*/}
          {/*    <div>Liquidity</div>*/}
          {/*    <div>*/}
          {/*      {protocol.liquidity*/}
          {/*        ? `$${numberWithCommas(parseFloat(protocol.liquidity).toFixed(2))}`*/}
          {/*        : `$0`}*/}
          {/*    </div>*/}
          {/*  </ContentWrapper>*/}
          {/*)}*/}
          {/*{Object.keys(protocolData).map((el) => {*/}
          {/*  return (*/}
          {/*    <ContentWrapper isLightTheme={theme}>*/}
          {/*      <div>{el}</div>*/}
          {/*      <div>{numberWithCommas(protocolData[el])}</div>*/}
          {/*    </ContentWrapper>*/}
          {/*  );*/}
          {/*})}*/}
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
                item !== 'protocol' &&
                item !== 'yTokenDecimals' &&
                item !== 'image' &&
                item != 'token0Image' &&
                item != 'token1Image' &&
                item != 'totalValue'
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
                        el !== 'cTokenBalance' && <span>$</span>}
                      {el === 'poolPercentage' && <span>%</span>}
                      <span>
                        {isNumber(protocol[el])
                          ? numberWithCommas(parseFloat(protocol[el]).toFixed(2))
                          : protocol[el]}
                      </span>
                    </div>
                  </ContentWrapper>
                </div>
              );
            })}
          {/*{protocolName && (*/}
          {/*  <div*/}
          {/*    style={{*/}
          {/*      display: 'flex',*/}
          {/*      justifyContent: 'space-between',*/}
          {/*      fontWeight: '600',*/}
          {/*      padding: '0 32px 11px 26px',*/}
          {/*    }}>*/}
          {/*    <div style={{ fontSize: '10px' }}>Protocol</div>*/}
          {/*    <div style={{ fontSize: '10px' }}>{protocolName}</div>*/}
          {/*  </div>*/}
          {/*)}*/}
          {/*{stakedToken && (*/}
          {/*  <ContentWrapper isLightTheme={theme}>*/}
          {/*    <div>Staked Token</div>*/}
          {/*    <div>{stakedToken}</div>*/}
          {/*  </ContentWrapper>*/}
          {/*)}*/}
          {/*{ethPrice && (*/}
          {/*  <ContentWrapper isLightTheme={theme}>*/}
          {/*    <div>Price</div>*/}
          {/*    <div>{numberWithCommas(ethPrice)}</div>*/}
          {/*  </ContentWrapper>*/}
          {/*)}*/}
          {/*{protocol.balance > 0 && (*/}
          {/*  <ContentWrapper isLightTheme={theme}>*/}
          {/*    <div>Balance</div>*/}
          {/*    <div>{numberWithCommas(parseFloat(protocol.balance).toFixed(2))}</div>*/}
          {/*  </ContentWrapper>*/}
          {/*)}*/}
          {/*{protocol.apy > 0 && (*/}
          {/*  <ContentWrapper isLightTheme={theme}>*/}
          {/*    <div>APY</div>*/}
          {/*    <div>{numberWithCommas(parseFloat(protocol.apy).toFixed(2))}%</div>*/}
          {/*  </ContentWrapper>*/}
          {/*)}*/}
          {/*{protocol.totalStaked > 0 && (*/}
          {/*  <ContentWrapper isLightTheme={theme}>*/}
          {/*    <div>Staked</div>*/}
          {/*    <div>${numberWithCommas(parseFloat(protocol.totalStaked).toFixed(2))}</div>*/}
          {/*  </ContentWrapper>*/}
          {/*)}*/}
          {/*{protocol.claimable > 0 && (*/}
          {/*  <ContentWrapper isLightTheme={theme}>*/}
          {/*    <div>Claimable</div>*/}
          {/*    <div>${numberWithCommas(parseFloat(protocol.claimable).toFixed(2))}</div>*/}
          {/*  </ContentWrapper>*/}
          {/*)}*/}
          {/*{!stakedToken && protocol.price && (*/}
          {/*  <ContentWrapper isLightTheme={theme}>*/}
          {/*    <div>Price</div>*/}
          {/*    <div>{`$${numberWithCommas(parseFloat(protocol.price).toFixed(2))}`}</div>*/}
          {/*  </ContentWrapper>*/}
          {/*)}*/}
          {/*{protocol.stakingClaimable && (*/}
          {/*  <ContentWrapper isLightTheme={theme}>*/}
          {/*    <div>Claimable</div>*/}
          {/*    <div>{`$${numberWithCommas(parseFloat(protocol.stakingClaimable).toFixed(2))}`}</div>*/}
          {/*  </ContentWrapper>*/}
          {/*)}*/}
          {/*{protocol.liquidity && (*/}
          {/*  <ContentWrapper isLightTheme={theme}>*/}
          {/*    <div>Liquidity</div>*/}
          {/*    <div>*/}
          {/*      {protocol.liquidity*/}
          {/*        ? `$${numberWithCommas(parseFloat(protocol.liquidity).toFixed(2))}`*/}
          {/*        : `$0`}*/}
          {/*    </div>*/}
          {/*  </ContentWrapper>*/}
          {/*)}*/}
        </>
      )}
    </Main>
  );
};

export default Investment;
