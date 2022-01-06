import styled from 'styled-components';
import { Avatar, Box, List } from '@material-ui/core';

export const AccountLayout = styled.div``;

export const AccountStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin-top: 28px;
  margin-right: 20px;
`;

const handleBackgroundColorBtn = (isLightTheme, isBlockActivated) => {
  switch (true) {
    case isBlockActivated && isLightTheme:
      return 'background: #FFFFFF29; backdrop-filter: blur(35px); box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);';
    case !isBlockActivated && isLightTheme:
      return 'background: white; box-shadow: 4px 6px 20px -5px rgba(51, 78, 131, 0.17);';
    case isBlockActivated && !isLightTheme:
      return 'background: #1F265C3D; backdrop-filter: blur(35px); box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);';
    default:
      return 'background: #1F265C3D; backdrop-filter: blur(35px); box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);';
  }
};

export const WalletsListBlock = styled.div`
  display: flex;
  flex-direction: column;

  ${(props) => handleBackgroundColorBtn(props.isLightTheme, props.isBlockActivated)};

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

export const MyWalletsLabel = styled(Box)`
  margin-left: 25px;
  margin-top: 25px;

  p {
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    color: ${(props) => (props.isLightTheme ? '#1E1E20' : '#ffffff')};
  }
`;

export const WalletsList = styled(List)`
  :hover {
    background: white;
    color: black;
    height: 56px;
  }
`;
