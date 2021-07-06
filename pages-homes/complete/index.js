// pages-homes/complete/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clientInfo:{
      name:'',
      tell:'',
      email:'',
      isJoin:'-1',
      room:'',
      date:'',
      isAirport:'-1',
      vehicle:'',
      busNum:'',
      remark:'',
    },
    calendarShow:false,//日历弹框
    checkedIndex:-1,
    roomData:[],//客户参会分会场下拉列表数据
    roomShow:false,
    vehicleData:[
      {name:'飞机'},
      {name:'高铁'},
      {name:'火车'},
    ],//客户乘坐交通工具下拉列表数据
    vehicleShow:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  roomFn(){
    let that=this
    that.setData({
      roomShow:true,
      vehicleShow: false,
      checkedIndex:-1
    });
   if(that.data.clientInfo.room){
    for(let i in that.data.roomData){
      if (that.data.roomData[i].name == that.data.clientInfo.room) {
          that.setData({
            checkedIndex:i
          })
      }
    }
   }
  },
  vehicleFn(){
    let that=this
    that.setData({
      vehicleShow: true,
      roomShow:false,
      checkedIndex:-1
    });
   if(that.data.clientInfo.vehicle){
    for(let i in that.data.vehicleData){
      if (that.data.vehicleData[i].name == that.data.clientInfo.vehicle) {
          that.setData({
            checkedIndex:i
          })
      }
    }
   }
  },
  //关闭下拉框
  listClose(e){
    if(e.detail.type==1){
    this.setData({
      'clientInfo.room':e.detail.selectName,
      selectShow:e.detail.listShow
    })
    }else if(e.detail.type==2){
    this.setData({
      vehicleShow: e.detail.listShow,
      'clientInfo.vehicle': e.detail.selectName,
    });
    }
  },
  //表单项内容发生改变的回调
  handleInput(event){
    let type=event.currentTarget.id;
    this.setData({
      [type]:event.detail.value
    })
    
  },

  //点击提交按钮
  submitFn(){
    let that = this;
    let {clientInfo}=that.data;
    if(clientInfo.name==''){
      return wx.showToast({ title: "请输入客户姓名", icon: "none" });
    }
    if (
      !/^1[3-9]\d{9}$/.test(clientInfo.tell) ||
      clientInfo.tell == ""
    ) {
      return wx.showToast({ title: "请输入客户手机号", icon: "none" });
    }
    var emailStr = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    if(clientInfo.email=='' ||!emailStr.test(clientInfo.email)){
      return wx.showToast({ title: "请输入客户邮箱", icon: "none" });
    }
    if(clientInfo.isJoin=='-1'){
      return wx.showToast({ title: "请确认是否参会", icon: "none" });
    }
    if(clientInfo.isJoin=='0'&&clientInfo.room==''){
      return wx.showToast({ title: "请选择客户参会分会场", icon: "none" });
    }
    if(clientInfo.isJoin=='0'&&clientInfo.date==''){
      return wx.showToast({ title: "请选入住时间", icon: "none" });
    }
    if(clientInfo.isAirport=='-1'){
      return wx.showToast({ title: "请确认是否需要接机", icon: "none" });
    }
    if(clientInfo.isAirport=='0'&&clientInfo.vehicle==''){
      return wx.showToast({ title: "请选择客户乘坐交通工具", icon: "none" });
    }
    if(clientInfo.isAirport=='0'&&clientInfo.busNum==''){
      return wx.showToast({ title: "请输入车次信息", icon: "none" });
    }
    wx.navigateTo({
      url: '/pages-homes/succeed/index',
    })
  },
  // 是否参会
  onChange(event) {
    console.log(event.detail)
    this.setData({
      'clientInfo.isJoin': event.detail,
    });
  },
  //是否需要接机
  onSwitch(e){
    this.setData({
      'clientInfo.isAirport': e.detail,
    });
  },
  onDisplay() {
    this.setData({ calendarShow: true });
  },
  onClose() {
    this.setData({ calendarShow: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
    let yearDate = new Date().getFullYear();//获取完整的年份
    const [start, end] = event.detail;
    this.setData({
      calendarShow: false,
      'clientInfo.date': `${yearDate}/${this.formatDate(start)} - ${yearDate}/${this.formatDate(end)}`,
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