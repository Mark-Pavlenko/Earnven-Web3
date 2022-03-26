import styled from 'styled-components';
import TextField from '@mui/material/TextField';

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

export const Address = styled('div')(({ isLightTheme }) => ({
  marginLeft: '2px',
  fontSize: '12px',
  lineHeight: '19px',
  fontStyle: 'normal',
  color: isLightTheme ? '#1E1E20' : '#FFFFFF',
  opacity: isLightTheme && 0.5,
  fontFamily: 'Saira, sans-serif',
  flexGrow: 1,

  '@media (max-width:850px)': { marginBottom: '0px', marginTop: '10px', fontSize: '10px' },
  '@media (min-width:851px)': { marginBottom: '12px' },
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
