import actionTypes from '../../constants/actionTypes';

const initialState = {
  balancerV2lp: [],
  balancerV2tot: 0,
};

export const balancerV2lp = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BALANCER_LP:
      return {
        balancerV2lp: action?.payload,
      };
    case actionTypes.GET_BALANCER_LP_TOT:
      return {
        ...state,
        balancerV2tot: action?.payload,
      };
    default:
      return state;
  }
};
