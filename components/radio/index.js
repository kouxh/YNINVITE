// components/radio/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    radioData:[
      {id:0,name:"是"},
      {id:1,name:"否"},
    ],//是否需要预订航班
  },
  ready() {
    this.data.radioData[0].checked = true;
    this.data.radioData1[0].checked = true;
    this.setData({
      radioData: this.data.radioData,
      radioData1: this.data.radioData1,
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    checkedFn(e){
      let that=this
      let this_checked = e.currentTarget.dataset.id
      let {radioData}=that.data//获取Json数组
      that.setData({
        "clientInfo.isAirport":this_checked
      })
      for (var i = 0; i < radioData.length;i++){
        if (radioData[i].id == this_checked){
          radioData[i].checked = true;//当前点击的位置为true即选中
        }
        else{
          radioData[i].checked = false;//其他的位置为false
        }
      }
      that.setData({
        radioData: radioData
      })
    },
  }
})
