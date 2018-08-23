//index.js
//获取应用实例
import { translate } from '../../utils/translate.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentLang:{},
    inputContent: '',
    closeVisible: false,
    result:[]
  },
  onLoad(options){
    if(options.query){
      this.setData({
        'inputContent': options.query
      })
    }
  },
  onShow(){
    this.setData({
      'currentLang': app.globalData.currentLang
    })
    this.onSubmit()
  },
  onInput(e){
    this.setData({
      'closeVisible':true,
      'inputContent':e.detail.value
    })
    if (this.data.inputContent.length > 0){
      this.setData({
        'closeVisible': true
      })
    }else{
      this.setData({
        'closeVisible': false
      })
    }
    
  },
  onClear(){
    this.setData({
      'closeVisible': false,
      'inputContent': '',
      'result':[]
    })
  },
  onSubmit(){
    if(this.data.inputContent === '') {
      this.setData({
        'result':[]
      })
      return
    }
    translate(this.data.inputContent,{from:'auto',to:this.data.currentLang.lang})
      .then((res)=>{
          this.setData({
            'result': res.trans_result
          })
          let history = wx.getStorageSync('history') || []
        history.unshift({ query: this.data.inputContent, result: res.trans_result[0].dst})
        history.length = history.length > 10? 10:history.length
        wx.setStorageSync('history', history)
      })
  }

  
})
