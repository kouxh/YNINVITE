// pages/login/index.js
import regeneratorRuntime from "../../libs/regenerator/runtime-module";
import account from "../../api/logincode";
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

  async jumpFn(){
    console.log('判断是否是市场和销售')
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
          if(wx.getStorageSync('token')=='' ||wx.getStorageSync('token')==undefined){
            console.log(wx.getStorageSync('token'),'----授权-----')
            // setTimeout(() => {
              if(that.data.isclick){
                that.setData({
                  isclick:false
                })
                // // 将code发送给服务端
                // const res = await account.login();
                // console.log(res,'-----')
                // // 保存登录信息，如auth-token
                // wx.setStorageSync('token', res.data.data.custom_token)
                wx.qy.login({
                  success: function(res) {
                    console.log(res.code,'--------index-----------')
                    if (res.code) {
                      wx.showLoading({
                        title: "登录中...",
                        mask: true
                      });
                    // 发起网络请求
                      wx.request({
                        url: 'https://march.yuanian.com/api/march/login',
                        data: {
                          code: res.code
                        },
                        success:function(res){
                          if(res.data.errCode==200){
                            wx.showToast({
                              title: '登录成功',
                              icon: 'success',
                              duration: 2000
                            });
                            wx.setStorageSync('token', res.data.data.custom_token)
                            wx.hideLoading();
                            wx.switchTab({
                              url: '/pages/overall/index',
                            })
                          }else if(res.data.errCode==10043){
                            wx.removeStorageSync('token');
                            wx.removeStorageSync('isDevelop');
                            wx.qy.login()
                          }else if(res.data.errCode==45009){
                            wx.showToast({
                              title: "请求频繁，请稍后重试！",
                              icon: "none"
                            });
                            wx.hideLoading();
                          }else{
                            wx.showToast({
                              title: res.data.errMsg,
                              icon: "none"
                            });
                          }
                        },
                        fail: function(res){
                          console.log(res,'获取code失败')
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
            // }, Math.floor(Math.random()*2000));
          }else{
            wx.switchTab({
              url: '/pages/overall/index',
            })
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


