import styled from 'styled-components';

export const Main = styled.div`
  background: ${({ isLightTheme }) =>
    isLightTheme ? 'rgba(255, 255, 255, 0.16)' : 'rgba(31, 38, 92, 0.24)'};
  mix-blend-mode: normal;
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  margin-bottom: 35px;
  width: 100%;
  padding: 20px 10px 20px 18px;

  @media (max-width: 480px) {
    border-radius: 30px;
  }
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin: 0 0 15px 7px;

  @media (max-width: 480px) {
    margin: 0 0 5px -5px;
  }
`;
