import React from 'react';
const { useState, useEffect } = require('react');
const { Buffer } = require('buffer');
const request = require('request');
import twitterIcon from '../../assets/icons/twitter.png';
import mockData from './mockData.json';
import Media from 'react-media';
import '../RecentlyAddedTokens/recentlyAddedToken.css';
import axios from 'axios';

import {
  MainLayout,
  GridTweetsNewsRow,
  TweetsNewsColumns,
  TweetBlock,
  TweetBlockHeader,
  HeaderAvatar,
  HeaderName,
  HeaderUsername,
  TweetDescription,
  PlayerLayout,
  Player,
  LoadMoreTweetsBtn,
  TwitterWidget,
  TwitterWidgetTitle,
  TestLayout,
} from './styles';
import actionTypes from '../../constants/actionTypes';
import { useDispatch, useSelector } from 'react-redux';

export default function TwitterAPI({ themeType }) {
  const dispatch = useDispatch();

  const tweetsArray = useSelector((state) => state.twitterPosts.twitterPosts);
  console.log('tweetsArray', tweetsArray);

  // console.log('isLightTheme in TwitterAPI comp', themeType);

  const [limit, setLimit] = useState(2);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const mockTwitterObject = { userTwitterId: '991745162274467840', count: 15 };

  useEffect(() => {
    console.log('activated');

    const getTwitterData = async () => {
      try {
        dispatch({
          type: actionTypes.SET_TWITTER_DATA,
          payload: mockTwitterObject,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getTwitterData();
  }, []);

  function valuesSelector(array, startElem) {
    const newArray = [];
    for (let i = startElem; i <= array.length; i += 2) {
      newArray.push(i);
    }
    return array.filter((el, index) => newArray.includes(index));
  }

  const firstColumn = valuesSelector(tweetsArray, 0);
  const secondColumn = valuesSelector(tweetsArray, 1);

  console.log(firstColumn);
  console.log(secondColumn);

  const loadMoreTweets = () => {
    setLimit(limit + 2);
    if (limit + 6 === tweetsArray.length) {
      setBtnDisabled(true);
      console.log('if data ended', btnDisabled);
    }
    console.log('btn disabled', btnDisabled);
  };

  return (
    <Media
      queries={{
        small: '(max-width: 599px)',
        medium: '(min-width: 600px) and (max-width: 1199px)',
        large: '(min-width: 1200px)',
      }}>
      {(matches) => (
        <>
          {tweetsArray !== undefined && (
            <MainLayout>
              <TestLayout>
                {matches.medium && (
                  <TwitterWidget isLightTheme={themeType}>
                    <TwitterWidgetTitle isLightTheme={themeType}>Our Twitter</TwitterWidgetTitle>
                    <a
                      className="twitter-timeline"
                      href="https://twitter.com/Earnvenfinance?ref_src=twsrc%5Etfw">
                      Tweets by Earnvenfinance
                    </a>
                  </TwitterWidget>
                )}
                <GridTweetsNewsRow>
                  {matches.small && (
                    <TwitterWidget isLightTheme={themeType}>
                      <TwitterWidgetTitle isLightTheme={themeType}>Our Twitter</TwitterWidgetTitle>
                      <a
                        className="twitter-timeline"
                        href="https://twitter.com/Earnvenfinance?ref_src=twsrc%5Etfw">
                        Tweets by Earnvenfinance
                      </a>
                    </TwitterWidget>
                  )}
                  <TweetsNewsColumns>
                    {firstColumn.slice(0, limit).map((tweet) => {
                      return (
                        <TweetBlock isLightTheme={themeType}>
                          <TweetBlockHeader>
                            <HeaderAvatar src={tweet.profile_image_url} alt="Profile image" />
                            <HeaderName>{tweet.name}</HeaderName>
                            <HeaderUsername>@{tweet.username}</HeaderUsername>
                            <a
                              href={`https://twitter.com/anyuser/status/${tweet.pinned_tweet_id}`}
                              target="_blank">
                              <img src={twitterIcon} alt="fireSpot" />
                            </a>
                          </TweetBlockHeader>
                          <TweetDescription isLightTheme={themeType}>{tweet.text}</TweetDescription>
                          {/*<YouTube videoId="0QRlXt_yL8I" style={{ width: '20% !important' }} />*/}
                          <PlayerLayout>
                            <Player
                              url="https://www.youtube.com/watch?v=0QRlXt_yL8I"
                              width="100%"
                              height="100%"
                            />
                          </PlayerLayout>
                        </TweetBlock>
                      );
                    })}
                  </TweetsNewsColumns>
                  <TweetsNewsColumns>
                    {secondColumn.slice(0, limit).map((tweet) => {
                      return (
                        <TweetBlock isLightTheme={themeType}>
                          <TweetBlockHeader>
                            <HeaderAvatar src={tweet.profile_image_url} alt="Profile image" />
                            <HeaderName>{tweet.name}</HeaderName>
                            <HeaderUsername>@{tweet.username}</HeaderUsername>
                            <a
                              href={`https://twitter.com/anyuser/status/${tweet.pinned_tweet_id}`}
                              target="_blank">
                              <img src={twitterIcon} alt="fireSpot" />
                            </a>
                          </TweetBlockHeader>
                          <TweetDescription isLightTheme={themeType}>{tweet.text}</TweetDescription>
                          {/*<YouTube videoId="0QRlXt_yL8I" style={{ width: '20% !important' }} />*/}
                          <PlayerLayout>
                            <Player
                              url="https://www.youtube.com/watch?v=0QRlXt_yL8I"
                              width="100%"
                              height="100%"
                            />
                          </PlayerLayout>
                        </TweetBlock>
                      );
                    })}
                  </TweetsNewsColumns>
                </GridTweetsNewsRow>
                {!btnDisabled && (
                  <LoadMoreTweetsBtn onClick={loadMoreTweets} isLightTheme={themeType}>
                    Load more
                  </LoadMoreTweetsBtn>
                )}
              </TestLayout>
              {matches.large && (
                <TwitterWidget isLightTheme={themeType}>
                  <TwitterWidgetTitle isLightTheme={themeType}>Our Twitter</TwitterWidgetTitle>
                  <a
                    className="twitter-timeline"
                    href="https://twitter.com/Earnvenfinance?ref_src=twsrc%5Etfw">
                    Tweets by Earnvenfinance
                  </a>
                </TwitterWidget>
              )}
            </MainLayout>
          )}
        </>
      )}
    </Media>
  );
}
