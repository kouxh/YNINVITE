import fetch from "./http";
export default {
  /**
   *登录
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  login(params) {
    return fetch.fetchGet("market/login", params);
  },
  //市场角色接口开始
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
  /**
   *领导查看所有活动列表
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  activityrAllList(params) {
    return fetch.fetchGet("market/list/leader/activity", params);
  },
  /**
   *我收到的客户提名
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  pending(params) {
    return fetch.fetchGet("market/get/activity/not/reviewed/customer", params);
  },
  /**
   *驳回原因列表
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  reasonList(params) {
    return fetch.fetchPost("market/list/reject/reason", params);
  },
  /**
   *市场操作客户通过通过或者驳回
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  customerOnEdit(params) {
    return fetch.fetchPost("market/examine/customer", params);
  },
  /**
   *我收到的参会不参会列表
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  attendance(params) {
    return fetch.fetchGet("market/list/attendance/customer", params);
  },
  /**
   *市场端点击编辑按钮——获取单个活动信息
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  activityInfo(params) {
    return fetch.fetchGet("market/get/activity/info", params);
  },
  /**
   *修改单个活动操作
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  editActivityInfo(params) {
    return fetch.fetchPost("market/edit/do/activity/info", params);
  },

  //市场角色接口结束




  
  // 销售角色接口开始
  /**
   *添加需审核的客户信息
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  customerAdd(params) {
    return fetch.fetchPost("market/add/customer", params);
  },
  /**
   *添加补充客户信息
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  perfectCus(params) {
    return fetch.fetchPost("market/add/customer/supplement", params);
  },
  /**
   *补充客户信息所需要的客户姓名以及分会场
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  customerInfo(params) {
    return fetch.fetchPost("market/get/customer/info", params);
  },
  /**
   *我提名的客户列表
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  customerList(params) {
    return fetch.fetchGet("market/my/nomination/customer", params);
  },
  /**
   *驳回原因
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  reason(params) {
    return fetch.fetchGet("market/get/reject/reason", params);
  },
  /**
   *被驳回 返回修改
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  upCustomerInfo(params) {
    return fetch.fetchGet("market/up/customer/info", params);
  },
  /**
   *销售获取已授权的活动邀请函
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  invitation(params) {
    return fetch.fetchGet("market/get/activity/invitation/list", params);
  },
   /**
   *销售端获取客户公司名称
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  companyInfo(params) {
    return fetch.fetchGet("market/convertlab/customer/info", params);
  },
   /**
   *获取单个活动是否提供住宿
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  isProvided(params) {
    return fetch.fetchGet("market/activity/Is/accommodation/provided", params);
  },
  
  // 销售角色接口结束
  //公共的活动列表开始
  /**
   *每个角色的活动列表
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  getActivityList(params) {
    return fetch.fetchGet("market/get/activity/list", params);
  },
  //公共的活动列表结束
  
}