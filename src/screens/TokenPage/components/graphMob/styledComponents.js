import styled from 'styled-components';

export const Main = styled.div`
  background: ${({ isLightTheme }) =>
    isLightTheme ? 'rgba(255, 255, 255, 0.16)' : 'rgba(31, 38, 92, 0.24)'};
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);
  color: ${({ isLightTheme }) => (isLightTheme ? '#1E1E20' : '#FFFFFF')};
  border-radius: 30px;
  margin: 25px 0 35px 0;
  padding: 20px 15px;
  width: 100%;
`;

export const Header = styled.div`
  height: 41px;
  display: flex;
  justify-content: space-between;
`;

export const NetWrapper = styled.div`
  margin-top: 15px;
  height: 41px;
  display: flex;
  justify-content: space-between;
`;

export const Chain = styled.div`
  display: flex;
  width: 69px;
  height: 100%;
  align-items: center;
  justify-content: space-between;

  & img {
    width: 20px;
    height: 20px;
  }

  & p {
    font-size: 20px;
    font-weight: 500;
    line-height: 41px;
  }
`;

// export const LeftSide = styled.div`
//   width: 404px;
//   display: flex;
//   justify-content: space-between;
// `;

export const TokenLinks = styled.div`
  display: flex;
`;

export const MainLinks = styled.div`
  display: flex;
`;

export const Net = styled.div`
  display: flex;
  height: 41px;
  line-height: 41px;
  align-items: center;

  & img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`;
