import styled from 'styled-components';

export const Main = styled.div`
  background: rgba(255, 255, 255, 0.16);
  //border: 1px solid blue;
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
  width: 69px;
  height: 100%;
  align-items: center;
  justify-content: space-between;

  & img {
    width: 20px;
    height: 20px;
  }

  & p {
    font-size: 20px;
    font-weight: 500;
    line-height: 41px;
  }
`;

export const LeftSide = styled.div`
  width: 404px;
  display: flex;
  justify-content: space-between;
`;

export const TokenLink = styled.div`
  width: 285px;
  display: flex;
  border: 1px solid gray;
`;

export const SendButton = styled.button`
  display: block;
  position: relative;
  width: 41px;
  height: 41px;
  background-color: #ffffff;
  border-radius: 10px;
  border: none;
  cursor: pointer;

  & img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const Token = styled.div`
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
