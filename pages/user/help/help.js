// pages/user/help/help.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShareAppMessage: function () {

  },
  copy: function (e) {
    //console.log(e.currentTarget.dataset.txt)
    wx.setClipboardData({
      data: e.currentTarget.dataset.txt,
      success: function (res) {

      }
    })
  }
})