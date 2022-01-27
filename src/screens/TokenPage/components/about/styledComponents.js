import styled from 'styled-components';

export const Content = styled.div`
  font-size: 14px;
  font-weight: 400;
  padding: 10px;
  color: ${({ isLightTheme }) => (isLightTheme ? '#1e1e20' : '#FFFFFF')};

  @media (max-width: 480px) {
    padding: 0;
  }
`;

export const Button = styled.div`
  width: 150px;
  height: 40px;
  background: ${({ isLightTheme }) => (isLightTheme ? '#FFFFFF' : '#8F86FF')};
  color: ${({ isLightTheme }) => (isLightTheme ? '#4453AD' : '#FFFFFF')};
  box-shadow: inset 0 5px 10px -6px rgba(51, 78, 131, 0.12);
  border-radius: 10px;
  cursor: pointer;
  margin: 10px auto;
  text-align: center;
  transition: all 0.2s;

  &:hover {
    background: ${({ isLightTheme }) => (isLightTheme ? '#4453AD' : '#FFFFFF')};
    color: ${({ isLightTheme }) => (isLightTheme ? '#FFFFFF' : '#8F86FF')};
    transition: all 0.2s;
  }

  & span {
    line-height: 40px;
    font-weight: 500;
  }
`;
