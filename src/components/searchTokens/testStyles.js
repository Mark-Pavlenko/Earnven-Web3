import styled from 'styled-components';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const TokensListBox = styled(Box)``;

export const FoundTokenBlock = styled.div`
  span {
    color: ${(props) => (props.isLightTheme ? `black` : `white`)};
  }
`;

export const TokensListTextField = styled(TextField)``;
