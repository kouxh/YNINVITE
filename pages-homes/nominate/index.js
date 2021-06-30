import regeneratorRuntime from "../../libs/regenerator/runtime-module";
let isSend = false;//函数节流使用
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectShow: false,//控制客户规模下拉列表的显示隐藏，false隐藏、true显示
    scaleData:[
      {name:'500亿以上'},
      {name:'200-500亿(含)'},
      {name:'100-200亿(含)'},
      {name:'50-100亿(含)'},
      {name:'30-50亿(含)'},
      {name:'10-30亿(含)'},
      {name:'10亿以下'},
    ],//客户规模数据
    industryShow:false,//客户所属行业
    industryData:[
      {name:'地产'},
      {name:'金融'},
      {name:'零售快消'},
      {name:'能源化工'},
      {name:'装备制造'},
      {name:'互联网与高科技'},
      {name:'专业服务业'},
      {name:'政府及行政事业'},
      {name:'其他'},
    ],//客户所属行业数据
    areaShow:false,
    searchList: [],//匹配到的搜索公司名称数据
    areaData:[
      {name:'北方区'},
      {name:'华东区'},
      {name:'华南区'},
      {name:'西部'},
      {name:'华北'},
      {name:'华中'},
      {name:'西北'},
      {name:'西南'},
      {name:'东北'},
      {name:'港澳台'},
    ],//所属区域
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
      isStay:'-1',
      stayType:'-1',
      money:'',
      remark:''
    },
    checkedIndex: -1,//如果直接播放则改为对应下标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 客户规模点击下拉显示框
  selectTap() {
    let that =this;
    that.setData({
      selectShow: true,
      industryShow:false,
      areaShow:false,
      checkedIndex:-1
    });
    if(that.data.clientInfo.scale){
      for(let i in that.data.scaleData){
        if (that.data.scaleData[i].name == that.data.clientInfo.scale) {
          that.setData({
              checkedIndex:i
            })
        }
      }
     }
  },
  // 客户所属行业
  industryTap(){
    let that=this
    that.setData({
      industryShow:true,
      selectShow:false,
      areaShow:false,
      checkedIndex:-1
    });
    if(that.data.clientInfo.industry){
      for(let i in that.data.industryData){
        if (that.data.industryData[i].name == that.data.clientInfo.industry) {
          that.setData({
              checkedIndex:i
            })
        }
      }
     }
  },
// 点击所属区域
 areaTab(){
  let that=this
  that.setData({
    areaShow: true,
    industryShow:false,
    selectShow:false,
    checkedIndex:-1
  });
 if(that.data.clientInfo.area){
  for(let i in that.data.areaData){
    if (that.data.areaData[i].name == that.data.clientInfo.area) {
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
      'clientInfo.scale':e.detail.selectName,
      selectShow:e.detail.listShow
    })
   }else if(e.detail.type==2){
    this.setData({
      industryShow: e.detail.listShow,
      'clientInfo.industry': e.detail.selectName,
    });
   }else if(e.detail.type==3){
    this.setData({
      areaShow: e.detail.listShow,
      'clientInfo.area': e.detail.selectName,
    });
   }
  
 },
  //表单项内容发生改变的回调
  handleInput(event){
    let type=event.currentTarget.id;
    this.setData({
      [type]:event.detail.value
    })
    console.log(event.detail.value,'----')
  },
   //搜索
   handleInputChange(event){
    this.setData({
      'clientInfo.companyName': event.detail.value.trim()
    })
    if(isSend){
      return;
    }
    isSend = true;
    //发请求获取搜索匹配到的数据
    // this.getSearchListData();
    this.setData({
      searchList:[
        {name:'元年'},
        {name:'元年1'},
        {name:'元年2'},
        {name:'元年3'},
        {name:'元年4'},
        {name:'元年5'},
      ]
    })
    //函数节流
    setTimeout(() => {
      isSend = false;
    }, 500);
  },
  //选中搜索列表的某一项
  searchSelect(e){
    var name = e.currentTarget.dataset.name
      this.setData({
        'clientInfo.companyName': name,
        searchList: []
      })
  },
    //发请求获取搜索匹配到的数据
    // async getSearchListData(){
    //   //当搜索内容为空时就不发送请求并清空内容
    //   if(!this.data.clientInfo.companyName){
    //     this.setData({
    //       searchList: []
    //     })
    //     return;
    //   }
  
    //   let searchListData = await getApp().globalData.api.searchList({
    //     content:this.data.clientInfo.companyName
    //   });
    //   this.setData({
     
    //   })
    // },

  //点击提交按钮
  submitFn(){
    let that = this;
    let {clientInfo}=that.data;
    if (clientInfo.activityName == "") {
      return wx.showToast({ title: "请输入活动名", icon: "none" });
    }
    if(clientInfo.companyName==''){
      return wx.showToast({ title: "请输入客户公司名称", icon: "none" });
    }
    if(clientInfo.name==''){
      return wx.showToast({ title: "请输入客户姓名", icon: "none" });
    }
    if(clientInfo.scale==''){
      return wx.showToast({ title: "请选择客户规模", icon: "none" });
    }
    if(clientInfo.industry==''){
      return wx.showToast({ title: "请选择客户所属行业", icon: "none" });
    }
    if(clientInfo.department==''){
      return wx.showToast({ title: "请输入客户部门", icon: "none" });
    }
    if(clientInfo.duty==''){
      return wx.showToast({ title: "请输入客户职务", icon: "none" });
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
    if(clientInfo.area==''){
      return wx.showToast({ title: "请选择所属区域", icon: "none" });
    }
    if(clientInfo.city==''){
      return wx.showToast({ title: "请输入所在城市", icon: "none" });
    }
    wx.navigateTo({
      url: '/pages-homes/succeed/index',
    })
  },
  // 是否住宿
  onChange(event) {
    this.setData({
      'clientInfo.isStay': event.detail,
    });
  },
  // 住宿类型
  onSwitch(e){
    this.setData({
      'clientInfo.stayType': e.detail,
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