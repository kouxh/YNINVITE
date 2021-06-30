// pages-market/add-info/index.js
const post = require('../../utils/post.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postList: Object.assign([], post.default.department),
    firstData:[],//一级数据
    twoData:[],//二级数据
    threeData:[],//三级数据
    showName:'',//展示最后一级部门名称
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.postList,'总数据')
    let firstId=219;
    this.setData({
      firstData: this.checkFn(firstId)
    })
    console.log(this.data.firstData,'-一级-')
  },
  // 通过parentid获取相应数据
  // checkFn(parentId){
  //   // return this.data.postList.map(item => item.parentid).filter(item => item == parentId);
  //   let arr = this.data.postList.filter(item => {
  //     return item.parentid==parentId
  //   })
  //   return arr
  // },
  checkFn(parentId){
    let that = this;
    let arr = this.data.postList.filter(item => {
      return item.parentid==parentId
    })
    let hierarchy=arr.map(x=>{
      x.childrens=that.checkFn(x.id)
      console.log(x,'--x---')
     return x
    });
    console.log(hierarchy,'---hierarchy')
    return hierarchy
  },
  //点击一级每一项
  onChange(e){
    let twoId=e.currentTarget.dataset.id;
    let name=e.currentTarget.dataset.name;
    this.setData({
      twoData: this.checkFn(twoId)
    })
    console.log(this.data.twoData,'-二级-')
    if(this.checkFn(twoId).length==0){
      this.setData({
        showName:name
      })
    }
    console.log(this.data.showName,'name')
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