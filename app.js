//app.js
import api from "/api/api";
import { setStorage } from "utils/util";
import regeneratorRuntime from "/libs/regenerator/runtime-module";

App({
  onLaunch() {
    // 展示本地存储能力
    let that=this;
    let loginData=wx.getStorageSync('loginData');
    wx.clearStorageSync(); // 首次进入，清除缓存
    if (loginData) {
      setStorage('loginData', loginData, that);
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
        wx.qy.checkSession({
          success: function(res){
            //session_key 未过期，并且在本生命周期一直有效
            console.log(res,'-----session_key-------')
            // let loginData=wx.getStorageSync('loginData');
            // console.log(loginData,'loginData')
            // if(loginData.custom_token!=undefined){
            //   if(loginData.identity=='市场' || loginData.identity=='领导'){
            //     wx.reLaunch({
            //       url: '/pages/login-market/index',
            //     })
            //   }else if(loginData.identity=='销售'){
            //     wx.reLaunch({
            //       url: '/pages/login-sales/index',
            //     })
            //   }else{
            //     wx.showToast({
            //       title: "不好意思，您没有权限！",
            //       icon: "none"
            //     });
            //   }
            // }
          },
          fail: function(res){
            // 当前环境是企业微信，执行登陆，获取用户 code，用于后面的权限校验
            wx.removeStorageSync('loginData');
            setTimeout(() => {
              wx.qy.login({
                success: function(res) {
                  console.log(res.code,'----res.code1------')
                  if (res.code) {
                  // 发起网络请求
                    wx.request({
                      url: 'https://market.chinamas.cn/market/login',
                      data: {
                        code: res.code
                      },
                      success:function(res){
                        console.log(res)
                        if(res.data.bool){
                          wx.setStorageSync('loginData', res.data.data)
                        }else{
                          wx.showToast({
                            title: res.data.errMsg,
                            icon: "none"
                          });
                        }
                      },
                      fail: function(res){
                        wx.showToast({
                          title: res,
                          icon: "none"
                        });
                      }
                    })
                  } else {
                    console.log('登录失败！' + res.errMsg)
                  }
                },
                fail: function(res){
                  console.log(res,'获取code失败')
                }
              });
            },  Math.floor(Math.random()*2000));
        }
      })
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


  globalData: {
    userInfo: null,
    api, //请求方法封装
    isIphoneX: false, // 是否属于iPhone X系列
    activityIndex:-1,//活动列表当前索引
  }
})
