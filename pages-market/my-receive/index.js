// pages-market/check-list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    finished: false,//数据是否加载完成
    listShowType: 1, // 列表显示状态 0加载中 1有 2无
    checkedData:[
      {name:'张某',title:'重塑边界 开启财务共享+时代',sale:'王春',state:0 },
      {name:'张某',title:'重塑边界 开启财务共享+时代',sale:'王春',state:1 },
      {name:'张某',title:'重塑边界 开启财务共享+时代',sale:'王春',state:0 },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //tabs栏切换
  onChange(event) {
    let currentIndex=event.currentTarget.dataset.idx;
    this.setData({
      // listShowType:0,
      // checkData:[],
      tabsActive:currentIndex
    })
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    });
    // if(currentIndex==0){
    //   this.getUserInfoFn()
    // }else if(currentIndex==1){
    //   this.collectionListFn();
    // }
    
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