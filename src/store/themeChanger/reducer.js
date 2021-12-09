import GET_THEME from '../../constants/actionTypes';

const initialState = {
  isLightTheme: true,
};

export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_THEME:
      console.log('action from reducer', action);
      return {
        ...state,
        isLightTheme: action.isLightTheme,
      };
    default:
      return state;
  }
};

export const getThemeTask = (isLightTheme) => {
  console.log('isLightTheme', isLightTheme);
  return { type: 'GET_THEME', isLightTheme: isLightTheme };
};
