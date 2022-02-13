export const GET_ALL_TOKENS = 'GET_ALL_TOKENS';
export const SET_ALL_TOKENS = 'SET_ALL_TOKENS';
export const GET_SEARCHED_TOKENS_LOADING = 'GET_SEARCHED_TOKENS_LOADING';
export const SET_CHOSEN_TOKENS_LIST = 'SET_CHOSEN_TOKENS_LIST';

export const getAllTokens = () => {
  // console.log('getAllTokensTriggered');
  return {
    type: GET_ALL_TOKENS,
  };
};

export const getSearchedTokens = (payload) => {
  // console.log('input value', payload);
  return {
    type: GET_SEARCHED_TOKENS_LOADING,
    payload,
  };
};

export const setAllTokens = (payload) => {
  // console.log('payload of tokensArr', payload);
  return {
    type: SET_ALL_TOKENS,
    payload,
  };
};

export const setChosenTokensList = (payload) => {
  return {
    type: SET_CHOSEN_TOKENS_LIST,
    payload,
  };
};
