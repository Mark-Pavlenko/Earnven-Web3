import styled from 'styled-components';
import { List } from '@material-ui/core';

export const MainLinksLayout = styled.div`
  margin-top: auto;
  margin-bottom: 55px;
`;

export const InfoLinksList = styled.div`
  margin-left: 125px;

  @media (max-width: 1280px) {
    margin-left: 38px;
  }
`;

export const InfoListItem = styled(List)`
  margin-bottom: 20px;
  text-decoration: none;
  color: black;
  font-size: 14px;
  font-weight: 400;
`;

export const InfoListItemLink = styled('a')(({ isLightTheme }) => ({
  color: isLightTheme ? 'black !important' : 'white !important',
  fontWeight: 400,
  fontSize: '14px',
  textDecoration: 'none',
  '&:hover': {
    color: '#4453AD !important',
    fontWeight: 500,
  },
}));

export const NetworksGridList = styled.ul`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
  margin-left: 120px;

  li {
    padding: 4px;
  }

  li:first-child {
    margin-bottom: 20px;
  }

  li:hover {
    border-radius: 10px;
    background-color: ${(props) => (props.isLightTheme ? '#ffffff' : '#1F265C')};
    box-shadow: ${(props) =>
      props.isLightTheme
        ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
        : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
    backdrop-filter: ${(props) => (props.isLightTheme ? 'none' : 'blur(35px)')};
  }
`;

export const NetworksSubColumn = styled.div``;
