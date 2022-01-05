import styled from 'styled-components';
import { Avatar } from '@material-ui/core';

export const AccountLayout = styled.div``;

export const AccountStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin-top: 28px;
  margin-right: 20px;
`;

export const WalletsListBlock = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => (props.isLightTheme ? '#ffffff' : '#1F265C')};
  box-shadow: ${(props) =>
    props.isLightTheme
      ? 'inset 0 0 4px rgba(68, 83, 173, 0.1)'
      : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
  backdrop-filter: ${(props) => (props.isLightTheme ? 'none' : 'blur(35px)')};
  border-radius: 10px;
  width: 186px;
  height: 74px;
`;

export const FirstWalletsListBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  //margin-top: 9px;
  margin-left: 20px;
`;

export const UserAvatar = styled(Avatar)`
  width: 21px;
  height: 21px;
  margin-right: 5px;
`;

export const WalletAddress = styled.p`
  color: ${(props) => (props.isLightTheme ? 'black' : 'white')};
  font-size: 14px;
`;

export const WalletArrow = styled.span`
  margin-left: auto;
  margin-top: 7px;
  margin-right: 20px;
`;

export const EnterAccountBlock = styled.div`
  //margin-top: -20px;
  //margin-left: 10px;

  display: flex;
  margin-top: 30px;
  margin-left: auto;
  margin-right: 20px;
  width: 169px;
  height: 38px;

  p {
    color: ${(props) => (props.isLightTheme ? 'black' : 'white')};
    font-family: 'Saira', sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 19px;
  }
`;
