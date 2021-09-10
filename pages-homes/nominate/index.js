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
      tell:'',
      companyName:'',
      name:'',
      scale:'',
      industry:'',
      department:'',
      duty:'',
      email:'',
      area:'',
      city:'',
      isStay:'',
      stayType:'',
      money:'',
      remark:''
    },
    checkedIndex: -1,//改为对应下标
    activityId:'',//活动id
    customerId:'',//客户id
    successShow:false,//是否提交成功
    isProvided:0,//0不提供住宿1提供住宿
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'options')
    if(options.customerId){
      this.customerInfo(options.customerId);
      this.setData({
        customerId:options.customerId
      })
    }else{
        this.setData({
          "clientInfo.activityName":options.title,
          activityId:options.activityId
        })
        this.isProvidedFn();//获取单个活动是否提供住宿
    }
  },
//获取单个活动是否提供住宿
  isProvidedFn(){
    let that = this;
    getApp().globalData.api.isProvided({
      Market_Token:wx.getStorageSync('loginData').custom_token,
      avid:that.data.activityId
    }).then(res=>{
      if(res.bool){
        that.setData({
          isProvided:res.data.mma_is_accommodation,
        });
      }else{
        wx.showToast({ title: res.errMsg, icon: "none" });
      }
    })
  },
  //获取客户详情
  customerInfo(id){
    let that = this;
    getApp().globalData.api.upCustomerInfo({
      Market_Token:wx.getStorageSync('loginData').custom_token,
      mmuc_id:id
    }).then(res=>{
      if(res.bool){
        let {clientInfo,activityId,customerId,isProvided} =that.data
        activityId=res.data.mma_id;
        customerId=res.data.mmc_id;
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
        isProvided=res.data.mmc_is_accommodation;
        clientInfo.isStay=res.data.mmc_is_accommodation.toString();
        clientInfo.stayType=res.data.mmc_accommodation_type;
        clientInfo.money=res.data.mmc_business_money;
        clientInfo.remark=res.data.mmc_remarks;
        that.setData({
          activityId:activityId,
          clientInfo:clientInfo,
          customerId:customerId,
          isProvided:isProvided
        });
      }else{
        wx.showToast({ title: res.data.msg, icon: "none" });
      }
    })
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
  },

   //input失去光标触发
   onBlur(event) {
    var tell = event.detail.value;
    this.commonFn(tell)
  },
  //点击搜索图标
  onBlurFn(e){
    var tell = e.target.dataset.tel;
    this.commonFn(tell)
  },
  //input公共的方法
  commonFn(tell){
    if(isSend){
      return;
    }
    isSend = true;
    var p1 = /^1\d{10}$/;
    if (p1.test(tell) == false) {
      return wx.showToast({ title: "请填写正确的手机号", icon: "none" });
    }
    getApp()
      .globalData.api.companyInfo({
        mobile: tell,
      })
      .then(res => {
        console.log(res,'-----')
        if (res.bool) {
          this.setData({
            'clientInfo.companyName':(res.data.company!=null||res.data.company!==0)?res.data.company:'',
            'clientInfo.name':(res.data.name!=null||res.data.name!=0)?res.data.name:'',
            'clientInfo.email':(res.data.email!=null||res.data.email!=0)?res.data.email:'',
            'clientInfo.industry':(res.data.industry!=null||res.data.industry!=0)?res.data.industry:'',
            'clientInfo.duty':(res.data.title!=null||res.data.title!=0)?res.data.title:'',
          })
        } else {
          wx.showToast({ title: res.data.msg, icon: "none" ,duration:2000});
        }
        setTimeout(() => {
          isSend = false;
        }, 3000);
      });
  },

  //选中搜索列表的某一项
  searchSelect(e){
    var name = e.currentTarget.dataset.name
      this.setData({
        'clientInfo.companyName': name,
        searchList: []
      })
  },
   
  //点击提交按钮
  submitFn(){
    let that = this;
    let {clientInfo,customerId,isProvided}=that.data;
    if (
      !/^1[3-9]\d{9}$/.test(clientInfo.tell) ||
      clientInfo.tell == ""
    ) {
      return wx.showToast({ title: "请输入客户手机号", icon: "none" });
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
    if(isProvided==1&&clientInfo.isStay==''){
      return wx.showToast({ title: "请确定是否住宿", icon: "none" });
    }
    if(isProvided==1&&clientInfo.isStay=='1'&&clientInfo.stayType==''){
      return wx.showToast({ title: "请确定单间/标间", icon: "none" });
    }
    if(isProvided==1&&clientInfo.isStay=='1'&&clientInfo.money==''){
      return wx.showToast({ title: "请输入商机金额", icon: "none" });
    }
    // if(clientInfo.remark==''){
    //   return wx.showToast({ title: "请输入备注", icon: "none" });
    // }
    let postData = {
      mmc_tell:clientInfo.tell,
      mmc_company_name:clientInfo.companyName,
      mmc_name:clientInfo.name,
      mmc_scale:clientInfo.scale,
      mmc_industry:clientInfo.industry,
      mmc_department:clientInfo.department,
      mmc_post:clientInfo.duty,
      mmc_email:clientInfo.email,
      mmc_region:clientInfo.area,
      mmc_city:clientInfo.city,
      mmc_is_accommodation:clientInfo.isStay,
      mmc_accommodation_type:clientInfo.isStay==2?'':clientInfo.stayType,
      mmc_business_money:clientInfo.isStay==2?'':clientInfo.money ,
      mmc_remarks:clientInfo.remark,
      type:1 ,// (1添加客户信息，2修改客户信息)
    };
    if(customerId){
      postData.type=2+'';
      postData.cuid=customerId+'';
    }
    // if(isProvided){

    // }
    console.log(postData)
    getApp().globalData.api.customerAdd({
      Market_Token:wx.getStorageSync('loginData').custom_token,
      json:JSON.stringify(postData),
      uid:wx.getStorageSync('loginData').uid,
      avid:that.data.activityId
    }).then(res=>{
      if(res.bool){
        // wx.redirectTo({
        //   url: '/pages-homes/succeed/index',
        // })
        this.setData({
          successShow:true
        })
        setTimeout(() => {
          this.setData({
            successShow:false
          })
          wx.navigateBack({
            delta: 1
          })
        }, 3000);
       
      }else{
        wx.showToast({ title: res.errMsg, icon: "none" });
      }
    })
    
  },
  // 弹层关闭事件
  successClose(data){
    this.setData({
      successShow:data.detail.successShow
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