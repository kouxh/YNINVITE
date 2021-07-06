// pages-market/check-list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabsActive:0,//默认tabs栏
    navTab: [{name:'待审',icon:'icon-shijian'},{name:'已审',icon:'icon-chushaixuanxiang'}],    
    finished: false,//数据是否加载完成
    listShowType: 1, // 列表显示状态 0加载中 1有 2无
    checkData:[
      {id:1,name:'张某',title:'重塑边界 开启财务共享+时代',sale:'王春',flight:'已填' },
      {id:2,name:'张某',title:'重塑边界 开启财务共享+时代',sale:'王春',flight:'已填' },
      {id:3,name:'张某',title:'重塑边界 开启财务共享+时代',sale:'王春',flight:'已填' },
    ],
    checkedData:[
      {name:'张某',title:'重塑边界 开启财务共享+时代',sale:'王春',state:0 },
      {name:'张某',title:'重塑边界 开启财务共享+时代',sale:'王春',state:1 },
      {name:'张某',title:'重塑边界 开启财务共享+时代',sale:'王春',state:0 },
    ],
    checkFinished: false,//数据是否加载完成
    checkShowType: 1, // 列表显示状态 0加载中 1有 2无
    refuteShow:false,//选择驳回弹框
    refuteRadio:'1',//驳回状态
    nowIndex:'0',//下拉的当前索引
    pullData:[
      {name:'通过'},
      {name:'不通过'},
      {name:'驳回'},
    ],//下拉数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {checkData}=this.data;
    checkData.forEach((item) => {  
      item.isBalloon = false; 
      item.default="待审核"
    })
    this.setData({ 
      checkData
    })
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
    //点击操作
    onEdit(e) {
     let idx=e.currentTarget.dataset.idx;
     if(this.data.checkData[idx].isBalloon){
       this.data.checkData[idx].isBalloon = !this.data.checkData[idx].isBalloon
     }else{
       this.data.checkData.forEach((item, i) => {
         item.isBalloon = idx == i? true: false
       })
     }
     this.setData({
      checkData:this.data.checkData
     })
    },
    //点击每一项操作
    checkFn(e){
      let itemId = e.currentTarget.dataset.id;
      let idx=e.currentTarget.dataset.idx;
      let type = e.currentTarget.dataset.type;
      this.data.checkData[idx].isBalloon = !this.data.checkData[idx].isBalloon
      this.data.checkData[idx].default = e.currentTarget.dataset.name
      this.setData({
        nowIndex:e.currentTarget.dataset.now,
        checkData:this.data.checkData
       })
       if(type==3){
        this.setData({
          refuteShow:true
        })
      }
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