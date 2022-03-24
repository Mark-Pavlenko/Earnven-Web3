import { experimentalStyled as styled } from '@material-ui/core/styles';

export const RootStyle = styled('div')`
  height: fit-content;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${(props) =>
    props.isLightTheme
      ? `url(${require(`./../assets/images/lightDashboard.jpg`).default})`
      : `#0B0E1D`};
  @media (min-width: 1921px) {
    background: ${(props) =>
      props.isLightTheme
        ? `url(${require(`../assets/images/lightDashboardBig.jpg`).default})`
        : `#0B0E1D`};
  }
  @media (max-width: 480px) {
    background: ${(props) =>
      props.isLightTheme
        ? `url(${require(`./../assets/images/bgMobile_375x3201.jpg`).default})`
        : `#0B0E1D`};
    background-size: cover;
  }
  @media (max-width: 480px) {
    background: ${(props) =>
      props.isLightTheme
        ? `url(${require(`./../assets/images/bgMobile_375x3201.jpg`).default})`
        : `#0B0E1D`};
    background-size: cover;
  }
  @media (max-width: 480px) {
    background: ${(props) =>
      props.isLightTheme
        ? `url(${require(`./../assets/images/bgMobile_375x3201.jpg`).default})`
        : `#0B0E1D`};
    background-size: cover;
  }
`;

export const MainStyleParentLayout = styled('div')`
  @media (min-width: 1921px) {
    display: flex;
    justify-content: center;
  }
`;

export const MainLayoutNotFirstConnection = styled('div')`
  min-height: 100vh;
  height: 100%;
  flex-grow: 1;
`;

export const MainStyle = styled('div')`
  min-height: 100vh;
  height: 100%;
  flex-grow: 1;
  background-color: ${(props) => (props.isLightTheme ? `transparent` : `#0B0E1D`)};

  @media (min-width: 1930px) {
    background-color: ${(props) => (props.isLightTheme ? `transparent` : `#0B0E1D`)};
  }

  @media (min-width: 1024px) {
    padding-right: 35px;
    padding-bottom: 20px;
    padding-left: 35px;
  }

  @media (min-width: 1281px) {
    margin-left: 150px;
    margin-top: -24px;
  }

  @media screen and (max-width: 1445px) and (min-width: 1281px) {
    max-width: 1770px;
  }

  @media (min-width: 1445px) {
    margin-left: 314px;
    max-width: 1606px;
  }
`;
