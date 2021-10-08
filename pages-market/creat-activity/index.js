const post = require('../../utils/post.js')
import regeneratorRuntime from "../../libs/regenerator/runtime-module";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityInfo:{
      name:'',
      starTime:'',
      endTime:'',
      city:'',
      person:'',
      tell:'',
      isRoom:'',
      isStay:'',
      branchRoom:[],
      limits:'',
      imgUrl:'',
      department:[]
    },//创建活动数据
    calendarShow:false,//日历弹框
    minDate: new Date(1960, 0, 1).getTime(),
    maxDate: new Date(2130, 12, 1).getTime(),
    currentDate: new Date().getTime(),
    checkedIndex:-1,
    checkedIndex1:-1,
    checkedIndex2:-1,
    checkedIndex3:-1,
    // postList: Object.assign([], post.default.department),
    postList:[],//公司部门总数据
    firstData:[],//一级数据
    firstShow:false,//是否展示提名部门弹框
    twoData:[],//二级数据
    twoShow:false,//二级部门弹框是否展示
    threeData:[],//三级数据
    threeShow:false,//三级部门弹框是否展示
    fourData:[],//四级数据
    fourShow:false,//四级部门弹框是否展示
    fileList: [],//获取邀请函
    imgUrl:'',
    typeTime:1,//区别开始时间 获取结束时间
    outputBool: true, // '开始时间'是否大于'结束时间' 
    activityId:'',//活动id
    checkboxValue:[],//选中数组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCompanyListFn();//请求部门数据
    // setTimeout(() => {
      if(options.activityId){
        this.setData({
          activityId:options.activityId
        })
        // this.activityInfo(options.activityId)
      }
    // }, 800);
  },
  //请求部门数据
  async getCompanyListFn(){
    let that = this;
    await getApp().globalData.api.getCompanyList().then(res=>{
      if(res.bool){
        that.setData({
          postList:res.data.department,
        });
        if(that.data.activityId){
          that.activityInfo(that.data.activityId)
        }
      }else{
        wx.showToast({ title: res.errMsg, icon: "none" });
      }
    })
  },
  //获取创建活动详情
  activityInfo(id){
    let that = this;
    getApp().globalData.api.activityInfo({
      Market_Token:wx.getStorageSync('loginData').custom_token,
      avid:id
    }).then(res=>{
      if(res.bool){
        let {activityInfo,fileList} =that.data
        activityInfo.name=res.data.mma_title;
        activityInfo.starTime=res.data.mma_start_time;
        activityInfo.endTime=res.data.mma_end_time;
        activityInfo.city=res.data.mma_city;
        activityInfo.person=res.data.mma_person_name;
        activityInfo.tell=res.data.mma_person_tell;
        activityInfo.isRoom=res.data.mma_is_branch_venue;
        let branchRoom=res.data.mma_branch_venue.split(',');
        activityInfo.isStay=res.data.mma_is_accommodation+'';
        activityInfo.limits=res.data.mma_jurisdiction;
        activityInfo.imgUrl=res.data.mma_invitation_img;
        let department=res.data.mma_department_id.split(',');
        let briefObj = {
          urlStr: 'https://www.chinamas.cn/'+res.data.mma_invitation_img,
        };
        fileList.push(briefObj);
        branchRoom.forEach(item => {
          activityInfo.branchRoom.push({roomLabel:item});
        });
         this.data.postList.forEach(item => {
          department.map(it=>{
           if(it==item.id){
             let newData={}
            newData.id=item.id;
            newData.name=item.name
            activityInfo.department.push(newData);
           }
          });
        });
        that.setData({
          activityInfo:activityInfo,
          fileList:fileList
        });
      }else{
        wx.showToast({ title: res.data.msg, icon: "none" });
      }
    })
  },
  // 通过parentid获取相应数据
  checkFn(parentId){
    let that = this;
    let arr = this.data.postList.filter(item => {
      return item.parentid==parentId
    })
    let hierarchy=arr.map(x=>{
      x.childrens=that.checkFn(x.id)
     return x
    });
    return hierarchy
  },
  // 添加内容
  addList: function(){
    let  conLists = this.data.activityInfo.branchRoom;
    if(conLists.length==0){
      let newData = {};
      conLists.push(newData);//实质是添加conLists数组内容，使for循环多一次
      this.setData({
        "activityInfo.branchRoom": conLists,
      })
    }else{
      for (let i = 0; i < conLists.length; i++) {
        if (Object.keys(conLists[i]).length === 0) {
          wx.showToast({
            title: '请输入第' + `${i * 1 + 1}` + '条分会场内容！',
            icon: 'none'
          })
          return;
        }
      }
      conLists.push("")
      this.setData({
        "activityInfo.branchRoom": conLists,
      })
    }
  },
  //删除每一条
  delList: function () {
    let  conLists = this.data.activityInfo.branchRoom;
    conLists.pop();      //实质是删除conLists数组内容，使for循环少一次
    this.setData({
      "activityInfo.branchRoom": conLists,
    })
  },   
  /**
   * 获取输入的内容标题
   */
  changeConTitle(e) {
    var idx = e.currentTarget.dataset.index; //当前下标
    var val = e.detail.value; //当前输入的值
    var _list =this.data.activityInfo.branchRoom; //data中存放的数据
    for (let i = 0; i < _list.length; i++) {
      if (idx == i) {
        _list[i] = { roomLabel: val } //将当前输入的值放到数组中对应的位置
        // _list[i] =  val //将当前输入的值放到数组中对应的位置
      }
    }
    this.setData({
      "activityInfo.branchRoom": _list
    })
    
  },
  //点击提名部门
  firstFn(){
    let firstId=219;//一级ID父ID
      let that=this
        // for (let i = 0, lenI = this.data.firstData.length; i < lenI; ++i) {
        //   this.data.firstData[i].checked = false
        //   for (let j = 0, lenJ = this.data.checkboxValue.length; j < lenJ; ++j) {
        //     if ( this.data.firstData[i].id == parseInt(this.data.checkboxValue[j])) {
        //       console.log(this.data.firstData[i].id,  this.data.checkboxValue[j])
        //       this.data.firstData[i].checked = true
        //       break
        //     }
        //   }
        // }
        that.setData({
          firstShow:true,
          firstData: that.checkFn(firstId)
        });
  },
  //点击一级每一项
  onSelect(e){
    let childrens=e.currentTarget.dataset.childrens;
    let oneId=e.currentTarget.dataset.id;
    let index=e.currentTarget.dataset.index;
    let name=e.currentTarget.dataset.name;
    let department = this.data.activityInfo.department;
    let type=e.currentTarget.dataset.type;
    if(childrens.length==0){
      let newData={}
      newData.id=oneId;
      newData.name=name
      department.push(newData);
      if(type==0){
        this.setData({
          firstShow:false,
          checkedIndex:index,
        })
      }else if(type==1){
        this.setData({
          twoShow:false,
          checkedIndex1:index,
        })
      }else if(type==2){
        this.setData({
          threeShow:false,
          checkedIndex2:index,
        })
      }else{
        this.setData({
          fourShow:false,
          checkedIndex3:index,
        })
      }
        this.setData({
          "activityInfo.department":this.unique(department)
        })
        console.log(department,' console.log(department)')
    }else{
      if(type==0){
        this.setData({
          checkedIndex:index,
          twoData:childrens,
          firstShow:false,
          twoShow:true
        })
      }else if(type==1){
        this.setData({
          checkedIndex1:index,
          threeData: childrens,
          twoShow:false,
          threeShow:true
        })
      }else if(type==2){
        this.setData({
          checkedIndex2:index,
          fourData: childrens,
          threeShow:false,
          fourShow:true

        })
      }else{
        this.setData({
          checkedIndex3:index,
          fourData: childrens,
          fourShow:false,
        })
      }
      
    }
  },
  //点击返回一级
  backFn(e){
    let type=e.currentTarget.dataset.type;
    if(type==1){
      this.setData({
        twoShow:false,
        firstShow:true
      })
    }else if(type==2){
      this.setData({
        threeShow:false,
        twoShow:true
      })
    }else if(type==3){
      this.setData({
        fourShow:false,
        threeShow:true,
      })
    }
  },
  //删除提名部门
  deleteFn(e){
    let idx = e.currentTarget.dataset.index;
    let  department = this.data.activityInfo.department;
    for (let i = 0; i < department.length; i++) {
      if (idx == i) {
        department.splice(idx, 1)
      }
    }
    this.setData({
      "activityInfo.department": department
    })
  },
