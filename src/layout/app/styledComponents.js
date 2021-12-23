import { experimentalStyled as styled } from '@material-ui/core/styles';

export const RootStyle = styled('div')`
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

export const MainStyle = styled('div')`
  flex-grow: 1;
  margin-left: 314px;
  padding-right: 35px;
  padding-bottom: 20px;
  padding-left: 35px;
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
