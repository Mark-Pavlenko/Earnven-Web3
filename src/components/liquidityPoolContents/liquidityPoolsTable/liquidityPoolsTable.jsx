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
} from './style';

export const LiquidityPoolsTable = ({ data }) => {
  console.log('asdasdasd', data);
  const theme = useSelector((state) => state.themeReducer.isLightTheme);

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
          return <LiquidityTableItem item={item} index={index} theme={theme} />;
        })}
    </TableWrapper>
  );
};
