import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const PopupTitle = styled(Typography)`
  flex-grow: 1;
  color: ${(props) => (props.isLightTheme ? '#1E1E20' : '#FFFFFF')};
  line-height: 41px;
  font-size: 26px;

  @media (max-width: 710px) {
    display: flex;
    justify-content: center;
  }
`;
