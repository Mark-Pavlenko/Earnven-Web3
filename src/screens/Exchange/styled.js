import styled, { css } from 'styled-components';
import { Button } from '@material-ui/core';

export const ExchangeMainLayout = styled.div`
  //background-color: red;
  display: grid;
  grid-template-columns: 50% 50%;
  //height: 600px;
  //column-gap: 120px;
`;

const ColumnsTitleBlocks = css`
  height: 97px;
  margin-top: 30px;
`;

export const SwapFirstColumn = styled.div`
  //background-color: green;
  width: 525px;
  height: 585px;
`;

export const FirstColumnSwapSubBlock = styled.div`
  //background-color: orange;
`;

export const FirstColumnTitleBlock = styled.div`
  ${ColumnsTitleBlocks};
  //background-color: yellow;
`;

export const ColumnMainTitles = styled.p`
  color: ${(props) => (props.isLightTheme ? '#1e1e20' : '#FFFFFF')};
  font-family: 'Saira', sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 31px;
  letter-spacing: 0;
`;

export const SimpleSwapBlock = styled.div`
  width: 525px;
  height: 490px;
  margin-top: 20px;
  padding: 32px 27px 16px 20px;
  background: ${(props) => (props.isLightTheme ? '#FFFFFF29' : '#1F265C3D')};
  mix-blend-mode: normal;
  box-shadow: 2px 2px 4px 0 #ffffff1a inset;
  backdrop-filter: blur(35px);
  border-radius: 10px;
`;

export const SendBlockLabels = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    font-size: 12px;
    color: ${(props) => (props.isLightTheme ? '#1e1e20' : '#FFFFFF')};
    opacity: ${(props) => (props.isLightTheme ? 0.5 : 0.8)};
  }
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
    background: #4453ad;
  }
`;

export const ColumnMainSubTitles = styled.p`
  margin-top: 25px;
  color: ${(props) => (props.isLightTheme ? '#1e1e20' : '#FFFFFF')};
  opacity: ${(props) => (props.isLightTheme ? 0.5 : 0.8)};
  font-family: 'Saira', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0;
`;

export const SwapSecondColumn = styled.div`
  width: 540px;
  height: 585px;
  //background-color: blue;
`;

export const SecondColumnSwapSubBlock = styled.div`
  width: 540px;
  height: 585px;
  //background-color: gray;
`;

export const SecondColumnTitleBlock = styled.div`
  ${ColumnsTitleBlocks};
  //background-color: violet;
`;

export const SecondColumnTitleHeaderBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
