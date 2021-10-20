import axios from 'axios';

export class ServerUtility {
  async getToServer(url, requestModelQuery, functionToHandleResponseFromServer, errorCallBack) {
    try {
      const result = await axios.get(url);

      if (result.data && result.status === 200) {
        functionToHandleResponseFromServer(result.data);
      }
    } catch (error) {
      if (errorCallBack) errorCallBack(error);
      console.log(error);
    }
  }

  async postToServer() {}

  async putToServer() {}

  async deleteToServer() {}
}
