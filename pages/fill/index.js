// pages/info/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{
      type:"",//客户类型
      company:"",//客户单位中文名称
      companyE:"",//客户单位英文名称
      companyType:'',//客户单位属性
      industry:'',//客户所属行业
      name:'',//客户姓名
      appellation:'',//客户称谓
      tell:'',//客户手机
      email:'',//客户邮箱
      department:'',//客户部门
      job:'',//客户职务
      classify:'',//客户头衔分类
      city:'',//客户所在城市
      putup:'',//是否住宿
    },
    conditionShow:false,//是否展示客户确认情况弹框
    actions: [
      {
        name: '待定',
      },
      {
        name: '确认参会',
      },
      {
        name: '不参加',
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  //客户确认情况弹框
  onCondition() {
    console.log(this.data.conditionShow)
    this.setData({ conditionShow: true });
  },
  //取消客户确认情况弹框
  onClose() {
    this.setData({ conditionShow: false });
  },
  // 点击取消客户确认情况弹框
  onCancel(){
    this.setData({ conditionShow: false });
  },
   // 点击确认客户确认情况弹框按钮
   onSelect(event) {
    console.log(event.detail);
    this.setData({
      // conditionShow: false,
      'info.condition':event.detail.name,
    });
  },
  //点击底部确认按钮
  onClick(){
    console.log('确认')
  },
  // 修改信息 姓名 同步
  infoNameFn(e) {
      this.setData({
        'info.name': e.detail.value
      });
  },
  
  // 修改信息 手机号 同步
  infoTellFn(e) {
    this.setData({
      "info.tell": e.detail.value
    });
  },
  
  // 修改信息 邮箱 同步
  infoEmailFn(e) {
    this.setData({
      "info.email": e.detail.value
    });
  },
  //同步备注
  inputRemarkFn(e){
    this.setData({
      "info.remark": e.detail.value
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