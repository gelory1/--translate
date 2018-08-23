const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history:[]
  },

  onSelectHis(e){
    wx.reLaunch({
      url: `/pages/index/index?query=${e.currentTarget.dataset.query}`,
    })
  },
  onShow: function () {
    let history = wx.getStorageSync('history') || []
    this.setData({
      'history':history
    })
  },

  
})