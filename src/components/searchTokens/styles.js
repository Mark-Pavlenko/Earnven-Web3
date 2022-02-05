import styled from 'styled-components';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const TokensListBox = styled(Box)``;

export const FoundTokenBlock = styled.div`
  :hover {
    color: ${(props) => (props.isLightTheme ? '#4453AD' : '#8F86FF')};
  }

  span {
    color: ${(props) => (props.isLightTheme ? `black` : `white`)};

    :hover {
      color: ${(props) => (props.isLightTheme ? '#4453AD' : '#8F86FF')};
    }
  }
`;

export const TokensListTextField = styled(TextField)``;

export const SearchIcon = styled.img`
  height: 20px;
  width: 17px;
  margin-right: 10px;
`;
