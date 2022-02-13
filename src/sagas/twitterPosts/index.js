import { put, call, select, takeEvery, putResolve } from 'redux-saga/effects';
import * as API from '../../api/api';
import * as actions from './actions';
import actionTypes from '../../constants/actionTypes';

export function* getTwitterPostsSagaWatcher() {
  yield takeEvery(actionTypes.SET_TWITTER_DATA, twitterPostsWorker);
}

function* twitterPostsWorker(mockTwitterObject) {
  const attributes = mockTwitterObject.payload;

  const twitterPosts = yield call(API.getTwitterPosts, attributes);

  let tweetArrayOfData = [];
  for (let i = 1; i < twitterPosts.data.data.length; i++) {
    //get the tweets data
    const tweeterTweets = twitterPosts.data.includes.tweets[i];
    if (tweeterTweets != null) {
      //get the respective user data
      for (let j = 0; j < twitterPosts.data.includes.users.length; j++) {
        let object = {};
        let entitiesUrl;
        const tweetData = twitterPosts.data.includes.users[j];
        if (tweeterTweets.author_id === tweetData.id) {
          if (tweeterTweets.entities) {
            try {
              entitiesUrl = tweeterTweets.entities.urls[0].url;
            } catch (err) {
              console.log('twitter SAGA/API err', err);
            }
          }
          object.username = tweetData.username ? tweetData.username : '';
          object.profile_image_url = tweetData.profile_image_url ? tweetData.profile_image_url : '';
          //object.url = tweetData.url ? tweetData.url : '';
          object.url = entitiesUrl ? entitiesUrl : '';
          object.public_metrics = tweetData.public_metrics ? tweetData.public_metrics : '';
          object.created_at = tweeterTweets.created_at ? tweeterTweets.created_at : '';
          object.id = tweeterTweets.id;
          object.name = tweetData.name;
          object.pinned_tweet_id = tweetData.pinned_tweet_id ? tweetData.pinned_tweet_id : '';
          object.text = tweeterTweets.text ? tweeterTweets.text : '';
          tweetArrayOfData.push(object);
        }
      }
    }
  }
  yield put(actions.getTwitterPosts(tweetArrayOfData));
}
