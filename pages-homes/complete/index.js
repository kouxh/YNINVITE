Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    clientInfo:{
      name:'',
      tell:'',
      email:'',
      isJoin:'4',
      room:'',
      date:'',
      isAirport:'否',
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
    activityId:'',//活动id
    clientId:'',//客户id
    isCommon:'',//0不提供住宿1提供住宿
    isContent:false,//是否可以修改
    successShow:false,//是否提交成功
    Loading:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      activityId:options.aid,
      clientId:options.cuid,
    })
    if(options.status){
      this.setData({
        "clientInfo.isJoin":options.status
      })
    }
    this.customerInfo();//补充客户信息所需要的客户姓名以及分会场
  },
  //补充客户信息所需要的客户姓名以及分会场
  customerInfo(){
    let that = this;
    getApp().globalData.api.customerInfo({
      Market_Token:wx.getStorageSync('loginData').custom_token,
      avid:that.data.activityId,
      cuid:that.data.clientId
    }).then(res=>{
      if(res.bool){
        for (let i of res.data.branch_venue) {
          let item = {
            name: i,
          };
          that.data.roomData.push(item);
        }
        that.setData({
          roomData: that.data.roomData,
          isCommon:res.data.customer.mmc_is_accommodation?res.data.customer.mmc_is_accommodation:'',
          "clientInfo.name":res.data.customer.mmc_name?res.data.customer.mmc_name:'',
          "clientInfo.tell":res.data.customer.mmc_tell?res.data.customer.mmc_tell:'',
          "clientInfo.email":res.data.customer.mmc_email?res.data.customer.mmc_email:'',
          "clientInfo.date":res.data.customer.mmcs_check_time?res.data.customer.mmcs_check_time:'',
          "clientInfo.room":res.data.customer.mmcs_branch_venue?res.data.customer.mmcs_branch_venue:'',
          "clientInfo.isAirport":res.data.customer.mmcs_is_pick_drop?res.data.customer.mmcs_is_pick_drop:'否',
          "clientInfo.vehicle":res.data.customer.mmcs_vehicle?res.data.customer.mmcs_vehicle:'',
          "clientInfo.busNum":res.data.customer.mmcs_flight_number?res.data.customer.mmcs_flight_number:'',
          "clientInfo.remark":res.data.customer.mmcs_remarks?res.data.customer.mmcs_remarks:'',
          isContent:true,
          Loading:false
        });
        console.log(that.data.isCommon,'isCommonisCommon')
      }else{
        wx.showToast({ title: res.data.msg, icon: "none" });
      }
    })
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
      roomShow:e.detail.listShow
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
    if(clientInfo.isJoin==''){
      return wx.showToast({ title: "请确认是否参会", icon: "none" });
    }
    if(clientInfo.isJoin=='4'&&that.data.roomData.length>0&&clientInfo.room==''){
      return wx.showToast({ title: "请选择客户参会分会场", icon: "none" });
    }
    if(clientInfo.isJoin=='4'&&that.data.isCommon==1&&clientInfo.date==''){
      return wx.showToast({ title: "请选入住时间", icon: "none" });
    }
    // if(clientInfo.isAirport==''&&that.data.isCommon==1){
    //   console.log(clientInfo.isAirport,that.data.isCommon)
    //   return wx.showToast({ title: "请确认是否需要接机", icon: "none" });
    // }
    // if(clientInfo.isAirport=='是'&&that.data.isCommon==1&&clientInfo.vehicle==''){
    //   return wx.showToast({ title: "请选择客户乘坐交通工具", icon: "none" });
    // }
    // if(clientInfo.isAirport=='是'&&that.data.isCommon==1&&clientInfo.busNum==''){
    //   return wx.showToast({ title: "请输入车次信息", icon: "none" });
    // }
    // if(clientInfo.remark==''){
    //   return wx.showToast({ title: "请输入备注信息", icon: "none" });
    // }
    let postData = {
      mmcs_cid:that.data.clientId,
      mmcs_is_attendance:clientInfo.isJoin,
      mmcs_branch_venue:clientInfo.isJoin=='4'?clientInfo.room:'',
      mmcs_check_time:clientInfo.isJoin=='4'?clientInfo.date:'',
      mmcs_is_pick_drop:clientInfo.isJoin=='4'?clientInfo.isAirport:'',
      mmcs_vehicle:(clientInfo.isJoin=='4'&&clientInfo.isAirport!=='否')?clientInfo.vehicle:'',
      mmcs_flight_number:(clientInfo.isJoin=='4'&&clientInfo.isAirport!=='否')?clientInfo.busNum:'',
      mmcs_remarks:clientInfo.remark,
    };
    getApp().globalData.api.perfectCus({
      Market_Token:wx.getStorageSync('loginData').custom_token,
      json:JSON.stringify(postData),
      avid:that.data.activityId
    }).then(res=>{
      if(res.bool){
        // wx.redirectTo({
        //   url: '/pages-homes/succeed/index',
        // })
        that.setData({
          successShow:true
        })
        setTimeout(() => {
          that.setData({
            successShow:false
          })
          wx.navigateBack({
            delta: 1
          })
        }, 2000);
      }else{
        wx.showToast({ title: res.data.msg, icon: "none" });
      }
    })
  },
  // 弹层关闭事件
  successClose(data){
    this.setData({
      successShow:data.detail.successShow
    })
  },
  // 是否参会
  onChange(event) {
    this.setData({
      'clientInfo.isJoin': event.detail,
    });
  },
  //是否需要接机
  onSwitch(e){
    console.log(e,'0000')
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