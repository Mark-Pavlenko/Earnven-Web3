const API_BASE = 'https://api.coingecko.com/api/v3';

export const ENDPOINTS = {
  USER: {
    // GET_LIST : `${API_BASE}/coins/list?include_platform=true`,
    GET_QUICKSWAP:
      'https://unpkg.com/quickswap-default-token-list@1.0.77/build/quickswap-default.tokenlist.json',
    GET_DFYN: 'https://raw.githubusercontent.com/dfyn/new-host/main/list-token.tokenlist.json',
    GET_SUSHI:
      'https://unpkg.com/@sushiswap/default-token-list@10.0.1/build/sushiswap-default.tokenlist.json',
  },
};
