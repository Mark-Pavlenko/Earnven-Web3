import { experimentalStyled as styled } from '@material-ui/core/styles';

export const RootStyle = styled('div')({
  display: 'flex',
});

export const MainStyle = styled('div')`
  flex-grow: 1;
  padding-top: ${(props) => props.appBarMobile + 15};
  padding-bottom: ${(props) => props.theme.spacing(10)};
  background-image: ${(props) =>
    props.themeBG === 'Day'
      ? `url(${require(`../../assets/images/lightDashboard.jpg`).default})`
      : `#0B0E1D`};
  padding-top: ${(props) => {
    return props.appBarDesktop + 15;
  }};
  padding-left: ${(props) => props.theme.spacing(2)};
  padding-right: ${(props) => props.theme.spacing(20)};
  padding-top: ${(props) => props.theme.spacing(14)};
  @media (min-width: 1880px) {
    background-image: ${(props) =>
      props.themeBG === 'Day'
        ? `url(${require(`../../assets/images/lightDashboardBig.jpg`).default})`
        : `#0B0E1D`};
  }
`;
