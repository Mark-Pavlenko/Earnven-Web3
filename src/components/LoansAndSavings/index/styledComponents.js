import styled from 'styled-components';

export const PoolsBlock = styled.div`
  background: ${(props) =>
    props.isLightTheme ? 'rgba(255, 255, 255, 0.16)' : 'rgba(31, 38, 92, 0.24)'};
  box-shadow: ${(props) =>
    props.isLightTheme
      ? 'inset 2px 2px 4px rgba(255, 255, 255, 0.1);'
      : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
  margin-top: 35px;
  border-radius: 10px;
  padding-top: 1px;
  padding-bottom: 1px;
`;

export const TotalValueField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  margin-top: 21px;
  background: ${(props) =>
    props.isLightTheme ? 'rgba(255, 255, 255, 0.16)' : 'rgba(31, 38, 92, 0.24)'};
  border-radius: 10px;
  mix-blend-mode: normal;
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);
  padding: 20px 20px 20px 13px;
`;

export const TotalTitle = styled.span`
  width: 50%;
  font-family: Saira, serif;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 16px;
  color: ${(props) => (props.isLightTheme ? '#1e1e20' : '#ffffff')};
`;

export const TotalEmptyCell = styled.div`
  width: 70%;
`;

export const TotalValue = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 40%;
  font-family: Saira, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  color: ${(props) => (props.isLightTheme ? '#1e1e20' : '#ffffff')};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 29px 0 26px;
  margin: 20px 0 0 0;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.isLightTheme ? '#1E1E20' : 'white')};
  font-weight: 500;
  font-size: 20px;
`;

export const LeftColumnWrapper = styled.div`
  width: 50%;
  padding-right: 14px;
  box-sizing: border-box;
  @media (max-width: 768px) {
    width: 100%;
    padding-right: 0;
  }
`;

export const RightColumnWrapper = styled.div`
  width: 50%;
  padding-left: 14px;
  box-sizing: border-box;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  @media (max-width: 768px) {
    display: block;
  }
`;
