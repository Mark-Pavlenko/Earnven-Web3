import styled from 'styled-components';
import ReactPlayer from 'react-player';

export const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 65% 35%;

  @media screen and (max-width: 900px) {
    grid-template-columns: none !important;
  }

  @media screen and (min-width: 910px) and (max-width: 1200px) { {
    grid-template-columns: 50% 50%;
  }
`;

export const GridTweetsNewsRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;

  @media screen and (max-width: 900px) {
    //flex-direction: column;
  }
`;

export const TweetsNewsColumns = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  @media screen and (max-width: 900px) {
    margin-top: 35px;
  }
`;

export const TweetBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 30px;
  padding-bottom: 5px;
  width: 475px;
  height: 325px;
  background-color: ${(props) => (props.isLightTheme ? '#e5efff' : '#10142D')};
  mix-blend-mode: normal;
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(35px);
  border-radius: 10px;
  color: black;

  @media screen and (max-width: 900px) {
    width: 365px;
    margin-left: 5px;
    //background-color: red;
  }
`;

export const TweetBlockHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;

  margin-top: 20px;
  margin-left: 10px;

  a:last-of-type {
    margin-left: auto;
    width: 30px;
    height: 30px;
    margin-right: 40px;
  }

  img {
    border-radius: 100%;
  }
`;

export const HeaderAvatar = styled.img`
  margin-right: 15px;
`;

export const HeaderName = styled.p`
  color: #8f86ff;
  font-family: 'Saira', sans-serif;
  font-weight: 550;
  font-size: 18px;
  line-height: 16px;
  margin-right: 10px;
`;

export const HeaderUsername = styled.p`
  font-family: 'Saira', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #81878f;
`;

export const TweetDescription = styled.p`
  font-family: 'Saira', sans-serif;
  font-style: normal;
  font-weight: normal;
  padding: 0 55px 0 55px;
  color: ${(props) => (props.isLightTheme ? '#000000' : '#ffffff')};
`;

export const PlayerLayout = styled.div`
  position: relative;
  width: 365px;
  height: 150px;
  margin: 0 auto;

  @media screen and (max-width: 900px) {
    width: 300px;
  }
`;

export const Player = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 100%;
  padding-bottom: 20px;
`;

export const LoadMoreTweetsBtn = styled.button`
  display: block;
  margin: 0 auto;
  width: 150px;
  height: 40px;
  font-family: 'Saira', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
  background-color: ${(props) => (props.isLightTheme ? '#ffffff' : '#8F86FF')};
  color: ${(props) => (props.isLightTheme ? '#4453ad' : '#ffffff')};
  border: none !important;
  border-radius: 10px;
  cursor: pointer;
`;

export const TwitterWidget = styled.div`
  background-color: ${(props) => (props.isLightTheme ? '#e3efff' : '#10142D')};
  border-radius: 10px;
  mix-blend-mode: normal;
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(35px);
  width: 100% !important;
  @media screen and (min-width: 1700px) {
    iframe {
      width: 28.6vw !important;
    }
  }

  @media screen and (min-width: 710px) and (max-width: 900px) {
    //margin-top: 30px;
    margin: 0 auto;
    width: 98% !important;
  }
`;

export const TwitterWidgetTitle = styled.p`
  margin: 20px 0 25px 20px;
  font-family: 'Saira', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 31px;
  color: ${(props) => (props.isLightTheme ? '#000000' : '#ffffff')};
`;
