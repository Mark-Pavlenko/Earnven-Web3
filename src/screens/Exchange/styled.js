import styled, { css } from 'styled-components';
import { Button, IconButton } from '@material-ui/core';

export const ExchangeMainLayout = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const ColumnsTitleBlocks = css`
  height: 97px;
  margin-top: 30px;
`;

export const SwapFirstColumn = styled.div`
  width: 525px;
  height: 585px;

  @media (max-width: 540px) {
    width: 375px;
  }
`;

export const FirstColumnSwapSubBlock = styled.div`
  ${ColumnsTitleBlocks};
`;

export const FirstColumnTitleBlock = styled.div`
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

export const FirstColumnTitleHeaderBlock = styled.div`
  @media (max-width: 540px) {
    padding-left: 15px;
  }
`;

export const SwapTokensMainSubBlock = styled.div`
  width: 525px;
  height: 490px;
  margin-top: 20px;
  padding: 32px 27px 16px 20px;
  background: ${(props) => (props.isLightTheme ? '#FFFFFF29' : '#1F265C3D')};
  mix-blend-mode: normal;
  box-shadow: 2px 2px 4px 0 #ffffff1a inset;
  backdrop-filter: blur(35px);
  border-radius: 10px;

  @media (max-width: 540px) {
    width: 375px;
    padding: 37px 15px 27px 15px;
  }
`;

export const SendReceiveSubBlock = styled.div``;

export const SendBlockLabels = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    font-size: 12px;
    color: ${(props) => (props.isLightTheme ? '#1e1e20' : '#FFFFFF')};
    opacity: ${(props) => (props.isLightTheme ? 0.5 : 0.8)};
  }
`;

export const MultiSwapSendValueLabel = styled.span`
  margin-left: 35px;
  font-size: 12px;
  color: ${(props) => (props.isLightTheme ? '#1e1e20' : '#FFFFFF')};
  opacity: 0.5;
`;

export const SendTokensChooseButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 475px;
  height: 60px;
  margin-top: 5px;
  color: black;
  background-color: ${(props) => (props.isLightTheme ? '#ffffff' : '#1F265C3D')};
  box-shadow: ${(props) =>
    props.isLightTheme
      ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
      : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
  backdrop-filter: ${(props) => (props.isLightTheme ? 'none' : 'blur(35px)')};
  border-radius: 10px;

  :hover {
    cursor: pointer;
  }

  @media (max-width: 540px) {
    width: 345px;
  }
`;

export const MultiSwapSendTokensChooseButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 475px;
  height: 60px;
  margin-top: -3px;
  color: black;
  background-color: ${(props) => (props.isLightTheme ? '#ffffff' : '#1F265C3D')};
  box-shadow: ${(props) =>
    props.isLightTheme
      ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
      : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
  backdrop-filter: ${(props) => (props.isLightTheme ? 'none' : 'blur(35px)')};
  border-radius: 10px;

  :hover {
    cursor: pointer;
  }

  @media (max-width: 540px) {
    width: 345px;
  }
`;

export const MultiSwapReceiveTokensBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 475px;
  height: 115px;
  margin-top: -3px;
  margin-bottom: 23px;
  color: black;
  background-color: ${(props) => (props.isLightTheme ? '#ffffff' : '#1F265C3D')};
  box-shadow: ${(props) =>
    props.isLightTheme
      ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
      : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
  backdrop-filter: ${(props) => (props.isLightTheme ? 'none' : 'blur(35px)')};
  border-radius: 10px;

  :hover {
    cursor: pointer;
  }

  @media (max-width: 540px) {
    width: 345px;
  }
`;

export const ChooseBtnTokenBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 12px;
`;

export const MultiSwapChooseBtnTokenBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 8px;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export const ChosenTokenLabel = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => (props.isLightTheme ? '#1e1e20' : '#FFFFFF')};
`;

export const ChosenSendTokenValue = styled.span`
  display: flex;
  flex-direction: column;

  margin-left: auto;
  margin-right: 20px;
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => (props.isLightTheme ? '#1e1e20' : '#FFFFFF')};

  span {
    margin-left: auto;
  }
`;

export const SwitchTokensBtn = styled.img`
  margin: 0 auto;
  cursor: pointer;

  @media (max-width: 540px) {
    margin-bottom: -10px;
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

  @media (max-width: 540px) {
    margin-top: 20px;
  }
`;

export const AddReceiveTokenMultiSwapBtn = styled(Button)`
  max-width: 28px;
  max-height: 28px;
  min-width: 28px;
  min-height: 28px;
  margin: 0 auto;
  font-size: 14px;
  color: ${(props) => (props.isLightTheme ? '#4453AD' : '#ffffff')};
  background-color: ${(props) => (props.isLightTheme ? '#FFFFFF' : '#8F86FF')};
  border-radius: 10px;

  :hover {
    background-color: ${(props) => (props.isLightTheme ? '#FFFFFF' : '#8F86FF')};
  }
`;

export const SwapBlockDelimiter = styled.div`
  margin-top: 20px;
  opacity: 0.05;
  border: ${(props) => (props.isLightTheme ? '1px solid #1E1E20' : '1px solid #ffffff')};
`;

export const DownDelimiterLabelsBlock = styled.div`
  margin-top: 10px;
`;

export const LabelsBlockSubBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  span {
    font-size: 12px;
    line-height: 19px;
  }
`;

export const LabelsBlockSubBlockSpan = styled.span`
  color: ${(props) => (props.isLightTheme ? '#1e1e20' : '#FFFFFF')};
  font-weight: 400;
`;

export const LabelsBlockImportantSpan = styled.span`
  color: ${(props) => (props.isLightTheme ? '#4453AD' : '#8F86FF')};
  font-weight: 600;
`;

export const AdditionalOptionsSwapTokensSubBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    margin-right: 4px;
  }

  span {
    color: ${(props) => (props.isLightTheme ? '#4453AD' : '#8F86FF')};
    font-weight: 600;
  }
`;

export const SwapBlockExchangeLayout = styled.div`
  display: flex;
  justify-content: center;

  Button {
    width: 150px;
    height: 40px;
    margin-top: 10px;
    color: ${(props) => (props.isLightTheme ? '#4453AD' : '#FFFFFF')};
    background-color: ${(props) => (props.isLightTheme ? '#FFFFFF' : '#8F86FF')};
    box-shadow: ${(props) =>
      props.isLightTheme
        ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
        : '7px 21px 22px -15px rgba(51, 78, 131, 0.17)'};
    border-radius: 10px;

    :hover {
      background-color: ${(props) => (props.isLightTheme ? '#FFFFFF' : '#8F86FF')};
    }

    @media (max-width: 540px) {
      width: 345px;
    }
  }
`;

export const SwapSecondColumn = styled.div`
  width: 540px;
  height: 585px;
  @media (max-width: 1200px) {
    margin-top: 40px;
  }

  @media (max-width: 540px) {
    width: 375px;
  }
`;

export const SecondColumnSwapSubBlock = styled.div`
  width: 540px;
  height: 585px;
  //background-color: gray;
  @media (max-width: 540px) {
    width: 375px;
  }
`;

export const SecondColumnTitleBlock = styled.div`
  ${ColumnsTitleBlocks};
  //background-color: violet;
  @media (max-width: 1200px) {
    width: 340px;
    padding-left: 15px;
    margin-bottom: 20px;
  }
`;

export const SecondColumnTitleHeaderBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;