import { experimentalStyled as styled } from '@material-ui/core/styles';

export const RootStyle = styled('div')`
  min-height: 100%;
  background: ${(props) =>
    props.isLightTheme
      ? `url(${require(`./../assets/images/lightBg2048x3448.jpg`).default})`
      : `#0B0E1D`};
  @media (min-width: 1281px) {
    background: ${(props) =>
      props.isLightTheme
        ? `url(${require(`./../assets/images/lightDashboardBig.jpg`).default})`
        : `#0B0E1D`};
  }
`;

export const MainStyle = styled('div')`
  flex-grow: 1;
  background-color: ${(props) => (props.isLightTheme ? `transparent` : `#0B0E1D`)};

  @media (min-width: 1930px) {
    background-color: ${(props) => (props.isLightTheme ? `transparent` : `#0B0E1D`)};
  }

  @media (min-width: 1024px) {
    //padding-right: 35px;
    padding-bottom: 20px;
    //padding-left: 35px;
  }

  @media (min-width: 1280px) {
    margin-left: 150px;
    margin-top: -24px;
  }

  @media (min-width: 1445px) {
    margin-left: 314px;
  }

  @media (min-width: 375px) {
    padding-right: 0;
    padding-left: 0;
  }
`;
