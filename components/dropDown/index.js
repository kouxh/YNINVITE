// components/dropDown/index.js
//获取全局实例
const appInstance = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listData:{
      type: Array,
    },
    type:{
      type:Number
    },
    checkedIndex:{
      type:Number
    }
  
  },

  /**
   * 组件的初始数据
   */
  data: {
    listShow:true,
    selectName:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    mySelect(e){
      let name = e.currentTarget.dataset.name
      this.triggerEvent('listClose',{ listShow: false ,selectName:name,type:this.data.type} )
    }
  }
})
