import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const { useState, useEffect } = require('react');
const { Buffer } = require('buffer');
const request = require('request');

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
    let content;
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
              var buffer = Buffer.concat(chunks);
              tweeterAvatarData = JSON.parse(Buffer.from(buffer).toString());
              console.log('Defi_Dad_Avatar', tweeterAvatarData.data);

              content = tweeterAvatarData.data.map((object) => (
                <Accordion
                  key={Object.id}
                  style={{
                    background: 'transparent',
                    marginRight: '1px',
                    color: 'white',
                    width: '100%',
                    border: '1px',
                    borderColor: 'black',
                    borderStyle: 'hidden', //solid
                  }}>
                  <AccordionDetails>
                    {object.username}
                    <br />
                    {object.name}
                    <img src={object.profile_image_url} alt="" />
                  </AccordionDetails>
                </Accordion>
              ));
              setTweetAvatarContent(content);
            });
          });
          //callback when there is an error
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
              var buffer = Buffer.concat(chunks);
              tweetData = JSON.parse(Buffer.from(buffer).toString());
              console.log('Tweet Data', tweetData.data);

              content = tweetData.data.map((object) => (
                <Accordion
                  key={Object.id}
                  style={{
                    background: 'transparent',
                    marginRight: '1px',
                    color: 'white',
                    width: '100%',
                    border: '1px',
                    borderColor: 'black',
                    borderStyle: 'hidden', //solid
                  }}>
                  <AccordionDetails>
                    {object.created_at}
                    <br />
                    {object.text}
                  </AccordionDetails>
                </Accordion>
              ));
              setTweetDataContent(content);
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

  return (
    <div>
      testing twitter
      {tweetAvatarContent}
      {tweetDataContent}
    </div>
  );
}
