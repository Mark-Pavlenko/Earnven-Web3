import styled from 'styled-components';

export const ChartWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  background: ${(props) =>
    props.isLightTheme ? 'rgba(255, 255, 255, 0.16)' : 'rgba(31, 38, 92, 0.24)'};
  mix-blend-mode: normal;
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(35px);
  border-radius: 10px;
  padding: 25px 30px 30px 30px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    gap: 30px;
    padding: 125px 30px 0 30px;
    border-radius: 30px;
  }
`;

export const InvestButton = styled.button`
  background: ${(props) => (props.isLightTheme ? '#fff' : '#8f86ff')};
  color: ${(props) => (props.isLightTheme ? '#4453AD' : ' white')};
  border-radius: 10px;
  border: none;
  //padding: 0 55px;
  height: 40px;
  font-family: 'Saira';
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.isLightTheme
      ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
      : ' 7px 21px 22px -15px rgba(51, 78, 131, 0.17)'};
`;

export const EtherscanButton = styled.button`
  background: ${(props) => (props.isLightTheme ? '#fff' : 'rgba(31, 38, 92, 0.24)')};
  border-radius: 10px;
  border: none;
  padding: 10px;
  height: 40px;
  cursor: pointer;
`;

export const TypeText = styled.div`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 41px;
  color: ${(props) => (props.isLightTheme ? '#1E1E20' : '#fff')};
`;

export const HiddenLink = styled.a`
  @media (max-width: 768px) {
    display: none;
  }
`;
export const VisibleLink = styled.a`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const ButtonsBlock = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr 1fr;
  gap: 30px;
  width: 45%;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    width: 100%;
  }
`;

export const TokenImageBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const VisibleTokenImageBlock = styled.div`
  display: none;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    position: absolute;
    display: flex;
    top: 125%;
  }
`;

export const PairInfo = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  color: ${(props) => (props.isLightTheme ? '#1E1E20' : '#fff')};
`;

export const PairBlock = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  font-family: 'Saira';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 31px;
  margin: 15px 0;
  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    padding: 0 30px;
  }
`;

export const TokenImage = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50px;
  &:not(:first-child) {
    margin-left: -10px;
  }
`;
