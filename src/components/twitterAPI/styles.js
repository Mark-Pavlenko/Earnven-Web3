import styled from 'styled-components';
import ReactPlayer from 'react-player';

export const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  margin-top: 35px;
  //background-color: pink;

  @media screen and (min-width: 1601px) {
    //grid-gap: 8px;
  }

  @media screen and (min-width: 710px) and (max-width: 1600px) {
    display: grid;
    grid-template-columns: 100%;
    //margin-left: 35px;
  }
`;

export const TestLayout = styled.div`
  //background-color: yellow;
`;

export const GridTweetsNewsRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  //width: 100%;
  //background-color: red;

  @media screen and (max-width: 709px) {
    display: grid;
    grid-template-columns: 100%;
  }

  @media screen and (min-width: 710px) and (max-width: 1600px) {
    display: grid;
    grid-template-columns: 50% 50%;
    justify-items: center;

    margin-bottom: 30px;
  }
`;

export const TweetsNewsColumns = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 30px;

  @media screen and (min-width: 450px) and (max-width: 709px) {
    display: grid;
    justify-items: center;
  }

  @media screen and (min-width: 1000px) and (max-width: 1800px) {
    //flex: 0;
    display: grid;
    column-gap: 30px;
  }
`;

export const TweetBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 30px;
  padding-bottom: 5px;
  width: 458px;
  height: 325px;
  background-color: ${(props) => (props.isLightTheme ? '#e5efff' : '#10142D')};
  mix-blend-mode: normal;
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(35px);
  border-radius: 10px;
  color: black;

  @media screen and (max-width: 400px) {
    width: 375px;
    margin-left: 5px;
    // background-color: red;
  }

  @media screen and (min-width: 710px) and (max-width: 900px) {
    width: 100vw;
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
    width: 20px;
    height: 20px;
    margin-right: 40px;
  }

  img {
    border-radius: 100%;
  }
`;

export const HeaderAvatar = styled.img`
  margin-right: 15px;
  width: 35px;
  height: 35px;
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
  height: 190px;
  margin: 0 auto;

  @media screen and (max-width: 900px) {
    width: 300px;
  }

  @media screen and (min-width: 710px) and (max-width: 900px) {
    width: 450px;
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
  margin-bottom: 30px;

  @media screen and (max-width: 1600px) {
  }

  @media screen and (max-width: 400px) {
    margin-left: 120px;
  }
`;

export const TwitterWidget = styled.div`
  background-color: ${(props) => (props.isLightTheme ? '#e3efff' : '#10142D')};
  //background-color: orange;
  border-radius: 10px;
  mix-blend-mode: normal;
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(35px);
  width: 468px;

  @media screen and (max-width: 400px) {
  }

  @media screen and (min-width: 1700px) {
    iframe {
      //width: 28.6vw !important;
    }
  }

  @media screen and (max-width: 449px) {
    width: 375px;
  }

  @media screen and (min-width: 450px) and (max-width: 710px) {
    width: 100%;
  }

  @media screen and (min-width: 710px) and (max-width: 1600px) {
    width: auto;
    margin-bottom: 40px;

    iframe {
      //width: 100vw !important;
    }

    //iframe {
    //  width: auto;
    //  display: grid;
    //  margin: 0 auto !important;
    //  justify-items: center;
    //}
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

  @media screen and (max-width: 1600px) {
    padding-top: 20px;
  }
`;
