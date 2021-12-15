import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const { useState, useEffect } = require('react');
const { Buffer } = require('buffer');
const request = require('request');
import twitterIcon from '../../assets/icons/twitter.png';
import mockData from './mockData.json';

import {
  MainLayout,
  GridTweetsNewsBlock,
  TweetsNewsColumns,
  TweetBlock,
  TweetBlockHeader,
  HeaderAvatar,
  HeaderName,
  HeaderUsername,
  TweetDescription,
  PlayerLayout,
  Player,
  TwitterWidget,
  TwitterWidgetTitle,
} from './styles';

const TOKEN =
  'AAAAAAAAAAAAAAAAAAAAAJKDUQEAAAAAdjHNlWVUmUvOCPqh05Vgo8bQouo%3DJY7PJWMZfUwejLcXHXKraQE9O9QDUQptUwtHVYIbSK0PFFmYzE';

const streamAvatar =
  'https://cmctoken-proxy.herokuapp.com/https://api.twitter.com/2/users/by?usernames=DeFi_Dad&user.fields=created_at,profile_image_url,url,public_metrics&expansions=pinned_tweet_id&tweet.fields=author_id,text,created_at';

const streamTweet =
  'https://cmctoken-proxy.herokuapp.com/https://api.twitter.com/2/users/991745162274467840/tweets?expansions=author_id&tweet.fields=created_at,author_id,conversation_id&media.fields=media_key,url&user.fields=username&max_results=20';

export default function TwitterAPI() {
  const [tweetAvatarContent, setTweetAvatarContent] = useState();
  const [tweetDataContent, setTweetDataContent] = useState();

  var headers = {
    'content-type': 'application/json',
    Authorization: `Bearer ${TOKEN}`,
    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Access-Control-Request-Headers': 'Content-Type, x-requested-with',
    //'Origin': 'http://localhost:3000',
    'accept-encoding': 'identity',
  };

  var optionsAvatar = {
    url: streamAvatar,
    headers: headers,
  };

  var optionsTweet = {
    url: streamTweet,
    headers: headers,
  };

  //Avatar data
  useEffect(() => {
    //call the below function to get tweet data given streamUrl(with all the params)
    let chunks = [];
    let tweeterAvatarData;
    async function getData() {
      //let chunks ;
      try {
        const requestWithEncoding = function (optionsAvatar, callback) {
          let req = request.get(optionsAvatar);
          req.on('response', function (res) {
            res.on('data', function (chunk) {
              try {
                chunks.push(chunk);
              } catch (err) {
                console.log(err.message);
              }
            });

            res.on('end', function () {
              let buffer = Buffer.concat(chunks);
              tweeterAvatarData = JSON.parse(Buffer.from(buffer).toString());
              // setTweetAvatarContent(tweeterAvatarData.data);
              setTweetAvatarContent(mockData);
            });
          });
          req.on('error', function (err) {
            callback(err);
          });
        };
        //call the above function to get the tweet dat
        requestWithEncoding(optionsAvatar, function (err, data) {
          if (err) console.log(err.message);
        }); //end of the function
      } catch (err) {
        console.log(err.message);
      }
    }
    getData();
  }, []);

  //Tweet Data
  useEffect(() => {
    //call the below function to get tweet data given streamUrl(with all the params)
    let chunks = [];

    let tweetData;
    let content;
    async function getData() {
      //let chunks ;
      try {
        const requestWithEncoding = function (optionsTweet, callback) {
          let req = request.get(optionsTweet);
          req.on('response', function (res) {
            res.on('data', function (chunk) {
              try {
                chunks.push(chunk);
              } catch (err) {
                console.log(err.message);
              }
            });

            res.on('end', function () {
              let buffer = Buffer.concat(chunks);
              tweetData = JSON.parse(Buffer.from(buffer).toString());
              setTweetDataContent(tweetData.data);
            });
          });
          //callback when there is an error
          req.on('error', function (err) {
            callback(err);
          });
        };
        //call the above function to get the tweet dat
        requestWithEncoding(optionsTweet, function (err, data) {
          if (err) console.log(err.message);
        }); //end of the function
      } catch (err) {
        console.log(err.message);
      }
    }
    getData();
  }, []);

  console.log('tweetDataContent', tweetAvatarContent);

  function valuesSelector(array, startElem) {
    const newArray = [];
    for (let i = startElem; i <= array.length; i += 2) {
      newArray.push(i);
    }
    return array.filter((el, index) => newArray.includes(index));
  }

  const firstColumn = valuesSelector(mockData, 0);
  const secondColumn = valuesSelector(mockData, 1);

  console.log(firstColumn);
  console.log(secondColumn);

  return (
    <>
      {mockData !== undefined && (
        <MainLayout>
          <GridTweetsNewsBlock>
            <TweetsNewsColumns>
              {firstColumn.map((tweet) => {
                return (
                  <TweetBlock>
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
                    <TweetDescription>{tweet.text}</TweetDescription>
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
              {secondColumn.map((tweet) => {
                return (
                  <TweetBlock>
                    <TweetBlockHeader>
                      {/*<div>*/}
                      <HeaderAvatar src={tweet.profile_image_url} alt="Profile image" />
                      <HeaderName>{tweet.name}</HeaderName>
                      <HeaderUsername>@{tweet.username}</HeaderUsername>
                      {/*</div>*/}
                      <a
                        href={`https://twitter.com/anyuser/status/${tweet.pinned_tweet_id}`}
                        target="_blank">
                        <img src={twitterIcon} alt="fireSpot" />
                      </a>
                    </TweetBlockHeader>
                    <TweetDescription>{tweet.text}</TweetDescription>
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
          </GridTweetsNewsBlock>
          <TwitterWidget>
            <TwitterWidgetTitle>Our Twitter</TwitterWidgetTitle>
            <a
              className="twitter-timeline"
              href="https://twitter.com/Earnvenfinance?ref_src=twsrc%5Etfw">
              Tweets by Earnvenfinance
            </a>
          </TwitterWidget>
        </MainLayout>
      )}
    </>
  );
}
