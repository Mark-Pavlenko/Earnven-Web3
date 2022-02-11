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
  padding: 20px 10px 20px 15px;

  @media (max-width: 480px) {
    border-radius: 30px;
  }
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin: 0 0 15px 13px;

  @media (max-width: 480px) {
    margin: 0 0 5px -5px;
  }
`;

export const TokenLink = styled.a`
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

export const CommonSubmitButton = styled.button`
  height: 40px;
  width: ${(props) => (props.width ? props.width : '100%')};
  background: ${(props) => (props.isLightTheme ? '#fff' : '#8f86ff')};
  color: ${(props) => (props.isLightTheme ? '#4453AD' : ' white')};
  box-shadow: inset 0 11px 21px -6px rgb(51 78 131 / 12%);
  border-radius: 10px;
  border: none;
  //padding: 9px 55px;
  font-family: 'Saira', serif;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
`;

export const CommonHoverButton = styled.button`
  height: ${(props) => (props.height ? props.height : '40px')};
  width: ${(props) => (props.width ? props.width : '100%')};
  background: ${(props) => (props.isLightTheme ? '#fff' : '#8f86ff')};
  color: ${(props) => (props.isLightTheme ? '#4453AD' : ' white')};
  box-shadow: 4px 6px 20px -5px rgba(51, 78, 131, 0.17);
  border-radius: 10px;
  border: none;
  //padding: 9px 55px;
  font-family: 'Saira', serif;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
`;

export const CommonHoverButtonTrans = styled.button`
  height: ${(props) => (props.height ? props.height : '40px')};
  width: ${(props) => (props.width ? props.width : '100%')};
  background: ${(props) => (props.isLightTheme ? 'rgba(255, 255, 255, 0.16)' : '#8f86ff')};
  color: ${(props) => (props.isLightTheme ? '#4453AD' : ' white')};
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  border: none;
  //padding: 9px 55px;
  font-family: 'Saira', serif;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  backdrop-filter: blur(35px);
  mix-blend-mode: normal;
`;
