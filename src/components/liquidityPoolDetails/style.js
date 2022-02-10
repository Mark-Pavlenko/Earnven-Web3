import styled from 'styled-components';
export const BackgroundStyles = styled.div`
  mix-blend-mode: normal;
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(35px);
  border-radius: 10px;

  @media (max-width: 768px) {
    border-radius: 30px;
  }
`;

export const Wrapper = styled.div`
  padding: 32px 0;
  width: 1025px;

  @media (max-width: 1050px) {
    width: 100%;
  }
`;

export const TokensInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 45px;
  margin: 35px 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
  }
`;

export const Token = styled(BackgroundStyles)`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  padding: 30px 25px;
  background: ${(props) =>
    props.isLightTheme ? 'rgba(255, 255, 255, 0.16)' : 'rgba(31, 38, 92, 0.24)'};
  color: ${(props) => (props.isLightTheme ? '#1E1E20' : '#fff')};
`;

export const PairInfo = styled(BackgroundStyles)`
  padding: 20px 25px;
  background: ${(props) =>
    props.isLightTheme ? 'rgba(255, 255, 255, 0.16)' : 'rgba(31, 38, 92, 0.24)'};
  color: ${(props) => (props.isLightTheme ? '#1E1E20' : '#fff')};
  margin-bottom: 35px;
`;
export const PairDetails = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
`;

export const BlockTitle = styled.div`
  margin-bottom: 20px;
  font-weight: 500;
  font-size: 20px;
  line-height: 31px;
`;

export const DetailTitle = styled.div`
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 10px;
  opacity: 0.5;
`;

export const DetailValue = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
`;

export const Detail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

export const Stats = styled(BackgroundStyles)`
  padding: 20px 25px;
  background: ${(props) =>
    props.isLightTheme ? 'rgba(255, 255, 255, 0.16)' : 'rgba(31, 38, 92, 0.24)'};
  color: ${(props) => (props.isLightTheme ? '#1E1E20' : '#fff')};
  margin-bottom: 35px;
`;

export const StatsWrapper = styled.div``;

export const StatsItems = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
`;

export const SupplyTokens = styled.div`
  display: flex;
`;

export const TokenImage = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50px;
`;

export const TokenImageBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TokenPrice = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 31px;
`;

export const CompareTokens = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 19px;
`;
export const AboutBlock = styled(BackgroundStyles)`
  padding: 20px 25px;
  background: ${(props) =>
    props.isLightTheme ? 'rgba(255, 255, 255, 0.16)' : 'rgba(31, 38, 92, 0.24)'};
  color: ${(props) => (props.isLightTheme ? '#1E1E20' : '#fff')};
  font-size: 14px;
  line-height: 22px;
  //opacity: 0.5;
`;

export const ShowMoreBlock = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  opacity: 1;
`;

export const ShowMore = styled.button`
  opacity: 1;
  background: ${(props) => (props.isLightTheme ? '#fff' : '#8F86FF')};
  box-shadow: inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12);
  border-radius: 10px;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  padding: 10px 38px;
  border: none;
  color: ${(props) => (props.isLightTheme ? '#4453AD' : '#fff')};
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CopyBlock = styled.img`
  cursor: pointer;
`;
