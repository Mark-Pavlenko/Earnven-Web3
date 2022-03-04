import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { InvestTableItem } from './components/investTableItem';

import {
  TableWrapper,
  TableItem,
  ItemHeader,
  ItemIndex,
  HeaderApr,
  LPbalance,
  Value,
  Buttons,
  HeaderLiquidity,
  AvailableTitle,
  ItemIndexHidden,
} from './styledComponents';

export const InvestPoolsTable = ({
  data,
  type,
  addLiquidity,
  removeLiquidity,
  addLiquidityNormal,
  removeLiquidityNormal,
}) => {
  const theme = useSelector((state) => state.themeReducer.isLightTheme);

  return (
    <TableWrapper isLightTheme={theme}>
      <TableItem isLightTheme={theme}>
        <ItemHeader>
          <ItemIndexHidden isLightTheme={theme}>{'№'}</ItemIndexHidden>
          <AvailableTitle isLightTheme={theme}>{'Available pools'}</AvailableTitle>
        </ItemHeader>
        <HeaderLiquidity isLightTheme={theme}>{'Liquidity'}</HeaderLiquidity>
        <HeaderApr isLightTheme={theme}>{'APR'}</HeaderApr>
        <LPbalance isLightTheme={theme}>{'LP balance'}</LPbalance>
        <Value isLightTheme={theme}>{'Value'}</Value>
        <Buttons></Buttons>
      </TableItem>
      {data &&
        data.map((item, index) => {
          return (
            <InvestTableItem
              item={item}
              index={index}
              theme={theme}
              addLiquidity={addLiquidity}
              removeLiquidity={removeLiquidity}
              addLiquidityNormal={addLiquidityNormal}
              removeLiquidityNormal={removeLiquidityNormal}
            />
          );
        })}
    </TableWrapper>
  );
};
