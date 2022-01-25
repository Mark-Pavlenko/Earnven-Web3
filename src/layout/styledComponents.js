import { experimentalStyled as styled } from '@material-ui/core/styles';

export const RootStyle = styled('div')`
  background: ${(props) =>
    props.isLightTheme
      ? `url(${require(`./../assets/images/lightDashboard.jpg`).default})`
      : `#0B0E1D`};
  background-repeat: no-repeat;
  background-size: 100% 100%;
  @media (min-width: 1281px) {
    background-size: 100% 100%;
    background: ${(props) =>
      props.isLightTheme
        ? `url(${require(`./../assets/images/lightDashboardBig.jpg`).default})`
        : `#0B0E1D`};
  }
`;

export const MainStyle = styled('div')`
  flex-grow: 1;
  height: 100vh;
  background-size: 100% 100%;
  background-color: ${(props) => (props.isLightTheme ? `transparent` : `#0B0E1D`)};

  @media (min-width: 1930px) {
    background-color: ${(props) => (props.isLightTheme ? `transparent` : `#0B0E1D`)};
    background-size: 100% 100%;
  }

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

  @media (min-width: 1445px) {
    margin-left: 314px;
  }
`;
