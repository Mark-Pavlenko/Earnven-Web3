import styled from 'styled-components';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const TokensListBox = styled(Box)`
  margin-top: -8px;
  background-color: ${(props) => (props.isLightTheme ? '#FFFFFF29' : '#11132C')};
  height: 20px !important;

  ::-webkit-scrollbar {
    width: 8px;
    height: 40px;
  }

  /* Track styles */
  ::-webkit-scrollbar-track {
    //box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${(props) => (props.isLightTheme ? '#ffffff' : '#1F265C3D')};
    box-shadow: ${(props) =>
      props.isLightTheme
        ? '7px 21px 22px -15px rgba(51, 78, 131, 0.17)'
        : 'box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
    mix-blend-mode: ${(props) => (props.isLightTheme ? 'none' : 'normal')};
    backdrop-filter: ${(props) => (props.isLightTheme ? 'none' : 'blur(35px)')};
    border-radius: 10px;
  }
`;

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
