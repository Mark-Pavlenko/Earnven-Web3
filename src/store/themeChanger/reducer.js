import GET_THEME from '../../constants/actionTypes';

let isLightTheme;
isLightTheme =
  localStorage.getItem('selectedTheme') === null || localStorage.getItem('selectedTheme') === 'Day';
if (localStorage.getItem('selectedTheme') === null) localStorage.setItem('selectedTheme', 'Day');
if (localStorage.getItem('firstConnection') === null) localStorage.setItem('firstConnection', true);

const initialState = {
  isLightTheme,
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
