import styled from 'styled-components';

export const Main = styled.div`
  background: ${({ isLightTheme }) =>
    isLightTheme ? 'rgba(255, 255, 255, 0.16)' : 'rgba(31, 38, 92, 0.24)'};
  border-radius: 10px;
  margin-bottom: 35px;
  width: 100%;
`;

export const Header = styled.div`
  height: 41px;
  display: flex;
  justify-content: space-between;
`;

export const TokenPlatformLogo = styled.div`
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
  margin-left: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const TokenLinks = styled.div`
  display: flex;
`;

export const TokenLink = styled.div`
  display: block;
  position: relative;
  width: 41px;
  height: 41px;
  background-color: #ffffff;
  border-radius: 7px;
  border: none;
  cursor: pointer;
  margin-right: 20px;

  &:last-child {
    margin-right: 0;
  }

  & img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const Net = styled.div`
  display: flex;
  height: 41px;
  line-height: 41px;
  align-items: center;

  & img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`;
