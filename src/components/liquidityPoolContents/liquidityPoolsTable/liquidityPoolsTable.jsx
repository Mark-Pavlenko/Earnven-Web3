import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { LiquidityTableItem } from './liquidityTableItem';

import {
  TableWrapper,
  TableItem,
  ItemHeader,
  ItemIndex,
  HeaderApr,
  HeaderLiquidity,
  AvailableTitle,
} from './styledComponents';

export const LiquidityPoolsTable = ({ data, type, addLiquidity, addLiquidityNormal }) => {
  const theme = useSelector((state) => state.themeReducer.isLightTheme);

  return (
    <TableWrapper isLightTheme={theme}>
      <TableItem isLightTheme={theme}>
        <ItemHeader>
          <ItemIndex>№</ItemIndex>
          <AvailableTitle>Available pools</AvailableTitle>
        </ItemHeader>
        <HeaderLiquidity>Liquidity</HeaderLiquidity>
        <HeaderApr>APR</HeaderApr>
        <div></div>
      </TableItem>
      {data &&
        data.map((item, index) => {
          return (
            <LiquidityTableItem
              item={item}
              index={index}
              theme={theme}
              type={type}
              addLiquidity={addLiquidity}
              addLiquidityNormal={addLiquidityNormal}
            />
          );
        })}
    </TableWrapper>
  );
};