//点击复选框
//   checkboxChange(e) {
//     console.log(e,'checkbox发生change事件，携带value值为：', e.detail.value)
//     this.setData({
//       checkboxValue:e.detail.value
//     })
//     // const items = this.data.items
//     // const values = e.detail.value
//     // for (let i = 0, lenI = items.length; i < lenI; ++i) {
//     //   items[i].checked = false
//     //   for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
//     //     if (items[i].value === values[j]) {
//     //       items[i].checked = true
//     //       break
//     //     }
//     //   }
//     // }
   
//   },
//点击顶部确定
// confirmFn(e){
//   console.log(e)
//   let type=e.currentTarget.dataset.type;
//   if(type==0){
//     this.setData({
//       firstShow:false
//     })
//   }
//   this.data.postList.forEach(item => {
//     this.data.checkboxValue.map(it=>{
//         if(it==item.id){
//           let newData={}
//           newData.id=item.id;
//           newData.name=item.name
//           this.data.activityInfo.department.push(newData);
//         }
//     });
//   });
//     this.setData({
//       'activityInfo.department':this.unique(this.data.activityInfo.department)
//     })
//     console.log(this.data.activityInfo.department)
// },
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
    var roomArr = [];
    let {activityInfo,activityId}=that.data;
    if(activityInfo.name==''){
      return wx.showToast({ title: "请输入活动名称", icon: "none" });
    }
    if (activityInfo.starTime == "")
      return wx.showToast({ title: "请选择开始时间", icon: "none" });
    if (activityInfo.endTime == "")
      return wx.showToast({ title: "请选择结束时间", icon: "none" });
    if (!this.data.outputBool)
      return wx.showToast({ title: "结束时间请大于开始时间", icon: "none" });
    if (activityInfo.city == "")
    return wx.showToast({ title: "请输入城市", icon: "none" });
    if (activityInfo.person == "")
    return wx.showToast({ title: "请输入活动负责人", icon: "none" });
    if (
      !/^1[3-9]\d{9}$/.test(activityInfo.tell) ||
      activityInfo.tell == ""
    ) {
      return wx.showToast({ title: "请输入负责人手机号", icon: "none" });
    }
    if(activityInfo.isRoom == "-1"){
      return wx.showToast({ title: "请选择是否有分会场", icon: "none" });
    }else if(activityInfo.isRoom == "是" && activityInfo.branchRoom.length>0){
      for (let i = 0; i < activityInfo.branchRoom.length; i++) {
        if (Object.keys(activityInfo.branchRoom[i]).length === 0) {
          wx.showToast({
            title: '请输入第' + `${i * 1 + 1}` + '条分会场内容！',
            icon: 'none'
          })
          return;
        }
        roomArr.push(activityInfo.branchRoom[i].roomLabel);
        // roomArr.push(activityInfo.branchRoom[i]);
      }
    }
    console.log(roomArr,'roomArr')
    if(activityInfo.isStay=='-1'){
      return wx.showToast({ title: "是否提供住宿", icon: "none" });
    }
    // if(activityInfo.limits==''){
    //   return wx.showToast({ title: "请输入活动权限", icon: "none" });
    // }
    if(activityInfo.imgUrl==''){
      return wx.showToast({ title: "请上传邀请函附件", icon: "none" });
    }
    if(activityInfo.department.length==0){
      return wx.showToast({ title: "请选择提名部门", icon: "none" });
    }
    let ids = activityInfo.department.map(c => c.id);
    let postData = {
      mma_title:activityInfo.name,
      mma_start_time:activityInfo.starTime,
      mma_end_time:activityInfo.endTime,
      mma_city:activityInfo.city,
      mma_person_name:activityInfo.person,
      mma_person_tell:activityInfo.tell,
      mma_is_branch_venue:activityInfo.isRoom,
      mma_branch_venue:roomArr.toString(),
      mma_is_accommodation:activityInfo.isStay,
      mma_invitation_img:activityInfo.imgUrl,
      mma_jurisdiction:activityInfo.limits,
      mma_department_id:ids.toString()
    };
    if(activityId){
      postData.mma_id=activityId;
      postData.mma_uid=wx.getStorageSync('loginData').uid
      getApp().globalData.api.editActivityInfo({
        Market_Token:wx.getStorageSync('loginData').custom_token,
        json:JSON.stringify(postData),
        juri:wx.getStorageSync('loginData').identity,
      }).then(res=>{
        if(res.bool){
          // wx.showToast({ title: res.data.msg, icon: "none" });
          wx.navigateBack({
            delta: 1,
          })
        }else{
          wx.showToast({ title: res.errMsg, icon: "none" });
        }
      })

    }else{
      console.log('创建')
      getApp().globalData.api.activityAdd({
        Market_Token:wx.getStorageSync('loginData').custom_token,
        json:JSON.stringify(postData),
        juri:wx.getStorageSync('loginData').identity,
        uid:wx.getStorageSync('loginData').uid
      }).then(res=>{
        if(res.bool){
          wx.redirectTo({
            url: '/pages-market/submit/index',
          })
        }else{
          wx.showToast({ title: res.errMsg, icon: "none" });
        }
      })
    }
    
    
  },
  // 是否分会场
  onChange(event) {
    this.setData({
      'activityInfo.isRoom': event.detail,
      "activityInfo.branchRoom": [{}],
    });
  },
  //是否提供住宿
  onSwitch(e){
    this.setData({
      'activityInfo.isStay': e.detail,
    });
  },
  //展示时间弹框
  onDisplay(e) {
    this.setData({ 
      calendarShow: true,
      typeTime:e.currentTarget.dataset.time
    });
  },
  //关闭日历弹框
  onClose() {
    this.setData({ calendarShow: false });
  },
  //时间格式化转化
  formatDate(date) {
    let yearDate = new Date().getFullYear();//获取完整的年份
    date = new Date(date);
    return `${yearDate}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:00`;
  },
  //点击时间确认按钮
  onConfirm(event) {
    if(this.data.typeTime==1){
      this.setData({
        calendarShow: false,
        'activityInfo.starTime':  this.formatDate(event.detail),
      });
    }else{
      this.setData({
        calendarShow: false,
        'activityInfo.endTime':  this.formatDate(event.detail),
      });
    }
    let outputBool=
    new Date(this.data.activityInfo.starTime.replace(/-/g, "/")) <=
    new Date(this.data.activityInfo.endTime.replace(/-/g, "/"))
    // '开始时间'是否大于'结束时间'
    this.setData({
      outputBool:outputBool
    });
  },
  // 点击 查看
  enlargeImgFn(e) {
    let imgArr = e.currentTarget.dataset.imgarr;
    let showImg = e.currentTarget.dataset.showimg;
    wx.previewImage({
      current: showImg,
      urls: imgArr,
      fail(res) {
        wx.showToast({ title: "图片查看失败,请稍后重试", icon: "none" });
      }
    });
  },
  //获取上传图片
  uploadImgFn() {
    var that = this;
    wx.chooseImage({
      success (res) {
        let tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://www.chinamas.cn/laravelUploadImg', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success (res){
            let result=JSON.parse(res.data)
            // 将新图片添加到浏览数组中
            let fileList = that.data.fileList;
            for (const paths of tempFilePaths) {
              let briefObj = {
                urlStr: paths,
              };
              fileList.push(briefObj);
            }
            that.setData({
              fileList: fileList,
              "activityInfo.imgUrl":result.data.src,
            });
          }
        })
      }
    })

  },
 //删除图片
 imgDeleteFn(e) {
  let imgIndex = e.currentTarget.dataset.imgindex;
  let fileList = this.data.fileList; //原数据
  fileList.splice(imgIndex, 1);
  this.setData({
    fileList: fileList,
    "activityInfo.imgUrl":'',
  });
},
  // 数组去重
  unique:function (arr) {
      if (!Array.isArray(arr)) {
          return
      }
      let res = [arr[0]]
      for (let i = 1; i < arr.length; i++) {
          let flag = true
          for (let j = 0; j < res.length; j++) {
              if (arr[i].id === res[j].id) {
                  flag = false;
                  break
              }
          }
          if (flag) {
              res.push(arr[i])
          }
      }
      return res
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
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