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
  /**
   *创建人创建活动
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  activityAdd(params) {
    return fetch.fetchPost("market/add/activity", params);
  },
  /**
   *创建人创建的所有活动列表
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  activityList(params) {
    return fetch.fetchGet("market/list/activity", params);
  },
  
}