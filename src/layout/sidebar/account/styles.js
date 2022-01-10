import styled from 'styled-components';
import { experimentalStyled as MUIStyled } from '@material-ui/core/styles';
import { Avatar, Box, List, ListItem, Typography } from '@material-ui/core';

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
  padding-top: 8px;
  //:hover {

  //}
`;

export const WalletsListItem = styled(ListItem)`
  display: flex;
  align-items: center;
  height: 60px;
  width: 291px;
  margin-left: 27px;
  padding-top: 12px;
  padding-left: 7px;
  //background-color: red;
  :hover {
    cursor: pointer;
    background-color: ${(props) => (props.isLightTheme ? '#ffffff' : '#1F265C3D')};
    box-shadow: ${(props) =>
      props.isLightTheme
        ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
        : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
    backdrop-filter: ${(props) => (props.isLightTheme ? 'none' : 'blur(35px)')};
    border-radius: 10px;
  }
`;

//dropdown wallets list styles

export const WalletsListLayout = MUIStyled('div')(({ theme }) => ({
  width: '291px',
  // backgroundColor: 'orange',
  // marginTop: '20px',
  // paddingBottom: 0,
  // background: 'rgba(255, 255, 255, 0.16)',
  // mixBlendMode: 'normal',
  // boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
  // backdropFilter: 'blur(35px)',
}));

export const WalletListItemAccountLogo = MUIStyled(Avatar)(({ theme }) => ({
  width: '1.3125rem',
  height: '1.3125rem',
  marginRight: '27px',
  // marginTop: '-3rem',
  // marginRight: '-0.063rem',
}));

export const WalletListItemContent = styled.div`
  display: flex;
  align-items: center;
  margin-left: 27px;
`;

export const WalletListItemAccountBalance = MUIStyled('div')(({ isLightTheme }) => ({
  fontSize: '10px',
  color: isLightTheme ? 'black' : 'white',
  textAlign: 'left',
  // marginTop: '-3px',
  // marginLeft: '-26.4px',
}));

export const WalletListItemGreenDot = styled.img`
  display: flex;
  float: right;
  margin-top: 2.09px;
  margin-left: 10px;
`;

export const List_Menu_Pop_UP = styled('div')(({ theme }) => ({
  width: '276px',
  height: '40px',
  display: 'flex',
  '&:hover': {
    backgroundColor: 'red',
    color: 'orange',
    fontWeight: 600,
  },
  marginLeft: '12px',
  borderRadius: '10px',
  cursor: 'pointer',
}));

export const DotIconBlock = styled.div`
  margin-left: auto;
  margin-top: -12px;
  margin-right: -7px;
  width: 16px;
  height: 16px;
`;
