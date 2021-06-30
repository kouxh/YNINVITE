// pages-homes/invitation/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listShowType:1, // 列表显示状态 0加载中 1有 2无
    finished: false,//数据是否加载完成
    listData:[
      {img:'https://img.deiyou.net/upload/seller/goods/image/2019/10/17/be68d4839ec94570bba0cca1d87b0ea3',title:'数字化企业与管理会计体系转型研讨会邀请函'},
      {img:'https://img.deiyou.net/upload/seller/goods/image/2019/10/17/be68d4839ec94570bba0cca1d87b0ea3',title:'智能财务微课堂系列课程邀请函'},
      {img:'https://img.deiyou.net/upload/seller/goods/image/2019/10/17/be68d4839ec94570bba0cca1d87b0ea3',title:'2019企业数字化转型高峰论坛邀请函'},
      {img:'https://img.deiyou.net/upload/seller/goods/image/2019/10/17/be68d4839ec94570bba0cca1d87b0ea3',title:'中台架构提速企业数字化转型高峰论坛邀请函'},
    ],
    currentIndex:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  downImg:  function(e)  {
    var _this =  this;
    let index=e.currentTarget.dataset.index
    _this.setData({
      currentIndex: index,
    })
    // 获取图片地址(http://www.playsort.cn/...)
     var img = e.currentTarget.dataset.src;
    // 下载监听进度
     const downloadTask = wx.downloadFile({
      url: img,
      success:  function(res)  {
     // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        console.log(res)
        if  (res.statusCode ==  200)  {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success:  function(res)  {
              wx.showToast({
                title:  '保存图片成功!~',
              });
            },
            fail:  function(res)  {
              wx.showToast({
                title:  '保存图片失败!~',
              });
            }
          })
        }  
      }
     });
    downloadTask.onProgressUpdate((res)  =>  {
      if  (res.progress ===  100)  {
        this.setData({
          progress:  ''
        });
      }  else  {
        this.setData({
          progress: res.progress +  '%'
        });
      }
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