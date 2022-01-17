import styled from 'styled-components';

export const TokenButtonsBlock = styled.div`
  display: flex;
`;

export const SendButton = styled.div`
  width: 40px;
  height: 40px;
  background: ${(props) => `url(${props.icon}) no-repeat center center`};
  background-color: ${(props) => (props.isLightTheme ? '#ffffff' : 'rgba(31, 38, 92, 0.24)')};
  box-shadow: ${(props) =>
    props.isLightTheme
      ? '4px 6px 20px -5px rgba(51, 78, 131, 0.17)'
      : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
  border-radius: 10px;
  margin-left: 30px;
  border: none;
  cursor: pointer;
`;

export const EtherScanButton = styled.div`
  width: 40px;
  height: 40px;
  background: ${(props) =>
    props.isLightTheme
      ? `url(${props.icon}) no-repeat center center`
      : `url(${props.etherScanDark}) no-repeat center center`};
  background-color: ${(props) => (props.isLightTheme ? '#ffffff' : 'rgba(31, 38, 92, 0.24)')};
  box-shadow: ${(props) =>
    props.isLightTheme
      ? '4px 6px 20px -5px rgba(51, 78, 131, 0.17)'
      : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
  border-radius: 10px;
  margin-left: 30px;
  border: none;
  cursor: pointer;
`;

export const MainBlocks = styled.div`
  display: flex;
  @media (max-width: 375px) {
    display: block;
  }
`;

export const LeftSideWrapper = styled.div`
  width: 55%;
  margin-right: 35px;
  @media (max-width: 768px) {
    width: 45%;
  }
  @media (max-width: 375px) {
    width: 100%;
  }
`;

export const RightSideWrapper = styled.div`
  width: 45%;
  @media (max-width: 768px) {
    width: 55%;
  }
  @media (max-width: 375px) {
    display: none;
  }
`;
export const Mobile = styled.div`
  display: none;
  @media (max-width: 375px) {
    display: block;
  }
`;
