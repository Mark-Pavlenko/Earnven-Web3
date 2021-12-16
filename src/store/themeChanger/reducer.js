import GET_THEME from '../../constants/actionTypes';

const initialState = {
  isLightTheme: localStorage.getItem('selectedTheme') == 'Day',
};

export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_THEME':
      console.log('action from reducer', action.type);
      return {
        ...state,
        isLightTheme: action.isLightTheme,
      };
    default:
      return state;
  }
};

// export const getThemeTask = (isLightTheme) => (dispatch) => {
//   console.log('isLightTheme', isLightTheme);
//   return dispatch({ type: 'GET_THEME', isLightTheme: isLightTheme });
// };
