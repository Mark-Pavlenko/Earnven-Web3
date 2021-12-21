import actionTypes from '../../constants/actionTypes';

const initialState = {
  headerTitles: [],
  currentRouteTitle: '',
};

export const headerTitlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_HEADER_TITLES:
      console.log('titles array payload', action?.payload);
      return {
        headerTitles: action?.payload,
      };
    case actionTypes.SET_CURRENT_ROUTE_TITLE:
      console.log('route title payload', action?.payload);
      return {
        currentRouteTitle: action?.payload,
      };
    default:
      return state;
  }
};
