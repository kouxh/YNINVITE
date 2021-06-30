// pages-homes/contact/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listShowType: 1, // 列表显示状态 0加载中 1有 2无
    finished: false,//数据是否加载完成
    listData:[
      {title:'重塑边界 开启财务共享+时代',charge:'李丽君 ',tell:"13478557529"},
      {title:'重塑边界 开启财务共享+时代',charge:'李丽君 ',tell:"13478557529"},
      {title:'重塑边界 开启财务共享+时代',charge:'李丽君 ',tell:"13478557529"},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 复制
  copyFn(e) {
    var code = e.currentTarget.dataset.copy;
    wx.setClipboardData({
      data: code,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: "none",
        });
      },
      fail: function (res) {
        wx.showToast({
          title: '复制失败',
          icon: "none",
        });
      },
    });
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