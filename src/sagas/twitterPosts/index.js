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
  // console.log('twitter posts', twitterPosts);

  let tweetArrayOfData = [];

  for (let i = 0; i < twitterPosts.length; i++) {
    let object = {};

    const tweetId = twitterPosts[i].id;
    const result = yield call(API.getTweetsByUsers, tweetId);
    // console.log('tweetsByUser', result);

    const tweetData = result.tweetDataUsers[1];
    if (tweetData != null) {
      object.username = tweetData.username ? tweetData.username : '';
      object.profile_image_url = tweetData.profile_image_url ? tweetData.profile_image_url : '';
      object.url = tweetData.url ? tweetData.url : '';
      object.public_metrics = tweetData.public_metrics ? tweetData.public_metrics : '';
      object.created_at = tweetData.created_at ? tweetData.created_at : '';
      object.id = tweetData.id;
      object.name = tweetData.name;
      object.pinned_tweet_id = tweetData.pinned_tweet_id ? tweetData.pinned_tweet_id : '';
      object.text = result.tweetDataText.text ? result.tweetDataText.text : '';
      tweetArrayOfData.push(object);
    }
  }
  // console.log('tweetArrayOfData', tweetArrayOfData);
  yield put(actions.getTwitterPosts(tweetArrayOfData));
  // return tweetArrayOfData;
}
