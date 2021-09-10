Page({

  /**
   * 页面的初始数据
   */
  data: {
    listShowType: 0, // 列表显示状态 0加载中 1有 2无
    finished: false,//数据是否加载完成
    AllData:[],//总数组
    pageIndex: 1,
    pageSize: 10,
    total: 0, //列表总条数
    listData:[],
    currentIndex:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.invitationFn();//销售获取已授权的活动邀请函
  },
  //销售获取已授权的活动邀请函
  invitationFn(){
    let that = this;
    getApp().globalData.api.invitation({
      Market_Token:wx.getStorageSync('loginData').custom_token,
      uid:wx.getStorageSync('loginData').uid,
    }).then(res=>{
      if(res.bool){
        that.setData({
          AllData:res.data.reverse(),
          total:res.data.length
        });
        this.loadmore();
      }else{
        wx.showToast({ title: res.errMsg, icon: "none" });
      }
    })
  },
  // 滑动加载
  loadmore(){
    let that=this;
    let _this = this.data;
    
    //加载提示
    // wx.showLoading({
    //   title: '加载中',
    // })
    if(_this.total / _this.pageSize > _this.pageIndex){
      that.setData({
        listData:_this.listData.concat(_this.AllData.slice((_this.pageIndex-1) * _this.pageSize, _this.pageIndex * _this.pageSize)),
        pageIndex: _this.pageIndex + 1 ,
      })
    }else{
      that.setData({
        listData:_this.AllData,
        finished: true,// 数据全部加载完成
      })
    }
    setTimeout(function () {
      that.setData({ listShowType: _this.total ? 1 : 2 });
    }, 300);
    // wx.hideLoading();
  },
  //点击下载
  downImg:  function(e)  {
    console.log(e,'e----')
    wx.showLoading({
      title: "加载中...",
      mask:true
	  })
    var _this =  this;
    let index=e.currentTarget.dataset.index
    _this.setData({
      currentIndex: index,
    })
     var img = e.currentTarget.dataset.src;
    // 下载监听进度
     const downloadTask = wx.downloadFile({
      url: img,
      success:  function(res)  {
     // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        // 下面是临时文件的路径res.tempFilePath
        if  (res.statusCode ==  200)  {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success:  function(res)  {
              wx.hideLoading()
              wx.showToast({
                title:  '保存图片成功!',
              });
            },
            fail:  function(res)  {
              wx.hideLoading()
              if (res.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || res.errMsg === "saveImageToPhotosAlbum:fail auth deny" || res.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
                // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
                wx.showModal({
                  title: '提示',
                  content: '需要您授权保存相册',
                  showCancel: false,
                  success: res => {
                    if (res.confirm) {
                      // openSetting 是需要事件驱动的，保证它的同步性。
                      wx.openSetting({
                        success(res) {
                          if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                                wx.showModal({
                                  title: '提示',
                                  content: '获取权限成功,再次点击图片即可保存',
                                  showCancel: false,
                                })
                          } else {
                                wx.showModal({
                                  title: '提示',
                                  content: '获取权限失败，将无法保存到相册哦~',
                                  showCancel: false,
                                })
                          }
                        },
                      fail(res) {
                        console.log("fail", res)
                      },
                      complete(res) {
                        console.log("complete", res)
                      }
                      })
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })
              }
            }
          })
        }  
      }
     });
    // downloadTask.onProgressUpdate((res)  =>  {
    // console.log('下载进度',res.progress)
    // console.log('已经下载的数据长度',res.totalBytesWritten)
    // console.log('预期需要下载的数据总长度',res.totalBytesExpectedToWrite)
    //   if  (res.progress ===  100)  {
    //     this.setData({
    //       progress:  ''
    //     });
    //   }  else  {
    //     this.setData({
    //       progress: res.progress +  '%'
    //     });
    //   }
    // });
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
    if(!this.data.finished){
      this.loadmore();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})