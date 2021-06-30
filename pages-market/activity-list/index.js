// pages-homes/activity/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listShowType: 1, // 列表显示状态 0加载中 1有 2无
    finished: false,//数据是否加载完成
    activityData:[
      {title:'重塑边界 开启财务共享+时代',site:'上海',time:'2021.5.20'},
      {title:'重塑边界 开启财务共享+时代',site:'上海',time:'2021.5.20'},
      {title:'重塑边界 开启财务共享+时代',site:'上海',time:'2021.5.20'},
      {title:'重塑边界 开启财务共享+时代',site:'上海',time:'2021.5.20'},
    ],
    currentIndex:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
   //列表点击事件
   listClick: function (e) {
     let index=e.currentTarget.dataset.index
    this.setData({
      currentIndex: index,
    })
     wx.navigateTo({
       url: '/pages-market/check-list/index',
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
    // this.setData({
    //   currentIndex:getApp().globalData.activityIndex,
    // })
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