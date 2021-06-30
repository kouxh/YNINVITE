import regeneratorRuntime from "../libs/regenerator/runtime-module";
import config from "./config.js";
import httpClient from "./httpClient.js";
import {
  setStorage
} from "../utils/util";

export default {
    /***
   * 检查wx.login 是否过期
   */
  checkSession() {
    return new Promise(function (resolve, reject) {
      wx.qy.checkSession({
        success: function (res) {
          resolve(res);
        },
        fail: function (err) {
          resolve();
        }
      });
    });
  },
  // 微信登陆(获得code)
  getWxCode() {
    return new Promise(function (resolve, reject) {
      wx.qy.login({
        success(res) {
          resolve(res);
        }
      });
    });
  },
   // 得到登录信息
    async login() {
      // 获取临时登录凭证code
      var response = await this.getWxCode();
      var code = response.code;
      return httpClient.fetchPost(
        "/api/account/v1/webapp/login", {
          code: code,
        }, {
          headers: {
            'content-type': 'application/json',
          },
          baseURL: config.getConfig(),
          timeout: 10000
        }
      );
    },


};