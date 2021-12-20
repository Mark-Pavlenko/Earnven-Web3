import actionTypes from '../../constants/actionTypes';

export const getTwitterPosts = (payload) => {
  console.log('payload', payload);
  return {
    type: actionTypes.GET_TWEETS_DATA,
    payload,
  };
};
