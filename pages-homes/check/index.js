
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
    refuteShow:false,//驳回弹框
    listData:[],
    activityTitle:'',//活动名称
    customerId:'',//客户列表id
    activityId:'',//活动id
    reason:'',//驳回原因
    isStay:0,//0不住宿1住宿
    scrollY:true,//纵向滚动
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'options')
    this.setData({
      activityTitle:options.title,
      activityId:options.aid
    })
    
  },
  //我提名的客户列表
  activityListFn(){
    let that = this;
    getApp().globalData.api.customerList({
      Market_Token:wx.getStorageSync('loginData').custom_token,
      uid:wx.getStorageSync('loginData').uid,
      avid:that.data.activityId
    }).then(res=>{
      if(res.bool){
        that.setData({
          AllData:res.data.list?res.data.list.reverse():[],
          total:res.data.num,
          isStay:res.data.activity.mma_is_accommodation
        });
        setTimeout(function () {
          that.setData({ listShowType: that.data.total ? 1 : 2 });
        }, 300);
        this.loadmore();
      }else{
        wx.showToast({ title: res.data.msg, icon: "none" });
      }
    })
  },
  // 滑动加载封装
  loadmore(){
    let that=this;
    let _this = this.data;
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
  },
//  滑动加载
  scrolltolower(){
    console.log('11')
    if(!this.data.finished){
      this.loadmore();
    }
  },
  //点击返回按钮
  backFn(){
    wx.navigateBack({
      delta: 1
    })
  },
  //点击驳回按钮
  refuteFn(e){
    let that = this;
    let mmucId=e.currentTarget.dataset.mmucid
    that.setData({ 
      refuteShow: true,
      customerId:mmucId
    });
    getApp().globalData.api.reason({
      Market_Token:wx.getStorageSync('loginData').custom_token,
      mmuc_id:mmucId
    }).then(res=>{
      if(res.bool){
        that.setData({
          reason:res.data.mmrr_title,
        });
      }else{
        wx.showToast({ title: res.data.msg, icon: "none" });
      }
    })
  },
  //点击取消按钮
  onClose() {
    this.setData({ 
      refuteShow: false,
    });
  },
  //点击返回修改按钮
  changeBtn(){
    this.setData({ 
      refuteShow: false,
    });
    wx.redirectTo({
      url: `/pages-homes/nominate/index?customerId=${this.data.customerId}`,
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
    this.activityListFn();//我提名的客户列表
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