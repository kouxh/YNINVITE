import fetch from "./http";
export default {
  /**
   *登录
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  login(params) {
    return fetch.fetchGet("api/march/login", params);
  },
}