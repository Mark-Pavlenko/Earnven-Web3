import { experimentalStyled as styled } from '@material-ui/core/styles';
import lightDashboardBig from '../assets/images/lightDashboardBig.jpg';
import lightDashboard from '../assets/images/lightDashboard.jpg';

export const RootStyle = styled('div')`
  background: ${(props) =>
    props.isLightTheme
      ? `url(${require(`../assets/images/lightDashboard.jpg`).default})`
      : `#10142D`};
  background-repeat: no-repeat;
  background-size: 100% 100%;

  @media (min-width: 1281px) {
    background-size: 100% 100%;
    background: ${(props) =>
      props.isLightTheme
        ? `url(${require(`../assets/images/lightDashboardBig.jpg`).default})`
        : `#10142D`};
  }
  @media (max-width: 480px) {
    background: ${(props) =>
      props.isLightTheme
        ? `url(${require(`./../assets/images/bgMobile_375x3201.jpg`).default})`
        : `#0B0E1D`};
    background-size: cover;
  }
`;

export const MainStyle = styled('div')`
  flex-grow: 1;
  height: 100vh;
  background-size: 100% 100%;

  @media (min-width: 1024px) {
    padding-right: 35px;
    padding-bottom: 20px;
    padding-left: 35px;
    max-height: 100vh;
    background-size: 100% 100%;
  }

  @media (min-width: 1280px) {
    margin-left: 150px;
    margin-top: -24px;
    height: 100vh;
    background-size: 100% 100%;
  }

  @media screen and (max-width: 1445px) and (min-width: 1281px) {
    max-width: 1770px;
  }

  @media (min-width: 1445px) {
    margin-left: 314px;
    max-width: 1635px;
  }
`;
