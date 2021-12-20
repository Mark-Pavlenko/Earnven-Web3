import axios from 'axios';

const TOKEN =
  'AAAAAAAAAAAAAAAAAAAAAJKDUQEAAAAAdjHNlWVUmUvOCPqh05Vgo8bQouo%3DJY7PJWMZfUwejLcXHXKraQE9O9QDUQptUwtHVYIbSK0PFFmYzE';

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Access-Control-Request-Headers': 'Content-Type, x-requested-with',
  Origin: 'http://localhost:3000',
  'accept-encoding': 'gzip,deflate',
};

export const getAccountBalance = async (accountAddress) => {
  return await axios.get(
    `https://api.ethplorer.io/getAddressInfo/${accountAddress}?apiKey=EK-qSPda-W9rX7yJ-UY93y`
  );
};

export const getTwitterPosts = async (attributes) => {
  // console.log('attributes', attributes);

  const streamURL = `https://cmctoken-proxy.herokuapp.com/https://api.twitter.com/2/users/${attributes.userTwitterId}/tweets?expansions=author_id&tweet.fields=created_at,author_id,conversation_id&media.fields=media_key,url&user.fields=username&max_results=${attributes.count}`;
  const response = await axios.get(streamURL, { headers });
  return response.data.data;
};

export const getTweetsByUsers = async (twitterId) => {
  const streamURL = `https://cmctoken-proxy.herokuapp.com/https://api.twitter.com/2/tweets/${twitterId}?expansions=referenced_tweets.id.author_id&tweet.fields=id,created_at,text&user.fields=id,created_at,name,username,profile_image_url,url,pinned_tweet_id,public_metrics&media.fields=preview_image_url,url`;
  const response = await axios.get(streamURL, { headers });
  return { tweetDataText: response.data.data, tweetDataUsers: response.data.includes.users };
};
