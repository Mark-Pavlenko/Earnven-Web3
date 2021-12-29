// import { experimentalStyled as styled } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const RootStyle = styled.div`
  background: ${(props) =>
    props.isLightTheme
      ? `url(${require(`../../assets/images/lightDashboard.jpg`).default})`
      : `#0B0E1D`};
  @media (min-width: 1880px) {
    background: ${(props) =>
      props.isLightTheme
        ? `url(${require(`../../assets/images/lightDashboardBig.jpg`).default})`
        : `#0B0E1D`};
  }
`;

export const MainStyle = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;

  @media (max-width: 710px) {
    padding-top: 27px;
    padding-left: 15px;
    padding-right: 15px;
  }

  @media (min-width: 711px) {
    padding-right: 35px;
    padding-bottom: 20px;
    padding-left: 35px;
  }

  @media (min-width: 1280px) {
    margin-top: 72px;
    margin-left: 314px;
  }
`;

export const MainSubLayout = styled.div`
  width: 570px;

  @media (max-width: 710px) {
    width: 345px;
  }
`;

export const MainSubLayoutTitle = styled.p`
  margin-bottom: 7px;
  font-size: 12px;

  @media (max-width: 1279px) {
    font-size: 16px;
    font-weight: bold;
  }
`;

export const MetaMaskBtn = styled(Button)`
  height: 60px;
  border-radius: 7px;
  background-color: #ffffff;
  box-shadow: inset 0 5px 10px -6px rgba(51, 78, 131, 0.12);

  :hover {
    background-color: #e5e5e5;
  }
`;

export const WalletBtnConnect = styled(Button)``;

export const WalletBtnConnectImg = styled.img`
  width: 20px;
  height: 20px;
`;
