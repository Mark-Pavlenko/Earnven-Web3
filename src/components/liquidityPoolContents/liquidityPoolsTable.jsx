import React from 'react';
import { useSelector } from 'react-redux';
import {
  TableWrapper,
  TableItem,
  ItemHeader,
  InvestButton,
  InfoButton,
  TokenImage,
  ItemIndex,
  TokenName,
  TokenImages,
  TokenNames,
  AprBlock,
  AprName,
  ItemButtons,
  Balance,
  APR,
  AprValue,
  HeaderApr,
  HeaderLiquidity,
} from './style';
import InfoIcon from '../../assets/icons/info-icon.svg';
import { SvgComponent } from './svgComponent/svgComponent';
import { numberWithCommas } from '../../commonFunctions/commonFunctions';

export const LiquidityPoolsTable = ({ data }) => {
  const theme = useSelector((state) => state.themeReducer.isLightTheme);
  console.log('theme', theme);
  console.log('liquid', data);
  return (
    <TableWrapper isLightTheme={theme}>
      <TableItem isLightTheme={theme}>
        <ItemHeader>
          <ItemIndex>№</ItemIndex>
          <div>Available pools</div>
        </ItemHeader>
        <HeaderLiquidity>Liquidity</HeaderLiquidity>
        <HeaderApr>APR</HeaderApr>
        <div></div>
      </TableItem>
      {data &&
        data.map((item, index) => {
          const yearlyDiff = (
            ((parseInt(item.volumeUSD) * 0.003) / parseInt(item.reserveUSD)) *
            100 *
            365
          ).toFixed(2);

          const weeklyDiff = (
            ((parseInt(item.volumeUSD) * 0.003) / parseInt(item.reserveUSD)) *
            100 *
            7
          ).toFixed(2);
          return (
            <TableItem isLightTheme={theme}>
              <ItemHeader>
                <ItemIndex>{index + 1}</ItemIndex>
                <TokenImages>
                  {Object.keys(item)
                    .filter((token) => token.includes('token'))
                    .map((name) => (
                      <>
                        {item[name].image && (
                          <TokenImage src={`https://ethplorer.io${item[name].image}`} />
                        )}
                      </>
                    ))}
                </TokenImages>
                <TokenNames>
                  {Object.keys(item)
                    .filter((token) => token.includes('token'))
                    .map((name) => (
                      <div>{item[name].symbol}</div>
                    ))}
                </TokenNames>
              </ItemHeader>
              <Balance>${numberWithCommas(parseFloat(item.reserveUSD).toFixed(2))}</Balance>
              <APR>
                <AprBlock>
                  <AprName>Weekly</AprName>
                  {weeklyDiff > 0 ? (
                    <AprValue color="#00DFD1">
                      +
                      {(
                        ((parseInt(item.volumeUSD) * 0.003) / parseInt(item.reserveUSD)) *
                        100 *
                        7
                      ).toFixed(2)}
                      %
                    </AprValue>
                  ) : (
                    <AprValue color="#EC3D3D">
                      -
                      {(
                        ((parseInt(item.volumeUSD) * 0.003) / parseInt(item.reserveUSD)) *
                        100 *
                        7
                      ).toFixed(2)}
                      %
                    </AprValue>
                  )}
                </AprBlock>
                <AprBlock>
                  <AprName>Yearly</AprName>
                  {yearlyDiff > 0 ? (
                    <AprValue color="#00DFD1">
                      +
                      {(
                        ((parseInt(item.volumeUSD) * 0.003) / parseInt(item.reserveUSD)) *
                        100 *
                        365
                      ).toFixed(2)}
                      %
                    </AprValue>
                  ) : (
                    <AprValue color="#EC3D3D">
                      -
                      {(
                        ((parseInt(item.volumeUSD) * 0.003) / parseInt(item.reserveUSD)) *
                        100 *
                        365
                      ).toFixed(2)}
                      %
                    </AprValue>
                  )}
                </AprBlock>
              </APR>
              <ItemButtons>
                <InvestButton isLightTheme={theme}>Invest</InvestButton>
                <InfoButton isLightTheme={theme}>
                  {theme ? <SvgComponent color="#4453AD" /> : <SvgComponent color="white" />}
                </InfoButton>
              </ItemButtons>
            </TableItem>
          );
        })}
    </TableWrapper>
  );
};
