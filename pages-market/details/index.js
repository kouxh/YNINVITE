import regeneratorRuntime from "../../libs/regenerator/runtime-module";
let isSend = false;//函数节流使用

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 客户信息
    clientInfo:{
      activityName:'',
      companyName:'',
      name:'',
      scale:'',
      industry:'',
      department:'',
      duty:'',
      tell:'',
      email:'',
      area:'',
      city:'',
      isStay:'',
      stayType:'',
      money:'',
      remark:''
    },
    activityId:'',//活动ID
    customerId:'',//客户ID
    refuteShow:false,//选择驳回弹框
    refuteRadio:1,//驳回状态
    reasonList:[],//原因列表
    rejectId:'',//驳回原因id
    status:'',//状态（必填 1通过2不通过3驳回）
    tabsActive:1,//1未审2已审
    isAStay:0,//0 不住宿 1住宿
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.tabsActive){
      this.setData({
        tabsActive:options.tabsActive
      })
    }
    if(options.id){
      this.customerInfo(options.id);
    }
  },
  //获取客户详情
  customerInfo(id){
    let that = this;
    getApp().globalData.api.upCustomerInfo({
      Market_Token:wx.getStorageSync('loginData').custom_token,
      mmuc_id:id
    }).then(res=>{
      if(res.bool){
        let {clientInfo,activityId,customerId,isAStay} =that.data
        activityId=res.data.mma_id;
        customerId=res.data.mmc_id;
        isAStay=res.data.mma_is_accommodation;
        clientInfo.activityName=res.data.mma_title;
        clientInfo.companyName=res.data.mmc_company_name;
        clientInfo.name=res.data.mmc_name;
        clientInfo.scale=res.data.mmc_scale;
        clientInfo.industry=res.data.mmc_industry;
        clientInfo.department=res.data.mmc_department;
        clientInfo.duty=res.data.mmc_post;
        clientInfo.tell=res.data.mmc_tell;
        clientInfo.email=res.data.mmc_email;
        clientInfo.area=res.data.mmc_region;
        clientInfo.city=res.data.mmc_city;
        clientInfo.isStay=res.data.mmc_is_accommodation.toString();
        clientInfo.stayType=res.data.mmc_accommodation_type;
        clientInfo.money=res.data.mmc_business_money;
        clientInfo.remark=res.data.mmc_remarks;
        that.setData({
          activityId:activityId,
          clientInfo:clientInfo,
          customerId:customerId,
          isAStay:isAStay
        });
      }else{
        wx.showToast({ title: res.data.msg, icon: "none" });
      }
    })
  },
  //点击操作按钮
  submit(e){
    let status = e.target.dataset.status;
    this.setData({
      status:status
    })
    if(status!=3){
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
    wx.navigateBack({
      delta: 1
    })
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