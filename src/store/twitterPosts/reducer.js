import actionTypes from '../../constants/actionTypes';

const initialState = {
  twitterPosts: [],
};

export const twitterPosts = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TWEETS_DATA:
      return {
        twitterPosts: action?.payload,
      };
    default:
      return state;
  }
};
