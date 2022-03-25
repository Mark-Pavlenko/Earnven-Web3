import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const PopupTitle = styled(Typography)`
  flex-grow: 1;
  color: ${(props) => (props.isLightTheme ? '#1E1E20' : '#FFFFFF')};
  line-height: 41px;
  font-size: 26px;

  @media (max-width: 850px) {
    display: flex;
    justify-content: start;
    //margin-top: 100px;
  }
`;

export const CloseMobileSidebarIcon = styled.img`
  margin-left: auto;
  cursor: pointer;
`;

export const LogoImg = styled.img``;

export const MobileLogoBlockWalletsList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
`;

export const MobileLogoBlockSubLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
