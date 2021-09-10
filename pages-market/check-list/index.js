
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabsActive:1,//默认tabs栏
    navTab: [{name:'待审',icon:'icon-shijian'},{name:'已审',icon:'icon-wancheng'}],    
    listShowType: 0, // 列表显示状态 0加载中 1有 2无
    finished: false,//数据是否加载完成
    AllData:[],//总数组
    pageIndex: 1,
    pageSize: 10,
    total: 0, //列表总条数
    listData:[],
    refuteShow:false,//选择驳回弹框
    refuteRadio:1,//驳回状态
    nowIndex:'-1',//下拉的当前索引
    pullData:[
      {name:'通过'},
      {name:'不通过'},
      {name:'驳回'},
    ],//下拉数据
    activityId:'',//活动id
    customerId:'',//客户id
    status:'',//状态（必填 1通过2不通过3驳回）
    reasonList:[],//原因列表
    rejectId:'',//驳回原因id
    meeting:'',//参会
    Adopt:'',//通过
    isStay:0,//0不住宿1住宿
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ 
      activityId:options.id
    })
    this.pendingFn();//领导查看所有活动列表
  },
    //领导查看所有活动列表
    pendingFn(){
      let that = this;
      getApp().globalData.api.pending({
        Market_Token:wx.getStorageSync('loginData').custom_token,
        avid:that.data.activityId,
        type:that.data.tabsActive
      }).then(res=>{
        if(res.bool){
          res.data.list.forEach((item) => {  
            item.isBalloon = false; 
            item.default="待审核"
          })
          that.setData({
            AllData:res.data.list.reverse(),
            total:res.data.num,
            meeting:res.data.meeting,
            Adopt:res.data.Adopt,
            isStay:res.data.activity.mma_is_accommodation
          });
          this.loadmore();
        }else{
          wx.showToast({ title: res.data.msg, icon: "none" });
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
    //tabs栏切换
    onChange(event) {
      let currentIndex=event.currentTarget.dataset.idx;
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
      this.setData({
        listShowType:0,
        listData:[],
        finished:false,
        tabsActive:currentIndex,
        pageIndex:1,
        AllData:[]
      })
      this.pendingFn();
    },
    //点击操作
    onEdit(e) {
     let idx=e.currentTarget.dataset.idx;
     if(this.data.listData[idx].isBalloon){
       this.data.listData[idx].isBalloon = !this.data.listData[idx].isBalloon
     }else{
       this.data.listData.forEach((item, i) => {
         item.isBalloon = idx == i? true: false
       })
     }
     this.setData({
      listData:this.data.listData
     })
    },
    //点击每一项操作
    checkFn(e){
      let itemId = e.currentTarget.dataset.id;
      let idx=e.currentTarget.dataset.idx;
      let type = e.currentTarget.dataset.type;
      this.data.listData[idx].isBalloon = !this.data.listData[idx].isBalloon
      this.data.listData[idx].default = e.currentTarget.dataset.name
      this.setData({
        nowIndex:e.currentTarget.dataset.now,
        listData:this.data.listData,
        customerId:itemId,
        status:type
       })
       if(type!=3){
        this.customerOnEdit();
       }else{
        this.setData({
          refuteShow:true
        })
        this.reasonFn();
       }
    },
    //驳回原因列表
    reasonFn(){
      let that = this;
      getApp().globalData.api.reasonList({
        Market_Token:wx.getStorageSync('loginData').custom_token,
      }).then(res=>{
        if(res.bool){
          that.setData({
            reasonList:res.data,
          });
        }else{
          wx.showToast({ title: res.data.msg, icon: "none" });
        }
      })
    },
    //市场操作客户通过通过或者驳回
    customerOnEdit(){
      let that = this;
      let rejectId='';
      if(that.data.status==3){
        rejectId=that.data.refuteRadio
      }
      getApp().globalData.api.customerOnEdit({
        Market_Token:wx.getStorageSync('loginData').custom_token,
        avid:that.data.activityId,
        cuid:that.data.customerId.toString(),
        status:that.data.status.toString(),//状态（必填 1通过2不通过3驳回）
        reject:rejectId.toString() //驳回ID（选填，如果status选择3则这项必填）
      }).then(res=>{
        if(res.bool){
        wx.showToast({ title: res.data.msg, icon: "none" });
        setTimeout(() => {
          this.pendingFn();
        }, 500);
        }else{
          wx.showToast({ title: res.data.msg, icon: "none" });
        }
      })
    },
    //点击驳回按钮
    refuteFn(){
      this.setData({ 
        refuteShow: true,
      });
    },
    //点击取消按钮
    onClose() {
      this.setData({ 
        refuteShow: false,
      });
    }, 
    //切换弹框的单选按钮
    onSwith(event) {
      this.setData({
        refuteRadio: event.detail,
      });
    },
    //点击确认按钮
    confirm(){
      this.setData({
        refuteShow:false
      })
      this.customerOnEdit();
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
    this.pendingFn();//领导查看所有活动列表
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