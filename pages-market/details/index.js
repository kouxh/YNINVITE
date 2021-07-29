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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
        let {clientInfo,activityId} =that.data
        activityId=res.data.mma_id;
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
        });
      }else{
        wx.showToast({ title: res.data.msg, icon: "none" });
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