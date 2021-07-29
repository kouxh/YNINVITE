// pages/login/index.js
import regeneratorRuntime from "../../libs/regenerator/runtime-module";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isclick:true,//防重点击
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
  },

  jumpFn(){
    let that=this;
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
        }else{
          if(wx.getStorageSync('loginData').custom_token=='' ||wx.getStorageSync('loginData').custom_token==undefined){
            console.log(wx.getStorageSync('loginData').custom_token,'----授权-----')
            setTimeout(() => {
              if(that.data.isclick){
                that.setData({
                  isclick:false
                })
                wx.qy.login({
                  success: function(res) {
                    console.log(res.code,'--------loginindex-----------')
                    if (res.code) {
                      wx.showLoading({
                        title: "登录中...",
                        mask: true
                      });
                    // 发起网络请求
                      wx.request({
                        url: 'https://market.chinamas.cn/market/login',
                        data: {
                          code: res.code
                        },
                        success:function(res){
                          console.log(res)
                          if(res.data.bool){
                            wx.hideLoading();
                            wx.showToast({
                              title: '登录成功',
                              icon: 'success',
                              duration: 2000
                            });
                            wx.setStorageSync('loginData', res.data.data)
                            if(res.data.data.identity=='市场'|| res.data.data.identity=='领导'){
                              wx.reLaunch({
                                url: '/pages/login-market/index',
                              })
                            }else if(res.data.data.identity=='销售'){
                              wx.reLaunch({
                                url: '/pages/login-sales/index',
                              })
                            }else{
                              wx.showToast({
                                title: "不好意思，您没有权限！",
                                icon: "none"
                              });
                            }
                              
                          }else{
                            wx.showToast({
                              title: res.data.errMsg,
                              icon: "none"
                            });
                          }
                        },
                        fail: function(res){
                          console.log(res,'请求失败！')
                        }
                      })
                    }else {
                      console.log('登录失败！' + res.errMsg)
                    }
                  },
                  fail: function(res){
                    console.log(res,'获取code失败')
                  }
                });
                setTimeout(function(){ 
                  that.setData({
                    isclick:true
                  })
                }, 500);
                
            }
            }, Math.floor(Math.random()*2000));
          }else{
            let loginData=wx.getStorageSync('loginData');
            if(loginData.identity=='市场'|| loginData.identity=='领导'){
              wx.reLaunch({
                url: '/pages/login-market/index',
              })
            }else if(loginData.identity=='销售'){
              wx.reLaunch({
                url: '/pages/login-sales/index',
              })
            }
            // else if(loginData.identity=='领导'){
            //   wx.reLaunch({
            //     url: 'pages-market/activity-list/index',
            //   })
            // }
            else{
              wx.showToast({
                title: "不好意思，您没有权限！",
                icon: "none"
              });
            }
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})


