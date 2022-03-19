import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { LiquidityTableItem } from './components/liquidityTableItem';

import {
  TableItem,
  HeaderApr,
  ItemHeader,
  TableWrapper,
  AvailableTitle,
  HeaderLiquidity,
  ItemIndexHidden,
} from './styledComponents';

export const LiquidityPoolsTable = ({
  data,
  type,
  addLiquidity,
  addLiquidityNormal,
  AllTokens,
  protocolType,
}) => {
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
        <div></div>
      </TableItem>
      {data &&
        data.map((item, index) => {
          return (
            <LiquidityTableItem
              type={type}
              item={item}
              index={index}
              theme={theme}
              AllTokens={AllTokens}
              addLiquidity={addLiquidity}
              protocolType={protocolType}
              addLiquidityNormal={addLiquidityNormal}
            />
          );
        })}
    </TableWrapper>
  );
};
