import styled from 'styled-components';
export const BackgroundStyles = styled.div`
  mix-blend-mode: normal;
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(35px);
  border-radius: 10px;
`;
export const TokensInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 45px;
  margin: 35px 0;
`;

export const Token = styled(BackgroundStyles)`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
`;

export const StatsWrapper = styled.div`
  padding: 0 30px;
`;

export const StatsItems = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
