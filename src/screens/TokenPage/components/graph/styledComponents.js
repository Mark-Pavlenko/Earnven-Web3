import styled from 'styled-components';

export const Main = styled.div`
  background: ${({ isLightTheme }) =>
    isLightTheme ? 'rgba(255, 255, 255, 0.16)' : 'rgba(31, 38, 92, 0.24)'};
  border-radius: 10px;
  margin: 35px;
  width: 100%;
`;

export const Header = styled.div`
  padding-left: 10px;
  height: 41px;
  display: flex;
  justify-content: space-between;
`;

export const Chain = styled.div`
  display: flex;
  width: 80px;
  height: 100%;
  align-items: center;

  & img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  & p {
    font-size: 20px;
    font-weight: 500;
    line-height: 41px;
  }
`;

export const Links = styled.div`
  margin: 0 15px 0 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const TokenLinks = styled.div`
  display: flex;
`;

export const TokenName = styled.div`
  padding-left: 10px;
  margin: 20px 0 0 0;
  display: flex;
  height: 41px;
  font-size: 26px;
  font-weight: 600;
  line-height: 41px;
  align-items: center;

  & img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`;
