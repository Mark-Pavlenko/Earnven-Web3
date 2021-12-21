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
    console.log('=======>', props);
    return props.appBarDesktop + 15;
  }};
  padding-left: ${(props) => props.theme.spacing(2)};
  padding-right: ${(props) => props.theme.spacing(2)};
  @media (min-width: 1880px) {
    background-image: ${(props) =>
      props.themeBG === 'Day'
        ? `url(${require(`../../assets/images/lightDashboardBig.jpg`).default})`
        : `#0B0E1D`};
  }
`;
// flexGrow: 1,
// paddingTop: APP_BAR_MOBILE + 15,
// paddingBottom: theme.spacing(10),
// background:
//   localStorage.getItem('selectedTheme') === 'Day' ? `url(${lightDashboard})` : `#0B0E1D`,
// [theme.breakpoints.up('lg')]: {
//   paddingTop: APP_BAR_DESKTOP,
//   paddingLeft: theme.spacing(2),
//   paddingRight: theme.spacing(2),

// export const MainStyle = styled('div')(({ theme }) => ({
//   flexGrow: 1,
//   paddingTop: APP_BAR_MOBILE + 15,
//   paddingBottom: theme.spacing(10),
//   background:
//     localStorage.getItem('selectedTheme') === 'Day' ? `url(${lightDashboard})` : `#0B0E1D`,
//   [theme.breakpoints.up('lg')]: {
//     paddingTop: APP_BAR_DESKTOP,
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(2),
//   },
// }));
