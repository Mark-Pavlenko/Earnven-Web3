import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

export const DisconnectWarnLabel = styled('div')(({ isLightTheme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '44px',
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

export const ButtonsLayout = styled('div')(({ isLightTheme }) => ({}));

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

export const Button_Rename = styled(Button)(({ isLightTheme }) => ({
  width: '150px',
  height: '40px',
  position: 'absolute',
  // top: '30px',
  left: '250px',
  bottom: '53px',
  mixBlendMode: 'normal',
  color: isLightTheme ? '#1E1E20' : '#FFFFFF',
  boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
  backdropFilter: isLightTheme ? 'none' : 'blur(35px)',
  borderRadius: '10px',
  fontFamily: 'Saira, sans-serif',
  fontSize: '14px',
  lineHeight: '22px',
  display: 'flex',
  fontStyle: 'normal',
  border: '0px',
  textAlign: 'center',
  '&:hover': {
    mixBlendMode: 'normal',
    boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    fontFamily: 'Saira, sans-serif',
    fontSize: '14px',
    lineHeight: '22px',
    display: 'flex',
    fontStyle: 'normal',
    border: '0px',
    textAlign: 'center',
  },
}));

export const Button_Rename_Disconnect = styled(Button)(({ isLightTheme }) => ({
  width: '150px',
  height: '40px',
  position: 'absolute',
  left: '430px',
  bottom: '53px',

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
}));
