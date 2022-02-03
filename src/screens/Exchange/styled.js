import styled, { css } from 'styled-components';
import { Button } from '@material-ui/core';

export const ExchangeMainLayout = styled.div`
  //background-color: red;
  display: grid;
  grid-template-columns: 50% 50%;
  //height: 600px;
  //column-gap: 120px;
`;

const ColumnsSubBlocks = css`
  height: 585px;
`;

const ColumnsTitleBlocks = css`
  height: 97px;
  margin-top: 30px;
`;

const ColumnTitles = css`
  color: #1e1e20;
  font-family: 'Saira', sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 31px;
  letter-spacing: 0;
`;

const ColumnSubTitles = css`
  margin-top: 25px;
  color: #1e1e20;
  opacity: 0.5;
  font-family: 'Saira', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: 0;
`;

export const SwapFirstColumn = styled.div`
  ${ColumnsSubBlocks};
  //background-color: green;
`;

export const FirstColumnSwapSubBlock = styled.div`
  ${ColumnsSubBlocks};
  width: 525px;
  //background-color: orange;
`;

export const FirstColumnTitleBlock = styled.div`
  ${ColumnsTitleBlocks};
  //background-color: yellow;
`;

export const ColumnMainTitles = styled.p`
  ${ColumnTitles};
`;

export const NewMultiSwapButton = styled(Button)`
  width: 76px;
  height: 40px;
  margin-left: 15px;
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  background: #4453ad;
  mix-blend-mode: normal;
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(35px);
  border-radius: 10px;

  :hover {
    background: transparent;
  }
`;

export const ColumnMainSubTitles = styled.p`
  ${ColumnSubTitles}
`;

export const SwapSecondColumn = styled.div`
  ${ColumnsSubBlocks};
  width: 540px;
  //background-color: blue;
`;

export const SecondColumnSwapSubBlock = styled.div`
  ${ColumnsSubBlocks};
  width: 540px;
  //background-color: gray;
`;

export const SecondColumnTitleBlock = styled.div`
  ${ColumnsTitleBlocks};
  //background-color: violet;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;
