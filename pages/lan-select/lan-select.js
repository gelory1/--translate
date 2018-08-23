const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    langList: app.globalData.langList,
    currentLang:{},
    selectedIndex: 0
  },
  onLoad(){
    this.setData({
      'selectedIndex':app.globalData.currentLang.index
    })
  },
  onSelected(e){
    this.setData({
      'currentLang' : e.currentTarget.dataset,
      'selectedIndex': e.currentTarget.dataset.index
    })
    app.globalData.currentLang = e.currentTarget.dataset
    wx.setStorageSync('currentLang', e.currentTarget.dataset)
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})