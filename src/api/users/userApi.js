import { ENDPOINTS } from '../../constants/routes/endpoints';
import { ServerUtility } from '../utility';

export const getTokens = (data, callbackFunction) => {
  const server_utility = new ServerUtility();

  server_utility.getToServer(ENDPOINTS.USER.GET_LIST, data, callbackFunction);
};

export const getQuickswapTokens = async (data, callbackFunction) => {
  const server_utility = new ServerUtility();

  server_utility.getToServer(ENDPOINTS.USER.GET_QUICKSWAP, data, callbackFunction);
};

export const getDfynTokens = async (data, callbackFunction) => {
  const server_utility = new ServerUtility();

  server_utility.getToServer(ENDPOINTS.USER.GET_DFYN, data, callbackFunction);
};

export const getSushiTokens = async (data, callbackFunction) => {
  const server_utility = new ServerUtility();

  server_utility.getToServer(ENDPOINTS.USER.GET_SUSHI, data, callbackFunction);
};
