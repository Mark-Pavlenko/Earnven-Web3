import styled from 'styled-components';

export const Wrapper = styled.div`
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.16);
  mix-blend-mode: normal;
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(35px);
  padding: 25px 30px 30px 30px;
`;

export const InvestButton = styled.button`
  background: ${(props) => (props.isLightTheme ? '#fff' : '#8f86ff')};
  color: ${(props) => (props.isLightTheme ? '#4453AD' : ' white')};
  border-radius: 10px;
  border: none;
  padding: 0 55px;
  height: 40px;
  font-family: 'Saira';
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
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
  display: flex;
  gap: 30px;
  @media (max-width: 768px) {
    justify-content: space-between;
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

export const PairInfo = styled.div`
  display: flex;
  gap: 30px;
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
  margin-bottom: 15px;
`;

export const TokenImage = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50px;
  &:not(:first-child) {
    margin-left: -10px;
  }
`;
