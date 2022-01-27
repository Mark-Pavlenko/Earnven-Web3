import styled from 'styled-components';

export const Main = styled.div`
  background: ${({ isLightTheme }) =>
    isLightTheme ? 'rgba(255, 255, 255, 0.16)' : 'rgba(31, 38, 92, 0.24)'};
  color: ${({ isLightTheme }) => (isLightTheme ? '#1E1E20' : '#FFFFFF')};
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

export const TokenLink = styled.div`
  display: block;
  position: relative;
  width: 41px;
  height: 41px;
  background: ${({ isLightTheme }) => (isLightTheme ? '#FFFFFF' : 'rgba(31, 38, 92, 0.24)')};
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);
  border-radius: 7px;
  border: none;
  cursor: pointer;
  margin-right: 20px;
  transition: all 0.2s;

  &:last-child {
    margin-right: 0;
  }

  & img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover {
    background: ${({ isLightTheme }) => (isLightTheme ? 'rgba(255, 255, 255, 0.16)' : '#FFFFFF')};
    transition: all 0.2s;
  }
`;
