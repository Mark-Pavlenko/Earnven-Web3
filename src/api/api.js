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

export const getTokens = async () => {
  const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
  return response.data;
};

export const getAccountBalance = async (accountAddress) => {
  return await axios.get(
    `https://api.ethplorer.io/getAddressInfo/${accountAddress}?apiKey=EK-qSPda-W9rX7yJ-UY93y`
  );
};

export const getTwitterPosts = async (attributes) => {
  const streamURL = `https://cmctoken-proxy.herokuapp.com/https://api.twitter.com/2/tweets/search/recent?query=from%3A${attributes.userTwitterId}&max_results=${attributes.count}&expansions=author_id,referenced_tweets.id,attachments.media_keys,entities.mentions.username,referenced_tweets.id.author_id&tweet.fields=id,created_at,text,author_id,attachments,public_metrics,source,context_annotations&user.fields=id,name,username,profile_image_url,url,pinned_tweet_id,public_metrics&media.fields=preview_image_url,url,public_metrics`;
  return await axios.get(streamURL, { headers });
};
