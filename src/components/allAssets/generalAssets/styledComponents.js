import styled from 'styled-components';

export const Main = styled.div`
  background: rgba(255, 255, 255, 0.16);
  padding: 20px;
  border-radius: 10px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TotalValueField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  margin-top: 21px;
  background: rgba(255, 255, 255, 0.16);
  mix-blend-mode: normal;
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 0 20px;
`;

export const TotalTitle = styled.span`
  font-family: Saira, serif;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 16px;
  color: #1e1e20;
`;

export const TotalValue = styled.div`
  font-family: Saira, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  color: #1e1e20;
`;

export const Title = styled.div`
  margin-top: 15px;
  margin-left: 27px;
`;

export const EthereumTokenImage = styled.img`
  display: inline;
  max-width: 25px;
  vertical-align: top;
  height: 25px;
  margin: 11.3px;
  margin-left: 15px;
  border-radius: 50%;
`;

export const TokenImage = styled.img`
  display: inline;
  max-width: 25px;
  vertical-align: top;
  height: 25px;
  margin: 11.3px;
  margin-left: 15px;
  border-radius: 50%;
  background-color: #e5e5e5;
`;

export const TokenName = styled.div`
  font-family: Saira, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 25px;
  color: #1e1e20;
`;

export const NameWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 23%;
  height: 50px;
  float: left;
  text-align: initial;
`;

export const APYPercent = styled.div`
  font-family: Saira, serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: #1e1e20;
`;

export const APYWrapper = styled.div`
  height: 50px;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
`;
