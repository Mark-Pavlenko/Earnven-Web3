import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { InvestTableItem } from './components/investTableItem';

import {
  TableWrapper,
  TableItem,
  ItemHeader,
  ItemIndex,
  HeaderApr,
  HeaderLiquidity,
  AvailableTitle,
  ItemIndexHidden,
} from './styledComponents';

export const InvestPoolsTable = ({ data, type, addLiquidity, addLiquidityNormal }) => {
  const theme = useSelector((state) => state.themeReducer.isLightTheme);

  return (
    <TableWrapper isLightTheme={theme}>
      <TableItem isLightTheme={theme}>
        <ItemHeader>
          <ItemIndexHidden>{'№'}</ItemIndexHidden>
          <AvailableTitle>{'Available pools'}</AvailableTitle>
        </ItemHeader>
        <HeaderLiquidity>{'Liquidity'}</HeaderLiquidity>
        <HeaderApr>{'APR'}</HeaderApr>
        <HeaderApr>{'LP balance'}</HeaderApr>
        <HeaderApr>{'Value'}</HeaderApr>
        <div></div>
      </TableItem>
      {data &&
        data.map((item, index) => {
          return (
            <InvestTableItem
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
