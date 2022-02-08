import GET_ADDRESS_INFO_DATA from '../../constants/actionTypes';

const initialState = {
  addressInfoDataObject: {},
};

export const addressInfoDataReducer = (state = initialState, action) => {
  // console.log('addressInfo payload reducer', action?.payload);
  switch (action.type) {
    case GET_ADDRESS_INFO_DATA:
      return {
        addressInfoDataObject: action?.payload,
      };
    default:
      return state;
  }
};
