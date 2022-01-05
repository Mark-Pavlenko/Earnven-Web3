import styled from 'styled-components';

export const RootStyle = styled.div`
  @media (max-width: 1280px) {
    display: none;
  }
`;

export const SidebarMainLayout = styled.div`
  border-radius: 10px;
  background-color: ${(props) => (props.isLightTheme ? 'transparent' : '#0F152C')};
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(35px);
  height: 100vh;
`;

export const LogoBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin-top: 32px;
  margin-right: 41px;
  margin-left: 124px;
  width: 150px;
  height: 42px;
  //background-color: red;
`;

export const LogoImg = styled.img`
  margin-right: 10px;
`;
