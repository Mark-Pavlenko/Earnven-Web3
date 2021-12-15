import styled from 'styled-components';
import ReactPlayer from 'react-player';

export const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 65% 35%;
  margin-top: 35px;
`;

export const GridTweetsNewsBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  max-width: 100%;
`;

export const TweetsNewsColumns = styled.div`
  align-self: center;
  justify-self: center;
`;

export const TweetBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 30px;
  padding-bottom: 5px;
  width: 475px;
  height: 325px;
  background: #e5efff;
  mix-blend-mode: normal;
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(35px);
  border-radius: 10px;
  color: black;
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
  color: #4453ad;
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
`;

export const PlayerLayout = styled.div`
  position: relative;
  width: 365px;
  height: 150px;
  margin: 0 auto;
`;

export const Player = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 100%;
  padding-bottom: 20px;
`;

export const TwitterWidget = styled.div`
  background: #e3efff;
`;

export const TwitterWidgetTitle = styled.p`
  margin-top: 20px;
  margin-left: 25px;
  font-family: 'Saira', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 31px;
`;
