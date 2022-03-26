import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import TextField from '@mui/material/TextField';

export const DisconnectWarnLabel = styled('div')(({ isLightTheme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '61px',
  fontSize: '14px',
  color: isLightTheme ? '#1E1E20' : '#ffffff',
  fontFamily: 'Saira, sans-serif',
  lineHeight: '22px',
  fontStyle: 'normal',
  fontWeight: 'normal',
}));

export const Address = styled('div')(({ isLightTheme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '30px',
  fontSize: '12px',
  lineHeight: '22px',
  font: 'Saira',
  fontStyle: 'normal',
  color: isLightTheme ? '#1E1E20' : '#ffffff',
  opacity: 0.5,
  fontFamily: 'Saira, sans-serif',
}));

export const CutAddressName = styled('div')(({ isLightTheme }) => ({
  textAlign: 'center',
  position: 'relative',
  marginTop: '10px',
  fontSize: '14px',
  color: isLightTheme ? '#4453AD' : '#8F86FF',
  lineHeight: '22px',
  font: 'Saira, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
}));

export const ButtonsLayout = styled('div')(({ isLightTheme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: '30px',
  marginTop: '70px',

  '@media (max-width:850px)': {
    flexDirection: 'column',
    gap: '20px',
    marginTop: '85px',
  },
}));

export const Button_Cancel = styled(Button)(({ isLightTheme }) => ({
  width: '150px',
  height: '40px',
  mixBlendMode: 'normal',
  color: isLightTheme ? '#1E1E20' : '#ffffff',
  backgroundColor: isLightTheme ? '#FFFFFF29' : '#1F265C3D',
  boxShadow: isLightTheme
    ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
    : '7px 21px 22px -15px rgba(51, 78, 131, 0.17)',
  borderRadius: '10px',
  fontFamily: 'Saira, sans-serif',
  lineHeight: '22px',
  display: 'flex',
  fontStyle: 'normal',
  fontWeight: '400 !important',
  overflow: 'inherit',
  border: '0px',
  '&:hover': {
    mixBlendMode: 'normal',
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 5px 5px rgba(0,0,0,0.22)',
    borderRadius: '10px',
    fontFamily: 'Saira, sans-serif',
    backgroundColor: isLightTheme ? '#FFFFFF' : '#8F86FF',
    fontSize: '14px',
    lineHeight: '22px',
    display: 'flex',
    fontStyle: 'normal',
    overflow: 'inherit',
  },

  '@media (max-width:850px)': {
    width: '100%',
  },
}));

export const Button_Success_Action = styled(Button)(({ isLightTheme }) => ({
  width: '150px',
  height: '40px',
  mixBlendMode: 'normal',
  color: isLightTheme ? '#4453AD' : '#ffffff',
  backgroundColor: isLightTheme ? '#FFFFFF' : '#8F86FF',
  boxShadow: isLightTheme
    ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
    : '7px 21px 22px -15px rgba(51, 78, 131, 0.17)',
  borderRadius: '10px',
  fontFamily: 'Saira, sans-serif',
  fontSize: '14px',
  lineHeight: '22px',
  display: 'flex',
  fontStyle: 'normal',
  overflow: 'inherit',
  border: '0px',
  '&:hover': {
    mixBlendMode: 'normal',
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 5px 5px rgba(0,0,0,0.22)',
    borderRadius: '10px',
    fontFamily: 'Saira, sans-serif',
    backgroundColor: isLightTheme ? '#FFFFFF' : '#8F86FF',
    fontSize: '14px',
    lineHeight: '22px',
    display: 'flex',
    fontStyle: 'normal',
    overflow: 'inherit',
  },
  '@media (max-width:850px)': {
    width: '100%',
  },
}));

export const RenameWalletGeneraLayout = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

export const AddressInputLayout = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '65px',

  '@media (max-width:850px)': { marginTop: '46px' },
}));

export const AddressRenameWallet = styled('div')(({ isLightTheme }) => ({
  marginBottom: '12px',
  marginLeft: '2px',
  fontSize: '12px',
  lineHeight: '19px',
  fontStyle: 'normal',
  color: isLightTheme ? '#1E1E20' : '#FFFFFF',
  opacity: isLightTheme && 0.5,
  fontFamily: 'Saira, sans-serif',
  flexGrow: 1,

  '@media (max-width:850px)': {
    marginBottom: '0px',
    marginTop: '10px',
    fontSize: '10px',
  },
}));

export const Input_Rename = styled(TextField)(({ isLightTheme }) => ({
  fontSize: '14px',
  lineHeight: '22px',
  fontStyle: 'normal',
  fontFamily: 'Saira, sans-serif',
  height: '60px',
  width: '475px',
  borderRadius: '10px',
  border: '0px',
  boxShadow: isLightTheme
    ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
    : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
  background: isLightTheme ? '#ffffff' : '#1F265C3D',
  color: isLightTheme ? 'black' : 'white',
  backdropFilter: isLightTheme ? 'none' : 'blur(35px)',

  '@media (max-width:850px)': { width: '100%' },
}));
