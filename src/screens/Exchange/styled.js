import styled, { css } from 'styled-components';
import { Button, IconButton, List, ListItem } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Avatar from 'antd/es/avatar/avatar';

export const ExchangeMainLayout = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    grid-template-columns: 100%;
  }
`;

const ColumnsTitleBlocks = css`
  height: 97px;
  margin-top: 30px;
`;

export const SwapFirstColumn = styled.div`
  width: 525px;
  height: 585px;

  @media (max-width: 1200px) {
    display: flex;
    justify-content: center;
  }

  @media (max-width: 550px) {
    width: auto;
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

  @media (max-width: 550px) {
    font-size: 26px;
  }
`;

export const FirstColumnTitleHeaderBlock = styled.div`
  @media (max-width: 550px) {
    padding-left: 15px;
  }
`;

export const MultiSwapLayout = styled.div`
  display: flex;
  justify-content: center;
`;

export const SwapTokensMainSubBlock = styled.div`
  width: 525px;
  height: 515px;
  padding: ${(props) => props.isMultiSwap === false && '32px 15px 27px 15px'};
  margin-top: 20px;
  background: ${(props) => (props.isLightTheme ? '#FFFFFF29' : '#1F265C3D')};
  mix-blend-mode: normal;
  box-shadow: 2px 2px 4px 0 #ffffff1a inset;
  backdrop-filter: blur(35px);
  border-radius: 10px;

  @media (max-width: 550px) {
    width: ${(props) => props.isMultiSwap === false && '99vw'};
    height: 505px;
  }

  @media (min-width: 541px) and(max-width: 1199px) {
    padding: 32px 27px 16px 20px;
  }
`;

export const SendReceiveSubBlock = styled.div`
  display: flex;
  flex-direction: column;
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

export const MultiSwapSendValueLabelsLayout = styled.div`
  display: flex;
  justify-content: space-between;
  //background-color: red;
`;

export const MultiSwapSendValueLabel = styled.span`
  //margin-left: 42px;
  //padding-left: 5px;
  font-size: 12px;
  line-height: 19px;
  color: ${(props) => (props.isLightTheme ? '#1e1e20' : '#FFFFFF')};
  opacity: ${(props) => (props.isLightTheme ? 0.5 : 0.8)};
`;

export const SendTokensChooseButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  //width: 475px;
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

  @media (max-width: 550px) {
    width: 100%;
  }
`;

export const ExceededAmountTokensLimitWarning = styled.span`
  margin-left: auto;
  margin-top: 10px;
  //margin-right: -20px;
  font-size: 12px;
  color: #ec3d3d;
`;

export const MultiSwapSendTokensChooseBlockLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const MultiSwapSendTokensChooseBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 475px;
  height: 60px;
  margin-bottom: 16px;
  margin-left: 20px;
  padding: 6px 20px 7px 12px;
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

  @media (max-width: 550px) {
    width: 100%;
    margin: 0 15px 0 15px;
  }
`;

export const SubLayoutReceiveTokensBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: auto;

  @media (max-width: 550px) {
    width: 100%;
  }
`;

export const MultiSwapReceiveTokensBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 475px;
  height: 115px;
  margin-bottom: 20px;
  margin-left: 20px;
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

  @media (max-width: 550px) {
    width: 92%;
    margin: 0 auto;
    margin-bottom: 20px;
  }
`;

export const FirstSubLayoutMultiSwapReceiveTokensBlock = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

export const SecondSubLayoutMultiSwapReceiveTokensBlock = styled.div`
  padding-left: 12px;
  padding-right: 19px;
  margin-top: 5px;
`;

export const ChooseBtnTokenBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 60px;
`;

export const MultiSwapChooseBtnTokenBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

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

export const ChosenSendReceiveTokenValueInput = styled(TextField)`
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

export const USDCurrencySendInputBlock = styled.div`
  //display: flex;
  //flex-direction: column;
  //height: 50px;
  //margin-left: auto;
  //gap: 3px;
`;

export const USDCurrencyInputBlock = styled.div`
  display: flex;
  flex-direction: column;
  height: 50px;
  margin-left: auto;
  gap: 3px;
  //background-color: pink;
`;

export const ChosenMultiSwapSendReceiveTokenValueInput = styled(TextField)`
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

  @media (max-width: 550px) {
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

  @media (max-width: 550px) {
    margin-top: 20px;
  }
`;

export const AddReceiveTokenMultiSwapBtn = styled(Button)`
  display: flex;
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

export const SingleSwapTokensOfferedBySubBlock = styled.div`
  width: ${(props) => (props.mobilePopover ? '100%' : '525px')};
  height: 515px;
  background-color: ${(props) => (props.isLightTheme ? '#FFFFFF29' : '#4453AD1A')};
  box-shadow: ${(props) =>
    props.isLightTheme
      ? 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'
      : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
  backdrop-filter: ${(props) => (props.isLightTheme ? 'none' : 'blur(35px)')};
  border-radius: 10px;

  //@media (max-width: 550px) {
  //  width: auto;
  //}
`;

export const SwapTokensOfferedBySubBlock = styled.div`
  width: 525px;
  height: 480px;
  background-color: ${(props) => (props.isLightTheme ? '#FFFFFF29' : '#4453AD1A')};
  box-shadow: ${(props) =>
    props.isLightTheme
      ? 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'
      : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
  backdrop-filter: ${(props) => (props.isLightTheme ? 'none' : 'blur(35px)')};
  border-radius: 10px;

  @media (max-width: 550px) {
    width: auto;
  }
`;

export const ExchangersMainSubLayout = styled.div``;

export const OfferedByLayoutLabelBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 20px;
  padding-left: 20px;
  cursor: pointer;

  img {
    transform: rotate(90deg);
  }

  span {
    color: ${(props) => (props.isLightTheme ? '#1E1E20' : '#FFFFFF')};
    font-size: 20px;
    font-weight: 600;
    margin-left: 8px;
  }
`;

export const ExchangersLayout = styled.div``;

export const TransactionSpeedGridLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TransactionSpeedGridLayoutItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 336px;
  margin: 26px 99px 0 89px;
  font-size: 14px;
  cursor: pointer;

  span {
    color: ${(props) => (props.isLightTheme ? '#1E1E20' : '#FFFFFF')};
  }
`;

export const GridLayoutItemIconSubBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    display: grid;
    grid-template-columns: 32px 60px;
  }
`;

export const ExchangersMainListLayout = styled.div`
  height: 310px;
  overflow: auto;

  // width of scrollbar
  ::-webkit-scrollbar {
    width: 8px;
    height: 40px;
  }

  /* Track styles */
  ::-webkit-scrollbar-track {
    //box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${(props) => (props.isLightTheme ? '#ffffff' : '#ffffff')};
    opacity: ${(props) => (props.isLightTheme ? 0 : 0.8)};
    box-shadow: ${(props) =>
      props.isLightTheme
        ? '7px 21px 22px -15px rgba(51, 78, 131, 0.17)'
        : 'box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
    mix-blend-mode: ${(props) => (props.isLightTheme ? 'none' : 'normal')};
    backdrop-filter: ${(props) => (props.isLightTheme ? 'none' : 'blur(35px)')};
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    //background: #ffffff;
    cursor: pointer;
  }
`;

export const SaveSelectedExchangerButton = styled(Button)`
  width: 150px;
  height: 40px;
  margin-top: 24px;
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

  @media (max-width: 550px) {
    width: 345px;
  }
`;

export const ExchangersLayoutTitlesBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 209px;
  margin-top: 20px;
  margin-left: ${(props) => (props.mobilePopover ? '15px' : '30px')};

  span {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 19px;
    color: ${(props) => (props.isLightTheme ? '#1E1E20' : '#FFFFFF')};
    opacity: ${(props) => (props.isLightTheme ? 0.5 : 0.8)};
  }
`;

export const ExchangerMainList = styled(List)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${(props) => (props.mobilePopover ? '345px' : '488px')};
  margin-left: ${(props) => (props.mobilePopover ? '0px' : '16px')};

  padding: 0;
  margin-top: 15px;
  //background: green;
`;

export const ExchangerElementListItem = styled(ListItem)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: ${(props) => (props.mobilePopover ? '345px' : '488px')};
  margin-left: ${(props) => props.mobilePopover && '10px'};
  height: 40px;
  padding: 0;
  padding-left: 10px;
  margin-bottom: ${(props) => (props.mobilePopover ? '0px' : '10px')};

  :hover {
    background-color: ${(props) => (props.isLightTheme ? '#ffffff' : '#1F265C3D')};
    box-shadow: ${(props) =>
      props.isLightTheme
        ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
        : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
    backdrop-filter: ${(props) => (props.isLightTheme ? 'none' : 'blur(35px)')};
    border-radius: 10px;
    cursor: pointer;
  }
`;

export const ExchangerElementSpan = styled.span`
  font-size: 14px;
  color: ${(props) => (props.isLightTheme ? '#1E1E20' : '#FFFFFF')};
  margin-right: ${(props) => (props.mobilePopover ? '0px' : '36px')};
`;

export const ExchangerBestRateSpan = styled.span`
  margin-left: ${(props) => (props.mobilePopover ? '69px' : '74px')};

  font-size: 10px;
  color: ${(props) => (props.isLightTheme ? '#4453AD' : '#8F86FF')};
  font-weight: ${(props) => (props.isLightTheme ? '500' : '800')};
`;

export const ExchangerIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-left: ${(props) => (props.mobilePopover ? '34px' : '44px')};
`;

export const GreenDotIcon = styled.img`
  width: 10px;
  height: 10px;
  margin-left: ${(props) => (props.mobilePopover ? '19px' : '35px')};
`;

//-------

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

    @media (max-width: 550px) {
      width: 345px;
      margin-top: 20px;
    }
  }
`;

export const AdvancedSettingsButton = styled(Button)`
  width: 150px;
  height: 40px;
  margin-top: 21px;
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

  @media (max-width: 550px) {
    width: 345px;
  }
`;

export const SlippageToleranceLabel = styled.span`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  font-size: 16px;
  font-weight: 600;
  line-height: 25px;
  color: ${(props) => (props.isLightTheme ? '#1E1E20' : '#FFFFFF')};
`;

export const SlippageToleranceBtnsLayout = styled.div`
  width: 340px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  margin-top: 20px;
`;

export const StablePercentChooseToleranceBtn = styled(Button)`
  width: 55px;
  height: 45px;
  color: ${(props) => (props.isLightTheme ? '#1E1E20' : '#FFFFFF')};
  background: ${(props) => (props.isLightTheme ? '#ffffff29' : '#1F265C3D')};
  mix-blend-mode: normal;
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(35px);
  border-radius: 10px;

  :hover {
    background-color: ${(props) => (props.isLightTheme ? '#FFFFFF' : '#8F86FF')};
  }
`;

export const FloatPercentChooseToleranceBtn = styled(Button)`
  width: 120px;
  height: 45px;
  color: ${(props) => (props.isLightTheme ? '#1E1E20' : '#FFFFFF')};
  background: ${(props) => (props.isLightTheme ? '#ffffff29' : '#1F265C3D')};
  mix-blend-mode: normal;
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(35px);
  border-radius: 10px;

  :hover {
    background-color: ${(props) => (props.isLightTheme ? '#FFFFFF' : '#8F86FF')};
  }
`;

export const SwapSecondColumn = styled.div`
  width: 550px;
  height: 585px;
  @media (max-width: 1200px) {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }

  @media (max-width: 550px) {
    width: auto;
  }
`;

export const SecondColumnSwapSubBlock = styled.div`
  width: 550px;
  height: 585px;
  //background-color: gray;
  @media (max-width: 550px) {
    width: 99vw;
    margin-top: 15px;
  }
`;

export const SecondColumnTitleBlock = styled.div`
  ${ColumnsTitleBlocks};

  @media (max-width: 550px) {
    width: auto;
    margin-bottom: 20px;
  }

  //@media (max-width: 1200px) {
  padding-left: 10px;

  //}
`;

export const SecondColumnTitleHeaderBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TokensModalSubLayout = styled.div`
  margin-top: -80px;
  width: 475px;
  height: 545px;
  background: ${(props) =>
    props.isLightTheme
      ? `url(${require(`./../../assets/images/lightDashboard.jpg`).default})`
      : `#1F265C3D`};
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);
  mix-blend-mode: normal;
  border-radius: 10px;

  @media (max-width: 550px) {
    width: 100vw;
    height: 100vh;
    margin-top: 0;
  }
`;

export const SearchTokensModalTextField = styled(TextField)`
  display: flex;
  justify-content: center;
  margin-left: 20px;
  width: 435px;
  height: 40px;
  margin-top: 20px;
  background-color: ${(props) => (props.isLightTheme ? '#FFFFFF' : '#1F265C3D')};
  box-shadow: ${(props) =>
    props.isLightTheme
      ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
      : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
  mix-blend-mode: normal;
  backdrop-filter: ${(props) => (props.isLightTheme ? 'none' : 'blur(35px)')};
  border-radius: 10px;

  @media (max-width: 550px) {
    width: 95%;
    margin-left: 10px;
  }
`;

export const SendTokensModalList = styled(List)`
  margin-top: 20px;
  margin-left: 10px;
  height: 400px;
  overflow: auto;
  padding: 0;

  // width of scrollbar
  ::-webkit-scrollbar {
    width: 8px;
    height: 40px;
  }

  /* Track styles */
  ::-webkit-scrollbar-track {
    //box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${(props) => (props.isLightTheme ? '#ffffff' : '#FFFFFF')};
    box-shadow: ${(props) =>
      props.isLightTheme
        ? '7px 21px 22px -15px rgba(51, 78, 131, 0.17)'
        : 'box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
    mix-blend-mode: ${(props) => (props.isLightTheme ? 'none' : 'normal')};
    backdrop-filter: ${(props) => (props.isLightTheme ? 'none' : 'blur(35px)')};
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    //background: #ffffff;
    cursor: pointer;
  }

  @media (max-width: 550px) {
    height: 680px;
  }
`;

export const SendTokenModalListItem = styled(ListItem)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 !important;
  margin-bottom: 10px;
  width: 445px;
  height: 55px;

  @media (max-width: 550px) {
    width: 370px;
  }

  :hover {
    cursor: pointer;
    background-color: ${(props) => (props.isLightTheme ? '#ffffff' : '#1F265C3D !important')};
    border-radius: 10px;
    box-shadow: ${(props) =>
      props.isLightTheme
        ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
        : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
    mix-blend-mode: ${(props) => (props.isLightTheme ? 'none' : 'normal')};
    backdrop-filter: ${(props) => (props.isLightTheme ? 'none' : 'blur(35px)')};
  }
`;

export const ReceiveTokenModalListItem = styled(ListItem)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 !important;
  margin-bottom: 10px;
  width: 445px;
  height: 40px;

  @media (max-width: 550px) {
    width: 360px;
  }

  :hover {
    cursor: pointer;
    background-color: ${(props) => (props.isLightTheme ? '#ffffff' : '#1F265C3D !important')};
    border-radius: 10px;
    box-shadow: ${(props) =>
      props.isLightTheme
        ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
        : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
    mix-blend-mode: ${(props) => (props.isLightTheme ? 'none' : 'normal')};
    backdrop-filter: ${(props) => (props.isLightTheme ? 'none' : 'blur(35px)')};
  }
`;

export const SendTokenImg = styled.img`
  width: 21px;
  height: 21px;
  border-radius: 50%;
  background-color: #e5e5e5;
  margin-right: 10px;
  margin-left: 12px;
`;

export const SendTokenImgExchanger = styled.img`
  width: 21px;
  height: 21px;
  border-radius: 50%;
  background-color: #e5e5e5;
  margin-right: 10px;
  margin-left: 12px;

  @media (max-width: 550px) {
    margin-left: 0;
  }
`;

export const SendTokenLabelsBlock = styled.div`
  display: flex;
  justify-content: space-between;
  //margin-left: 10px;

  img {
    margin-top: 3px;
  }
`;

export const ReceiveSendTokenLabelsBlock = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 550px) {
    margin-left: 10px;
  }

  img {
    margin-top: 3px;
  }
`;

export const SendTokenName = styled.span`
  color: ${(props) => (props.isLightTheme ? '#1e1e20' : '#FFFFFF')};
  font-family: 'Saira', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 25px;
`;

export const SendTokenConvertedMeasures = styled.span`
  color: ${(props) => (props.isLightTheme ? '#1E1E20' : '#FFFFFF')};
  opacity: ${(props) => (props.isLightTheme ? 0.5 : 0.8)};
  font-family: 'Saira', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0;
  text-align: center;
  margin-right: auto;

  //@media (max-width: 550px) {
  //  font-size: 12px;
  //}
`;

export const SendTokenBalance = styled.div`
  margin-right: 10px;
  margin-top: -20px;

  @media (max-width: 550px) {
    margin-right: 5px;
    margin-top: 0;
  }
  span {
    color: ${(props) => (props.isLightTheme ? '#1E1E20' : '#FFFFFF')};
    font-family: 'Saira', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 25px;

    @media (max-width: 550px) {
      font-size: 14px;
    }
  }
`;

export const AbsentFoundTokensBlock = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  height: 420px;
  overflow: auto;
  padding: 0;

  p {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 41px;
    color: ${(props) => (props.isLightTheme ? '#1E1E20' : '#ffffff')};
  }
`;
