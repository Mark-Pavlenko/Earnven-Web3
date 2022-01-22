import actionTypes from '../../constants/actionTypes';

export const setSnowSwanProtocolData = (payload) => {
  return {
    type: actionTypes.SET_SNOW_SWAN_DATA,
    payload,
  };
};
