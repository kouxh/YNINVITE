//app.js
import api from "/api/api";
import { setStorage } from "utils/util";
import regeneratorRuntime from "/libs/regenerator/runtime-module";
import account from "/api/logincode";
App({
  onLaunch() {
    // 展示本地存储能力
    let that=this;
    let token=wx.getStorageSync('token');
    wx.clearStorageSync(); // 首次进入，清除缓存
    if (token) {
      setStorage('token', token, that);
    }
    //判断开发环境
    var isWxWork = false;
    wx.getSystemInfo({
      success(res) {
        isWxWork = res.environment == 'wxwork';
        if (!isWxWork) {
            // 当前环境不是企业微信，怎么处理你随便
            wx.showToast({
              title: '请在企业微信中使用该小程序',
              icon: "none",
            })
            return;
        }
        //登录
        this.silentLogin();
      }
    })
     // 判断是否是机型
     wx.getSystemInfo({
      success(res) {
        if (
          res.model.indexOf('iPhone X') != -1 ||
          res.model.indexOf('iPhone 11') != -1 ||
          res.model.indexOf('iPhone 12') != -1
        ) {
          that.globalData.isIphoneX = true;
        }
      }
    })
  },

    //静态登录
    async silentLogin() {
      try {
        // 将code发送给服务端返回标识
        const res = await account.login();
         console.log(res,'-----')
        // 保存登录信息，如auth-token
        //  wx.setStorageSync('token', res.data.data.custom_token)
      } catch (error) {
        console.log('静默登录失败', error);
        throw error;
      }
 
      // var response = await account.checkSession();
      // var token=wx.getStorageSync('userInfo').token;
      // if(!response || token==undefined){
      //   wx.showToast({
      //     title: "授权过期，请点击重新登录",
      //     icon: "none"
      //   });
      //   wx.removeStorageSync("userInfo")
      //   wx.removeStorageSync("hasBindMobile")
      //   //  // 将code发送给服务端
      //   //  const res = await account.login();
      //   //  console.log(res,'-----')
      //   //  // 保存登录信息，如auth-token
      //   //  wx.setStorageSync('token', res.data.data.custom_token)
      //   let wxCode = await account.getWxCode();
      //   // 发起网络请求
      //   wx.request({
      //     url: 'https://march.yuanian.com/api/march/login',
      //     data: {
      //       code: wxCode.code
      //     },
      //     success:function(res){
      //       if(res.data.errCode==200){
      //         wx.setStorageSync('token', res.data.data.custom_token)
      //       }else if(res.data.errCode==10043){
      //         wx.removeStorageSync('token');
      //         wx.removeStorageSync('isDevelop');
      //         wx.qy.login()
      //       }else if(res.data.errCode==45009){
      //         wx.showToast({
      //           title: "请求频繁，请稍后重试！",
      //           icon: "none"
      //         });
      //       }else{
      //         wx.showToast({
      //           title: res.data.errMsg,
      //           icon: "none"
      //         });
      //       }
      //     },
      //     fail: function(res){
      //       wx.showToast({
      //         title: res,
      //         icon: "none"
      //       });
      //     }
      //   })

      // }else{
      //   // wx.switchTab({
      //   //   url: '/pages/home/index',
      //   // })
      // }
    },
    //登录
    async login() {
      // 调用wx.checkSession判断session_key是否过期
      const response = await account.checkSession();
      const token=wx.getStorageSync('userInfo').token;
      // 本地已有可用登录态且session_key未过期，resolve。
      if (response && token) return Promise.resolve();
      // 否则，发起静默登录
      wx.showToast({
        title: "授权过期，请点击重新登录",
        icon: "none"
      });
      wx.removeStorageSync("userInfo")
      wx.removeStorageSync("hasBindMobile")
      await this.silentLogin();
  },

  globalData: {
    userInfo: null,
    api, //请求方法封装
    isIphoneX: false, // 是否属于iPhone X系列
    activityIndex:-1,//活动列表当前索引
  }
})
